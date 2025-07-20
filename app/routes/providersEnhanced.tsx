import { useLoaderData, useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import type { LoaderFunctionArgs } from 'react-router';
import { searchProviders } from '../data/providersEnhanced';
import type { Provider, ProviderTier } from '../data/providersEnhanced';
import { SearchBar } from '../components/base/SearchBar';
import { EnhancedFilterGroup } from '../components/providers/EnhancedFilterGroup';
import { EnhancedProviderCard } from '../components/providers/EnhancedProviderCard';
import { DirectoryMap } from '../components/providers/DirectoryMap';

interface LoaderData {
  providers: Provider[];
  searchQuery: string;
}

// Calculate distance between two points using Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export async function loader({ request }: LoaderFunctionArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get('q') || '';
  
  // Get all providers matching search
  let providers = await searchProviders(searchQuery);
  
  // Apply filters
  const tier = url.searchParams.get('tier') as ProviderTier | null;
  const specialty = url.searchParams.get('specialty');
  const state = url.searchParams.get('state');
  const language = url.searchParams.get('language');
  const patientType = url.searchParams.get('patientType');
  const specialization = url.searchParams.get('specialization');
  const grastonLevel = url.searchParams.get('grastonLevel');
  const experience = url.searchParams.get('experience');
  
  // Filter by tier
  if (tier) {
    providers = providers.filter(p => p.tier === tier);
  }
  
  // Filter by specialty
  if (specialty) {
    providers = providers.filter(p => p.specialty === specialty);
  }
  
  // Filter by state
  if (state) {
    providers = providers.filter(p => p.state === state);
  }
  
  // Filter by language
  if (language) {
    providers = providers.filter(p => p.languages.includes(language));
  }
  
  // Filter by patient type
  if (patientType) {
    providers = providers.filter(p => p.patientTypes.includes(patientType));
  }
  
  // Filter by specialization
  if (specialization) {
    providers = providers.filter(p => p.specializations.includes(specialization));
  }
  
  // Filter by Graston level
  if (grastonLevel) {
    providers = providers.filter(p => p.grastonLevel === grastonLevel);
  }
  
  // Filter by experience
  if (experience) {
    const minYears = parseInt(experience.replace('+', ''));
    providers = providers.filter(p => p.yearsExperience >= minYears);
  }
  
  return { providers, searchQuery };
}

export default function EnhancedProviders() {
  const { providers: initialProviders, searchQuery } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const [filteredProviders, setFilteredProviders] = useState(initialProviders);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [proximityDistance, setProximityDistance] = useState(25);
  
  // Update filtered providers when location or distance changes
  useEffect(() => {
    let filtered = [...initialProviders];
    
    // Apply proximity filter if user location is available
    if (userLocation) {
      filtered = filtered.filter(provider => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          provider.position[0],
          provider.position[1]
        );
        return distance <= proximityDistance;
      });
      
      // Sort by distance
      filtered.sort((a, b) => {
        const distanceA = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          a.position[0],
          a.position[1]
        );
        const distanceB = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          b.position[0],
          b.position[1]
        );
        return distanceA - distanceB;
      });
    }
    
    setFilteredProviders(filtered);
  }, [initialProviders, userLocation, proximityDistance]);
  
  const handleProximityFilterChange = (location: { lat: number; lng: number } | null, distance: number) => {
    setUserLocation(location);
    setProximityDistance(distance);
  };
  
  const hasFilters = Array.from(searchParams.keys()).some(key => key !== 'q') || userLocation !== null;
  
  const tierCounts = {
    premier: filteredProviders.filter(p => p.tier === 'premier').length,
    preferred: filteredProviders.filter(p => p.tier === 'preferred').length,
    basic: filteredProviders.filter(p => p.tier === 'basic').length
  };

  // Calculate map center based on user location or providers
  const mapCenter: [number, number] = userLocation 
    ? [userLocation.lat, userLocation.lng]
    : filteredProviders.length > 0
    ? [filteredProviders[0].position[0], filteredProviders[0].position[1]]
    : [39.7392, -104.9903]; // Default to Denver

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='6'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Certified Graston Technique® Providers
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Connect with qualified healthcare professionals trained in Graston Technique® 
              for effective soft tissue mobilization and injury recovery.
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <EnhancedFilterGroup onProximityFilterChange={handleProximityFilterChange} />
        
        {/* Results Summary */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {filteredProviders.length === 0 ? 'No providers found' : 
                 filteredProviders.length === 1 ? '1 provider found' : 
                 `${filteredProviders.length} providers found`}
              </h2>
              {searchQuery && (
                <p className="text-gray-600">
                  {hasFilters ? 'Search and filter results' : 'Search results'} for "<span className="font-medium">{searchQuery}</span>"
                </p>
              )}
              {hasFilters && !searchQuery && (
                <p className="text-gray-600">Filtered results</p>
              )}
              {userLocation && (
                <p className="text-sm text-teal-600 mt-1">
                  📍 Showing providers within {proximityDistance} miles of your location
                </p>
              )}
            </div>
            
            {/* Tier Summary */}
            {filteredProviders.length > 0 && (
              <div className="mt-4 sm:mt-0 flex items-center space-x-4 text-sm">
                {tierCounts.premier > 0 && (
                  <span className="flex items-center bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1 rounded-full">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2"></div>
                    {tierCounts.premier} Premier
                  </span>
                )}
                {tierCounts.preferred > 0 && (
                  <span className="flex items-center bg-teal-50 px-3 py-1 rounded-full">
                    <div className="w-3 h-3 rounded-full bg-teal-500 mr-2"></div>
                    {tierCounts.preferred} Preferred
                  </span>
                )}
                {tierCounts.basic > 0 && (
                  <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                    <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                    {tierCounts.basic} Basic
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Provider Cards */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {filteredProviders.map((provider, index) => {
                  const distance = userLocation ? calculateDistance(
                    userLocation.lat,
                    userLocation.lng,
                    provider.position[0],
                    provider.position[1]
                  ) : null;
                  
                  return (
                    <div key={provider.id} className="relative">
                      <EnhancedProviderCard provider={provider} />
                      {distance && (
                        <div className="absolute top-4 right-4 bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium">
                          {distance.toFixed(1)} mi
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Map */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-blue-50">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Provider Locations
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {filteredProviders.length} {filteredProviders.length === 1 ? 'provider' : 'providers'} shown
                    </p>
                    {userLocation && (
                      <p className="text-xs text-teal-600 mt-1">
                        🎯 Centered on your location
                      </p>
                    )}
                  </div>
                  <div style={{ height: '400px' }}>
                    <DirectoryMap
                      id="enhanced-providers-map"
                      center={mapCenter}
                      markers={filteredProviders}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No providers found
              </h3>
              <p className="text-gray-600 mb-6">
                {userLocation 
                  ? `No providers found within ${proximityDistance} miles of your location.`
                  : 'Try adjusting your search terms or filters to find providers in your area.'
                }
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                {userLocation ? (
                  <>
                    <p>• Try increasing the distance range</p>
                    <p>• Remove some filters</p>
                    <p>• Search by state or specialty instead</p>
                  </>
                ) : (
                  <>
                    <p>• Check your spelling</p>
                    <p>• Try broader search terms</p>
                    <p>• Remove some filters</p>
                    <p>• Use the proximity filter to find nearby providers</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
