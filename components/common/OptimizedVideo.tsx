'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedVideoProps {
  videoId: string;
  title: string;
  thumbnailQuality?: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault';
}

export default function OptimizedVideo({ 
  videoId, 
  title,
  thumbnailQuality = 'maxresdefault' 
}: OptimizedVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple visibility check
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`video-container-${videoId}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [videoId]);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`;

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div 
      id={`video-container-${videoId}`}
      className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100"
    >
      {!isPlaying ? (
        <button 
          onClick={handlePlayClick}
          className="absolute inset-0 w-full h-full cursor-pointer group"
          aria-label={`Play ${title}`}
        >
          {isVisible && (
            <>
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                className="object-cover transition-opacity duration-300"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-transform duration-300 group-hover:scale-110">
                  <svg 
                    className="w-8 h-8 md:w-10 md:h-10 text-white fill-current" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </>
          )}
        </button>
      ) : (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  );
}
