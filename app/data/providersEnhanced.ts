// Enhanced Provider data service
// Updated data model based on Graston Technique Provider Directory Blueprint
// Supports Basic/Preferred/Premier tier system

export type ProviderTier = 'basic' | 'preferred' | 'premier';
export type ClinicianType = 'PT' | 'DC' | 'LMT' | 'OT' | 'MD' | 'DPT' | 'ATC' | 'Other';
export type GrastonLevel = 'M1' | 'M2' | 'Basic' | 'Advanced' | 'Specialist' | 'Instructor';

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
  patientTypes: string[]; // pediatric, geriatric, adult, athlete
  conditionsTreated: string[];
  insuranceAccepted: string[];
  
  // Education & Training
  education: Array<{
    degree: string;
    institution: string;
    year: number;
  }>;
  
  boardCertifications: string[];
  
  trainings: Array<{
    name: string;
    date: string;
    ceuValue: number;
    certificateUrl?: string;
  }>;
  
  totalCEUs: number;
  associations: string[];
  awards: Array<{
    title: string;
    year: number;
    organization: string;
  }>;
  
  // Premier Features
  aboutClinic?: string; // WYSIWYG content (Premier only)
  gallery?: string[]; // Image URLs (Premier only)
  introVideo?: string; // Video embed URL (Premier only)
  
  // Analytics
  analytics: {
    views30d: number;
    leads30d: number;
    clicks30d: number;
    lastSyncDate: string;
  };
  
  // Metadata
  profileImage?: string;
  profileStatus: 'draft' | 'pending' | 'published' | 'suspended';
  lastUpdated: string;
  linkedUserId?: number;
  overrideExpirationDate?: string;
}

// Import CSV providers
import { csvProviders, getCsvProviderById, getUniqueCsvLanguages, getUniqueCsvPatientTypes, getUniqueCsvSpecialties, getUniqueCsvStates } from './providersCsvData';

