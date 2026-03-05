import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/data/products';
import { useStore } from '@/context/StoreContext';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group relative bg-card rounded overflow-hidden shadow-luxury hover:shadow-xl transition-all duration-300">
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-[10px] uppercase tracking-wider px-2 py-1 rounded font-body font-semibold">
          {product.badge}
        </span>
      )}

      {/* Wishlist */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
        aria-label="Toggle wishlist"
      >
        <Heart size={16} className={wishlisted ? 'fill-primary text-primary' : 'text-foreground/60'} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-display text-sm font-semibold mb-1 text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground font-body mb-2">{product.material}</p>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground/30'} />
          ))}
          <span className="text-[10px] text-muted-foreground font-body ml-1">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold font-body text-card-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through font-body">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="p-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
            aria-label="Add to bag"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
