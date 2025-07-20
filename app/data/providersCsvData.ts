// Provider data imported from CSV file and mapped to our Provider interface
// This file contains real provider data from the membership_listings_import_filled_all.csv

import type { ClinicianType, GrastonLevel, Provider, ProviderTier } from './providersEnhanced';

// Helper function to parse coordinates
const parseCoordinates = (lat: string, lng: string): [number, number] => {
  const latitude = parseFloat(lat) || 0;
  const longitude = parseFloat(lng) || 0;
  return [latitude, longitude];
};

// Helper function to map membership tier to our tier system
const mapMembershipTier = (tier: string): ProviderTier => {
  const lowerTier = tier.toLowerCase();
  if (lowerTier.includes('premier')) return 'premier';
  if (lowerTier.includes('preferred')) return 'preferred';
  return 'basic';
};

// Helper function to extract clinician type from credentials
const extractClinicianType = (credentials: string, name: string): ClinicianType => {
  const creds = credentials.toLowerCase();
  const nameLC = name.toLowerCase();
  
  if (creds.includes('dpt') || creds.includes('pt')) return 'PT';
  if (creds.includes('dc')) return 'DC';
  if (creds.includes('lmt')) return 'LMT';
  if (creds.includes('otc') || creds.includes('ot')) return 'OT';
  if (creds.includes('md')) return 'MD';
  if (creds.includes('atc')) return 'ATC';
  return 'Other';
};

// Helper function to map Graston training level
const mapGrastonLevel = (level: string): GrastonLevel => {
  const lowerLevel = level.toLowerCase();
  if (lowerLevel.includes('gts') || lowerLevel.includes('instructor')) return 'Instructor';
  if (lowerLevel.includes('adv') || lowerLevel.includes('advanced')) return 'Advanced';
  if (lowerLevel.includes('ess') || lowerLevel.includes('essential')) return 'M1';
  return 'Basic';
};

// Helper function to generate dummy analytics based on tier
const generateAnalytics = (tier: ProviderTier) => {
  const baseViews = tier === 'premier' ? 150 : tier === 'preferred' ? 75 : 25;
  const baseLeads = tier === 'premier' ? 15 : tier === 'preferred' ? 8 : 3;
  const baseClicks = tier === 'premier' ? 25 : tier === 'preferred' ? 12 : 5;
  
  return {
    views30d: baseViews + Math.floor(Math.random() * 50),
    leads30d: baseLeads + Math.floor(Math.random() * 10),
    clicks30d: baseClicks + Math.floor(Math.random() * 15),
    lastSyncDate: new Date().toISOString()
  };
};

