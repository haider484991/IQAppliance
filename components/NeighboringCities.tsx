import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { City, State, Service } from '@/lib/types';
import { MapPin, Wrench } from 'lucide-react';

interface NeighboringCitiesProps {
  cities: City[];
  state: State;
  currentService: Service;
}

export function NeighboringCities({ cities = [], state, currentService }: NeighboringCitiesProps) {
  if (!cities || cities.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 bg-white shadow-lg border-sky-100">
      <div className="flex items-center gap-2 mb-4">
        <Wrench className="h-5 w-5 text-sky-900" />
        <h2 className="font-semibold text-sky-900">
          We Also Serve These Nearby Cities
        </h2>
      </div>

      <ul className="space-y-3">
        {cities.map(city => (
          <li key={city.id}>
            <Link
              href={`/${state.id}/${city.id}/${currentService.slug}`}
              className="flex items-center text-gray-600 hover:text-sky-900 transition-colors group"
            >
              <MapPin className="h-4 w-4 mr-2 text-sky-700 group-hover:text-sky-900 transition-colors" />
              <span>{city.name}</span>
              <span className="text-sm text-green-400 ml-auto group-hover:text-sky-700 transition-colors">
                Service Available
              </span>
            </Link>
          </li>
        ))}
      </ul>


    </Card>
  );
}