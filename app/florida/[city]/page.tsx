import { Metadata } from 'next';
import Link from 'next/link';
import { states } from '@/lib/data/locations';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    city: string
  }
}

// Format display name for city (for UI display only)
const formatCityName = (slug: string) => {
  // First clean up the input
  const cleanSlug = slug
    .replace(/-fl$/, '') // Remove -fl suffix if present
    .replace(/[_-]/g, ' '); // Replace underscores and hyphens with spaces

  // If the string has no capitals, try to split it into words
  const hasCapitals = /[A-Z]/.test(cleanSlug);
  if (!hasCapitals) {
    // Split into potential words (handling cases like "thevillages")
    const words = cleanSlug.match(/[a-z]+|\d+/gi) || [cleanSlug];
    return words
      .map(word => {
        const lower = word.toLowerCase();
        // Common words that should be lowercase unless they're the only word
        const lowerCaseWords = ['of', 'the', 'in', 'at', 'by'];
        return lowerCaseWords.includes(lower) && words.length > 1
          ? lower
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  }

  // Handle camelCase
  return cleanSlug
    .replace(/([A-Z])/g, ' $1')
    .replace(/(\d+)/g, ' $1 ')
    .trim()
    .split(/\s+/)
    .map(word => {
      const lower = word.toLowerCase();
      const lowerCaseWords = ['of', 'the', 'in', 'at', 'by'];
      return lowerCaseWords.includes(lower) && !cleanSlug.toLowerCase().startsWith(lower)
        ? lower
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

// Get proper city name from the data
const getCityName = (citySlug: string) => {
  const florida = states.find(state => state.id === 'florida');
  const cityMatch = florida?.majorCities.find(
    city => city.toLowerCase().replace(/[^a-z0-9]/g, '') === citySlug.toLowerCase().replace(/[^a-z0-9]/g, '')
  );
  
  if (!cityMatch) {
    notFound();
  }
  
  return cityMatch;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const citySlug = params.city.replace(/-fl$/, ''); // Remove the -fl suffix
  const cityName = getCityName(citySlug);
  
  return {
    title: `Appliance Repair in ${cityName}, FL | In Touch Appliance Repair`,
    description: `Expert appliance repair services in ${cityName}, Florida. Same-day service available for refrigerators, washers, dryers, ovens, and more. Licensed technicians.`,
    openGraph: {
      title: `${cityName} Appliance Repair Services | In Touch Appliance Repair`,
      description: `Professional appliance repair in ${cityName}, FL. 24/7 emergency service available. Call now!`,
      url: `https://www.intouchappliancerepair.com/florida/${params.city}`,
      siteName: 'In Touch Appliance Repair',
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default function CityPage({ params }: Props) {
  const citySlug = params.city.replace(/-fl$/, ''); // Remove the -fl suffix
  const cityName = getCityName(citySlug);
  
  // Ensure the city param ends with -fl for URLs
  const cityParam = params.city.endsWith('-fl') ? params.city : `${params.city}-fl`;
  const baseUrl = `/florida/${cityParam}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Expert Appliance Repair in {formatCityName(cityName)}, Florida
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Fast, reliable appliance repair services from licensed technicians
            </p>
            <a
              href="tel:1-833-366-0402"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Call Now: 1-833-366-0402
            </a>
          </div>

          {/* Services Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Appliance Repair Services in {formatCityName(cityName)}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Kitchen Appliances</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>
                    <Link href={`${baseUrl}/refrigerator-repair`} className="hover:text-blue-600 transition-colors">
                      • Refrigerator Repair
                    </Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/oven-repair`} className="hover:text-blue-600 transition-colors">
                      • Oven and Stove Repair
                    </Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/dishwasher-repair`} className="hover:text-blue-600 transition-colors">
                      • Dishwasher Repair
                    </Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/appliance-repair`} className="hover:text-blue-600 transition-colors">
                      • Microwave Repair
                    </Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/appliance-repair`} className="hover:text-blue-600 transition-colors">
                      • Ice Maker Repair
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Laundry Appliances</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>
                    <Link href={`${baseUrl}/appliance-repair`} className="hover:text-blue-600 transition-colors">
                      • Washer Repair
                    </Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/appliance-repair`} className="hover:text-blue-600 transition-colors">
                      • Dryer Repair
                    </Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/appliance-repair`} className="hover:text-blue-600 transition-colors">
                      • Stackable Units
                    </Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/appliance-repair`} className="hover:text-blue-600 transition-colors">
                      • All Major Brands
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-blue-600 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Appliance Repair in {formatCityName(cityName)}?
            </h2>
            <p className="text-xl text-blue-100 mb-6">
              Our expert technicians are ready to help you today!
            </p>
            <a
              href="tel:1-833-366-0402"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              Call 1-833-366-0402
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
