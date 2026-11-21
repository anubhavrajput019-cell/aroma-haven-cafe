'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { orderService } from '@/lib/services/orderService';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatDateTime } from '@/lib/utils';
import { ORDER_STATUS_LABELS } from '@/lib/constants';
import { Order } from '@/types';
import {
  Award,
  Clock,
  MapPin,
  ShoppingBag,
  LogOut,
  ArrowRight,
  Shield,
  RotateCw,
} from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    const all = orderService.getOrders();
    setOrders(all);
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  // Simulated rewards calculation
  const totalSpent = orders.reduce((sum, o) => sum + o.grand_total, 0);
  const earnedPoints = Math.floor(totalSpent * 0.1); // 1 pt per ₹10

  let tier = 'Bronze';
  let nextTier = 'Silver (500 pts)';
  if (earnedPoints >= 1500) {
    tier = 'Gold';
    nextTier = 'Top Elite Tier Active';
  } else if (earnedPoints >= 500) {
    tier = 'Silver';
    nextTier = 'Gold (1500 pts)';
  }

  return (
    <div className="min-h-screen bg-surface-primary pb-28 text-left">
      {/* Top Banner */}
      <div className="border-b border-border-subtle bg-surface-secondary/40 py-12">
        <div className="section-container flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-caption font-mono uppercase tracking-widest text-brand-copper">
              Member Profile
            </span>
            <h1 className="text-display-sm font-display text-content-primary">
              Welcome back, {user.full_name}
            </h1>
            <p className="text-body-sm text-content-secondary">
              {user.email} • Motihari Member
            </p>
          </div>

          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <Button variant="secondary" size="sm" leftIcon={<Shield className="w-4 h-4 text-brand-copper" />}>
                <Link href="/admin/dashboard">Admin Dashboard</Link>
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              leftIcon={<LogOut className="w-4 h-4" />}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="section-container pt-10 space-y-10">
        {/* Loyalty Rewards Status Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-surface-secondary via-brand-espresso-600/40 to-surface-secondary border border-brand-copper/30 shadow-elevated">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-2">
              <span className="text-caption font-mono uppercase tracking-widest text-brand-copper flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Loyalty Club Status</span>
              </span>
              <div className="text-display-sm font-display text-content-primary flex items-center gap-3">
                <span>{tier} Tier</span>
                <Badge variant="copper">
                  {tier === 'Gold' ? '2× Points + Free Delivery' : tier === 'Silver' ? '1.5× Points' : '1× Base Rate'}
                </Badge>
              </div>
              <p className="text-caption text-content-tertiary">Next goal: {nextTier}</p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-primary/70 border border-border-subtle space-y-1 text-center sm:text-left">
              <span className="text-caption font-mono uppercase text-content-tertiary">
                Redeemable Points
              </span>
              <div className="font-mono text-display-sm font-bold text-brand-copper">
                {earnedPoints} pts
              </div>
              <p className="text-[12px] text-content-secondary">
                Worth {formatPrice(earnedPoints * 0.1)} off your next café order.
              </p>
            </div>

            <div className="text-center md:text-right">
              <Button variant="copper-glow">
                <Link href="/menu">Redeem On Menu Order</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <h3 className="text-heading-sm font-display font-medium text-content-primary">
              Order History ({orders.length})
            </h3>
            <Link href="/menu" className="text-body-sm text-brand-copper hover:underline">
              Browse Menu
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 rounded-2xl bg-surface-secondary border border-border-subtle text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-content-tertiary mx-auto" />
              <h4 className="text-body-md font-medium text-content-primary">No orders placed yet</h4>
              <p className="text-caption text-content-secondary max-w-xs mx-auto">
                Explore our menu to place your first handcrafted order for dine-in, takeaway, or Motihari delivery.
              </p>
              <Button variant="secondary" size="sm">
                <Link href="/menu">Order Now</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-card hover:border-brand-copper/40 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-body-md font-bold text-brand-copper">
                        {ord.order_number}
                      </span>
                      <Badge variant="copper">
                        {ORDER_STATUS_LABELS[ord.status] || ord.status}
                      </Badge>
                      <span className="text-caption text-content-tertiary">
                        {formatDateTime(ord.created_at)}
                      </span>
                    </div>

                    <div className="text-body-sm text-content-secondary line-clamp-1">
                      {ord.items?.map((i) => `${i.quantity}× ${i.product_name}`).join(', ')}
                    </div>

                    <div className="flex items-center gap-4 text-caption text-content-tertiary">
                      <span>Mode: {ord.dining_mode.replace('_', ' ').toUpperCase()}</span>
                      <span>•</span>
                      <span>Payment: {ord.payment_method.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-border-subtle">
                    <span className="font-mono text-heading-sm font-bold text-content-primary">
                      {formatPrice(ord.grand_total)}
                    </span>

                    <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      <Link href={`/order-tracking/${ord.order_number}`}>
                        Track Order
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
