import { useParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'newest';

const ProductListing = () => {
  const { category } = useParams<{ category: string }>();
  const { gender } = useStore();
  const [sort, setSort] = useState<SortOption>('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);

  const categoryTitle = category === 'all' ? 'All Products' : category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products';

  const filtered = useMemo(() => {
    let result = products.filter(p => p.gender === gender || p.gender === 'unisex');
    if (category && category !== 'all') {
      result = result.filter(p => p.category === category);
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0)); break;
      default: result.sort((a, b) => b.reviews - a.reviews);
    }
    return result;
  }, [category, gender, sort, priceRange]);

  return (
    <main className="pt-[calc(2rem+4rem)] lg:pt-[calc(2rem+5rem)] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <p className="text-xs text-muted-foreground font-body mb-6 tracking-wider">
          <Link to="/" className="hover:text-primary">Home</Link> / {categoryTitle}
        </p>

        {gender === 'men' && (
          <div className="bg-charcoal text-primary border border-primary/20 p-10 rounded-lg mb-8 text-center bg-[url('https://images.unsplash.com/photo-1610384467818-ee2b5ab86e2d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center relative overflow-hidden">
            <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm z-0"></div>
            <div className="relative z-10">
              <h2 className="text-display text-3xl font-bold mb-3 tracking-[0.2em] uppercase text-white shadow-sm">The Men's Collection</h2>
              <p className="font-body text-white/80 max-w-xl mx-auto text-sm tracking-wide">Bold, sophisticated, and meticulously crafted details.</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-display text-2xl lg:text-4xl">{categoryTitle}</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 text-sm font-body text-foreground/80 border border-border px-3 py-2 rounded"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="appearance-none bg-secondary text-sm font-body px-4 py-2 pr-8 rounded focus:outline-none focus:ring-1 ring-gold cursor-pointer"
              >
                <option value="popular">Best Sellers</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="newest">New Arrivals</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-56 flex-shrink-0`}>
            <div className="sticky top-32 space-y-6">
              <div>
                <h3 className="text-display text-sm font-semibold mb-3">Price Range</h3>
                <div className="space-y-2">
                  {[[0, 10000], [10000, 20000], [20000, 35000], [0, 50000]].map(([min, max]) => (
                    <button
                      key={`${min}-${max}`}
                      onClick={() => setPriceRange([min, max])}
                      className={`block w-full text-left text-sm font-body px-3 py-2 rounded transition-colors ${priceRange[0] === min && priceRange[1] === max ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-secondary'
                        }`}
                    >
                      {max === 50000 ? 'All Prices' : `₹${min.toLocaleString()} — ₹${max.toLocaleString()}`}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-display text-sm font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  {['all', gender === 'men' ? 'chains' : 'necklaces', 'earrings', 'rings', 'bracelets', 'gifts'].map(cat => (
                    <Link
                      key={cat}
                      to={`/products/${cat}`}
                      className={`block text-sm font-body px-3 py-2 rounded capitalize transition-colors ${category === cat ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-secondary'
                        }`}
                    >
                      {cat === 'all' ? 'All Products' : cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-body mb-4">{filtered.length} products</p>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-display text-xl mb-2">No products found</p>
                <p className="text-muted-foreground text-sm font-body">Try adjusting your filters or switching gender</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductListing;
