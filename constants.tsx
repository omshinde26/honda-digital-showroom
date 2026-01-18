
import { Product, NewsItem, Dealer } from './types';

export const NAV_LINKS = [
  { name: 'EV', path: '/category/ev' },
  { name: 'Scooters', path: '/category/scooters' },
  { name: 'Motorcycles', path: '/category/motorcycles' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact Us', path: '/contact' },
];

export const MOTORCYCLE_MODELS = [
  { name: "H'ness CB350", path: '/product/hness-cb350' },
  { name: 'CB 200X', path: '/product/cb-200x' },
  { name: 'Hornet 2.0', path: '/product/hornet-2-0' },
  { name: 'X-Blade', path: '/product/x-blade' },
  { name: 'Unicorn', path: '/product/unicorn' },
  { name: 'SP 125', path: '/product/sp-125' },
  { name: 'Shine 125', path: '/product/shine-125' },
  { name: 'Livo', path: '/product/livo' },
  { name: 'CD 110 Deluxe', path: '/product/cd-110-deluxe' },
  { name: 'Shine 100', path: '/product/shine-100' },
];

export const SCOOTER_MODELS = [
  { name: 'Grazia 125 Sports Edition', path: '/product/grazia-125-sports-edition' },
  { name: 'Grazia 125', path: '/product/grazia-125' },
  { name: 'Activa 125 BS-VI', path: '/product/activa-125-bs-vi' },
  { name: 'Activa 125', path: '/product/activa-125' },
  { name: 'Dio (BS VI)', path: '/product/dio-bs-vi' },
  { name: 'Dio Sports Edition', path: '/product/dio-sports-edition' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'activa-110',
    name: 'Activa 110',
    category: 'Scooter',
    price: '₹76,234',
    colors: [
      { name: 'Decent Blue', hex: '#1D2951' },
      { name: 'Matte Axis Grey', hex: '#4A4A4A' },
      { name: 'Rebel Red', hex: '#8B0000' },
      { name: 'Pearl Siren Blue', hex: '#007FFF' },
    ],
    images: {
      'Decent Blue': 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=800',
      'Matte Axis Grey': 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800',
      'Rebel Red': 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&q=80&w=800',
      'Pearl Siren Blue': 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&q=80&w=800',
    },
    features: [
      {
        label: 'Technology',
        title: 'Silent Start with ACG',
        description: 'Experience a smooth start with our advanced ACG technology that eliminates gear meshing noise.',
        image: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=600',
      },
      {
        label: 'Performance',
        title: 'Enhanced Smart Power (eSP)',
        description: 'Optimized engine performance with programmed fuel injection for better mileage and efficiency.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
      },
      {
        label: 'Safety',
        title: 'Combi-Brake System',
        description: 'Shortens braking distance and ensures more stability when you pull the left lever.',
        image: 'https://images.unsplash.com/photo-1621360841013-c7683c6c98ca?auto=format&fit=crop&q=80&w=600',
      }
    ],
    specs: {
      'Body Dimensions': {
        'Length': '1833 mm',
        'Width': '697 mm',
        'Height': '1156 mm',
        'Wheel Base': '1260 mm',
        'Ground Clearance': '162 mm',
        'Seat Height': '780 mm',
        'Kerb Weight': '109 kg',
      },
      'Engine': {
        'Type': 'Fan Cooled, 4 Stroke, SI Engine',
        'Displacement': '109.51 cc',
        'Max Power': '5.77 kW @ 8000 rpm',
        'Max Torque': '8.90 N-m @ 5500 rpm',
        'Fuel System': 'PGM-FI',
        'Starting': 'Self & Kick Start',
      },
      'Transmission': {
        'Type': 'V-Matic (Automatic)',
        'Clutch': 'Wet, Multi-plate Centrifugal Automatic',
      },
      'Tyres & Brakes': {
        'Front Tyre': '90/100-10 53J',
        'Rear Tyre': '90/100-10 53J',
        'Front Brake': '130mm Drum',
        'Rear Brake': '130mm Drum',
        'Braking System': 'Combi-Brake System (CBS)',
      },
      'Frame & Suspension': {
        'Frame': 'Under Bone',
        'Front Suspension': 'Telescopic',
        'Rear Suspension': '3-Step Adjustable Spring Loaded Hydraulic',
      },
      'Electricals': {
        'Battery': '12V, 3Ah',
        'Headlight': 'LED',
        'Tail Light': 'LED',
        'Ignition': 'DC-CDI',
        'Charging Socket': 'Mobile Charging Socket',
      }
    }
  },
  {
    id: 'activa-125',
    name: 'Activa 125',
    category: 'Scooter',
    price: '₹94,422',
    colors: [
      { name: 'Pearl Precious White', hex: '#F8F8FF' },
      { name: 'Mat Axis Gray Metallic', hex: '#4A4A4A' },
      { name: 'Rebel Red Metallic', hex: '#8B0000' },
      { name: 'Pearl Siren Blue', hex: '#007FFF' },
      { name: 'Pearl Igneous Black', hex: '#000000' },
      { name: 'Pearl Deep Ground Gray', hex: '#696969' },
    ],
    images: {
      'Pearl Precious White': '/assets/vehicles/activa125/colors/pearl-precious-white.png',
      'Mat Axis Gray Metallic': '/assets/vehicles/activa125/colors/mat-axis-gray-metallic.png',
      'Rebel Red Metallic': '/assets/vehicles/activa125/colors/rebel-red-metallic.png',
      'Pearl Siren Blue': '/assets/vehicles/activa125/colors/pearl-siren-blue.png',
      'Pearl Igneous Black': '/assets/vehicles/activa125/colors/pearl-igneous-black.png',
      'Pearl Deep Ground Gray': '/assets/vehicles/activa125/colors/pearl-deep-ground-gray.png',
    },
    features: [
      {
        label: 'Technology',
        title: 'LED Headlight & Position Lamp',
        description: 'Enhanced visibility with bright LED headlight and stylish LED position lamp for better road presence.',
        image: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=600',
      },
      {
        label: 'Performance',
        title: '125cc HET Engine',
        description: 'Honda Eco Technology (HET) engine delivers superior performance with excellent fuel efficiency.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
      },
      {
        label: 'Convenience',
        title: 'Mobile Charging Socket',
        description: 'Keep your devices charged on the go with the convenient mobile charging socket.',
        image: 'https://images.unsplash.com/photo-1621360841013-c7683c6c98ca?auto=format&fit=crop&q=80&w=600',
      },
      {
        label: 'Storage',
        title: 'Large Under-Seat Storage',
        description: '18-liter under-seat storage space to accommodate your daily essentials with ease.',
        image: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=600',
      }
    ],
    specs: {
      'Body Dimensions': {
        'Length': '1761 mm',
        'Width': '665 mm',
        'Height': '1152 mm',
        'Wheel Base': '1238 mm',
        'Ground Clearance': '153 mm',
        'Kerb Weight': '109 kg',
        'Seat Height': '780 mm',
      },
      'Engine': {
        'Type': 'Air Cooled, 4 Stroke, SI Engine',
        'Displacement': '124 cc',
        'Max Power': '6.84 kW @ 8000 rpm',
        'Max Torque': '10.54 N-m @ 5000 rpm',
        'Fuel System': 'PGM-FI',
        'Fuel Tank Capacity': '5.3 Liters',
        'Starting': 'Self & Kick Start',
      },
      'Transmission': {
        'Type': 'V-Matic (Automatic)',
        'Clutch': 'Wet, Multi-plate Centrifugal Automatic',
      },
      'Tyres & Brakes': {
        'Front Tyre': '90/100-10 53J',
        'Rear Tyre': '90/100-10 53J',
        'Front Brake': '190mm Disc',
        'Rear Brake': '130mm Drum',
        'Braking System': 'Combi-Brake System (CBS)',
      },
      'Frame & Suspension': {
        'Frame': 'Under Bone',
        'Front Suspension': 'Telescopic',
        'Rear Suspension': 'Spring Loaded Hydraulic Damper',
      },
      'Electricals': {
        'Battery': '12V, 5Ah',
        'Headlight': 'LED Headlight & Position Lamp',
        'Tail Light': 'LED',
        'Ignition': 'DC-CDI',
        'Charging Socket': 'Mobile Charging Socket',
        'Console': 'Analog with Digital Display',
      }
    }
  },
  {
    id: 'cb-200x',
    name: 'CB 200X',
    category: 'Motorcycle',
    price: '₹1,44,500',
    colors: [
      { name: 'Pearl Sports Yellow', hex: '#FFD700' },
      { name: 'Matte Axis Gray Metallic', hex: '#4A4A4A' },
      { name: 'Sports Red', hex: '#DC143C' },
    ],
    images: {
      'Pearl Sports Yellow': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'Matte Axis Gray Metallic': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'Sports Red': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    },
    features: [
      {
        label: 'Performance',
        title: '184.4cc Engine',
        description: 'Powerful 184.4cc single-cylinder engine delivers excellent performance for adventure riding.',
        image: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=600',
      },
      {
        label: 'Design',
        title: 'Adventure Styling',
        description: 'Bold adventure-inspired design with high ground clearance and rugged appearance.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
      }
    ],
    specs: {
      'Body Dimensions': {
        'Length': '2026 mm',
        'Width': '789 mm',
        'Height': '1244 mm',
        'Wheel Base': '1355 mm',
        'Ground Clearance': '180 mm',
        'Kerb Weight': '147 kg',
        'Seat Height': '810 mm',
      },
      'Engine': {
        'Type': 'Air Cooled, 4 Stroke, SI Engine',
        'Displacement': '184.4 cc',
        'Max Power': '12.73 kW @ 8500 rpm',
        'Max Torque': '16.1 N-m @ 6000 rpm',
        'Fuel System': 'PGM-FI',
        'Starting': 'Self Start',
      },
      'Transmission': {
        'Type': '5-Speed Manual',
        'Clutch': 'Wet Multi-plate',
      },
      'Tyres & Brakes': {
        'Front Tyre': '100/90-17',
        'Rear Tyre': '130/70-17',
        'Front Brake': '276mm Disc',
        'Rear Brake': '220mm Disc',
        'Braking System': 'Single Channel ABS',
      },
      'Frame & Suspension': {
        'Frame': 'Diamond',
        'Front Suspension': 'Telescopic',
        'Rear Suspension': 'Pro-Link Monoshock',
      },
      'Electricals': {
        'Battery': '12V, 6Ah',
        'Headlight': 'LED',
        'Tail Light': 'LED',
        'Ignition': 'Full Transistorized',
      }
    }
  },
  {
    id: 'hornet-2-0',
    name: 'Hornet 2.0',
    category: 'Motorcycle',
    price: '₹1,26,345',
    colors: [
      { name: 'Matte Axis Gray Metallic', hex: '#4A4A4A' },
      { name: 'Pearl Sports Yellow', hex: '#FFD700' },
      { name: 'Athletic Blue Metallic', hex: '#1E90FF' },
    ],
    images: {
      'Matte Axis Gray Metallic': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=800',
      'Pearl Sports Yellow': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=800',
      'Athletic Blue Metallic': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=800',
    },
    features: [
      {
        label: 'Performance',
        title: '184.4cc BS6 Engine',
        description: 'Advanced BS6 compliant engine with excellent power delivery and fuel efficiency.',
        image: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=600',
      },
      {
        label: 'Technology',
        title: 'LED Lighting',
        description: 'Full LED lighting system with distinctive LED headlight and tail light design.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
      }
    ],
    specs: {
      'Body Dimensions': {
        'Length': '2041 mm',
        'Width': '803 mm',
        'Height': '1067 mm',
        'Wheel Base': '1355 mm',
        'Ground Clearance': '167 mm',
        'Kerb Weight': '142 kg',
        'Seat Height': '790 mm',
      },
      'Engine': {
        'Type': 'Air Cooled, 4 Stroke, SI Engine',
        'Displacement': '184.4 cc',
        'Max Power': '12.73 kW @ 8500 rpm',
        'Max Torque': '16.1 N-m @ 6000 rpm',
        'Fuel System': 'PGM-FI',
        'Starting': 'Self Start',
      },
      'Transmission': {
        'Type': '5-Speed Manual',
        'Clutch': 'Wet Multi-plate',
      },
      'Tyres & Brakes': {
        'Front Tyre': '100/80-17',
        'Rear Tyre': '130/70-17',
        'Front Brake': '276mm Disc',
        'Rear Brake': '220mm Disc',
        'Braking System': 'Single Channel ABS',
      },
      'Frame & Suspension': {
        'Frame': 'Diamond',
        'Front Suspension': 'Telescopic',
        'Rear Suspension': 'Monoshock',
      },
      'Electricals': {
        'Battery': '12V, 6Ah',
        'Headlight': 'LED',
        'Tail Light': 'LED',
        'Ignition': 'Full Transistorized',
      }
    }
  }
];

export const MOCK_NEWS: NewsItem[] = [
  { id: '1', date: 'Oct 24, 2024', title: 'Honda Unveils New Next-Gen EV Platform', image: 'https://picsum.photos/seed/honda1/600/400' },
  { id: '2', date: 'Oct 12, 2024', title: 'Activa Reaches 3 Million Milestone', image: 'https://picsum.photos/seed/honda2/600/400' },
  { id: '3', date: 'Sep 28, 2024', title: 'Sustainable Mobility: Honda’s 2030 Vision', image: 'https://picsum.photos/seed/honda3/600/400' },
];

export const MOCK_DEALERS: Dealer[] = [
  { id: 'd1', name: 'Elite Honda', address: '123 MG Road, Bengaluru, Karnataka', phone: '+91 98765 43210', coords: [12.9716, 77.5946] },
  { id: 'd2', name: 'Global Motors', address: '456 Residency Rd, Bengaluru, Karnataka', phone: '+91 98765 43211', coords: [12.9641, 77.6068] },
  { id: 'd3', name: 'South Star Honda', address: '789 Jayanagar 4th Block, Bengaluru', phone: '+91 98765 43212', coords: [12.9298, 77.5813] },
];
