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
  X,
  Phone,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAppStore();

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
        label: "Bank Sampah",
        href: "/dashboard/locations",
        icon: MapPin,
        roles: ["household", "waste_bank"],
      },
      {
        label: "Hubungi Kami",
        href: "/dashboard/contact",
        icon: Phone,
        roles: ["household", "waste_bank", "government"],
      },
      {
        label: "Statistik",
        href: "/dashboard/stats",
        icon: BarChart3,
        roles: ["government"],
      },
    ];

    return items.filter((item) => item.roles.includes(currentUser.role));
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "h-screen w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Recycle className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-emerald-900">Trash2Cash</span>
        </div>

        <div className="p-4">
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
                  onClick={() => onClose()} // Close sidebar on mobile when link clicked
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

        <div className="mt-auto p-4 border-t border-gray-100">
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
