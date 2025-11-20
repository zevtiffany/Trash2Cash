import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';

export type Role = "household" | "waste_bank" | "government";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: Role;
  points: number;
}

export interface WasteTransaction {
  id: string;
  user_id: string;
  waste_bank_id: string;
  type: string;
  weight: number;
  points_earned: number;
  created_at: string;
  profiles?: { name: string } | null;
}

export interface Reward {
  id: string;
  name: string;
  points_cost: number;
  description: string;
  image_url: string;
}

export interface Question {
  id: string;
  quiz_id: string;
  question_text: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  order: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: string;
  points_per_question: number;
  questions?: Question[];
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  total_questions: number;
  points_earned: number;
  completed_at: string;
}

interface AppState {
  currentUser: UserProfile | null;
  transactions: WasteTransaction[];
  rewards: Reward[];
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  isLoading: boolean;
  
  // Actions
  fetchUser: () => Promise<void>;
  fetchData: () => Promise<void>;
  logout: () => Promise<void>;
  addTransaction: (data: { userId: string; type: string; weight: number }) => Promise<void>;
  redeemReward: (rewardId: string) => Promise<void>;
  completeQuiz: (quizId: string, score: number, totalQuestions: number) => Promise<void>;
}

const supabase = createClient();

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  transactions: [],
  rewards: [],
  quizzes: [],
  quizAttempts: [],
  isLoading: true,

  fetchUser: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ currentUser: null, isLoading: false });
        return;
      }

      let { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // SELF-HEALING: Jika profil tidak ditemukan (error code PGRST116), buat profil baru otomatis
      if (!profile) {
        console.log("Profil tidak ditemukan, mencoba membuat profil default...");
        
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'Pengguna',
            role: (user.user_metadata?.role as Role) || 'household',
            points: 0
          });

        if (insertError) {
          console.error("Gagal membuat profil otomatis:", insertError);
        } else {
          // Coba ambil lagi setelah insert
          const { data: newProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          profile = newProfile;
        }
      }

      if (profile) {
        set({ currentUser: profile, isLoading: false });
        get().fetchData(); // Fetch related data after user is loaded
      } else {
        // Jika masih gagal, stop loading
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      set({ isLoading: false });
    }
  },

  fetchData: async () => {
    const { currentUser } = get();
    if (!currentUser) return;

    // Fetch Rewards
    const { data: rewards } = await supabase.from('rewards').select('*');
    if (rewards) set({ rewards });

    // Fetch Quizzes with Questions
    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('*, questions(*)');
    
    if (quizzes) {
        // Sort questions by order
        const sortedQuizzes = quizzes.map((q: any) => ({
            ...q,
            questions: q.questions.sort((a: any, b: any) => a.order - b.order)
        }));
        set({ quizzes: sortedQuizzes });
    }

    // Fetch Quiz Attempts
    const { data: attempts } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', currentUser.id);
    
    if (attempts) set({ quizAttempts: attempts });

    // Fetch Transactions based on role
    // Join with profiles to get the name of the user who deposited (user_id)
    let query = supabase
      .from('waste_transactions')
      .select('*, profiles:user_id(name)')
      .order('created_at', { ascending: false });

    if (currentUser.role === 'household') {
      query = query.eq('user_id', currentUser.id);
    } else if (currentUser.role === 'waste_bank') {
      query = query.eq('waste_bank_id', currentUser.id);
    }
    // Government sees all (default)

    const { data: transactions } = await query;
    if (transactions) {
        // Cast to match interface if needed, or let it be inferred
        set({ transactions: transactions as any });
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ currentUser: null, transactions: [], rewards: [] });
  },

  addTransaction: async ({ userId, type, weight }) => {
    const { currentUser } = get();
    if (!currentUser || currentUser.role !== 'waste_bank') return;

    const pointsEarned = Math.floor(weight * 10);

    const { error } = await supabase.from('waste_transactions').insert({
      user_id: userId,
      waste_bank_id: currentUser.id,
      type,
      weight,
      points_earned: pointsEarned,
    });

    if (error) {
      alert('Gagal menyimpan transaksi: ' + error.message);
      return;
    }

    alert('Transaksi berhasil!');
    get().fetchData(); // Refresh data
  },

  redeemReward: async (rewardId) => {
    const { currentUser } = get();
    if (!currentUser) return;

    const { error } = await supabase.from('reward_redemptions').insert({
      user_id: currentUser.id,
      reward_id: rewardId,
    });

    if (error) {
      alert('Gagal menukar poin: ' + error.message);
      return;
    }

    alert('Berhasil menukar hadiah!');
    get().fetchUser(); // Refresh user points
  },

  completeQuiz: async (quizId, score, totalQuestions) => {
    const { currentUser, quizzes } = get();
    if (!currentUser) return;

    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    const pointsEarned = score * quiz.points_per_question;

    const { error } = await supabase.from('quiz_attempts').insert({
      user_id: currentUser.id,
      quiz_id: quizId,
      score,
      total_questions: totalQuestions,
      points_earned: pointsEarned
    });

    if (error) {
      console.error('Error saving quiz attempt:', error);
      alert('Gagal menyimpan hasil kuis');
      return;
    }

    // Update local state
    get().fetchData(); // Refresh attempts and points (since trigger updates points)
    get().fetchUser(); // Refresh user points specifically
  },
}));
