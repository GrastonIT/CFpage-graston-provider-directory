import { HiEye, HiGlobeAlt, HiLocationMarker, HiPhone, HiStar } from 'react-icons/hi';
import { Link } from 'react-router';
import type { Provider } from '../../data/providersEnhanced';
import { TierBadge } from './TierBadge';

interface EnhancedProviderCardProps {
    provider: Provider;
}

export function EnhancedProviderCard({ provider }: EnhancedProviderCardProps) {
    const truncateBio = (bio: string, maxLength: number) => {
        if (bio.length <= maxLength) return bio;
        return bio.substring(0, maxLength).trim() + '...';
    };

    const displayBio = provider.tier === 'basic'
        ? truncateBio(provider.bio, 150)
        : truncateBio(provider.bio, 250);

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[var(--graston-teal)]">
            {/* Header with Profile Image and Tier Badge */}
            <div className="relative">
                {provider.profileImage ? (
                    <div className="h-32 bg-gradient-to-r from-[var(--graston-teal)] to-[var(--graston-blue)] flex items-center justify-center">
                        <img
                            src={provider.profileImage}
                            alt={provider.name}
                            className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg"
                        />
                    </div>
                ) : (
                    <div className="h-32 bg-gradient-to-r from-[var(--graston-teal)] to-[var(--graston-blue)] flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border-4 border-white bg-white flex items-center justify-center shadow-lg">
                            <span className="text-2xl font-bold text-[var(--graston-blue)]">
                                {provider.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                        </div>
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <TierBadge tier={provider.tier} size="sm" />
                </div>
            </div>

            <div className="p-6">
                {/* Provider Info */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-[var(--graston-dark)] mb-1">
                            {provider.name}
                        </h3>
                        <p className="text-[var(--graston-blue)] font-medium mb-1">{provider.credentials}</p>
                        <p className="text-[var(--graston-gray)] text-sm">{provider.specialty}</p>
                        <p className="text-[var(--graston-dark)] font-medium">{provider.practice}</p>
                    </div>

                    {/* Analytics (Preferred+ only) */}
                    {provider.tier !== 'basic' && (
                        <div className="flex items-center text-[var(--graston-slate)] text-sm">
                            <HiEye className="w-4 h-4 mr-1" />
                            <span>{provider.analytics.views30d}</span>
                        </div>
                    )}
                </div>

                {/* Location */}
                <div className="flex items-center text-[var(--graston-gray)] mb-3">
                    <HiLocationMarker className="w-4 h-4 mr-2 text-[var(--graston-coral)]" />
                    <span className="text-sm">{provider.city}, {provider.state}</span>
                </div>

                {/* Bio */}
                <p className="text-[var(--graston-dark)] text-sm mb-4 leading-relaxed">
                    {displayBio}
                </p>

                {/* Specializations */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {provider.specializations.slice(0, 3).map((spec, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-[var(--graston-light-blue)] text-[var(--graston-blue)] text-xs rounded-full border border-[var(--graston-teal)]"
                            >
                                {spec}
                            </span>
                        ))}
                        {provider.specializations.length > 3 && (
                            <span className="px-3 py-1 bg-gray-50 text-[var(--graston-gray)] text-xs rounded-full">
                                +{provider.specializations.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Graston Level & Experience */}
                <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center">
                        <HiStar className="w-4 h-4 mr-1 text-[var(--graston-yellow)]" />
                        <span className="text-[var(--graston-gray)]">
                            Graston {provider.grastonLevel} • {provider.yearsExperience} years
                        </span>
                    </div>
                </div>

                {/* Contact Actions - Tier Dependent */}
                <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                        {/* Phone (all tiers) */}
                        {provider.phone && (
                            <a
                                href={`tel:${provider.phone}`}
                                className="flex items-center text-[var(--graston-blue)] hover:text-[var(--graston-teal)] transition-colors text-sm"
                            >
                                <HiPhone className="w-4 h-4 mr-1" />
                                <span>Call</span>
                            </a>
                        )}

                        {/* Website (Preferred+ only) */}
                        {provider.tier !== 'basic' && provider.website && (
                            <a
                                href={provider.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-[var(--graston-blue)] hover:text-[var(--graston-teal)] transition-colors text-sm"
                            >
                                <HiGlobeAlt className="w-4 h-4 mr-1" />
                                <span>Website</span>
                            </a>
                        )}

                        {/* Booking (Premier only) */}
                        {provider.tier === 'premier' && provider.bookingUrl && (
                            <a
                                href={provider.bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 bg-[var(--graston-teal)] text-white text-sm rounded-md hover:bg-[var(--graston-blue)] transition-colors"
                            >
                                Book Now
                            </a>
                        )}
                    </div>

                    {/* View Profile Link */}
                    <Link
                        to={`/provider/${provider.id}`}
                        className="text-[var(--graston-blue)] hover:text-[var(--graston-teal)] font-medium text-sm transition-colors"
                    >
                        View Profile →
                    </Link>
                </div>

                {/* Premium Features Preview */}
                {provider.tier === 'premier' && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            {provider.gallery && provider.gallery.length > 0 && (
                                <span>📸 {provider.gallery.length} photos</span>
                            )}
                            {provider.introVideo && (
                                <span>🎥 Video intro</span>
                            )}
                            {provider.aboutClinic && (
                                <span>🏢 Clinic details</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
