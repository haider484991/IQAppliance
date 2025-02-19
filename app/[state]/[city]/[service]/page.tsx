import { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { states, generateCityData } from '@/lib/data/locations';
import { services } from '@/lib/data/services';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import ServiceSelector from '@/components/services/ServiceSelector';
import RelatedServices from '@/components/services/RelatedServices';
import { NeighboringCities } from '@/components/NeighboringCities';
import CitySelector from '@/components/CitySelector';
import { getCityCoordinates } from '@/lib/getCityCoordinates';
import dynamic from 'next/dynamic';
import SchemaOrg from '@/components/schema-org';

// Dynamically import the CityMap component with SSR disabled
const CityMap = dynamic(() => import('@/components/map/CityMap').then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-200 rounded-lg h-[400px] w-full flex items-center justify-center">
      <span className="text-gray-500">Loading map...</span>
    </div>
  )
});

interface LocationPageProps {
  params: {
    state: string;
    city: string;
    service: string;
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff'
};

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const stateData = states.find(s => s.id === params.state);
  const cities = stateData ? generateCityData(stateData) : [];
  const city = cities.find(c => c.id === params.city);
  const service = services.find(s => s.slug === params.service);

  if (!stateData || !city || !service) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    };
  }

  const metadataBase = new URL('https://iqappliances.com');
  
  // Get service-specific content based on service type
  let serviceContent;
  switch (params.service) {
    case 'appliance-repair':
      serviceContent = {
        title: `${city.name} ${stateData.abbreviation} Appliance Repair`,
        description: `Major Appliance repair ${city.name} ${stateData.abbreviation}. IQ Appliances repairs refrigerators, dishwashers, stoves, ovens, washers, dryers, and more. Call 1-833-348-1798 today!`
      };
      break;
    default:
      serviceContent = {
        title: `${city.name} ${stateData.abbreviation} Appliance Repair`,
        description: `Major Appliance repair ${city.name} ${stateData.abbreviation}. IQ Appliances repairs refrigerators, dishwashers, stoves, ovens, washers, dryers, and more. Call 1-833-348-1798 today!`
      };
  }

  // Create extended state object to match the required type
  const extendedStateData = {
    ...stateData,
    neighboringStates: [],
    population: 0,
    description: `${stateData.name} is a major state in the tri-state area.`
  };

  return {
    metadataBase,
    title: serviceContent.title,
    description: serviceContent.description,
    openGraph: {
      title: serviceContent.title,
      description: serviceContent.description,
      url: `/${params.state}/${params.city}/${params.service}`,
      siteName: 'IQ Appliances',
      locale: 'en_US',
      type: 'website',
      images: [{
        url: `/images/${service.image}`,
        width: 1200,
        height: 630,
        alt: serviceContent.title,
      }],
    },
    alternates: {
      canonical: `/${params.state}/${params.city}/${params.service}`,
    },
    keywords: `${service.title.toLowerCase()} ${city.name}, appliance repair ${city.name}, ${service.title.toLowerCase()} services ${stateData.abbreviation}, appliance maintenance ${city.name}, residential appliances ${city.name}, commercial appliances ${city.name}, appliance technician ${city.name}`,
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { state: stateId, city: cityId, service: serviceId } = params;
  const stateData = states.find((s) => s.id === stateId);
  
  if (!stateData) {
    notFound();
  }

  const allCityData = generateCityData(stateData);
  const cityData = allCityData.find(c => c.id === cityId);
  
  if (!cityData) {
    notFound();
  }

  const serviceData = services.find((s) => s.slug === serviceId);
  
  if (!serviceData) {
    notFound();
  }

  const coordinates = await getCityCoordinates(`${cityData.name}, ${stateData.abbreviation}`);

  // Ensure coordinates are valid numbers and within reasonable bounds
  const mapCoordinates = coordinates && 
    !isNaN(Number(coordinates.latitude)) && 
    !isNaN(Number(coordinates.longitude)) && 
    Math.abs(Number(coordinates.latitude)) <= 90 && 
    Math.abs(Number(coordinates.longitude)) <= 180
    ? {
        latitude: Number(coordinates.latitude),
        longitude: Number(coordinates.longitude)
      }
    : null;

  // Create extended state object to match the required type
  const extendedStateData = {
    ...stateData,
    neighboringStates: [],
    population: 0,
    description: `${stateData.name} is a major state in the tri-state area.`
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/40">
      <SchemaOrg
        name={`${serviceData.title} in ${cityData.name}, ${stateData.abbreviation}`}
        description={`Professional appliance repair services in ${cityData.name}, ${stateData.abbreviation}. Expert ${serviceData.title.toLowerCase()} by IQ Appliances.`}
        city={cityData}
        state={extendedStateData}
        service={serviceData.slug}
      />

      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <Breadcrumbs
                state={extendedStateData}
                city={cityData}
                service={serviceData}
              />
            </ol>
          </nav>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Service Content */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <ServiceSelector
                  serviceId={serviceId}
                  city={cityData}
                  state={extendedStateData}
                />
              </div>
              
              {/* Related Services Section */}
              <div className="mt-6">
                <RelatedServices
                  currentService={serviceId}
                  state={stateId}
                  city={cityId}
                />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-20 space-y-4">
                <div className="bg-white rounded-lg shadow-sm">
                  {/* City Selector Section */}
                  <div className="p-4">
                    <h3 className="text-base font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Select Location
                    </h3>
                    <div className="relative z-50" suppressHydrationWarning>
                      <CitySelector
                        currentState={extendedStateData}
                        currentCity={cityData}
                        cities={allCityData}
                      />
                    </div>
                  </div>

                  {/* Map Section */}
                  {mapCoordinates && (
                    <div className="border-t border-gray-100">
                      <div className="p-4">
                        <h2 className="text-lg font-semibold mb-3">Service Area</h2>
                        <div className="relative">
                          <CityMap
                            latitude={mapCoordinates.latitude}
                            longitude={mapCoordinates.longitude}
                            cityName={`${cityData.name}, ${stateData.abbreviation}`}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Neighboring Cities Section */}
                  <div className="p-4 border-t border-gray-100">
                    <h3 className="text-base font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Nearby Cities
                    </h3>
                    <div className="space-y-2">
                      <NeighboringCities
                        cities={allCityData.filter(c => c.id !== cityData.id).slice(0, 5)}
                        state={extendedStateData}
                        currentService={serviceData}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}