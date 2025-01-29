"use client";

import { useState } from 'react';
import { Play } from 'lucide-react';
import { Navbar } from '../components/NavBar';
import { useEffect } from 'react';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  type: 'series' | 'movie';
  category: string;
}

const mockContent: ContentItem[] = [
  // Trending
  {
    id: '1',
    title: 'The Last Journey',
    description: 'An epic adventure across unknown lands',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    type: 'movie',
    category: 'Trending'
  },
  {
    id: '2',
    title: 'Cosmic Dreams',
    description: 'Journey through space and time',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video2.mp4',
    type: 'movie',
    category: 'Trending'
  },
  {
    id: '3',
    title: 'Urban Legends',
    description: 'Stories that shaped our cities',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video3.mp4',
    type: 'series',
    category: 'Trending'
  },
  {
    id: '4',
    title: 'Wild Earth',
    description: 'Nature`s untold stories',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video4.mp4',
    type: 'series',
    category: 'Trending'
  },
  {
    id: '5',
    title: 'Tech Revolution',
    description: 'The future is now',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video5.mp4',
    type: 'movie',
    category: 'Trending'
  },
  // Continue watching
  {
    id: '6',
    title: 'Dark Nights',
    description: 'A thrilling mystery series',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video6.mp4',
    type: 'series',
    category: 'Continue watching'
  },
  {
    id: '7',
    title: 'City Lights',
    description: 'Life in the metropolitan dream',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video7.mp4',
    type: 'series',
    category: 'Continue watching'
  },
  {
    id: '8',
    title: 'Medical Frontline',
    description: 'Drama in the emergency room',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video8.mp4',
    type: 'series',
    category: 'Continue watching'
  },
  {
    id: '9',
    title: 'Legal Eagles',
    description: 'Justice in the courtroom',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video9.mp4',
    type: 'series',
    category: 'Continue watching'
  },
  {
    id: '10',
    title: 'Culinary Adventures',
    description: 'A journey through world cuisine',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video10.mp4',
    type: 'series',
    category: 'Continue watching'
  },
  // New Releases
  {
    id: '11',
    title: 'Tomorrow`s Promise',
    description: 'A glimpse into the future',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video11.mp4',
    type: 'movie',
    category: 'New Releases'
  },
  {
    id: '12',
    title: 'Desert Storm',
    description: 'Survival against all odds',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video12.mp4',
    type: 'movie',
    category: 'New Releases'
  },
  {
    id: '13',
    title: 'Ocean Depths',
    description: 'Mysteries of the deep blue',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video13.mp4',
    type: 'series',
    category: 'New Releases'
  },
  {
    id: '14',
    title: 'Mountain Peak',
    description: 'Adventure at high altitude',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video14.mp4',
    type: 'movie',
    category: 'New Releases'
  },
  {
    id: '15',
    title: 'Time Capsule',
    description: 'A journey through history',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video15.mp4',
    type: 'series',
    category: 'New Releases'
  },
  // Must Watch
  {
    id: '16',
    title: 'Classic Revival',
    description: 'Timeless stories retold',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video16.mp4',
    type: 'movie',
    category: 'Must Watch'
  },
  {
    id: '17',
    title: 'Eternal Love',
    description: 'Romance across centuries',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video17.mp4',
    type: 'series',
    category: 'Must Watch'
  },
  {
    id: '18',
    title: 'World Wars',
    description: 'The battles that changed history',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video18.mp4',
    type: 'series',
    category: 'Must Watch'
  },
  {
    id: '19',
    title: 'Space Odyssey',
    description: 'The final frontier',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video19.mp4',
    type: 'movie',
    category: 'Must Watch'
  },
  {
    id: '20',
    title: 'Mind Games',
    description: 'Psychological thriller masterpiece',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://example.com/video20.mp4',
    type: 'movie',
    category: 'Must Watch'
  }
];

export default function ContentPage() {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [slidePositions, setSlidePositions] = useState<{ [key: string]: number }>({});
  const [continueWatchingItems, setContinueWatchingItems] = useState<ContentItem[]>([]);
  const categories = ['Continue watching', 'Trending', 'New Releases', 'Must Watch'];

  const handleVideoSelect = (item: ContentItem) => {
    setSelectedContent(item);
    if (!continueWatchingItems.find(watchedItem => watchedItem.id === item.id)) {
      setContinueWatchingItems(prev => [item, ...prev]);
    }
  };

  const getContentByCategory = (category: string) => {
    if (category === 'Continue watching') {
      return continueWatchingItems;
    }
    return mockContent.filter(item => item.category === category);
  };

  const getItemsPerView = () => {
    // Using Tailwind's default breakpoints
    // 2xl: 1536px and up - 4 items
    // lg: 1024px to 1535px - 3 items
    // md: 768px to 1023px - 2 items
    // Below md - 2 items
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1536) return 4; // 2xl
      if (window.innerWidth >= 1024) return 3; // lg
      return 2; // md and below
    }
    return 4; // Default for SSR
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSlide = (direction: 'left' | 'right', category: string) => {
    const categoryItems = getContentByCategory(category);
    const maxPosition = Math.max(0, Math.ceil(categoryItems.length / itemsPerView) - 1);

    setSlidePositions(prev => {
      const currentPosition = prev[category] || 0;
      let newPosition = direction === 'left' ? 
        Math.max(0, currentPosition - 1) : 
        Math.min(maxPosition, currentPosition + 1);
      
      return { ...prev, [category]: newPosition };
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white scrollbar-hide">
      {/* Left Navbar - Icons only */}
      <div className="fixed left-0 top-0 w-16 md:w-20 h-screen z-50 bg-black scrollbar-hide">
        <Navbar className="w-16 md:w-20 scrollbar-hide" />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-16 md:ml-20 p-4 md:p-8">
        {selectedContent ? (
          <div className="fixed inset-0 bg-black z-40 ml-16 md:ml-20 p-4 md:p-8">
            <button
              onClick={() => setSelectedContent(null)}
              className="mb-4 text-gray-400 hover:text-white"
            >
              ← Back
            </button>
            <div className="relative w-full h-[calc(100vh-200px)] max-w-7xl mx-auto">
              <div className="absolute inset-0">
                <video
                  className="w-full h-full object-contain bg-gray-900 rounded-lg"
                  controls
                  autoPlay
                  src={selectedContent.videoUrl}
                />
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-6">
              <h1 className="text-xl md:text-2xl font-bold mb-2">{selectedContent.title}</h1>
              <p className="text-sm md:text-base text-gray-400">{selectedContent.description}</p>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8">Watch Now</h1>
            
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
                      {getContentByCategory(category).map((item) => (
                        <div
                          key={item.id}
                          className="flex-none w-[calc(50%-0.5rem)] md:w-[calc(33.33%-0.75rem)] lg:w-[calc(25%-0.75rem)] min-w-[200px] max-w-[300px] transform transition-transform duration-200 hover:scale-105 cursor-pointer px-2"
                          onClick={() => handleVideoSelect(item)}
                        >
                          <div className="aspect-video relative overflow-hidden rounded-lg">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover transform hover-group-hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover-group-hover:bg-opacity-60 transition-opacity flex items-center justify-center">
                              <Play className="w-6 h-6 md:w-8 md:h-8 opacity-0 hover-group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <h3 className="font-semibold text-sm md:text-base lg:text-lg">{item.title}</h3>
                            <p className="text-xs md:text-sm text-gray-400">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                    onClick={() => handleSlide('left', category)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transform translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                    onClick={() => handleSlide('right', category)}
                    style={{ right: '-20px' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}