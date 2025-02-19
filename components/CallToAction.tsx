"use client";

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';

const CallToAction = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  // Handle scroll to hide CTA when near footer
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const footerHeight = 450; // Approximate footer height

      // Hide CTA when within footer height from bottom
      setIsVisible(documentHeight - (scrollTop + windowHeight) > footerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get phone number based on current page
  const getPhoneNumber = useCallback(() => {
    const phoneNumber = '1-833-348-1798';
    let label = 'Appliance';

    // Check if the URL contains any service-related slugs
    if (pathname?.includes('appliance-repair')) {
      label = 'Appliance';
    }

    return { label, number: phoneNumber };
  }, [pathname]);

  const phoneInfo = getPhoneNumber();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white z-50 sm:hidden shadow-lg shadow-blue-950/20 border-t border-blue-800/30 backdrop-blur-sm transition-all duration-300">
      <div className="container mx-auto px-3 py-2">
        <div className="grid grid-cols-1">
          <a 
            href={`tel:${phoneInfo.number}`} 
            className="relative flex items-center justify-between bg-gradient-to-r from-blue-600/80 to-blue-500/80 hover:from-blue-500/90 hover:to-blue-400/90 px-4 py-2.5 rounded-lg transition-all transform active:scale-95 shadow-lg shadow-blue-950/20 border border-blue-400/20"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-400/20 p-1.5 rounded-lg">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-blue-200 font-medium">{phoneInfo.label} Repair</span>
                <span className="text-sm font-bold tracking-wide">{phoneInfo.number}</span>
              </div>
            </div>
           
          </a>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;