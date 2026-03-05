import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { products } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';
import { Heart, Star, Minus, Plus, ShoppingBag, ChevronRight } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

  if (!product) {
    return (
      <main className="pt-[calc(2rem+4rem)] lg:pt-[calc(2rem+5rem)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display text-2xl mb-2">Product Not Found</h1>
          <Link to="/" className="text-primary text-sm font-body underline">Back to Home</Link>
        </div>
      </main>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="pt-[calc(2rem+4rem)] lg:pt-[calc(2rem+5rem)] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={12} />
          <Link to={`/products/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div>
            <div className="aspect-square rounded overflow-hidden mb-4 bg-card">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-primary' : 'border-border'
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.badge && (
              <span className="inline-block bg-primary/10 text-primary text-xs uppercase tracking-wider px-3 py-1 rounded font-body font-semibold mb-4">
                {product.badge}
              </span>
            )}
            <h1 className="text-display text-2xl lg:text-4xl font-bold mb-3">{product.name}</h1>
            <p className="text-sm text-muted-foreground font-body mb-4">{product.material}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground/30'} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-body">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-display text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through font-body">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="bg-destructive/10 text-destructive text-xs px-2 py-1 rounded font-body font-semibold">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Size */}
            {product.sizes && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold font-body mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border text-sm font-body transition-colors ${selectedSize === size ? 'border-primary bg-primary/10 text-primary' : 'border-border text-foreground/70 hover:border-primary/50'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold font-body mb-3">Quantity</h3>
              <div className="flex items-center border border-border rounded w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-foreground/60 hover:text-foreground">
                  <Minus size={16} />
                </button>
                <span className="px-6 text-sm font-body font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-foreground/60 hover:text-foreground">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => addToCart(product, quantity, selectedSize)}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded text-sm font-body tracking-wider uppercase font-semibold hover:opacity-90 transition-opacity"
              >
                <ShoppingBag size={18} /> Add to Bag
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 rounded border transition-colors ${wishlisted ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                  }`}
                aria-label="Toggle wishlist"
              >
                <Heart size={20} className={wishlisted ? 'fill-primary text-primary' : 'text-foreground/60'} />
              </button>
            </div>

            {/* Description */}
            <div className="border-t border-border pt-6">
              <h3 className="text-display text-lg font-semibold mb-3">Description</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{product.description}</p>
            </div>

            {/* Reviews */}
            <div className="border-t border-border pt-6 mt-6">
              <h3 className="text-display text-lg font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {[
                  { name: 'Priya S.', rating: 5, text: 'Absolutely gorgeous! The craftsmanship is exceptional.' },
                  { name: 'Anika M.', rating: 4, text: 'Beautiful piece, arrived in premium packaging. Love it!' },
                ].map((review, i) => (
                  <div key={i} className="bg-secondary/50 rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} size={12} className={j < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'} />
                        ))}
                      </div>
                      <span className="text-sm font-body font-semibold">{review.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-body">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16 pt-8 border-t border-border">
            <h2 className="text-display text-2xl mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
