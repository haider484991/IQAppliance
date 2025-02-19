'use client';

import { useEffect, useState } from 'react';
import OptimizedVideo from '@/components/common/OptimizedVideo';

interface VideoPlayerProps {
  videoId: string;
  title: string;
}

export default function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="aspect-video w-full bg-gray-200 animate-pulse rounded-xl">
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-400">Loading video...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xl">
      <OptimizedVideo
        videoId={videoId}
        title={title}
        thumbnailQuality="maxresdefault"
      />
    </div>
  );
}
