'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { orderService } from '@/lib/services/orderService';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatDateTime } from '@/lib/utils';
import { ORDER_STATUS_FLOW, ORDER_STATUS_LABELS } from '@/lib/constants';
import { OrderStatus, Order } from '@/types';
import {
  ClipboardCheck,
  ChefHat,
  Flame,
  ShieldCheck,
  PackageCheck,
  CircleCheck,
  Clock,
  RotateCw,
  Truck,
  UtensilsCrossed,
  ArrowLeft,
} from 'lucide-react';

export default function OrderTrackingPage() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const fetched = orderService.getOrderById(id);
      setOrder(fetched);
    }
  }, [id]);

  const refreshOrder = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      if (id) {
        const fetched = orderService.getOrderById(id);
        setOrder(fetched ? { ...fetched } : null);
      }
      setIsRefreshing(false);
    }, 400);
  };

  // Helper to advance status for demo testing
  const advanceDemoStatus = () => {
    if (!order) return;
    const currentIndex = ORDER_STATUS_FLOW.findIndex((s) => s.key === order.status);
    if (currentIndex < ORDER_STATUS_FLOW.length - 1) {
      const nextStatus = ORDER_STATUS_FLOW[currentIndex + 1].key as OrderStatus;
      const updated = orderService.updateOrderStatus(
        order.id,
        nextStatus,
        `Kitchen station progressed order to ${nextStatus}`
      );
      if (updated) setOrder(updated);
    }
  };

  if (!order) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <h2 className="text-display-sm font-display text-content-primary">Order Not Found</h2>
          <p className="text-body-md text-content-secondary">
            Could not find active order tracking for #{id}.
          </p>
          <Button variant="copper-glow">
            <Link href="/menu">Browse Menu</Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentStepIndex = ORDER_STATUS_FLOW.findIndex((s) => s.key === order.status);

  const getStepIcon = (key: string) => {
    switch (key) {
      case 'pending':
        return <ClipboardCheck className="w-5 h-5" />;
      case 'confirmed':
        return <ChefHat className="w-5 h-5" />;
      case 'preparing':
        return <Flame className="w-5 h-5" />;
      case 'quality_check':
        return <ShieldCheck className="w-5 h-5" />;
      case 'ready':
        return <PackageCheck className="w-5 h-5" />;
      case 'completed':
        return <CircleCheck className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-primary pb-28 text-left">
      {/* Header */}
      <div className="border-b border-border-subtle bg-surface-secondary/40 py-10">
        <div className="section-container flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-display-sm font-bold text-brand-copper">
                {order.order_number}
              </span>
              <Badge variant="copper">
                {ORDER_STATUS_LABELS[order.status] || order.status}
              </Badge>
            </div>
            <p className="text-body-sm text-content-secondary">
              Placed {formatDateTime(order.created_at)} • {order.dining_mode.replace('_', ' ').toUpperCase()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={refreshOrder}
              isLoading={isRefreshing}
              leftIcon={<RotateCw className="w-4 h-4" />}
            >
              Refresh Status
            </Button>

            {/* Evaluator Demo Controls per Section 83 */}
            {currentStepIndex < ORDER_STATUS_FLOW.length - 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={advanceDemoStatus}
                className="font-mono text-caption"
              >
                Simulate Next Stage →
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="section-container pt-10 max-w-4xl space-y-10">
        {/* Cinematic Status Progress Timeline */}
        <div className="p-8 sm:p-10 rounded-3xl bg-surface-secondary border border-border-subtle shadow-elevated space-y-8">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <h3 className="text-heading-sm font-display font-medium text-content-primary">
              Live Kitchen Timeline
            </h3>
            <span className="text-caption font-mono text-brand-copper flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span>Est. Ready in {order.estimated_time || 20} mins</span>
            </span>
          </div>

          {/* Timeline Visual Steps */}
          <div className="relative">
            {/* Connecting Horizontal Line (desktop) */}
            <div className="hidden sm:block absolute top-6 left-8 right-8 h-0.5 bg-surface-tertiary z-0">
              <div
                className="h-full bg-brand-copper transition-all duration-700 ease-luxury"
                style={{
                  width: `${Math.max(0, (currentStepIndex / (ORDER_STATUS_FLOW.length - 1)) * 100)}%`,
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 sm:gap-2 relative z-10">
              {ORDER_STATUS_FLOW.map((step, idx) => {
                const isPast = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step.key} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2">
                    {/* Step Icon Bubble */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ${
                        isCurrent
                          ? 'bg-brand-copper text-white shadow-glow-copper scale-110 border-2 border-white'
                          : isPast
                          ? 'bg-brand-copper/30 text-brand-copper border border-brand-copper/50'
                          : 'bg-surface-tertiary text-content-tertiary border border-border-subtle'
                      }`}
                    >
                      {getStepIcon(step.key)}
                    </div>

                    {/* Step Label */}
                    <div>
                      <div
                        className={`text-caption font-medium ${
                          isCurrent
                            ? 'text-brand-copper font-bold'
                            : isPast
                            ? 'text-content-primary'
                            : 'text-content-tertiary'
                        }`}
                      >
                        {step.label}
                      </div>
                      {isCurrent && (
                        <span className="text-[10px] font-mono text-status-success block animate-pulse">
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Items In Kitchen */}
          <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle space-y-4">
            <h4 className="text-body-md font-semibold text-content-primary uppercase font-mono tracking-wider border-b border-border-subtle pb-3">
              Items Being Prepared
            </h4>
            <div className="space-y-3">
              {order.items?.map((it) => (
                <div key={it.id} className="flex justify-between items-start text-body-sm">
                  <div>
                    <div className="font-medium text-content-primary">
                      {it.quantity}× {it.product_name}
                    </div>
                    {it.variant_name && (
                      <span className="text-caption text-brand-copper font-mono">
                        {it.variant_name}
                      </span>
                    )}
                    {it.add_on_names.length > 0 && (
                      <p className="text-[11px] text-content-tertiary">
                        + {it.add_on_names.join(', ')}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-content-primary font-medium">
                    {formatPrice(it.total_price)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery / Table Context */}
          <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle space-y-4">
            <h4 className="text-body-md font-semibold text-content-primary uppercase font-mono tracking-wider border-b border-border-subtle pb-3">
              Fulfillment Target
            </h4>

            <div className="space-y-3 text-body-sm text-content-secondary">
              <div className="flex items-center gap-3">
                {order.dining_mode === 'dine_in' ? (
                  <UtensilsCrossed className="w-5 h-5 text-brand-copper" />
                ) : (
                  <Truck className="w-5 h-5 text-brand-copper" />
                )}
                <div>
                  <span className="block font-medium text-content-primary">
                    {order.dining_mode === 'dine_in'
                      ? `Table ${order.table_number}`
                      : order.dining_mode === 'delivery'
                      ? 'Motihari Address Delivery'
                      : 'Takeaway Counter Pickup'}
                  </span>
                  {order.delivery_address && (
                    <span className="text-caption text-content-tertiary block mt-0.5">
                      {order.delivery_address}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-border-subtle flex justify-between text-caption">
                <span>Payment:</span>
                <span className="font-mono text-content-primary uppercase">
                  {order.payment_method} ({order.payment_status})
                </span>
              </div>

              <div className="flex justify-between text-caption">
                <span>Total Amount:</span>
                <span className="font-mono text-brand-copper font-bold text-body-md">
                  {formatPrice(order.grand_total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link
            href="/menu"
            className="text-body-sm text-content-secondary hover:text-brand-copper transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
