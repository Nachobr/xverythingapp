"use client";

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import { useEffect } from 'react';

export default function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, status } = useConnect();
  const { disconnect } = useDisconnect();
  const { connectWallet } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const handleAddressChange = async () => {
      if (isConnected && address && mounted) {
        try {
          //console.log("Wallet connected, storing address:", address);
          await connectWallet(address as string);
          if (mounted) {
            router.push("/home");
          }
        } catch (error) {
          console.error("Failed to process wallet connection:", error);
        }
      }
    };

    handleAddressChange();

    return () => {
      mounted = false;
    };
  }, [isConnected, address]);  // Remove connectWallet and router from dependencies

  const handleConnect = async () => {
    try {
      if (!isConnected) {
        const connector = connectors[0];
        if (connector) {
          await connect({ connector });
        } else {
          console.error('No connectors available');
        }
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Disconnect error:", error);
    }
  };

  return (
    <Button 
      onClick={isConnected ? handleDisconnect : handleConnect}
      disabled={status === 'pending'}
      className="w-full flex items-center justify-center gap-x-3 py-2.5 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
    >
      {isConnected ? "Disconnect Wallet" : 
        status === 'pending' ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}