import { useEffect, useRef } from 'react';
import type { Provider } from '../../data/providersEnhanced';

interface InteractiveMapProps {
    providers: Provider[];
    selectedProvider?: Provider | null;
    onProviderSelect?: (provider: Provider) => void;
    center?: [number, number];
    zoom?: number;
    className?: string;
}

export function InteractiveMap({
    providers,
    selectedProvider,
    onProviderSelect,
    center = [39.8283, -98.5795], // Center of US
    zoom = 4,
    className = "w-full h-96"
}: InteractiveMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markersRef = useRef<any[]>([]);

    useEffect(() => {
        if (!mapRef.current) return;

        // Initialize Leaflet map
        const initMap = async () => {
            const L = (window as any).L;
            if (!L) {
                console.error('Leaflet not loaded');
                return;
            }

            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
            }

            const map = L.map(mapRef.current).setView(center, zoom);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            mapInstanceRef.current = map;

            // Clear existing markers
            markersRef.current.forEach(marker => marker.remove());
            markersRef.current = [];

            // Create custom marker icons for different tiers
            const createTierIcon = (tier: string) => {
                const colors = {
                    premier: '#FC7961', // Coral
                    preferred: '#057A63', // Teal
                    basic: '#7C9699' // Slate
                };

                return L.divIcon({
                    className: 'custom-marker',
                    html: `
                        <div style="
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            background: ${colors[tier as keyof typeof colors] || colors.basic};
                            border: 3px solid white;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-weight: bold;
                            font-size: 12px;
                        ">
                            ${tier === 'premier' ? 'P' : tier === 'preferred' ? 'R' : 'B'}
                        </div>
                    `,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
            };

            // Add markers for each provider
            providers.forEach(provider => {
                if (provider.position && provider.position[0] && provider.position[1]) {
                    const marker = L.marker(provider.position, {
                        icon: createTierIcon(provider.tier)
                    }).addTo(map);

                    // Create popup content
                    const popupContent = `
                        <div class="p-3 min-w-[200px]">
                            <div class="flex items-center gap-2 mb-2">
                                <h3 class="font-bold text-sm">${provider.name}</h3>
                                <span class="px-2 py-1 text-xs rounded-full ${provider.tier === 'premier'
                            ? 'bg-orange-100 text-orange-700'
                            : provider.tier === 'preferred'
                                ? 'bg-teal-100 text-teal-700'
                                : 'bg-gray-100 text-gray-700'
                        }">${provider.tier}</span>
                            </div>
                            <p class="text-xs text-gray-600 mb-1">${provider.credentials}</p>
                            <p class="text-xs text-gray-700 mb-2">${provider.specialty}</p>
                            <p class="text-xs font-medium mb-2">${provider.practice}</p>
                            <p class="text-xs text-gray-600">${provider.city}, ${provider.state}</p>
                            ${provider.phone ? `<p class="text-xs text-blue-600 mt-1">${provider.phone}</p>` : ''}
                            <div class="mt-2">
                                <button 
                                    onclick="window.selectProvider(${provider.id})"
                                    class="w-full px-3 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700 transition-colors"
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>
                    `;

                    marker.bindPopup(popupContent);

                    // Add click handler
                    marker.on('click', () => {
                        if (onProviderSelect) {
                            onProviderSelect(provider);
                        }
                    });

                    markersRef.current.push(marker);
                }
            });

            // Highlight selected provider
            if (selectedProvider && selectedProvider.position) {
                map.setView(selectedProvider.position, 12);
            }
        };

        initMap();

        // Global function for popup buttons
        (window as any).selectProvider = (providerId: number) => {
            const provider = providers.find(p => p.id === providerId);
            if (provider && onProviderSelect) {
                onProviderSelect(provider);
            }
        };

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
            }
        };
    }, [providers, selectedProvider, center, zoom, onProviderSelect]);

    return (
        <div className={className}>
            <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden shadow-lg" />
        </div>
    );
}
