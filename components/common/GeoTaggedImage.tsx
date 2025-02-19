import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { getCityCoordinates } from '@/lib/getCityCoordinates';
import { MapPin } from 'lucide-react';

interface GeoTaggedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  city: string;
  state: string;
}

const GeoTaggedImage: FC<GeoTaggedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  city,
  state
}) => {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const loadCoordinates = async () => {
      const coords = await getCityCoordinates(`${city}, ${state}`);
      if (coords) {
        setCoordinates(coords);
      }
    };
    loadCoordinates();
  }, [city, state]);

  // Construct structured data for the image
  const structuredData = coordinates ? {
    '@context': 'https://schema.org/',
    '@type': 'ImageObject',
    contentUrl: `https://ff5construction.com${src}`,
    description: alt,
    width,
    height,
    contentLocation: {
      '@type': 'Place',
      name: `${city}, ${state}`,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      }
    }
  } : null;

  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      <div className="relative">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full transition-transform duration-700 ${isMounted ? 'group-hover:scale-105' : ''} ${className}`}
          priority
          onLoadingComplete={() => setIsLoaded(true)}
        />
        
        {/* Geo-tag indicator - only show on client side */}
        {isMounted && coordinates && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium text-sky-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <MapPin className="w-4 h-4 text-sky-600" />
            <span>
              {coordinates.latitude.toFixed(2)}°N, {coordinates.longitude.toFixed(2)}°W
            </span>
          </div>
        )}
        
        {/* Loading skeleton - only show on client side */}
        {isMounted && !isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default GeoTaggedImage;
