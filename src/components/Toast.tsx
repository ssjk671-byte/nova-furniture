import React from 'react';
import { Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in pointer-events-none">
      <div className="bg-[#1A1A1A] text-white px-5 py-3 rounded-xs shadow-2xl border border-[#3A352F] flex items-center gap-3 text-xs font-medium tracking-wide">
        <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
        <span>{toast}</span>
      </div>
    </div>
  );
};
