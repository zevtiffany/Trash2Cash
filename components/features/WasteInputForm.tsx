"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";
import { Search, Scale, Save, Loader2 } from "lucide-react";

export default function WasteInputForm() {
  const { currentUser, addTransaction } = useAppStore((state: any) => state);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedUserName, setSelectedUserName] = useState<string>("");
  const [wasteType, setWasteType] = useState<string>("Plastik");
  const [weight, setWeight] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const supabase = createClient();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, email')
      .eq('role', 'household')
      .ilike('name', `%${query}%`)
      .limit(5);
    
    if (data) {
      setSearchResults(data);
    }
    setIsSearching(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId || !weight || !currentUser) return;

    await addTransaction({
      userId: selectedUserId,
      type: wasteType,
      weight: parseFloat(weight),
    });

    // alert("Transaksi berhasil disimpan!"); // Store already alerts
    setWeight("");
    setSelectedUserId("");
    setSelectedUserName("");
    setSearchQuery("");
    setSearchResults([]);
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
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {isSearching && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 w-4 h-4 animate-spin" />
            )}
          </div>
          
          {/* Selected User Display */}
          {selectedUserName && (
              <div className="mt-2 p-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium flex justify-between items-center">
                  <span>Dipilih: {selectedUserName}</span>
                  <button type="button" onClick={() => { setSelectedUserId(""); setSelectedUserName(""); }} className="text-xs underline">Ubah</button>
              </div>
          )}

          {searchQuery && searchResults.length > 0 && !selectedUserId && (
            <div className="mt-2 border border-gray-200 rounded-lg max-h-40 overflow-y-auto bg-white absolute z-10 w-full shadow-lg">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setSelectedUserName(user.name);
                    setSearchQuery(""); // Clear search query to hide list
                    setSearchResults([]);
                  }}
                  className="p-3 cursor-pointer hover:bg-emerald-50 flex justify-between items-center border-b last:border-0"
                >
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              ))}
            </div>
          )}
           {searchQuery && searchResults.length === 0 && !isSearching && searchQuery.length >= 2 && (
                <div className="mt-2 text-sm text-gray-500">Tidak ditemukan.</div>
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
