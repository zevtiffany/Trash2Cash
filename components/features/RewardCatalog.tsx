"use client";

import { useAppStore } from "@/lib/store";
import { Gift, Coins } from "lucide-react";

export default function RewardCatalog() {
  const { rewards, currentUser, redeemReward } = useAppStore((state: any) => state);

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Katalog Penukaran Poin</h2>
          <p className="text-sm md:text-base text-gray-500">Tukarkan poinmu dengan hadiah menarik.</p>
        </div>
        <div className="bg-emerald-100 px-4 py-2 rounded-full flex items-center gap-2 w-fit">
          <Coins className="w-5 h-5 text-emerald-600" />
          <span className="font-bold text-emerald-800">{currentUser.points} Poin</span>
        </div>
      </div>

      {rewards.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Gift className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Belum ada hadiah tersedia saat ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {rewards.map((reward: any) => {
            const canAfford = currentUser.points >= reward.points_cost;
            
            return (
              <div key={reward.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="h-32 bg-emerald-50 flex items-center justify-center text-4xl overflow-hidden">
                  {reward.image_url && reward.image_url.startsWith('http') ? (
                      <img src={reward.image_url} alt={reward.name} className="w-full h-full object-cover" />
                  ) : (
                      <span>{reward.image_url || '🎁'}</span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">{reward.name}</h3>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full">
                      {reward.points_cost} Poin
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6 flex-1">{reward.description}</p>
                  
                  <button
                    onClick={() => redeemReward(reward.id)}
                    disabled={!canAfford}
                    className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                      canAfford
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Gift className="w-4 h-4" />
                    {canAfford ? "Tukar Sekarang" : "Poin Kurang"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
