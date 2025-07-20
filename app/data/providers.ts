// Provider data service
// This file contains mock data based on real Graston Technique providers
// In production, this would be replaced with API calls to the actual Graston API

export interface Provider {
  id: number;
  name: string;
  credentials: string;
  specialty: string;
  practice: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  email?: string;
  website?: string;
  position: [number, number]; // [latitude, longitude]
  description: string;
  certifications: string[];
  specializations: string[];
  languages: string[];
  patients: string[];
  yearsExperience: number;
  grastonLevel: 'Basic' | 'Advanced' | 'Specialist' | 'Instructor';
  profileImage?: string;
  lastUpdated: string;
}

// Mock data based on real Graston Technique providers from the API
export const mockProviders: Provider[] = [
  {
    id: 1,
    name: "Dr. Kramer",
    credentials: "STM, DC",
    specialty: "Chiropractor",
    practice: "Glencoe Family Chiropractic",
    address: "1234 Main Street",
    city: "Glencoe",
    state: "IL",
    zipCode: "60022",
    country: "United States",
    phone: "(847) 555-0123",
    email: "info@glencoefamilychiropractic.com",
    website: "https://www.glencoefamilychiropractic.com",
    position: [42.1063, -87.7587],
    description: "My ultimate mission as a Doctor is to deliver exceptional health care to patients of all ages, helping them restore their overall health and balance through natural health care. The experience I have in health care to date has allowed me to successfully treat many chronic and debilitating health conditions, becoming more and more specialized in complex Neuro-Musculo-Skeletal issues.",
    certifications: ["Graston Technique", "Soft Tissue Mobilization"],
    specializations: ["Neuro-Musculo-Skeletal", "Chronic Pain", "Sports Injuries"],
    languages: ["English"],
    patients: ["Adults", "Seniors", "Athletes"],
    yearsExperience: 15,
    grastonLevel: "Advanced",
    lastUpdated: "2025-07-20"
  },
  {
    id: 2,
    name: "Nicole Woodruff",
    credentials: "OTD, OTR/L, PCES, GTS",
    specialty: "Occupational Therapist",
    practice: "Intuitive Therapies & Pelvic Health",
    address: "5678 Healthcare Blvd",
    city: "Tampa",
    state: "FL",
    zipCode: "33612",
    country: "United States",
    phone: "(813) 555-0456",
    email: "nicole@intuitivehealth.com",
    website: "https://www.intuitivehealth.com",
    position: [27.9506, -82.4572],
    description: "Nicole Woodruff is a seasoned occupational therapist with over 13 years of experience. She specializes in pelvic health, chronic pain, and complex conditions such as Ehlers-Danlos Syndrome (EDS), POTS, and other forms of dysautonomia. She integrates this evidence-based manual therapy into her treatment of fascial restrictions, pelvic floor dysfunction, and movement impairments.",
    certifications: ["Graston Technique Specialist (GTS)", "Pregnancy and Postpartum Corrective Exercise Specialist (PCES)", "Registered Yoga Teacher (RYT)"],
    specializations: ["Pelvic Health", "Chronic Pain", "Ehlers-Danlos Syndrome", "POTS", "Dysautonomia"],
    languages: ["English"],
    patients: ["Women", "Adults", "Pregnancy", "Postpartum"],
    yearsExperience: 13,
    grastonLevel: "Specialist",
    lastUpdated: "2025-07-20"
  },
  {
    id: 3,
    name: "Dr. Eric Legault",
    credentials: "DC, CSCS",
    specialty: "Chiropractor",
    practice: "Optimal Performance Clinic",
    address: "9012 Performance Way",
    city: "Denver",
    state: "CO",
    zipCode: "80202",
    country: "United States",
    phone: "(303) 555-0789",
    email: "info@optimalperformance.com",
    website: "https://www.optimalperformance.com",
    position: [39.7392, -104.9903],
    description: "Dr. Eric founded Optimal Performance Clinic in 2007 to provide optimal quality care that will get you better, faster and that is non-invasive. Dr. Eric is proficient in spinal & extremity adjustments and utilizes many different modalities including Graston Technique soft tissue mobilization, Deep Tissue Laser Therapy, Shockwave Therapy, Spinal Decompression.",
    certifications: ["Graston Technique", "Certified Strength & Conditioning Specialist (CSCS)", "Deep Tissue Laser Therapy", "Shockwave Therapy"],
    specializations: ["Sports Medicine", "Spinal Decompression", "Injury Recovery", "Performance Enhancement"],
    languages: ["English"],
    patients: ["Athletes", "Adults", "Sports Injuries"],
    yearsExperience: 17,
    grastonLevel: "Advanced",
    lastUpdated: "2025-07-20"
  },
  {
    id: 4,
    name: "Dustin Sucese",
    credentials: "RN, LMT",
    specialty: "Massage Therapist",
    practice: "Vibe Out Massage Therapy",
    address: "3456 Wellness Center Dr",
    city: "Muncie",
    state: "IN",
    zipCode: "47304",
    country: "United States",
    phone: "(765) 555-0234",
    email: "dustin@vibeoutmassage.com",
    website: "https://www.vibeoutmassage.com",
    position: [40.1934, -85.3863],
    description: "Welcome to Vibe Out Massage Therapy, where your time and body are treated with the utmost care. Each session can be tailored to help meet your goals: pain-relief, decrease anxiety, reduce fatigue, improve mobility, encourage circulation, recover from strenuous workouts and more. As a registered nurse for the last fourteen years, I can attest to the power of touch and its ability promote healing.",
    certifications: ["Licensed Massage Therapist", "Registered Nurse", "Graston Technique"],
    specializations: ["Sports Massage", "Recovery Therapy", "Pain Relief", "Circulation Improvement"],
    languages: ["English"],
    patients: ["Athletes", "Adults", "Professional Athletes"],
    yearsExperience: 14,
    grastonLevel: "Basic",
    lastUpdated: "2025-07-20"
  },
  {
    id: 5,
    name: "Michael J. Fiscella",
    credentials: "D.C.",
    specialty: "Chiropractor",
    practice: "Fiscella Chiropractic",
    address: "7890 Chiropractic Ave",
    city: "St. Louis",
    state: "MO",
    zipCode: "63101",
    country: "United States",
    phone: "(314) 353-1477",
    email: "info@fiscellachiro.com",
    website: "https://www.fiscellachiro.com",
    position: [38.6270, -90.1994],
    description: "Board Certified Chiropractic Orthopedist (DIANM) with extensive experience in advanced chiropractic techniques. Certified in Chiropractic Acupuncture, Endo Nasal Technique, and Receptor-tonus (Nimmo) methods. Logan University Adjunctive Post Graduate Faculty member.",
    certifications: ["Board Certified Chiropractic Orthopedist (DIANM)", "Certified Chiropractic Acupuncture", "Endo Nasal Technique", "Receptor-tonus (Nimmo)", "Graston Technique"],
    specializations: ["Orthopedic Chiropractic", "Acupuncture", "Endo Nasal Technique", "Advanced Manual Therapy"],
    languages: ["English"],
    patients: ["Adults", "Seniors", "Complex Cases"],
    yearsExperience: 37,
    grastonLevel: "Instructor",
    lastUpdated: "2025-07-20"
  },
  {
    id: 6,
    name: "Phuong Tran",
    credentials: "LMT, BCTMB, BCSI, CLT",
    specialty: "Massage Therapist",
    practice: "Tran Therapeutic Services",
    address: "2345 Healing Hands Rd",
    city: "Walpole",
    state: "MA",
    zipCode: "02081",
    country: "United States",
    phone: "(508) 555-0567",
    email: "phuong@trantherapy.com",
    website: "https://www.trantherapy.com",
    position: [42.1418, -71.2495],
    description: "Board Certified Massage Therapist (BCTMB) and Structural Integrator (BCSI) with an office in Walpole, Massachusetts. With a careful, intentional approach, I incorporate Graston Technique into my sessions to effectively treat soft tissue restrictions like scar tissue, fascial adhesions and chronic inflammation.",
    certifications: ["Board Certified Therapeutic Massage & Bodywork (BCTMB)", "Board Certified Structural Integrator (BCSI)", "Certified Lymphatic Therapist (CLT)", "Graston Technique"],
    specializations: ["Structural Integration", "Fascial Release", "Scar Tissue Treatment", "Chronic Inflammation"],
    languages: ["English", "Vietnamese"],
    patients: ["Adults", "Chronic Pain", "Post-Surgery"],
    yearsExperience: 12,
    grastonLevel: "Advanced",
    lastUpdated: "2025-07-20"
  },
  {
    id: 7,
    name: "Dr. Derek A. Scholl",
    credentials: "DC, CCSP",
    specialty: "Chiropractor",
    practice: "Young Chiropractic & Rehabilitation",
    address: "4567 Sports Medicine Blvd",
    city: "Lincoln",
    state: "NE",
    zipCode: "68508",
    country: "United States",
    phone: "(402) 555-0890",
    email: "derek@youngchiro.com",
    website: "https://www.youngchiro.com",
    position: [40.8136, -96.7026],
    description: "Board-certified Chiropractic Sports Physician with extensive training in sports medicine and injury prevention. Has traveled with patients competing as athletes in the 2016 Rio Summer Olympics, UWW World Cup, various World Team Trials, and the 2016, 2020, and 2024 Olympic Team Trials as part of the USOC Volunteer Medical Professionals Team.",
    certifications: ["Certified Chiropractic Sports Physician (CCSP)", "Graston Technique", "Sports Medicine"],
    specializations: ["Sports Medicine", "Olympic Athletes", "Injury Prevention", "Performance Enhancement"],
    languages: ["English"],
    patients: ["Athletes", "Olympic Athletes", "Weekend Warriors", "Children", "Adults", "Seniors"],
    yearsExperience: 11,
    grastonLevel: "Specialist",
    lastUpdated: "2025-07-20"
  },
  {
    id: 8,
    name: "Jason E. Bennett",
    credentials: "PT, MSPT, PhD, SCS, ATC",
    specialty: "Physical Therapist",
    practice: "Carroll University DPT Program",
    address: "100 N East Ave",
    city: "Waukesha",
    state: "WI",
    zipCode: "53186",
    country: "United States",
    phone: "(262) 555-0123",
    email: "jbennett@carrollu.edu",
    website: "https://www.carrollu.edu",
    position: [43.0117, -88.2315],
    description: "Dr. Jason E. Bennett is a licensed physical therapist, a board-certified clinical specialist in sports physical therapy, and a certified athletic trainer. Dr. Bennett's research has examined risk factors for exercise-related leg pain in high school and collegiate runners, the relationship between movement performance and occurrence of injury in collegiate athletes.",
    certifications: ["Board Certified Sports Clinical Specialist (SCS)", "Certified Athletic Trainer (ATC)", "Graston Technique", "PhD in Orthopaedic and Sports Science"],
    specializations: ["Sports Physical Therapy", "Movement Analysis", "Injury Prevention", "Research"],
    languages: ["English"],
    patients: ["Athletes", "Runners", "College Athletes", "Adults"],
    yearsExperience: 25,
    grastonLevel: "Instructor",
    lastUpdated: "2025-07-20"
  },
  {
    id: 9,
    name: "Alfredo Rosales Jr.",
    credentials: "LMT",
    specialty: "Massage Therapist",
    practice: "Rosales Therapeutic Massage",
    address: "8901 Recovery Lane",
    city: "Austin",
    state: "TX",
    zipCode: "73301",
    country: "United States",
    phone: "(512) 555-0456",
    email: "alfredo@rosalesmassage.com",
    website: "https://www.rosalesmassage.com",
    position: [30.2672, -97.7431],
    description: "As a licensed massage therapist deeply committed to clinical results and lasting relief, I'm always seeking out tools and techniques that allow me to do more for the body—especially when it comes to stubborn, restricted, or injured tissue. That drive led me to the Graston Technique®, an evidence-based form of Instrument Assisted Soft Tissue Mobilization (IASTM).",
    certifications: ["Licensed Massage Therapist", "Medical Massage", "Cupping Therapy", "Orthopedic Massage", "Graston Technique"],
    specializations: ["Medical Massage", "Orthopedic Massage", "Cupping Therapy", "Manual Therapy"],
    languages: ["English", "Spanish"],
    patients: ["Adults", "Injury Recovery", "Chronic Pain"],
    yearsExperience: 5,
    grastonLevel: "Basic",
    lastUpdated: "2025-07-20"
  },
  {
    id: 10,
    name: "Dr. Mike Bohrnsen",
    credentials: "DC, DACBSP",
    specialty: "Chiropractor",
    practice: "Sports Medicine Clinic",
    address: "1357 Beach Volleyball Way",
    city: "Manhattan Beach",
    state: "CA",
    zipCode: "90266",
    country: "United States",
    phone: "(310) 555-0789",
    email: "mike@sportsmedclinic.com",
    website: "https://www.sportsmedclinic.com",
    position: [33.8846, -118.4085],
    description: "Dr. Mike has been part of the Sports Medicine Team with USA Beach Volleyball National Team since 2013 and University of California Berkeley since 2018 as a Performance Therapist with the National Championship Swim & Dive Teams. He is fellowship trained and has completed his Diplomate in Sports Chiropractic.",
    certifications: ["Diplomate in Sports Chiropractic (DACBSP)", "Active Release Technique (ART)", "Graston Technique", "Selective Functional Movement Assessment (SFMA)", "Titleist Performance Institute (TPI)", "Fascial Stretch Therapy"],
    specializations: ["Sports Medicine", "Olympic Training", "Beach Volleyball", "Swimming", "Performance Therapy"],
    languages: ["English"],
    patients: ["Olympic Athletes", "Professional Athletes", "College Athletes", "Adults"],
    yearsExperience: 15,
    grastonLevel: "Specialist",
    lastUpdated: "2025-07-20"
  }
];