// Enhanced mock data showcasing the new tier system
export const mockProviders: Provider[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    credentials: "PT, DPT, OCS, GTS",
    clinicianType: "PT",
    specialty: "Sports Physical Therapy",
    practice: "Elite Performance Therapy",
    tier: "premier",
    searchPriority: 100,
    
    // Location & Contact
    address: "123 Main Street, Suite 200",
    city: "Denver",
    state: "CO",
    zipCode: "80202",
    country: "United States",
    position: [39.7392, -104.9903],
    phone: "(303) 555-0123",
    email: "sarah@eliteperformancetherapy.com",
    website: "https://www.eliteperformancetherapy.com",
    bookingUrl: "https://www.eliteperformancetherapy.com/book",
    
    // Social Media (Premier tier)
    socialMedia: {
      facebook: "https://facebook.com/eliteperformancetherapy",
      instagram: "https://instagram.com/eliteperformancetherapy",
      linkedin: "https://linkedin.com/in/sarahjohnsonpt"
    },
    
    // Profile Content
    bio: "Dr. Sarah Johnson is a board-certified orthopedic clinical specialist with over 12 years of experience treating elite athletes and weekend warriors alike. As a Graston Technique Specialist, she combines evidence-based manual therapy with cutting-edge movement analysis to help patients achieve optimal performance and injury prevention. Her passion for sports medicine stems from her own background as a collegiate soccer player and her understanding of the demands placed on the athletic body.",
    bioMaxLength: 2500,
    yearsExperience: 12,
    
    // Professional Details
    grastonLevel: "Specialist",
    certifications: [
      "Graston Technique Specialist",
      "Orthopedic Clinical Specialist (OCS)",
      "Dry Needling Certification",
      "Blood Flow Restriction Training"
    ],
    specializations: [
      "Sports Injuries",
      "Post-Surgical Rehabilitation",
      "Movement Analysis",
      "Injury Prevention"
    ],
    languages: ["English", "Spanish"],
    patientTypes: ["Athletes", "Adults", "Post-Surgical"],
    conditionsTreated: [
      "ACL Reconstruction",
      "Rotator Cuff Injuries",
      "IT Band Syndrome",
      "Plantar Fasciitis",
      "Tennis Elbow",
      "Chronic Pain"
    ],
    insuranceAccepted: [
      "Blue Cross Blue Shield",
      "Aetna",
      "Cigna",
      "United Healthcare",
      "Self-Pay"
    ],
    
    // Education & Training
    education: [
      {
        degree: "Doctor of Physical Therapy (DPT)",
        institution: "University of Colorado",
        year: 2012
      },
      {
        degree: "Bachelor of Science in Exercise Science",
        institution: "Colorado State University",
        year: 2009
      }
    ],
    
    boardCertifications: [
      "Orthopedic Clinical Specialist (OCS) - ABPTS"
    ],
    
    trainings: [
      {
        name: "Graston Technique M1 & M2",
        date: "2015-03-15",
        ceuValue: 16,
        certificateUrl: "/certificates/graston-m1-m2.pdf"
      },
      {
        name: "Dry Needling Level 1",
        date: "2018-06-10",
        ceuValue: 20
      },
      {
        name: "Blood Flow Restriction Training",
        date: "2020-09-22",
        ceuValue: 8
      }
    ],
    
    totalCEUs: 120,
    associations: [
      "American Physical Therapy Association",
      "Sports Physical Therapy Section",
      "Colorado Physical Therapy Association"
    ],
    awards: [
      {
        title: "Outstanding Clinical Excellence Award",
        year: 2020,
        organization: "Colorado Physical Therapy Association"
      }
    ],
    
    // Premier Features
    aboutClinic: "Elite Performance Therapy is a state-of-the-art facility dedicated to helping athletes and active individuals achieve their highest potential. Our 3,000 square foot clinic features the latest in rehabilitation technology, including AlterG anti-gravity treadmill, Normatec compression therapy, and comprehensive movement analysis systems.",
    gallery: [
      "/images/clinic-exterior.jpg",
      "/images/treatment-room-1.jpg",
      "/images/alterg-treadmill.jpg",
      "/images/team-photo.jpg"
    ],
    introVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    
    // Analytics
    analytics: {
      views30d: 245,
      leads30d: 18,
      clicks30d: 67,
      lastSyncDate: "2025-07-20T10:30:00Z"
    },
    
    // Metadata
    profileImage: "/images/dr-sarah-johnson.jpg",
    profileStatus: "published",
    lastUpdated: "2025-07-20T08:00:00Z",
    linkedUserId: 101
  },
  
  {
    id: 2,
    name: "Dr. Michael Chen",
    credentials: "DC, CCSP",
    clinicianType: "DC",
    specialty: "Chiropractic Sports Medicine",
    practice: "Peak Performance Chiropractic",
    tier: "preferred",
    searchPriority: 75,
    
    // Location & Contact
    address: "456 Oak Avenue",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    country: "United States",
    position: [30.2672, -97.7431],
    phone: "(512) 555-0456",
    email: "drmchen@peakperformancechiro.com",
    website: "https://www.peakperformancechiro.com",
    
    // Social Media (Preferred tier)
    socialMedia: {
      facebook: "https://facebook.com/peakperformancechiro",
      linkedin: "https://linkedin.com/in/drmichaelchen"
    },
    
    // Profile Content
    bio: "Dr. Michael Chen is a certified chiropractic sports physician with a passion for helping athletes recover from injuries and optimize their performance. With advanced training in Graston Technique and sports medicine, he provides comprehensive care for both professional and recreational athletes.",
    bioMaxLength: 700,
    yearsExperience: 8,
    
    // Professional Details  
    grastonLevel: "Advanced",
    certifications: [
      "Graston Technique Advanced",
      "Certified Chiropractic Sports Physician",
      "Active Release Technique"
    ],
    specializations: [
      "Sports Medicine",
      "Soft Tissue Injuries",
      "Performance Optimization"
    ],
    languages: ["English", "Mandarin"],
    patientTypes: ["Athletes", "Adults"],
    conditionsTreated: [
      "Back Pain",
      "Neck Pain", 
      "Sports Injuries",
      "Muscle Strains"
    ],
    insuranceAccepted: [
      "Most Major Insurance",
      "Self-Pay"
    ],
    
    // Education & Training
    education: [
      {
        degree: "Doctor of Chiropractic",
        institution: "Parker University",
        year: 2017
      }
    ],
    
    boardCertifications: [
      "Certified Chiropractic Sports Physician (CCSP)"
    ],
    
    trainings: [
      {
        name: "Graston Technique M1 & M2",
        date: "2018-01-20",
        ceuValue: 16
      },
      {
        name: "Active Release Technique",
        date: "2019-05-15",
        ceuValue: 12
      }
    ],
    
    totalCEUs: 65,
    associations: [
      "American Chiropractic Association",
      "Texas Chiropractic Association"
    ],
    awards: [],
    
    // Analytics
    analytics: {
      views30d: 156,
      leads30d: 12,
      clicks30d: 34,
      lastSyncDate: "2025-07-20T09:15:00Z"
    },
    
    // Metadata
    profileImage: "/images/dr-michael-chen.jpg",
    profileStatus: "published",
    lastUpdated: "2025-07-19T14:30:00Z",
    linkedUserId: 102
  },
  
  {
    id: 3,
    name: "Lisa Rodriguez",
    credentials: "LMT, GTS",
    clinicianType: "LMT",
    specialty: "Therapeutic Massage",
    practice: "Healing Touch Massage Therapy",
    tier: "basic",
    searchPriority: 25,
    
    // Location & Contact
    address: "789 Pine Street",
    city: "Portland",
    state: "OR",
    zipCode: "97201",
    country: "United States",
    position: [45.5152, -122.6784],
    phone: "(503) 555-0789",
    
    // Profile Content
    bio: "Licensed massage therapist specializing in therapeutic techniques including Graston Technique for soft tissue mobilization.",
    bioMaxLength: 200,
    yearsExperience: 5,
    
    // Professional Details
    grastonLevel: "Basic",
    certifications: [
      "Graston Technique Basic",
      "Licensed Massage Therapist"
    ],
    specializations: [
      "Therapeutic Massage",
      "Soft Tissue Mobilization"
    ],
    languages: ["English"],
    patientTypes: ["Adults"],
    conditionsTreated: [
      "Muscle Tension",
      "Chronic Pain"
    ],
    insuranceAccepted: ["Self-Pay"],
    
    // Education & Training
    education: [
      {
        degree: "Massage Therapy Certificate",
        institution: "Oregon School of Massage",
        year: 2020
      }
    ],
    
    boardCertifications: [],
    
    trainings: [
      {
        name: "Graston Technique M1",
        date: "2021-03-10",
        ceuValue: 8
      }
    ],
    
    totalCEUs: 32,
    associations: [
      "Oregon Board of Massage Therapists"
    ],
    awards: [],
    
    // Analytics
    analytics: {
      views30d: 67,
      leads30d: 5,
      clicks30d: 12,
      lastSyncDate: "2025-07-20T07:45:00Z"
    },
    
    // Metadata
    profileImage: "/images/lisa-rodriguez.jpg",
    profileStatus: "published",
    lastUpdated: "2025-07-18T16:20:00Z",
    linkedUserId: 103
  }
];

