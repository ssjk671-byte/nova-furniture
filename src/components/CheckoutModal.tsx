import React, { useState } from 'react';
import { X, CheckCircle, Truck, CreditCard, ShieldCheck, ArrowRight, ArrowLeft, Package, MapPin, Printer } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomerInfo, Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    cartSubtotal,
    discountAmount,
    shippingCost,
    taxAmount,
    orderTotal,
    placeOrder,
    lastPlacedOrder,
  } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [customer, setCustomer] = useState<CustomerInfo>({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@living.com',
    phone: '+1 (555) 234-8901',
    address: '742 Evergreen Terrace',
    apartment: 'Apt 4B',
    city: 'Portland',
    state: 'OR',
    postalCode: '97201',
    country: 'United States',
  });

  const [deliveryMethod, setDeliveryMethod] = useState(
    'White-Glove In-Home Assembly (Complimentary)'
  );
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (field: keyof CustomerInfo, val: string) => {
    setCustomer((prev) => ({ ...prev, [field]: val }));
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order = placeOrder(customer, deliveryMethod, paymentMethod);
    setConfirmedOrder(order);
    setStep(4);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-3xl bg-[#FBF9F5] shadow-2xl rounded-xs overflow-hidden border border-[#DCD3C5] my-8 animate-fade-in text-[#1A1A1A]">
          {/* Header */}
          <div className="px-6 py-5 bg-[#F4EFEA] border-b border-[#E8DFD1] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-serif text-xl font-semibold tracking-tight text-[#1A1A1A]">
                Nova Atelier Checkout
              </span>
              {step < 4 && (
                <span className="text-[11px] font-mono text-[#8C8375] bg-[#EAE2D5] px-2 py-0.5 rounded-xs">
                  Step {step} of 3
                </span>
              )}
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-[#5F584C] hover:text-[#1A1A1A] hover:bg-[#EAE3D6] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper progress (hidden on confirmation) */}
          {step < 4 && (
            <div className="grid grid-cols-3 border-b border-[#E8DFD1] text-xs font-semibold uppercase tracking-wider text-center">
              <div
                className={`py-3 ${
                  step === 1 ? 'bg-white text-[#1A1A1A] border-b-2 border-[#1A1A1A]' : 'bg-[#EFEAE2] text-[#8C8375]'
                }`}
              >
                1. Delivery Address
              </div>
              <div
                className={`py-3 ${
                  step === 2 ? 'bg-white text-[#1A1A1A] border-b-2 border-[#1A1A1A]' : 'bg-[#EFEAE2] text-[#8C8375]'
                }`}
              >
                2. Shipping Service
              </div>
              <div
                className={`py-3 ${
                  step === 3 ? 'bg-white text-[#1A1A1A] border-b-2 border-[#1A1A1A]' : 'bg-[#EFEAE2] text-[#8C8375]'
                }`}
              >
                3. Secure Payment
              </div>
            </div>
          )}

          {/* Step 1: Customer & Address */}
          {step === 1 && (
            <div className="p-6 sm:p-8">
              <h3 className="font-serif text-2xl font-medium mb-1">Shipping & Recipient Details</h3>
              <p className="text-xs text-[#7A7163] mb-6">
                All furniture shipments are handled by our dedicated white-glove two-person delivery network.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={customer.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={customer.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                    Phone (For Delivery Coordination)
                  </label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={customer.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                    Suite / Apt / Floor
                  </label>
                  <input
                    type="text"
                    value={customer.apartment || ''}
                    onChange={(e) => handleInputChange('apartment', e.target.value)}
                    className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={customer.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                    State / Province
                  </label>
                  <input
                    type="text"
                    value={customer.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={customer.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#333333] transition-colors flex items-center gap-2"
                >
                  <span>Continue to Shipping</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Shipping Options */}
          {step === 2 && (
            <div className="p-6 sm:p-8">
              <h3 className="font-serif text-2xl font-medium mb-1">Select Delivery Tier</h3>
              <p className="text-xs text-[#7A7163] mb-6">
                Choose how your bespoke furniture is brought into your residence.
              </p>

              <div className="space-y-4">
                {[
                  {
                    id: 'White-Glove In-Home Assembly (Complimentary)',
                    title: 'White-Glove In-Home Assembly',
                    desc: 'Room of choice placement, full uncrating, leg installation, precision leveling, and debris removal.',
                    price: shippingCost === 0 ? 'FREE' : `$${shippingCost}`,
                    badge: 'Recommended',
                  },
                  {
                    id: 'Scheduled Curbside Delivery',
                    title: 'Threshold / Curbside Delivery',
                    desc: 'Delivered directly to your main entrance or building freight dock on a custom wooden pallet.',
                    price: 'FREE',
                  },
                ].map((tier) => (
                  <label
                    key={tier.id}
                    className={`block p-4 border rounded-xs cursor-pointer transition-all ${
                      deliveryMethod === tier.id
                        ? 'border-[#1A1A1A] bg-white shadow-xs'
                        : 'border-[#DDD5C7] bg-[#F4EFEA] hover:border-[#1A1A1A]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          checked={deliveryMethod === tier.id}
                          onChange={() => setDeliveryMethod(tier.id)}
                          className="accent-[#1A1A1A]"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-base font-semibold text-[#1A1A1A]">
                              {tier.title}
                            </span>
                            {tier.badge && (
                              <span className="bg-[#1A1A1A] text-white text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-xs">
                                {tier.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#6F675A] font-light mt-0.5">{tier.desc}</p>
                        </div>
                      </div>
                      <span className="font-mono text-sm font-bold text-[#1A1A1A]">{tier.price}</span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-[#D5CDBD] text-xs font-semibold uppercase tracking-wider text-[#554E44] hover:border-[#1A1A1A] flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Address</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#333333] transition-colors flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="p-6 sm:p-8">
              <h3 className="font-serif text-2xl font-medium mb-1">Payment Method</h3>
              <p className="text-xs text-[#7A7163] mb-6">
                All transactions are encrypted with 256-bit AES bank-grade security.
              </p>

              {/* Payment Tabs */}
              <div className="flex gap-3 mb-6">
                {['Credit Card', 'Apple Pay', 'Cash on Delivery'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPaymentMethod(m)}
                    className={`flex-1 py-3 px-4 border text-xs font-semibold uppercase tracking-wider rounded-xs transition-all ${
                      paymentMethod === m
                        ? 'border-[#1A1A1A] bg-white text-[#1A1A1A] shadow-xs'
                        : 'border-[#DDD5C7] bg-[#F4EFEA] text-[#6B6356]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {paymentMethod === 'Credit Card' && (
                <div className="space-y-4 bg-white p-5 border border-[#DDD5C7] rounded-xs mb-6 text-xs">
                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#D5CDBD] p-2.5 rounded-xs font-mono"
                      />
                      <CreditCard className="w-4 h-4 text-[#8C8375] absolute right-3 top-3" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        defaultValue="08/29"
                        className="w-full bg-[#FAF7F2] border border-[#D5CDBD] p-2.5 rounded-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                        Security CVC
                      </label>
                      <input
                        type="text"
                        defaultValue="842"
                        className="w-full bg-[#FAF7F2] border border-[#D5CDBD] p-2.5 rounded-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'Apple Pay' && (
                <div className="p-6 bg-white border border-[#DDD5C7] text-center rounded-xs mb-6">
                  <p className="font-serif text-lg text-[#1A1A1A] mb-2">Apple Pay Quick Express</p>
                  <p className="text-xs text-[#7A7163]">
                    Biometric Touch ID authentication will be prompted on final placement.
                  </p>
                </div>
              )}

              {paymentMethod === 'Cash on Delivery' && (
                <div className="p-6 bg-[#EFEAE2] border border-[#D7CEBF] rounded-xs mb-6 text-xs text-[#524B40]">
                  <p className="font-bold text-[#1A1A1A] mb-1">Certified Bank Check or COD upon In-Home Delivery</p>
                  <p>
                    You will inspect and sign off on your furniture before finalizing payment with the white-glove team.
                  </p>
                </div>
              )}

              {/* Order Final Summary */}
              <div className="p-4 bg-[#F2EDE5] rounded-xs border border-[#DFD6C8] space-y-1.5 text-xs text-[#635B4F] mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold text-[#1A1A1A] tabular-nums">${cartSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E6B47]">
                    <span>Promotional Savings</span>
                    <span className="font-semibold tabular-nums">-${discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span>${taxAmount.toLocaleString()}</span>
                </div>
                <div className="border-t border-[#D5CDBD] pt-2 flex justify-between text-base font-bold text-[#1A1A1A]">
                  <span>Total Amount</span>
                  <span className="tabular-nums">${orderTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-[#D5CDBD] text-xs font-semibold uppercase tracking-wider text-[#554E44] hover:border-[#1A1A1A] flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleCompleteOrder}
                  className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#333333] transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>Place Order · ${orderTotal.toLocaleString()}</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Order Confirmation Screen */}
          {step === 4 && confirmedOrder && (
            <div className="p-6 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[#E5F2EA] text-[#2E6B47] flex items-center justify-center mx-auto mb-4 border border-[#BDE0CB]">
                <CheckCircle className="w-8 h-8" />
              </div>

              <span className="text-[11px] font-mono uppercase tracking-widest text-[#7D766A]">
                Order Confirmed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1A1A1A] mt-1 mb-2">
                Thank You, {confirmedOrder.customer.firstName}
              </h2>
              <p className="text-sm text-[#6A6357] max-w-md mx-auto mb-6">
                Your order <strong className="text-[#1A1A1A] font-mono">{confirmedOrder.id}</strong> has been received by our atelier. A formal confirmation and white-glove scheduling link have been sent to{' '}
                <strong className="text-[#1A1A1A]">{confirmedOrder.customer.email}</strong>.
              </p>

              {/* Delivery Timeline Card */}
              <div className="bg-white border border-[#E0D7CA] p-5 rounded-xs text-left max-w-lg mx-auto mb-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#EFEAE2] pb-3 mb-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Truck className="w-4 h-4 text-[#C5A880]" />
                    <span className="font-bold text-[#1A1A1A]">Estimated In-Home Delivery</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#2E6B47] bg-[#E8F3ED] px-2 py-0.5 rounded-xs">
                    {confirmedOrder.estimatedDelivery}
                  </span>
                </div>

                <div className="text-xs text-[#5D564B] space-y-1">
                  <p>
                    <strong className="text-[#1A1A1A]">Destination:</strong> {confirmedOrder.customer.address},{' '}
                    {confirmedOrder.customer.city}, {confirmedOrder.customer.state}{' '}
                    {confirmedOrder.customer.postalCode}
                  </p>
                  <p>
                    <strong className="text-[#1A1A1A]">Service:</strong> {confirmedOrder.deliveryMethod}
                  </p>
                  <p>
                    <strong className="text-[#1A1A1A]">Total Paid:</strong> ${confirmedOrder.total.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 border border-[#D5CDBD] text-xs uppercase tracking-wider font-semibold text-[#4A453E] hover:border-[#1A1A1A] flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
