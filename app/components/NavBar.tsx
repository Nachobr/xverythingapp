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

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="fixed h-screen p-4 flex flex-col justify-between">
      <div className="flex flex-col space-y-1 overflow-y-auto" style={{ border: "dotted 1px red" }}>
        <Link
          href="/"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <Home className="h-7 w-7" />
          <span className="ml-4">Home</span>
        </Link>

        <Link
          href="/messages"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <MessageCircle className="h-7 w-7" />
          <span className="ml-4">Messages</span>
        </Link>

        <Link
          href="/content"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <Video className="h-7 w-7" />
          <span className="ml-4">Tv</span>
        </Link>

        <Link
          href="/jobs"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <Briefcase className="h-7 w-7" />
          <span className="ml-4">Jobs</span>
        </Link>

        <Link
          href="/shop"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <ShoppingBag className="h-7 w-7" />
          <span className="ml-4">Shop</span>
        </Link>

        <Link
          href="/ai"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <Bot className="h-7 w-7" />
          <span className="ml-4">AI</span>
        </Link>

        <Link
          href="/payments"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <Wallet className="h-7 w-7" />
          <span className="ml-4">Payments</span>
        </Link>

        <Link
          href="/profile"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <User className="h-7 w-7" />
          <span className="ml-4">Profile</span>
        </Link>

        {/* Relative container for positioning the modal */}
        <div className="relative">
          <button
            onClick={() => setIsMoreOptionsOpen(true)}
            className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
          >
            <MoreHorizontal className="h-7 w-7" />
            <span className="ml-4">More Options</span>
          </button>

          {/* MoreOptionsModal */}
          <MoreOptionsModal isOpen={isMoreOptionsOpen} onClose={() => setIsMoreOptionsOpen(false)} />
        </div>

        <Button
          onClick={() => setIsPostModalOpen(true)}
          className="w-full h-12 rounded-full bg-white hover:bg-gray-200 text-black font-bold text-lg"
        >
          Post
        </Button>

        <PostModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
      </div>

      {/* User Info Section - Moved outside the scrollable area */}
      {isLoggedIn && user && (
        <div className="mt-auto pt-4">
          <div className="flex items-center space-x-3 p-3 rounded-full hover:bg-gray-900 transition-colors">
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
            <div>
              <div className="font-semibold text-white">
                {user.email || user.walletAddress}
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-400 hover:text-gray-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}