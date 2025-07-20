import { useEffect, useState } from 'react';
import { FaEnvelope, FaGlobe, FaHeart, FaMapMarkerAlt, FaPhone, FaStar } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { useProviderContext } from '../../contexts/ProviderContext';
import type { Provider } from '../../data/providers.types';
import { InteractiveMap } from './InteractiveMap';

interface ProviderProfileProps {
    provider: Provider;
}

export function ProviderProfile({ provider }: ProviderProfileProps) {
    const { isFavorite, toggleFavorite, addRecentView } = useProviderContext();
    const [activeTab, setActiveTab] = useState<'about' | 'treatments' | 'reviews'>('about');
    const [showContactForm, setShowContactForm] = useState(false);

    useEffect(() => {
        addRecentView(provider.id);
    }, [provider.id, addRecentView]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="h-48 bg-gradient-to-r from-[var(--graston-teal)] to-[var(--graston-blue)] relative">
                    {provider.profileImage && (
                        <img
                            src={provider.profileImage}
                            alt={provider.name}
                            className="absolute bottom-0 left-8 transform translate-y-1/2 w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
                        />
                    )}
                </div>

                <div className="pt-24 pb-8 px-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-[var(--graston-dark)]">
                                    {provider.name}
                                </h1>
                                {provider.isVerified && (
                                    <MdVerified className="text-[var(--graston-blue)] text-2xl" />
                                )}
                                <button
                                    onClick={() => toggleFavorite(provider.id)}
                                    className={`p-2 rounded-full transition-colors ${isFavorite(provider.id)
                                            ? 'text-red-500 hover:text-red-600'
                                            : 'text-gray-400 hover:text-red-500'
                                        }`}
                                >
                                    <FaHeart className="w-6 h-6" />
                                </button>
                            </div>

                            <p className="text-xl text-[var(--graston-slate)] mb-1">{provider.credentials}</p>
                            <p className="text-lg text-[var(--graston-dark)]">{provider.practice}</p>
                        </div>

                        <div className="text-right">
                            {provider.rating && (
                                <div className="flex items-center justify-end mb-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(provider.rating || 0)
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-[var(--graston-slate)]">
                                        ({provider.totalReviews} reviews)
                                    </span>
                                </div>
                            )}

                            <button
                                onClick={() => setShowContactForm(true)}
                                className="bg-[var(--graston-teal)] text-white px-6 py-2 rounded-full hover:bg-[var(--graston-blue)] transition-colors"
                            >
                                Contact Provider
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-6">
                        <div className="flex gap-6">
                            {['about', 'treatments', 'reviews'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as typeof activeTab)}
                                    className={`py-4 px-2 relative ${activeTab === tab
                                            ? 'text-[var(--graston-teal)]'
                                            : 'text-[var(--graston-slate)] hover:text-[var(--graston-dark)]'
                                        }`}
                                >
                                    <span className="capitalize">{tab}</span>
                                    {activeTab === tab && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--graston-teal)]" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'about' && (
                        <div className="space-y-6">
                            <div className="prose max-w-none">
                                <p>{provider.bio}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">Specializations</h3>
                                <div className="flex flex-wrap gap-2">
                                    {provider.specializations.map((spec, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">Languages</h3>
                                <div className="flex flex-wrap gap-2">
                                    {provider.languages.map((lang, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                                        >
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'treatments' && provider.treatments && (
                        <div className="grid grid-cols-1 gap-4">
                            {provider.treatments.map((treatment, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">{treatment.title}</h3>
                                            <p className="text-[var(--graston-slate)] mb-2">
                                                {treatment.description}
                                            </p>
                                            <p className="text-sm text-[var(--graston-dark)]">
                                                Duration: {treatment.duration} minutes
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xl font-semibold text-[var(--graston-dark)]">
                                                ${treatment.price}
                                            </span>
                                            {provider.bookingUrl && (
                                                <button
                                                    onClick={() => window.open(provider.bookingUrl, '_blank')}
                                                    className="block mt-2 text-sm text-[var(--graston-teal)] hover:text-[var(--graston-blue)]"
                                                >
                                                    Book Now
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'reviews' && provider.reviews && (
                        <div className="space-y-6">
                            {provider.reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{review.author}</span>
                                            {review.verified && (
                                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                                    Verified Patient
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-sm text-[var(--graston-slate)]">
                                            {new Date(review.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[var(--graston-dark)]">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Contact Info */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-[var(--graston-coral)] mt-1" />
                                <div>
                                    <p className="text-[var(--graston-dark)]">{provider.practice}</p>
                                    <p className="text-[var(--graston-slate)] text-sm">
                                        {[provider.address, provider.city, provider.state, provider.zipCode]
                                            .filter(Boolean)
                                            .join(', ')}
                                    </p>
                                </div>
                            </div>

                            {provider.phone && (
                                <a
                                    href={`tel:${provider.phone}`}
                                    className="flex items-center gap-3 text-[var(--graston-slate)] hover:text-[var(--graston-teal)]"
                                >
                                    <FaPhone />
                                    <span>{provider.phone}</span>
                                </a>
                            )}

                            {provider.email && (
                                <a
                                    href={`mailto:${provider.email}`}
                                    className="flex items-center gap-3 text-[var(--graston-slate)] hover:text-[var(--graston-teal)]"
                                >
                                    <FaEnvelope />
                                    <span>{provider.email}</span>
                                </a>
                            )}

                            {provider.website && (
                                <a
                                    href={provider.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-[var(--graston-slate)] hover:text-[var(--graston-teal)]"
                                >
                                    <FaGlobe />
                                    <span>Visit Website</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Map */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="h-64">
                            <InteractiveMap
                                providers={[provider]}
                                selectedProvider={provider}
                                center={provider.position}
                                zoom={14}
                            />
                        </div>
                    </div>

                    {/* Business Hours */}
                    {provider.availability && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-semibold text-lg mb-4">Business Hours</h3>
                            <div className="space-y-2">
                                {Object.entries(provider.availability).map(([day, hours]) => (
                                    <div key={day} className="flex justify-between text-sm">
                                        <span className="capitalize text-[var(--graston-dark)]">{day}</span>
                                        <span className="text-[var(--graston-slate)]">
                                            {hours ? `${hours.open} - ${hours.close}` : 'Closed'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Contact Form Modal */}
            {showContactForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold mb-4">Contact {provider.name}</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Your Name</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Your Email</label>
                                <input
                                    type="email"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowContactForm(false)}
                                    className="px-4 py-2 text-[var(--graston-slate)] hover:text-[var(--graston-dark)]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[var(--graston-teal)] text-white rounded-lg hover:bg-[var(--graston-blue)]"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
