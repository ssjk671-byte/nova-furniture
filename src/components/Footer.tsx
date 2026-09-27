import React, { useState } from 'react';
import { ArrowRight, Mail, Instagram, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { showToast, setSelectedCategory, setIsAccountOpen } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! Check your inbox for $50 off your first bespoke order.');
    setEmail('');
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    const el = document.getElementById('product-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer-contact" className="bg-[#1A1A1A] text-[#E5DDD2] pt-16 pb-12 border-t border-[#292623]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Newsletter Bar */}
        <div className="border-b border-[#2C2925] pb-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <span className="text-[11px] font-mono tracking-widest text-[#C5A880] uppercase">
                The Nova Society
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">
                Receive $50 Toward Your First Order
              </h3>
              <p className="text-xs sm:text-sm text-[#A39A8D] mt-2 font-light max-w-md">
                Subscribe for private invitations to seasonal atelier collections, bespoke architectural releases, and interior design journal essays.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-4 bg-[#262420] border border-[#3D3830] rounded-xs flex items-center gap-3 text-sm text-[#E0D7C9]">
                  <CheckCircle2 className="w-5 h-5 text-[#C5A880] shrink-0" />
                  <span>Thank you for joining. Welcome gift code <strong>WELCOME10</strong> is active.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[#736B60] absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-[#262320] border border-[#3C3730] text-xs text-white placeholder-[#877E71] pl-10 pr-4 py-3 rounded-xs focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#FBF9F5] text-[#1A1A1A] hover:bg-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Multi-column Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2C2925] text-xs">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full border border-[#C5A880] flex items-center justify-center">
                <span className="font-serif text-sm font-semibold text-[#C5A880]">N</span>
              </div>
              <span className="font-serif text-xl tracking-[0.2em] font-medium text-white uppercase">
                Nova Furniture
              </span>
            </div>
            <p className="text-[#A39A8D] font-light leading-relaxed max-w-sm mb-6">
              Contemporary Scandinavian and European furniture crafted with solid FSC-certified hardwoods, non-toxic organic finishes, and architectural serenity.
            </p>
            <div className="text-[11px] text-[#80776A] space-y-1 font-mono">
              <p>Atelier: 142 Wooster St, New York, NY</p>
              <p>Studio Support: +1 (800) 555-NOVA</p>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-white mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-[#A39A8D]">
              <li>
                <button
                  onClick={() => handleCategoryClick('Living Room')}
                  className="hover:text-white transition-colors"
                >
                  Living Room Lounges
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Dining Room')}
                  className="hover:text-white transition-colors"
                >
                  Solid Oak Dining Tables
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Bedroom')}
                  className="hover:text-white transition-colors"
                >
                  Platform Beds & Storage
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Home Office')}
                  className="hover:text-white transition-colors"
                >
                  Architectural Desks
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Lighting')}
                  className="hover:text-white transition-colors"
                >
                  Natural Rattan Lighting
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-[#A39A8D]">
              <li>
                <a href="#craftsmanship" className="hover:text-white transition-colors">
                  White Glove Delivery & Setup
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-white transition-colors">
                  100-Day In-Home Trial
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-white transition-colors">
                  10-Year Frame Warranty
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsAccountOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Track Existing Order
                </button>
              </li>
              <li>
                <a href="tel:18005556682" className="hover:text-white transition-colors">
                  Schedule Design Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* About / Atelier */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-white mb-4">
              About Nova
            </h4>
            <ul className="space-y-2.5 text-[#A39A8D]">
              <li>
                <a href="#craftsmanship" className="hover:text-white transition-colors">
                  Our Sustainable Forestry
                </a>
              </li>
              <li>
                <a href="#promotional-banner" className="hover:text-white transition-colors">
                  Master Wood Joinery
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsAccountOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Trade & Architect Program
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAccountOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Flagship Showrooms
                </button>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-white transition-colors">
                  Sustainability Report 2026
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7163]">
          <p>© 2026 Nova Furniture Inc. All rights reserved. Crafted for enduring living spaces.</p>

          <div className="flex items-center gap-4 text-[11px] font-mono text-[#8C8375]">
            <span>VISA</span>
            <span>·</span>
            <span>MASTERCARD</span>
            <span>·</span>
            <span>AMEX</span>
            <span>·</span>
            <span>APPLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
