// Enhanced Provider data service
// Updated data model based on Graston Technique Provider Directory Blueprint
// Supports Basic/Preferred/Premier tier system

export type ProviderTier = 'basic' | 'preferred' | 'premier';
export type ClinicianType = 'PT' | 'DC' | 'LMT' | 'OT' | 'MD' | 'DPT' | 'ATC' | 'Other';
export type GrastonLevel = 'M1' | 'M2' | 'Basic' | 'Advanced' | 'Specialist' | 'Instructor';

interface BusinessHours {
  open: string;  // Format: "HH:mm"
  close: string; // Format: "HH:mm"
}

interface Availability {
  monday?: BusinessHours;
  tuesday?: BusinessHours;
  wednesday?: BusinessHours;
  thursday?: BusinessHours;
  friday?: BusinessHours;
  saturday?: BusinessHours;
  sunday?: BusinessHours;
}

interface Treatment {
  title: string;
  description: string;
  price: number;
  duration: number; // in minutes
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  author: string;
  date: string;
  verified: boolean;
}

interface Gallery {
  before: string;
  after: string;
  description: string;
}

export interface Provider {
  id: number;
  name: string;
  credentials: string;
  
  // Professional Details
  clinicianType: ClinicianType;
  specialty: string;
  practice: string;
  tier: ProviderTier;
  searchPriority: number; // Higher = appears first in results
  isVerified?: boolean;
  rating?: number;
  totalReviews?: number;
  
  // Location & Contact
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  position: [number, number]; // [latitude, longitude]
  phone?: string;
  email?: string;
  website?: string;
  bookingUrl?: string;
  
  // Social Media (Preferred+ only)
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  
  // Profile Content
  bio: string;
  bioMaxLength: number; // 200 basic, 700 preferred, 2500 premier
  yearsExperience: number;
  
  // Professional Details
  grastonLevel: GrastonLevel;
  certifications: string[];
  specializations: string[];
  languages: string[];
  
  // Enhanced Features
  availability?: Availability;
  treatments?: Treatment[];
  gallery?: string[]; // Image URLs
  beforeAfterGallery?: Gallery[]; // Before/After treatment images
  videoIntroUrl?: string;
  reviews?: Review[];

  // Premier Features
  profileImage?: string;
  blogPosts?: any[];
}
