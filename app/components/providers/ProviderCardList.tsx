
import type { Provider } from "../../data/providers";
import { ProviderCard } from "./ProviderCard";

export function ProviderCardList({ providers }: { providers: Provider[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
