import { useLoaderData, useSearchParams } from 'react-router';
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
  const { providers, searchQuery } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  
  const hasFilters = Array.from(searchParams.keys()).some(key => key !== 'q');
  
  const tierCounts = {
    premier: providers.filter(p => p.tier === 'premier').length,
    preferred: providers.filter(p => p.tier === 'preferred').length,
    basic: providers.filter(p => p.tier === 'basic').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Find Certified Graston Technique Providers
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
        <EnhancedFilterGroup />
        
        {/* Results Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {providers.length === 0 ? 'No providers found' : 
                 providers.length === 1 ? '1 provider found' : 
                 `${providers.length} providers found`}
              </h2>
              {searchQuery && (
                <p className="text-gray-600">
                  {hasFilters ? 'Search and filter results' : 'Search results'} for "<span className="font-medium">{searchQuery}</span>"
                </p>
              )}
              {hasFilters && !searchQuery && (
                <p className="text-gray-600">Filtered results</p>
              )}
            </div>
            
            {/* Tier Summary */}
            {providers.length > 0 && (
              <div className="mt-4 sm:mt-0 flex items-center space-x-4 text-sm">
                {tierCounts.premier > 0 && (
                  <span className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mr-2"></div>
                    {tierCounts.premier} Premier
                  </span>
                )}
                {tierCounts.preferred > 0 && (
                  <span className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                    {tierCounts.preferred} Preferred
                  </span>
                )}
                {tierCounts.basic > 0 && (
                  <span className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                    {tierCounts.basic} Basic
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {providers.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Provider Cards */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {providers.map(provider => (
                  <EnhancedProviderCard 
                    key={provider.id} 
                    provider={provider} 
                  />
                ))}
              </div>
            </div>
            
            {/* Map */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Provider Locations
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {providers.length} {providers.length === 1 ? 'provider' : 'providers'} shown
                    </p>
                  </div>
                  <div style={{ height: '400px' }}>
                    <DirectoryMap
                      id="enhanced-providers-map"
                      center={[39.7392, -104.9903]} // Default to Denver
                      markers={providers}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No providers found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find providers in your area.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>• Check your spelling</p>
                <p>• Try broader search terms</p>
                <p>• Remove some filters</p>
                <p>• Search by state or specialty instead</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
