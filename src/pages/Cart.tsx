import { Link } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useStore();
  const shipping = cartTotal >= 5000 ? 0 : 299;

  if (cart.length === 0) {
    return (
      <main className="pt-[calc(2rem+4rem)] lg:pt-[calc(2rem+5rem)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <h1 className="text-display text-2xl mb-2">Your Bag is Empty</h1>
          <p className="text-muted-foreground text-sm font-body mb-6">Discover our exquisite jewelry collection</p>
          <Link to="/" className="bg-primary text-primary-foreground px-8 py-3 rounded text-sm font-body tracking-wider uppercase font-semibold hover:opacity-90 transition-opacity">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[calc(2rem+4rem)] lg:pt-[calc(2rem+5rem)] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-display text-2xl lg:text-4xl mb-8">Shopping Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="flex gap-4 bg-card rounded p-4 shadow-luxury">
                <Link to={`/product/${item.product.id}`} className="w-24 h-24 flex-shrink-0 rounded overflow-hidden">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1">
                  <Link to={`/product/${item.product.id}`} className="text-display text-sm font-semibold hover:text-primary transition-colors">
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground font-body">{item.product.material}</p>
                  {item.size && <p className="text-xs text-muted-foreground font-body">Size: {item.size}</p>}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5"><Minus size={14} /></button>
                      <span className="px-3 text-xs font-body">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5"><Plus size={14} /></button>
                    </div>
                    <span className="text-sm font-body font-semibold">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors self-start">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-card rounded p-6 shadow-luxury h-fit sticky top-32">
            <h2 className="text-display text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm font-body border-b border-border pb-4 mb-4">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
            </div>
            <div className="flex justify-between text-lg font-semibold font-body mb-6">
              <span>Total</span><span>₹{(cartTotal + shipping).toLocaleString()}</span>
            </div>
            <Link
              to="/checkout"
              className="block w-full text-center bg-primary text-primary-foreground py-4 rounded text-sm font-body tracking-wider uppercase font-semibold hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
