
import type { Provider } from '../../data/providersEnhanced';
import { ClientOnlyMap } from './ClientOnlyMap';

interface DirectoryMapProps {
  id: string;
  center: [number, number];
  markers: Provider[];
}

export function DirectoryMap({ id, center, markers }: DirectoryMapProps) {
  return <ClientOnlyMap id={id} center={center} markers={markers} />;
}
