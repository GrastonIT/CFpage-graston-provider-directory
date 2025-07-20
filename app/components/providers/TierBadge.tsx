import type { ProviderTier } from '../../data/providersEnhanced';

interface TierBadgeProps {
    tier: ProviderTier;
    size?: 'sm' | 'md' | 'lg';
}

export function TierBadge({ tier, size = 'md' }: TierBadgeProps) {
    const baseClasses = "font-bold uppercase tracking-wider rounded-full border-2";

    const sizeClasses = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-2 text-base"
    };

    const tierClasses = {
        basic: "bg-gray-100 text-[var(--graston-gray)] border-gray-300",
        preferred: "bg-[var(--graston-light-blue)] text-[var(--graston-blue)] border-[var(--graston-teal)]",
        premier: "bg-gradient-to-r from-[var(--graston-coral)] to-[var(--graston-yellow)] text-[var(--graston-dark)] border-[var(--graston-coral)]"
    };

    const tierLabels = {
        basic: "Basic",
        preferred: "Preferred",
        premier: "Premier"
    };

    return (
        <span className={`${baseClasses} ${sizeClasses[size]} ${tierClasses[tier]}`}>
            {tierLabels[tier]}
        </span>
    );
}
