"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Wallet2 } from "lucide-react";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user, isAdmin, loginWithGoogle, connectWallet, logout, loading } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const email = "ignbritos@gmail.com"; // Replace with actual email from Google login
    await loginWithGoogle(email);
    router.push("/home"); // Redirect to home page after login
  };

  const handleWalletConnect = async () => {
    const walletAddress = "0x245Bd6B5D8f494df8256Ae44737A1e5D59769aB4"; // Replace with actual wallet address
    await connectWallet(walletAddress);
    router.push("/home"); // Redirect to home page after login
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ConditionalLayout>
      <div className="flex-grow flex justify-center items-center p-16">
        <div className="w-full flex flex-row justify-center items-center max-w-full space-y-8 space-x-4">
          <div className="flex flex-col lg:w-96 lg:h-96">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-10 h-10 text-white md:w-12 md:h-12 lg:w-auto lg:h-auto"
            >
              <g>
                <path
                  fill="currentColor"
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                ></path>
              </g>
            </svg>
          </div>
          <div className="flex flex-col max-w-screen">
            <div className="space-y-6">
              <h1 className="text-6xl font-bold">Happening now</h1>
              <h2 className="text-3xl font-bold">Join today </h2>
            </div>

            <div className="space-y-2">
              {/* Sign up with Google */}
              <div className="w-72 mw-72 grid justify-center items-center bg-white hover:bg-gray-200 rounded-full">
                <Button
                  variant="outline"
                  className="flex justify-center items-center gap-x-4 w-52 h-10 text-base font-medium bg-white text-black hover:bg-gray-200"
                  onClick={handleGoogleLogin}
                >
                  <Image
                    src="/google.svg?height=20&width=20"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  Sign up with Google
                </Button>
              </div>

              {/* Connect Wallet */}
              <div className="w-72 mw-72 grid justify-center items-center bg-white hover:bg-gray-200 rounded-full">
                <Button
                  variant="outline"
                  className="flex justify-center items-center gap-x-4 w-52 h-10 text-base font-medium bg-white text-black hover:bg-gray-200"
                  onClick={handleWalletConnect}
                >
                  <Wallet2 className="h-5 w-5" />
                  Connect Wallet
                </Button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center w-72 mw-72">
                  <span className="w-full border-t border-gray-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase w-72 mw-72">
                  <span className="bg-black px-2 text-white">or</span>
                </div>
              </div>

              {/* Create Account */}
              <Button className="w-72 mw-72 h-10 text-base font-medium bg-[#1D9BF0] text-white hover:bg-gray-200 rounded-full">
                Create account
              </Button>

              {/* Terms and Conditions */}
              <div className="text-xs text-gray-500 w-72 mw-72">
                By signing up, you agree to the{" "}
                <Link href="#" className="text-[#1d9bf0] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#1d9bf0] hover:underline">
                  Privacy Policy
                </Link>
                , including{" "}
                <Link href="#" className="text-[#1d9bf0] hover:underline">
                  Cookie Use
                </Link>
                .
              </div>
            </div>

            {/* Already have an account? */}
            <div className="space-y-4 w-72 mw-72">
              <h3 className="font-bold">Already have an account?</h3>
              {user ? (
                <>
                  <p>Welcome, {user.email || user.walletAddress}!</p>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      className="w-full h-10 text-base font-medium border-gray-800 hover:bg-[#181818] text-[#1d9bf0]"
                      onClick={() => router.push("/admin")}
                    >
                      Go to Admin Dashboard
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full h-10 text-base font-medium border-[#536471] border-2 hover:bg-[#181818] text-[#1d9bf0] rounded-full border-solid"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="w-full h-10 text-base font-medium border-[#536471] border-2 hover:bg-[#181818] text-[#1d9bf0] rounded-full border-solid"
                  onClick={handleGoogleLogin}
                >
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </ConditionalLayout>
  );
}