export interface State {
  id: string;
  name: string;
  abbreviation: string;
  majorCities: string[];
  neighboringStates: string[];
  population: number;
  description: string;
}

export interface City {
  id: string;
  name: string;
  stateId: string;
  stateAbbr: string;
  population: number;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  weatherData: {
    annualRainfall: number;
    rainyDays: number;
  };
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  benefits?: string[];
  priceRange?: string;
  warranty?: string;
  image: string;
  alt: string;
  contentTemplate?: (city?: City, state?: State) => string;
}

export interface ServiceContent {
  title: string;
  description: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  commonIssues: Array<{
    title: string;
    description: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  serviceAreas: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  pricing?: {
    startingAt: string;
    factors: string[];
  };
}

export interface LocationPageProps {
  city: City;
  state: State;
  service: Service;
  neighboringCities: City[];
}

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
}