"use client";

import { useState } from "react";
import { Navbar } from "../components/NavBar";
import { SearchBar } from "../components/ui/SearchBar";
import { PostField } from "../components/ui/PostField";
import { Feed } from "../components/ui/Feed";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"forYou" | "following">("forYou");

  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-1">
      {/* Left Navbar */}
      <div className="sticky top-0  flex justify-end w-2xs  h-screen">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="w-2xl border-x border-gray-800">
        {/* Header with Tabs */}
        <header className="top-0  bg-black bg-opacity-75 backdrop-blur-md z-30 border-b border-gray-800">
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

      {/* Right Sidebar (Search Bar and More) */}
      <div className=" w-96">
        <SearchBar />
        {/* Additional widgets or content can go here */}
      </div>
    </div>
  );
}