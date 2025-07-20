import { Link } from '@remix-run/react';
import { FaCalendarAlt, FaHeart, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { useProviderContext } from '../../contexts/ProviderContext';
import type { Provider } from '../../data/providers.types';

export function MapPopupCard({ provider }: { provider: Provider }) {
    return (
        <div className="w-[300px]">
            <div className="flex items-start gap-3 p-2">
                {/* Provider Image/Avatar */}
                <div className="flex-shrink-0">
                    {provider.profileImage ? (
                        <img
                            src={provider.profileImage}
                            alt={provider.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-[var(--graston-teal)]"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[var(--graston-teal)] to-[var(--graston-blue)] flex items-center justify-center">
                            <span className="text-xl font-bold text-white">
                                {provider.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* Provider Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-1 mb-1">
                        <h3 className="font-bold text-[var(--graston-dark)]">{provider.name}</h3>
                        {provider.isVerified && (
                            <MdVerified className="text-[var(--graston-blue)] text-lg" />
                        )}
                    </div>

                    <p className="text-sm text-[var(--graston-slate)] mb-1">{provider.credentials}</p>

                    {provider.rating && (
                        <div className="flex items-center mb-1">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`w-3 h-3 ${i < Math.floor(provider.rating || 0)
                                                ? 'text-yellow-400'
                                                : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-[var(--graston-slate)] ml-1">
                                ({provider.totalReviews})
                            </span>
                        </div>
                    )}

                    <div className="flex items-center text-xs text-[var(--graston-slate)] mb-2">
                        <FaMapMarkerAlt className="text-[var(--graston-coral)] mr-1" />
                        <span>{provider.city}, {provider.state}</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-gray-100 mt-2 pt-2 px-2 pb-1 flex gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        const context = useProviderContext();
                        context.toggleFavorite(provider.id);
                    }}
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${useProviderContext().isFavorite(provider.id)
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                >
                    <FaHeart />
                </button>
                <Link
                    to={`/provider/${provider.id}`}
                    className="flex-1 text-center px-3 py-1.5 bg-[var(--graston-teal)] text-white text-sm rounded-md hover:bg-[var(--graston-blue)] transition-colors"
                >
                    View Profile
                </Link>
                {provider.bookingUrl && (
                    <a
                        href={provider.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[var(--graston-slate)] text-white text-sm rounded-md hover:bg-[var(--graston-dark)] transition-colors"
                    >
                        <FaCalendarAlt />
                    </a>
                )}
            </div>
        </div>
    );
}
