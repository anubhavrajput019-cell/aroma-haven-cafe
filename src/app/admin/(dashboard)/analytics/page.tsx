'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { BarChart3, TrendingUp, Users, Calendar, Clock, DollarSign } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const hourlyData = [
    { time: '08:00', orders: 14, label: 'Breakfast Rush' },
    { time: '11:00', orders: 22, label: 'Mid-Morning Coffee' },
    { time: '14:00', orders: 38, label: 'Lunch & Gourmet Pizza' },
    { time: '17:00', orders: 45, label: 'Evening Coffee & Shakes' },
    { time: '20:00', orders: 52, label: 'Dinner Peak' },
    { time: '23:00', orders: 30, label: 'Late Night Dessert Rush' },
    { time: '02:00', orders: 18, label: 'Night Owl Orders' },
  ];

  return (
    <div className="space-y-8 text-left">
      <div className="border-b border-border-subtle pb-6">
        <h1 className="text-heading-lg font-display font-bold text-content-primary">
          Operations Analytics &amp; Demands
        </h1>
        <p className="text-body-sm text-content-secondary mt-0.5">
          24×7 time-of-day order distributions and financial growth metrics.
        </p>
      </div>

      {/* Hourly Rush Chart Simulation */}
      <div className="p-8 rounded-3xl bg-surface-secondary border border-border-subtle space-y-6 shadow-card">
        <div className="flex items-center justify-between border-b border-border-subtle pb-4">
          <div className="space-y-1">
            <h3 className="text-heading-sm font-display font-medium text-content-primary">
              24-Hour Ordering Rhythm (Motihari)
            </h3>
            <p className="text-caption text-content-secondary">
              Hourly order density across dine-in, takeaway, and late-night delivery.
            </p>
          </div>
          <span className="text-caption font-mono text-brand-copper bg-brand-copper/15 px-3 py-1 rounded-full">
            Continuous 24×7 Schedule
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-end pt-6">
          {hourlyData.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-2 text-center">
              <span className="font-mono text-caption text-brand-copper font-bold">
                {h.orders} ord
              </span>
              <div className="w-full bg-surface-tertiary rounded-t-xl h-36 flex items-end justify-center p-1.5 overflow-hidden">
                <div
                  className="w-full bg-gradient-to-t from-brand-copper to-brand-copper-300 rounded-t-lg transition-all duration-700"
                  style={{ height: `${(h.orders / 55) * 100}%` }}
                />
              </div>
              <span className="font-mono text-caption text-content-primary">{h.time}</span>
              <span className="text-[10px] text-content-tertiary line-clamp-1">{h.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle space-y-2">
          <span className="text-caption font-mono uppercase text-content-tertiary">Customer Retention Rate</span>
          <div className="font-mono text-display-sm font-bold text-status-success">68.4%</div>
          <p className="text-caption text-content-secondary">Return customers in Motihari</p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle space-y-2">
          <span className="text-caption font-mono uppercase text-content-tertiary">Peak Ordering Hour</span>
          <div className="font-mono text-display-sm font-bold text-brand-copper">20:00 – 22:30</div>
          <p className="text-caption text-content-secondary">Dinner &amp; Sourdough Pizza Rush</p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle space-y-2">
          <span className="text-caption font-mono uppercase text-content-tertiary">Avg Prep to Fulfillment</span>
          <div className="font-mono text-display-sm font-bold text-content-primary">12.8 mins</div>
          <p className="text-caption text-content-secondary">Exceeding standard target of 15m</p>
        </div>
      </div>
    </div>
  );
}
