import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-charcoal text-cream">
      {/* Newsletter */}
      <div className="border-b border-charcoal-light">
        <div className="container mx-auto px-4 py-12 text-center">
          <h3 className="text-display text-2xl lg:text-3xl mb-2">Stay in Touch</h3>
          <p className="text-cream/60 text-sm font-body mb-6">Subscribe for exclusive offers and new arrivals</p>
          <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-charcoal-light px-4 py-3 rounded text-sm font-body text-cream placeholder:text-cream/40 focus:outline-none focus:ring-1 ring-gold border border-charcoal-light"
            />
            <button className="bg-gold-gradient text-charcoal px-6 py-3 rounded text-sm font-body tracking-wider uppercase font-semibold hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-display text-sm font-semibold mb-4 tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm font-body text-cream/60">
              <li><Link to="/" className="hover:text-gold transition-colors">About Lumeire</Link></li>
              <li><Link to="/" className="hover:text-gold transition-colors">Careers</Link></li>
              <li><Link to="/" className="hover:text-gold transition-colors">Sustainability</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-display text-sm font-semibold mb-4 tracking-wider">Customer Service</h4>
            <ul className="space-y-2 text-sm font-body text-cream/60">
              <li><Link to="/" className="hover:text-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-gold transition-colors">FAQs</Link></li>
              <li><Link to="/" className="hover:text-gold transition-colors">Shipping Policy</Link></li>
              <li><Link to="/" className="hover:text-gold transition-colors">Return Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-display text-sm font-semibold mb-4 tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm font-body text-cream/60">
              <li><Link to="/products/necklaces" className="hover:text-gold transition-colors">Women Jewelry</Link></li>
              <li><Link to="/products/rings" className="hover:text-gold transition-colors">Men Jewelry</Link></li>
              <li><Link to="/products/gifts" className="hover:text-gold transition-colors">Gifts</Link></li>
              <li><Link to="/" className="hover:text-gold transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-display text-sm font-semibold mb-4 tracking-wider">Follow Us</h4>
            <div className="flex gap-4 text-cream/60">
              <a href="#" className="hover:text-gold transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" className="hover:text-gold transition-colors" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" className="hover:text-gold transition-colors" aria-label="Pinterest">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a4 4 0 1 0 8 0c0-2.5-1.5-4.5-4-6-2.5 1.5-4 3.5-4 6z"/><path d="m9 17 1.5-5"/><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-charcoal-light">
        <div className="container mx-auto px-4 py-6 text-center text-xs text-cream/40 font-body">
          © 2026 Lumeire. All rights reserved. Crafted with love.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
