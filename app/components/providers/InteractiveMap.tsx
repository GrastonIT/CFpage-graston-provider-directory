import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import type { Provider } from '../../data/providers.types';
import { MapPopupCard } from './MapPopupCard';

interface InteractiveMapProps {
  providers: Provider[];
  selectedProvider?: Provider | null;
  onProviderSelect?: (provider: Provider) => void;
  center?: [number, number];
  zoom?: number;
  className?: string;
  userLocation?: [number, number] | null;
}

declare global {
  interface Window {
    L: any;
  }
}

export function InteractiveMap({
  providers,
  selectedProvider,
  onProviderSelect,
  center = [39.8283, -98.5795], // Center of US
  zoom = 4,
  className = "w-full h-full",
  userLocation
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const [mapLoaded, setMapLoaded] = useState(false);

  const createTierIcon = (tier: 'basic' | 'preferred' | 'premier', isHighlighted = false) => {
    if (!window.L) return null;

    const colors = {
      basic: '#7C9699',     // Graston slate
      preferred: '#057A63', // Graston teal  
      premier: '#FC7961'    // Graston coral
    };

    const size = isHighlighted ? 38 : 30;
    const borderSize = 3;
    const shadow = isHighlighted
      ? '0 5px 15px rgba(0,0,0,0.4)'
      : '0 3px 8px rgba(0,0,0,0.25)';

    return window.L.divIcon({
      className: 'custom-tier-marker',
      html: `
                <div style="
                    width: ${size}px;
                    height: ${size}px;
                    background: ${colors[tier]};
                    border: ${borderSize}px solid white;
                    border-radius: 50%;
                    box-shadow: ${shadow};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                    transform: ${isHighlighted ? 'scale(1.1)' : 'scale(1)'};
                ">
                    <div style="
                        color: white;
                        font-size: ${size * 0.45}px;
                        font-weight: bold;
                        text-shadow: 0 1px 2px rgba(0,0,0,0.5);
                    ">${tier === 'premier' ? '★' : tier === 'preferred' ? 'P' : 'B'}</div>
                </div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  const createUserIcon = () => {
    if (!window.L) return null;
    return window.L.divIcon({
      className: 'user-location-marker',
      html: `
                <div style="
                    width: 24px;
                    height: 24px;
                    background: #4285F4;
                    border: 3px solid white;
                    border-radius: 50%;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    position: relative;
                ">
                    <div style="
                        width: 48px;
                        height: 48px;
                        background: rgba(66, 133, 244, 0.2);
                        border-radius: 50%;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        animation: pulse 2s infinite;
                    "></div>
                </div>
            `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  useEffect(() => {
    const loadLeaflet = () => {
      if (window.L) {
        setMapLoaded(true);
        return;
      }
      if (document.querySelector('script[src*="leaflet"]')) {
        // If script is already loading, wait for it
        const script = document.querySelector('script[src*="leaflet"]');
        script?.addEventListener('load', () => setMapLoaded(true));
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    };
    loadLeaflet();
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;
    const L = window.L;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        zoomControl: false // We'll add a custom one
      }).setView(center, zoom);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapInstanceRef.current);

      L.control.zoom({ position: 'topright' }).addTo(mapInstanceRef.current);
    }
  }, [mapLoaded, center, zoom]);

  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return;
    const L = window.L;
    const map = mapInstanceRef.current;

    // Update markers
    const currentMarkerIds = Object.keys(markersRef.current);
    const newProviderIds = providers.map(p => p.id.toString());

    // Remove old markers
    currentMarkerIds.forEach(id => {
      if (!newProviderIds.includes(id) && id !== 'userLocation') {
        map.removeLayer(markersRef.current[id]);
        delete markersRef.current[id];
      }
    });

    // Add/update provider markers
    providers.forEach(provider => {
      // Validate provider and position data
      if (!provider || !provider.position || !Array.isArray(provider.position) ||
        provider.position.length !== 2 ||
        typeof provider.position[0] !== 'number' ||
        typeof provider.position[1] !== 'number' ||
        isNaN(provider.position[0]) ||
        isNaN(provider.position[1])) {
        return;
      }

      // Validate coordinates are within bounds
      const [lat, lng] = provider.position;
      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        return;
      }

      const isSelected = selectedProvider?.id === provider.id;
      const icon = createTierIcon(provider.tier || 'basic', isSelected);
      if (!icon) return;

      if (markersRef.current[provider.id]) {
        markersRef.current[provider.id].setIcon(icon);
      } else {
        const popupContent = document.createElement('div');
        const root = ReactDOM.createRoot(popupContent);
        root.render(<MapPopupCard provider={provider} />);

        const marker = L.marker(provider.position, {
          icon,
          riseOnHover: true,
          riseOffset: 250
        })
          .addTo(map)
          .bindPopup(popupContent, {
            maxWidth: 320,
            minWidth: 300,
            className: 'provider-popup',
            closeButton: false,
            offset: [0, -20]
          })
          .on('click', () => onProviderSelect?.(provider));

        markersRef.current[provider.id] = marker;
      }
    });

    // Add/update user location marker
    if (userLocation) {
      const userIcon = createUserIcon();
      if (userIcon) {
        if (markersRef.current.userLocation) {
          markersRef.current.userLocation.setLatLng(userLocation);
        } else {
          markersRef.current.userLocation = L.marker(userLocation, { icon: userIcon, zIndexOffset: 1000 })
            .addTo(map)
            .bindPopup("Your estimated location");
        }
      }
    } else if (markersRef.current.userLocation) {
      map.removeLayer(markersRef.current.userLocation);
      delete markersRef.current.userLocation;
    }

  }, [providers, selectedProvider, userLocation, mapLoaded, onProviderSelect]);

  useEffect(() => {
    if (!mapInstanceRef.current || !selectedProvider || !selectedProvider.position) return;

    mapInstanceRef.current.flyTo(selectedProvider.position, 14, {
      animate: true,
      duration: 1
    });

  }, [selectedProvider]);


  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden shadow-lg" />
      <style>{`
                @keyframes pulse {
                    0% { transform: scale(0.5); opacity: 0.5; }
                    70% { transform: scale(2.5); opacity: 0; }
                    100% { transform: scale(2.5); opacity: 0; }
                }
                .leaflet-popup-content-wrapper {
                    border-radius: 8px !important;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
                }
                .leaflet-popup-tip {
                    box-shadow: none !important;
                }
                .custom-tier-marker {
                    background: transparent;
                    border: none;
                }
                .provider-popup .leaflet-popup-content-wrapper {
                    border-radius: 12px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                    padding: 0;
                    overflow: hidden;
                }
                .provider-popup .leaflet-popup-content {
                    margin: 0;
                    line-height: 1.4;
                }
                .provider-popup .leaflet-popup-tip {
                    background: white;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                }
            `}</style>
    </div>
  );
}
