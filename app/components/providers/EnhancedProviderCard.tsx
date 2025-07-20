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
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
            {/* Header with Tier Badge */}
            <div className="relative">
                {provider.profileImage && (
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                )}
                <div className="absolute top-3 right-3">
                    <TierBadge tier={provider.tier} size="sm" />
                </div>
            </div>

            <div className="p-6">
                {/* Provider Info */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {provider.name}
                        </h3>
                        <p className="text-blue-600 font-medium mb-1">{provider.credentials}</p>
                        <p className="text-gray-600 text-sm">{provider.specialty}</p>
                        <p className="text-gray-700 font-medium">{provider.practice}</p>
                    </div>

                    {/* Analytics (Preferred+ only) */}
                    {provider.tier !== 'basic' && (
                        <div className="flex items-center text-gray-500 text-sm">
                            <HiEye className="w-4 h-4 mr-1" />
                            <span>{provider.analytics.views30d}</span>
                        </div>
                    )}
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-3">
                    <HiLocationMarker className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{provider.city}, {provider.state}</span>
                </div>

                {/* Bio */}
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {displayBio}
                </p>

                {/* Specializations */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {provider.specializations.slice(0, 3).map((spec, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                            >
                                {spec}
                            </span>
                        ))}
                        {provider.specializations.length > 3 && (
                            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                                +{provider.specializations.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Graston Level & Experience */}
                <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center">
                        <HiStar className="w-4 h-4 mr-1 text-yellow-500" />
                        <span className="text-gray-600">
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
                                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm"
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
                                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm"
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
                                className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                            >
                                Book Now
                            </a>
                        )}
                    </div>

                    {/* View Profile Link */}
                    <Link
                        to={`/provider/${provider.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
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
