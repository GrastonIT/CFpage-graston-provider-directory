
import { useLoaderData } from "react-router";
import { LoadMoreButton } from "../components/base/LoadMoreButton";
import { SearchBar } from "../components/base/SearchBar";
import { DirectoryMap } from "../components/providers/DirectoryMap";
import { ProviderCardList } from "../components/providers/ProviderCardList";
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
  const { providers, searchQuery } = useLoaderData<typeof loader>();
  const sortedProviders = providers;

  return (
    <div className="min-h-screen bg-[#f7f9fb] py-8 px-2 md:px-8">
      {/* Map Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-8">
        <div className="h-[320px] w-full rounded-xl overflow-hidden shadow">
          <DirectoryMap
            id="map"
            center={providers.length > 0 ? providers[0].position : [39.8283, -98.5795]}
            markers={providers}
          />
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-3 md:gap-4 mb-6">
        <div className="flex-1 w-full">
          <SearchBar placeholder="Enter a location or search by name…" />
        </div>
        <button className="mt-2 md:mt-0 px-5 py-2 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition">Search</button>
        <button className="ml-0 md:ml-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <span className="material-icons text-base">tune</span>
          More filters
        </button>
      </div>

      {/* Grid/List Toggle & Member Count */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <button className="p-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-blue-50">
            <span className="material-icons">grid_view</span>
          </button>
          <button className="p-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-blue-50">
            <span className="material-icons">view_list</span>
          </button>
        </div>
        <h2 className="text-2xl font-light text-gray-700 tracking-wide">
          {providers.length} Member{providers.length !== 1 ? 's' : ''}
        </h2>
      </div>

      {/* Provider Cards Grid */}
      <div className="max-w-5xl mx-auto">
        <ProviderCardList providers={sortedProviders} />
        {providers.length > 0 && <div className="flex justify-center mt-8"><LoadMoreButton /></div>}
      </div>
    </div>
  );
}
