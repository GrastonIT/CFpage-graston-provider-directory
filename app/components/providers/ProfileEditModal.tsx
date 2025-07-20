import { useState } from 'react';
import { HiCamera, HiPlus, HiSave, HiSparkles, HiTrash, HiX } from 'react-icons/hi';
import type { Provider } from '../../data/providersEnhanced';

interface ProfileEditModalProps {
    provider: Provider;
    onClose: () => void;
}

export function ProfileEditModal({ provider, onClose }: ProfileEditModalProps) {
    const [editedProvider, setEditedProvider] = useState<Provider>({ ...provider });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        onClose();
    };

    const handleInputChange = (field: keyof Provider, value: any) => {
        setEditedProvider(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addSpecialization = () => {
        const newSpec = prompt('Enter new specialization:');
        if (newSpec && newSpec.trim()) {
            setEditedProvider(prev => ({
                ...prev,
                specializations: [...prev.specializations, newSpec.trim()]
            }));
        }
    };

    const removeSpecialization = (index: number) => {
        setEditedProvider(prev => ({
            ...prev,
            specializations: prev.specializations.filter((_, i) => i !== index)
        }));
    };

    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: '👤' },
        { id: 'professional', label: 'Professional', icon: '🎓' },
        { id: 'media', label: 'Photos & Media', icon: '📸' },
        { id: 'premium', label: 'Premium Features', icon: '⭐' }
    ];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[var(--graston-coral)] to-[var(--graston-yellow)] text-white p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <HiSparkles className="w-8 h-8 mr-3" />
                            <div>
                                <h2 className="text-2xl font-bold">Edit Your Profile</h2>
                                <p className="opacity-90">Make your profile shine and attract more patients</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <HiX className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-6 py-4 whitespace-nowrap transition-colors ${activeTab === tab.id
                                    ? 'border-b-2 border-[var(--graston-coral)] text-[var(--graston-coral)] bg-[var(--graston-coral)]/5'
                                    : 'text-[var(--graston-gray)] hover:text-[var(--graston-dark)]'
                                }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="max-h-[60vh] overflow-y-auto">
                    <div className="p-6">
                        {activeTab === 'basic' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={editedProvider.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                            Credentials
                                        </label>
                                        <input
                                            type="text"
                                            value={editedProvider.credentials}
                                            onChange={(e) => handleInputChange('credentials', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                            Practice Name
                                        </label>
                                        <input
                                            type="text"
                                            value={editedProvider.practice}
                                            onChange={(e) => handleInputChange('practice', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                            Specialty
                                        </label>
                                        <input
                                            type="text"
                                            value={editedProvider.specialty}
                                            onChange={(e) => handleInputChange('specialty', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                        Professional Bio
                                    </label>
                                    <textarea
                                        value={editedProvider.bio}
                                        onChange={(e) => handleInputChange('bio', e.target.value)}
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none resize-none"
                                        placeholder="Tell patients about your experience, approach to treatment, and what makes you unique..."
                                    />
                                    <p className="text-sm text-[var(--graston-gray)] mt-1">
                                        {editedProvider.bio.length} / {editedProvider.bioMaxLength} characters
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={editedProvider.phone || ''}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                            Website
                                        </label>
                                        <input
                                            type="url"
                                            value={editedProvider.website || ''}
                                            onChange={(e) => handleInputChange('website', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                            Years Experience
                                        </label>
                                        <input
                                            type="number"
                                            value={editedProvider.yearsExperience}
                                            onChange={(e) => handleInputChange('yearsExperience', parseInt(e.target.value) || 0)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'professional' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                        Specializations
                                    </label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {editedProvider.specializations.map((spec, index) => (
                                            <div key={index} className="flex items-center bg-[var(--graston-light-blue)] px-3 py-1 rounded-full">
                                                <span className="text-sm text-[var(--graston-blue)]">{spec}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeSpecialization(index)}
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                >
                                                    <HiTrash className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addSpecialization}
                                            className="flex items-center px-3 py-1 border-2 border-dashed border-[var(--graston-teal)] text-[var(--graston-teal)] rounded-full hover:bg-[var(--graston-teal)] hover:text-white transition-colors"
                                        >
                                            <HiPlus className="w-3 h-3 mr-1" />
                                            Add
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                            Graston Level
                                        </label>
                                        <select
                                            value={editedProvider.grastonLevel}
                                            onChange={(e) => handleInputChange('grastonLevel', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none"
                                        >
                                            <option value="M1">M1</option>
                                            <option value="M2">M2</option>
                                            <option value="Basic">Basic</option>
                                            <option value="Advanced">Advanced</option>
                                            <option value="Specialist">Specialist</option>
                                            <option value="Instructor">Instructor</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                            Total CEUs
                                        </label>
                                        <input
                                            type="number"
                                            value={editedProvider.totalCEUs}
                                            onChange={(e) => handleInputChange('totalCEUs', parseInt(e.target.value) || 0)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                        Conditions Treated (comma-separated)
                                    </label>
                                    <textarea
                                        value={editedProvider.conditionsTreated.join(', ')}
                                        onChange={(e) => handleInputChange('conditionsTreated', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none resize-none"
                                        placeholder="Sports injuries, chronic pain, post-surgical rehabilitation..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                        Insurance Accepted (comma-separated)
                                    </label>
                                    <textarea
                                        value={editedProvider.insuranceAccepted.join(', ')}
                                        onChange={(e) => handleInputChange('insuranceAccepted', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                                        rows={2}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none resize-none"
                                        placeholder="Blue Cross Blue Shield, Aetna, Medicare..."
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'media' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                        Profile Photo
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        {editedProvider.profileImage ? (
                                            <img
                                                src={editedProvider.profileImage}
                                                alt="Profile"
                                                className="w-20 h-20 rounded-full object-cover border-4 border-[var(--graston-coral)]"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 rounded-full bg-[var(--graston-light-blue)] flex items-center justify-center">
                                                <HiCamera className="w-8 h-8 text-[var(--graston-blue)]" />
                                            </div>
                                        )}
                                        <div>
                                            <input
                                                type="url"
                                                placeholder="Profile photo URL"
                                                value={editedProvider.profileImage || ''}
                                                onChange={(e) => handleInputChange('profileImage', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none"
                                            />
                                            <p className="text-xs text-[var(--graston-gray)] mt-1">
                                                Professional headshot recommended (square format)
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {editedProvider.tier === 'premier' && (
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                            Clinic Gallery (Premier Feature)
                                        </label>
                                        <div className="space-y-3">
                                            {editedProvider.gallery?.map((image, index) => (
                                                <div key={index} className="flex items-center space-x-3">
                                                    <img src={image} alt={`Gallery ${index + 1}`} className="w-16 h-16 rounded-lg object-cover" />
                                                    <input
                                                        type="url"
                                                        value={image}
                                                        onChange={(e) => {
                                                            const newGallery = [...(editedProvider.gallery || [])];
                                                            newGallery[index] = e.target.value;
                                                            handleInputChange('gallery', newGallery);
                                                        }}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newGallery = editedProvider.gallery?.filter((_, i) => i !== index);
                                                            handleInputChange('gallery', newGallery);
                                                        }}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <HiTrash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )) || []}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newImage = prompt('Enter image URL:');
                                                    if (newImage) {
                                                        const newGallery = [...(editedProvider.gallery || []), newImage];
                                                        handleInputChange('gallery', newGallery);
                                                    }
                                                }}
                                                className="flex items-center px-4 py-2 border-2 border-dashed border-[var(--graston-coral)] text-[var(--graston-coral)] rounded-lg hover:bg-[var(--graston-coral)] hover:text-white transition-colors"
                                            >
                                                <HiPlus className="w-4 h-4 mr-2" />
                                                Add Photo
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'premium' && (
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-[var(--graston-coral)]/10 to-[var(--graston-yellow)]/10 p-6 rounded-xl border border-[var(--graston-coral)]/20">
                                    <h3 className="text-xl font-bold text-[var(--graston-dark)] mb-4 flex items-center">
                                        <HiSparkles className="w-6 h-6 mr-2 text-[var(--graston-coral)]" />
                                        Premium Features
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-lg border">
                                            <h4 className="font-semibold text-[var(--graston-dark)] mb-2">Current Tier</h4>
                                            <p className="text-2xl font-bold text-[var(--graston-coral)] capitalize">{editedProvider.tier}</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border">
                                            <h4 className="font-semibold text-[var(--graston-dark)] mb-2">Bio Length</h4>
                                            <p className="text-lg">{editedProvider.bioMaxLength} characters</p>
                                        </div>
                                    </div>
                                </div>

                                {editedProvider.tier === 'premier' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                                About Your Clinic (Premier Feature)
                                            </label>
                                            <textarea
                                                value={editedProvider.aboutClinic || ''}
                                                onChange={(e) => handleInputChange('aboutClinic', e.target.value)}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none resize-none"
                                                placeholder="Detailed information about your clinic, services, equipment, philosophy..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                                Booking URL (Premier Feature)
                                            </label>
                                            <input
                                                type="url"
                                                value={editedProvider.bookingUrl || ''}
                                                onChange={(e) => handleInputChange('bookingUrl', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none"
                                                placeholder="https://yourpractice.com/book-appointment"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                                Introduction Video URL (Premier Feature)
                                            </label>
                                            <input
                                                type="url"
                                                value={editedProvider.introVideo || ''}
                                                onChange={(e) => handleInputChange('introVideo', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-coral)] focus:border-transparent outline-none"
                                                placeholder="YouTube or Vimeo video URL"
                                            />
                                        </div>
                                    </>
                                )}

                                {editedProvider.tier !== 'premier' && (
                                    <div className="text-center py-8">
                                        <HiSparkles className="w-16 h-16 text-[var(--graston-coral)] mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-[var(--graston-dark)] mb-2">Upgrade to Premier</h3>
                                        <p className="text-[var(--graston-gray)] mb-4">
                                            Unlock advanced features like clinic galleries, booking integration, and enhanced analytics.
                                        </p>
                                        <button
                                            type="button"
                                            className="px-6 py-3 bg-gradient-to-r from-[var(--graston-coral)] to-[var(--graston-yellow)] text-white rounded-lg hover:shadow-lg transition-all font-medium"
                                        >
                                            Upgrade Now
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 border border-gray-300 text-[var(--graston-gray)] rounded-lg hover:bg-gray-100 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-gradient-to-r from-[var(--graston-coral)] to-[var(--graston-yellow)] text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 flex items-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <HiSave className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
