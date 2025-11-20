"use client";

import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Coins, Scale, Users, ArrowUpRight, Building2, Loader2 } from "lucide-react";
import { useEffect } from "react";

// Inline Card components
const SimpleCard = ({ title, value, icon: Icon, description }: any) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xs md:text-sm font-medium text-gray-500">{title}</h3>
      <div className="p-2 bg-emerald-50 rounded-full">
        <Icon className="w-4 h-4 text-emerald-600" />
      </div>
    </div>
    <div className="text-xl md:text-2xl font-bold text-gray-900">{value}</div>
    <p className="text-xs text-gray-500 mt-1">{description}</p>
  </div>
);

export default function DashboardPage() {
  const router = useRouter();
  const { currentUser, transactions, isLoading, fetchUser } = useAppStore((state: any) => state);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!isLoading && !currentUser) {
        router.push("/login");
    }
  }, [isLoading, currentUser, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!currentUser) return null;

  // Household View
  if (currentUser.role === "household") {
    const myTransactions = transactions.filter((t: any) => t.user_id === currentUser.id);
    const totalWaste = myTransactions.reduce((acc: number, curr: any) => acc + curr.weight, 0);

    return (
      <div className="space-y-6 md:space-y-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Halo, {currentUser.name}! 👋</h1>
          <p className="text-sm md:text-base text-gray-500">Selamat datang kembali di Trash to Cash.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <SimpleCard 
            title="Total Poin" 
            value={currentUser.points} 
            icon={Coins} 
            description="Poin tersedia untuk ditukar" 
          />
          <SimpleCard 
            title="Total Sampah" 
            value={`${totalWaste.toFixed(1)} Kg`} 
            icon={Scale} 
            description="Sampah yang sudah disetor" 
          />
          <SimpleCard 
            title="Transaksi" 
            value={myTransactions.length} 
            icon={ArrowUpRight} 
            description="Kali penyetoran" 
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-100">
            <h3 className="font-semibold text-sm md:text-base text-gray-900">Riwayat Penyetoran Terakhir</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium">
                <tr>
                  <th className="px-3 md:px-6 py-3">Tanggal</th>
                  <th className="px-3 md:px-6 py-3">Jenis</th>
                  <th className="px-3 md:px-6 py-3">Berat</th>
                  <th className="px-3 md:px-6 py-3">Poin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {myTransactions.length > 0 ? (
                  myTransactions.slice(0, 5).map((t: any) => (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3">{new Date(t.created_at).toLocaleDateString('id-ID')}</td>
                      <td className="px-6 py-3 capitalize">{t.type}</td>
                      <td className="px-6 py-3">{t.weight}</td>
                      <td className="px-6 py-3 text-emerald-600 font-medium">+{t.points_earned}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-3 md:px-6 py-8 text-center text-gray-500 text-xs md:text-sm">
                      Belum ada transaksi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Waste Bank View
  if (currentUser.role === "waste_bank") {
    const totalTransactions = transactions.length;
    const totalWasteCollected = transactions.reduce((acc: number, curr: any) => acc + curr.weight, 0);
    
    // Count unique users from transactions as a proxy for active customers
    const uniqueUsers = new Set(transactions.map((t: any) => t.user_id)).size;

    return (
      <div className="space-y-6 md:space-y-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Dashboard Bank Sampah</h1>
          <p className="text-sm md:text-base text-gray-500">Kelola setoran sampah warga.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <SimpleCard 
            title="Total Transaksi" 
            value={totalTransactions} 
            icon={ArrowUpRight} 
            description="Semua transaksi masuk" 
          />
          <SimpleCard 
            title="Total Sampah Terkumpul" 
            value={`${totalWasteCollected.toFixed(1)} Kg`} 
            icon={Scale} 
            description="Akumulasi semua jenis" 
          />
          <SimpleCard 
            title="Nasabah Aktif" 
            value={uniqueUsers} 
            icon={Users} 
            description="Warga yang pernah menyetor" 
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden col-span-1 sm:col-span-2 lg:col-span-3">
          <div className="p-4 md:p-6 border-b border-gray-100">
            <h3 className="font-semibold text-sm md:text-base text-gray-900">Transaksi Terbaru</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium">
                <tr>
                  <th className="px-3 md:px-6 py-3">ID</th>
                  <th className="px-3 md:px-6 py-3">Nasabah</th>
                  <th className="px-3 md:px-6 py-3">Jenis</th>
                  <th className="px-3 md:px-6 py-3">Berat</th>
                  <th className="px-3 md:px-6 py-3">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.slice(0, 10).map((t: any) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-mono text-xs">{t.id.slice(0, 8)}...</td>
                    <td className="px-6 py-3">{t.profiles?.name || 'Unknown'}</td>
                    <td className="px-6 py-3 capitalize">{t.type}</td>
                    <td className="px-6 py-3">{t.weight} Kg</td>
                    <td className="px-6 py-3">{new Date(t.created_at).toLocaleDateString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Government View
  if (currentUser.role === "government") {
    // Prepare data for chart
    const data = transactions.reduce((acc: any[], curr: any) => {
      const existing = acc.find(item => item.name === curr.type);
      if (existing) {
        existing.weight += curr.weight;
      } else {
        acc.push({ name: curr.type, weight: curr.weight });
      }
      return acc;
    }, []);

    return (
      <div className="space-y-6 md:space-y-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Dashboard Pemerintah</h1>
          <p className="text-sm md:text-base text-gray-500">Monitoring statistik pengelolaan sampah wilayah.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-sm md:text-base text-gray-900 mb-4 md:mb-6">Komposisi Sampah Terkumpul</h3>
            <div className="h-64 md:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="weight" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
             <SimpleCard 
              title="Total Transaksi" 
              value={transactions.length} 
              icon={ArrowUpRight} 
              description="Total transaksi di wilayah" 
            />
             <SimpleCard 
              title="Total Sampah" 
              value={`${transactions.reduce((acc: number, c: any) => acc + c.weight, 0).toFixed(1)} Kg`} 
              icon={Scale} 
              description="Total sampah terkelola" 
            />
          </div>
        </div>
      </div>
    );
  }

  return <div>Role not recognized</div>;
}

