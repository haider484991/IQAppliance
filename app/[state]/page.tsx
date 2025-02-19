import { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { states, generateCityData } from '@/lib/data/locations';
import { ChevronRight } from 'lucide-react';
import CitiesGrid from '@/components/CitiesGrid';

interface StatePageProps {
  params: {
    state: string;
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff'
};

export const dynamicParams = true;

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const state = states.find(s => s.id === params.state);

  if (!state) {
    return {
      title: 'State Not Found',
      description: 'The requested state could not be found.',
    };
  }

  const title = `Professional Appliance Repair Services in ${state.name}`;
  const description = `Expert appliance repair and maintenance services in ${state.name}. IQ Appliance Repair provides professional repairs of refrigerators, ovens, dishwashers, washers, dryers, and more throughout ${state.name}. Same-day service available.`;
  const url = `https://www.iqappliancerepair.com/${state.id}`;

  const keywords = [
    'appliance repair',
    'refrigerator repair',
    'oven repair',
    'dishwasher repair',
    'washer repair',
    'dryer repair',
    `${state.name} appliance repair`,
    `${state.abbreviation} appliance services`,
    `${state.name} appliance services`,
    'residential appliances',
    'commercial appliances',
    'appliance maintenance',
    'appliance installation',
    'emergency repair',
    'same day service',
    ...generateCityData(state).map(city => `${city.name} appliance repair`)
  ].join(', ');

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    authors: [{ name: 'IQ Appliance Repair' }],
    category: 'Appliance Repair Services',
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      url,
      siteName: 'IQ Appliance Repair',
      images: [
        {
          url: '/images/appliance-repair.webp',
          width: 1200,
          height: 630,
          alt: `Professional Appliance Repair Services in ${state.name}`,
          type: 'image/webp',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@iqappliancerepair',
      site: '@iqappliancerepair',
      images: ['/images/appliance-repair.webp'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'geo.region': `US-${state.abbreviation}`,
      'geo.placename': state.name,
      'og:region': state.abbreviation,
      'og:country-name': 'United States'
    }
  };
}

export default function StatePage({ params }: StatePageProps) {
  const state = states.find(s => s.id === params.state);
  
  if (!state) {
    notFound();
  }

  const cities = generateCityData(state);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <main className="container mx-auto px-4 py-16 max-w-7xl">
        <div>
          <nav className="flex items-center space-x-2 text-sm text-blue-900 mb-8">
            <Link href="/" className="hover:text-blue-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-blue-900" />
            <Link href="/locations" className="hover:text-blue-700 transition-colors">
              Locations
            </Link>
            <ChevronRight className="h-4 w-4 text-blue-900" />
            <span className="text-blue-900">{state.name}</span>
          </nav>

          <h1 className="text-5xl font-bold mb-6 text-blue-900 bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
            Professional Appliance Repair in {state.name}
          </h1>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Welcome to IQ Appliance Repair, your trusted appliance repair provider in {state.name}. 
              We offer comprehensive repair services for all major appliances, providing expert diagnosis, 
              repair, and maintenance for both residential and commercial properties throughout {state.name}.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Refrigerator Repair</h3>
                <p className="text-gray-600 mb-4">Expert repair for all refrigerator brands.</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2 text-blue-600">✓</span> Temperature Issues
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2 text-blue-600">✓</span> Ice Maker Repair
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2 text-blue-600">✓</span> Seal Replacement
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Oven & Range Repair</h3>
                <p className="text-gray-600 mb-4">Professional oven and range repair.</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2 text-blue-600">✓</span> Heating Elements
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2 text-blue-600">✓</span> Control Boards
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2 text-blue-600">✓</span> Sensor Calibration
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Washer & Dryer Repair</h3>
                <p className="text-gray-600 mb-4">Complete laundry appliance service.</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2 text-blue-600">✓</span> Drainage Issues
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2 text-blue-600">✓</span> Motor Repairs
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="mr-2 text-blue-600">✓</span> Belt Replacement
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-8 rounded-xl shadow-lg mb-12 text-white">
              <h2 className="text-2xl font-bold mb-6">
                Why Choose IQ Appliance Repair in {state.name}?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Fast Response</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2 text-blue-300">✓</span> Same-Day Service Available
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-blue-300">✓</span> 24/7 Emergency Repairs
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Expert Technicians</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2 text-blue-300">✓</span> Factory Trained
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-blue-300">✓</span> All Major Brands
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Quality Service</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2 text-blue-300">✓</span> Genuine Parts
                    </li>
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 text-blue-900">
            Appliance Repair Service Areas in {state.name}
          </h2>

          <CitiesGrid 
            cities={cities} 
            stateId={state.id} 
            stateName={state.name} 
          />
        </div>
      </main>
    </div>
  );
}