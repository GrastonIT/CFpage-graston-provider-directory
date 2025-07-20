
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Provider } from '../../data/providers';

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

export function DirectoryMap({ id, center, markers }: DirectoryMapProps) {
  // Leaflet is a client-side only library, so we need to make sure
  // we're in a browser environment before rendering the map.
  if (typeof window === 'undefined') {
    return <div id={id} style={{ height: '400px', width: '100%', backgroundColor: '#e0e0e0' }} />;
  }

  return (
    <MapContainer id={id} center={center} zoom={6} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map(provider => (
        <Marker key={provider.id} position={provider.position}>
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold">{provider.name}</h3>
              <p className="text-gray-600">{provider.credentials}</p>
              <p className="text-gray-700">{provider.specialty}</p>
              <p className="text-gray-600">{provider.practice}</p>
              <p className="text-gray-500 text-xs mt-1">
                {provider.city}, {provider.state}
              </p>
              {provider.phone && (
                <p className="text-blue-600 text-xs">{provider.phone}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
