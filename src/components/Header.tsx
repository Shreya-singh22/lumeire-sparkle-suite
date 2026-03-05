import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const Header = () => {
  const { gender, setGender, cartCount, wishlist, isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { name: gender === 'men' ? 'Chains' : 'Necklaces', path: gender === 'men' ? '/products/chains' : '/products/necklaces' },
    { name: 'Earrings', path: '/products/earrings' },
    { name: 'Rings', path: '/products/rings' },
    { name: 'Gifts', path: '/products/gifts' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-charcoal text-cream text-center py-1.5 text-xs tracking-[0.2em] uppercase font-body">
        Free Shipping on Orders Above ₹5,000
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-display text-2xl lg:text-3xl font-bold tracking-wider text-foreground">
            LUMEIRE
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={cat.path}
                className="text-sm tracking-[0.15em] uppercase text-foreground/80 hover:text-primary transition-colors font-body"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Gender Toggle + Icons */}
          <div className="flex items-center gap-3 lg:gap-5">
            {/* Gender Toggle */}
            <div className="hidden sm:flex items-center bg-secondary rounded-full p-0.5 text-xs">
              <button
                onClick={() => setGender('women')}
                className={`px-3 py-1 rounded-full transition-all font-body tracking-wider uppercase text-[10px] ${gender === 'women' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                  }`}
              >
                Women
              </button>
              <button
                onClick={() => setGender('men')}
                className={`px-3 py-1 rounded-full transition-all font-body tracking-wider uppercase text-[10px] ${gender === 'men' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                  }`}
              >
                Men
              </button>
            </div>

            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-foreground/80 hover:text-primary transition-colors" aria-label="Search">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="p-2 text-foreground/80 hover:text-primary transition-colors relative" aria-label="Wishlist">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-body">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="p-2 text-foreground/80 hover:text-primary transition-colors relative" aria-label="Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-body">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 animate-fade-in">
          <form onSubmit={handleSearch} className="container mx-auto max-w-xl flex gap-2">
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for jewelry..."
              className="flex-1 bg-secondary px-4 py-3 rounded text-sm font-body focus:outline-none focus:ring-2 ring-gold text-foreground placeholder:text-muted-foreground"
            />
            <button type="submit" className="bg-primary text-primary-foreground px-6 py-3 rounded text-sm font-body tracking-wider uppercase hover:opacity-90 transition-opacity">
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {/* Gender toggle mobile */}
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <button
                onClick={() => setGender('women')}
                className={`flex-1 py-2 rounded text-xs tracking-wider uppercase font-body ${gender === 'women' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                  }`}
              >
                Women
              </button>
              <button
                onClick={() => setGender('men')}
                className={`flex-1 py-2 rounded text-xs tracking-wider uppercase font-body ${gender === 'men' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                  }`}
              >
                Men
              </button>
            </div>
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={cat.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-[0.15em] uppercase text-foreground/80 hover:text-primary py-2 font-body"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
