'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  latitude: number;
  longitude: number;
  cityName: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude, cityName }) => {
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    // Fix Leaflet default icon paths
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
    
    const map = mapRef.current;
    
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  // Custom marker icon with animation
  const bounceIcon = L.divIcon({
    className: 'custom-marker',
    html: `<div class="marker-pin"></div>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });

  return (
    <div className="w-full h-full relative" style={{ minHeight: '300px' }}>
      <MapContainer
        ref={mapRef}
        center={[latitude, longitude]}
        zoom={11}
        scrollWheelZoom={false}
        style={{ 
          height: '300px', 
          width: '100%', 
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: '0.5rem',
          zIndex: 1
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={bounceIcon}>
          <Popup>
            <div className="text-center p-2">
              <h3 className="font-semibold text-gray-900">{cityName}</h3>
              <p className="text-sm text-gray-600 mt-1">Service Area</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
