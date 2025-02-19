import { useState } from 'react';
import Image from 'next/image';

interface YouTubeVideoProps {
  embedId: string;
  title: string;
}

export default function YouTubeVideo({ embedId, title }: YouTubeVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full h-0 pb-[75%] sm:pb-[85%] md:pb-[85%] lg:pb-[75%]">
      {!isPlaying ? (
        <button 
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 w-full h-full cursor-pointer group"
          aria-label="Play video"
        >
          {/* Thumbnail */}
          <Image
            src={`https://img.youtube.com/vi/${embedId}/maxresdefault.jpg`}
            alt={title}
            fill
            className="object-cover rounded-2xl"
            priority
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors">
              <svg 
                className="w-8 h-8 md:w-10 md:h-10 text-white fill-current" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      ) : (
        <iframe
          className="absolute inset-0 w-full h-full rounded-2xl"
          src={`https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay"
          allowFullScreen
          style={{ border: 0 }}
        />
      )}
    </div>
  );
}