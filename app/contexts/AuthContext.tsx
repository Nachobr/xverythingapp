"use client"; // Add this line since context uses React hooks

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
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
  loginWithApple: (email: string) => Promise<void>;
  connectWallet: (walletAddress: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const loginWithApple = async (email: string) => {
    setLoading(true);
    try {
      const userData = { id: "1", email, isAdmin: ADMIN_WHITELIST.googleEmails.includes(email) };
      setUser(userData);
      setIsAdmin(userData.isAdmin);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
    } catch (error) {
      console.error("Apple login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (loggedInStatus === 'true') { // Explicitly check for 'true' string
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false); // Ensure isLoggedIn is explicitly set to false if not 'true' in localStorage
    }
  }, []);

  const loginWithGoogle = async (email: string) => {
    setLoading(true);
    //console.log("loginWithGoogle started, email:", email); // ADDED LOG
    try {
      const userData = { id: "1", email, isAdmin: ADMIN_WHITELIST.googleEmails.includes(email) };
      setUser(userData);
      setIsAdmin(userData.isAdmin);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      //console.log("loginWithGoogle success, isLoggedIn:", true, "user:", userData); // ADDED LOG
    } catch (error) {
      console.error("Google login failed:", error);
      //console.log("loginWithGoogle failed, isLoggedIn:", false); // ADDED LOG
    } finally {
      setLoading(false);
      //console.log("loginWithGoogle finally, loading:", false); // ADDED LOG
    }
  };

  const connectWallet = async (walletAddress: string) => {
    try {
      if (walletAddress) {
        const userData = {
          id: "1",
          walletAddress: walletAddress.toLowerCase(),
          isAdmin: ADMIN_WHITELIST.walletAddresses.some(
            address => address.toLowerCase() === walletAddress.toLowerCase()
          )
        };
        
        setUser(userData);
        setIsAdmin(userData.isAdmin);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        //console.log("connectWallet success, isLoggedIn:", true, "user:", userData);
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  useEffect(() => {
    // Skip the redirect if we're in the process of logging out
    if (isLoggedIn && !localStorage.getItem('loggingOut')) {
      router.push('/home');
    }
  }, [isLoggedIn, router]);

  const logout = () => {
    try {
      // Set logging out flag
      localStorage.setItem('loggingOut', 'true');
      
      // Clear state
      setUser(null);
      setIsAdmin(false);
      setIsLoggedIn(false);
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      
      // Clear the logging out flag and redirect
      localStorage.removeItem('loggingOut');
      router.push('/');
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem('loggingOut');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoggedIn,
        loading,
        loginWithGoogle,
        loginWithApple,
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