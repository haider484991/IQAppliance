"use client";

import Link from 'next/link';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Shield, Star, Warehouse, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/lib/data/services';
import type { City, State } from '@/lib/types';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  // Memoize path segments processing
  const { pathSegments, cityId, stateId, currentService } = useMemo(() => {
    const segments = pathname?.split('/') || [];
    return {
      pathSegments: segments,
      cityId: segments[2] || null,
      stateId: segments[1] || null,
      currentService: segments[segments.length - 1]
    };
  }, [pathname]);

  // Check if current page is a service page
  const isServicePage = useMemo(() => 
    services.some(service => service.slug === currentService),
    [currentService]
  );

  // Get location data from URL
  const [locationData, setLocationData] = useState<{
    city?: City;
    state?: State;
  }>({});

  // Memoize location data processing
  const processLocationData = useCallback(async () => {
    if (cityId && stateId) {
      const formatWord = (word: string) => 
        word.charAt(0).toUpperCase() + word.slice(1);

      const cityName = cityId.split('-').map(formatWord).join(' ');
      const stateName = stateId.split('-').map(formatWord).join(' ');

      setLocationData({
        city: { 
          id: cityId,
          name: cityName,
          stateId: stateId,
          stateAbbr: stateName,
          population: 0,
          description: '',
          coordinates: {
            lat: 0,
            lng: 0
          },
          weatherData: {
            annualRainfall: 0,
            rainyDays: 0
          }
        },
        state: { 
          id: stateId,
          name: stateName,
          abbreviation: stateName,
          majorCities: [],
          neighboringStates: [],
          population: 0,
          description: ''
        }
      });
    } else {
      setLocationData({});
    }
  }, [cityId, stateId]);

  useEffect(() => {
    processLocationData();
  }, [processLocationData]);

  // Get service link based on current path
  const getServiceLink = useCallback((serviceSlug: string) => {
    if (stateId && cityId) {
      if (isServicePage) {
        const segments = pathname?.split('/');
        segments[segments.length - 1] = serviceSlug;
        return segments.join('/');
      }
      return `/${stateId}/${cityId}/${serviceSlug}`;
    }
    return `/services/${serviceSlug}`;
  }, [stateId, cityId, isServicePage, pathname]);

  // Toggle functions
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const toggleServices = () => setIsServicesOpen(prev => !prev);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header 
      className="fixed w-full top-0 z-50 bg-blue-900/90 backdrop-blur-sm border-b border-blue-700/30"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 48 48" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-300 transition-transform duration-300 group-hover:scale-110"
            >
              <path 
                d="M8 16L24 4L40 16V36L24 44L8 36V16Z" 
                fill="currentColor"
                opacity="0.7"
              />
              <path 
                d="M24 4L8 16L24 28L40 16L24 4Z" 
                fill="currentColor"
              />
              <path 
                d="M24 28V44L8 36V16L24 28Z" 
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-tight text-white">IQ</span>
              <span className="text-sm text-blue-300">Appliances</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="relative text-blue-100 hover:text-white font-medium group transition-colors">
              <span>Home</span>
              <span className="absolute inset-x-0 bottom-0 h-px bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
            <div 
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
              className="relative"
            >
              <button
                className="flex items-center text-blue-100 group hover:text-white transition-colors focus:outline-none font-medium"
                onClick={toggleServices}
              >
                <span className="mr-1">Services</span>
                <motion.svg
                  animate={{ rotate: isServicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ fill: 'currentColor', height: 24, width: 24 }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </motion.svg>
                <span className="absolute inset-x-0 bottom-0 h-px bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{ 
                      position: 'absolute',
                      left: '50%',
                      top: 'calc(100% + 0.5rem)',
                      transform: 'translateX(-50%)',
                      zIndex: 50,
                      width: '20rem',
                      transformOrigin: 'top'
                    }}
                  >
                    <div className="bg-blue-900/95 backdrop-blur-sm rounded-xl border border-blue-700/30 shadow-lg">
                      {services.map((service, index) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          style={{ display: 'flex' }}
                        >
                          <Link
                            href={getServiceLink(service.slug)}
                            className="block px-4 py-3 hover:bg-blue-800/50 transition-colors"
                          >
                            <div className="text-sm text-white font-medium">
                              {service.title}
                            </div>
                            <div className="text-xs text-blue-300 mt-0.5 line-clamp-2">
                              {service.contentTemplate ? 
                                service.contentTemplate(
                                  locationData.city,
                                  locationData.state
                                ) 
                                : service.description}
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/about" className="relative text-blue-100 hover:text-white font-medium group transition-colors">
              <span>About</span>
              <span className="absolute inset-x-0 bottom-0 h-px bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
            <Link href="/locations" className="relative text-blue-100 hover:text-white font-medium group transition-colors">
              <span>Locations</span>
              <span className="absolute inset-x-0 bottom-0 h-px bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
            <Link href="/contact" className="relative text-blue-100 hover:text-white font-medium group transition-colors">
              <span>Contact</span>
              <span className="absolute inset-x-0 bottom-0 h-px bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:1-833-348-1798"
              className="flex items-center space-x-2 bg-gradient-to-br from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl font-medium hover:from-blue-500 hover:to-blue-600 transition-colors duration-200 border border-blue-500/20 hover:shadow-lg"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-100 hover:text-white transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{ 
                overflow: 'hidden',
                display: isMobileMenuOpen ? 'block' : 'none'
              }}
            >
              <div className="border-t border-blue-700/30 py-4 md:hidden">
                <ul className="space-y-4">
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ display: 'flex' }}
                  >
                    <Link
                      href="/"
                      className="text-blue-100 hover:text-white transition-colors block"
                      onClick={toggleMobileMenu}
                    >
                      Home
                    </Link>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ display: 'flex' }}
                  >
                    <Link
                      href="/about"
                      className="text-blue-100 hover:text-white transition-colors block"
                      onClick={toggleMobileMenu}
                    >
                      About
                    </Link>
                  </motion.li>
                  
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    style={{ display: 'flex' }}
                  >
                    <Link
                      href="/locations"
                      className="text-blue-100 hover:text-white transition-colors block"
                      onClick={toggleMobileMenu}
                    >
                      Locations
                    </Link>
                  </motion.li>
                  
                  {/* Mobile Services Menu */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ display: 'flex' }}
                  >
                    <div className="space-y-2">
                      <span className="text-blue-100 font-semibold block">Services</span>
                      <ul className="pl-4 space-y-3">
                        {services.map((service, index) => (
                          <motion.li
                            key={service.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            style={{ display: 'flex' }}
                          >
                            <Link
                              href={getServiceLink(service.slug)}
                              className="text-blue-100 hover:text-white transition-colors block text-sm"
                              onClick={toggleMobileMenu}
                            >
                              {service.title}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{ display: 'flex' }}
                  >
                    <Link
                      href="tel:1-833-316-1750"
                      className="flex items-center gap-2 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-2 rounded-xl transition-colors duration-200 border border-blue-500/20 hover:shadow-lg"
                      onClick={toggleMobileMenu}
                    >
                      <Phone size={16} />
                      <span className="font-medium">Fast Quote</span>
                    </Link>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}