import { useState } from 'react';
import { HiChatAlt, HiCheckCircle, HiMail, HiPaperAirplane, HiPhone, HiUser, HiX } from 'react-icons/hi';
import type { Provider } from '../../data/providersEnhanced';

interface ContactProviderModalProps {
    provider: Provider;
    onClose: () => void;
}

interface ContactForm {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    appointmentType: string;
    preferredTime: string;
    insuranceProvider: string;
}

export function ContactProviderModal({ provider, onClose }: ContactProviderModalProps) {
    const [form, setForm] = useState<ContactForm>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        appointmentType: '',
        preferredTime: '',
        insuranceProvider: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Auto close after 3 seconds
        setTimeout(() => {
            onClose();
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center animate-scale-in">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiCheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--graston-dark)] mb-2">Message Sent!</h3>
                    <p className="text-[var(--graston-gray)] mb-4">
                        Your message has been sent to {provider.name}. They will respond within 24 hours.
                    </p>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-[var(--graston-teal)] text-white rounded-lg hover:bg-[var(--graston-blue)] transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-[var(--graston-teal)] to-[var(--graston-blue)] text-white p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Contact {provider.name}</h2>
                            <p className="opacity-90">{provider.practice}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <HiX className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                <HiUser className="inline w-4 h-4 mr-1" />
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-teal)] focus:border-transparent outline-none transition-all"
                                placeholder="Your full name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                <HiMail className="inline w-4 h-4 mr-1" />
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-teal)] focus:border-transparent outline-none transition-all"
                                placeholder="your.email@example.com"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                <HiPhone className="inline w-4 h-4 mr-1" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-teal)] focus:border-transparent outline-none transition-all"
                                placeholder="(555) 123-4567"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                Appointment Type
                            </label>
                            <select
                                name="appointmentType"
                                value={form.appointmentType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-teal)] focus:border-transparent outline-none transition-all"
                            >
                                <option value="">Select type</option>
                                <option value="consultation">Initial Consultation</option>
                                <option value="followup">Follow-up Treatment</option>
                                <option value="evaluation">Injury Evaluation</option>
                                <option value="maintenance">Maintenance Care</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                Preferred Time
                            </label>
                            <select
                                name="preferredTime"
                                value={form.preferredTime}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-teal)] focus:border-transparent outline-none transition-all"
                            >
                                <option value="">Select preference</option>
                                <option value="morning">Morning (8AM - 12PM)</option>
                                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                                <option value="evening">Evening (5PM - 8PM)</option>
                                <option value="flexible">Flexible</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                                Insurance Provider
                            </label>
                            <input
                                type="text"
                                name="insuranceProvider"
                                value={form.insuranceProvider}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-teal)] focus:border-transparent outline-none transition-all"
                                placeholder="e.g., Blue Cross, Aetna, Self-pay"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                            Subject *
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-teal)] focus:border-transparent outline-none transition-all"
                            placeholder="Brief description of your inquiry"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[var(--graston-dark)] mb-2">
                            <HiChatAlt className="inline w-4 h-4 mr-1" />
                            Message *
                        </label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--graston-teal)] focus:border-transparent outline-none transition-all resize-none"
                            placeholder="Please describe your condition, symptoms, or reason for seeking treatment. Include any relevant medical history or specific questions you have."
                        />
                    </div>

                    {/* Provider Quick Info */}
                    <div className="bg-[var(--graston-light-blue)]/30 rounded-xl p-4 border border-[var(--graston-teal)]/20">
                        <h3 className="font-semibold text-[var(--graston-dark)] mb-2">About {provider.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[var(--graston-gray)]">
                            <div>
                                <strong>Specialty:</strong> {provider.specialty}
                            </div>
                            <div>
                                <strong>Experience:</strong> {provider.yearsExperience} years
                            </div>
                            <div>
                                <strong>Graston Level:</strong> {provider.grastonLevel}
                            </div>
                            <div>
                                <strong>Location:</strong> {provider.city}, {provider.state}
                            </div>
                        </div>
                        {provider.specializations.length > 0 && (
                            <div className="mt-3">
                                <strong className="text-sm text-[var(--graston-dark)]">Specializations:</strong>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {provider.specializations.slice(0, 4).map((spec, index) => (
                                        <span key={index} className="px-2 py-1 bg-[var(--graston-teal)]/20 text-xs rounded-full">
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 border border-gray-300 text-[var(--graston-gray)] rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-[var(--graston-teal)] to-[var(--graston-blue)] text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Sending Message...
                                </>
                            ) : (
                                <>
                                    <HiPaperAirplane className="w-4 h-4 mr-2" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </div>

                    <p className="text-xs text-[var(--graston-gray)] text-center">
                        Your message will be sent directly to {provider.name}. Response time is typically within 24 hours during business days.
                    </p>
                </form>
            </div>
        </div>
    );
}
