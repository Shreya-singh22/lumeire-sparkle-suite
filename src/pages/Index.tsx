import { Link } from 'react-router-dom';
import { Shield, Headphones, Truck, RotateCcw, Gem } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';
import catNecklaces from '@/assets/cat-necklaces.jpg';
import catEarrings from '@/assets/cat-earrings.jpg';
import catRings from '@/assets/cat-rings.jpg';
import catGifts from '@/assets/cat-gifts.jpg';
import catBracelets from '@/assets/cat-bracelets.jpg';
import catNew from '@/assets/cat-new-arrivals.jpg';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useStore } from '@/context/StoreContext';

const categories = [
  { name: 'Necklaces', image: catNecklaces, path: '/products/necklaces' },
  { name: 'Earrings', image: catEarrings, path: '/products/earrings' },
  { name: 'Rings', image: catRings, path: '/products/rings' },
  { name: 'Gifts', image: catGifts, path: '/products/gifts' },
  { name: 'Bracelets', image: catBracelets, path: '/products/bracelets' },
  { name: 'New Arrivals', image: catNew, path: '/products/necklaces' },
];

const features = [
  { icon: Shield, title: 'Anti-Tarnish Jewelry', desc: 'Long-lasting shine guaranteed' },
  { icon: Headphones, title: '24/7 Customer Support', desc: 'Always here for you' },
  { icon: Truck, title: 'Free Home Delivery', desc: 'On orders above ₹5,000' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '30-day hassle-free returns' },
  { icon: Gem, title: 'Premium Quality', desc: 'Certified materials only' },
];

const Index = () => {
  const { gender, setGender } = useStore();

  const featuredProducts = products
    .filter(p => p.gender === gender || p.gender === 'unisex')
    .slice(0, 8);

  return (
    <main className="pt-[calc(2rem+4rem)] lg:pt-[calc(2rem+5rem)]">
      {/* Hero */}
      <section className="relative h-[70vh] lg:h-[85vh] overflow-hidden">
        <img src={heroBanner} alt="Lumeire luxury jewelry collection" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-lg animate-fade-up">
              <p className="text-accent-font text-gold-light text-lg lg:text-xl tracking-[0.3em] uppercase mb-3">Timeless Elegance</p>
              <h1 className="text-display text-cream text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Jewelry That Tells Your Story
              </h1>
              <p className="text-cream/70 text-sm lg:text-base font-body mb-8 leading-relaxed">
                Discover our exquisite collection of handcrafted jewelry, designed to celebrate life's most precious moments.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/products/necklaces"
                  onClick={() => setGender('women')}
                  className="bg-gold-gradient text-charcoal px-8 py-3 rounded text-sm font-body tracking-wider uppercase font-semibold hover:opacity-90 transition-opacity"
                >
                  Shop Women
                </Link>
                <Link
                  to="/products/rings"
                  onClick={() => setGender('men')}
                  className="border border-cream/40 text-cream px-8 py-3 rounded text-sm font-body tracking-wider uppercase hover:bg-cream/10 transition-colors"
                >
                  Shop Men
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Circles */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-display text-2xl lg:text-3xl text-center mb-10">Shop by Category</h2>
          <div className="flex gap-6 lg:gap-10 overflow-x-auto pb-4 justify-start lg:justify-center scrollbar-hide">
            {categories.map(cat => (
              <Link key={cat.name} to={cat.path} className="flex flex-col items-center gap-3 flex-shrink-0 group">
                <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors shadow-luxury">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
                <span className="text-xs lg:text-sm font-body tracking-wider uppercase text-foreground/80 group-hover:text-primary transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-accent-font text-primary text-sm tracking-[0.3em] uppercase mb-2">Curated for You</p>
            <h2 className="text-display text-2xl lg:text-3xl">
              {gender === 'women' ? 'Best Sellers for Her' : 'Best Sellers for Him'}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/products/necklaces"
              className="inline-block border border-primary text-primary px-8 py-3 rounded text-sm font-body tracking-wider uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Features */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {features.map(feat => (
              <div key={feat.title} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <feat.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-display text-sm font-semibold mb-1">{feat.title}</h3>
                <p className="text-xs text-muted-foreground font-body">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
