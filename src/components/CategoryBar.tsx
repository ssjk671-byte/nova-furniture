import React from 'react';
import { Armchair, Utensils, BedDouble, Briefcase, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CategoryBarProps {
  onCategorySelect?: (categoryName: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({ onCategorySelect }) => {
  const { selectedCategory, setSelectedCategory } = useCart();

  const categories = [
    {
      id: 'Living Room',
      label: 'Living Room',
      desc: 'Modular Sofas & Lounges',
      icon: Armchair,
    },
    {
      id: 'Dining Room',
      label: 'Dining Room',
      desc: 'Solid Oak Tables & Chairs',
      icon: Utensils,
    },
    {
      id: 'Bedroom',
      label: 'Bedroom',
      desc: 'Platform Beds & Linen Storage',
      icon: BedDouble,
    },
    {
      id: 'Home Office',
      label: 'Home Office',
      desc: 'Architectural Desks & Seating',
      icon: Briefcase,
    },
  ];

  const handleSelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    if (onCategorySelect) {
      onCategorySelect(categoryName);
    } else {
      const el = document.getElementById('product-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="w-full bg-[#F4EFEA] border-y border-[#E6DECFA0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E2D8C8]">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`group py-6 px-4 sm:px-6 flex items-center gap-4 text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#EDE4D6] text-[#1A1A1A]'
                    : 'hover:bg-[#EBE2D4]/60 text-[#3A352F]'
                }`}
              >
                {/* Outlined Icon Box */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-200 ${
                    isSelected
                      ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#FBF9F5]'
                      : 'border-[#D1C5B3] bg-white/70 text-[#554D41] group-hover:border-[#1A1A1A] group-hover:text-[#1A1A1A]'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[1.6]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base sm:text-lg font-semibold tracking-normal text-[#1A1A1A] group-hover:text-black">
                      {cat.label}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A39786] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-[#7A7163] font-light truncate mt-0.5">
                    {cat.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
