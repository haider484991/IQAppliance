import Link from 'next/link';
import { services } from '@/lib/data/services';
import { states, generateCityData } from '@/lib/data/locations';

interface RelatedContentProps {
  currentPath: string;
  state?: string;
  city?: string;
  service?: string;
}

export function RelatedContent({ currentPath, state, city, service }: RelatedContentProps) {
  // Get related services
  const relatedServices = services
    .filter(s => s.slug !== service)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  // Get related locations
  const currentState = states.find(s => s.id === state);
  const nearbyCities = currentState 
    ? generateCityData(currentState)
        .filter(c => c.id !== city)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
    : [];

  // Service suffix mapping
  const serviceSuffixes: Record<string, string> = {
    'water-damage': '-restoration',
    'fire-damage': '-restoration',
    'storm-damage': '-restoration',
    'mold-remediation': '-services'
  };

  // Function to get service URL with correct suffix
  const getServiceUrl = (serviceSlug: string) => {
    return serviceSlug + (serviceSuffixes[serviceSlug] || '');
  };

  return (
    <section className="py-8 bg-sky-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-sky-900">Related Content</h2>
        
        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-sky-800">Related Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedServices.map(relatedService => (
                <Link
                  key={relatedService.slug}
                  href={city 
                    ? `/${state}/${city}/${getServiceUrl(relatedService.slug)}`
                    : `/services/${getServiceUrl(relatedService.slug)}`
                  }
                  className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-sky-700 hover:text-sky-600">
                    {relatedService.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Nearby Cities */}
        {nearbyCities.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-sky-800">Available in Nearby Cities</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {nearbyCities.map(nearbyCity => (
                <Link
                  key={nearbyCity.id}
                  href={service 
                    ? `/${state}/${nearbyCity.id}/${getServiceUrl(service)}`
                    : `/${state}/${nearbyCity.id}`
                  }
                  className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-sky-700 hover:text-sky-600">
                    {nearbyCity.name}, {currentState?.abbreviation}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Breadcrumb Navigation */}
        <nav className="mt-8 text-sm text-sky-600" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="hover:text-sky-800">Home</Link>
              <span className="mx-2">/</span>
            </li>
            {state && (
              <li className="flex items-center">
                <Link href={`/${state}`} className="hover:text-sky-800">
                  {currentState?.name}
                </Link>
                <span className="mx-2">/</span>
              </li>
            )}
            {city && currentState && (
              <li className="flex items-center">
                <Link 
                  href={`/${state}/${city}`}
                  className="hover:text-sky-800"
                >
                  {generateCityData(currentState).find(c => c.id === city)?.name}
                </Link>
                {service && <span className="mx-2">/</span>}
              </li>
            )}
            {service && (
              <li className="flex items-center">
                <span className="text-sky-900">
                  {services.find(s => s.slug === service)?.title}
                </span>
              </li>
            )}
          </ol>
        </nav>
      </div>
    </section>
  );
}
