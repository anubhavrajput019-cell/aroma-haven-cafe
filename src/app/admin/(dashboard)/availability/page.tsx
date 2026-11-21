'use client';

import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '@/lib/data/mockMenu';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Check, X, ToggleLeft, AlertTriangle } from 'lucide-react';

export default function AdminAvailabilityPage() {
  const [items, setItems] = useState(MOCK_PRODUCTS);

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_available: !p.is_available } : p))
    );
  };

  const soldOutCount = items.filter((i) => !i.is_available).length;

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <h1 className="text-heading-lg font-display font-bold text-content-primary">
            Quick Kitchen Availability Board
          </h1>
          <p className="text-body-sm text-content-secondary mt-0.5">
            Rapid toggle for items that run out during rush hours. Updates customer menu instantly.
          </p>
        </div>

        {soldOutCount > 0 ? (
          <Badge variant="warning">
            {soldOutCount} items marked Sold Out
          </Badge>
        ) : (
          <Badge variant="success">
            All Kitchen Items In Stock
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((prod) => (
          <div
            key={prod.id}
            className={`p-4 rounded-xl border flex items-center justify-between gap-3 transition-all ${
              prod.is_available
                ? 'bg-surface-secondary border-border-subtle'
                : 'bg-status-error-soft/20 border-status-error/40'
            }`}
          >
            <div className="min-w-0">
              <h4 className="text-body-sm font-medium text-content-primary truncate">
                {prod.name}
              </h4>
              <span className="text-[11px] font-mono text-content-tertiary">
                {prod.is_available ? 'Available to order' : 'Unavailable / Out of Stock'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => toggle(prod.id)}
              className={`px-3 py-1.5 rounded-lg text-caption font-medium transition-all ${
                prod.is_available
                  ? 'bg-status-success-soft text-status-success border border-status-success/30 hover:bg-status-error-soft hover:text-status-error'
                  : 'bg-status-error text-white font-bold'
              }`}
            >
              {prod.is_available ? 'Active' : 'SOLD OUT'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
