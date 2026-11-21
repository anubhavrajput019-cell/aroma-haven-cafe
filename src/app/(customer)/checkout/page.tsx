'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import { orderService } from '@/lib/services/orderService';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input, Textarea } from '@/components/ui/Input';
import { formatPrice, isValidEmail, isValidPhone } from '@/lib/utils';
import { BRAND, PAYMENT_METHODS, DEFAULTS } from '@/lib/constants';
import { PaymentMethod, Order } from '@/types';
import {
  CreditCard,
  Smartphone,
  Banknote,
  HandCoins,
  Building,
  ShieldCheck,
  AlertTriangle,
  Lock,
  ArrowRight,
  CheckCircle,
  Truck,
  UtensilsCrossed,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    diningMode,
    tableNumber,
    coupon,
    tip,
    getSubtotal,
    getDiscount,
    getGST,
    getEffectiveDeliveryFee,
    getGrandTotal,
    clearCart,
  } = useCartStore();

  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Form State
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [deliveryInstructions, setDeliveryInstructions] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('upi');
  const [simulatedUpiId, setSimulatedUpiId] = useState<string>('anubhav@okaxis');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const subtotal = mounted ? getSubtotal() : 0;
  const discount = mounted ? getDiscount() : 0;
  const gst = mounted ? getGST() : 0;
  const deliveryFee = mounted ? getEffectiveDeliveryFee() : 0;
  const grandTotal = mounted ? getGrandTotal() : 0;

  if (mounted && items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <h2 className="text-display-sm font-display text-content-primary">
            No items to checkout
          </h2>
          <p className="text-body-md text-content-secondary">
            Your selection is empty. Please add delicious items from our menu first.
          </p>
          <Button variant="copper-glow">
            <Link href="/menu">Go to Menu</Link>
          </Button>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!customerName.trim()) {
      errors.name = 'Full name is required';
    }
    if (!customerPhone.trim() || !isValidPhone(customerPhone)) {
      errors.phone = 'Valid 10-digit phone number is required for order updates';
    }
    if (customerEmail.trim() && !isValidEmail(customerEmail)) {
      errors.email = 'Please provide a valid email address';
    }
    if (diningMode === 'delivery' && !address.trim()) {
      errors.address = 'Motihari delivery address is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Simulate realistic order generation
      const orderSequence = Math.floor(1000 + Math.random() * 9000);
      const orderId = `ah_ord_${Date.now()}`;
      const orderNumber = `AH-${orderSequence}`;

      const newOrder: Order = {
        id: orderId,
        order_number: orderNumber,
        customer_id: null, // Guest checkout
        guest_name: customerName.trim(),
        guest_phone: customerPhone.trim(),
        guest_email: customerEmail.trim() || null,
        dining_mode: diningMode,
        table_number: diningMode === 'dine_in' ? tableNumber : null,
        delivery_address: diningMode === 'delivery' ? address.trim() : null,
        delivery_instructions: deliveryInstructions.trim() || null,
        pickup_time: diningMode === 'takeaway' ? 'In 15–20 mins' : null,
        special_instructions: null,
        subtotal,
        discount,
        coupon_id: null,
        coupon_code: coupon?.code || null,
        gst_rate: DEFAULTS.gstRate,
        gst_amount: gst,
        delivery_fee: deliveryFee,
        tip,
        grand_total: grandTotal,
        payment_method: selectedPayment,
        payment_status: ['cash', 'pay_on_delivery'].includes(selectedPayment) ? 'pending' : 'demo',
        payment_reference: `DEMO_REF_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        status: 'confirmed',
        estimated_time: diningMode === 'delivery' ? 35 : 15,
        admin_notes: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        items: items.map((i) => ({
          id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          order_id: orderId,
          product_id: i.product.id,
          product_name: i.product.name,
          product_image: i.product.image_url,
          variant_name: i.variant?.name || null,
          add_on_names: i.add_ons.map((a) => a.name),
          spice_level: i.spice_level,
          special_instructions: i.special_instructions,
          quantity: i.quantity,
          unit_price: i.unit_price,
          total_price: i.total_price,
        })),
        status_history: [
          {
            id: `h_init_${Date.now()}`,
            order_id: orderId,
            status: 'confirmed',
            note: 'Order confirmed and sent to kitchen display.',
            created_by: 'System',
            created_at: new Date().toISOString(),
          },
        ],
      };

      // Persist in local orders engine
      orderService.saveOrder(newOrder);

      // Clear shopping cart
      clearCart();

      // Route directly to confirmation
      router.push(`/order-confirmation/${orderNumber}`);
    } catch (err) {
      console.error('Order creation error:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-primary pb-28 text-left">
      {/* Header */}
      <div className="border-b border-border-subtle bg-surface-secondary/40 py-10">
        <div className="section-container">
          <span className="text-caption font-mono uppercase tracking-widest text-brand-copper">
            Final Step
          </span>
          <h1 className="text-display-sm font-display text-content-primary mt-1">
            Secure Checkout
          </h1>
        </div>
      </div>

      <div className="section-container pt-10">
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns: Contact, Dining Details & Payment Methods */}
            <div className="lg:col-span-7 space-y-8">
              {/* Mandatory Demo Sandbox Disclaimer (Section 31 & Rule 7) */}
              <div className="p-4 rounded-xl bg-status-warning-soft border border-status-warning/40 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-status-warning shrink-0 mt-0.5" />
                <div className="space-y-1 text-body-sm text-content-primary">
                  <div className="font-semibold text-status-warning flex items-center gap-1.5">
                    <span>Academic Demonstration Sandbox</span>
                  </div>
                  <p className="text-caption text-content-secondary leading-relaxed">
                    This order is processed in demo mode. Online payment options (UPI, Card, Net Banking) simulate the transaction safely with zero real monetary charges. Cash and Pay on Delivery represent real café workflows.
                  </p>
                </div>
              </div>

              {/* Step 1: Customer Contact Info */}
              <div className="p-7 rounded-2xl bg-surface-secondary border border-border-subtle space-y-5 shadow-card">
                <h3 className="text-heading-sm font-display font-medium text-content-primary flex items-center justify-between border-b border-border-subtle pb-3">
                  <span>1. Contact &amp; Guest Details</span>
                  <span className="text-caption text-content-tertiary font-mono">Guest Checkout</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Input
                      label="Full Name *"
                      placeholder="e.g. Anubhav Rajput"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      error={formErrors.name}
                    />
                  </div>

                  <div>
                    <Input
                      label="Phone Number (10 digits) *"
                      placeholder="e.g. 9229310610"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      error={formErrors.phone}
                      hint="For live WhatsApp / SMS order updates"
                    />
                  </div>

                  <div>
                    <Input
                      label="Email Address (Optional)"
                      placeholder="e.g. guest@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      error={formErrors.email}
                      hint="For digital invoice receipt"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Dining Mode & Address */}
              <div className="p-7 rounded-2xl bg-surface-secondary border border-border-subtle space-y-5 shadow-card">
                <h3 className="text-heading-sm font-display font-medium text-content-primary border-b border-border-subtle pb-3 flex items-center justify-between">
                  <span>2. Delivery &amp; Dining Details</span>
                  <Badge variant="copper">
                    {diningMode.replace('_', ' ').toUpperCase()}
                  </Badge>
                </h3>

                {diningMode === 'dine_in' && (
                  <div className="p-4 rounded-xl bg-surface-primary border border-border-subtle flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <UtensilsCrossed className="w-5 h-5 text-brand-copper" />
                      <div>
                        <div className="text-body-sm font-medium text-content-primary">
                          Seated at Table {String(tableNumber || 1).padStart(2, '0')}
                        </div>
                        <p className="text-caption text-content-secondary">
                          Dishes will be brought directly to your table by the barista staff.
                        </p>
                      </div>
                    </div>
                    <Link href="/cart" className="text-caption text-brand-copper hover:underline">
                      Change Table
                    </Link>
                  </div>
                )}

                {diningMode === 'takeaway' && (
                  <div className="p-4 rounded-xl bg-surface-primary border border-border-subtle space-y-1">
                    <div className="text-body-sm font-medium text-content-primary">
                      Takeaway Counter Pickup
                    </div>
                    <p className="text-caption text-content-secondary">
                      Your order will be packed and ready for collection at the café counter in Motihari in approximately 15–20 minutes.
                    </p>
                  </div>
                )}

                {diningMode === 'delivery' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-caption text-content-secondary">
                      <Truck className="w-4 h-4 text-brand-copper" />
                      <span>Delivery restricted to <strong>Motihari City</strong> boundaries.</span>
                    </div>

                    <Textarea
                      label="Delivery Address in Motihari *"
                      placeholder="House / Apartment no., Street name, Landmark, Motihari…"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      error={formErrors.address}
                      rows={3}
                    />

                    <Input
                      label="Delivery Instructions (Optional)"
                      placeholder="e.g. Ring bell twice, leave at reception…"
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Step 3: Payment Options (Sandboxed & Live Workflows) */}
              <div className="p-7 rounded-2xl bg-surface-secondary border border-border-subtle space-y-5 shadow-card">
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <h3 className="text-heading-sm font-display font-medium text-content-primary">
                    3. Payment Selection
                  </h3>
                  <div className="flex items-center gap-1.5 text-caption text-content-tertiary">
                    <Lock className="w-3.5 h-3.5 text-status-success" />
                    <span>256-Bit SSL Demo Sandbox</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* UPI */}
                  <label
                    className={`p-4 rounded-xl border flex items-start justify-between cursor-pointer transition-all ${
                      selectedPayment === 'upi'
                        ? 'border-brand-copper bg-brand-copper/15'
                        : 'border-border-subtle bg-surface-primary hover:border-border'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={selectedPayment === 'upi'}
                        onChange={() => setSelectedPayment('upi')}
                        className="mt-1 text-brand-copper focus:ring-brand-copper"
                      />
                      <div className="space-y-1">
                        <div className="text-body-sm font-medium text-content-primary flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-brand-copper" />
                          <span>Instant UPI (GPay, PhonePe, Paytm)</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-status-warning-soft text-status-warning">
                            DEMO
                          </span>
                        </div>
                        <p className="text-caption text-content-secondary">
                          Simulated zero-wait payment confirmation.
                        </p>
                        {selectedPayment === 'upi' && (
                          <div className="pt-2">
                            <input
                              type="text"
                              value={simulatedUpiId}
                              onChange={(e) => setSimulatedUpiId(e.target.value)}
                              placeholder="yourname@upi"
                              className="px-3 py-1.5 rounded-lg bg-surface-secondary border border-border-subtle text-caption font-mono"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </label>

                  {/* Credit / Debit Card */}
                  <label
                    className={`p-4 rounded-xl border flex items-start justify-between cursor-pointer transition-all ${
                      selectedPayment === 'card'
                        ? 'border-brand-copper bg-brand-copper/15'
                        : 'border-border-subtle bg-surface-primary hover:border-border'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={selectedPayment === 'card'}
                        onChange={() => setSelectedPayment('card')}
                        className="mt-1 text-brand-copper focus:ring-brand-copper"
                      />
                      <div className="space-y-1">
                        <div className="text-body-sm font-medium text-content-primary flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-brand-copper" />
                          <span>Credit / Debit Card</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-status-warning-soft text-status-warning">
                            DEMO
                          </span>
                        </div>
                        <p className="text-caption text-content-secondary">
                          Visa, Mastercard, RuPay sandbox simulator.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Cash at Café (Dine-in / Takeaway) */}
                  {diningMode !== 'delivery' && (
                    <label
                      className={`p-4 rounded-xl border flex items-start justify-between cursor-pointer transition-all ${
                        selectedPayment === 'cash'
                          ? 'border-brand-copper bg-brand-copper/15'
                          : 'border-border-subtle bg-surface-primary hover:border-border'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={selectedPayment === 'cash'}
                          onChange={() => setSelectedPayment('cash')}
                          className="mt-1 text-brand-copper focus:ring-brand-copper"
                        />
                        <div className="space-y-1">
                          <div className="text-body-sm font-medium text-content-primary flex items-center gap-2">
                            <Banknote className="w-4 h-4 text-brand-copper" />
                            <span>Cash / Card at Café Counter</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-status-success-soft text-status-success">
                              REAL FLOW
                            </span>
                          </div>
                          <p className="text-caption text-content-secondary">
                            Pay when your table bill arrives or when picking up at the counter.
                          </p>
                        </div>
                      </div>
                    </label>
                  )}

                  {/* Pay on Delivery */}
                  {diningMode === 'delivery' && (
                    <label
                      className={`p-4 rounded-xl border flex items-start justify-between cursor-pointer transition-all ${
                        selectedPayment === 'pay_on_delivery'
                          ? 'border-brand-copper bg-brand-copper/15'
                          : 'border-border-subtle bg-surface-primary hover:border-border'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="pay_on_delivery"
                          checked={selectedPayment === 'pay_on_delivery'}
                          onChange={() => setSelectedPayment('pay_on_delivery')}
                          className="mt-1 text-brand-copper focus:ring-brand-copper"
                        />
                        <div className="space-y-1">
                          <div className="text-body-sm font-medium text-content-primary flex items-center gap-2">
                            <HandCoins className="w-4 h-4 text-brand-copper" />
                            <span>Cash / UPI on Delivery</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-status-success-soft text-status-success">
                              REAL FLOW
                            </span>
                          </div>
                          <p className="text-caption text-content-secondary">
                            Pay the delivery courier directly via cash or QR in Motihari.
                          </p>
                        </div>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Sticky Order Review */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-7 rounded-2xl bg-surface-secondary border border-border-subtle space-y-6 shadow-elevated sticky top-28">
                <h3 className="text-heading-sm font-display font-medium text-content-primary border-b border-border-subtle pb-4">
                  Final Bill Review
                </h3>

                {/* Items Mini-list */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {items.map((it) => (
                    <div key={it.id} className="flex justify-between items-center text-body-sm">
                      <div className="truncate max-w-[190px]">
                        <span className="font-medium text-content-primary">{it.product.name}</span>
                        <span className="text-caption text-content-tertiary ml-1.5">×{it.quantity}</span>
                        {it.variant && (
                          <span className="block text-[11px] text-brand-copper truncate">
                            {it.variant.name}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-content-primary font-medium shrink-0">
                        {formatPrice(it.total_price)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial Totals */}
                <div className="space-y-2.5 pt-4 border-t border-border-subtle text-body-sm text-content-secondary">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-content-primary">{formatPrice(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-status-success">
                      <span>Promo ({coupon?.code})</span>
                      <span className="font-mono">-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Provisional GST (5%)</span>
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
                    <span className="text-body-md font-bold text-content-primary">Grand Total</span>
                    <span className="font-mono text-display-sm font-bold text-brand-copper">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Place Order CTA with Double-Submit Prevention */}
                <Button
                  type="submit"
                  variant="copper-glow"
                  size="lg"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  className="w-full text-body-md font-bold"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Confirm &amp; Place Order • {formatPrice(grandTotal)}
                </Button>

                <p className="text-[11px] text-center text-content-tertiary">
                  By confirming, you agree to Aroma Haven Café&apos;s demo ordering policies.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
