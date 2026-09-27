import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PROMO_IMAGE } from '../data/products';

interface PromotionalBannerProps {
  onDiscoverClick: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ onDiscoverClick }) => {
  return (
    <section id="promotional-banner" className="py-12 sm:py-16 bg-[#F4EFEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-xs border border-[#E0D7C9] bg-[#EFEAE2] shadow-sm">
          {/* Left Text Column */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[1.5px] bg-[#C5A880]"></span>
              <span className="text-[11px] font-sans uppercase font-bold tracking-[0.25em] text-[#7A7061]">
                Crafted for Generations
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1A1A] leading-[1.12] mb-5 text-balance">
              Made to Comfort, Built for Real Life.
            </h2>

            <p className="text-base text-[#575046] font-light leading-relaxed mb-8 max-w-lg">
              We reject disposable furniture. Each piece is engineered using time-tested mortise-and-tenon joints, FSC-certified hardwoods, and spill-resistant natural textiles that celebrate the beautiful patina of daily living.
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs text-[#4A4339]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C6D46] shrink-0" />
                <span>Zero-VOC organic plant wax oils</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C6D46] shrink-0" />
                <span>10-year structural frame guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C6D46] shrink-0" />
                <span>Belgian stain-resistant bouclé</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C6D46] shrink-0" />
                <span>Free in-home packaging removal</span>
              </div>
            </div>

            {/* Call to action */}
            <div>
              <button
                onClick={onDiscoverClick}
                className="group px-8 py-4 bg-[#1A1A1A] text-white text-xs sm:text-[13px] font-semibold tracking-widest uppercase hover:bg-[#333333] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-md hover:shadow-lg"
              >
                <span>Discover Our Craft</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-[500px] overflow-hidden bg-[#DDD5C7]">
            <img
              src={PROMO_IMAGE}
              alt="Elena deep lounge armchair in olive velvet with walnut side table"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Floating Tag */}
            <div className="absolute bottom-6 right-6 bg-[#1A1A1A]/85 backdrop-blur-sm px-4 py-2.5 rounded-xs text-white">
              <p className="text-[10px] uppercase tracking-widest text-[#D3C7B5] font-mono">Featured Pairing</p>
              <p className="font-serif text-sm font-medium">Elena Olive Armchair · $1,120</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
