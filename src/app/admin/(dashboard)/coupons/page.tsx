'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { Tag, Plus, Check, Trash2 } from 'lucide-react';

interface PromoCoupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  timesUsed: number;
  isActive: boolean;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<PromoCoupon[]>([
    { code: 'AROMA10', type: 'percentage', value: 10, minOrder: 100, timesUsed: 84, isActive: true },
    { code: 'WELCOME50', type: 'fixed', value: 50, minOrder: 200, timesUsed: 142, isActive: true },
    { code: 'FESTIVE20', type: 'percentage', value: 20, minOrder: 300, timesUsed: 29, isActive: true },
  ]);

  const [newCode, setNewCode] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newMin, setNewMin] = useState('150');

  const toggleCoupon = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newValue.trim()) return;

    setCoupons((prev) => [
      ...prev,
      {
        code: newCode.trim().toUpperCase(),
        type: 'percentage',
        value: parseFloat(newValue) || 10,
        minOrder: parseFloat(newMin) || 100,
        timesUsed: 0,
        isActive: true,
      },
    ]);
    setNewCode('');
    setNewValue('');
  };

  return (
    <div className="space-y-8 text-left">
      <div className="border-b border-border-subtle pb-6">
        <h1 className="text-heading-lg font-display font-bold text-content-primary">
          Promotions &amp; Coupon Engine
        </h1>
        <p className="text-body-sm text-content-secondary mt-0.5">
          Server-authoritative discount codes and minimum order rules.
        </p>
      </div>

      {/* Create Promo Box */}
      <form onSubmit={handleAdd} className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle space-y-4 shadow-card">
        <h3 className="text-body-md font-semibold text-content-primary uppercase font-mono tracking-wider">
          Create New Voucher Code
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="PROMO CODE (e.g. VIP25)"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            className="px-3.5 py-2 rounded-lg bg-surface-primary border border-border-subtle text-caption font-mono uppercase focus:outline-none focus:border-brand-copper"
          />
          <input
            type="number"
            placeholder="Discount % (e.g. 15)"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="px-3.5 py-2 rounded-lg bg-surface-primary border border-border-subtle text-caption font-mono focus:outline-none focus:border-brand-copper"
          />
          <input
            type="number"
            placeholder="Min Order (₹)"
            value={newMin}
            onChange={(e) => setNewMin(e.target.value)}
            className="px-3.5 py-2 rounded-lg bg-surface-primary border border-border-subtle text-caption font-mono focus:outline-none focus:border-brand-copper"
          />
          <Button variant="copper-glow" size="sm" type="submit" leftIcon={<Plus className="w-4 h-4" />}>
            Add Promo Code
          </Button>
        </div>
      </form>

      {/* Active Coupons List */}
      <div className="rounded-2xl bg-surface-secondary border border-border-subtle overflow-hidden shadow-card">
        <table className="w-full text-left text-body-sm">
          <thead className="bg-surface-tertiary/60 border-b border-border-subtle text-caption font-mono uppercase text-content-tertiary">
            <tr>
              <th className="p-4 pl-6">Code</th>
              <th className="p-4">Benefit</th>
              <th className="p-4">Min Order</th>
              <th className="p-4">Times Redeemed</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 pr-6 text-right">Toggle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle/50 text-content-secondary">
            {coupons.map((c) => (
              <tr key={c.code} className="hover:bg-surface-primary/40 transition-colors">
                <td className="p-4 pl-6 font-mono font-bold text-brand-copper text-body-md">
                  {c.code}
                </td>
                <td className="p-4 font-medium text-content-primary">
                  {c.type === 'percentage' ? `${c.value}% Off` : `₹${c.value} Flat Off`}
                </td>
                <td className="p-4 font-mono">{formatPrice(c.minOrder)}</td>
                <td className="p-4 font-mono">{c.timesUsed} uses</td>
                <td className="p-4 text-center">
                  <Badge variant={c.isActive ? 'success' : 'neutral'}>
                    {c.isActive ? 'Active' : 'Disabled'}
                  </Badge>
                </td>
                <td className="p-4 pr-6 text-right">
                  <Button
                    variant={c.isActive ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => toggleCoupon(c.code)}
                  >
                    {c.isActive ? 'Disable' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
