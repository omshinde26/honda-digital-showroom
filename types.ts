
export interface Product {
  id: string;
  name: string;
  category: 'EV' | 'Scooter' | 'Motorcycle';
  price: string;
  images: Record<string, string>; // colorName -> imageUrl
  colors: { name: string; hex: string }[];
  features: Feature[];
  specs: Record<string, Record<string, string>>;
}

export interface Feature {
  label: string;
  title: string;
  description: string;
  image: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  image: string;
}

export interface Dealer {
  id: string;
  name: string;
  address: string;
  phone: string;
  coords: [number, number];
}
