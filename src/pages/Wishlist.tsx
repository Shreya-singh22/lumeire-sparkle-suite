import { Link } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, toggleWishlist, moveToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <main className="pt-[calc(2rem+4rem)] lg:pt-[calc(2rem+5rem)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <h1 className="text-display text-2xl mb-2">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground text-sm font-body mb-6">Save your favorite pieces for later</p>
          <Link to="/" className="bg-primary text-primary-foreground px-8 py-3 rounded text-sm font-body tracking-wider uppercase font-semibold hover:opacity-90 transition-opacity">
            Explore Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[calc(2rem+4rem)] lg:pt-[calc(2rem+5rem)] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-display text-2xl lg:text-4xl mb-8">Wishlist ({wishlist.length})</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map(product => (
            <div key={product.id} className="flex gap-4 bg-card rounded p-4 shadow-luxury">
              <Link to={`/product/${product.id}`} className="w-24 h-24 flex-shrink-0 rounded overflow-hidden">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1">
                <Link to={`/product/${product.id}`} className="text-display text-sm font-semibold hover:text-primary transition-colors">
                  {product.name}
                </Link>
                <p className="text-sm font-body font-semibold mt-1">₹{product.price.toLocaleString()}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => moveToCart(product.id)}
                    className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 rounded text-xs font-body hover:opacity-90"
                  >
                    <ShoppingBag size={12} /> Move to Bag
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Wishlist;
