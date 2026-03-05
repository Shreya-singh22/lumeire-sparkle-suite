import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Search } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <main className="pt-[calc(2rem+4rem)] lg:pt-[calc(2rem+5rem)] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Search size={24} className="text-muted-foreground" />
          <h1 className="text-display text-2xl lg:text-4xl">
            Results for "<span className="text-primary">{query}</span>"
          </h1>
        </div>

        {results.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground font-body mb-6">{results.length} products found</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {results.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-display text-xl mb-2">No results found</p>
            <p className="text-muted-foreground text-sm font-body">Try searching for necklaces, rings, earrings...</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchResults;
