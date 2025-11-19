"use client";

import { useAppStore } from "@/lib/store";
import { Gift, Coins } from "lucide-react";

export default function RewardCatalog() {
  const { rewards, currentUser, redeemReward } = useAppStore();

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Katalog Penukaran Poin</h2>
          <p className="text-gray-500">Tukarkan poinmu dengan hadiah menarik.</p>
        </div>
        <div className="bg-emerald-100 px-4 py-2 rounded-full flex items-center gap-2">
          <Coins className="w-5 h-5 text-emerald-600" />
          <span className="font-bold text-emerald-800">{currentUser.points} Poin</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => {
          const canAfford = currentUser.points >= reward.pointsCost;
          
          return (
            <div key={reward.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="h-32 bg-emerald-50 flex items-center justify-center text-4xl">
                {reward.image}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">{reward.name}</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full">
                    {reward.pointsCost} Poin
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
    </div>
  );
}
