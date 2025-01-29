"use client";

import { useState } from "react";
import { Navbar } from "../components/NavBar";
import { SearchBar } from "../components/ui/SearchBar";
import { PostField } from "../components/ui/PostField";
import { Feed } from "../components/ui/Feed";
import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"forYou" | "following">("forYou");
  const { address, isConnected } = useAccount();
  const { user, isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen relative">
      {/* Mobile Bottom Navbar - Only visible on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
        <Navbar className="w-full h-16 !static !flex-row !justify-around !p-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 pb-16 md:pb-0">
        {/* Left Navbar - Hidden on mobile */}
        <div className="hidden md:flex justify-end sticky top-0 h-screen">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2xl border-x border-gray-800">
          {/* Header with Tabs */}
          <header className="sticky top-0 bg-black bg-opacity-75 backdrop-blur-md z-30 border-b border-gray-800">
            <div className="flex">
              <button
                className={`flex-1 py-3 text-center font-semibold hover:bg-gray-900 transition-colors ${
                  activeTab === "forYou" ? "border-b-4 border-blue-500" : ""
                }`}
                onClick={() => setActiveTab("forYou")}
              >
                For you
              </button>
              <button
                className={`flex-1 py-3 text-center font-semibold hover:bg-gray-900 transition-colors ${
                  activeTab === "following" ? "border-b-4 border-blue-500" : ""
                }`}
                onClick={() => setActiveTab("following")}
              >
                Following
              </button>
            </div>
          </header>

          {/* Post Field */}
          <PostField />

          {/* Feed */}
          <Feed activeTab={activeTab} />
        </div>

        {/* Right Sidebar - Hidden on mobile */}
        <div className="hidden md:block w-96">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}