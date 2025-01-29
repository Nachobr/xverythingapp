"use client";

import { useParams } from "next/navigation";
import { Navbar } from "../../components/NavBar";
import { Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CheckoutModal } from "../../components/modal/CheckoutModal";

interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
  images: string[];
  description: string;
  category: string;
}

const mockProducts: Product[] = [
  // Most Viewed Products
  {
    id: "1",
    title: "Wireless Earbuds",
    price: 129.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598331668826-20cecc596b86?auto=format&fit=crop&q=80"
    ],
    description: "High-quality wireless earbuds with noise cancellation",
    category: "Most Viewed"
  },
  // ... (rest of the mock products)
];

export default function ProductPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const product = mockProducts.find(p => p.id === params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen relative">
      {/* Mobile Bottom Navbar - Only visible on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
        <Navbar className="w-full h-16 !static !flex-row !justify-around !p-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-1 pb-16 md:pb-0">
        {/* Left Navbar - Hidden on mobile */}
        <div className="hidden md:flex justify-end sticky top-0 h-screen">
          <Navbar className="w-20" />
        </div>

        {/* Main Content */}
        <div className="w-full p-4 md:p-8">
          <Link href="/shop" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image Gallery */}
            <div className="space-y-4">
              <div className="max-w-[449px] aspect-square relative overflow-hidden rounded-lg mx-auto md:mx-0">
                <img
                  src={product.images[selectedImage]}
                  alt={`${product.title} - Image ${selectedImage + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="flex space-x-2 max-w-[449px] mx-auto md:mx-0 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-none w-20 h-20 rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                  <span className="ml-2 text-gray-400">{product.rating}</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-400">Category: {product.category}</span>
              </div>

              <div className="text-3xl font-bold text-white">
                ${product.price.toFixed(2)}
              </div>

              <p className="text-gray-400 text-lg">{product.description}</p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-gray-400">Quantity:</label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 bg-gray-800 rounded-md hover:bg-gray-700"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 bg-gray-800 rounded-md hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-3 bg-[#1D9BF0] text-white rounded-lg font-semibold hover:bg-[#1a8cd8] transition-colors"
                  >
                    Buy Now
                  </button>
                  <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    product={product}
                    quantity={quantity}
                  />
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                <ul className="space-y-2 text-gray-400">
                  <li>High-quality materials</li>
                  <li>1 year warranty</li>
                  <li>Free shipping</li>
                  <li>30-day money-back guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}