import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Star, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openQuickView, addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Bouclé Sectional',
    'Solid Oak Dining',
    'Sculptural Chair',
    'Belgian Linen Bed',
    'Credenza',
    'Rattan Pendant',
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (!searchTerm.trim()) return false;
    const q = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.materials.toLowerCase().includes(q)
    );
  });

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    openQuickView(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-start justify-center pt-16 sm:pt-24 px-4 pb-8">
        <div className="relative w-full max-w-2xl bg-[#FBF9F5] shadow-2xl rounded-xs overflow-hidden border border-[#DCD3C5] animate-fade-in">
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-[#E5DDD0] flex items-center gap-3 bg-white">
            <Search className="w-5 h-5 text-[#7A7264] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by collection, timber, or room (e.g., Oak, Bouclé, Dining)..."
              className="w-full text-sm sm:text-base bg-transparent text-[#1A1A1A] placeholder-[#9E9587] focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 text-[#8C8375] hover:text-[#1A1A1A]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-xs uppercase tracking-wider font-semibold text-[#665F53] hover:text-[#1A1A1A] px-2 py-1"
            >
              Esc
            </button>
          </div>

          {/* Quick Suggestion Pills */}
          <div className="px-5 py-3 bg-[#F4EFEA] border-b border-[#E5DDD0] flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A8173] shrink-0">
              Popular:
            </span>
            <div className="flex items-center gap-1.5 flex-nowrap">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="px-2.5 py-1 text-xs bg-white/80 hover:bg-white text-[#4A443A] rounded-xs border border-[#DFD6C8] hover:border-[#1A1A1A] transition-all whitespace-nowrap"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-5">
            {searchTerm.trim() === '' ? (
              <div className="py-8 text-center text-xs text-[#7F776A]">
                <p className="font-serif text-lg text-[#1A1A1A] mb-1">Explore Nova Collections</p>
                <p>Type keywords to search across handcrafted furniture, materials, and rooms.</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center">
                <p className="font-serif text-xl text-[#1A1A1A] mb-2">No matching pieces found</p>
                <p className="text-xs text-[#7A7163] max-w-sm mx-auto">
                  We could not find anything matching "{searchTerm}". Try searching for "Oak", "Sofa", "Dining", or "Lounge".
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-widest font-semibold text-[#8C8375] mb-2">
                  Matching Items ({filteredProducts.length})
                </p>
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p)}
                    className="p-3 bg-white hover:bg-[#F6F2EC] border border-[#E8DFD2] rounded-xs flex items-center justify-between gap-4 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xs overflow-hidden bg-[#ECE6DC] shrink-0 border border-[#DDD5C7]">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-[#8A8173]">
                            {p.category}
                          </span>
                          {p.tag && (
                            <span className="text-[9px] uppercase tracking-widest bg-[#1A1A1A] text-white px-1.5 py-0.2 rounded-xs">
                              {p.tag}
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-sm font-semibold text-[#1A1A1A] group-hover:text-[#8C6D46] transition-colors">
                          {p.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#6F675B] mt-0.5">
                          <span className="font-bold text-[#1A1A1A] tabular-nums">
                            ${p.price.toLocaleString()}
                          </span>
                          <span>·</span>
                          <span className="text-[11px]">{p.materials.split(',')[0]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p, 1);
                        }}
                        className="p-2 bg-[#F2EDE5] hover:bg-[#1A1A1A] hover:text-white rounded-xs text-[#1A1A1A] transition-colors"
                        title="Add directly to cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                      <ArrowRight className="w-4 h-4 text-[#A89E90] group-hover:text-[#1A1A1A] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
