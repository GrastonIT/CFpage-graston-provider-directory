import { useCallback, useMemo, useState } from 'react';
import {
    HiOutlineAdjustments,
    HiOutlineMap,
    HiOutlineSearch,
    HiOutlineViewGrid,
    HiOutlineViewList,
    HiX,
} from 'react-icons/hi';
import { EnhancedProviderCard } from '../components/providers/EnhancedProviderCard';
import { FilterGroup } from '../components/providers/FilterGroup';
import { InteractiveMap } from '../components/providers/InteractiveMap';
import { ProximityFilter } from '../components/providers/ProximityFilter';
import { providers as allProviders, Provider } from '../data/providersEnhanced';

type ViewMode = 'grid' | 'list' | 'map';

export default function DirectoryRoute() {
    const [providers] = useState<Provider[]>(allProviders);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<Record<string, string[]>>({});
    const [proximity, setProximity] = useState<{ center: [number, number] | null; radius: number | null }>({
        center: null,
        radius: null,
    });
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const specialties = useMemo(() => [...new Set(providers.flatMap((p: Provider) => p.specializations))], [providers]);
    const conditions = useMemo(() => [...new Set(providers.flatMap((p: Provider) => p.conditionsTreated))], [providers]);
    const grastonLevels = useMemo(() => [...new Set(providers.map((p: Provider) => p.grastonLevel))], [providers]);

    const haversineDistance = useCallback((coords1: [number, number], coords2: [number, number]) => {
        const toRad = (x: number) => (x * Math.PI) / 180;
        const R = 3959; // Earth's radius in miles

        const dLat = toRad(coords2[0] - coords1[0]);
        const dLon = toRad(coords2[1] - coords1[1]);
        const lat1 = toRad(coords1[0]);
        const lat2 = toRad(coords2[0]);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }, []);

    const filteredProviders = useMemo(() => {
        let result = providers;

        // Search term filtering
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            result = result.filter((p: Provider) =>
                p.name.toLowerCase().includes(lowercasedTerm) ||
                p.practice.toLowerCase().includes(lowercasedTerm) ||
                p.city.toLowerCase().includes(lowercasedTerm) ||
                p.state.toLowerCase().includes(lowercasedTerm) ||
                p.specialty.toLowerCase().includes(lowercasedTerm)
            );
        }

        // Faceted filters
        Object.entries(filters).forEach(([key, values]) => {
            if (values.length > 0) {
                result = result.filter((p: Provider) => {
                    const pValue = (p as any)[key];
                    if (Array.isArray(pValue)) {
                        return values.some(v => pValue.includes(v));
                    }
                    return values.includes(pValue);
                });
            }
        });

        // Proximity filter
        if (proximity.center && proximity.radius) {
            result = result.filter((p: Provider) => {
                if (!p.position) return false;
                const distance = haversineDistance(proximity.center!, p.position);
                return distance <= proximity.radius!;
            });
        }

        // Smart sorting
        return result.sort((a: Provider, b: Provider) => {
            // Tier priority
            const tierOrder: { [key in 'basic' | 'preferred' | 'premier']: number } = { premier: 3, preferred: 2, basic: 1 };
            if (tierOrder[a.tier] !== tierOrder[b.tier]) {
                return tierOrder[b.tier] - tierOrder[a.tier];
            }
            // Distance priority if location is set
            if (proximity.center) {
                const distA = a.position ? haversineDistance(proximity.center, a.position) : Infinity;
                const distB = b.position ? haversineDistance(proximity.center, b.position) : Infinity;
                return distA - distB;
            }
            // Fallback to alphabetical
            return a.name.localeCompare(b.name);
        });
    }, [providers, searchTerm, filters, proximity, haversineDistance]);

    const handleFilterChange = (group: string, value: string) => {
        setFilters(prev => {
            const currentValues = prev[group] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [group]: newValues };
        });
    };

    const handleProximityChange = (radius: number | null) => {
        setProximity(prev => ({ ...prev, radius }));
    };

    const handleLocationChange = (location: { lat: number; lng: number } | null) => {
        setProximity(prev => ({ ...prev, center: location ? [location.lat, location.lng] : null }));
    };

    const clearFilters = () => {
        setSearchTerm('');
        setFilters({});
        setProximity({ center: null, radius: null });
    };

    const ViewToggleButton = ({ mode, label }: { mode: ViewMode; label: string }) => (
        <button
            onClick={() => setViewMode(mode)}
            className={`p-2 rounded-md transition-colors ${viewMode === mode ? 'bg-[var(--graston-teal)] text-white' : 'hover:bg-gray-200'
                }`}
            aria-label={`Switch to ${label} view`}
        >
            {mode === 'grid' && <HiOutlineViewGrid className="h-5 w-5" />}
            {mode === 'list' && <HiOutlineViewList className="h-5 w-5" />}
            {mode === 'map' && <HiOutlineMap className="h-5 w-5" />}
        </button>
    );

    const filterFacets = {
        specialty: specialties,
        conditionsTreated: conditions,
        grastonLevel: grastonLevels,
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-50 overflow-hidden">
            {/* Filters Sidebar */}
            <aside
                className={`fixed lg:relative inset-y-0 left-0 z-20 w-80 bg-white shadow-lg transform ${isFiltersOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold text-[var(--graston-dark)]">Filters</h2>
                    <button onClick={() => setIsFiltersOpen(false)} className="lg:hidden p-1">
                        <HiX className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-4 space-y-6">
                    <ProximityFilter
                        onProximityChange={handleProximityChange}
                        onLocationChange={handleLocationChange}
                        currentDistance={proximity.radius ?? 0}
                    />
                    <FilterGroup
                        title="Specialties"
                        options={specialties}
                        selected={filters.specializations || []}
                        onChange={(val) => handleFilterChange('specializations', val)}
                    />
                    <FilterGroup
                        title="Conditions Treated"
                        options={conditions}
                        selected={filters.conditionsTreated || []}
                        onChange={(val) => handleFilterChange('conditionsTreated', val)}
                    />
                    <FilterGroup
                        title="Graston Level"
                        options={grastonLevels}
                        selected={filters.grastonLevel || []}
                        onChange={(val) => handleFilterChange('grastonLevel', val)}
                    />
                </div>
                <div className="p-4 border-t">
                    <button
                        onClick={clearFilters}
                        className="w-full py-2 px-4 bg-[var(--graston-coral)] text-white rounded-md hover:bg-opacity-90 transition"
                    >
                        Clear All Filters
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Search and View Controls */}
                <header className="bg-white/80 backdrop-blur-sm border-b p-4 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button onClick={() => setIsFiltersOpen(true)} className="lg:hidden p-2">
                                <HiOutlineAdjustments className="h-6 w-6" />
                            </button>
                            <div className="relative">
                                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, practice, location..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-64 md:w-80 border rounded-md focus:ring-2 focus:ring-[var(--graston-teal)] focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
                            <ViewToggleButton mode="grid" label="Grid" />
                            <ViewToggleButton mode="list" label="List" />
                            <ViewToggleButton mode="map" label="Map" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        Found {filteredProviders.length} provider{filteredProviders.length !== 1 && 's'}.
                    </p>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden">
                    {viewMode === 'map' ? (
                        <InteractiveMap
                            providers={filteredProviders}
                            selectedProvider={selectedProvider}
                            onProviderSelect={setSelectedProvider}
                            userLocation={proximity.center}
                        />
                    ) : (
                        <div className="h-full overflow-y-auto p-4">
                            {filteredProviders.length > 0 ? (
                                <div
                                    className={
                                        viewMode === 'grid'
                                            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'
                                            : 'space-y-4'
                                    }
                                >
                                    {filteredProviders.map(provider => (
                                        <EnhancedProviderCard key={provider.id} provider={provider} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <h3 className="text-2xl font-semibold text-gray-800">No Providers Found</h3>
                                    <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
