"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Wallet, CreditCard } from 'lucide-react';
import Button from '@/components/ui/button';
import Link from 'next/link';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get('method') as 'crypto' | 'fiat' || 'fiat';
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'crypto') {
      if (!isConnected) {
        await connect({ connector: connectors[0] });
        return;
      }
      // Handle crypto payment processing
      console.log('Processing crypto payment with address:', address);
    } else {
      // Handle fiat payment processing
      console.log('Processing fiat payment with:', shippingDetails);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/shop" className="text-gray-400 hover:text-white mb-6 inline-block">
          ← Back to Shop
        </Link>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
          <div className="space-y-8">
            {paymentMethod === 'fiat' ? (
              <>
                {/* Shipping Information */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={shippingDetails.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={shippingDetails.email}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={shippingDetails.address}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={shippingDetails.city}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={shippingDetails.country}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={shippingDetails.postalCode}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </form>
                </div>

                {/* Credit Card Information */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <>
                {/* Shipping Information */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={shippingDetails.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={shippingDetails.email}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={shippingDetails.address}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={shippingDetails.city}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={shippingDetails.country}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={shippingDetails.postalCode}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </form>
                </div>

                {/* Crypto Payment */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h2 className="text-xl font-semibold mb-6">Crypto Payment</h2>
                  <div className="space-y-6">
                    {!isConnected ? (
                      <div className="text-center">
                        <p className="text-gray-400 mb-4">Connect your wallet to proceed with payment</p>
                        <Button
                          onClick={() => connect({ connector: connectors[0] })}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Wallet className="mr-2 h-5 w-5" />
                          Connect Wallet
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-800 rounded-lg">
                          <p className="text-sm text-gray-400">Connected Wallet</p>
                          <p className="font-mono">{address}</p>
                        </div>
                        <div className="p-4 bg-gray-800 rounded-lg">
                          <p className="text-sm text-gray-400">Amount to Pay</p>
                          <p className="text-xl font-bold">0.1 ETH</p>
                        </div>
                        <Button
                          onClick={() => disconnect()}
                          className="w-full bg-transparent border border-gray-800 hover:bg-gray-800"
                        >
                          Disconnect Wallet
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>$99.99</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>{paymentMethod === 'crypto' ? 'N/A' : '$4.99'}</span>
              </div>
              <div className="border-t border-gray-800 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{paymentMethod === 'crypto' ? '0.1 ETH' : '$104.98'}</span>
                </div>
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6"
              >
                {paymentMethod === 'crypto' 
                  ? (isConnected ? 'Send Transaction' : 'Connect Wallet')
                  : 'Complete Purchase'
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}