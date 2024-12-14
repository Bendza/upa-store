export interface Product {
  id: number;
  name: string;
  sku: string;
  slug: string;
  price: number;
  images: string[];
  sizes: Array<{
    size: string;
    inStock: boolean;
  }>;
  colors: Array<{
    code: string;
    name: string;
    image: string;
  }>;
  description: string;
  category: 'muska-obuca' | 'zenska-obuca';
  specifications: {
    type: string;
    material: string;
    season?: string;
  };
} 