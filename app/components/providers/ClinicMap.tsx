import { useState } from 'react';
import { HiCalendar, HiClock, HiGlobeAlt, HiLocationMarker, HiMap, HiPhone } from 'react-icons/hi';
import type { Provider } from '../../data/providersEnhanced';

interface ClinicMapProps {
    provider: Provider;
}

export function ClinicMap({ provider }: ClinicMapProps) {
    const [mapError, setMapError] = useState(false);

    // Mock clinic hours - in real app, this would be part of provider data
    const clinicHours = {
        Monday: "8:00 AM - 6:00 PM",
        Tuesday: "8:00 AM - 6:00 PM",
        Wednesday: "8:00 AM - 6:00 PM",
        Thursday: "8:00 AM - 6:00 PM",
        Friday: "8:00 AM - 5:00 PM",
        Saturday: "9:00 AM - 2:00 PM",
        Sunday: "Closed"
    };

    const fullAddress = `${provider.address}, ${provider.city}, ${provider.state} ${provider.zipCode}`;
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(fullAddress)}`;

    // Fallback to static map image
    const staticMapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l-clinic+${provider.tier === 'premier' ? 'fc7961' : '057a63'}(${provider.position[1]},${provider.position[0]})/${provider.position[1]},${provider.position[0]},14/400x250@2x?access_token=pk.eyJ1IjoiZ3Jhc3RvbiIsImEiOiJjbGV4YW1wbGUifQ.example`;

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Map */}
            <div className="h-64 bg-gradient-to-br from-[var(--graston-light-blue)] to-[var(--graston-teal)] relative">
                {!mapError ? (
                    <div
                        className="w-full h-full bg-cover bg-center relative cursor-pointer group"
                        style={{
                            backgroundImage: `url(${staticMapUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`, '_blank')}
                        onError={() => setMapError(true)}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                                <span className="text-[var(--graston-dark)] font-medium flex items-center">
                                    <HiMap className="w-4 h-4 mr-2" />
                                    Open in Google Maps
                                </span>
                            </div>
                        </div>

                        {/* Pin Marker */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                            <div className={`w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center ${provider.tier === 'premier' ? 'bg-[var(--graston-coral)]' : 'bg-[var(--graston-teal)]'
                                }`}>
                                <HiLocationMarker className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                ) : (
                    // Fallback when map fails to load
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                            <HiLocationMarker className="w-12 h-12 text-white mx-auto mb-2" />
                            <p className="text-white font-medium">Map unavailable</p>
                            <a
                                href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white underline hover:no-underline"
                            >
                                View on Google Maps
                            </a>
                        </div>
                    </div>
                )}
            </div>

            {/* Clinic Information */}
            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Address & Contact */}
                    <div>
                        <h5 className="font-semibold text-[var(--graston-dark)] mb-3 flex items-center">
                            <HiLocationMarker className="w-4 h-4 mr-2 text-[var(--graston-coral)]" />
                            Location & Contact
                        </h5>
                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="font-medium text-[var(--graston-dark)]">{provider.practice}</p>
                                <p className="text-[var(--graston-gray)]">{fullAddress}</p>
                            </div>

                            {provider.phone && (
                                <div className="flex items-center">
                                    <HiPhone className="w-4 h-4 mr-2 text-[var(--graston-blue)]" />
                                    <a
                                        href={`tel:${provider.phone}`}
                                        className="text-[var(--graston-blue)] hover:text-[var(--graston-teal)] transition-colors"
                                    >
                                        {provider.phone}
                                    </a>
                                </div>
                            )}

                            {provider.website && (
                                <div className="flex items-center">
                                    <HiGlobeAlt className="w-4 h-4 mr-2 text-[var(--graston-blue)]" />
                                    <a
                                        href={provider.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--graston-blue)] hover:text-[var(--graston-teal)] transition-colors"
                                    >
                                        Visit Website
                                    </a>
                                </div>
                            )}

                            <div className="pt-2">
                                <a
                                    href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-2 bg-[var(--graston-blue)] text-white rounded-lg hover:bg-[var(--graston-teal)] transition-colors text-sm font-medium"
                                >
                                    <HiMap className="w-4 h-4 mr-2" />
                                    Get Directions
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Hours */}
                    <div>
                        <h5 className="font-semibold text-[var(--graston-dark)] mb-3 flex items-center">
                            <HiClock className="w-4 h-4 mr-2 text-[var(--graston-coral)]" />
                            Clinic Hours
                        </h5>
                        <div className="space-y-2 text-sm">
                            {Object.entries(clinicHours).map(([day, hours]) => {
                                const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day;
                                return (
                                    <div key={day} className={`flex justify-between ${isToday ? 'font-semibold text-[var(--graston-blue)]' : 'text-[var(--graston-gray)]'}`}>
                                        <span>{day}</span>
                                        <span>{hours}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Appointment Button */}
                        {provider.tier === 'premier' && provider.bookingUrl && (
                            <div className="mt-4">
                                <a
                                    href={provider.bookingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[var(--graston-coral)] to-[var(--graston-yellow)] text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium w-full justify-center"
                                >
                                    <HiCalendar className="w-4 h-4 mr-2" />
                                    Schedule Appointment
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Clinic Info for Premier */}
                {provider.tier === 'premier' && provider.aboutClinic && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h5 className="font-semibold text-[var(--graston-dark)] mb-3">About Our Clinic</h5>
                        <p className="text-[var(--graston-gray)] text-sm leading-relaxed">
                            {provider.aboutClinic}
                        </p>
                    </div>
                )}

                {/* Services & Specializations */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <h5 className="font-semibold text-[var(--graston-dark)] mb-3">Services Offered</h5>
                    <div className="flex flex-wrap gap-2">
                        {provider.specializations.slice(0, 6).map((service, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-[var(--graston-light-blue)]/50 text-[var(--graston-blue)] text-xs rounded-full border border-[var(--graston-teal)]/30"
                            >
                                {service}
                            </span>
                        ))}
                        {provider.specializations.length > 6 && (
                            <span className="px-3 py-1 bg-gray-100 text-[var(--graston-gray)] text-xs rounded-full">
                                +{provider.specializations.length - 6} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Insurance */}
                {provider.insuranceAccepted.length > 0 && (
                    <div className="mt-4">
                        <h5 className="font-semibold text-[var(--graston-dark)] mb-2 text-sm">Insurance Accepted</h5>
                        <p className="text-[var(--graston-gray)] text-xs">
                            {provider.insuranceAccepted.slice(0, 3).join(', ')}
                            {provider.insuranceAccepted.length > 3 && ` and ${provider.insuranceAccepted.length - 3} more`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
