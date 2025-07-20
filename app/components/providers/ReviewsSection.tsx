import { useState } from 'react';
import { HiFlag, HiReply, HiStar, HiThumbUp, HiUser } from 'react-icons/hi';

interface Review {
    id: number;
    patientName: string;
    rating: number;
    comment: string;
    date: string;
    verified: boolean;
    helpful: number;
    condition: string;
}

interface ReviewsSectionProps {
    providerId: number;
    averageRating: number;
    totalReviews: number;
}

export function ReviewsSection({ providerId, averageRating, totalReviews }: ReviewsSectionProps) {
    const [showAllReviews, setShowAllReviews] = useState(false);

    // Mock reviews data - in real app, this would come from API
    const mockReviews: Review[] = [
        {
            id: 1,
            patientName: "Sarah M.",
            rating: 5,
            comment: "Dr. Johnson completely transformed my recovery process. The Graston technique was incredibly effective for my shoulder injury. Professional, knowledgeable, and truly caring. Highly recommend!",
            date: "2 weeks ago",
            verified: true,
            helpful: 8,
            condition: "Shoulder Injury"
        },
        {
            id: 2,
            patientName: "Mike R.",
            rating: 5,
            comment: "Outstanding treatment for my chronic lower back pain. The combination of Graston technique with other therapies has me pain-free for the first time in years. Thank you!",
            date: "1 month ago",
            verified: true,
            helpful: 12,
            condition: "Chronic Back Pain"
        },
        {
            id: 3,
            patientName: "Jennifer L.",
            rating: 4,
            comment: "Very professional and knowledgeable. The facility is modern and clean. Treatment was effective, though it took a few sessions to see significant improvement.",
            date: "2 months ago",
            verified: true,
            helpful: 5,
            condition: "Tennis Elbow"
        }
    ];

    const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
        const sizeClasses = {
            sm: 'w-3 h-3',
            md: 'w-4 h-4',
            lg: 'w-5 h-5'
        };

        return (
            <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                    <HiStar
                        key={star}
                        className={`${sizeClasses[size]} ${star <= rating ? 'text-[var(--graston-yellow)]' : 'text-gray-300'
                            }`}
                    />
                ))}
            </div>
        );
    };

    const ratingDistribution = [
        { stars: 5, count: 18, percentage: 75 },
        { stars: 4, count: 4, percentage: 17 },
        { stars: 3, count: 2, percentage: 8 },
        { stars: 2, count: 0, percentage: 0 },
        { stars: 1, count: 0, percentage: 0 }
    ];

    return (
        <div className="mb-6">
            <h4 className="text-lg font-semibold text-[var(--graston-dark)] mb-4 flex items-center">
                <HiStar className="w-5 h-5 mr-2 text-[var(--graston-yellow)]" />
                Patient Reviews
            </h4>

            {/* Rating Summary */}
            <div className="bg-gradient-to-r from-[var(--graston-light-blue)]/20 to-white p-6 rounded-xl border border-[var(--graston-teal)]/20 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Overall Rating */}
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[var(--graston-dark)] mb-2">
                            {averageRating.toFixed(1)}
                        </div>
                        {renderStars(averageRating, 'lg')}
                        <div className="text-[var(--graston-gray)] mt-2">
                            Based on {totalReviews} verified reviews
                        </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-2">
                        {ratingDistribution.map(({ stars, count, percentage }) => (
                            <div key={stars} className="flex items-center text-sm">
                                <span className="w-8 text-[var(--graston-gray)]">{stars}★</span>
                                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-[var(--graston-yellow)] h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="w-8 text-[var(--graston-gray)] text-right">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
                {mockReviews.slice(0, showAllReviews ? mockReviews.length : 2).map(review => (
                    <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[var(--graston-teal)]/30 transition-colors">
                        {/* Review Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-[var(--graston-light-blue)] rounded-full flex items-center justify-center mr-3">
                                    <HiUser className="w-5 h-5 text-[var(--graston-blue)]" />
                                </div>
                                <div>
                                    <div className="flex items-center">
                                        <span className="font-semibold text-[var(--graston-dark)]">{review.patientName}</span>
                                        {review.verified && (
                                            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center mt-1">
                                        {renderStars(review.rating, 'sm')}
                                        <span className="ml-2 text-sm text-[var(--graston-gray)]">{review.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs text-[var(--graston-gray)] bg-[var(--graston-light-blue)]/30 px-2 py-1 rounded">
                                {review.condition}
                            </div>
                        </div>

                        {/* Review Content */}
                        <p className="text-[var(--graston-dark)] leading-relaxed mb-4">
                            {review.comment}
                        </p>

                        {/* Review Actions */}
                        <div className="flex items-center justify-between text-sm">
                            <button className="flex items-center text-[var(--graston-gray)] hover:text-[var(--graston-blue)] transition-colors">
                                <HiThumbUp className="w-4 h-4 mr-1" />
                                Helpful ({review.helpful})
                            </button>
                            <div className="flex space-x-4">
                                <button className="flex items-center text-[var(--graston-gray)] hover:text-[var(--graston-blue)] transition-colors">
                                    <HiReply className="w-4 h-4 mr-1" />
                                    Reply
                                </button>
                                <button className="flex items-center text-[var(--graston-gray)] hover:text-red-500 transition-colors">
                                    <HiFlag className="w-4 h-4 mr-1" />
                                    Report
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More/Less Button */}
            {mockReviews.length > 2 && (
                <div className="text-center mt-4">
                    <button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="px-6 py-2 bg-[var(--graston-teal)] text-white rounded-lg hover:bg-[var(--graston-blue)] transition-colors font-medium"
                    >
                        {showAllReviews ? `Show Less` : `Show All ${totalReviews} Reviews`}
                    </button>
                </div>
            )}

            {/* Review Call-to-Action */}
            <div className="mt-6 p-4 bg-gradient-to-r from-[var(--graston-light-blue)]/20 to-white rounded-xl border border-[var(--graston-teal)]/20 text-center">
                <p className="text-[var(--graston-gray)] mb-3">
                    Have you been treated by this provider? Share your experience to help others.
                </p>
                <button className="px-6 py-2 bg-gradient-to-r from-[var(--graston-coral)] to-[var(--graston-yellow)] text-white rounded-lg hover:shadow-lg transition-all font-medium">
                    Write a Review
                </button>
            </div>
        </div>
    );
}
