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
        basic: "bg-gray-100 text-gray-700 border-gray-300",
        preferred: "bg-blue-100 text-blue-700 border-blue-300",
        premier: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-300"
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
