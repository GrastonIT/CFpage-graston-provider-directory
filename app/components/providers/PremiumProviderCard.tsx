import { useState } from 'react';
import {
    HiAcademicCap,
    HiBadgeCheck,
    HiCalendar,
    HiCamera,
    HiExternalLink,
    HiEye,
    HiGlobeAlt,
    HiHeart,
    HiLocationMarker,
    HiMail,
    HiPhone,
    HiSparkles,
    HiStar,
    HiTrendingUp, HiUsers
} from 'react-icons/hi';
import { Link } from 'react-router';
import type { Provider } from '../../data/providersEnhanced';
import { ClinicMap } from './ClinicMap';
import { ContactProviderModal } from './ContactProviderModal';
import { ProfileEditModal } from './ProfileEditModal';
import { ReviewsSection } from './ReviewsSection';
import { TierBadge } from './TierBadge';

interface PremiumProviderCardProps {
    provider: Provider;
    userLocation?: [number, number] | null;
    isListView?: boolean;
    isOwner?: boolean;
}

export function PremiumProviderCard({ provider, userLocation, isListView = false, isOwner = false }: PremiumProviderCardProps) {
    const [showContactModal, setShowContactModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        if (!userLocation) return 0;
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c * 0.621371;
    };

    const distance = userLocation ? calculateDistance(
        userLocation[0], userLocation[1],
        provider.position[0], provider.position[1]
    ) : null;

    const truncateBio = (bio: string, maxLength: number) => {
        if (bio.length <= maxLength) return bio;
        return bio.substring(0, maxLength).trim() + '...';
    };

    const displayBio = isListView
        ? truncateBio(provider.bio, 300)
        : provider.tier === 'basic'
            ? truncateBio(provider.bio, 150)
            : truncateBio(provider.bio, 250);

    // Enhanced analytics for premier providers
    const enhancedAnalytics = provider.tier === 'premier' ? {
        profileViews: provider.analytics.views30d + Math.floor(Math.random() * 200),
        searchAppearances: Math.floor(provider.analytics.views30d * 2.5),
        contactClicks: provider.analytics.clicks30d,
        websiteClicks: Math.floor(provider.analytics.clicks30d * 1.8),
        conversionRate: ((provider.analytics.leads30d / provider.analytics.views30d) * 100).toFixed(1),
        averageRating: 4.8 + (Math.random() * 0.2),
        totalReviews: 15 + Math.floor(Math.random() * 25)
    } : null;

    const cardClasses = `
    ${isListView ? 'flex' : 'block'} 
    bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 
    overflow-hidden border-2 border-transparent
    ${provider.tier === 'premier' ? 'hover:border-[var(--graston-coral)] ring-2 ring-[var(--graston-coral)]/20' :
            provider.tier === 'preferred' ? 'hover:border-[var(--graston-teal)] ring-1 ring-[var(--graston-teal)]/10' :
                'hover:border-[var(--graston-light-blue)]'}
    transform hover:scale-[1.02] hover:-translate-y-1
  `;

    return (
        <>
            <div className={cardClasses}>
                {/* Header Section */}
                <div className={`relative ${isListView ? 'w-80 flex-shrink-0' : 'w-full'}`}>
                    {/* Gradient Background with Profile Image */}
                    <div className={`
            ${isListView ? 'h-full' : 'h-48'} 
            bg-gradient-to-r from-[var(--graston-teal)] to-[var(--graston-blue)] 
            flex items-center justify-center relative overflow-hidden
          `}>
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                        </div>

                        {/* Profile Image or Initials */}
                        {provider.profileImage ? (
                            <div className="relative">
                                <img
                                    src={provider.profileImage}
                                    alt={provider.name}
                                    className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-2xl"
                                />
                                {provider.tier === 'premier' && (
                                    <div className="absolute -top-2 -right-2">
                                        <HiSparkles className="w-8 h-8 text-[var(--graston-yellow)] drop-shadow-lg animate-bounce" />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full border-4 border-white bg-white flex items-center justify-center shadow-2xl">
                                    <span className="text-3xl font-bold text-[var(--graston-blue)]">
                                        {provider.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </span>
                                </div>
                                {provider.tier === 'premier' && (
                                    <div className="absolute -top-2 -right-2">
                                        <HiSparkles className="w-8 h-8 text-[var(--graston-yellow)] drop-shadow-lg animate-bounce" />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tier Badge */}
                        <div className="absolute top-4 right-4">
                            <TierBadge tier={provider.tier} size="sm" />
                        </div>

                        {/* Distance Badge */}
                        {distance && (
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[var(--graston-dark)]">
                                📍 {distance.toFixed(1)} mi
                            </div>
                        )}

                        {/* Like Button */}
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className={`absolute bottom-4 right-4 p-2 rounded-full transition-all ${isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:bg-white'
                                }`}
                        >
                            <HiHeart className={`w-5 h-5 ${isLiked ? 'animate-pulse' : ''}`} />
                        </button>

                        {/* Owner Edit Button */}
                        {isOwner && (
                            <button
                                onClick={() => setShowEditModal(true)}
                                className="absolute bottom-4 left-4 bg-[var(--graston-coral)] text-white p-2 rounded-full hover:bg-[var(--graston-coral)]/80 transition-colors"
                            >
                                <HiSparkles className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className={`${isListView ? 'flex-1' : 'w-full'} p-6`}>
                    {/* Provider Info */}
                    <div className="mb-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-[var(--graston-dark)] mb-2 flex items-center">
                                    {provider.name}
                                    {provider.tier === 'premier' && (
                                        <HiBadgeCheck className="w-6 h-6 text-[var(--graston-coral)] ml-2" />
                                    )}
                                </h3>
                                <p className="text-[var(--graston-blue)] font-semibold text-lg mb-1">{provider.credentials}</p>
                                <p className="text-[var(--graston-gray)] text-sm mb-1">{provider.specialty}</p>
                                <p className="text-[var(--graston-dark)] font-medium text-lg">{provider.practice}</p>
                            </div>

                            {/* Analytics for Owners */}
                            {isOwner && enhancedAnalytics && (
                                <div className="bg-gradient-to-r from-[var(--graston-light-blue)] to-white p-4 rounded-xl border border-[var(--graston-teal)]/20">
                                    <h4 className="text-sm font-semibold text-[var(--graston-dark)] mb-2">Your Analytics</h4>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="flex items-center">
                                            <HiEye className="w-3 h-3 mr-1 text-[var(--graston-blue)]" />
                                            <span>{enhancedAnalytics.profileViews}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <HiTrendingUp className="w-3 h-3 mr-1 text-[var(--graston-coral)]" />
                                            <span>{enhancedAnalytics.conversionRate}%</span>
                                        </div>
                                        <div className="flex items-center">
                                            <HiUsers className="w-3 h-3 mr-1 text-[var(--graston-teal)]" />
                                            <span>{enhancedAnalytics.contactClicks}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <HiStar className="w-3 h-3 mr-1 text-[var(--graston-yellow)]" />
                                            <span>{enhancedAnalytics.averageRating}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Public Analytics (for non-owners) */}
                            {!isOwner && provider.tier !== 'basic' && (
                                <div className="text-right">
                                    <div className="flex items-center text-[var(--graston-slate)] text-sm mb-1">
                                        <HiEye className="w-4 h-4 mr-1" />
                                        <span>{provider.analytics.views30d} views</span>
                                    </div>
                                    {enhancedAnalytics && (
                                        <div className="flex items-center text-[var(--graston-yellow)] text-sm">
                                            <HiStar className="w-4 h-4 mr-1" />
                                            <span>{enhancedAnalytics.averageRating} ({enhancedAnalytics.totalReviews})</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Location */}
                        <div className="flex items-center text-[var(--graston-gray)] mb-4">
                            <HiLocationMarker className="w-5 h-5 mr-2 text-[var(--graston-coral)]" />
                            <span>{provider.city}, {provider.state}</span>
                        </div>

                        {/* Bio */}
                        <p className="text-[var(--graston-dark)] leading-relaxed mb-6">
                            {displayBio}
                        </p>

                        {/* Specializations */}
                        <div className="mb-6">
                            <div className="flex flex-wrap gap-2">
                                {provider.specializations.slice(0, isListView ? 6 : 4).map((spec, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-[var(--graston-light-blue)] text-[var(--graston-blue)] text-sm rounded-full border border-[var(--graston-teal)]/30 font-medium"
                                    >
                                        {spec}
                                    </span>
                                ))}
                                {provider.specializations.length > (isListView ? 6 : 4) && (
                                    <span className="px-3 py-1 bg-gray-50 text-[var(--graston-gray)] text-sm rounded-full font-medium">
                                        +{provider.specializations.length - (isListView ? 6 : 4)} more
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Credentials & Experience */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center">
                                <HiStar className="w-5 h-5 mr-2 text-[var(--graston-yellow)]" />
                                <span className="text-[var(--graston-gray)]">
                                    {provider.grastonLevel} Level
                                </span>
                            </div>
                            <div className="flex items-center">
                                <HiAcademicCap className="w-5 h-5 mr-2 text-[var(--graston-blue)]" />
                                <span className="text-[var(--graston-gray)]">
                                    {provider.yearsExperience} years exp.
                                </span>
                            </div>
                        </div>

                        {/* Premium Features */}
                        {provider.tier !== 'basic' && (
                            <div className="border-t border-gray-100 pt-6">
                                {/* Clinic Map for Preferred+ */}
                                {provider.tier !== 'basic' && (
                                    <div className="mb-6">
                                        <h4 className="text-lg font-semibold text-[var(--graston-dark)] mb-3 flex items-center">
                                            <HiLocationMarker className="w-5 h-5 mr-2 text-[var(--graston-coral)]" />
                                            Clinic Location
                                        </h4>
                                        <ClinicMap provider={provider} />
                                    </div>
                                )}

                                {/* Gallery Preview for Premier */}
                                {provider.tier === 'premier' && provider.gallery && provider.gallery.length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="text-lg font-semibold text-[var(--graston-dark)] mb-3 flex items-center">
                                            <HiCamera className="w-5 h-5 mr-2 text-[var(--graston-coral)]" />
                                            Clinic Photos ({provider.gallery.length})
                                        </h4>
                                        <div className="grid grid-cols-3 gap-2">
                                            {provider.gallery.slice(0, 3).map((image, index) => (
                                                <div key={index} className="relative group cursor-pointer" onClick={() => setShowGallery(true)}>
                                                    <img
                                                        src={image}
                                                        alt={`Clinic photo ${index + 1}`}
                                                        className="w-full h-20 object-cover rounded-lg"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all rounded-lg flex items-center justify-center">
                                                        <HiCamera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Reviews Section for Premier */}
                                {provider.tier === 'premier' && enhancedAnalytics && (
                                    <ReviewsSection
                                        providerId={provider.id}
                                        averageRating={enhancedAnalytics.averageRating}
                                        totalReviews={enhancedAnalytics.totalReviews}
                                    />
                                )}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            {/* Phone */}
                            {provider.phone && (
                                <a
                                    href={`tel:${provider.phone}`}
                                    className="flex items-center px-4 py-2 bg-[var(--graston-blue)] text-white rounded-lg hover:bg-[var(--graston-teal)] transition-colors font-medium"
                                >
                                    <HiPhone className="w-4 h-4 mr-2" />
                                    Call
                                </a>
                            )}

                            {/* Website */}
                            {provider.tier !== 'basic' && provider.website && (
                                <a
                                    href={provider.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-4 py-2 bg-white border-2 border-[var(--graston-blue)] text-[var(--graston-blue)] rounded-lg hover:bg-[var(--graston-blue)] hover:text-white transition-colors font-medium"
                                >
                                    <HiGlobeAlt className="w-4 h-4 mr-2" />
                                    Website
                                </a>
                            )}

                            {/* Contact Form for Premier */}
                            {provider.tier === 'premier' && (
                                <button
                                    onClick={() => setShowContactModal(true)}
                                    className="flex items-center px-4 py-2 bg-gradient-to-r from-[var(--graston-coral)] to-[var(--graston-yellow)] text-white rounded-lg hover:shadow-lg transition-all font-medium"
                                >
                                    <HiMail className="w-4 h-4 mr-2" />
                                    Contact
                                </button>
                            )}

                            {/* Booking */}
                            {provider.tier === 'premier' && provider.bookingUrl && (
                                <a
                                    href={provider.bookingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-4 py-2 bg-[var(--graston-teal)] text-white rounded-lg hover:bg-[var(--graston-blue)] transition-colors font-medium shadow-lg"
                                >
                                    <HiCalendar className="w-4 h-4 mr-2" />
                                    Book Now
                                </a>
                            )}

                            {/* View Full Profile */}
                            <Link
                                to={`/provider/${provider.id}`}
                                className="flex items-center px-4 py-2 bg-gray-100 text-[var(--graston-dark)] rounded-lg hover:bg-gray-200 transition-colors font-medium"
                            >
                                View Profile
                                <HiExternalLink className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showContactModal && (
                <ContactProviderModal
                    provider={provider}
                    onClose={() => setShowContactModal(false)}
                />
            )}

            {showEditModal && isOwner && (
                <ProfileEditModal
                    provider={provider}
                    onClose={() => setShowEditModal(false)}
                />
            )}
        </>
    );
}
