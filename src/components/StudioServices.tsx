import React from 'react';
import { Compass, Sparkles, Ruler, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface StudioServicesProps {
  onStartProject: () => void;
}

export const StudioServices: React.FC<StudioServicesProps> = ({ onStartProject }) => {
  const services = [
    {
      title: 'Full Residential Architecture & Interior Curation',
      desc: 'End-to-end space planning, material palette sourcing, 3D photorealistic renderings, and complete bespoke furniture commissioning for premier private estates.',
      tag: 'Comprehensive',
    },
    {
      title: 'Custom Millwork & Atelier Furniture Crafting',
      desc: 'Bespoke dining tables, low-profile bed platforms, and integrated credenzas sculpted to your precise architectural dimensions in our European workshops.',
      tag: 'Handcrafted',
    },
    {
      title: 'Commercial, Hospitality & Boutique Spaces',
      desc: 'Acoustic lounge design, executive private suites, and boutique hotel environments balancing Scandinavian serenity with commercial-grade endurance.',
      tag: 'Boutique',
    },
  ];

  return (
    <section id="services-section" className="py-16 sm:py-24 bg-[#F4EFEA] border-t border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#E0D7C8] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[1.5px] bg-[#C5A880]"></span>
              <span className="text-[11px] font-sans uppercase font-bold tracking-[0.25em] text-[#8C8272]">
                Interior Architecture Studio
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A]">
              Bespoke Interior Design Services
            </h2>
          </div>

          <button
            onClick={onStartProject}
            className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-sm w-fit"
          >
            <span>Request Studio Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xs border border-[#E2D8C8] hover:border-[#C5A880] transition-all flex flex-col justify-between shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C8272]">
                    Service 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#F2EDE5] text-[#1A1A1A] px-2 py-0.5 rounded-xs">
                    {srv.tag}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] mb-3 group-hover:text-[#8C6D46] transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#635C52] font-light leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F0EAE0] flex items-center justify-between">
                <span className="text-xs font-medium text-[#7D766A]">Complimentary Design Phase</span>
                <button
                  onClick={onStartProject}
                  className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] group-hover:text-[#8C6D46] flex items-center gap-1 cursor-pointer"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
