import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { ROOM_CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';

export const RoomShowcase: React.FC = () => {
  const { setSelectedCategory } = useCart();

  const handleRoomClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="rooms-section" className="py-16 sm:py-20 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4 border-b border-[#EAE3D6] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-4 h-[1px] bg-[#C5A880]"></span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C8272]">
                Curated Spaces
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A]">
              Find Furniture for Every Room
            </h2>
          </div>

          <button
            onClick={() => handleRoomClick('All')}
            className="group inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold tracking-widest uppercase text-[#1A1A1A] hover:text-[#C5A880] transition-colors cursor-pointer"
          >
            <span>View All Rooms</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 5-Card Room Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {ROOM_CATEGORIES.map((room) => (
            <div
              key={room.id}
              onClick={() => handleRoomClick(room.name === 'Lighting & Decor' ? 'Lighting' : room.name)}
              className="group relative cursor-pointer flex flex-col overflow-hidden bg-[#F2EDE5] rounded-sm transition-all duration-300 hover:shadow-md border border-[#E8DFD1]"
            >
              {/* Image with zoom effect */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E7E0D3]">
                <img
                  src={room.image}
                  alt={`${room.name} styled furniture collection`}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity group-hover:opacity-75" />

                {/* Badge Overlay */}
                <div className="absolute top-3 right-3">
                  <span className="bg-[#1A1A1A]/85 backdrop-blur-xs text-[#EAE4D9] text-[10px] tracking-wider uppercase font-medium px-2 py-0.5 rounded-xs">
                    {room.itemCount} Items
                  </span>
                </div>

                {/* Bottom Content within Image */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h3 className="font-serif text-lg sm:text-xl font-medium tracking-tight text-white mb-0.5">
                    {room.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] font-sans text-[#E0D8CB] font-light tracking-wide opacity-90 group-hover:text-white group-hover:opacity-100 transition-opacity">
                    <span>Explore Space</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
