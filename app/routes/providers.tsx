
import { useLoaderData } from "react-router";
import { LoadMoreButton } from "../components/base/LoadMoreButton";
import { SearchBar } from "../components/base/SearchBar";
import { DirectoryMap } from "../components/providers/DirectoryMap";
import { FilterGroup } from "../components/providers/FilterGroup";
import { ProviderCardList } from "../components/providers/ProviderCardList";
import { ProximityFilter } from "../components/providers/ProximityFilter";
import { getProviders, getUniqueLanguages, getUniquePatientTypes, getUniqueSpecialties, searchProviders } from "../data/providers";
import type { Route } from "./+types/providers";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("q");
  const specialty = url.searchParams.get("specialty");
  const location = url.searchParams.get("location");
  const grastonLevel = url.searchParams.get("grastonLevel");

  let providers;

  if (searchQuery) {
    // If there's a search query, use searchProviders function
    providers = await searchProviders(searchQuery);

    // Apply additional filters to search results
    if (specialty) {
      providers = providers.filter(provider =>
        provider.specialty?.toLowerCase()?.includes(specialty.toLowerCase())
      );
    }
    if (location) {
      providers = providers.filter(provider =>
        provider.city?.toLowerCase()?.includes(location.toLowerCase()) ||
        provider.state?.toLowerCase()?.includes(location.toLowerCase())
      );
    }
    if (grastonLevel) {
      providers = providers.filter(provider => provider.grastonLevel === grastonLevel);
    }

    // Filter out providers with invalid data
    providers = providers.filter(provider => {
      return provider && 
             provider.id &&
             provider.name &&
             (!provider.position || (
               Array.isArray(provider.position) &&
               provider.position.length === 2 &&
               typeof provider.position[0] === 'number' &&
               typeof provider.position[1] === 'number' &&
               !isNaN(provider.position[0]) &&
               !isNaN(provider.position[1]) &&
               provider.position[0] >= -90 &&
               provider.position[0] <= 90 &&
               provider.position[1] >= -180 &&
               provider.position[1] <= 180
             ));
    });
  } else {
    // No search query, use regular getProviders with filters
    providers = await getProviders({
      specialty: specialty || undefined,
      location: location || undefined,
      grastonLevel: grastonLevel || undefined
    });
  }

  const [specialties, languages, patientTypes] = await Promise.all([
    getUniqueSpecialties(),
    getUniqueLanguages(),
    getUniquePatientTypes()
  ]);

  return {
    providers,
    searchQuery,
    facets: {
      specialty: specialties,
      languages,
      patients: patientTypes
    }
  };
}

export default function ProvidersPage() {
  const { providers, searchQuery, facets } = useLoaderData<typeof loader>();
  const sortedProviders = providers;

  return (
    <>
      <SearchBar placeholder="Search by name, specialty, or location…" />

      {/* Search Results Info */}
      {searchQuery && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            Found <strong>{providers.length}</strong> provider{providers.length !== 1 ? 's' : ''}
            for "<strong>{searchQuery}</strong>"
          </p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        <aside className="lg:w-1/4 p-4 border rounded-lg shadow-sm h-fit">
          <FilterGroup
            title="Specialties"
            options={facets.specialty}
            selected={[]}
            onChange={() => {}}
          />
          <FilterGroup
            title="Languages"
            options={facets.languages}
            selected={[]}
            onChange={() => {}}
          />
          <FilterGroup
            title="Patient Types"
            options={facets.patients}
            selected={[]}
            onChange={() => {}}
          />
        </aside>
        <main className="lg:w-3/4">
          <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-md">
            <DirectoryMap
              id="map"
              center={providers.length > 0 ? providers[0].position : [39.8283, -98.5795]}
              markers={providers}
            />
          </div>

          {/* Results count */}
          <div className="flex justify-between items-center mt-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {providers.length} Provider{providers.length !== 1 ? 's' : ''} Found
            </h2>
            {providers.length === 0 && searchQuery && (
              <p className="text-gray-600">
                Try adjusting your search terms or filters
              </p>
            )}
          </div>

          <ProviderCardList providers={sortedProviders} />
          {providers.length > 0 && <LoadMoreButton />}
        </main>
      </div>
    </>
  );
}
