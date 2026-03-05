import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product5 from '@/assets/product-5.jpg';
import product6 from '@/assets/product-6.jpg';
import product7 from '@/assets/product-7.jpg';
import product8 from '@/assets/product-8.jpg';
import mensChain from '@/assets/mens-chain.png';
import mensBracelet from '@/assets/mens-bracelet.png';
import mensRings from '@/assets/mens-rings.png';
import mensCufflinks from '@/assets/mens-cufflinks.png';

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: 'necklaces' | 'earrings' | 'rings' | 'bracelets' | 'gifts' | 'chains';
  gender: 'women' | 'men' | 'unisex';
  material: string;
  description: string;
  images: string[];
  badge?: string;
  sizes?: string[];
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Celestial Diamond Pendant',
    price: 12999,
    originalPrice: 15999,
    rating: 4.8,
    reviews: 124,
    category: 'necklaces',
    gender: 'women',
    material: '18K Gold with Diamond',
    description: 'A stunning celestial-inspired pendant featuring a brilliant diamond set in 18K gold. The intricate star design catches light beautifully, making it perfect for both day and evening wear.',
    images: [product1, product5],
    badge: 'Best Seller',
    sizes: ['16 inch', '18 inch', '20 inch'],
  },
  {
    id: '2',
    name: 'Classic Gold Hoops',
    price: 8499,
    rating: 4.9,
    reviews: 89,
    category: 'earrings',
    gender: 'women',
    material: '22K Gold',
    description: 'Timeless gold hoop earrings embellished with delicate diamond accents. These versatile pieces transition effortlessly from daytime elegance to evening glamour.',
    images: [product2],
    badge: 'Trending',
  },
  {
    id: '3',
    name: 'Solitaire Elegance Ring',
    price: 24999,
    originalPrice: 29999,
    rating: 5.0,
    reviews: 56,
    category: 'rings',
    gender: 'women',
    material: '18K Gold with Solitaire Diamond',
    description: 'A breathtaking solitaire ring featuring a perfectly cut diamond set in polished 18K gold. The classic four-prong setting allows maximum light reflection.',
    images: [product3],
    badge: 'New',
    sizes: ['5', '6', '7', '8', '9'],
  },
  {
    id: '4',
    name: 'Royal Teardrop Necklace',
    price: 18999,
    rating: 4.7,
    reviews: 67,
    category: 'necklaces',
    gender: 'women',
    material: '22K Gold',
    description: 'An elegant layered necklace featuring a beautifully crafted teardrop pendant in 22K gold. The multi-chain design adds depth and sophistication.',
    images: [product5],
    sizes: ['16 inch', '18 inch'],
  },
  {
    id: '5',
    name: 'Emerald Stud Earrings',
    price: 14999,
    rating: 4.6,
    reviews: 43,
    category: 'earrings',
    gender: 'women',
    material: '18K Gold with Emerald',
    description: 'Vibrant emerald studs set in 18K gold with a cushion cut. These statement earrings bring a pop of color to any outfit.',
    images: [product6],
    badge: 'New',
  },
  {
    id: '6',
    name: 'Diamond Eternity Band',
    price: 32999,
    originalPrice: 38999,
    rating: 4.9,
    reviews: 78,
    category: 'rings',
    gender: 'women',
    material: '18K Gold with Diamonds',
    description: 'A stunning double-row eternity band set with brilliant-cut diamonds. The chevron pattern creates an eye-catching sparkle from every angle.',
    images: [product7],
    badge: 'Best Seller',
    sizes: ['5', '6', '7', '8'],
  },
  {
    id: '7',
    name: 'Filigree Gold Cuff',
    price: 19999,
    rating: 4.8,
    reviews: 34,
    category: 'bracelets',
    gender: 'women',
    material: '22K Gold',
    description: 'An ornate cuff bracelet featuring intricate filigree work in 22K gold. Diamond accents highlight the floral pattern for a regal finish.',
    images: [product8],
  },
  {
    id: '8',
    name: 'Gentleman\'s Signet Ring',
    price: 16999,
    rating: 4.7,
    reviews: 29,
    category: 'rings',
    gender: 'men',
    material: '18K Gold',
    description: 'A bold signet ring in polished 18K gold with a matte-finish face. Classic masculinity meets modern design.',
    images: [mensRings],
    sizes: ['8', '9', '10', '11', '12'],
  },
  {
    id: '9',
    name: 'Silver Bar Pendant Chain',
    price: 12999,
    rating: 4.8,
    reviews: 52,
    category: 'chains',
    gender: 'men',
    material: 'Stainless Steel',
    description: 'A modern box chain featuring a sleek, minimalist rectangular bar pendant. Perfect for subtle, everyday wear.',
    images: [mensChain],
    sizes: ['20 inch', '22 inch', '24 inch'],
  },
  {
    id: '10',
    name: 'Diamond Stud Gift Set',
    price: 9999,
    originalPrice: 12999,
    rating: 4.9,
    reviews: 112,
    category: 'gifts',
    gender: 'unisex',
    material: '18K Gold with Diamond',
    description: 'A beautifully packaged gift set featuring diamond studs in 18K gold. Comes in a premium Lumeire gift box with a personalized note card.',
    images: [product2],
    badge: 'Gift Ready',
  },
  {
    id: '11',
    name: 'Layered Leather & Bead Bracelet',
    price: 8999,
    rating: 4.6,
    reviews: 38,
    category: 'bracelets',
    gender: 'men',
    material: 'Leather & Stone',
    description: 'A layered set featuring braided leather and black stone beads with subtle evil eye accents. Adds edge to any casual look.',
    images: [mensBracelet],
  },
  {
    id: '13',
    name: 'Geometric Pattern Cufflinks',
    price: 7499,
    rating: 4.9,
    reviews: 18,
    category: 'gifts',
    gender: 'men',
    material: 'Silver tone & Enamel',
    description: 'Sophisticated round cufflinks featuring a striking black and gold geometric star pattern. The perfect finishing touch for formal attire.',
    images: [mensCufflinks],
  },
  {
    id: '12',
    name: 'Pearl Drop Earrings',
    price: 7999,
    rating: 4.5,
    reviews: 61,
    category: 'earrings',
    gender: 'women',
    material: '18K Gold with Pearl',
    description: 'Elegant pearl drop earrings in 18K gold. The South Sea pearls add a timeless touch of sophistication.',
    images: [product6],
  },
];
