export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
  isMarquee?: boolean;
  features: string[];
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  beforeDescription?: string;
  afterDescription?: string;
  aspectRatio: string;
  svgSceneType: 'trash-can-sanitization' | 'kitchen-gleam' | 'bathroom-sparkle' | 'living-room-tidy' | 'deck-patio' | 'office-clean';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  location?: string;
  quote: string;
  rating?: number;
  source?: string;
  date?: string;
}

export interface BusinessConfig {
  businessName: string;
  secondaryBrandName: string;
  tagline: string;
  headline: string;
  subheadline: string;
  logoUrl: string;
  instagramUrl: string;
  instagramHandle: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  serviceArea: string;
  serviceAreaCoverage: string[];
  bookingUrl: string;
  formSubmissionEndpoint: string;
  ctaLabel: string;
  ctaSupportingCopy: string;
  heroBadgeText: string;
  services: ServiceItem[];
  benefits: BenefitItem[];
  steps: StepItem[];
  whyChooseUs: { title: string; description: string; icon: string }[];
  gallery: GalleryItem[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
}

export const businessConfig: BusinessConfig = {
  businessName: 'Clean Can Crew',
  secondaryBrandName: 'Cleaning Service 619',
  tagline: 'A Cleaner Space. A Better Day.',
  headline: 'A Cleaner Space. A Better Feeling.',
  subheadline:
    'Professional cleaning and trash can sanitization for spaces that deserve extra care. Tell us what you need, and let’s find the right solution for your home or property.',
  logoUrl: '/assets/aistudio/image_bd8a3bd5.png',
  instagramUrl: 'https://www.instagram.com/cleaningservice619/',
  instagramHandle: '@cleaningservice619',

  // Configurable contact fields: Leave empty until supplied by business owner
  phone: '',
  whatsappNumber: '',
  email: '',
  address: 'Burbank, IL',
  serviceArea: 'Burbank, IL & Surrounding Neighborhoods',
  serviceAreaCoverage: [
    'Burbank, IL',
    'Oak Lawn',
    'Bedford Park',
    'Bridgeview',
    'Chicago Ridge',
    'Surrounding Areas',
  ],
  bookingUrl: '',
  formSubmissionEndpoint: '', // Set your Formspree/custom endpoint here e.g., 'https://formspree.io/f/xyz'

  ctaLabel: 'Get a Free Quote',
  ctaSupportingCopy: 'Quick response · Clear communication · Tailored to your property',
  heroBadgeText: 'Professional Cleaning & Trash Can Sanitization',

  services: [
    {
      id: 'trash-can-sanitization',
      title: 'Trash Can Sanitization',
      description:
        'High-temperature washing, deep sanitization, and deodorizing to eliminate stubborn bacteria, grime, and foul odors from curbside bins.',
      icon: 'Trash2',
      enabled: true,
      isMarquee: true,
      features: [
        'High-pressure hot wash',
        'Hospital-grade eco sanitization',
        'Odor neutralization',
        'Exterior & rim detailing',
      ],
    },
    {
      id: 'residential-cleaning',
      title: 'Residential Cleaning',
      description:
        'Thoughtful routine cleaning designed for busy homeowners who value a fresh, organized, and truly clean living environment.',
      icon: 'Home',
      enabled: true,
      features: [
        'Living spaces & bedrooms',
        'Kitchen surfaces & appliances',
        'Bathroom sanitization',
        'Dusting & floor care',
      ],
    },
    {
      id: 'deep-cleaning',
      title: 'Deep Cleaning',
      description:
        'An exhaustive, top-to-bottom scrub addressing overlooked corners, baseboards, tile grout, and built-up buildup.',
      icon: 'Sparkles',
      enabled: true,
      features: [
        'Baseboards & door frames',
        'Under & behind accessible furniture',
        'Grout & fixture descaling',
        'Cabinet exteriors & interior spot clean',
      ],
    },
    {
      id: 'move-in-move-out',
      title: 'Move-In & Move-Out Cleaning',
      description:
        'Comprehensive turnover cleaning to ensure properties are sparkling clean for new occupants, inspections, or lease handovers.',
      icon: 'Key',
      enabled: true,
      features: [
        'Empty home thorough scrub',
        'Inside drawers & cabinets',
        'Oven & refrigerator cleaning',
        'Complete move-ready presentation',
      ],
    },
    {
      id: 'commercial-cleaning',
      title: 'Office & Commercial Cleaning',
      description:
        'Reliable upkeep for small offices, communal spaces, retail fronts, and outdoor waste collection areas.',
      icon: 'Building2',
      enabled: true,
      features: [
        'Workstation & lobby upkeep',
        'Waste bin sanitation',
        'Restroom disinfection',
        'Floor washing & vacuuming',
      ],
    },
    {
      id: 'post-construction',
      title: 'Post-Construction Cleaning',
      description:
        'Detailed dust mitigation, residue removal, and fine surface polishing following renovations and contractor work.',
      icon: 'Hammer',
      enabled: false, // Disabled by default until owner confirms
      features: [
        'Fine dry-wall dust removal',
        'Window sticker & residue scraping',
        'Floor decontamination',
        'Air vent & register wipe-down',
      ],
    },
  ],

  benefits: [
    {
      id: 'b1',
      title: 'Attention to Detail',
      description:
        'We focus on the small areas often missed—crevices, rims, handles, and surfaces where bacteria and dust accumulate.',
      icon: 'CheckCircle2',
    },
    {
      id: 'b2',
      title: 'Flexible Options',
      description:
        'Whether you need a one-time intensive sanitization or ongoing upkeep, we tailor our service to match your schedule.',
      icon: 'Calendar',
    },
    {
      id: 'b3',
      title: 'Customer-Focused Care',
      description:
        'Prompt communication, transparent quotes, and respectful care for your property from the first message to completion.',
      icon: 'HeartHandshake',
    },
    {
      id: 'b4',
      title: 'A Fresh, Clean Space',
      description:
        'Enjoy the peace of mind that comes with clean bins, deodorized spaces, and a healthier property for family or staff.',
      icon: 'ShieldCheck',
    },
  ],

  steps: [
    {
      number: '01',
      title: 'Tell Us What You Need',
      description:
        'Share your property location, preferred service type, and any particular requests through our quick enquiry form.',
    },
    {
      number: '02',
      title: 'Discuss the Details',
      description:
        'We review your details, confirm our availability, outline the scope, and provide a clear, tailored price estimate.',
    },
    {
      number: '03',
      title: 'Plan Your Cleaning',
      description:
        'Once you approve the plan, we schedule your service visit and arrive prepared to get your space looking and smelling pristine.',
    },
  ],

  whyChooseUs: [
    {
      title: 'Clear & Honest Communication',
      description:
        'No ambiguous pricing or unanswered messages. You always know what to expect and when to expect us.',
      icon: 'MessageSquare',
    },
    {
      title: 'Specialized Equipment & Care',
      description:
        'We use high-grade washing tools and dedicated cleaning supplies suited for each specific surface and bin.',
      icon: 'Wrench',
    },
    {
      title: 'Hygiene & Odor Elimination',
      description:
        'Trash cans and high-traffic areas harbor pests and foul smells. We sanitize deeply to eliminate the root cause.',
      icon: 'Sparkles',
    },
    {
      title: 'Convenient Enquiry Process',
      description:
        'Skip endless phone trees. Fill in our online form in under 60 seconds and receive a direct follow-up.',
      icon: 'Clock',
    },
  ],

  gallery: [
    {
      id: 'g1',
      title: 'Curbside Trash Can Wash & Sanitization',
      category: 'Trash Can Sanitization',
      beforeDescription: 'Heavily soiled, odor-emitting outdoor waste bin with persistent residue',
      afterDescription: 'Fully degreased, disinfected, deodorized, and shining like new',
      aspectRatio: '4:3',
      svgSceneType: 'trash-can-sanitization',
    },
    {
      id: 'g2',
      title: 'Kitchen Countertop & Cooktop Restoration',
      category: 'Residential Cleaning',
      beforeDescription: 'Grease splatter, water spots, and dull granite finish',
      afterDescription: 'Polished surfaces, grease-free stovetop, and streakless shine',
      aspectRatio: '4:3',
      svgSceneType: 'kitchen-gleam',
    },
    {
      id: 'g3',
      title: 'Bathroom Grout & Fixture Descaling',
      category: 'Deep Cleaning',
      beforeDescription: 'Hard water scale on chrome faucets and tiled shower surround',
      afterDescription: 'Sparkling descaled fixtures with clean grout lines',
      aspectRatio: '4:3',
      svgSceneType: 'bathroom-sparkle',
    },
    {
      id: 'g4',
      title: 'Living Room Reset & Hardwood Care',
      category: 'Residential Cleaning',
      beforeDescription: 'Dust film, scattered clutter, and high-traffic floor scuffs',
      afterDescription: 'Airy, organized space with conditioned hardwood floors',
      aspectRatio: '4:3',
      svgSceneType: 'living-room-tidy',
    },
    {
      id: 'g5',
      title: 'Exterior Entryway & Bin Storage Area',
      category: 'Commercial & Exterior',
      beforeDescription: 'Organic grime, driveway stains, and bin storage residue',
      afterDescription: 'Pressure-cleansed concrete path and deodorized storage pad',
      aspectRatio: '4:3',
      svgSceneType: 'deck-patio',
    },
    {
      id: 'g6',
      title: 'Office Breakroom & Common Area',
      category: 'Commercial Cleaning',
      beforeDescription: 'Shared microwave residue, full receptacles, and sticky tables',
      afterDescription: 'Sanitized food prep station, emptied and deodorized receptacles',
      aspectRatio: '4:3',
      svgSceneType: 'office-clean',
    },
  ],

  // Verified reviews list. Left empty strictly per guidelines until confirmed by owner.
  testimonials: [],

  faqs: [
    {
      question: 'Which types of cleaning are available?',
      answer:
        'We offer specialized curbside trash can sanitization (washing, disinfecting, and deodorizing outdoor bins), residential cleaning, intensive deep cleaning, move-in/move-out turnover, and light commercial space cleaning. Contact us for custom needs.',
    },
    {
      question: 'How can I request a quote?',
      answer:
        'Simply scroll to our online quote form below, select the service you need, tell us about your property, and submit. You can also reach out via our Instagram profile @cleaningservice619.',
    },
    {
      question: 'What information should I provide?',
      answer:
        'Your name, phone number or preferred contact method, the type of property (home, apartment, commercial), the service needed, and your general location or ZIP code. Providing details on the number of trash cans or rooms helps us give an accurate estimate.',
    },
    {
      question: 'How is the final price determined?',
      answer:
        'Pricing depends on the type of service, property size, condition, and frequency (one-time vs recurring). We review your requirements and provide an honest, upfront quote before any work begins.',
    },
    {
      question: 'Can I request a particular date or time?',
      answer:
        'Yes! You can specify your preferred date or day of the week in the quote form. For trash can sanitization, visits are typically coordinated on or right after your municipality’s scheduled trash pickup day.',
    },
    {
      question: 'Which locations do you serve?',
      answer:
        'We are based in Burbank, IL and serve Burbank and surrounding Chicagoland communities. If you are located nearby, submit your ZIP code in our form to check availability.',
    },
    {
      question: 'How can I contact the business?',
      answer:
        'The fastest way is through our online quote form or by sending a direct message to our Instagram page @cleaningservice619. When phone or WhatsApp channels are configured by the business owner, direct call links will appear on this site.',
    },
  ],
};
