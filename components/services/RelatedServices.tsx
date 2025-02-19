"use client";

import Link from 'next/link';
import { services } from '@/lib/data/services';
import { states } from '@/lib/data/locations';
import { useEffect, useState } from 'react';

interface RelatedServicesProps {
  currentService: string;
  state: string;
  city: string;
}

export default function RelatedServices({ currentService, state, city }: RelatedServicesProps) {
  const [mounted, setMounted] = useState(false);
  
  // Filter out the current service
  const relatedServices = services.filter(service => service.slug !== currentService);
  
  // Find state data to get abbreviation
  const stateData = states.find(s => s.id === state);
  const stateAbbr = stateData?.abbreviation || '';
  
  // Format city name for display (remove hyphens and state suffix)
  const cityName = city.split('-')[0].split('_').join(' ');
  const formattedCityName = cityName.replace(/\b\w/g, l => l.toUpperCase());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Instead of returning null, render a skeleton loader during SSR
  const content = (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        {mounted ? `Related Services in ${formattedCityName}, ${stateAbbr}` : 'Loading...'}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {mounted && relatedServices.map((service) => (
          <Link
            key={service.slug}
            href={`/${state}/${city}/${service.slug}`}
            className="group p-4 border border-gray-100 rounded-lg hover:border-sky-100 hover:bg-sky-50/50 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="font-medium text-gray-900 group-hover:text-sky-600 transition-colors">
                  {service.title} in {formattedCityName}, {stateAbbr}
                </div>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  Professional {service.title.toLowerCase()} services in {formattedCityName}, {stateAbbr}. {service.description}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 group-hover:text-sky-600 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return content;
}
