import { Product } from '@/types/product';

/**
 * Hardcoded sample products for UI development and testing.
 * Uses real product content aligned with the 6 backend API fields.
 *
 * TODO: Replace sampleProducts with backend API response once the API endpoint is available.
 */
export const sampleProducts: Product[] = [
  {
    id: 'prod-c1',
    name: 'Carrier Ester Neo 5-Star Inverter Split AC',
    model: 'CAI18EN5R34F0 (1.5 TON)',
    image: '/images/carrier-split-ac.png',
    specifications: [
      { label: 'Cooling Capacity', value: '1.5 Ton (5000 W)' },
      { label: 'Energy Star Rating', value: '5-Star (ISEER 5.10)' },
      { label: 'Compressor Type', value: 'Variable Dual Inverter' },
      { label: 'Condenser Coil', value: '100% Copper with Blue Fin' },
      { label: 'Refrigerant', value: 'Eco R32 Zero ODP' },
      { label: 'Noise Level', value: '21 dB Ultra-Quiet' },
    ],
    features: [
      'Instacool Rapid 60-Second Cooling mode',
      'PM 2.5 Micro-Air Filtration for clean indoor breathing',
      'Hydrophilic Blue-Fin Anti-Corrosion protective coating',
      '10-Year official compressor factory warranty',
      'Stabilizer-free operation from 135V to 280V',
    ],
  },
  {
    id: 'prod-t1',
    name: 'Toshiba Daiseikai 5-Star Japanese Inverter Split AC',
    model: 'RAS-18N3KVR-IN (1.5 TON)',
    image: '/images/toshiba-split.png',
    specifications: [
      { label: 'Cooling Capacity', value: '1.5 Ton (5200 W Peak)' },
      { label: 'Compressor', value: 'Japanese DC Twin-Rotary' },
      { label: 'Air Purification', value: 'Integrated Plasma Ionizer' },
      { label: 'Filtration Standard', value: 'Ultra-Pure PM 0.1' },
      { label: 'Heat Exchanger', value: 'Magic Coil Self-Cleaning' },
    ],
    features: [
      'Japanese Twin-Rotary Inverter compressor',
      'Magic Coil self-cleaning aqua-resin coated heat exchanger',
      'Integrated active Plasma ionizer neutralizing 94% PM 0.1 particles',
      'Whisper-quiet 19 dB operation for undisturbed sleep',
      'Hada Care gentle indirect ceiling airflow avoids direct cold blasts',
    ],
  },
  {
    id: 'prod-c2',
    name: 'Carrier Superia 4-Way Inverter Cassette AC',
    model: '40KVC024 (2.0 / 3.0 TON)',
    image: '/images/carrier-cassette.png',
    specifications: [
      { label: 'Capacity Options', value: '2.0 Ton / 3.0 Ton' },
      { label: 'Air Distribution', value: '360° Circular Flow Louvre' },
      { label: 'Drain Lift Pump', value: 'Built-in 750mm Head' },
      { label: 'Chassis Profile', value: '245mm Ultra-Slim Depth' },
      { label: 'Control System', value: 'LCD Wireless / Wired Panel' },
    ],
    features: [
      '360-Degree omnidirectional uniform airflow dispersion',
      'Built-in high-lift condensate drain pump (750mm lift)',
      'Whisper-quiet turbo fan with aerodynamic blades',
      'Fresh air intake port for positive pressure ventilation',
      'Slim decorative panel blends flush into false ceiling tiles',
    ],
  },
  {
    id: 'prod-t2',
    name: 'Toshiba SMMS-u Next-Gen Japanese VRF System',
    model: 'MCY-MHP0804HT8 (Up to 120 HP)',
    image: '/images/toshiba-vrf.png',
    specifications: [
      { label: 'Modular Capability', value: 'Up to 120 HP Combined' },
      { label: 'Compressor Tech', value: 'Triple Rotary Inverter with DLC' },
      { label: 'Subcooling Tech', value: 'Advanced Triple Liquid Subcooler' },
      { label: 'Operating Ceiling', value: '52°C Ambient Cooling Durability' },
      { label: 'Commissioning Tool', value: 'NFC Smartphone Diagnostics' },
    ],
    features: [
      'Triple Rotary DC Inverter with Diamond-Like Carbon (DLC) coating',
      'Proprietary Triple Liquid Sub-cooling Circuit for long pipe runs',
      'NFC Wave Tool enables wireless smartphone setup & diagnostics',
      'Extreme 52°C high-heat durability engineered for coastal environments',
      'Gold-Fin condenser treatment resists coastal salt-spray corrosion',
    ],
  },
  {
    id: 'prod-c3',
    name: 'Carrier Concealed High-Static Ductable AC',
    model: '40VDC036 (3.0 / 4.0 / 5.5 TON)',
    image: '/images/carrier-duct.png',
    specifications: [
      { label: 'Capacity Range', value: '3.0 Ton to 5.5 Ton' },
      { label: 'External Static Head', value: 'High Static up to 150 Pa' },
      { label: 'Mounting Style', value: 'Concealed False Ceiling' },
      { label: 'BMS Integration', value: 'BACnet / Modbus Protocol' },
    ],
    features: [
      '100% invisible false ceiling concealment',
      'High static pressure supports long extended duct runs',
      'Compatible with linear architectural slot diffusers',
      'Central Building Management System (BMS) ready',
      'Heavy-gauge galvanized steel anti-corrosion casing',
    ],
  },
];
