"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import Sidebar from "@/components/dashboard/Sidebar";
import { Menu, Recycle } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const currentUser = useAppStore((state) => state.currentUser);
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !currentUser) {
      router.push("/login");
    }
  }, [isMounted, currentUser, router]);

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  if (!currentUser) {
    return null; // Will redirect
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
<<<<<<< HEAD
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between md:hidden sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-emerald-900">Trash2Cash</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
=======
      <Sidebar />
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        {children}
      </main>
>>>>>>> 4413bebe34a81526eb0c85a01edc4ad6dfd221ad
    </div>
  );
}
