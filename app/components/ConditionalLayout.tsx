"use client";

import { useAuth } from "../contexts/AuthContext";
import { Navbar } from "./NavBar";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useAuth();

  // Show a loading state while authentication is being checked
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is not logged in, render the children without the Navbar
  if (!isLoggedIn) {
    return <>{children}</>;
  }

  // If the user is logged in, render the Navbar and the children
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
    </div>
  );
}