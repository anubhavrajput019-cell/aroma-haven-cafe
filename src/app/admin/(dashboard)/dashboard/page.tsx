'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { orderService } from '@/lib/services/orderService';
import { MOCK_PRODUCTS } from '@/lib/data/mockMenu';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatDateTime } from '@/lib/utils';
import { ORDER_STATUS_LABELS } from '@/lib/constants';
import { Order, OrderStatus } from '@/types';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Clock,
  ArrowRight,
  UtensilsCrossed,
  Truck,
  RotateCw,
  Flame,
  CheckCircle,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const list = orderService.getOrders();
    setOrders(list);
  }, []);

  const refreshOrders = () => {
    const list = orderService.getOrders();
    setOrders([...list]);
  };

  // Metrics computation
  const totalRevenue = orders.reduce((sum, o) => sum + o.grand_total, 0);
  const activeOrders = orders.filter((o) => ['confirmed', 'preparing', 'quality_check'].includes(o.status));
  const completedOrders = orders.filter((o) => o.status === 'completed');
  const aov = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  const dineInCount = orders.filter((o) => o.dining_mode === 'dine_in').length;
  const takeawayCount = orders.filter((o) => o.dining_mode === 'takeaway').length;
  const deliveryCount = orders.filter((o) => o.dining_mode === 'delivery').length;

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    orderService.updateOrderStatus(orderId, status);
    refreshOrders();
  };

  return (
    <div className="space-y-8 text-left">
      {/* Title & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-lg font-display font-bold text-content-primary">
            Operations Overview
          </h1>
          <p className="text-body-sm text-content-secondary mt-0.5">
            Real-time kitchen flow, sales metrics, and table allocations in Motihari.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={refreshOrders} leftIcon={<RotateCw className="w-3.5 h-3.5" />}>
            Refresh Data
          </Button>
          <Link href="/admin/orders">
            <Button variant="copper-glow" size="sm">
              Manage Orders ({orders.length})
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Tiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-caption font-mono uppercase tracking-wider text-content-tertiary">
              Gross Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-brand-copper/15 text-brand-copper flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-display-sm font-bold text-content-primary">
            {formatPrice(totalRevenue)}
          </div>
          <p className="text-[12px] text-status-success font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Lifetime tracked sales</span>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-caption font-mono uppercase tracking-wider text-content-tertiary">
              Total Orders
            </span>
            <div className="w-8 h-8 rounded-lg bg-status-info-soft text-status-info flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-display-sm font-bold text-content-primary">
            {orders.length}
          </div>
          <p className="text-[12px] text-content-tertiary">
            {completedOrders.length} completed successfully
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-caption font-mono uppercase tracking-wider text-content-tertiary">
              Active In Kitchen
            </span>
            <div className="w-8 h-8 rounded-lg bg-status-warning-soft text-status-warning flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-display-sm font-bold text-brand-copper">
            {activeOrders.length}
          </div>
          <p className="text-[12px] text-content-tertiary">
            Currently preparing tickets
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-caption font-mono uppercase tracking-wider text-content-tertiary">
              Avg Order Value
            </span>
            <div className="w-8 h-8 rounded-lg bg-brand-copper/15 text-brand-copper flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-display-sm font-bold text-content-primary">
            {formatPrice(aov)}
          </div>
          <p className="text-[12px] text-content-tertiary">
            Across all dining modes
          </p>
        </div>
      </div>

      {/* Main Grid: Live Kitchen Feed & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8: Live Orders Queue */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-2xl bg-surface-secondary border border-border-subtle space-y-5 shadow-card">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <h2 className="text-heading-sm font-display font-medium text-content-primary">
              Live Kitchen Tickets
            </h2>
            <Link href="/admin/orders" className="text-caption text-brand-copper hover:underline inline-flex items-center gap-1">
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12 text-content-tertiary space-y-2">
              <ShoppingBag className="w-8 h-8 mx-auto" />
              <p className="text-body-sm">No orders recorded in this session yet.</p>
              <Link href="/menu" target="_blank" className="text-caption text-brand-copper hover:underline block">
                Place a test order from the menu →
              </Link>
            </div>
          ) : (
            <div className="space-y-3.5">
              {orders.slice(0, 5).map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-xl bg-surface-primary border border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-body-sm font-bold text-brand-copper">
                        {ord.order_number}
                      </span>
                      <Badge variant="copper">
                        {ord.dining_mode === 'dine_in'
                          ? `Table ${ord.table_number || 1}`
                          : ord.dining_mode === 'delivery'
                          ? 'Motihari Delivery'
                          : 'Takeaway'}
                      </Badge>
                      <span className="text-[12px] text-content-tertiary">
                        {formatDateTime(ord.created_at)}
                      </span>
                    </div>

                    <div className="text-body-sm font-medium text-content-primary">
                      {ord.guest_name} • <span className="font-mono text-brand-copper">{formatPrice(ord.grand_total)}</span>
                    </div>

                    <p className="text-[12px] text-content-secondary line-clamp-1">
                      {ord.items?.map((i) => `${i.quantity}× ${i.product_name}`).join(', ')}
                    </p>
                  </div>

                  {/* Quick Action Button */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {ord.status === 'confirmed' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleUpdateStatus(ord.id, 'preparing')}
                      >
                        Start Preparing
                      </Button>
                    )}
                    {ord.status === 'preparing' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleUpdateStatus(ord.id, 'ready')}
                      >
                        Mark Ready
                      </Button>
                    )}
                    {ord.status === 'ready' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleUpdateStatus(ord.id, 'completed')}
                      >
                        Complete Order
                      </Button>
                    )}
                    {ord.status === 'completed' && (
                      <span className="text-caption font-mono text-status-success flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 4: Service Distribution & Top Items */}
        <div className="lg:col-span-4 space-y-6">
          {/* Dining Modes Distribution */}
          <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle space-y-4 shadow-card">
            <h3 className="text-heading-sm font-display font-medium text-content-primary border-b border-border-subtle pb-3">
              Fulfillment Split
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-body-sm">
                  <span className="flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-brand-copper" />
                    <span>Dine-In Lounge</span>
                  </span>
                  <span className="font-mono font-bold text-content-primary">{dineInCount}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-tertiary overflow-hidden">
                  <div
                    className="h-full bg-brand-copper"
                    style={{ width: `${orders.length ? (dineInCount / orders.length) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-body-sm">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-status-info" />
                    <span>Motihari Delivery</span>
                  </span>
                  <span className="font-mono font-bold text-content-primary">{deliveryCount}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-tertiary overflow-hidden">
                  <div
                    className="h-full bg-status-info"
                    style={{ width: `${orders.length ? (deliveryCount / orders.length) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-body-sm">
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-status-warning" />
                    <span>Takeaway Pickup</span>
                  </span>
                  <span className="font-mono font-bold text-content-primary">{takeawayCount}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-tertiary overflow-hidden">
                  <div
                    className="h-full bg-status-warning"
                    style={{ width: `${orders.length ? (takeawayCount / orders.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle space-y-4 shadow-card">
            <h3 className="text-heading-sm font-display font-medium text-content-primary border-b border-border-subtle pb-3">
              Top Customer Favorites
            </h3>

            <div className="space-y-3">
              {MOCK_PRODUCTS.slice(0, 4).map((p, idx) => (
                <div key={p.id} className="flex items-center justify-between text-body-sm">
                  <div className="flex items-center gap-2 truncate max-w-[170px]">
                    <span className="font-mono text-[11px] text-content-tertiary">#{idx + 1}</span>
                    <span className="truncate font-medium text-content-primary">{p.name}</span>
                  </div>
                  <span className="font-mono font-bold text-brand-copper shrink-0">
                    {formatPrice(p.special_price || p.base_price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
