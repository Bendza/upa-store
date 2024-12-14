import { Product } from '../types/product';

// Categories
export const categories = [
  {
    id: 'muska-obuca',
    title: 'MUŠKA OBUĆA',
    image: '/assets/slike/IMG_6976.jpeg',
    link: '/kolekcije/muska-obuca'
  },
  {
    id: 'zenska-obuca',
    title: 'ŽENSKA OBUĆA',
    image: '/assets/slike/IMG_6977.jpeg',
    link: '/kolekcije/zenska-obuca'
  }
];

// Collections
export const collections = [
  {
    id: 'prolecna-letnja',
    title: 'Prolećna/Letnja Kolekcija',
    image: '/assets/slike/IMG_6978.jpeg',
    link: '/kolekcije/prolecna-letnja'
  },
  {
    id: 'jesenja-zimska',
    title: 'Jesenja/Zimska Kolekcija',
    image: '/assets/slike/IMG_6979.jpeg',
    link: '/kolekcije/jesenja-zimska'
  }
];

// Products
export const products: Product[] = [
  {
    id: 1,
    name: 'Muške cipele MC01',
    sku: 'MC01',
    slug: 'muske-cipele-mc01',
    price: 12990,
    images: [
      '/assets/products/muske-cipele-1-1.jpg',
      '/assets/products/muske-cipele-1-2.jpg',
      '/assets/products/muske-cipele-1-3.jpg',
      '/assets/products/muske-cipele-1-4.jpg'
    ],
    sizes: [
      { size: '41', inStock: true },
      { size: '42', inStock: true },
      { size: '43', inStock: true },
      { size: '44', inStock: true },
      { size: '45', inStock: true }
    ],
    colors: [
      {
        code: '#000000',
        name: 'Crna',
        image: '/assets/products/muske-cipele-1-1.jpg'
      }
    ],
    description: 'Elegantne muške cipele od najfinije kože.',
    category: 'muska-obuca',
    specifications: {
      type: 'Cipele',
      material: 'Prirodna koža',
      season: 'Jesen/Zima'
    }
  },
  {
    id: 2,
    name: 'Ženske cipele ZC01',
    sku: 'ZC01',
    slug: 'zenske-cipele-zc01',
    price: 11990,
    images: [
      '/assets/products/zenske-cipele-1-1.jpg',
      '/assets/products/zenske-cipele-1-2.jpg',
      '/assets/products/zenske-cipele-1-3.jpg',
      '/assets/products/zenske-cipele-1-4.jpg'
    ],
    sizes: [
      { size: '36', inStock: true },
      { size: '37', inStock: true },
      { size: '38', inStock: true },
      { size: '39', inStock: true },
      { size: '40', inStock: true }
    ],
    colors: [
      {
        code: '#8B4513',
        name: 'Braon',
        image: '/assets/products/zenske-cipele-1-1.jpg'
      }
    ],
    description: 'Elegantne ženske cipele od najfinije kože.',
    category: 'zenska-obuca',
    specifications: {
      type: 'Cipele',
      material: 'Prirodna koža',
      season: 'Proleće/Leto'
    }
  }
];

// Featured products for homepage
export const featuredProducts = products.slice(0, 4);

// Latest models for sidebar
export const latestModels = products.slice(0, 3).map(product => ({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.images[0],
  href: `/proizvod/${product.slug}`
}));

// Slider images for homepage
export const sliderImages = [
  {
    image: '/assets/slike/IMG_6976.jpeg',
    title: 'Nova Kolekcija',
    subtitle: 'Proleće/Leto 2024',
    ctaText: 'POGLEDAJ',
    ctaLink: '/kolekcije/prolecna-letnja'
  },
  {
    image: '/assets/slike/IMG_6977.jpeg',
    title: 'Aktuelna Kolekcija',
    subtitle: 'Jesen/Zima 2023',
    ctaText: 'POGLEDAJ',
    ctaLink: '/kolekcije/jesenja-zimska'
  }
]; 