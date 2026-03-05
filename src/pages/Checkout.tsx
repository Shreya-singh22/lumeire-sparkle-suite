import { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

type Step = 1 | 2 | 3;

const Checkout = () => {
  const { cart, cartTotal } = useStore();
  const shipping = cartTotal >= 5000 ? 0 : 299;
  const [step, setStep] = useState<Step>(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', postal: '', payment: 'card' });

  if (cart.length === 0 && !orderPlaced) {
    return (
      <main className="pt-[calc(2rem+4rem)] lg:pt-[calc(2rem+5rem)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display text-2xl mb-2">Nothing to Checkout</h1>
          <Link to="/" className="text-primary text-sm font-body underline">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="pt-[calc(2rem+4rem)] lg:pt-[calc(2rem+5rem)] min-h-screen flex items-center justify-center">
        <div className="text-center animate-scale-in">
          <CheckCircle size={64} className="mx-auto text-primary mb-4" />
          <h1 className="text-display text-3xl mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground font-body mb-6">Thank you for shopping with Lumeire</p>
          <Link to="/" className="bg-primary text-primary-foreground px-8 py-3 rounded text-sm font-body tracking-wider uppercase font-semibold hover:opacity-90 transition-opacity">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const inputClass = "w-full bg-secondary px-4 py-3 rounded text-sm font-body focus:outline-none focus:ring-1 ring-gold text-foreground placeholder:text-muted-foreground";

  return (
    <main className="pt-[calc(2rem+4rem)] lg:pt-[calc(2rem+5rem)] min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-display text-2xl lg:text-4xl mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-10">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-semibold ${
                step >= s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
              }`}>{s}</div>
              <span className="hidden sm:block text-xs font-body uppercase tracking-wider text-muted-foreground">
                {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
              </span>
              {s < 3 && <div className="w-8 lg:w-16 h-px bg-border" />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-display text-lg font-semibold mb-4">Shipping Address</h2>
            <input className={inputClass} placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <input className={inputClass} placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            <input className={inputClass} placeholder="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <input className={inputClass} placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
              <input className={inputClass} placeholder="Postal Code" value={form.postal} onChange={e => setForm({...form, postal: e.target.value})} />
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-primary text-primary-foreground py-4 rounded text-sm font-body tracking-wider uppercase font-semibold hover:opacity-90 transition-opacity mt-4">
              Continue to Payment
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-display text-lg font-semibold mb-4">Payment Method</h2>
            {[
              { value: 'card', label: 'Credit / Debit Card' },
              { value: 'upi', label: 'UPI' },
              { value: 'cod', label: 'Cash on Delivery' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setForm({...form, payment: opt.value})}
                className={`w-full text-left px-4 py-4 rounded border transition-colors font-body text-sm ${
                  form.payment === opt.value ? 'border-primary bg-primary/10 text-foreground' : 'border-border text-foreground/70 hover:border-primary/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
            <div className="flex gap-3 mt-4">
              <button onClick={() => setStep(1)} className="flex-1 border border-border py-4 rounded text-sm font-body tracking-wider uppercase hover:bg-secondary transition-colors">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 bg-primary text-primary-foreground py-4 rounded text-sm font-body tracking-wider uppercase font-semibold hover:opacity-90">Review Order</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-display text-lg font-semibold">Order Summary</h2>
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm font-body">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>₹{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm font-body">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
              <div className="flex justify-between text-lg font-semibold pt-2"><span>Total</span><span>₹{(cartTotal + shipping).toLocaleString()}</span></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 border border-border py-4 rounded text-sm font-body tracking-wider uppercase hover:bg-secondary transition-colors">Back</button>
              <button onClick={() => setOrderPlaced(true)} className="flex-1 bg-gold-gradient text-charcoal py-4 rounded text-sm font-body tracking-wider uppercase font-semibold hover:opacity-90">
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Checkout;
