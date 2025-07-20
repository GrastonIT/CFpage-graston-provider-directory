
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { lazy, Suspense } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Provider } from '../../data/providers';
import { LoadingSpinner } from '../base/LoadingAndError';

// This is a workaround for a known issue with react-leaflet and webpack
// It prevents the default icon from being broken
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface DirectoryMapProps {
  id: string;
  center: [number, number];
  markers: Provider[];
}

// Lazy load the map component for better performance
const LazyMapContainer = lazy(() => 
  Promise.resolve({ default: MapContainer })
);

export function DirectoryMap({ id, center, markers }: DirectoryMapProps) {
  // Leaflet is a client-side only library, so we need to make sure
  // we're in a browser environment before rendering the map.
  if (typeof window === 'undefined') {
    return (
      <div 
        id={id} 
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ height: '400px', width: '100%' }}
      >
        <LoadingSpinner message="Loading map..." />
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ height: '400px', width: '100%' }}
      >
        <LoadingSpinner message="Loading map..." />
      </div>
    }>
      <MapContainer 
        id={id} 
        center={center} 
        zoom={6} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map(provider => (
          <Marker key={provider.id} position={provider.position}>
            <Popup maxWidth={300} className="provider-popup">
              <div className="text-sm space-y-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{provider.name}</h3>
                  <p className="text-blue-600 font-medium">{provider.credentials}</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700">{provider.specialty}</p>
                  <p className="text-gray-600">{provider.practice}</p>
                </div>
                
                <div className="border-t pt-2">
                  <p className="text-gray-600 text-xs">
                    📍 {provider.city}, {provider.state}
                  </p>
                  {provider.phone && (
                    <p className="text-blue-600 text-xs">
                      📞 <a href={`tel:${provider.phone}` } className="hover:underline">
                        {provider.phone}
                      </a>
                    </p>
                  )}
                  {provider.website && (
                    <p className="text-blue-600 text-xs">
                      🌐 <a 
                        href={provider.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Visit Website
                      </a>
                    </p>
                  )}
                </div>
                
                {provider.specializations.length > 0 && (
                  <div className="border-t pt-2">
                    <p className="text-xs font-medium text-gray-700 mb-1">Specializations:</p>
                    <div className="flex flex-wrap gap-1">
                      {provider.specializations.slice(0, 3).map((spec, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                      {provider.specializations.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{provider.specializations.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Suspense>
  );
}
