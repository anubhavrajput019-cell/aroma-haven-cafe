'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { orderService } from '@/lib/services/orderService';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatDateTime } from '@/lib/utils';
import { BRAND, ORDER_STATUS_LABELS } from '@/lib/constants';
import {
  CheckCircle2,
  Clock,
  Printer,
  ArrowRight,
  Truck,
  UtensilsCrossed,
  ShoppingBag,
  MapPin,
  ShieldAlert,
} from 'lucide-react';

export default function OrderConfirmationPage() {
  const params = useParams();
  const id = params?.id as string;

  const order = useMemo(() => {
    return orderService.getOrderById(id);
  }, [id]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (!order) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <h2 className="text-display-sm font-display text-content-primary">Order Not Found</h2>
          <p className="text-body-md text-content-secondary">
            We couldn&apos;t locate order #{id}. It may have been placed in another session.
          </p>
          <Button variant="copper-glow">
            <Link href="/menu">Browse Menu</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary pb-28 text-left print:bg-white print:text-black">
      {/* Non-printed Screen Header */}
      <div className="border-b border-border-subtle bg-surface-secondary/40 py-10 print:hidden">
        <div className="section-container text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-status-success-soft text-status-success text-caption font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Order Successfully Placed</span>
          </div>
          <h1 className="text-display-sm sm:text-display-md font-display text-content-primary">
            Thank You, {order.guest_name || 'Valued Guest'}!
          </h1>
          <p className="text-body-md text-content-secondary max-w-md mx-auto">
            Your kitchen ticket has been generated and dispatched to the barista and kitchen team.
          </p>
        </div>
      </div>

      <div className="section-container pt-8 max-w-3xl">
        {/* Printable Branded Receipt Paper Surface */}
        <div className="p-8 sm:p-12 rounded-3xl bg-surface-secondary border border-border-subtle shadow-elevated space-y-8 print:p-0 print:border-none print:shadow-none print:bg-transparent">
          {/* Receipt Top Brand Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
            <div>
              <h2 className="text-heading-lg font-display font-bold text-content-primary tracking-wide">
                {BRAND.name}
              </h2>
              <p className="text-caption font-heading text-brand-copper italic">
                “{BRAND.tagline}”
              </p>
              <p className="text-[12px] text-content-tertiary mt-1">
                {BRAND.location} • {BRAND.phone}
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <div className="font-mono text-heading-md font-bold text-brand-copper">
                {order.order_number}
              </div>
              <div className="text-caption text-content-tertiary">
                {formatDateTime(order.created_at)}
              </div>
              <Badge variant="copper">
                {order.dining_mode.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Guest & Dining Info Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-body-sm text-content-secondary">
            <div>
              <span className="block text-caption font-mono uppercase text-content-tertiary">
                Customer Details
              </span>
              <span className="font-medium text-content-primary">{order.guest_name}</span>
              <span className="block text-caption font-mono">{order.guest_phone}</span>
              {order.guest_email && <span className="block text-caption">{order.guest_email}</span>}
            </div>

            <div>
              <span className="block text-caption font-mono uppercase text-content-tertiary">
                Service Details
              </span>
              {order.dining_mode === 'dine_in' && (
                <span className="font-medium text-content-primary">
                  Table {String(order.table_number || 1).padStart(2, '0')} (Dine-in Service)
                </span>
              )}
              {order.dining_mode === 'takeaway' && (
                <span className="font-medium text-content-primary">
                  Counter Pickup (Est. {order.estimated_time || 15} mins)
                </span>
              )}
              {order.dining_mode === 'delivery' && (
                <div>
                  <span className="font-medium text-content-primary">Motihari City Delivery</span>
                  <p className="text-caption text-content-tertiary">{order.delivery_address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="space-y-3 pt-2">
            <span className="block text-caption font-mono uppercase tracking-wider text-content-tertiary border-b border-border-subtle pb-2">
              Itemized Order Receipt
            </span>

            <div className="space-y-3">
              {order.items?.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-body-sm">
                  <div className="space-y-0.5">
                    <div className="font-medium text-content-primary">
                      {item.quantity}× {item.product_name}
                    </div>
                    {item.variant_name && (
                      <span className="text-[12px] text-brand-copper font-mono block">
                        Size: {item.variant_name}
                      </span>
                    )}
                    {item.add_on_names.length > 0 && (
                      <span className="text-[11px] text-content-tertiary block">
                        + {item.add_on_names.join(', ')}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-content-primary font-medium shrink-0">
                    {formatPrice(item.total_price)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="space-y-2 pt-4 border-t border-border-subtle text-body-sm text-content-secondary">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-content-primary">{formatPrice(order.subtotal)}</span>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between text-status-success">
                <span>Discount ({order.coupon_code})</span>
                <span className="font-mono">-{formatPrice(order.discount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Provisional GST (5%)</span>
              <span className="font-mono text-content-primary">{formatPrice(order.gst_amount)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-mono text-content-primary">
                {order.delivery_fee === 0 ? 'FREE' : formatPrice(order.delivery_fee)}
              </span>
            </div>

            {order.tip > 0 && (
              <div className="flex justify-between">
                <span>Staff Tip</span>
                <span className="font-mono text-content-primary">{formatPrice(order.tip)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-border-subtle flex justify-between items-baseline">
              <span className="text-body-md font-bold text-content-primary">Grand Total Paid</span>
              <span className="font-mono text-display-sm font-bold text-brand-copper">
                {formatPrice(order.grand_total)}
              </span>
            </div>

            <div className="flex items-center justify-between text-caption text-content-tertiary pt-2">
              <span>Payment Mode: {order.payment_method.toUpperCase()}</span>
              <span className="font-mono">Ref: {order.payment_reference}</span>
            </div>
          </div>

          {/* Demo Sandbox Tag */}
          <div className="p-3 rounded-lg bg-status-warning-soft text-status-warning text-[11px] font-mono text-center">
            ✦ Academic Project Demo Receipt • No real financial charges incurred ✦
          </div>
        </div>

        {/* Action Buttons (Non-printed) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden">
          <Button
            variant="secondary"
            onClick={handlePrint}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print Receipt
          </Button>

          <Button
            variant="copper-glow"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            <Link href={`/order-tracking/${order.order_number}`}>
              Live Order Tracker
            </Link>
          </Button>

          <Button variant="ghost">
            <Link href="/menu">Order More Dishes</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
