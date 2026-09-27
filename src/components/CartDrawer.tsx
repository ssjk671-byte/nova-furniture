import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    shippingCost,
    taxAmount,
    discountAmount,
    orderTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen,
    setSelectedCategory,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ msg: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const result = applyPromoCode(promoInput);
    setPromoFeedback({ msg: result.message, error: !result.success });
    if (result.success) {
      setPromoInput('');
    }
  };

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleExploreShop = () => {
    setIsCartOpen(false);
    setSelectedCategory('All');
    const el = document.getElementById('product-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Slide-over Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-[#E2D8C8]">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8DFD1] flex items-center justify-between bg-[#F4EFEA]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#1A1A1A]" />
              <h2 className="font-serif text-xl font-semibold tracking-tight text-[#1A1A1A]">
                Your Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#5F584C] hover:text-[#1A1A1A] hover:bg-[#EAE3D6] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-[#EFEAE2] border-b border-[#E0D7C7] text-xs text-[#524B40]">
            <div className="flex items-center justify-between font-medium mb-1.5">
              {freeShippingRemaining > 0 ? (
                <span>
                  Add <strong className="text-[#1A1A1A] font-bold">${freeShippingRemaining}</strong> more for{' '}
                  <strong className="text-[#8C6D46]">Free White Glove Setup</strong>
                </span>
              ) : (
                <span className="text-[#2E6B47] flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Unlocked: Complimentary White-Glove In-Home Delivery!
                </span>
              )}
              <span className="font-mono text-[11px] text-[#7A7265]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#DDD5C7] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1A1A1A] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#EFE8DD]">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#EFEAE2] flex items-center justify-center text-[#7F776B] mb-4">
                  <ShoppingBag className="w-7 h-7 stroke-[1.4]" />
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#1A1A1A] mb-2">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#6F6759] max-w-xs mb-6 font-light">
                  Discover our architectural living room sectionals, oak dining collections, and sculpted lounge seating.
                </p>
                <button
                  onClick={handleExploreShop}
                  className="px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors"
                >
                  Explore Featured Furniture
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}`} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#EDE7DD] rounded-xs overflow-hidden shrink-0 border border-[#E0D7C9]">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-semibold text-[#1A1A1A] leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          className="text-[#999082] hover:text-[#B33927] transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#7A7264] mt-0.5">
                        Finish / Color: <span className="font-medium text-[#1A1A1A]">{item.selectedColor}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D5CDBD] rounded-xs bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)}
                          className="p-1 hover:bg-[#F4EFEA] text-[#554E43] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-medium text-[#1A1A1A] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)}
                          className="p-1 hover:bg-[#F4EFEA] text-[#554E43] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="font-sans text-sm font-bold text-[#1A1A1A] tabular-nums">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#F4EFEA] border-t border-[#E2D8C8]">
              {/* Promo Code Input */}
              <div className="mb-4">
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-[#EAE2D4] px-3 py-2 rounded-xs border border-[#D7CCBC] text-xs">
                    <div className="flex items-center gap-2 text-[#2E6B47] font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      <span>
                        Promo Code: <strong>{appliedPromo}</strong> (-${discountAmount})
                      </span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-[#877D6E] hover:text-[#1A1A1A] text-[11px] underline font-sans"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. WELCOME10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-white border border-[#D5CDBD] text-xs px-3 py-2 rounded-xs uppercase tracking-wider text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#2D2A26] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#1A1A1A] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoFeedback && (
                  <p
                    className={`text-[11px] mt-1.5 ${
                      promoFeedback.error ? 'text-[#B33927]' : 'text-[#2E6B47]'
                    }`}
                  >
                    {promoFeedback.msg}
                  </p>
                )}
              </div>

              {/* Price Calculation Lines */}
              <div className="space-y-1.5 text-xs text-[#5A5348] mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1A1A1A] tabular-nums">
                    ${cartSubtotal.toLocaleString()}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E6B47]">
                    <span>Promotional Savings</span>
                    <span className="font-semibold tabular-nums">-${discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Shipping & Assembly</span>
                  <span className="tabular-nums">
                    {shippingCost === 0 ? (
                      <span className="text-[#2E6B47] font-semibold uppercase text-[10px]">Free</span>
                    ) : (
                      `$${shippingCost}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Sales Tax</span>
                  <span className="tabular-nums">${taxAmount.toLocaleString()}</span>
                </div>
                <div className="border-t border-[#DED4C4] pt-2 flex justify-between text-sm font-bold text-[#1A1A1A]">
                  <span>Total Due</span>
                  <span className="tabular-nums text-base">${orderTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#1A1A1A] text-white text-xs sm:text-[13px] font-semibold tracking-widest uppercase hover:bg-[#333333] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[#7A7264]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Encrypted 256-Bit SSL Checkout · 100-Day Return Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
