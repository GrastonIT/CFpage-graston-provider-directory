
import { useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';

interface ProximityFilterProps {
  onProximityChange: (distance: number) => void;
  onLocationChange: (location: { lat: number; lng: number } | null) => void;
  currentDistance: number;
}

export function ProximityFilter({
  onProximityChange,
  onLocationChange,
  currentDistance
}: ProximityFilterProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    setIsGettingLocation(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        onLocationChange(location);
        setIsGettingLocation(false);
      },
      (error) => {
        let errorMessage = 'Unable to get your location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const handleClearLocation = () => {
    setUserLocation(null);
    onLocationChange(null);
    setLocationError('');
  };

  const distanceOptions = [5, 10, 25, 50, 100, 250];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-gray-900">Proximity Filter</h3>
        {userLocation && (
          <button
            onClick={handleClearLocation}
            className="text-xs text-red-600 hover:text-red-800 underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Location Button */}
      <div className="space-y-2">
        <button
          onClick={handleGetLocation}
          disabled={isGettingLocation}
          className={`
            w-full flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-colors
            ${userLocation
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:from-teal-700 hover:to-blue-700'
            }
            ${isGettingLocation ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <HiLocationMarker className="w-4 h-4 mr-2" />
          {isGettingLocation ? (
            'Getting location...'
          ) : userLocation ? (
            'Location detected ✓'
          ) : (
            'Use my location'
          )}
        </button>

        {locationError && (
          <p className="text-xs text-red-600 text-center">{locationError}</p>
        )}

        {userLocation && (
          <p className="text-xs text-gray-600 text-center">
            📍 Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </p>
        )}
      </div>

      {/* Distance Selection */}
      {userLocation && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Search within:
          </label>

          <div className="grid grid-cols-3 gap-2">
            {distanceOptions.map((distance) => (
              <button
                key={distance}
                onClick={() => onProximityChange(distance)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${distance === currentDistance
                    ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {distance} mi
              </button>
            ))}
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Showing providers within <strong>{currentDistance} miles</strong>
            </span>
          </div>
        </div>
      )}

      {!userLocation && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500 mb-2">
            📍 Enable location to find providers near you
          </p>
          <p className="text-xs text-gray-400">
            Your location is used only for distance calculations and is not stored.
          </p>
        </div>
      )}
    </div>
  );
}
