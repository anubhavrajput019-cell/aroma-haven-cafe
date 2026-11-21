'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { DINING_MODES, DEFAULTS } from '@/lib/constants';
import { DiningMode } from '@/types';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  UtensilsCrossed,
  Truck,
  Tag,
  Check,
  AlertCircle,
} from 'lucide-react';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    diningMode,
    setDiningMode,
    tableNumber,
    setTableNumber,
    coupon,
    applyCoupon,
    removeCoupon,
    tip,
    setTip,
    getSubtotal,
    getDiscount,
    getGST,
    getEffectiveDeliveryFee,
    getGrandTotal,
    getItemCount,
    freeDeliveryThreshold,
  } = useCartStore();

  const [couponCodeInput, setCouponCodeInput] = useState<string>('');
  const [couponError, setCouponError] = useState<string>('');
  const [customTipInput, setCustomTipInput] = useState<string>('');
  const [showCustomTip, setShowCustomTip] = useState<boolean>(false);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const gst = getGST();
  const deliveryFee = getEffectiveDeliveryFee();
  const grandTotal = getGrandTotal();
  const itemCount = getItemCount();

  // Valid demo coupons
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCodeInput.trim().toUpperCase();

    if (!code) return;

    if (code === 'AROMA10') {
      const calcDiscount = Math.round(subtotal * 0.1 * 100) / 100;
      applyCoupon({
        code: 'AROMA10',
        discount_type: 'percentage',
        discount_value: 10,
        calculated_discount: calcDiscount,
      });
      setCouponCodeInput('');
    } else if (code === 'WELCOME50') {
      if (subtotal < 200) {
        setCouponError('WELCOME50 requires a minimum order of ₹200.');
        return;
      }
      applyCoupon({
        code: 'WELCOME50',
        discount_type: 'fixed',
        discount_value: 50,
        calculated_discount: 50,
      });
      setCouponCodeInput('');
    } else if (code === 'FESTIVE20') {
      const calcDiscount = Math.round(subtotal * 0.2 * 100) / 100;
      applyCoupon({
        code: 'FESTIVE20',
        discount_type: 'percentage',
        discount_value: 20,
        calculated_discount: calcDiscount,
      });
      setCouponCodeInput('');
    } else {
      setCouponError('Invalid coupon code. Try AROMA10 or WELCOME50.');
    }
  };

  const handleCustomTipSubmit = () => {
    const val = parseFloat(customTipInput);
    if (!isNaN(val) && val >= 0) {
      setTip(Math.round(val));
      setShowCustomTip(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-5">
          <div className="w-20 h-20 rounded-full bg-surface-secondary border border-border-subtle flex items-center justify-center mx-auto text-content-tertiary">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-display-sm font-display text-content-primary">
              Your Selection Is Empty
            </h1>
            <p className="text-body-md text-content-secondary">
              Discover our freshly roasted single-origin brews, sourdough pizzas, and artisan cakes.
            </p>
          </div>
          <Button variant="copper-glow" size="lg">
            <Link href="/menu">Explore The Menu</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary pb-24 text-left">
      {/* Header */}
      <div className="border-b border-border-subtle bg-surface-secondary/40 py-10">
        <div className="section-container flex items-center justify-between">
          <div>
            <span className="text-caption font-mono uppercase tracking-widest text-brand-copper">
              Review &amp; Refine
            </span>
            <h1 className="text-display-sm font-display text-content-primary mt-1">
              Your Order Selection ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h1>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="text-body-sm text-content-tertiary hover:text-status-error transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Selection</span>
          </button>
        </div>
      </div>

      <div className="section-container pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Items & Dining Mode */}
          <div className="lg:col-span-7 space-y-8">
            {/* Dining Mode Selection */}
            <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle space-y-4">
              <label className="block text-body-sm font-semibold uppercase tracking-wider font-mono text-content-primary">
                1. Select Dining Mode
              </label>

              <div className="grid grid-cols-3 gap-3">
                {DINING_MODES.map((mode) => {
                  const isSelected = diningMode === mode.key;
                  return (
                    <button
                      key={mode.key}
                      type="button"
                      onClick={() => setDiningMode(mode.key as DiningMode)}
                      className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                        isSelected
                          ? 'border-brand-copper bg-brand-copper/15 text-content-primary font-medium shadow-sm'
                          : 'border-border-subtle bg-surface-primary text-content-secondary hover:border-border'
                      }`}
                    >
                      <span className="text-body-sm font-medium">{mode.label}</span>
                      <span className="text-[11px] text-content-tertiary hidden sm:inline">
                        {mode.description}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Table Selector if Dine In */}
              {diningMode === 'dine_in' && (
                <div className="pt-3 border-t border-border-subtle/60 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="text-body-sm font-medium text-content-primary flex items-center gap-2">
                      <UtensilsCrossed className="w-4 h-4 text-brand-copper" />
                      <span>Select Your Table</span>
                    </div>
                    <p className="text-caption text-content-tertiary">
                      Seated at the café? Choose your table for kitchen delivery.
                    </p>
                  </div>

                  <select
                    value={tableNumber || 1}
                    onChange={(e) => setTableNumber(parseInt(e.target.value, 10))}
                    aria-label="Select table number"
                    className="px-3.5 py-2 rounded-lg bg-surface-primary border border-border-subtle text-body-sm font-mono text-content-primary focus:outline-none focus:border-brand-copper cursor-pointer"
                  >
                    {[...Array(DEFAULTS.totalTables)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Table {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Delivery notice if Delivery */}
              {diningMode === 'delivery' && (
                <div className="pt-3 border-t border-border-subtle/60 flex items-center gap-2.5 text-caption text-content-secondary">
                  <Truck className="w-4 h-4 text-brand-copper shrink-0" />
                  <span>
                    Express delivery within <strong>Motihari city</strong>. Free on orders above {formatPrice(freeDeliveryThreshold)}.
                  </span>
                </div>
              )}
            </div>

            {/* Itemized Cart List */}
            <div className="space-y-4">
              <label className="block text-body-sm font-semibold uppercase tracking-wider font-mono text-content-primary">
                2. Selected Dishes &amp; Brews
              </label>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-surface-secondary border border-border-subtle flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between shadow-card"
                >
                  <div className="flex gap-4 items-center">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-surface-tertiary shrink-0">
                      <Image
                        src={item.product.image_url}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <h3 className="text-body-md font-medium text-content-primary">
                        {item.product.name}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 text-caption text-content-tertiary">
                        {item.variant && (
                          <span className="font-mono text-brand-copper">
                            {item.variant.name}
                          </span>
                        )}
                        {item.spice_level && item.spice_level !== 'none' && (
                          <span>• Spice: {item.spice_level}</span>
                        )}
                        <span>• Unit: {formatPrice(item.unit_price)}</span>
                      </div>

                      {item.add_ons.length > 0 && (
                        <p className="text-[12px] text-content-tertiary">
                          Extras: {item.add_ons.map((a) => a.name).join(', ')}
                        </p>
                      )}

                      {item.special_instructions && (
                        <p className="text-[11px] italic text-brand-copper/80">
                          Note: &ldquo;{item.special_instructions}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Item Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-border-subtle/50">
                    <div className="inline-flex items-center gap-2.5 bg-surface-primary border border-border-subtle rounded-lg px-2.5 py-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-content-secondary hover:text-content-primary p-0.5"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-body-sm font-bold min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-content-secondary hover:text-content-primary p-0.5"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-mono text-body-md font-bold text-content-primary">
                        {formatPrice(item.total_price)}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-[11px] text-content-tertiary hover:text-status-error transition-colors mt-0.5"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/menu"
                className="text-body-sm text-brand-copper hover:underline inline-flex items-center gap-1.5"
              >
                <span>+ Add more dishes from the menu</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Financials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-surface-secondary border border-border-subtle space-y-6 shadow-elevated">
              <h3 className="text-heading-sm font-display font-medium text-content-primary border-b border-border-subtle pb-4">
                Order Summary
              </h3>

              {/* Coupon Engine Box */}
              <div className="space-y-2">
                <label className="block text-caption font-mono uppercase tracking-wider text-content-secondary">
                  Have a Promo Code?
                </label>
                {coupon ? (
                  <div className="p-3 rounded-xl bg-brand-copper/15 border border-brand-copper/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-brand-copper" />
                      <span className="font-mono text-body-sm font-bold text-brand-copper">
                        {coupon.code}
                      </span>
                      <span className="text-caption text-content-secondary">
                        (-{formatPrice(coupon.calculated_discount)})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-caption text-content-tertiary hover:text-status-error"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. AROMA10, WELCOME50"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-lg bg-surface-primary border border-border-subtle text-body-sm font-mono uppercase focus:outline-none focus:border-brand-copper"
                    />
                    <Button variant="secondary" size="sm" type="submit">
                      Apply
                    </Button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-status-error flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{couponError}</span>
                  </p>
                )}
                <p className="text-[11px] text-content-tertiary">
                  Demo vouchers available: <code className="text-brand-copper">AROMA10</code> (10% off), <code className="text-brand-copper">WELCOME50</code> (₹50 off)
                </p>
              </div>

              {/* Tip Selection (Per Confirmed Decision A3) */}
              <div className="space-y-2 pt-2 border-t border-border-subtle/60">
                <div className="flex items-center justify-between">
                  <span className="text-caption font-mono uppercase tracking-wider text-content-secondary">
                    Add Tip For Café Staff
                  </span>
                  <span className="text-caption font-mono text-brand-copper">
                    {tip > 0 ? formatPrice(tip) : 'Optional'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 10, 20, 50].map((amount) => {
                    const isSelected = tip === amount && !showCustomTip;
                    return (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setTip(amount);
                          setShowCustomTip(false);
                        }}
                        className={`py-1.5 rounded-lg border text-caption font-mono transition-all ${
                          isSelected
                            ? 'border-brand-copper bg-brand-copper/20 text-brand-copper font-bold'
                            : 'border-border-subtle bg-surface-primary text-content-secondary hover:border-border'
                        }`}
                      >
                        {amount === 0 ? 'None' : `+₹${amount}`}
                      </button>
                    );
                  })}
                </div>
                {showCustomTip ? (
                  <div className="flex gap-2 pt-1">
                    <input
                      type="number"
                      placeholder="Amount in ₹"
                      value={customTipInput}
                      onChange={(e) => setCustomTipInput(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-surface-primary border border-border-subtle text-caption font-mono focus:outline-none focus:border-brand-copper"
                      min={0}
                    />
                    <Button variant="secondary" size="sm" onClick={handleCustomTipSubmit}>
                      Set
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowCustomTip(true)}
                    className="text-[11px] text-brand-copper hover:underline"
                  >
                    Enter custom tip amount
                  </button>
                )}
              </div>

              {/* Detailed Math Breakdown */}
              <div className="space-y-3 pt-3 border-t border-border-subtle text-body-sm text-content-secondary">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-content-primary">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-status-success">
                    <span>Coupon Discount</span>
                    <span className="font-mono">-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <span>Provisional GST (5%)</span>
                    <span className="text-[11px] text-content-tertiary">demo rate</span>
                  </span>
                  <span className="font-mono text-content-primary">{formatPrice(gst)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-mono text-content-primary">
                    {diningMode !== 'delivery' ? (
                      <span className="text-status-success">N/A</span>
                    ) : deliveryFee === 0 ? (
                      <span className="text-status-success font-medium">FREE</span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>

                {tip > 0 && (
                  <div className="flex justify-between">
                    <span>Staff Tip</span>
                    <span className="font-mono text-content-primary">{formatPrice(tip)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-border-subtle flex justify-between items-baseline">
                  <span className="text-body-md font-bold text-content-primary">Total Amount</span>
                  <span className="font-mono text-display-sm font-bold text-brand-copper">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Button
                variant="copper-glow"
                size="lg"
                className="w-full text-body-md font-bold"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                <Link href="/checkout" className="w-full">
                  Proceed to Checkout • {formatPrice(grandTotal)}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
