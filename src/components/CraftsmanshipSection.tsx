import React from 'react';
import { Trees, Hammer, Sparkles, Truck, Award, Shield } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  const standards = [
    {
      icon: Trees,
      title: 'Certified Sustainable Timber',
      desc: '100% of our European white oak and American walnut is certified by the Forest Stewardship Council (FSC), harvested from regeneratively managed family estates.',
    },
    {
      icon: Hammer,
      title: 'Interlocking Mortise Joinery',
      desc: 'Instead of cheap staples and synthetic glues, our frames rely on traditional precision joinery, engineered to withstand decades of gatherings and relocations.',
    },
    {
      icon: Sparkles,
      title: 'Zero-VOC Natural Finishes',
      desc: 'Finished exclusively with organic plant-based hardwax oils that preserve wood grain breathability while remaining non-toxic for children and companion animals.',
    },
    {
      icon: Truck,
      title: 'White-Glove In-Home Placement',
      desc: 'Two-person specialist delivery team brings your furniture into the room of your choice, completely uncrates, inspects, levels, and removes all packing materials.',
    },
  ];

  return (
    <section id="craftsmanship" className="py-16 sm:py-24 bg-[#FBF9F5] border-t border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-[1px] bg-[#C5A880]"></span>
            <span className="text-[11px] font-sans uppercase font-bold tracking-[0.25em] text-[#8C8272]">
              The Nova Standard
            </span>
            <span className="w-5 h-[1px] bg-[#C5A880]"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A] mb-4">
            Uncompromising Quality, Honest Craft
          </h2>
          <p className="text-sm sm:text-base text-[#615B51] font-light leading-relaxed">
            Every dining table, sectional, and accent chair is created in small, deliberate batches by master artisans with decades of furniture-making heritage.
          </p>
        </div>

        {/* 4 Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {standards.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-[#F4EFEA] p-7 rounded-xs border border-[#E5DDD0] flex flex-col justify-between group hover:border-[#C5A880] transition-colors duration-200"
              >
                <div>
                  <div className="w-12 h-12 rounded-xs bg-[#EAE3D6] text-[#1A1A1A] flex items-center justify-center mb-5 group-hover:bg-[#1A1A1A] group-hover:text-[#FBF9F5] transition-colors">
                    <Icon className="w-6 h-6 stroke-[1.6]" />
                  </div>
                  <h3 className="font-serif text-xl font-medium tracking-tight text-[#1A1A1A] mb-2.5">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#635C52] font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DFD7CA] flex items-center justify-between text-[11px] font-mono text-[#8C8375]">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="uppercase tracking-wider">Certified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-[#1A1A1A] text-[#FBF9F5] p-6 sm:p-8 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#C5A880] flex items-center justify-center text-[#C5A880] shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-xl font-medium">100-Day In-Home Trial & Free Returns</h4>
              <p className="text-xs text-[#A8A196] font-light mt-0.5">
                Experience Nova pieces in your natural daylight. If it does not transform your space, we pick it up with zero return fees.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider">
            <span className="text-[#C5A880]">100% Risk Free</span>
          </div>
        </div>
      </div>
    </section>
  );
};
