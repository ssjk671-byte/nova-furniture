import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onNavigateSection?: (sectionId: string) => void;
  onStartProject?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateSection, onStartProject }) => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    setSelectedCategory,
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, categoryName?: string) => {
    setMobileMenuOpen(false);
    if (categoryName) {
      setSelectedCategory(categoryName);
    }
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    if (onStartProject) {
      onStartProject();
    } else {
      const el = document.getElementById('product-catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full select-none">
      {/* Main Luxury Navigation Bar */}
      <nav
        aria-label="Primary"
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#FBF9F5]/98 backdrop-blur-md shadow-sm border-[#E5DDD0] py-3.5'
            : 'bg-[#FBF9F5] border-[#ECE4D8] py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Left: Clean Luxury Text Logo */}
          <div className="flex-1 flex items-center justify-start">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-[28px] font-bold tracking-[0.24em] text-[#1A1A1A] leading-none uppercase group-hover:text-[#8C6D46] transition-colors">
                  Nova
                </span>
                <span className="text-[9px] tracking-[0.42em] font-sans font-semibold text-[#7D766C] uppercase mt-1">
                  Atelier
                </span>
              </div>
            </a>
          </div>

          {/* Center: Clean High-End Navigation Links */}
          <div className="hidden lg:flex items-center justify-center gap-8 xl:gap-10 text-[13px] tracking-[0.18em] uppercase font-medium text-[#2E2A25]">
            <button
              onClick={() => handleNavClick('hero-top')}
              className="hover:text-[#1A1A1A] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#1A1A1A] hover:after:w-full after:transition-all cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('product-catalog', 'All')}
              className="hover:text-[#1A1A1A] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#1A1A1A] hover:after:w-full after:transition-all cursor-pointer"
            >
              Shop
            </button>
            <button
              onClick={() => handleNavClick('rooms-section')}
              className="hover:text-[#1A1A1A] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#1A1A1A] hover:after:w-full after:transition-all cursor-pointer"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('craftsmanship')}
              className="hover:text-[#1A1A1A] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#1A1A1A] hover:after:w-full after:transition-all cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('footer-contact')}
              className="hover:text-[#1A1A1A] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#1A1A1A] hover:after:w-full after:transition-all cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Right: Search, Wishlist, Cart Icons + Distinct CTA Button */}
          <div className="flex-1 flex items-center justify-end gap-2.5 sm:gap-3.5">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Catalog"
              className="p-2 sm:p-2.5 text-[#2E2A25] hover:text-[#1A1A1A] hover:bg-[#EFEAE2]/70 rounded-full transition-colors cursor-pointer"
              title="Search (⌘K)"
            >
              <Search className="w-5 h-5 stroke-[1.6]" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
              className="p-2 sm:p-2.5 text-[#2E2A25] hover:text-[#1A1A1A] hover:bg-[#EFEAE2]/70 rounded-full transition-colors relative cursor-pointer"
              title="Saved items"
            >
              <Heart className="w-5 h-5 stroke-[1.6]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C5A880] text-[#1A1A1A] text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon with Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="p-2 sm:p-2.5 text-[#2E2A25] hover:text-[#1A1A1A] hover:bg-[#EFEAE2]/70 rounded-full transition-colors relative cursor-pointer"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.6]" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#1A1A1A] text-[#FBF9F5] text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-xs">
                {cartCount}
              </span>
            </button>

            {/* Distinct CTA Button */}
            <button
              onClick={handleCtaClick}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-xs transition-all shadow-sm hover:shadow-md cursor-pointer ml-1 border border-[#1A1A1A]"
            >
              <span>Explore Studio</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 text-[#2E2A25] hover:text-[#1A1A1A] rounded-md transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] sm:top-[80px] bg-[#FBF9F5] border-b border-[#E8E2D7] shadow-2xl p-6 z-50 animate-fade-in">
          <div className="flex flex-col gap-4 text-sm font-medium uppercase tracking-wider text-[#2A2723]">
            <button
              onClick={() => handleNavClick('hero-top')}
              className="text-left py-2 border-b border-[#EFEAE2] flex items-center justify-between"
            >
              <span>Home</span>
              <ArrowRight className="w-4 h-4 text-[#8C8477]" />
            </button>
            <button
              onClick={() => handleNavClick('product-catalog', 'All')}
              className="text-left py-2 border-b border-[#EFEAE2] flex items-center justify-between"
            >
              <span>Shop</span>
              <ArrowRight className="w-4 h-4 text-[#8C8477]" />
            </button>
            <button
              onClick={() => handleNavClick('rooms-section')}
              className="text-left py-2 border-b border-[#EFEAE2] flex items-center justify-between"
            >
              <span>Collections</span>
              <ArrowRight className="w-4 h-4 text-[#8C8477]" />
            </button>
            <button
              onClick={() => handleNavClick('craftsmanship')}
              className="text-left py-2 border-b border-[#EFEAE2] flex items-center justify-between"
            >
              <span>About</span>
              <ArrowRight className="w-4 h-4 text-[#8C8477]" />
            </button>
            <button
              onClick={() => handleNavClick('footer-contact')}
              className="text-left py-2 border-b border-[#EFEAE2] flex items-center justify-between"
            >
              <span>Contact</span>
              <ArrowRight className="w-4 h-4 text-[#8C8477]" />
            </button>
          </div>

          <div className="mt-6">
            <button
              onClick={handleCtaClick}
              className="w-full py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 rounded-xs shadow-md"
            >
              <span>Explore Studio</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
