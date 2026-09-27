import React, { useState } from 'react';
import { X, Star, Heart, Check, Truck, ShieldCheck, ShoppingBag, Ruler, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'dimensions' | 'care'>('overview');
  const [justAdded, setJustAdded] = useState(false);

  if (!quickViewProduct) return null;

  const currentColor = selectedColor || quickViewProduct.colors[0]?.name || 'Standard';
  const isWishlisted = isInWishlist(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity, currentColor);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      closeQuickView();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative w-full max-w-4xl bg-[#FBF9F5] text-left shadow-2xl rounded-xs overflow-hidden border border-[#DDD5C7] my-8 animate-fade-in">
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 text-[#5E574B] hover:text-[#1A1A1A] hover:bg-[#EFEAE2] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="p-6 bg-[#F4EFEA] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5DDD0]">
              <div className="aspect-[4/3] rounded-xs overflow-hidden bg-[#ECE6DC] relative border border-[#DDD5C7]">
                <img
                  src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {quickViewProduct.tag && (
                  <span className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-xs">
                    {quickViewProduct.tag}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex gap-2.5 mt-4">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-[#1A1A1A] shadow-xs'
                          : 'border-[#D5CDBD] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Callouts */}
              <div className="mt-6 pt-4 border-t border-[#DFD7CA] grid grid-cols-2 gap-3 text-[11px] text-[#635B50]">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>White Glove In-Home Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>10-Year Frame Warranty</span>
                </div>
              </div>
            </div>

            {/* Product Details Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Category & Ratings */}
                <div className="flex items-center justify-between text-xs text-[#7F776B] mb-2">
                  <span className="uppercase tracking-widest font-semibold text-[10px] text-[#8C8375]">
                    {quickViewProduct.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                    <span className="font-semibold text-[#1A1A1A]">{quickViewProduct.rating}</span>
                    <span className="text-[#8F887C]">({quickViewProduct.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1A1A] mb-3">
                  {quickViewProduct.name}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-2xl font-bold text-[#1A1A1A] tabular-nums">
                    ${quickViewProduct.price.toLocaleString()}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-[#999082] line-through tabular-nums">
                      ${quickViewProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-[11px] uppercase tracking-wider text-[#2E6B47] font-semibold bg-[#E4EFE8] px-2 py-0.5 rounded-xs">
                    In Stock · Ships in 48 hrs
                  </span>
                </div>

                {/* Color Variant Selector */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A453E] mb-2.5">
                    Finish / Fabric: <span className="font-bold text-[#1A1A1A]">{currentColor}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {quickViewProduct.colors.map((c) => {
                      const isColorSelected = currentColor === c.name;
                      return (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`group flex items-center gap-2 px-3 py-1.5 rounded-xs border text-xs transition-all cursor-pointer ${
                            isColorSelected
                              ? 'border-[#1A1A1A] bg-white shadow-xs'
                              : 'border-[#D8CFBF] bg-[#F4EFEA] hover:border-[#1A1A1A]'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className="font-medium text-[#1A1A1A]">{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Information Tabs */}
                <div className="border-b border-[#E5DDD0] mb-4 flex gap-6 text-xs font-semibold uppercase tracking-wider">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'overview'
                        ? 'border-[#1A1A1A] text-[#1A1A1A]'
                        : 'border-transparent text-[#7F776B] hover:text-[#1A1A1A]'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('dimensions')}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'dimensions'
                        ? 'border-[#1A1A1A] text-[#1A1A1A]'
                        : 'border-transparent text-[#7F776B] hover:text-[#1A1A1A]'
                    }`}
                  >
                    Dimensions & Specs
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'care'
                        ? 'border-[#1A1A1A] text-[#1A1A1A]'
                        : 'border-transparent text-[#7F776B] hover:text-[#1A1A1A]'
                    }`}
                  >
                    Craft & Care
                  </button>
                </div>

                {/* Tab Content */}
                <div className="text-xs text-[#5D564B] leading-relaxed mb-6 min-h-[70px]">
                  {activeTab === 'overview' && (
                    <p className="font-light">{quickViewProduct.description}</p>
                  )}
                  {activeTab === 'dimensions' && (
                    <div className="space-y-1.5 font-light">
                      <p>
                        <strong className="text-[#1A1A1A] font-medium">Dimensions:</strong> {quickViewProduct.dimensions}
                      </p>
                      <p>
                        <strong className="text-[#1A1A1A] font-medium">Primary Materials:</strong> {quickViewProduct.materials}
                      </p>
                      <p>
                        <strong className="text-[#1A1A1A] font-medium">Box Weight:</strong> 64 - 145 lbs (delivered by 2 specialists)
                      </p>
                    </div>
                  )}
                  {activeTab === 'care' && (
                    <p className="font-light">
                      Dust routinely with a soft, lint-free cotton cloth. Treat spills immediately by blotting with an un-dyed absorbent towel. Finished with organic breathable waxes; do not use chemical ammonia or solvent-based aerosol sprays.
                    </p>
                  )}
                </div>
              </div>

              {/* Purchase Module: Quantity + Add To Cart + Wishlist */}
              <div className="pt-4 border-t border-[#EAE2D5] flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#D5CDBD] rounded-xs bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-3 hover:bg-[#F4EFEA] text-[#554E43] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono font-medium text-[#1A1A1A] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-3 hover:bg-[#F4EFEA] text-[#554E43] transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 text-xs sm:text-[13px] font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    justAdded
                      ? 'bg-[#2E6B47] text-white'
                      : 'bg-[#1A1A1A] hover:bg-[#333333] text-white'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · ${(quickViewProduct.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  aria-label="Wishlist toggle"
                  className={`p-3.5 rounded-xs border transition-colors ${
                    isWishlisted
                      ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#C5A880]'
                      : 'border-[#D5CDBD] bg-white text-[#4A453E] hover:border-[#1A1A1A]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A880]' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
