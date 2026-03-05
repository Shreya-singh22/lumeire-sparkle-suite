import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '@/data/products';

type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
};

type StoreContextType = {
  gender: 'women' | 'men';
  setGender: (g: 'women' | 'men') => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (productId: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (o: boolean) => void;
};

const StoreContext = createContext<StoreContextType | null>(null);

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gender, setGender] = useState<'women' | 'men'>('women');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const addToCart = useCallback((product: Product, quantity = 1, size?: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { product, quantity, size }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(i => i.product.id !== productId));
      return;
    }
    setCart(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
  }, []);

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist(prev => prev.find(p => p.id === product.id) ? prev.filter(p => p.id !== product.id) : [...prev, product]);
  }, []);

  const isInWishlist = useCallback((productId: string) => wishlist.some(p => p.id === productId), [wishlist]);

  const moveToCart = useCallback((productId: string) => {
    const product = wishlist.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      setWishlist(prev => prev.filter(p => p.id !== productId));
    }
  }, [wishlist, addToCart]);

  return (
    <StoreContext.Provider value={{
      gender, setGender, cart, addToCart, removeFromCart, updateQuantity,
      cartTotal, cartCount, wishlist, toggleWishlist, isInWishlist, moveToCart,
      searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen,
    }}>
      {children}
    </StoreContext.Provider>
  );
};