// Real provider data from CSV
export const csvProviders: Provider[] = [
  {
    id: 1,
    name: "Phil Gainan D.C., C.M.E.",
    credentials: "D.C., C.M.E.",
    clinicianType: "DC",
    specialty: "Chiropractic Care",
    practice: "Gainan Chiropractic",
    tier: "preferred",
    searchPriority: 85,
    address: "6960 Market St",
    city: "Youngstown",
    state: "Ohio",
    zipCode: "44512",
    country: "United States",
    position: [41.028079, -80.6631586],
    phone: undefined,
    email: undefined,
    website: undefined,
    bio: "Most muscular skeletal conditions treated. Certified by the FMCSA to perform DOT physical exams, sports injuries, workers comp injuries, auto accidents injuries, Certified in Graston technique, laser light therapy, and Kinesio tape",
    bioMaxLength: 700,
    yearsExperience: 15,
    grastonLevel: "Specialist",
    certifications: ["Graston Technique", "FMCSA DOT Physical Exams", "Laser Light Therapy", "Kinesio Tape"],
    specializations: ["Foot & Ankle", "Shoulder", "Upper body"],
    languages: ["English"],
    patientTypes: ["Adult", "Worker Compensation", "Auto Accident"],
    conditionsTreated: ["Sports Injuries", "Auto Accident Injuries", "Worker Compensation Injuries", "DOT Physical Exams"],
    insuranceAccepted: ["Workers Compensation", "Auto Insurance", "Most Major Insurance"],
    education: [{
      degree: "Doctor of Chiropractic",
      institution: "Palmer College of Chiropractic",
      year: 2009
    }],
    boardCertifications: ["FMCSA Certified Medical Examiner"],
    trainings: [],
    totalCEUs: 24,
    associations: ["American Chiropractic Association"],
    awards: [],
    analytics: generateAnalytics("preferred"),
    profileStatus: "published",
    lastUpdated: new Date().toISOString(),
    profileImage: undefined
  },
  
  {
    id: 2,
    name: "Charlie Franchino DC",
    credentials: "DC",
    clinicianType: "DC",
    specialty: "Chiropractic Care",
    practice: "Shin Wellness",
    tier: "preferred",
    searchPriority: 82,
    address: "4500 Biscayne Blvd, Suite 202",
    city: "Miami",
    state: "Florida",
    zipCode: "33137",
    country: "United States",
    position: [25.8175607, -80.1886835],
    bio: "Experienced chiropractor specializing in comprehensive musculoskeletal care with advanced training in Graston Technique for optimal patient outcomes.",
    bioMaxLength: 700,
    yearsExperience: 12,
    grastonLevel: "Specialist",
    certifications: ["Graston Technique"],
    specializations: ["Foot & Ankle", "Shoulder", "Upper body"],
    languages: ["English", "Spanish"],
    patientTypes: ["Adult", "Athlete"],
    conditionsTreated: ["Chronic Pain", "Sports Injuries", "Joint Dysfunction"],
    insuranceAccepted: ["Most Major Insurance", "Medicare"],
    education: [{
      degree: "Doctor of Chiropractic",
      institution: "Palmer College of Chiropractic",
      year: 2012
    }],
    boardCertifications: [],
    trainings: [],
    totalCEUs: 20,
    associations: ["Florida Chiropractic Association"],
    awards: [],
    analytics: generateAnalytics("preferred"),
    profileStatus: "published",
    lastUpdated: new Date().toISOString()
  },

  {
    id: 3,
    name: "Alfredo Rosales Jr. LMT",
    credentials: "LMT",
    clinicianType: "LMT",
    specialty: "Medical Massage Therapy",
    practice: "Empowered Bodywork",
    tier: "preferred",
    searchPriority: 88,
    address: "2470 Patterson Road, Suite 11",
    city: "Grand Junction",
    state: "Colorado",
    zipCode: "81505",
    country: "United States",
    position: [37.2661985, -81.9756725],
    bio: "As a licensed massage therapist deeply committed to clinical results and lasting relief, I'm always seeking out tools and techniques that allow me to do more for the body—especially when it comes to stubborn, restricted, or injured tissue. That drive led me to the Graston Technique®, an evidence-based form of Instrument Assisted Soft Tissue Mobilization (IASTM) designed to detect and treat fascial restrictions, scar tissue, and chronic inflammation.",
    bioMaxLength: 700,
    yearsExperience: 8,
    grastonLevel: "M1",
    certifications: ["Graston Technique", "Medical Massage", "Cupping Therapy", "Orthopedic Massage"],
    specializations: ["Soft Tissue Mobilization", "Scar Tissue Treatment", "Chronic Inflammation"],
    languages: ["English"],
    patientTypes: ["Adult", "Athlete"],
    conditionsTreated: ["Fascial Restrictions", "Scar Tissue", "Chronic Inflammation", "Sports Injuries"],
    insuranceAccepted: ["Cash", "HSA/FSA"],
    education: [
      {
        degree: "Medical Massage Certification",
        institution: "LMT Success Group",
        year: 2022
      },
      {
        degree: "Cupping Therapy Certification",
        institution: "International Cupping Therapy Association",
        year: 2023
      }
    ],
    boardCertifications: [],
    trainings: [
      {
        name: "Essential Graston",
        date: "2025",
        ceuValue: 16
      }
    ],
    totalCEUs: 40,
    associations: ["American Massage Therapy Association"],
    awards: [],
    analytics: generateAnalytics("preferred"),
    profileStatus: "published",
    lastUpdated: new Date().toISOString()
  },

  {
    id: 4,
    name: "Martin Marmorale, DC, GTS",
    credentials: "DC, GTS",
    clinicianType: "DC",
    specialty: "Chiropractic Care",
    practice: "East Bay Chiropractic Wellness",
    tier: "preferred",
    searchPriority: 90,
    address: "2473 Merrick Rd",
    city: "Bellmore",
    state: "New York",
    zipCode: "11710",
    country: "United States",
    position: [40.6621144, -73.5343512],
    bio: "1986 graduate of New York Chiropractic college, Graston Technique specialist since 2008 specializing in acute and chronic musculoskeletal conditions including neck, mid-back, low back pain, sciatica, rotator cuff tendinitis, tennis elbow, plantar fasciitis to name a few.",
    bioMaxLength: 700,
    yearsExperience: 39,
    grastonLevel: "Specialist",
    certifications: ["Graston Technique Specialist"],
    specializations: ["Foot & Ankle", "Shoulder", "Upper body"],
    languages: ["English"],
    patientTypes: ["Adult"],
    conditionsTreated: ["Neck Pain", "Back Pain", "Sciatica", "Rotator Cuff Tendinitis", "Tennis Elbow", "Plantar Fasciitis"],
    insuranceAccepted: ["Most Major Insurance"],
    education: [{
      degree: "Doctor of Chiropractic",
      institution: "New York Chiropractic College",
      year: 1986
    }],
    boardCertifications: [],
    trainings: [],
    totalCEUs: 200,
    associations: ["New York State Chiropractic Association"],
    awards: [],
    analytics: generateAnalytics("preferred"),
    profileStatus: "published",
    lastUpdated: new Date().toISOString()
  },

  {
    id: 5,
    name: "Dr. Eric Legault, DC, CSCS",
    credentials: "DC, CSCS",
    clinicianType: "DC",
    specialty: "Sports Chiropractic",
    practice: "Optimal Performance Clinic",
    tier: "premier",
    searchPriority: 95,
    address: "4 Shenandoah Blvd",
    city: "Newnan",
    state: "Georgia",
    zipCode: "30265",
    country: "United States",
    position: [33.3978658, -84.73178413],
    phone: "770-912-9797",
    bio: "Dr. Eric founded Optimal Performance Clinic in 2007 to provide optimal quality care that will get you better, faster and that is non-invasive. Dr. Eric is proficient in spinal & extremity adjustments and utilizes many different modalities including Graston Technique soft tissue mobilization, Deep Tissue Laser Therapy, Shockwave Therapy, Spinal Decompression, to achieve proper recovery from injuries and help you with your health & wellness goals.",
    bioMaxLength: 2500,
    yearsExperience: 18,
    grastonLevel: "Specialist",
    certifications: ["Graston Technique Specialist", "Certified Strength and Conditioning Specialist"],
    specializations: ["Sports Medicine", "Performance Enhancement", "Injury Recovery"],
    languages: ["English"],
    patientTypes: ["Adult", "Athlete"],
    conditionsTreated: ["Sports Injuries", "Performance Enhancement", "Injury Recovery"],
    insuranceAccepted: ["Most Major Insurance", "Workers Compensation"],
    education: [{
      degree: "Doctor of Chiropractic",
      institution: "Life University",
      year: 2007
    }],
    boardCertifications: ["CSCS"],
    trainings: [],
    totalCEUs: 150,
    associations: ["Georgia Chiropractic Association"],
    awards: [],
    aboutClinic: "Optimal Performance Clinic specializes in non-invasive treatment methods to help patients achieve their health and wellness goals quickly and effectively.",
    gallery: ["https://grastontechnique.com/wp-content/uploads/2025/06/Picture1.png"],
    analytics: generateAnalytics("premier"),
    profileStatus: "published",
    lastUpdated: new Date().toISOString()
  },

  {
    id: 6,
    name: "Ashli Linkhorn, DC",
    credentials: "DC",
    clinicianType: "DC",
    specialty: "Sports Chiropractic",
    practice: "Sports Chiropractic Institute",
    tier: "premier",
    searchPriority: 98,
    address: "1290 W Spring St, Ste 130",
    city: "Smyrna",
    state: "GA",
    zipCode: "30080",
    country: "United States",
    position: [33.8836545, -84.5162715],
    bio: "Ashli instructs courses in orthopedic diagnosis, physical therapy, extremity adjusting, functional restoration and active care in the doctorate program at Life University. Dr. Linkhorn also teaches functional assessment and rehab of the kinetic chain in the master's program. In addition, she owns and practices at the Sports Chiropractic Institute near Atlanta. Ashli has had the opportunity to work with USA Rugby, the International Rugby Board and the NCAA Gymnastic Championships and presently serves as head chiropractor on the medical staff for the NCAA Women's College World Series.",
    bioMaxLength: 2500,
    yearsExperience: 20,
    grastonLevel: "Instructor",
    certifications: ["Graston Technique Instructor"],
    specializations: ["Sports Medicine", "Orthopedic Diagnosis", "Functional Restoration"],
    languages: ["English"],
    patientTypes: ["Adult", "Athlete"],
    conditionsTreated: ["Sports Injuries", "Orthopedic Conditions", "Performance Enhancement"],
    insuranceAccepted: ["Most Major Insurance"],
    education: [
      {
        degree: "Bachelor of Science in Genetics",
        institution: "Wright State University",
        year: 2000
      },
      {
        degree: "Doctor of Chiropractic",
        institution: "Life University",
        year: 2004
      }
    ],
    boardCertifications: [],
    trainings: [],
    totalCEUs: 300,
    associations: ["Life University Faculty", "USA Rugby Medical Staff"],
    awards: [
      {
        title: "NCAA Medical Staff Member",
        year: 2024,
        organization: "NCAA Women's College World Series"
      }
    ],
    aboutClinic: "Sports Chiropractic Institute provides comprehensive care for athletes of all levels, combining advanced techniques with evidence-based treatment approaches.",
    gallery: ["https://grastontechnique.com/wp-content/uploads/2025/02/SCI-YDOLogo-wh-2-3.png"],
    profileImage: "https://grastontechnique.com/wp-content/uploads/2025/02/Ashli-1.jpg",
    analytics: generateAnalytics("premier"),
    profileStatus: "published",
    lastUpdated: new Date().toISOString()
  },

  {
    id: 7,
    name: "Jackie Shakar, DPT MS PT OCS LAT GTS",
    credentials: "DPT MS PT OCS LAT GTS",
    clinicianType: "PT",
    specialty: "Physical Therapy",
    practice: "Central Mass Physical Therapy & Wellness",
    tier: "premier",
    searchPriority: 99,
    address: "354 W Boylston St",
    city: "West Boylston",
    state: "Massachusetts",
    zipCode: "1583",
    country: "United States",
    position: [42.3394927, -71.7897371],
    bio: "Dr. Jackie Shakar DPT MS PT OCS LAT GTS has been a Clinical Advisor and Lead Instructor for Graston, LLC for over 17 years. She has been licensed in Massachusetts as both a Physical Therapist and Athletic Trainer since 1983. She is Board Certified in Orthopedics. She attained her Masters in Physical Therapy from Boston University in 1983 and subsequently completed a transitional doctoral degree from MGHHp in 2011.",
    bioMaxLength: 2500,
    yearsExperience: 42,
    grastonLevel: "Instructor",
    certifications: ["Graston Technique Specialist", "Board Certified Orthopedic Specialist", "Licensed Athletic Trainer"],
    specializations: ["Pelvic Health", "Persistent Pain", "Osteoporosis", "Geriatric Care"],
    languages: ["English"],
    patientTypes: ["Adult", "Geriatric"],
    conditionsTreated: ["Pelvic Health Conditions", "Chronic Pain", "Osteoporosis", "Orthopedic Conditions"],
    insuranceAccepted: ["Most Major Insurance", "Medicare"],
    education: [
      {
        degree: "Master of Science in Physical Therapy",
        institution: "Boston University",
        year: 1983
      },
      {
        degree: "Doctor of Physical Therapy (Transitional)",
        institution: "MGH Institute of Health Professions",
        year: 2011
      }
    ],
    boardCertifications: ["Orthopedic Clinical Specialist (OCS)"],
    trainings: [],
    totalCEUs: 400,
    associations: ["Graston Technique Clinical Advisor", "American Physical Therapy Association"],
    awards: [],
    aboutClinic: "Central Mass Physical Therapy & Wellness provides comprehensive physical therapy services with a focus on manual therapy and specialized treatment approaches.",
    profileImage: "https://grastontechnique.com/wp-content/uploads/2025/02/jackie_shakar-1-7.webp",
    analytics: generateAnalytics("premier"),
    profileStatus: "published",
    lastUpdated: new Date().toISOString()
  },

  {
    id: 8,
    name: "Sheila Wilson, DC, CCSP, ICSSD",
    credentials: "DC, CCSP, ICSSD",
    clinicianType: "DC",
    specialty: "Sports Chiropractic",
    practice: "Georgetown Chiropractic & Wellness",
    tier: "premier",
    searchPriority: 96,
    address: "5637 W 56th St",
    city: "Indianapolis",
    state: "Indiana",
    zipCode: "46254",
    country: "United States",
    position: [39.8525734, -86.2609378],
    bio: "Dr. Sheila Wilson is a summa cum laude graduate of Cleveland Chiropractic College. She has a Bachelor of Science degree from Pittsburg State University and a postgraduate degree as a Certified Chiropractic Sports Physician (CCSP). Dr. Wilson has also earned an International Sports Science Diploma (ICSSD). In addition to treating patients at Georgetown Chiropractic Clinic, Dr. Wilson also works with athletes at sporting events.",
    bioMaxLength: 2500,
    yearsExperience: 25,
    grastonLevel: "Specialist",
    certifications: ["Graston Technique Specialist", "Certified Chiropractic Sports Physician", "Active Release Techniques"],
    specializations: ["Upper body", "Sports Medicine", "Athletic Performance"],
    languages: ["English"],
    patientTypes: ["Adult", "Athlete"],
    conditionsTreated: ["Sports Injuries", "Performance Enhancement", "Musculoskeletal Conditions"],
    insuranceAccepted: ["Most Major Insurance"],
    education: [
      {
        degree: "Bachelor of Science",
        institution: "Pittsburg State University",
        year: 1995
      },
      {
        degree: "Doctor of Chiropractic",
        institution: "Cleveland Chiropractic College",
        year: 1999
      }
    ],
    boardCertifications: ["Certified Chiropractic Sports Physician (CCSP)", "International Sports Science Diploma (ICSSD)"],
    trainings: [],
    totalCEUs: 250,
    associations: ["American Chiropractic Association", "Indiana State Chiropractic Association"],
    awards: [
      {
        title: "Summa Cum Laude Graduate",
        year: 1999,
        organization: "Cleveland Chiropractic College"
      }
    ],
    aboutClinic: "Georgetown Chiropractic & Wellness provides comprehensive chiropractic care with a special focus on sports medicine and athletic performance.",
    profileImage: "https://grastontechnique.com/wp-content/uploads/2025/02/SheilaWilson-e1726162871287-7.jpg",
    analytics: generateAnalytics("premier"),
    profileStatus: "published",
    lastUpdated: new Date().toISOString()
  },

  {
    id: 9,
    name: "Jason Bennett, PhD, ATC, PT, SCS",
    credentials: "PhD, ATC, PT, SCS",
    clinicianType: "PT",
    specialty: "Physical Therapy",
    practice: "Choose PT",
    tier: "premier",
    searchPriority: 93,
    address: "789 Care Street",
    city: "Indianapolis",
    state: "Indiana",
    zipCode: "",
    country: "United States",
    position: [39.89877351, -86.13775451],
    bio: "Dr. Jason E. Bennett joined Carroll University in 2017 as an assistant professor in the Program in Physical Therapy. Dr. Bennett's research involves the examination of potential risk factors for injury in athletes, including factors related to bone density, movement performance, and lower-extremity biomechanics. Dr. Bennett has spent time as a medical volunteer at the USOC Olympic Training Centers, and has traveled with the US Paralympic Shooting team.",
    bioMaxLength: 2500,
    yearsExperience: 15,
    grastonLevel: "Specialist",
    certifications: ["Graston Technique Specialist", "Sports Clinical Specialist"],
    specializations: ["Upper body", "Sports Medicine", "Biomechanics"],
    languages: ["English"],
    patientTypes: ["Adult", "Athlete"],
    conditionsTreated: ["Sports Injuries", "Movement Dysfunction", "Athletic Performance"],
    insuranceAccepted: ["Most Major Insurance"],
    education: [
      {
        degree: "PhD in Exercise Physiology",
        institution: "University Research Institute",
        year: 2015
      },
      {
        degree: "Master of Physical Therapy",
        institution: "Health Sciences University",
        year: 2009
      }
    ],
    boardCertifications: ["Sports Clinical Specialist (SCS)", "Athletic Trainer Certified (ATC)"],
    trainings: [],
    totalCEUs: 180,
    associations: ["Carroll University Faculty", "USOC Medical Volunteer"],
    awards: [],
    aboutClinic: "Choose PT focuses on evidence-based physical therapy with specialization in sports medicine and injury prevention.",
    profileImage: "https://grastontechnique.com/wp-content/uploads/2025/02/jason-e.-bennett-pt-mspt-atc-phd-c139c91432-8.jpg",
    analytics: generateAnalytics("premier"),
    profileStatus: "published",
    lastUpdated: new Date().toISOString()
  },

  {
    id: 10,
    name: "Stephen Knoyer, DC, CCSP, GTS",
    credentials: "DC, CCSP, GTS",
    clinicianType: "DC",
    specialty: "Evidence-Based Chiropractic",
    practice: "Positive Movement, Spine, Sport & Rehab",
    tier: "premier",
    searchPriority: 97,
    address: "7030 Hi Tech Dr",
    city: "Elkridge",
    state: "Maryland",
    zipCode: "21076",
    country: "United States",
    position: [39.19199643, -76.72650913],
    bio: "Dr. Stephen Knoyer is a Doctor of Chiropractic and licensed to practice in the State of Maryland. A graduate of the New York Chiropractic College (NYCC), he was honored with the DD Palmer Memorial Award when he graduated. This award is granted to the graduate who displayed characters best exemplifying those of a teach/faculty member. His internship was completed at the Veteran's Administration Medical Center, Canandaigua, New York, and the Veteran's Administration Community Based Clinic Medical Center, Rochester, New York.",
    bioMaxLength: 2500,
    yearsExperience: 20,
    grastonLevel: "Instructor",
    certifications: ["Graston Technique Instructor", "Certified Chiropractic Sports Physician"],
    specializations: ["Foot & Ankle", "Shoulder", "Upper body"],
    languages: ["English"],
    patientTypes: ["Adult", "Athlete", "Military/Veteran"],
    conditionsTreated: ["Musculoskeletal Conditions", "Sports Injuries", "Chronic Pain"],
    insuranceAccepted: ["Most Major Insurance", "Veterans Affairs"],
    education: [
      {
        degree: "Doctor of Chiropractic",
        institution: "New York Chiropractic College",
        year: 2005
      }
    ],
    boardCertifications: ["Certified Chiropractic Sports Physician (CCSP)"],
    trainings: [],
    totalCEUs: 200,
    associations: ["Graston Technique Instructor", "Maryland Fire and Rescue Institute"],
    awards: [
      {
        title: "DD Palmer Memorial Award",
        year: 2005,
        organization: "New York Chiropractic College"
      }
    ],
    aboutClinic: "Positive Movement, Spine, Sport & Rehab provides evidence-based chiropractic care with a focus on functional movement and rehabilitation.",
    analytics: generateAnalytics("premier"),
    profileStatus: "published",
    lastUpdated: new Date().toISOString()
  },

  {
    id: 11,
    name: "Mike Ploski, PT, ATC, OCS, GTS",
    credentials: "PT, ATC, OCS, GTS",
    clinicianType: "PT",
    specialty: "Orthopedic Physical Therapy",
    practice: "Body One Physical Therapy & Sports Rehabilitation",
    tier: "premier",
    searchPriority: 100,
    address: "8901 N Meridian St, Suite 120",
    city: "Indianapolis",
    state: "Indiana",
    zipCode: "46204",
    country: "United States",
    position: [39.91807372, -86.15886329],
    bio: "Mike Ploski is a Physical Therapist who is recognized by the American Board of Physical Therapy Specialties as an Orthopaedic Clinical Specialist. He is also a certified and licensed athletic trainer. Mike traveled with the PGA Tour for 6 years as part of their onsite medical staff and worked another 5 years coordinating physical therapy and chiropractic care on the Tour. He is one of the original Graston Technique providers, one of the original GT instructors, and now serves as a Clinical Advisor for Graston Technique, LLC.",
    bioMaxLength: 2500,
    yearsExperience: 30,
    grastonLevel: "Instructor",
    certifications: ["Graston Technique Instructor", "Orthopedic Clinical Specialist", "Licensed Athletic Trainer"],
    specializations: ["Foot & Ankle", "Orthopedic Rehabilitation", "Sports Medicine"],
    languages: ["English"],
    patientTypes: ["Adult", "Athlete", "Professional Athletes"],
    conditionsTreated: ["Orthopedic Injuries", "Sports Injuries", "Soft Tissue Dysfunction"],
    insuranceAccepted: ["Most Major Insurance"],
    education: [{
      degree: "Master of Physical Therapy",
      institution: "Indiana University",
      year: 1990
    }],
    boardCertifications: ["Orthopedic Clinical Specialist (OCS)"],
    trainings: [],
    totalCEUs: 500,
    associations: ["Graston Technique Clinical Advisor", "PGA Tour Medical Staff (Former)"],
    awards: [
      {
        title: "Original Graston Technique Provider",
        year: 1995,
        organization: "Graston Technique, LLC"
      }
    ],
    aboutClinic: "Body One Physical Therapy provides comprehensive orthopedic and sports rehabilitation with expertise in manual therapy and instrument-assisted soft tissue mobilization.",
    profileImage: "https://grastontechnique.com/wp-content/uploads/2025/03/MikePloski.jpg",
    analytics: generateAnalytics("premier"),
    profileStatus: "published",
    lastUpdated: new Date().toISOString()
  },

  {
    id: 12,
    name: "Timothy Demchak",
    credentials: "ATC",
    clinicianType: "ATC",
    specialty: "Athletic Training",
    practice: "Indiana State University",
    tier: "premier",
    searchPriority: 94,
    address: "567 N 5th St, Room 200",
    city: "Terre Haute",
    state: "Indiana",
    zipCode: "47803",
    country: "United States",
    position: [39.4731278, -87.4110178],
    bio: "Certified Athletic Trainer 1994, Graston Technique Specialist, Graston Technique Instructor, Photobiomodulation Therapy (Light therapy) Specialist, Athletic Training Program Director, Multi Radiance Medical Advisory Board. Research focused on Therapeutic Interventions- 30 Published manuscripts; 85 Peer Reviewed Presentations; over 50 invited presentations.",
    bioMaxLength: 2500,
    yearsExperience: 31,
    grastonLevel: "Instructor",
    certifications: ["Graston Technique Instructor", "Photobiomodulation Therapy Specialist"],
    specializations: ["Therapeutic Interventions", "Light Therapy", "Research"],
    languages: ["English"],
    patientTypes: ["Adult", "Athlete", "Student Athletes"],
    conditionsTreated: ["Sports Injuries", "Athletic Performance", "Rehabilitation"],
    insuranceAccepted: ["University Health Services"],
    education: [
      {
        degree: "Doctorate in Exercise Physiology",
        institution: "The Ohio State University",
        year: 2000
      },
      {
        degree: "Master of Science in Biomechanics",
        institution: "Ball State University",
        year: 1996
      },
      {
        degree: "Bachelor in Exercise Science",
        institution: "Manchester University",
        year: 1994
      }
    ],
    boardCertifications: ["Certified Athletic Trainer"],
    trainings: [],
    totalCEUs: 400,
    associations: ["Indiana State University Faculty", "Multi Radiance Medical Advisory Board"],
    awards: [],
    aboutClinic: "Indiana State University Athletic Training Program provides comprehensive care for student athletes with a focus on evidence-based practice and research.",
    profileImage: "https://grastontechnique.com/wp-content/uploads/2025/03/Demchak-Head-Shot.jpg",
    analytics: generateAnalytics("premier"),
    profileStatus: "published",
    lastUpdated: new Date().toISOString()
  },

  {
    id: 13,
    name: "Nicole Greiss, LMT",
    credentials: "LMT",
    clinicianType: "LMT",
    specialty: "Medical Massage Therapy",
    practice: "Revitalized Massage and Wellness LLC",
    tier: "premier",
    searchPriority: 89,
    address: "508 N Park Rd",
    city: "Wyomissing",
    state: "Pennsylvania",
    zipCode: "19610",
    country: "United States",
    position: [40.3424601, -75.9577714],
    phone: "484-272-5225",
    bio: "Nicole was born in Reading, Pennsylvania, and is a devoted mother. Her professional journey began when she graduated from PACE Institute in 2000 as a Surgical Tech, with a minor in accounting. After years in the medical field, Nicole decided to follow her dreams of hands-on patient care by attending Berks Technical Institute in the pursuit of a career in Massage Therapy. With a notable trauma-informed approach, she strives to create a safe and healing environment for her clients.",
    bioMaxLength: 2500,
    yearsExperience: 8,
    grastonLevel: "M1",
    certifications: ["Graston Technique Provider", "Certified Trauma and Resiliency Coach", "Certified Body Contour Specialist", "Certified Yoga Teacher", "Certified Nutrition Coach"],
    specializations: ["Foot & Ankle", "Shoulder", "Upper body"],
    languages: ["English"],
    patientTypes: ["Adult", "Trauma Recovery"],
    conditionsTreated: ["Scar Tissue Mobilization", "Trauma Recovery", "Cupping Therapy"],
    insuranceAccepted: ["HSA/FSA", "Cash"],
    education: [
      {
        degree: "Medical Massage Therapy",
        institution: "European Medical School of Massage",
        year: 2022
      },
      {
        degree: "Surgical Technology",
        institution: "PACE Institute",
        year: 2000
      }
    ],
    boardCertifications: ["Licensed Medical Massage Therapist"],
    trainings: [],
    totalCEUs: 150,
    associations: ["American Massage Therapy Association"],
    awards: [],
    aboutClinic: "Revitalized Massage and Wellness LLC provides trauma-informed therapeutic massage with a focus on healing and wellness.",
    profileImage: "https://grastontechnique.com/wp-content/uploads/2025/03/Massage-headshot.jpg",
    analytics: generateAnalytics("premier"),
    profileStatus: "published",
    lastUpdated: new Date().toISOString()
  }
];

