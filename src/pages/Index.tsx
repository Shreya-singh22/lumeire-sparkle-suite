import { Link } from 'react-router-dom';
import { Shield, Headphones, Truck, RotateCcw, Gem, ArrowRight } from 'lucide-react';
import modelBw from '@/assets/model-bw.jpg';
import modelColor from '@/assets/model-color.jpg';
import modelHand from '@/assets/model-hand.jpg';
import catNecklaces from '@/assets/cat-necklaces.jpg';
import catEarrings from '@/assets/cat-earrings.jpg';
import catRings from '@/assets/cat-rings.jpg';
import catGifts from '@/assets/cat-gifts.jpg';
import catBracelets from '@/assets/cat-bracelets.jpg';
import catNew from '@/assets/cat-new-arrivals.jpg';
import product1 from '@/assets/product-1.jpg';
import product6 from '@/assets/product-6.jpg';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useStore } from '@/context/StoreContext';

const categories = [
  { name: 'Necklaces', image: catNecklaces, path: '/products/necklaces' },
  { name: 'Earrings', image: catEarrings, path: '/products/earrings' },
  { name: 'Rings', image: catRings, path: '/products/rings' },
  { name: 'Gifts', image: catGifts, path: '/products/gifts' },
  { name: 'Bracelets', image: catBracelets, path: '/products/bracelets' },
  { name: 'New Arrivals', image: catNew, path: '/products/all' },
];

const features = [
  { icon: Shield, title: 'Anti-Tarnish', desc: 'Long-lasting shine guaranteed' },
  { icon: Headphones, title: '24/7 Support', desc: 'Always here for you' },
  { icon: Truck, title: 'Free Delivery', desc: 'On orders above ₹5,000' },
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
      {/* Editorial Hero Section */}
      <section className="relative bg-charcoal overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] lg:min-h-[90vh] items-center">
            {/* Left: Text Content */}
            <div className="relative z-10 py-12 lg:py-0 animate-fade-up">
              <p className="text-accent-font text-gold-light text-base lg:text-lg tracking-[0.3em] uppercase mb-4 italic">
                Welcome to our jewellery shop
              </p>
              <h1 className="text-display text-cream text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
                Choose Your<br />
                <span className="text-gold-gradient">Jewellery</span>
              </h1>
              <p className="text-cream/60 text-sm lg:text-base font-body mb-8 leading-relaxed max-w-md">
                Jewellery has been an integral part of human culture for centuries, serving as a symbol of status, wealth, and personal expression.
              </p>
              <Link
                to="/products/necklaces"
                className="inline-flex items-center gap-3 text-gold font-body text-sm tracking-[0.2em] uppercase group hover:gap-4 transition-all"
              >
                Discover more
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right: Editorial Photo Collage */}
            <div className="relative h-[500px] lg:h-[90vh] hidden md:block">
              {/* Main B&W model - large circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[440px] lg:w-[380px] lg:h-[500px] rounded-[200px] overflow-hidden border-2 border-charcoal-light shadow-luxury animate-fade-in">
                <img src={modelBw} alt="Model wearing Lumeire necklace" className="w-full h-full object-cover object-top" />
              </div>

              {/* Color model - right circle */}
              <div className="absolute top-[10%] right-0 lg:right-[-5%] w-[200px] h-[260px] lg:w-[220px] lg:h-[290px] rounded-[120px] overflow-hidden border-2 border-charcoal-light shadow-luxury animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <img src={modelColor} alt="Model wearing gold jewelry" className="w-full h-full object-cover object-top" />
              </div>

              {/* Hand/rings model - bottom left */}
              <div className="absolute bottom-[5%] left-0 lg:left-[-5%] w-[180px] h-[240px] lg:w-[200px] lg:h-[260px] rounded-[100px] overflow-hidden border-2 border-charcoal-light shadow-luxury animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <img src={modelHand} alt="Model wearing gold rings" className="w-full h-full object-cover" />
              </div>

              {/* Floating product image - top left */}
              <div className="absolute top-[15%] left-[5%] w-[90px] h-[90px] lg:w-[110px] lg:h-[110px] rounded-lg overflow-hidden border border-gold/30 shadow-luxury rotate-6 animate-scale-in" style={{ animationDelay: '0.6s' }}>
                <img src={product6} alt="Emerald earrings" className="w-full h-full object-cover" />
              </div>

              {/* Floating product image - bottom right */}
              <div className="absolute bottom-[15%] right-[10%] w-[90px] h-[90px] lg:w-[110px] lg:h-[110px] rounded-lg overflow-hidden border border-gold/30 shadow-luxury -rotate-3 animate-scale-in" style={{ animationDelay: '0.8s' }}>
                <img src={product1} alt="Diamond pendant" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Mobile hero image */}
            <div className="md:hidden relative h-[400px] -mx-4">
              <div className="absolute inset-0 flex items-center justify-center gap-3">
                <div className="w-[160px] h-[220px] rounded-[80px] overflow-hidden border border-charcoal-light">
                  <img src={modelBw} alt="Model" className="w-full h-full object-cover object-top" />
                </div>
                <div className="w-[140px] h-[190px] rounded-[70px] overflow-hidden border border-charcoal-light mt-12">
                  <img src={modelColor} alt="Model" className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shop buttons overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent py-8">
          <div className="container mx-auto px-4 flex justify-center gap-4">
            <Link
              to="/products/necklaces"
              onClick={() => setGender('women')}
              className="bg-gold-gradient text-charcoal px-8 py-3 rounded text-sm font-body tracking-wider uppercase font-semibold hover:opacity-90 transition-opacity"
            >
              Shop Women
            </Link>
            <Link
              to="/products/all"
              onClick={() => setGender('men')}
              className="border border-cream/40 text-cream px-8 py-3 rounded text-sm font-body tracking-wider uppercase hover:bg-cream/10 transition-colors"
            >
              Shop Men
            </Link>
          </div>
        </div>
      </section>

      {/* Category Circles */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <p className="text-accent-font text-primary text-sm tracking-[0.3em] uppercase text-center mb-2">Explore</p>
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
              to="/products/all"
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
