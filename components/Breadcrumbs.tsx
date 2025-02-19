import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { City, State, Service } from '@/lib/types';

interface BreadcrumbsProps {
  state: State;
  city?: City;
  service?: Service;
  className?: string;
}

export function Breadcrumbs({ state, city, service, className = '' }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 text-sm ${className}`}
    >
      <Link 
        href="/"
        className="text-sky-600 hover:text-sky-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded px-1"
        aria-label="Home"
      >
        Home
      </Link>
      
      <ChevronRight className="h-4 w-4 text-sky-400" aria-hidden="true" />
      
      <Link 
        href={`/${state.id}`}
        className="text-sky-600 hover:text-sky-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded px-1"
      >
        {state.name}
      </Link>
      
      {city && (
        <>
          <ChevronRight className="h-4 w-4 text-sky-400" aria-hidden="true" />
          <p
          
            className="text-sky-600 hover:text-sky-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded px-1"
          >
            {city.name}
          </p>
        </>
      )}
      
      {service && (
        <>
          <ChevronRight className="h-4 w-4 text-sky-400" aria-hidden="true" />
          <span 
            className="text-sky-900 font-medium"
            aria-current="page"
          >
            {service.title}
          </span>
        </>
      )}
    </nav>
  );
}