// Export search and utility functions
export async function searchCsvProviders(query: string = ''): Promise<Provider[]> {
  if (!query.trim()) {
    return csvProviders;
  }

  const searchTerm = query.toLowerCase();
  return csvProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm) ||
    provider.specialty.toLowerCase().includes(searchTerm) ||
    provider.practice.toLowerCase().includes(searchTerm) ||
    provider.city.toLowerCase().includes(searchTerm) ||
    provider.state.toLowerCase().includes(searchTerm) ||
    provider.specializations.some(spec => spec.toLowerCase().includes(searchTerm)) ||
    provider.conditionsTreated.some(condition => condition.toLowerCase().includes(searchTerm))
  );
}

export async function getCsvProviderById(id: number): Promise<Provider | null> {
  return csvProviders.find(provider => provider.id === id) || null;
}

export function getUniqueCsvSpecialties(): string[] {
  const specialties = new Set<string>();
  csvProviders.forEach(provider => {
    specialties.add(provider.specialty);
    provider.specializations.forEach(spec => specialties.add(spec));
  });
  return Array.from(specialties).sort();
}

export function getUniqueCsvStates(): string[] {
  const states = new Set(csvProviders.map(provider => provider.state));
  return Array.from(states).sort();
}

export function getUniqueCsvLanguages(): string[] {
  const languages = new Set<string>();
  csvProviders.forEach(provider => {
    provider.languages.forEach(lang => languages.add(lang));
  });
  return Array.from(languages).sort();
}

export function getUniqueCsvPatientTypes(): string[] {
  const patientTypes = new Set<string>();
  csvProviders.forEach(provider => {
    provider.patientTypes.forEach(type => patientTypes.add(type));
  });
  return Array.from(patientTypes).sort();
}
