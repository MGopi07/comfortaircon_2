import { GalleryItem } from '@/types/gallery';

/**
 * Hardcoded sample gallery items for UI development and testing.
 * Uses real project and installation photos from Comfort Aircon.
 * Includes varied aspect ratios (landscape, portrait, square).
 *
 * TODO: Replace sampleGallery with backend API response once the API endpoint is available.
 */
export const sampleGallery: GalleryItem[] = [
  // 1. Installation Photos
  {
    id: 'gal-1',
    category: 'Installation Photos',
    title: 'Carrier X-Power Commercial VRF Rooftop Installation',
    alt: 'Dual outdoor VRF modular units installed with vibration pads on rooftop in Pondicherry',
    image: '/images/carrier-vrf.png',
  },
  {
    id: 'gal-2',
    category: 'Installation Photos',
    title: 'Carrier Superia 4-Way Cassette Architectural Installation',
    alt: 'Flush ceiling 4-way cassette AC indoor unit installation in electronics retail showroom',
    image: '/images/carrier-cassette.png',
  },
  {
    id: 'gal-3',
    category: 'Installation Photos',
    title: 'Precision Split AC Copper Piping & Bracket Setup',
    alt: 'Wall mounted 5-star inverter split air conditioner with hidden copper line set',
    image: '/images/1.png',
  },

  // 2. Completed Projects
  {
    id: 'gal-4',
    category: 'Completed Projects',
    title: 'Toshiba SMMS-u Luxury Beachfront Heritage Villa',
    alt: 'Multi-zone whisper-quiet luxury villa air conditioning system in White Town Puducherry',
    image: '/images/why1.png',
  },
  {
    id: 'gal-5',
    category: 'Completed Projects',
    title: 'Concealed Ductable System for Corporate Boardroom',
    alt: 'Concealed ductable AC with linear architectural slot diffusers in corporate facility',
    image: '/images/carrier-ductable.png',
  },
  {
    id: 'gal-6',
    category: 'Completed Projects',
    title: 'Toshiba Inverter Cassette in Dental Healthcare Clinic',
    alt: 'Ceiling cassette AC providing clean air distribution in modern healthcare clinic',
    image: '/images/toshiba-cassette.png',
  },

  // 3. Service Work
  {
    id: 'gal-7',
    category: 'Service Work',
    title: 'Factory-Trained Chemical Foam Cleaning & Service',
    alt: 'Comfort Aircon technician executing high-pressure fin chemical wash with waterproof jacket',
    image: '/images/why2.png',
  },
  {
    id: 'gal-8',
    category: 'Service Work',
    title: 'High-Pressure Refrigerant Nitrogen Leak Testing',
    alt: 'HVAC technicians conducting dry nitrogen pressure test at 350 PSI on copper line sets',
    image: '/images/4.png',
  },
  {
    id: 'gal-9',
    category: 'Service Work',
    title: 'High-Pressure Hydro Jet Blower Wheel Cleaning',
    alt: 'Deep rotary wash cleaning removing deep dust and mold from indoor AC blower drum',
    image: '/images/5.png',
  },

  // 4. Product Images
  {
    id: 'gal-10',
    category: 'Product Images',
    title: 'Authorized Carrier & Toshiba Sales Showroom',
    alt: 'Comfort Aircon flagship dealership showroom showcasing inverter AC models',
    image: '/images/carrier_toshiba_sales_showroom.png',
  },
  {
    id: 'gal-11',
    category: 'Product Images',
    title: 'Toshiba Daiseikai Japanese Inverter Display Unit',
    alt: 'Premium Japanese inverter split AC with integrated plasma air purifier on display',
    image: '/images/toshiba-split.png',
  },
  {
    id: 'gal-12',
    category: 'Product Images',
    title: 'Carrier Ester Neo 5-Star Energy Saver Unit',
    alt: 'Carrier Ester Neo high efficiency dual inverter split air conditioner demonstration',
    image: '/images/carrier-split-ac.png',
  },
];
