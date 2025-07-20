import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Provider } from '../../data/providersEnhanced';

// This is a workaround for a known issue with react-leaflet and webpack
// It prevents the default icon from being broken
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Create custom tier-based icons with Graston brand colors
const createTierIcon = (tier: 'basic' | 'preferred' | 'premier') => {
  const colors = {
    basic: '#7C9699',     // Graston slate/gray
    preferred: '#057A63', // Graston teal
    premier: '#0558A5'    // Graston blue
  };
  
  const tierLabels = {
    basic: 'B',
    preferred: 'P',
    premier: 'P+'
  };

  return L.divIcon({
    className: 'custom-tier-icon',
    html: `
      <div style="
        width: 30px;
        height: 30px;
        background: ${colors[tier]};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 11px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        position: relative;
      ">
        ${tierLabels[tier]}
      </div>
      <div style="
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 12px solid ${colors[tier]};
        filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
      "></div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42]
  });
};

interface DirectoryMapClientProps {
  id: string;
  center: [number, number];
  markers: Provider[];
}

export function DirectoryMapClient({ id, center, markers }: DirectoryMapClientProps) {
  return (
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
        <Marker 
          key={provider.id} 
          position={provider.position}
          icon={createTierIcon(provider.tier)}
        >
          <Popup maxWidth={320} className="provider-popup">
            <div className="text-sm space-y-3 p-2">
              {/* Header with Tier Badge */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 leading-tight">{provider.name}</h3>
                  <p className="text-blue-600 font-medium">{provider.credentials}</p>
                </div>
                <div className={`
                  px-2 py-1 rounded-full text-xs font-semibold text-white ml-2
                  ${provider.tier === 'basic' ? 'bg-gray-500' : 
                    provider.tier === 'preferred' ? 'bg-teal-600' : 'bg-blue-600'}
                `}>
                  {provider.tier.charAt(0).toUpperCase() + provider.tier.slice(1)}
                </div>
              </div>
              
              <div>
                <p className="font-medium text-gray-700">{provider.specialty}</p>
                <p className="text-gray-600">{provider.practice}</p>
                <p className="text-gray-500 text-xs mt-1">
                  📍 {provider.city}, {provider.state}
                </p>
              </div>

              {/* Graston Level */}
              <div className="flex items-center text-xs bg-gradient-to-r from-teal-50 to-blue-50 rounded p-2">
                <span className="text-yellow-600">⭐</span>
                <span className="ml-1 font-medium text-gray-700">
                  Graston {provider.grastonLevel} • {provider.yearsExperience} years exp.
                </span>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-2 space-y-1">
                {provider.phone && (
                  <p className="text-blue-600 text-xs flex items-center">
                    📞 <a href={`tel:${provider.phone}`} className="hover:underline ml-1">
                      {provider.phone}
                    </a>
                  </p>
                )}
                {provider.email && (
                  <p className="text-blue-600 text-xs flex items-center">
                    ✉️ <a href={`mailto:${provider.email}`} className="hover:underline ml-1">
                      {provider.email}
                    </a>
                  </p>
                )}
                {provider.website && (
                  <p className="text-blue-600 text-xs flex items-center">
                    🌐 <a 
                      href={provider.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline ml-1"
                    >
                      Visit Website
                    </a>
                  </p>
                )}
              </div>
              
              {/* Specializations */}
              {provider.specializations.length > 0 && (
                <div className="border-t pt-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">Specializations:</p>
                  <div className="flex flex-wrap gap-1">
                    {provider.specializations.slice(0, 2).map((spec, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                    {provider.specializations.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{provider.specializations.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* View Profile Button */}
              <div className="border-t pt-2">
                <a 
                  href={`/provider/${provider.id}`}
                  className="block w-full text-center bg-gradient-to-r from-teal-600 to-blue-600 text-white text-xs font-semibold py-2 px-3 rounded hover:from-teal-700 hover:to-blue-700 transition-colors"
                >
                  View Full Profile
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
