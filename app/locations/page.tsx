'use client';

import { states, generateCityData } from '@/lib/data/locations';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { MapPin, ChevronRight, Wrench, ShieldCheck, Clock } from 'lucide-react';
import { useState } from 'react';
import { ServicePopup } from '@/components/ui/ServicePopup';

export default function LocationsPage() {
  const [selectedCity, setSelectedCity] = useState<{
    stateId: string;
    cityId: string;
    cityName: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16 max-w-7xl">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">IQ Appliance Repair Service Areas</h1>
        <p className="text-lg text-gray-700 mb-8">
          Find professional appliance repair services in your area. We connect you with trusted experts across New York, New Jersey, and Pennsylvania who specialize in refrigerator, oven, dishwasher, and other major appliance repairs for both residential and commercial properties.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {states.map(state => {
            const cities = generateCityData(state);
            
            return (
              <Card key={state.id} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-blue-900">
                      {state.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Professional appliance repair services available throughout {state.name}
                    </p>
                  </div>
                  <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-blue-900">
                    Major Service Areas:
                  </h3>
                  <ul className="space-y-2">
                    {cities.slice(0, 6).map(city => (
                      <li key={city.id}>
                        <button
                          onClick={() => setSelectedCity({
                            stateId: state.id,
                            cityId: city.id,
                            cityName: city.name
                          })}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-800 w-full text-left"
                        >
                          <ChevronRight className="h-4 w-4 mr-1 text-blue-600" />
                          {city.name} Appliance Repair
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {cities.length > 6 && (
                  <Link
                    href={`/${state.id}`}
                    className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View all {state.name} service locations ({cities.length} cities)
                  </Link>
                )}
              </Card>
            );
          })}
        </div>

        <div className="mt-16 bg-blue-900 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Why Choose IQ Appliance Repair?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Clock className="h-6 w-6 text-blue-300 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Fast Response Time</h3>
                <p className="text-gray-100">Quick service to minimize disruption to your daily routine with our network of local appliance repair experts.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ShieldCheck className="h-6 w-6 text-blue-300 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Quality Parts</h3>
                <p className="text-gray-100">We use genuine replacement parts and advanced diagnostic tools to ensure reliable, long-lasting repairs.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Wrench className="h-6 w-6 text-blue-300 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Expert Service</h3>
                <p className="text-gray-100">Professional technicians with extensive experience in all major appliance brands and models.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedCity && (
        <ServicePopup
          isOpen={!!selectedCity}
          onClose={() => setSelectedCity(null)}
          stateId={selectedCity.stateId}
          cityId={selectedCity.cityId}
          cityName={selectedCity.cityName}
        />
      )}
    </div>
  );
}