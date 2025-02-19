'use client';

import React from 'react';
import dynamic from 'next/dynamic';

interface CityMapProps {
  latitude: number;
  longitude: number;
  cityName: string;
  className?: string;
}

// Dynamically import MapComponent with no SSR
const MapWithNoSSR = dynamic(
  () => import('./MapComponent'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-sky-500 border-t-transparent rounded-full mx-auto mb-2"></div>
          <span className="text-gray-500">Loading map...</span>
        </div>
      </div>
    )
  }
);

const CityMap: React.FC<CityMapProps> = ({
  latitude,
  longitude,
  cityName,
  className = ''
}) => {
  // Validate coordinates
  const validCoordinates = 
    typeof latitude === 'number' && 
    typeof longitude === 'number' && 
    !isNaN(latitude) && 
    !isNaN(longitude) && 
    latitude >= -90 && 
    latitude <= 90 && 
    longitude >= -180 && 
    longitude <= 180;

  if (!validCoordinates) {
    console.error('[DEBUG] Invalid coordinates:', { latitude, longitude });
    return (
      <div className={`w-full h-[300px] bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-center ${className}`}>
        <span className="text-gray-500">Map unavailable</span>
      </div>
    );
  }

  return (
    <div className={`w-full h-[300px] relative ${className}`}>
      <MapWithNoSSR
        latitude={latitude}
        longitude={longitude}
        cityName={cityName}
      />
    </div>
  );
};

export default CityMap;