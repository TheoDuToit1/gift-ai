// Demo data for UbuntuGift funeral services platform
// Pre-loaded sample data for demonstration purposes

import { getServicePackages, saveServicePackages, getStaffData, saveStaffData } from './cookies';

export interface FuneralHome {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  district: string;
  services: string[];
  rating: number;
  image?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  currency: string;
  category: 'basic' | 'premium' | 'community';
  inclusions: string[];
  addons: string[];
  duration: string;
  images: string[];
  available: boolean;
  popular?: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  specialties: string[];
  availability: string[];
}

export interface CulturalCustom {
  id: string;
  name: string;
  description: string;
  region: string;
  duration: string;
  participants: string;
  significance: string;
}

// Sample funeral homes by district
export const SAMPLE_FUNERAL_HOMES: FuneralHome[] = [
  {
    id: 'ubuntu-memorials',
    name: 'Ubuntu Memorials',
    description: 'Compassionate funeral services with traditional values',
    address: '123 Main Street, Polokwane, Limpopo',
    phone: '+27 15 123 4567',
    email: 'info@ubuntumemorials.co.za',
    district: 'Capricorn',
    services: ['burial', 'cremation', 'traditional', 'memorial'],
    rating: 4.8,
    image: '/images/funeral-home-1.jpg'
  },
  {
    id: 'compassion-care',
    name: 'Compassion Care Funeral Services',
    description: 'Supporting families through their time of loss',
    address: '45 Church Street, Thohoyandou, Limpopo',
    phone: '+27 15 987 6543',
    email: 'care@compassioncare.co.za',
    district: 'Vhembe',
    services: ['burial', 'traditional', 'memorial'],
    rating: 4.6,
    image: '/images/funeral-home-2.jpg'
  },
  {
    id: 'dignity-services',
    name: 'Dignity Funeral Services',
    description: 'Honoring lives with dignity and respect',
    address: '78 Nelson Mandela Drive, Tzaneen, Limpopo',
    phone: '+27 15 555 1234',
    email: 'contact@dignityservices.co.za',
    district: 'Mopani',
    services: ['burial', 'cremation', 'traditional', 'premium'],
    rating: 4.9,
    image: '/images/funeral-home-3.jpg'
  }
];

// Sample service packages
export const SAMPLE_SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'basic-dignity',
    name: 'Basic Dignity Package',
    description: 'Essential services provided with respect and care for those seeking a simple farewell.',
    basePrice: 8500,
    currency: 'ZAR',
    category: 'basic',
    inclusions: [
      'Basic wooden coffin',
      'Hearse transportation',
      'Graveside service',
      'Death certificate assistance',
      'Basic documentation'
    ],
    addons: ['flowers', 'music', 'refreshments'],
    duration: 'Complete service coverage',
    images: ['/images/packages/basic-1.jpg', '/images/packages/basic-2.jpg'],
    available: true,
    popular: false
  },
  {
    id: 'premium-peace',
    name: 'Premium Peace Package',
    description: 'Enhanced services for families seeking a meaningful and dignified farewell experience.',
    basePrice: 18500,
    currency: 'ZAR',
    category: 'premium',
    inclusions: [
      'Premium hardwood coffin with lining',
      'Flower car and family vehicles',
      'Full ceremony service (church + graveside)',
      'Sound system and basic music',
      'Professional documentation',
      'Guest book and memorial cards'
    ],
    addons: ['catering', 'photography', 'video tribute', 'extended transportation'],
    duration: 'Complete premium service',
    images: ['/images/packages/premium-1.jpg', '/images/packages/premium-2.jpg'],
    available: true,
    popular: true
  },
  {
    id: 'community-harmony',
    name: 'Community Harmony Package',
    description: 'Full traditional services honoring cultural customs and bringing communities together.',
    basePrice: 28500,
    currency: 'ZAR',
    category: 'community',
    inclusions: [
      'Premium coffin with custom cultural designs',
      'Extended family transportation',
      'Full traditional ceremony',
      'Community hall venue',
      'Complete catering for 100+ guests',
      'Professional photography and videography',
      'Traditional music and entertainment',
      'Extended documentation and certificates'
    ],
    addons: ['additional catering', 'extended venue time', 'cultural performers'],
    duration: 'Full traditional ceremony',
    images: ['/images/packages/community-1.jpg', '/images/packages/community-2.jpg'],
    available: true,
    popular: true
  }
];

