"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { User } from "@/lib/mockData";
import { Search, Scale, Save } from "lucide-react";

export default function WasteInputForm() {
  const { users, currentUser, addTransaction } = useAppStore();
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [wasteType, setWasteType] = useState<string>("Plastik");
  const [weight, setWeight] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter household users
  const householdUsers = users.filter(
    (u) => u.role === "household" && u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId || !weight || !currentUser) return;

    addTransaction({
      userId: selectedUserId,
      wasteBankId: currentUser.id,
      type: wasteType,
      weight: parseFloat(weight),
    });

    alert("Transaksi berhasil disimpan!");
    setWeight("");
    setSelectedUserId("");
    setSearchQuery("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-900">Input Setoran Sampah</h2>
        <p className="text-sm md:text-base text-gray-500">Catat setoran sampah dari nasabah.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cari Nasabah
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Ketik nama nasabah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          
          {searchQuery && (
            <div className="mt-2 border border-gray-200 rounded-lg max-h-40 overflow-y-auto">
              {householdUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setSearchQuery(user.name);
                  }}
                  className={`p-3 cursor-pointer hover:bg-emerald-50 flex justify-between items-center ${
                    selectedUserId === user.id ? "bg-emerald-50 text-emerald-700" : ""
                  }`}
                >
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              ))}
              {householdUsers.length === 0 && (
                <div className="p-3 text-gray-500 text-sm text-center">Nasabah tidak ditemukan</div>
              )}
            </div>
          )}
        </div>

        {/* Waste Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jenis Sampah
          </label>
          <select
            value={wasteType}
            onChange={(e) => setWasteType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="Plastik">Plastik</option>
            <option value="Kertas">Kertas</option>
            <option value="Logam">Logam</option>
            <option value="Kaca">Kaca</option>
            <option value="Organik">Organik</option>
            <option value="Elektronik">Elektronik</option>
          </select>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Berat (Kg)
          </label>
          <div className="relative">
            <Scale className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="number"
              step="0.1"
              min="0.1"
              placeholder="0.0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Estimasi Poin: {weight ? parseFloat(weight) * 10 : 0} Poin</p>
        </div>

        <button
          type="submit"
          disabled={!selectedUserId || !weight}
          className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          Simpan Transaksi
        </button>
      </form>
    </div>
  );
}
