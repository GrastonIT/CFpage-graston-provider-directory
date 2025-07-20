import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../base/LoadingAndError';
import type { Provider } from '../../data/providersEnhanced';

interface ClientOnlyMapProps {
  id: string;
  center: [number, number];
  markers: Provider[];
}

export function ClientOnlyMap({ id, center, markers }: ClientOnlyMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [MapComponent, setMapComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import the map component only on the client
    import('./DirectoryMapClient').then((module) => {
      setMapComponent(() => module.DirectoryMapClient);
    });
  }, []);

  if (!isClient || !MapComponent) {
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

  return <MapComponent id={id} center={center} markers={markers} />;
}
