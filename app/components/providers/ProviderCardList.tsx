
import type { Provider } from "../../data/providers";
import { ProviderCard } from "./ProviderCard";

export function ProviderCardList({ providers }: { providers: Provider[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 items-stretch mb-8">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