// Simulated API functions
export async function getProviders(filters?: {
  specialty?: string;
  location?: string;
  radius?: number;
  grastonLevel?: string;
}): Promise<Provider[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredProviders = [...mockProviders];
  
  if (filters?.specialty) {
    filteredProviders = filteredProviders.filter(provider => 
      provider.specialty.toLowerCase().includes(filters.specialty!.toLowerCase())
    );
  }
  
  if (filters?.location) {
    // Simple city/state search
    filteredProviders = filteredProviders.filter(provider => 
      provider.city.toLowerCase().includes(filters.location!.toLowerCase()) ||
      provider.state.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }
  
  if (filters?.grastonLevel) {
    filteredProviders = filteredProviders.filter(provider => 
      provider.grastonLevel === filters.grastonLevel
    );
  }
  
  return filteredProviders;
}

export async function getProviderById(id: number): Promise<Provider | null> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockProviders.find(provider => provider.id === id) || null;
}

export async function searchProviders(query: string): Promise<Provider[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const searchTerms = query.toLowerCase().split(' ');
  
  return mockProviders.filter(provider => 
    searchTerms.some(term => 
      provider.name.toLowerCase().includes(term) ||
      provider.specialty.toLowerCase().includes(term) ||
      provider.city.toLowerCase().includes(term) ||
      provider.state.toLowerCase().includes(term) ||
      provider.practice.toLowerCase().includes(term) ||
      provider.specializations.some(spec => spec.toLowerCase().includes(term))
    )
  );
}

// Helper functions for filters
export function getUniqueSpecialties(): string[] {
  return [...new Set(mockProviders.map(p => p.specialty))].sort();
}

export function getUniqueLanguages(): string[] {
  return [...new Set(mockProviders.flatMap(p => p.languages))].sort();
}

export function getUniquePatientTypes(): string[] {
  return [...new Set(mockProviders.flatMap(p => p.patients))].sort();
}

export function getUniqueStates(): string[] {
  return [...new Set(mockProviders.map(p => p.state))].sort();
}

export function getUniqueCities(): string[] {
  return [...new Set(mockProviders.map(p => p.city))].sort();
}

export function getUniqueGrastonLevels(): string[] {
  return [...new Set(mockProviders.map(p => p.grastonLevel))].sort();
}
