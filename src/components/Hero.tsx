import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onShopClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onExploreClick }) => {
  return (
    <section id="hero-top" className="relative w-full overflow-hidden bg-[#EFEAE2]">
      {/* Background Image Container */}
      <div className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">
        <img
          src={HERO_IMAGE}
          alt="Curated Scandinavian minimalist living room with Solis modular sectional and solid oak table"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.97]"
          referrerPolicy="no-referrer"
          loading="eager"
        />

        {/* Subtle architectural gradient scrim to guarantee text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FBF9F5]/92 via-[#FBF9F5]/75 to-transparent sm:w-2/3 lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/30 via-transparent to-transparent md:hidden" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 w-full">
          <div className="max-w-xl text-left">
            {/* Descriptive Kicker */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[1px] bg-[#C5A880]"></span>
              <span className="text-[12px] uppercase font-sans font-semibold tracking-[0.25em] text-[#7A7061]">
                Transform Your Living Space
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A] leading-[1.08] mb-5 text-balance">
              Furniture That Feels Like Home
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#554F46] font-light leading-relaxed mb-8 max-w-lg">
              Thoughtfully sculpted from sustainable European white oak, natural textured bouclé, and enduring materials designed to age with grace.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onShopClick}
                className="group px-8 py-4 bg-[#1A1A1A] text-white text-xs sm:text-[13px] font-semibold tracking-widest uppercase hover:bg-[#333333] transition-all duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreClick}
                className="px-7 py-4 bg-white/80 hover:bg-white text-[#1A1A1A] text-xs sm:text-[13px] font-semibold tracking-widest uppercase border border-[#D5CDBD] hover:border-[#1A1A1A] transition-all duration-200 flex items-center justify-center backdrop-blur-sm cursor-pointer"
              >
                <span>Explore Rooms</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-6 border-t border-[#DED7CA]/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-[#6D6559] text-[11px] font-medium tracking-wider uppercase">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>10-Yr Frame Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Free In-Home Setup</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>100% Solid Certified Wood</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