// Helper functions for filtering and search
export function getUniqueConditions(): string[] {
  const allConditions = new Set<string>();
  
  // Add CSV conditions
  csvProviders.forEach(provider => {
    provider.conditionsTreated.forEach(condition => allConditions.add(condition));
  });
  
  // Add mock conditions
  mockProviders.forEach(provider => {
    provider.conditionsTreated.forEach(condition => allConditions.add(condition));
  });
  
  return Array.from(allConditions).sort();
}

export function getProvidersByTier(tier: ProviderTier): Provider[] {
  // Combine CSV and mock providers
  const allProviders = [...csvProviders, ...mockProviders];
  return allProviders.filter(p => p.tier === tier);
}

export async function searchProviders(query: string = ''): Promise<Provider[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Combine CSV providers with mock providers for comprehensive data
  const allProviders = [...csvProviders, ...mockProviders];
  
  if (!query) return allProviders.sort((a, b) => b.searchPriority - a.searchPriority);
  
  const lowerQuery = query.toLowerCase();
  return allProviders.filter(provider => 
    provider.name.toLowerCase().includes(lowerQuery) ||
    provider.specialty.toLowerCase().includes(lowerQuery) ||
    provider.practice.toLowerCase().includes(lowerQuery) ||
    provider.city.toLowerCase().includes(lowerQuery) ||
    provider.state.toLowerCase().includes(lowerQuery) ||
    provider.bio.toLowerCase().includes(lowerQuery) ||
    provider.specializations.some(spec => spec.toLowerCase().includes(lowerQuery)) ||
    provider.conditionsTreated.some(condition => condition.toLowerCase().includes(lowerQuery))
  ).sort((a, b) => b.searchPriority - a.searchPriority);
}

