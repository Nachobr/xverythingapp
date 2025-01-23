"use client"; // Add this line since context uses React hooks

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

const ADMIN_WHITELIST = {
  googleEmails: ["ignbritos@gmail.com"],
  walletAddresses: [
    "0x245Bd6B5D8f494df8256Ae44737A1e5D59769aB4",
    "0x9A308aa15E7D0b92fA7BEA916230A1EC1196875e",
  ],
};

interface User {
  id: string;
  email?: string;
  walletAddress?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
  loading: boolean;
  loginWithGoogle: (email: string) => Promise<void>;
  connectWallet: (walletAddress: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLoggedIn = !!user; // true if user exists, false otherwise
  const router = useRouter();

  const loginWithGoogle = async (email: string) => {
    setLoading(true);
    try {
      setUser({ id: "1", email });
      setIsAdmin(ADMIN_WHITELIST.googleEmails.includes(email));
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async (walletAddress: string) => {
    setLoading(true);
    try {
      setUser({ id: "1", walletAddress });
      setIsAdmin(ADMIN_WHITELIST.walletAddresses.includes(walletAddress));
    } catch (error) {
      console.error("Wallet connection failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoggedIn,
        loading,
        loginWithGoogle,
        connectWallet,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}