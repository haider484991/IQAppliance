import path from 'path';
import cityCoordinates from './data/citycoordinates.json';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface CityData {
  city: string;
  city_ascii: string;
  state_id: string;
  state_name: string;
  county_fips: number;
  county_name: string;
  lat: number;
  lng: number;
  population: number;
  density: number;
  source: string;
  military: string;
  incorporated: string;
  timezone: string;
  ranking: number;
  zips: number;
  id: number;
}

// Server-side coordinate lookup
export async function getCityCoordinates(cityState: string): Promise<Coordinates | null> {
  try {
    // Parse city and state from input (e.g., "Minneapolis, MN")
    const [cityName, stateId] = cityState.split(',').map(part => part.trim());
    
    // Find the city in our data
    const cityData = (cityCoordinates as CityData[]).find(
      city => 
        city.city.toLowerCase() === cityName.toLowerCase() && 
        city.state_id.toLowerCase() === stateId.toLowerCase()
    );

    if (!cityData) {
      return null;
    }

    return {
      latitude: cityData.lat,
      longitude: cityData.lng
    };
  } catch (error) {
    return null;
  }
}

// Client-side coordinate lookup (uses the same local file)
export async function getClientCoordinates(cityState: string): Promise<Coordinates | null> {
  return getCityCoordinates(cityState);
}