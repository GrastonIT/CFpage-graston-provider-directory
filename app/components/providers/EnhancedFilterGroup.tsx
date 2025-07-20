import { useSearchParams } from 'react-router';
import { 
  getUniqueSpecialties, 
  getUniqueStates, 
  getUniqueLanguages,
  getUniquePatientTypes,
  getUniqueSpecializations 
} from '../../data/providersEnhanced';
import type { ProviderTier } from '../../data/providersEnhanced';

export function EnhancedFilterGroup() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    const searchQuery = searchParams.get('q');
    const newParams = new URLSearchParams();
    if (searchQuery) {
      newParams.set('q', searchQuery);
    }
    setSearchParams(newParams);
  };

  const hasFilters = Array.from(searchParams.keys()).some(key => key !== 'q');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Providers</h3>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Tier Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Provider Tier
          </label>
          <select
            value={searchParams.get('tier') || ''}
            onChange={(e) => updateFilter('tier', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Tiers</option>
            <option value="premier">Premier</option>
            <option value="preferred">Preferred</option>
            <option value="basic">Basic</option>
          </select>
        </div>

        {/* Specialty Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialty
          </label>
          <select
            value={searchParams.get('specialty') || ''}
            onChange={(e) => updateFilter('specialty', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Specialties</option>
            {getUniqueSpecialties().map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>

        {/* State Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <select
            value={searchParams.get('state') || ''}
            onChange={(e) => updateFilter('state', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All States</option>
            {getUniqueStates().map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={searchParams.get('language') || ''}
            onChange={(e) => updateFilter('language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Languages</option>
            {getUniqueLanguages().map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>

        {/* Patient Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Type
          </label>
          <select
            value={searchParams.get('patientType') || ''}
            onChange={(e) => updateFilter('patientType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Patient Types</option>
            {getUniquePatientTypes().map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Specialization Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialization
          </label>
          <select
            value={searchParams.get('specialization') || ''}
            onChange={(e) => updateFilter('specialization', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Specializations</option>
            {getUniqueSpecializations().map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        {/* Graston Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Graston Level
          </label>
          <select
            value={searchParams.get('grastonLevel') || ''}
            onChange={(e) => updateFilter('grastonLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Levels</option>
            <option value="Instructor">Instructor</option>
            <option value="Specialist">Specialist</option>
            <option value="Advanced">Advanced</option>
            <option value="Basic">Basic</option>
            <option value="M2">M2</option>
            <option value="M1">M1</option>
          </select>
        </div>

        {/* Years Experience Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience
          </label>
          <select
            value={searchParams.get('experience') || ''}
            onChange={(e) => updateFilter('experience', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">Any Experience</option>
            <option value="20+">20+ years</option>
            <option value="15+">15+ years</option>
            <option value="10+">10+ years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>
      </div>
      
      {/* Active Filters Display */}
      {hasFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {Array.from(searchParams.entries())
              .filter(([key]) => key !== 'q')
              .map(([key, value]) => (
                <span
                  key={key}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {key}: {value}
                  <button
                    onClick={() => updateFilter(key, '')}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
