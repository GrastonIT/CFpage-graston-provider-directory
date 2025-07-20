import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
    return [
        { title: "About | Graston Provider Directory" },
        { name: "description", content: "Learn about the Graston Technique and our provider directory" },
    ];
};

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                        About the Graston Technique
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        Discover the revolutionary instrument-assisted soft tissue mobilization technique
                        that's helping patients worldwide achieve better movement and pain relief.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* What is Graston */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Graston Technique?</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            The Graston Technique is an innovative, patented form of instrument-assisted soft tissue mobilization
                            that enables clinicians to effectively break down scar tissue and fascial restrictions.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            This technique uses specially designed stainless steel instruments to detect and treat areas
                            exhibiting soft tissue fibrosis or chronic inflammation.
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Treatment Benefits</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Decreased overall time of treatment
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Faster rehabilitation and recovery
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Reduced need for anti-inflammatory medication
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Resolves chronic conditions thought to be permanent
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Provider Directory Info */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
                    <h2 className="text-3xl font-bold mb-6">Find Certified Providers</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Our directory features three tiers of certified Graston Technique providers,
                        each offering different levels of service and expertise to meet your needs.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                            <h3 className="text-lg font-semibold mb-2">Basic Providers</h3>
                            <p className="text-blue-100 text-sm">Certified practitioners with essential contact information</p>
                        </div>
                        <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                            <h3 className="text-lg font-semibold mb-2">Preferred Providers</h3>
                            <p className="text-blue-100 text-sm">Enhanced profiles with detailed bios and specializations</p>
                        </div>
                        <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                            <h3 className="text-lg font-semibold mb-2">Premier Providers</h3>
                            <p className="text-blue-100 text-sm">Complete profiles with galleries, videos, and premium features</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/providers-enhanced"
                            className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                        >
                            Browse Directory
                        </a>
                        <a
                            href="/home"
                            className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
