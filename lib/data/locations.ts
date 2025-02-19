import cityCoordinatesData from './citycoordinates.json';

// Types
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface WeatherData {
  annualRainfall: number;
  rainyDays: number;
}

export interface City {
  id: string;
  name: string;
  stateId: string;
  stateAbbr: string;
  population: number;
  description: string;
  coordinates: Coordinates;
  weatherData: WeatherData;
}

export interface State {
  id: string;
  abbreviation: string;
  name: string;
  majorCities: string[];
}

interface CityCoordinateData {
  city: string;
  state_id: string;
  state_name: string;
  lat: number;
  lng: number;
  population: number;
}

// Generate tri-state cities (NY, NJ, PA)
export const triStateCities = (cityCoordinatesData as CityCoordinateData[])
  .filter(city => ['NY', 'NJ', 'PA'].includes(city.state_id))
  .map(city => city.city)
  .sort();

// Helper function to generate city description
const getCityDescription = (cityName: string, stateAbbr: string): string => {
  const stateNames = {
    'NY': 'New York',
    'NJ': 'New Jersey',
    'PA': 'Pennsylvania'
  };
  return `${cityName} is a major city in ${stateNames[stateAbbr as keyof typeof stateNames]}.`;
};

// Generate only tri-state data
const triStateIds = ['NY', 'NJ', 'PA'];

// States data for tri-state area
export const states: State[] = triStateIds.map(stateAbbr => {
  const stateData = (cityCoordinatesData as CityCoordinateData[]).find(
    city => city.state_id === stateAbbr
  );
  return {
    id: stateData?.state_name.toLowerCase().replace(/\s+/g, '_') || stateAbbr.toLowerCase(),
    abbreviation: stateAbbr,
    name: stateData?.state_name || stateAbbr,
    majorCities: (cityCoordinatesData as CityCoordinateData[])
      .filter(city => city.state_id === stateAbbr)
      .map(city => city.city)
      .sort()
  };
});

export const generateCityData = (state: State): City[] => {
  // Only generate data for NY, NJ, and PA
  if (!['new_york', 'new_jersey', 'pennsylvania'].includes(state.id)) {
    return [];
  }

  return state.majorCities.map(cityName => {
    const cityData = (cityCoordinatesData as CityCoordinateData[]).find(
      city => city.city === cityName && city.state_id === state.abbreviation
    );

    return {
      id: `${cityName.toLowerCase().replace(/\s+/g, '-')}-${state.abbreviation.toLowerCase()}`,
      name: cityName,
      stateId: state.id,
      stateAbbr: state.abbreviation,
      population: cityData?.population || 0,
      description: getCityDescription(cityName, state.abbreviation),
      coordinates: {
        lat: cityData?.lat || 0,
        lng: cityData?.lng || 0
      },
      weatherData: {
        annualRainfall: 0,
        rainyDays: 0
      }
    };
  });
};

// Generate all cities data
export const cities: City[] = states.flatMap(state => generateCityData(state));

// Helper function to get a city by its ID
export const getCityById = (cityId: string): City | undefined => {
  return cities.find(city => city.id === cityId);
};

// Helper function to get a state by its ID
export const getStateById = (stateId: string): State | undefined => {
  return states.find(state => state.id === stateId);
};

// Helper function to get cities by state ID
export const getCitiesByState = (stateId: string): City[] => {
  return cities.filter(city => city.stateId === stateId);
};
