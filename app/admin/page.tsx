"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/button"; // Assuming you have a Button component

export default function AdminDashboard() {
  const { user, isAdmin, logout } = useAuth();
  const router = useRouter();

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
        <p className="text-xl mb-4">You do not have access to this page.</p>
        <Button
          onClick={() => router.push("/")} // Navigate to the home page
          className="px-6 py-2 bg-[#1D9BF0] text-white rounded-full hover:bg-[#1a8cd8]"
        >
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">Welcome, {user?.email || user?.walletAddress}!</p>
      <Button
        onClick={() => {
          logout();
          router.push("/"); // Redirect to home after logout
        }}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
      >
        Logout
      </Button>
      {/* Admin content */}
    </div>
  );
}