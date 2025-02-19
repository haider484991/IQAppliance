import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { services } from '@/lib/data/services';
import { ChevronRight, X, Settings, Wrench } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ServicePopupProps {
  isOpen: boolean;
  onClose: () => void;
  stateId: string;
  cityId: string;
  cityName: string;
}

const serviceIcons = {
  'washer-dryer-repair': Settings,
  'dishwasher-repair': Settings,
  'appliance-repair': Wrench,
};

export function ServicePopup({ isOpen, onClose, stateId, cityId, cityName }: ServicePopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  // Service suffix mapping
  const serviceSuffixes: Record<string, string> = {
    'water-damage': '-restoration',
    'fire-damage': '-restoration',
    'storm-damage': '-restoration',
    'mold-remediation': '-services'
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div 
        ref={popupRef}
        className={`bg-white rounded-lg p-4 w-full max-w-sm relative transform transition-all duration-200 ${
          isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-sky-900 mb-2">
          {cityName} Services
        </h2>

        <div className="space-y-2">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.id as keyof typeof serviceIcons] || Wrench;
            const serviceSlug = service.slug + (serviceSuffixes[service.slug] || '');
            
            return (
              <button
                key={service.id}
                onClick={() => {
                  router.push(`/${stateId}/${cityId}/${serviceSlug}`);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2 rounded-md border border-sky-200 hover:border-sky-500 hover:bg-sky-50 transition-all group text-left"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'slideIn 0.2s ease-out forwards',
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-sky-600" />
                  <span className="font-medium text-sky-900">{service.title}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-sky-500 group-hover:translate-x-1 transition-transform" />
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
