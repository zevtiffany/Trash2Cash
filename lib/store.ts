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

interface AppState {
  currentUser: UserProfile | null;
  transactions: WasteTransaction[];
  rewards: Reward[];
  isLoading: boolean;
  
  // Actions
  fetchUser: () => Promise<void>;
  fetchData: () => Promise<void>;
  logout: () => Promise<void>;
  addTransaction: (data: { userId: string; type: string; weight: number }) => Promise<void>;
  redeemReward: (rewardId: string) => Promise<void>;
}

const supabase = createClient();

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  transactions: [],
  rewards: [],
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
}));
