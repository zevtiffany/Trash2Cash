"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Trash2, 
  Gift, 
  BookOpen, 
  LogOut, 
  Recycle,
  BarChart3,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const getNavItems = () => {
    const items = [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: ["household", "waste_bank", "government"],
      },
      {
        label: "Input Sampah",
        href: "/dashboard/input",
        icon: Trash2,
        roles: ["waste_bank"],
      },
      {
        label: "Tukar Poin",
        href: "/dashboard/rewards",
        icon: Gift,
        roles: ["household"],
      },
      {
        label: "Edukasi",
        href: "/dashboard/education",
        icon: BookOpen,
        roles: ["household"],
      },
      {
        label: "Statistik",
        href: "/dashboard/stats", // Assuming this is a separate page or part of dashboard
        icon: BarChart3,
        roles: ["government"],
      },
    ];

    return items.filter((item) => item.roles.includes(currentUser.role));
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Recycle className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-emerald-900">Trash2Cash</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30 top-16"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-40 transition-transform duration-300",
        "hidden md:flex",
        isOpen && "md:hidden flex top-16 h-[calc(100vh-64px)]"
      )}>
        {/* Desktop Header */}
        <div className="hidden md:flex items-center gap-3 border-b border-gray-100 p-6">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Recycle className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-emerald-900">Trash2Cash</span>
        </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="mb-6 px-4 py-3 bg-emerald-50 rounded-lg">
          <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-1">
            Login Sebagai
          </p>
          <p className="font-medium text-emerald-900 truncate">{currentUser.name}</p>
          <p className="text-sm text-emerald-700 capitalize">{currentUser.role.replace('_', ' ')}</p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
      </div>
    </>
  );
}
