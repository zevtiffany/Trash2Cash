"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

export default function Home() {
  const router = useRouter();
  const currentUser = useAppStore((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [currentUser, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-emerald-50">
      <div className="animate-pulse text-emerald-800 font-medium">Loading Trash to Cash...</div>
    </div>
  );
}
