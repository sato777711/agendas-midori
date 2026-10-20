export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  category: 'catalogo' | 'personalizada';
  available: boolean;
}

export interface SiteContent {
  siteName: string;
  tagline: string;
  heroImage: string;
  aboutText: string;
  aboutImage: string;
  whatsapp: string;
  instagram: string;
  email: string;
  city: string;
  products: Product[];
  gallery: string[];
  customAgendaInfo: {
    minUnits: number;
    daysAdvance: number;
    options: string[];
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}   