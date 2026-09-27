import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const WishlistModal: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    openQuickView,
    setSelectedCategory,
  } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  const handleExplore = () => {
    setIsWishlistOpen(false);
    setSelectedCategory('All');
    const el = document.getElementById('product-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-[#E2D8C8]">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8DFD1] flex items-center justify-between bg-[#F4EFEA]">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[#8C6D46] fill-[#8C6D46]" />
              <h2 className="font-serif text-xl font-semibold tracking-tight text-[#1A1A1A]">
                Saved Favorites ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-[#5F584C] hover:text-[#1A1A1A] hover:bg-[#EAE3D6] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#EFE8DD]">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#EFEAE2] flex items-center justify-center text-[#7F776B] mb-4">
                  <Heart className="w-7 h-7 stroke-[1.4]" />
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#1A1A1A] mb-2">
                  No saved items yet
                </h3>
                <p className="text-xs text-[#6F6759] max-w-xs mb-6 font-light">
                  Tap the heart icon on any sofa, dining table, or chair to create your personalized wishlist.
                </p>
                <button
                  onClick={handleExplore}
                  className="px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors"
                >
                  Browse Furniture Catalog
                </button>
              </div>
            ) : (
              wishlistedProducts.map((p) => (
                <div key={p.id} className="py-4 flex gap-4">
                  <div
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openQuickView(p);
                    }}
                    className="w-20 h-20 bg-[#EDE7DD] rounded-xs overflow-hidden shrink-0 border border-[#E0D7C9] cursor-pointer"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            openQuickView(p);
                          }}
                          className="font-serif text-sm font-semibold text-[#1A1A1A] hover:text-[#8C6D46] cursor-pointer"
                        >
                          {p.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(p)}
                          className="text-[#999082] hover:text-[#B33927] p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-bold text-[#1A1A1A] tabular-nums mt-1">
                        ${p.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => handleMoveToCart(p)}
                        className="flex-1 py-1.5 px-3 bg-[#1A1A1A] text-white text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-[#333333] transition-colors rounded-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-6 bg-[#F4EFEA] border-t border-[#E2D8C8]">
              <button
                onClick={() => {
                  wishlistedProducts.forEach((p) => addToCart(p, 1));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
              >
                <span>Add All Items to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
