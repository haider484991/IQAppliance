'use client';

import { useState, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { services } from '@/lib/data/services';
import Pagination from '@/components/Pagination';

interface City {
  id: string;
  name: string;
  description: string;
}

interface CitiesGridProps {
  cities: City[];
  stateId: string;
  stateName: string;
}

// Utility function to format city names by removing spaces
function formatCityName(cityName: string): string {
  return cityName.replace(/\s+/g, '').toLowerCase();
}

const CitiesGrid: React.FC<CitiesGridProps> = ({ cities, stateId, stateName }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const citiesPerPage = 12; // Adjust as needed

  // Memoize the debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
      }, 300),
    []
  );

  // Cleanup the debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Utility function to highlight matches
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? <mark key={index} className="bg-sky-200">{part}</mark> : part
    );
  };

  // Filter cities based on search query
  const filteredCities = useMemo(() => {
    if (!searchQuery) return cities;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return cities.filter(city => {
      const cityNameMatch = city.name.toLowerCase().includes(lowerCaseQuery);
      const servicesMatch = services.some(service =>
        service.title.toLowerCase().includes(lowerCaseQuery)
      );
      return cityNameMatch || servicesMatch;
    });
  }, [searchQuery, cities]);

  // Calculate total pages based on filtered cities
  const totalPages = Math.ceil(filteredCities.length / citiesPerPage);

  // Get current cities for the page
  const indexOfLastCity = currentPage * citiesPerPage;
  const indexOfFirstCity = indexOfLastCity - citiesPerPage;
  const currentCities = filteredCities.slice(indexOfFirstCity, indexOfLastCity);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          onChange={handleSearchChange}
          placeholder="Search cities or services..."
          className="w-full max-w-md px-4 py-2 border border-sky-900/20 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900 focus:border-sky-900 bg-white text-sky-900 placeholder-sky-900/50"
          aria-label="Search cities or services"
        />
      </div>

      {/* Adjusted Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentCities.length > 0 ? (
          currentCities.map(city => (
            <Card key={city.id} className="p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-sky-900/10 rounded-lg bg-white">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-sky-900">
                      {highlightMatch(city.name, searchQuery)}
                    </h3>
                    <p className="text-sky-900/70 mb-4">
                      {city.description.length > 100
                        ? `${city.description.substring(0, 100)}...`
                        : city.description}
                    </p>
                    
                    <div className="space-y-2">
                      {services.map(service => (
                        <Link
                          key={service.id}
                          href={`/${stateId}/${city.id}/${service.slug}`}
                          className="flex items-center text-sm text-sky-900 hover:text-sky-900/80 transition-colors duration-200"
                        >
                          <MapPin className="h-4 w-4 mr-1 text-sky-900" />
                          {highlightMatch(service.title, searchQuery)} in {city.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <MapPin className="h-5 w-5 text-sky-900 flex-shrink-0 mt-2" />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-sky-900 col-span-full">
            No cities or services match your search.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      )}
    </div>
  );
};

export default CitiesGrid;