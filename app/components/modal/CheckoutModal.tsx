"use client";

import { useState } from 'react';
import { X, Wallet, CreditCard } from 'lucide-react';
import Link from 'next/link';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  quantity: number;
}

export function CheckoutModal({ isOpen, onClose, product, quantity }: CheckoutModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'fiat'>('fiat');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-gray-400">Quantity: {quantity}</p>
              <p className="font-bold">${(product.price * quantity).toFixed(2)}</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4">
            <p className="flex justify-between mb-2">
              <span className="text-gray-400">Subtotal</span>
              <span>${(product.price * quantity).toFixed(2)}</span>
            </p>
            <p className="flex justify-between mb-2">
              <span className="text-gray-400">Shipping</span>
              <span>Free</span>
            </p>
            <p className="flex justify-between font-bold text-lg pt-2 border-t border-gray-800">
              <span>Total</span>
              <span>${(product.price * quantity).toFixed(2)}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod('fiat')}
                className={`p-4 rounded-lg border ${paymentMethod === 'fiat' ? 'border-blue-500 bg-blue-500 bg-opacity-10' : 'border-gray-800'} flex items-center gap-3 hover:border-blue-500 transition-colors`}
              >
                <CreditCard className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-medium">Credit Card</div>
                  <div className="text-sm text-gray-400">Pay with card</div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('crypto')}
                className={`p-4 rounded-lg border ${paymentMethod === 'crypto' ? 'border-blue-500 bg-blue-500 bg-opacity-10' : 'border-gray-800'} flex items-center gap-3 hover:border-blue-500 transition-colors`}
              >
                <Wallet className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-medium">Crypto</div>
                  <div className="text-sm text-gray-400">Pay with crypto</div>
                </div>
              </button>
            </div>

            <Link
              href={`/shop/checkout?method=${paymentMethod}`}
              className="block w-full"
              onClick={onClose}
            >
              <button
                disabled={isProcessing}
                className="w-full py-3 bg-[#1D9BF0] text-white rounded-lg font-semibold hover:bg-[#1a8cd8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}