// Sample staff members
export const SAMPLE_STAFF: StaffMember[] = [
  {
    id: 'director-1',
    name: 'Thandi Nkosi',
    role: 'Funeral Director',
    phone: '+27 15 123 4567',
    email: 'thandi@ubuntumemorials.co.za',
    specialties: ['Traditional ceremonies', 'Family counseling', 'Documentation'],
    availability: ['Monday-Friday 8AM-6PM', 'Saturday 9AM-4PM']
  },
  {
    id: 'coordinator-1',
    name: 'Sipho Mthembu',
    role: 'Service Coordinator',
    phone: '+27 15 123 4568',
    email: 'sipho@ubuntumemorials.co.za',
    specialties: ['Logistics', 'Transportation', 'Vendor coordination'],
    availability: ['Monday-Saturday 7AM-7PM']
  },
  {
    id: 'counselor-1',
    name: 'Nomsa Zulu',
    role: 'Grief Counselor',
    phone: '+27 15 123 4569',
    email: 'nomsa@ubuntumemorials.co.za',
    specialties: ['Family support', 'Cultural guidance', 'Grief counseling'],
    availability: ['Monday-Friday 9AM-5PM', 'By appointment']
  }
];

// Sample cultural customs
export const SAMPLE_CULTURAL_CUSTOMS: CulturalCustom[] = [
  {
    id: 'isiko-lokubuyisa',
    name: 'Isiko Lokubuyisa (Return Ceremony)',
    description: 'A traditional ceremony where the spirit of the deceased is welcomed back to the ancestral home after burial.',
    region: 'Capricorn, Vhembe',
    duration: '2-3 days',
    participants: 'Extended family, community elders',
    significance: 'Ensures the spirit finds peace and the family finds closure.'
  },
  {
    id: 'umkhululo',
    name: 'Umkhululo (Unveiling Ceremony)',
    description: 'A ceremony held 6-12 months after burial to officially introduce the tombstone and complete mourning.',
    region: 'Mopani, Capricorn',
    duration: '1 day',
    participants: 'Immediate family, close relatives',
    significance: 'Marks the end of formal mourning and celebrates the life lived.'
  },
  {
    id: 'thabelo',
    name: 'Thabelo (Sacrifice Ceremony)',
    description: 'Traditional sacrifice to honor ancestors and seek their guidance for the family.',
    region: 'Vhembe, Capricorn',
    duration: '1 day',
    participants: 'Family elders, traditional healer',
    significance: 'Maintains connection with ancestors and family spiritual guidance.'
  }
];

// Limpopo districts for regional filtering
export const LIMPOPO_DISTRICTS = [
  'Capricorn',
  'Vhembe',
  'Mopani',
  'Sekhukhune',
  'Waterberg'
];

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'st', name: 'Sepedi', nativeName: 'Sepedi' },
  { code: 'ts', name: 'Xitsonga', nativeName: 'Xitsonga' },
  { code: 've', name: 'Tshivenda', nativeName: 'Tshivenda' }
];

// FAQ categories and sample questions
export const FAQ_CATEGORIES = {
  general: [
    { question: 'What documents do I need after a death?', answer: '...' },
    { question: 'How long does a funeral service typically take?', answer: '...' }
  ],
  packages: [
    { question: 'What\'s included in the Basic package?', answer: '...' },
    { question: 'Can I upgrade from Basic to Premium?', answer: '...' }
  ],
  cultural: [
    { question: 'How do I incorporate traditional customs?', answer: '...' },
    { question: 'What are the costs for cultural ceremonies?', answer: '...' }
  ]
};

// Initialize demo data in cookies if not present
export const initializeDemoData = () => {
  // Only initialize if no data exists
  if (getServicePackages().length === 0) {
    console.log('🌱 Initializing UbuntuGift demo data...');
    saveServicePackages(SAMPLE_SERVICE_PACKAGES);
    saveStaffData(SAMPLE_STAFF);
    console.log('✅ Demo data initialized successfully!');
  } else {
    console.log('📦 Demo data already exists, skipping initialization');
  }
};
