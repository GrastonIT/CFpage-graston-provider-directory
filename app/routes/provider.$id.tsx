import {
    HiAcademicCap,
    HiCalendar,
    HiChatAlt,
    HiEye,
    HiGlobeAlt,
    HiHeart,
    HiLocationMarker,
    HiMail,
    HiPhone,
    HiStar,
    HiThumbUp
} from 'react-icons/hi';
import type { LoaderFunctionArgs } from 'react-router';
import { Link, useLoaderData } from 'react-router';
import { DirectoryMap } from '../components/providers/DirectoryMap';
import { TierBadge } from '../components/providers/TierBadge';
import type { Provider } from '../data/providersEnhanced';
import { getProviderById } from '../data/providersEnhanced';

interface LoaderData {
    provider: Provider;
}

export async function loader({ params }: LoaderFunctionArgs): Promise<LoaderData> {
    const providerId = parseInt(params.id!);
    const provider = await getProviderById(providerId);

    if (!provider) {
        throw new Response('Provider not found', { status: 404 });
    }

    return { provider };
}

export default function ProviderProfile() {
    const { provider } = useLoaderData<LoaderData>();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='6'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
                    <div className="flex items-center mb-4">
                        <Link
                            to="/providers-enhanced"
                            className="text-blue-200 hover:text-white mr-2 flex items-center transition-colors duration-200"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Directory
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Profile Image */}
                        <div className="relative">
                            <div className="w-32 h-32 bg-gradient-to-br from-white to-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-600 shadow-2xl border-4 border-white">
                                {provider.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="absolute -bottom-2 -right-2">
                                <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Provider Info */}
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">{provider.name}</h1>
                                    <p className="text-xl text-blue-100 mb-2">{provider.credentials}</p>
                                    <p className="text-lg text-blue-200">{provider.specialty}</p>
                                </div>
                                <TierBadge tier={provider.tier} size="lg" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center">
                                    <HiStar className="w-5 h-5 mr-2 text-yellow-400" />
                                    <span>Graston {provider.grastonLevel}</span>
                                </div>
                                <div className="flex items-center">
                                    <HiAcademicCap className="w-5 h-5 mr-2 text-blue-200" />
                                    <span>{provider.yearsExperience} years experience</span>
                                </div>
                                {provider.tier !== 'basic' && (
                                    <div className="flex items-center">
                                        <HiEye className="w-5 h-5 mr-2 text-blue-200" />
                                        <span>{provider.analytics.views30d} views (30d)</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Practice Info */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                                    <HiLocationMarker className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">Practice Information</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                                    <h3 className="font-medium text-gray-900 mb-2">{provider.practice}</h3>
                                    <div className="flex items-start mt-2 text-gray-600">
                                        <HiLocationMarker className="w-5 h-5 mr-2 mt-0.5 text-blue-500" />
                                        <div>
                                            <p className="font-medium">{provider.address}</p>
                                            <p>{provider.city}, {provider.state} {provider.zipCode}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bio & About */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                    <HiAcademicCap className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">About {provider.name.split(' ')[0]}</h2>
                            </div>
                            <div className="prose prose-gray max-w-none">
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                                    <p className="text-gray-700 leading-relaxed">{provider.bio}</p>
                                </div>
                            </div>
                        </div>

                        {/* Premier: About Clinic */}
                        {provider.tier === 'premier' && provider.aboutClinic && (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-8 0H3m2 0h6M9 7h6m-6 4h6m-6 4h6" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">About Our Clinic</h2>
                                </div>
                                <div className="prose prose-gray max-w-none">
                                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4">
                                        <p className="text-gray-700 leading-relaxed">{provider.aboutClinic}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Specializations & Conditions */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                                    <HiStar className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">Specializations & Conditions Treated</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Specializations</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {provider.specializations.map((spec, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Conditions Treated</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {provider.conditionsTreated.map((condition, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-200"
                                            >
                                                {condition}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Education & Certifications */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Education & Certifications</h2>

                            <div className="space-y-6">
                                {/* Education */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Education</h3>
                                    <div className="space-y-3">
                                        {provider.education.map((edu, index) => (
                                            <div key={index} className="flex items-start">
                                                <HiAcademicCap className="w-5 h-5 mr-3 mt-0.5 text-blue-500" />
                                                <div>
                                                    <p className="font-medium text-gray-900">{edu.degree}</p>
                                                    <p className="text-sm text-gray-600">{edu.institution} • {edu.year}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Certifications */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Certifications</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {provider.certifications.map((cert, index) => (
                                            <div key={index} className="flex items-center">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                                <span className="text-sm text-gray-700">{cert}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Board Certifications */}
                                {provider.boardCertifications.length > 0 && (
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-3">Board Certifications</h3>
                                        <div className="space-y-2">
                                            {provider.boardCertifications.map((cert, index) => (
                                                <div key={index} className="flex items-center">
                                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                                    <span className="text-sm text-gray-700 font-medium">{cert}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Premier: Gallery */}
                        {provider.tier === 'premier' && provider.gallery && provider.gallery.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Clinic Gallery</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {provider.gallery.map((image, index) => (
                                        <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-gray-500">
                                                📸 Image {index + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Premier: Video Introduction */}
                        {provider.tier === 'premier' && provider.introVideo && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Video Introduction</h2>
                                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                                    <div className="text-center text-gray-500">
                                        <div className="text-4xl mb-2">🎥</div>
                                        <p>Video Player</p>
                                        <p className="text-sm">({provider.introVideo})</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Contact Card */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>

                            <div className="space-y-4">
                                {/* Phone */}
                                {provider.phone && (
                                    <a
                                        href={`tel:${provider.phone}`}
                                        className="flex items-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                                    >
                                        <HiPhone className="w-5 h-5 mr-3" />
                                        <div>
                                            <p className="font-medium">Call</p>
                                            <p className="text-sm">{provider.phone}</p>
                                        </div>
                                    </a>
                                )}

                                {/* Email */}
                                {provider.email && (
                                    <a
                                        href={`mailto:${provider.email}`}
                                        className="flex items-center p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <HiMail className="w-5 h-5 mr-3" />
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <p className="text-sm">{provider.email}</p>
                                        </div>
                                    </a>
                                )}

                                {/* Website (Preferred+ only) */}
                                {provider.tier !== 'basic' && provider.website && (
                                    <a
                                        href={provider.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                                    >
                                        <HiGlobeAlt className="w-5 h-5 mr-3" />
                                        <div>
                                            <p className="font-medium">Website</p>
                                            <p className="text-sm">Visit our site</p>
                                        </div>
                                    </a>
                                )}

                                {/* Booking (Premier only) */}
                                {provider.tier === 'premier' && provider.bookingUrl && (
                                    <a
                                        href={provider.bookingUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors text-center font-medium"
                                    >
                                        <HiCalendar className="w-5 h-5 inline mr-2" />
                                        Book Appointment
                                    </a>
                                )}

                                {/* Contact Form (Premier only) */}
                                {provider.tier === 'premier' && (
                                    <button className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition-colors font-medium">
                                        <HiChatAlt className="w-5 h-5 inline mr-2" />
                                        Send Message
                                    </button>
                                )}
                            </div>

                            {/* Languages & Patient Types */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {provider.languages.map((lang, index) => (
                                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                                    {lang}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Patient Types</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {provider.patientTypes.map((type, index) => (
                                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Location</h3>
                            </div>
                            <div style={{ height: '300px' }}>
                                <DirectoryMap
                                    id={`provider-${provider.id}-map`}
                                    center={provider.position}
                                    markers={[provider]}
                                />
                            </div>
                        </div>

                        {/* Analytics (Preferred+ only) */}
                        {provider.tier !== 'basic' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Provider Insights</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <HiEye className="w-5 h-5 mr-2 text-blue-500" />
                                            <span className="text-sm text-gray-600">Profile Views (30d)</span>
                                        </div>
                                        <span className="font-medium">{provider.analytics.views30d}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <HiHeart className="w-5 h-5 mr-2 text-red-500" />
                                            <span className="text-sm text-gray-600">Leads (30d)</span>
                                        </div>
                                        <span className="font-medium">{provider.analytics.leads30d}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <HiThumbUp className="w-5 h-5 mr-2 text-green-500" />
                                            <span className="text-sm text-gray-600">Clicks (30d)</span>
                                        </div>
                                        <span className="font-medium">{provider.analytics.clicks30d}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
