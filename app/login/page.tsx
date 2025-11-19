"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Recycle, User, Building2, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const login = useAppStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const success = login(email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Email atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-emerald-600 p-6 md:p-8 text-center">
          <div className="mx-auto bg-white/20 w-14 md:w-16 h-14 md:h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <Recycle className="w-7 md:w-8 h-7 md:h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Trash to Cash</h1>
          <p className="text-sm md:text-base text-emerald-100">Ubah sampahmu menjadi cuan!</p>
        </div>

        <div className="p-6 md:p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs md:text-sm text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="nama@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 md:py-3 px-4 rounded-lg text-sm md:text-base font-semibold hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Masuk Sekarang
            </button>

            <div className="mt-6 text-center text-xs md:text-sm text-gray-500">
              <p className="font-medium mb-2 text-xs md:text-sm">Akun Demo:</p>
              <div className="space-y-1 text-xs">
                <p>Rumah Tangga: <span className="font-mono bg-gray-100 px-1 rounded">agustafo@warga.com</span> / <span className="font-mono bg-gray-100 px-1 rounded">123</span></p>
                <p>Bank Sampah: <span className="font-mono bg-gray-100 px-1 rounded">admin@maju.com</span> / <span className="font-mono bg-gray-100 px-1 rounded">123</span></p>
                <p>Pemerintah: <span className="font-mono bg-gray-100 px-1 rounded">admin@dlh.go.id</span> / <span className="font-mono bg-gray-100 px-1 rounded">123</span></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
