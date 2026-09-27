import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, ChevronRight, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  sectionId?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  title = 'Our Favorites For Your Home',
  subtitle = 'Signature Handcrafted Essentials',
  sectionId = 'product-catalog',
}) => {
  const {
    addToCart,
    openQuickView,
    toggleWishlist,
    isInWishlist,
    selectedCategory,
    setSelectedCategory,
  } = useCart();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const categories = ['All', 'Living Room', 'Dining Room', 'Bedroom', 'Home Office', 'Lighting'];

  // Filter items
  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Sort items
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  // Display subset or all
  const displayedProducts = showAllProducts ? sortedProducts : sortedProducts.slice(0, 8);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 1500);
  };

  return (
    <section id={sectionId} className="py-16 sm:py-24 bg-[#FBF9F5] border-t border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[#EAE3D6] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-4 h-[1px] bg-[#C5A880]"></span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C8272]">
                {subtitle}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A]">
              {title}
            </h2>
          </div>

          {/* Action on Right */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAllProducts(!showAllProducts)}
              className="group inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold tracking-widest uppercase text-[#1A1A1A] hover:text-[#C5A880] transition-colors cursor-pointer"
            >
              <span>{showAllProducts ? 'Show Curated View' : `View All (${filteredProducts.length})`}</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Filter Tabs & Sorting Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs tracking-wider uppercase font-medium rounded-xs transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-[#F2EDE5] text-[#554F46] hover:bg-[#EAE2D5] hover:text-[#1A1A1A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-[#6A6357]">
            <span className="font-medium uppercase tracking-wider text-[11px]">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#F2EDE5] border border-[#DDD5C7] text-[#1A1A1A] text-xs py-1.5 px-3 rounded-xs focus:outline-none focus:border-[#1A1A1A] cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#F4EFEA] rounded-sm border border-[#E5DDD0]">
            <p className="font-serif text-xl text-[#1A1A1A] mb-2">No furniture items found in this category.</p>
            <p className="text-sm text-[#70685C] mb-6">Explore our other curated living or dining spaces.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {displayedProducts.map((product) => {
              const isWishlisted = isInWishlist(product.id);
              const isJustAdded = recentlyAddedId === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => openQuickView(product)}
                  className="group cursor-pointer flex flex-col bg-white border border-[#EAE3D6] hover:border-[#D5CBB9] transition-all duration-300 hover:shadow-lg rounded-xs overflow-hidden"
                >
                  {/* Image Container with Hover Actions */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3EFE9]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Tag Badge */}
                    {product.tag && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-[#1A1A1A] text-[#FBF9F5] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-xs">
                          {product.tag}
                        </span>
                      </div>
                    )}

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      aria-label="Save to Wishlist"
                      className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isWishlisted
                          ? 'bg-[#1A1A1A] text-[#C5A880] shadow-sm'
                          : 'bg-white/90 text-[#4A453E] hover:bg-white hover:text-[#1A1A1A] shadow-xs'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A880]' : 'stroke-[1.8]'}`}
                      />
                    </button>

                    {/* Quick Actions Hover Drawer at Bottom of Image */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-200 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openQuickView(product);
                        }}
                        className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-[#1A1A1A] text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>

                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`flex-1 py-2 px-3 text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                          isJustAdded
                            ? 'bg-[#2E6B47] text-white'
                            : 'bg-[#1A1A1A] hover:bg-[#333333] text-white'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Rating */}
                      <div className="flex items-center justify-between text-xs text-[#7F776B] mb-1">
                        <span className="text-[11px] uppercase tracking-wider font-medium">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-[11px]">
                          <Star className="w-3 h-3 fill-[#C5A880] text-[#C5A880]" />
                          <span className="font-semibold text-[#1A1A1A]">{product.rating}</span>
                          <span className="text-[#8F887C]">({product.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-serif text-lg font-semibold tracking-normal text-[#1A1A1A] group-hover:text-[#8C6D46] transition-colors leading-snug line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-[#6A6357] line-clamp-2 mt-1 font-light leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price & Color Swatches */}
                    <div className="mt-4 pt-3 border-t border-[#EFEAE2] flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-sans text-base font-bold text-[#1A1A1A] tabular-nums">
                          ${product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#9E9587] line-through tabular-nums">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Color Swatch Dots */}
                      <div className="flex items-center gap-1.5">
                        {product.colors.map((c) => (
                          <span
                            key={c.name}
                            title={c.name}
                            className="w-3 h-3 rounded-full border border-black/15 shrink-0"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
