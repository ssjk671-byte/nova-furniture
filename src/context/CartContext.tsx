import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, CustomerInfo } from '../types';
import { PRODUCTS } from '../data/products';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string) => void;
  removeFromCart: (productId: string, color: string) => void;
  updateQuantity: (productId: string, color: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  orderTotal: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  orders: Order[];
  placeOrder: (customer: CustomerInfo, deliveryMethod: string, paymentMethod: string) => Order;
  lastPlacedOrder: Order | null;
  toast: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Pre-populate with 1 high quality item for instant rich visualization if desired, or empty.
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedColor: PRODUCTS[0].colors[0].name,
    },
  ]);

  const [wishlist, setWishlist] = useState<string[]>([PRODUCTS[2].id]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>('WELCOME10');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [toast, setToast] = useState<string | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'NV-84920',
      date: 'Sep 21, 2026',
      items: [
        {
          product: PRODUCTS[2],
          quantity: 1,
          selectedColor: 'Caramel Saddle',
        },
      ],
      customer: {
        firstName: 'Elena',
        lastName: 'Rostova',
        email: 'elena.rostova@design.com',
        phone: '+1 (415) 890-2194',
        address: '450 Sutter St, Suite 1200',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94108',
        country: 'United States',
      },
      subtotal: 890,
      discount: 89,
      shipping: 0,
      tax: 64.08,
      total: 865.08,
      deliveryMethod: 'White Glove In-Home Delivery & Assembly',
      paymentMethod: 'Apple Pay (ending in 8192)',
      status: 'Delivered',
      estimatedDelivery: 'Sep 25, 2026',
    },
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const addToCart = (product: Product, quantity = 1, color?: string) => {
    const chosenColor = color || (product.colors[0]?.name ?? 'Standard');
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === chosenColor
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedColor: chosenColor }];
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const removeFromCart = (productId: string, color: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedColor === color))
    );
  };

  const updateQuantity = (productId: string, color: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId, color);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor === color) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed from wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved to wishlist`);
        return [...prev, product.id];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setAppliedPromo('WELCOME10');
      return { success: true, message: '10% discount applied to your entire order!' };
    }
    if (clean === 'NOVA50') {
      setAppliedPromo('NOVA50');
      return { success: true, message: '$50 designer credit applied!' };
    }
    return { success: false, message: 'Invalid promotional code. Try WELCOME10' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Financial calculations
  const freeShippingThreshold = 500;
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  let discountAmount = 0;
  if (appliedPromo === 'WELCOME10') {
    discountAmount = Math.round(cartSubtotal * 0.1);
  } else if (appliedPromo === 'NOVA50') {
    discountAmount = Math.min(cartSubtotal, 50);
  }

  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shippingCost = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 120;
  const taxableAmount = Math.max(0, cartSubtotal - discountAmount);
  const taxAmount = Math.round(taxableAmount * 0.075 * 100) / 100;
  const orderTotal = Math.round((taxableAmount + shippingCost + taxAmount) * 100) / 100;

  const placeOrder = (
    customer: CustomerInfo,
    deliveryMethod: string,
    paymentMethod: string
  ): Order => {
    const newOrder: Order = {
      id: `NV-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cartItems],
      customer,
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingCost,
      tax: taxAmount,
      total: orderTotal,
      deliveryMethod,
      paymentMethod,
      status: 'Confirmed',
      estimatedDelivery: 'Oct 4, 2026',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  // Keyboard shortcut listener for Search (Cmd+K / Ctrl+K) and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsSearchOpen(false);
        setIsAccountOpen(false);
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingCost,
        taxAmount,
        discountAmount,
        orderTotal,
        freeShippingThreshold,
        freeShippingRemaining,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isSearchOpen,
        setIsSearchOpen,
        isAccountOpen,
        setIsAccountOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedCategory,
        setSelectedCategory,
        orders,
        placeOrder,
        lastPlacedOrder,
        toast,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
