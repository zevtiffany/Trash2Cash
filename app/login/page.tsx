"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";
import { Recycle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const fetchUser = useAppStore((state) => state.fetchUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"household" | "waste_bank" | "government">("household");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");

  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign Up Logic
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
              role: role,
            }
          }
        });

        if (authError) throw authError;

        if (authData.user) {
          // Profile creation is now handled by Database Trigger (handle_new_user)
          // This ensures profile is created even if email verification is pending.
          
          setMessage("Registrasi berhasil! Silakan cek email Anda untuk verifikasi.");
          setIsSignUp(false);
        }
      } else {
        // Login Logic
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        await fetchUser();
        
        // Check if user was actually set (profile exists)
        const currentUser = useAppStore.getState().currentUser;
        if (currentUser) {
            router.push("/dashboard");
        } else {
            setError("Login berhasil, tetapi profil pengguna tidak ditemukan. Silakan hubungi admin.");
        }
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-emerald-600 p-6 md:p-8 text-center">
          <div className="mx-auto bg-white/20 w-14 md:w-16 h-14 md:h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <Recycle className="w-7 md:w-8 h-7 md:h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Trash to Cash</h1>
          <p className="text-emerald-100">
            {isSignUp ? "Buat Akun Baru" : "Ubah sampahmu menjadi cuan!"}
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleAuth} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs md:text-sm text-center">
                {error}
              </div>
            )}
            {message && (
              <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm text-center">
                {message}
              </div>
            )}
            
            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Nama Anda"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Peran
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="household">Rumah Tangga</option>
                    <option value="waste_bank">Bank Sampah</option>
                    <option value="government">Pemerintah</option>
                  </select>
                </div>
              </>
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
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                isSignUp ? "Daftar" : "Masuk"
              )}
            </button>

            <div className="mt-6 text-center">
              <div className="text-sm text-gray-500">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-emerald-600 hover:underline font-medium"
                >
                  {isSignUp ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