// Legacy support for existing components
export async function getProviders(): Promise<Provider[]> {
  // Combine CSV providers with mock providers
  const allProviders = [...csvProviders, ...mockProviders];
  return allProviders.sort((a, b) => b.searchPriority - a.searchPriority);
}

export async function getProviderById(id: number): Promise<Provider | null> {
  // Check CSV providers first, then mock providers
  const csvProvider = await getCsvProviderById(id);
  if (csvProvider) return csvProvider;
  
  return mockProviders.find(p => p.id === id) || null;
}

// Enhanced utility functions that combine both data sources
export function getUniqueSpecialties(): string[] {
  const csvSpecialties = getUniqueCsvSpecialties();
  const mockSpecialties = Array.from(new Set(mockProviders.map(p => p.specialty)));
  
  const allSpecialties = new Set([...csvSpecialties, ...mockSpecialties]);
  return Array.from(allSpecialties).sort();
}

export function getUniqueStates(): string[] {
  const csvStates = getUniqueCsvStates();
  const mockStates = Array.from(new Set(mockProviders.map(p => p.state)));
  
  const allStates = new Set([...csvStates, ...mockStates]);
  return Array.from(allStates).sort();
}

export function getUniqueLanguages(): string[] {
  const csvLanguages = getUniqueCsvLanguages();
  const mockLanguages = new Set<string>();
  mockProviders.forEach(provider => {
    provider.languages.forEach(lang => mockLanguages.add(lang));
  });
  
  const allLanguages = new Set([...csvLanguages, ...Array.from(mockLanguages)]);
  return Array.from(allLanguages).sort();
}

export function getUniquePatientTypes(): string[] {
  const csvPatientTypes = getUniqueCsvPatientTypes();
  const mockPatientTypes = new Set<string>();
  mockProviders.forEach(provider => {
    provider.patientTypes.forEach(type => mockPatientTypes.add(type));
  });
  
  const allPatientTypes = new Set([...csvPatientTypes, ...Array.from(mockPatientTypes)]);
  return Array.from(allPatientTypes).sort();
}

export function getUniqueSpecializations(): string[] {
  const allSpecializations = new Set<string>();
  
  // Add CSV specializations
  csvProviders.forEach(provider => {
    provider.specializations.forEach(spec => allSpecializations.add(spec));
  });
  
  // Add mock specializations
  mockProviders.forEach(provider => {
    provider.specializations.forEach(spec => allSpecializations.add(spec));
  });
  
  return Array.from(allSpecializations).sort();
}

export function getUniqueGrastonLevels(): string[] {
  const allLevels = new Set<string>();
  
  // Add CSV levels
  csvProviders.forEach(provider => {
    allLevels.add(provider.grastonLevel);
  });
  
  // Add mock levels
  mockProviders.forEach(provider => {
    allLevels.add(provider.grastonLevel);
  });
  
  return Array.from(allLevels).sort();
}
