"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
/*import { Wallet2 } from "lucide-react";*/
import { useAccount } from 'wagmi'
import { useEffect, useCallback } from 'react'
import { useConnect, useDisconnect } from 'wagmi'
import ConnectButton from "@/components/ConnectButton"


export default function Home() {
  const { user, isLoggedIn, isAdmin, loginWithGoogle, loginWithApple, connectWallet, logout, loading } = useAuth();
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  const handleGoogleLogin = async () => {
    await loginWithGoogle("test@example.com"); // Example email for testing
    router.push("/home");
  };

  const handleAppleLogin = async () => {
    await loginWithApple("test@example.com"); // Example email for testing
    router.push("/home");
  };

  const handleWalletConnect = useCallback(async () => {
    try {
      if (!isConnected) {
        // Connect using the first available connector
        await connect({ connector: connectors[0] });
      } else if (address) {
        //console.log("Wallet already connected, address:", address);
        await connectWallet(address as string);
        router.push("/home");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  }, [connect, connectors, connectWallet, router, address, isConnected]);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/home');
    }
  }, [isLoggedIn, router]);

  /*
    useEffect(() => {
      //console.log("User:", user);
      //console.log("Is Logged In:", isLoggedIn);
    }, [user, isLoggedIn]);
  */
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <Image src="/favico.ico" alt="X Logo" width={40} height={40} className="mx-auto mb-8" />
            <h1 className="text-4xl font-bold mb-3">Happening now</h1>
            <h2 className="text-2xl font-bold mb-8">Join today</h2>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-x-3 py-2.5  rounded-full font-medium bg-white text-black hover:bg-gray-200  transition-colors">
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              <span>Sign in with Google</span>
            </Button>

            <Button
              onClick={handleAppleLogin}
              className="w-full flex items-center justify-center gap-x-3 py-2.5  rounded-full font-medium bg-white text-black hover:bg-gray-200 transition-colors">
              <Image src="/apple.svg" alt="Apple" width={20} height={20} />
              <span>Sign in with Apple</span>
            </Button>
            <div className="w-full ">

              <ConnectButton />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-500">or</span>
              </div>
            </div>
            <Link href="/register" className="w-full flex items-center justify-center gap-x-3 py-2.5 bg-[#1d9bf0] rounded-full font-medium hover:bg-[#1a8cd8] transition-colors">
              <span>Sign up</span>
            </Link>
            <div className="text-xs text-gray-500 mt-2">
            By signing up, you agree to the, <Link href="/terms" className="text-[#1d9bf0] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#1d9bf0] hover:underline">Privacy policy</Link>, including <Link href="/cookies" className="text-[#1d9bf0] hover:underline">Cookie Use</Link>.
            </div>
            <div className="mt-2">
              <p className="text-gray-500">Already have an account?</p>
              <Link href="/login" className="w-full flex text-[#1d9bf0] block mt-2 items-center justify-center gap-x-3 py-2.5 bg-black border rounded-full font-medium hover:bg-[#181818] ">
                Sign in
              </Link>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}