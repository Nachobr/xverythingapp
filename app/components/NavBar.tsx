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
  Search,
  Users,
  Bell
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
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const { disconnect } = useDisconnect();
  const isCompact = className?.includes('w-20') || className?.includes('w-22') || className?.includes('w-24');
  const isMobile = className?.includes('!flex-row');

  const handleLogout = async () => {
    try {
      await disconnect();
      logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const MobileTopBar = () => (
    <div className="fixed top-0 left-0 right-0 h-14 bg-black border-b border-gray-800 flex items-center px-4 z-50">
      <button
        onClick={() => setIsSideMenuOpen(true)}
        className="p-2 rounded-full hover:bg-gray-900 transition-colors"
      >
        <Image
          src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.email || user?.walletAddress}&background=random&color=fff`}
          alt="Profile"
          width={32}
          height={32}
          className="rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-avatar.png';
          }}
        />
      </button>
      <div className="flex-1 flex justify-center">
        <Image src="/favico.ico" alt="X Logo" width={32} height={32} />
      </div>
    </div>
  );

  const MobileBottomBar = () => (
    <div className="flex justify-around items-center w-full">
      <Link href="/home" className="p-3">
        <Home className="h-6 w-6 text-white" />
      </Link>
      <Link href="/search" className="p-3">
        <Search className="h-6 w-6 text-white" />
      </Link>
      <Link href="/content" className="p-3">
        <Video className="h-6 w-6 text-white" />
      </Link>
      <Link href="/ai" className="p-3">
        <Bot className="h-6 w-6 text-white" />
      </Link>
      <Link href="/community" className="p-3">
        <Users className="h-6 w-6 text-white" />
      </Link>
      <Link href="/notifications" className="p-3">
        <Bell className="h-6 w-6 text-white" />
      </Link>
      <Link href="/messages" className="p-3">
        <MessageCircle className="h-6 w-6 text-white" />
      </Link>
    </div>
  );

  const SideMenu = () => (
    <div className={`fixed inset-0 z-50 ${isSideMenuOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsSideMenuOpen(false)} />
      <div className="absolute left-0 top-0 bottom-0 w-3/4 max-w-sm bg-black border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <Image
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.email || user?.walletAddress}&background=random&color=fff`}
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
                {user?.email || (user?.walletAddress ?
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
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {/* Side menu links */}
          <Link href="/profile" className="p-4 hover:bg-gray-900 flex items-center space-x-3">
            <User className="h-6 w-6" />
            <span>Profile</span>
          </Link>
          <Link href="/jobs" className="p-4 hover:bg-gray-900 flex items-center space-x-3">
            <Briefcase className="h-6 w-6" />
            <span>Jobs</span>
          </Link>
          <Link href="/shop" className="p-4 hover:bg-gray-900 flex items-center space-x-3">
            <ShoppingBag className="h-6 w-6" />
            <span>Shop</span>
          </Link>
          <Link href="/payments" className="p-4 hover:bg-gray-900 flex items-center space-x-3">
            <Wallet className="h-6 w-6" />
            <span>Payments</span>
          </Link>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <MobileTopBar />
        <MobileBottomBar />
        <SideMenu />
      </>
    );
  }

  return (
    <nav className={`${isMobile ? 'flex-row justify-around items-center' : 'flex-col justify-between'} flex overflow-hidden ${className || ''}`}>
      <div className={`${isMobile ? 'flex-row justify-around w-full' : 'flex-col space-y-1'} flex overflow-y-auto scrollbar-hide`}>
        <Link
          href="/home"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <Home className="h-8 w-8" />
          {!isCompact && !isMobile && <span className="ml-4">Home</span>}
        </Link>

        <Link
          href="/messages"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <MessageCircle className="h-8 w-8" />
          {!isCompact && !isMobile && <span className="ml-4">Messages</span>}
        </Link>

        <Link
          href="/content"
          className="p-3 rounded-full hover:bg-gray-900 transition-colors inline-flex items-center text-xl text-white"
        >
          <Video className="h-8 w-8" />
          {!isCompact && !isMobile && <span className="ml-4">Tv</span>}
        </Link>

        {!isMobile && (
          <>
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
          </>
        )}
      </div>

      {isLoggedIn && user && !isMobile && (
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