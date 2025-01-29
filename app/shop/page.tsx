"use client";

import { useState } from "react";
import { Navbar } from "../components/NavBar";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import  Link  from "next/link";

interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
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
    description: "High-quality wireless earbuds with noise cancellation",
    category: "Most Viewed"
  },
  {
    id: "2",
    title: "Smart Watch",
    price: 199.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80",
    description: "Advanced smartwatch with health tracking",
    category: "Most Viewed"
  },
  {
    id: "3",
    title: "Noise-Canceli Heads",
    price: 299.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80",
    description: "Premium over-ear headphones w/ noise cancellation",
    category: "Most Viewed"
  },
  {
    id: "4",
    title: "Wireless Charging Pad",
    price: 39.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1622957040873-8ea24e293885?auto=format&fit=crop&q=80",
    description: "Fast wireless charging pad for all Qi-enabled devices",
    category: "Most Viewed"
  },
  {
    id: "5",
    title: "Portable Power Bank",
    price: 49.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80",
    description: "20000mAh high-capacity power bank with fast charging",
    category: "Most Viewed"
  },

  // Recently Added Products
  {
    id: "6",
    title: "Laptop Stand",
    price: 49.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80",
    description: "Ergonomic laptop stand for better posture",
    category: "Recently Added"
  },
  {
    id: "7",
    title: "Wireless Mouse",
    price: 79.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80",
    description: "Ergonomic wireless mouse with customizable buttons",
    category: "Recently Added"
  },
  {
    id: "8",
    title: "USB-C Hub",
    price: 69.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1636389657137-99daa67761ef?auto=format&fit=crop&q=80",
    description: "7-in-1 USB-C hub with multiple ports and card readers",
    category: "Recently Added"
  },
  {
    id: "9",
    title: "Webcam Cover",
    price: 9.99,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1622957040873-8ea24e293885?auto=format&fit=crop&q=80",
    description: "Privacy webcam cover for laptops and tablets",
    category: "Recently Added"
  },
  {
    id: "10",
    title: "Phone Stand",
    price: 19.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&q=80",
    description: "Adjustable phone stand for desk or bedside",
    category: "Recently Added"
  },

  // Featured Products
  {
    id: "11",
    title: "Mechanical Keyboard",
    price: 149.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80",
    description: "Premium mechanical keyboard with RGB lighting",
    category: "Featured Products"
  },
  {
    id: "12",
    title: "4K Webcam",
    price: 199.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1622957040873-8ea24e293885?auto=format&fit=crop&q=80",
    description: "Professional 4K webcam with auto-focus",
    category: "Featured Products"
  },
  {
    id: "13",
    title: "Gaming Mouse",
    price: 89.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80",
    description: "High-precision gaming mouse with RGB lighting",
    category: "Featured Products"
  },
  {
    id: "14",
    title: "Desk Mat",
    price: 29.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80",
    description: "Large desk mat for keyboard and mouse",
    category: "Featured Products"
  },
  {
    id: "15",
    title: "Monitor Light Bar",
    price: 79.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1622957040873-8ea24e293885?auto=format&fit=crop&q=80",
    description: "LED monitor light bar for reduced eye strain",
    category: "Featured Products"
  }
];

export default function ShopPage() {
  const [slidePositions, setSlidePositions] = useState<{ [key: string]: number }>({});
  const categories = ['Most Viewed', 'Recently Added', 'Featured Products'];

  const getProductsByCategory = (category: string) => {
    return mockProducts.filter(product => product.category === category);
  };

  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1536) return 4; // 2xl
      if (window.innerWidth >= 1024) return 3; // lg
      return 2; // md and below
    }
    return 4; // Default for SSR
  };

  const handleSlide = (direction: 'left' | 'right', category: string) => {
    const categoryProducts = getProductsByCategory(category);
    const maxPosition = Math.max(0, Math.ceil(categoryProducts.length / getItemsPerView()) - 1);

    setSlidePositions(prev => {
      const currentPosition = prev[category] || 0;
      let newPosition = direction === 'left' ? 
        Math.max(0, currentPosition - 1) : 
        Math.min(maxPosition, currentPosition + 1);
      
      return { ...prev, [category]: newPosition };
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
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
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8">Shop</h1>
          
          {categories.map((category) => (
            <div key={category} className="mb-6 md:mb-8 relative group overflow-visible">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{category}</h2>
              <div className="relative">
                <div className="flex overflow-hidden relative">
                  <div 
                    className="flex transition-transform duration-300 ease-out space-x-4 md:space-x-6"
                    style={{
                      transform: `translateX(-${(slidePositions[category] || 0) * (100)}%)`
                    }}
                  >
                    {getProductsByCategory(category).map((product) => (
                      <Link
                        href={`/shop/${product.id}`}
                        key={product.id}
                        className="flex-none w-[calc(50%-0.5rem)] md:w-[calc(33.33%-0.75rem)] lg:w-[calc(25%-0.75rem)] min-w-[200px] max-w-[300px] transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                      >
                        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                          <div className="aspect-square relative overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-base md:text-lg mb-2">{product.title}</h3>
                            <p className="text-gray-400 text-sm mb-2">{product.description}</p>
                            <div className="flex items-center mb-2">
                              {renderStars(product.rating)}
                              <span className="ml-2 text-sm text-gray-400">{product.rating}</span>
                            </div>
                            <div className="text-lg font-bold text-white">${product.price.toFixed(2)}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  onClick={() => handleSlide('left', category)}
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transform translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  onClick={() => handleSlide('right', category)}
                  style={{ right: '-20px' }}
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}