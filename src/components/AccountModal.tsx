import React, { useState } from 'react';
import { X, Package, MapPin, User, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, orders } = useCart();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'showrooms'>('orders');

  if (!isAccountOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsAccountOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-2xl bg-[#FBF9F5] shadow-2xl rounded-xs overflow-hidden border border-[#DCD3C5] my-8 animate-fade-in text-[#1A1A1A]">
          {/* Header */}
          <div className="px-6 py-5 bg-[#F4EFEA] border-b border-[#E8DFD1] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <User className="w-5 h-5 text-[#1A1A1A]" />
              <h2 className="font-serif text-xl font-semibold tracking-tight text-[#1A1A1A]">
                Nova Client Portal
              </h2>
            </div>
            <button
              onClick={() => setIsAccountOpen(false)}
              className="p-1.5 text-[#5F584C] hover:text-[#1A1A1A] hover:bg-[#EAE3D6] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#E8DFD1] bg-[#EDE7DD] text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'orders' ? 'bg-[#FBF9F5] text-[#1A1A1A] border-b-2 border-[#1A1A1A]' : 'text-[#7D766A]'
              }`}
            >
              Order History ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'profile' ? 'bg-[#FBF9F5] text-[#1A1A1A] border-b-2 border-[#1A1A1A]' : 'text-[#7D766A]'
              }`}
            >
              Client Profile
            </button>
            <button
              onClick={() => setActiveTab('showrooms')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'showrooms' ? 'bg-[#FBF9F5] text-[#1A1A1A] border-b-2 border-[#1A1A1A]' : 'text-[#7D766A]'
              }`}
            >
              Showroom Locations
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 bg-white border border-[#E2D8C8] rounded-xs text-xs space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-[#F0EAE0] pb-2.5">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#C5A880]" />
                        <span className="font-mono font-bold text-[#1A1A1A]">{ord.id}</span>
                        <span className="text-[#877E71]">· {ord.date}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-xs font-semibold uppercase text-[10px] ${
                          ord.status === 'Delivered'
                            ? 'bg-[#E5F2EA] text-[#2E6B47]'
                            : 'bg-[#FFF3D6] text-[#8C6D1F]'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-[#1A1A1A] font-medium">
                            {item.quantity}x {item.product.name} ({item.selectedColor})
                          </span>
                          <span className="font-mono font-bold text-[#1A1A1A] tabular-nums">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#F0EAE0] flex items-center justify-between text-[#615A4F]">
                      <span>{ord.deliveryMethod}</span>
                      <span className="font-bold text-[#1A1A1A] tabular-nums">
                        Total: ${ord.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-white border border-[#E2D8C8] rounded-xs">
                  <h4 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-1">
                    Eleanor Vance
                  </h4>
                  <p className="text-[#6D6558]">Private Residential Client · Member since 2024</p>
                  <p className="text-[#6D6558] mt-1 font-mono">eleanor.vance@living.com · +1 (555) 234-8901</p>
                </div>

                <div className="p-4 bg-[#F2EDE5] border border-[#DDD5C7] rounded-xs">
                  <div className="flex items-center gap-2 mb-1 text-[#1A1A1A] font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                    <span>Nova Trade & Concierge Membership</span>
                  </div>
                  <p className="text-[#6B6356]">
                    You have unlocked direct priority atelier consultations, complimentary wood finish swatch books, and guaranteed white-glove booking windows.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'showrooms' && (
              <div className="space-y-3 text-xs">
                {[
                  {
                    city: 'New York Flagship',
                    address: '142 Wooster Street, SoHo, NY 10012',
                    hours: 'Mon - Sat: 10am - 7pm · Sun: 11am - 6pm',
                  },
                  {
                    city: 'San Francisco Atelier',
                    address: '450 Jackson Street, Jackson Square, SF 94111',
                    hours: 'Tue - Sat: 11am - 6pm',
                  },
                  {
                    city: 'London Design Studio',
                    address: '28 Chiltern Street, Marylebone, London W1U 7PR',
                    hours: 'Mon - Sat: 10am - 6pm',
                  },
                ].map((s) => (
                  <div key={s.city} className="p-3.5 bg-white border border-[#E2D8C8] rounded-xs">
                    <div className="flex items-center gap-1.5 font-serif text-base font-semibold text-[#1A1A1A]">
                      <MapPin className="w-4 h-4 text-[#C5A880]" />
                      <span>{s.city}</span>
                    </div>
                    <p className="text-[#665F53] mt-1">{s.address}</p>
                    <p className="text-[#8C8375] text-[11px] mt-0.5">{s.hours}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
