"use client";

import Link from 'next/link';
import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { states } from '@/lib/data/locations';
import { services } from '../lib/data/services';
import { MapPin, Phone, Mail, Clock, ChevronRight, Star, Shield, Award, ChevronDown } from 'lucide-react';
import type { State } from '@/lib/types';

export default function Footer() {
  const pathname = usePathname();
  const [expandedState, setExpandedState] = useState<string | null>(null);

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/termsandservices' }
  ];

  // Get phone number based on current page
  const getPhoneNumber = useCallback(() => {
    return { label: 'Call Now:', number: '1-833-348-1798' };
  }, []);

  const toggleState = (stateId: string) => {
    setExpandedState(expandedState === stateId ? null : stateId);
  };

  return (
    <footer className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 48 48" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-300"
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
                <h3 className="text-xl font-bold">IQ Appliances</h3>
                <span className="text-sm text-blue-300">Expert Appliance Services</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              IQ Appliances is your trusted partner for all major appliance repairs throughout New York, New Jersey, and Pennsylvania. Our network of expert technicians specializes in refrigerators, ovens, dishwashers, washers, dryers, and more. We pride ourselves on fast response times and quality workmanship. While we carefully select our service providers, all contractors are independent and IQ Appliances does not warrant or guarantee any work performed.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.title}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-gray-300 hover:text-blue-200 transition-colors flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-blue-400 group-hover:text-blue-200" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-blue-200 transition-colors flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-blue-400 group-hover:text-blue-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:1-833-348-1798" className="flex items-center space-x-2 text-gray-300 hover:text-white group">
                  <Phone className="h-5 w-5 text-blue-400 group-hover:text-blue-200" />
                  <span>24/7 Service: 1-833-348-1798</span>
                </a>
              </li>
              <li className="flex items-center text-gray-300 group">
                <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                <span>Serving NY, NJ & PA</span>
              </li>
              <li className="flex items-center text-gray-300 group">
                <Clock className="h-5 w-5 mr-3 text-blue-400" />
                <span>Emergency repairs available 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Service Areas */}
        <div className="border-t border-blue-800/50 pt-8 mb-8">
          <h3 className="text-lg font-semibold mb-4 text-blue-300">Service Areas</h3>
          <div className="grid grid-cols-1 gap-4">
            {states.map((state) => (
              <div key={state.id} className="border-b border-blue-800/30 last:border-b-0">
                <button
                  onClick={() => toggleState(state.id)}
                  className="w-full py-2 px-4 flex items-center justify-between text-left hover:bg-blue-800/20 rounded-lg transition-colors"
                >
                  <span className="text-gray-300 font-medium">{state.name}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-blue-400 transform transition-transform ${
                      expandedState === state.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedState === state.id && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4 bg-blue-900/20 rounded-lg mb-2">
                    {state.majorCities.map((city, index) => {
                      const formattedSlug = `${city.toLowerCase().replace(/\s+/g, '-')}-${state.abbreviation.toLowerCase()}`;
                      const formattedName = city
                        .split(/\s+/)
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ');

                      return (
                        <Link
                          key={`${state.id}-city-${index}`}
                          href={`/${state.id}/${formattedSlug}/appliance-repair`}
                          className="text-gray-300 hover:text-blue-200 transition-colors text-sm flex items-center group"
                        >
                          <ChevronRight className="h-3 w-3 mr-1 flex-shrink-0 text-blue-400 group-hover:text-blue-200" />
                          <span className="truncate">{formattedName} Appliance Repair</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} IQ Appliances. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-300 text-sm">
              <Link href="/privacy-policy" className="hover:text-blue-200 transition-colors">Privacy Policy</Link>
              <Link href="/termsandservices" className="hover:text-blue-200 transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-blue-200 transition-colors">Contact</Link>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}