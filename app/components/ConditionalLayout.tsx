"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { Navbar } from "./NavBar";
import { useEffect, useState } from "react";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, loading, mounted]);

  if (!mounted || loading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex-grow">{children}</div>
    </div>
  ) : null;
}