import { useState } from 'react';
import { HiEye, HiGlobeAlt, HiLocationMarker, HiPhone, HiStar } from 'react-icons/hi';
import { FaCalendarAlt, FaClock, FaVideo } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router';
import type { Provider } from '../../data/providersEnhanced';
import { TierBadge } from './TierBadge';

export interface EnhancedProviderCardProps {
    provider: Provider;
}

export function EnhancedProviderCard({ provider }: EnhancedProviderCardProps) {
    const [showAllSpecializations, setShowAllSpecializations] = useState(false);

    const truncateBio = (bio: string, maxLength: number) => {
        if (bio.length <= maxLength) return bio;
        return bio.substring(0, maxLength).trim() + '...';
    };

    const displayBio = provider.tier === 'basic'
        ? truncateBio(provider.bio, 150)
        : truncateBio(provider.bio, 250);

    const getAvailabilityStatus = () => {
        if (!provider.availability) return null;
        const now = new Date();
        const day = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentTime = currentHours * 60 + currentMinutes;

        const todayHours = provider.availability[day as keyof typeof provider.availability];
        if (!todayHours) return 'Closed Today';

        const [openHours, openMinutes] = todayHours.open.split(':').map(Number);
        const [closeHours, closeMinutes] = todayHours.close.split(':').map(Number);
        const openTime = openHours * 60 + openMinutes;
        const closeTime = closeHours * 60 + closeMinutes;

        if (currentTime >= openTime && currentTime <= closeTime) {
            return 'Open Now';
        }
        return 'Closed Now';
    };

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
                <div className="space-y-4">
                    {/* Provider Info */}
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold text-[var(--graston-dark)]">
                                    {provider.name}
                                </h3>
                                {provider.isVerified && (
                                    <MdVerified
                                        className="text-[var(--graston-blue)] text-xl"
                                        title="Verified Provider"
                                    />
                                )}
                            </div>
                            {provider.credentials && (
                                <p className="text-[var(--graston-slate)] text-sm mt-1">{provider.credentials}</p>
                            )}
                            {provider.rating && (
                                <div className="flex items-center mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <HiStar
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(provider.rating || 0)
                                                ? 'text-[var(--graston-yellow)]'
                                                : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                    <span className="ml-2 text-sm text-[var(--graston-slate)]">
                                        {provider.rating.toFixed(1)} ({provider.totalReviews} reviews)
                                    </span>
                                </div>
                            )}
                        </div>
                        <TierBadge tier={provider.tier} size="sm" />
                    </div>

                    {/* Location */}
                    <div className="flex items-start text-[var(--graston-slate)]">
                        <HiLocationMarker className="mt-1 mr-2 text-[var(--graston-coral)] flex-shrink-0" />
                        <span className="text-sm">
                            {[provider.address, provider.city, provider.state, provider.zipCode].filter(Boolean).join(', ')}
                        </span>
                    </div>

                    {/* Availability Status */}
                    {provider.availability && (
                        <div className="flex items-center text-[var(--graston-slate)]">
                            <FaClock className="mr-2 text-[var(--graston-teal)]" />
                            <span className={`text-sm font-medium ${
                                getAvailabilityStatus() === 'Open Now'
                                    ? 'text-[var(--graston-teal)]'
                                    : 'text-[var(--graston-coral)]'
                            }`}>
                                {getAvailabilityStatus()}
                            </span>
                        </div>
                    )}

                    {/* Bio */}
                    <p className="text-sm text-[var(--graston-dark)]">{displayBio}</p>

                    {/* Specializations */}
                    {provider.specializations && provider.specializations.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {(showAllSpecializations
                                ? provider.specializations
                                : provider.specializations.slice(0, 3)
                            ).map((spec, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-[var(--graston-light-blue)] text-[var(--graston-blue)] text-xs rounded-full"
                                >
                                    {spec}
                                </span>
                            ))}
                            {!showAllSpecializations && provider.specializations.length > 3 && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowAllSpecializations(true);
                                    }}
                                    className="px-2 py-1 text-xs text-[var(--graston-blue)] hover:text-[var(--graston-teal)]"
                                >
                                    +{provider.specializations.length - 3} more
                                </button>
                            )}
                        </div>
                    )}

                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-2">
                        <Link
                            to={`/provider/${provider.id}`}
                            className="flex items-center px-3 py-1 bg-[var(--graston-light-blue)] text-[var(--graston-blue)] rounded-full text-sm hover:bg-[var(--graston-teal)] hover:text-white transition-all"
                        >
                            <HiEye className="mr-1" /> View Profile
                        </Link>
                        {provider.bookingUrl && (
                            <a
                                href={provider.bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-3 py-1 bg-[var(--graston-teal)] text-white rounded-full text-sm hover:bg-[var(--graston-blue)] transition-colors"
                            >
                                <FaCalendarAlt className="mr-1" /> Book Now
                            </a>
                        )}
                        {provider.videoIntroUrl && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Handle video intro
                                }}
                                className="flex items-center px-3 py-1 bg-[var(--graston-light-blue)] text-[var(--graston-blue)] rounded-full text-sm hover:bg-[var(--graston-teal)] hover:text-white transition-all"
                            >
                                <FaVideo className="mr-1" /> Watch Intro
                            </button>
                        )}
                    </div>

                    {/* Contact Actions */}
                    <div className="flex items-center justify-between">
                        <div className="flex space-x-3">
                            {provider.phone && (
                                <a
                                    href={`tel:${provider.phone}`}
                                    className="flex items-center text-[var(--graston-blue)] hover:text-[var(--graston-teal)] transition-colors text-sm"
                                >
                                    <HiPhone className="w-4 h-4 mr-1" />
                                    <span>Call</span>
                                </a>
                            )}
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
                        </div>
                    </div>

                    {/* Analytics (Preferred+ only) */}
                    {provider.tier !== 'basic' && provider.analytics && (
                        <div className="flex items-center text-[var(--graston-slate)] text-sm">
                            <HiEye className="w-4 h-4 mr-1" />
                            <span>{provider.analytics.views30d} views in last 30 days</span>
                        </div>
                    )}

                    {/* Premium Features Preview */}
                    {provider.tier === 'premier' && (
                        <div className="mt-4 pt-4 border-t border-[var(--graston-light-blue)]">
                            <div className="flex items-center justify-between text-xs text-[var(--graston-slate)]">
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
        </div>
    );
}
