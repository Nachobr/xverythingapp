"use client";

import Link from "next/link";
import {
  Home,
  MessageCircle,
  Video,
  Briefcase,
  ShoppingBag,
  Bot,
  Wallet,
  User,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import Button from "./ui/button";
import { useState } from "react";
import { PostModal } from "./modal/PostModal";
import { MoreOptionsModal } from "./buttons/MoreOptions";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { useDisconnect } from 'wagmi';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const { disconnect } = useDisconnect();
  const isCompact = className?.includes('w-20') || className?.includes('w-22') || className?.includes('w-24');

  const handleLogout = async () => {
    try {
      await disconnect();
      logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className={`fixed h-screen p-2 flex flex-col justify-between overflow-hidden ${className || ''}`}>
      <div className="flex flex-col space-y-1 overflow-y-auto scrollbar-hide">
        <Link
          href="/home"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <Home className="h-8 w-8" />
          {!isCompact && <span className="ml-4">Home</span>}
        </Link>

        <Link
          href="/messages"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <MessageCircle className="h-8 w-8" />
          {!isCompact && <span className="ml-4">Messages</span>}
        </Link>

        <Link
          href="/content"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <Video className="h-8 w-8" />
          {!isCompact && <span className="ml-4">Tv</span>}
        </Link>

        <Link
          href="/jobs"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <Briefcase className="h-8 w-8" />
          {!isCompact && <span className="ml-4">Jobs</span>}
        </Link>

        <Link
          href="/shop"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <ShoppingBag className="h-8 w-8" />
          {!isCompact && <span className="ml-4">Shop</span>}
        </Link>

        <Link
          href="/ai"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <Bot className="h-8 w-8" />
          {!isCompact && <span className="ml-4">AI</span>}
        </Link>

        <Link
          href="/payments"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <Wallet className="h-8 w-8" />
          {!isCompact && <span className="ml-4">Payments</span>}
        </Link>

        <Link
          href="/profile"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <User className="h-8 w-8" />
          {!isCompact && <span className="ml-4">Profile</span>}
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsMoreOptionsOpen(true)}
            className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
          >
            <MoreHorizontal className="h-8 w-8" />
            {!isCompact && <span className="ml-4">More Options</span>}
          </button>

          <MoreOptionsModal isOpen={isMoreOptionsOpen} onClose={() => setIsMoreOptionsOpen(false)} />
        </div>

        <Button
          onClick={() => setIsPostModalOpen(true)}
          className={`w-full h-12 rounded-full bg-white hover:bg-gray-200 text-black font-bold text-lg flex items-center justify-center`}
        >
          {isCompact ? <Plus className="h-6 w-6" /> : "Post"}
        </Button>

        <PostModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
      </div>

      {isLoggedIn && user && (
        <div className="mt-auto pt-4">
          <div className="flex items-center space-x-3 p-3 rounded-full hover:bg-gray-900 transition-colors cursor-pointer">
            <Image
              src={(user as any).avatar || `https://ui-avatars.com/api/?name=${user.email || user.walletAddress}&background=random&color=fff`}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-avatar.png';
              }}
            />
            {!isCompact && (
              <div>
                <div className="font-semibold text-white">
                  {user.email || (user.walletAddress ? 
                    `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` : 
                    'Unknown')}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-400 hover:text-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}