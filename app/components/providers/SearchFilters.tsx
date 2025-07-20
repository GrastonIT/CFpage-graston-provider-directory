import { useState } from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import type { Provider } from '../../data/providers.types';
import { FilterGroup } from './FilterGroup';

interface SearchFiltersProps {
    providers: Provider[];
    onFiltersChange: (filters: SearchFilters) => void;
    initialFilters?: SearchFilters;
}

export interface SearchFilters {
    searchQuery: string;
    specialties: string[];
    languages: string[];
    patientTypes: string[];
    radius: number;
    location?: { lat: number; lng: number };
}

export function SearchFilters({ providers, onFiltersChange, initialFilters }: SearchFiltersProps) {
    const [filters, setFilters] = useState<SearchFilters>(initialFilters || {
        searchQuery: '',
        specialties: [],
        languages: [],
        patientTypes: [],
        radius: 50
    });

    // Extract unique values for filter options
    const specialties = [...new Set(providers.map(p => p.specialty))].sort();
    const languages = [...new Set(providers.flatMap(p => p.languages))].sort();
    const patientTypes = ['Adults', 'Children', 'Athletes', 'Seniors']; // Add more as needed

    // Handle filter changes
    const handleFilterChange = (category: keyof SearchFilters) => (value: string) => {
        const newFilters = { ...filters };
        if (Array.isArray(newFilters[category])) {
            const array = newFilters[category] as string[];
            const index = array.indexOf(value);
            if (index > -1) {
                array.splice(index, 1);
            } else {
                array.push(value);
            }
            setFilters(newFilters);
            onFiltersChange(newFilters);
        }
    };

    // Handle search input
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFilters = { ...filters, searchQuery: e.target.value };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    // Handle radius change
    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFilters = { ...filters, radius: parseInt(e.target.value) };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search by name, specialty, or location..."
                    value={filters.searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-[var(--graston-light-blue)] rounded-lg focus:ring-2 focus:ring-[var(--graston-teal)] focus:border-[var(--graston-teal)] bg-white text-[var(--graston-dark)] placeholder-[var(--graston-slate)]"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--graston-blue)]" />
            </div>

            {/* Distance Filter */}
            <div className="border-b border-[var(--graston-light-blue)] py-4">
                <h3 className="font-semibold text-[var(--graston-dark)] mb-4">Distance</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min="5"
                            max="100"
                            step="5"
                            value={filters.radius}
                            onChange={handleRadiusChange}
                            className="w-full h-2 bg-[var(--graston-light-blue)] rounded-lg appearance-none cursor-pointer accent-[var(--graston-teal)]"
                        />
                        <span className="text-sm text-[var(--graston-dark)] font-medium min-w-[4rem]">{filters.radius} miles</span>
                    </div>
                    <button
                        onClick={() => {
                            // Get user's location
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(
                                    (position) => {
                                        const newFilters = {
                                            ...filters,
                                            location: {
                                                lat: position.coords.latitude,
                                                lng: position.coords.longitude
                                            }
                                        };
                                        setFilters(newFilters);
                                        onFiltersChange(newFilters);
                                    },
                                    (error) => {
                                        console.error('Error getting location:', error);
                                    }
                                );
                            }
                        }}
                        className="flex items-center gap-2 text-sm text-[var(--graston-teal)] hover:text-[var(--graston-blue)]"
                    >
                        <FaMapMarkerAlt /> Use my location
                    </button>
                </div>
            </div>

            {/* Filter Groups */}
            <FilterGroup
                title="Specialties"
                options={specialties}
                selected={filters.specialties}
                onChange={handleFilterChange('specialties')}
            />
            <FilterGroup
                title="Languages"
                options={languages}
                selected={filters.languages}
                onChange={handleFilterChange('languages')}
            />
            <FilterGroup
                title="Patient Types"
                options={patientTypes}
                selected={filters.patientTypes}
                onChange={handleFilterChange('patientTypes')}
            />
        </div>
    );
}
