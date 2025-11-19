import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, WasteTransaction, Reward, MOCK_USERS, MOCK_TRANSACTIONS, MOCK_REWARDS } from './mockData';

interface AppState {
  currentUser: User | null;
  users: User[];
  transactions: WasteTransaction[];
  rewards: Reward[];
  
  // Actions
  login: (email: string, password?: string) => boolean;
  logout: () => void;
  addTransaction: (transaction: Omit<WasteTransaction, 'id' | 'date' | 'pointsEarned'>) => void;
  redeemReward: (rewardId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: MOCK_USERS,
      transactions: MOCK_TRANSACTIONS,
      rewards: MOCK_REWARDS,

      login: (email, password) => {
        const user = get().users.find((u) => u.email === email && u.password === password);
        if (user) {
          set({ currentUser: user });
          return true;
        }
        return false;
      },

      logout: () => set({ currentUser: null }),

      addTransaction: (data) => {
        const pointsEarned = data.weight * 10; // 1kg = 10 points
        const newTransaction: WasteTransaction = {
          id: Math.random().toString(36).substr(2, 9),
          date: new Date().toISOString().split('T')[0],
          pointsEarned,
          ...data,
        };

        set((state) => {
          // Update user points
          const updatedUsers = state.users.map((u) => {
            if (u.id === data.userId) {
              return { ...u, points: u.points + pointsEarned };
            }
            return u;
          });

          // Update current user if it's the one receiving points (though usually Bank Sampah adds it)
          const updatedCurrentUser = state.currentUser?.id === data.userId 
            ? { ...state.currentUser, points: state.currentUser.points + pointsEarned }
            : state.currentUser;

          return {
            transactions: [newTransaction, ...state.transactions],
            users: updatedUsers,
            currentUser: updatedCurrentUser,
          };
        });
      },

      redeemReward: (rewardId) => {
        const { currentUser, rewards, users } = get();
        if (!currentUser) return;

        const reward = rewards.find((r) => r.id === rewardId);
        if (!reward) return;

        if (currentUser.points >= reward.pointsCost) {
          set((state) => {
            const updatedUsers = state.users.map((u) => {
              if (u.id === currentUser.id) {
                return { ...u, points: u.points - reward.pointsCost };
              }
              return u;
            });

            return {
              users: updatedUsers,
              currentUser: { ...currentUser, points: currentUser.points - reward.pointsCost },
            };
          });
          alert(`Berhasil menukar ${reward.name}!`);
        } else {
          alert("Poin tidak cukup!");
        }
      },
    }),
    {
      name: 'trash-to-cash-storage-v2', // Updated version to force refresh of mock data
      version: 1,
    }
  )
);
