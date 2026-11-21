'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/data/mockMenu';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { Search, Flame, Check, X, Edit2, AlertCircle } from 'lucide-react';

export default function AdminMenuPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');

  const toggleAvailability = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_available: !p.is_available } : p))
    );
  };

  const toggleSpecial = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_todays_special: !p.is_todays_special } : p))
    );
  };

  const startEditPrice = (prod: Product) => {
    setEditingProduct(prod);
    setEditPrice(String(prod.base_price));
  };

  const saveEditPrice = () => {
    if (!editingProduct) return;
    const newPrice = parseFloat(editPrice);
    if (!isNaN(newPrice) && newPrice > 0) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, base_price: newPrice } : p))
      );
    }
    setEditingProduct(null);
  };

  const filtered = products.filter((p) => {
    if (categoryFilter !== 'all') {
      const cat = MOCK_CATEGORIES.find((c) => c.name === categoryFilter);
      if (cat && p.category_id !== cat.id) return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.short_description.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <h1 className="text-heading-lg font-display font-bold text-content-primary">
            Menu &amp; Availability Control
          </h1>
          <p className="text-body-sm text-content-secondary mt-0.5">
            Instant toggle for sold-out dishes, today&apos;s specials, and pricing updates.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-content-tertiary absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search menu items…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-secondary border border-border-subtle text-caption text-content-primary placeholder:text-content-tertiary focus:outline-none focus:border-brand-copper"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-caption font-medium transition-all ${
              categoryFilter === 'all'
                ? 'bg-brand-copper text-white'
                : 'bg-surface-secondary text-content-secondary border border-border-subtle'
            }`}
          >
            All Categories
          </button>
          {MOCK_CATEGORIES.slice(0, 6).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategoryFilter(c.name)}
              className={`px-3 py-1.5 rounded-lg text-caption font-medium transition-all whitespace-nowrap ${
                categoryFilter === c.name
                  ? 'bg-brand-copper text-white'
                  : 'bg-surface-secondary text-content-secondary border border-border-subtle'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl bg-surface-secondary border border-border-subtle overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead className="bg-surface-tertiary/60 border-b border-border-subtle text-caption font-mono uppercase text-content-tertiary">
              <tr>
                <th className="p-4 pl-6">Product</th>
                <th className="p-4">Base Price</th>
                <th className="p-4 text-center">Today&apos;s Special</th>
                <th className="p-4 text-center">Availability Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/50 text-content-secondary">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-surface-primary/40 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface-tertiary shrink-0">
                        <Image
                          src={prod.image_url}
                          alt={prod.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-content-primary">{prod.name}</div>
                        <span className="text-[11px] font-mono text-content-tertiary">
                          {prod.prep_time_min}–{prod.prep_time_max} mins prep
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-mono font-bold text-content-primary">
                    {formatPrice(prod.base_price)}
                  </td>

                  <td className="p-4 text-center">
                    <button
                      type="button"
                      onClick={() => toggleSpecial(prod.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-caption font-mono transition-all ${
                        prod.is_todays_special
                          ? 'bg-brand-copper/20 text-brand-copper border border-brand-copper/50 font-bold'
                          : 'bg-surface-tertiary text-content-tertiary hover:text-content-secondary'
                      }`}
                    >
                      <Flame className="w-3.5 h-3.5" />
                      <span>{prod.is_todays_special ? 'Active' : 'Off'}</span>
                    </button>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      type="button"
                      onClick={() => toggleAvailability(prod.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-caption font-medium transition-all ${
                        prod.is_available
                          ? 'bg-status-success-soft text-status-success border border-status-success/30'
                          : 'bg-status-error-soft text-status-error border border-status-error/30'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          prod.is_available ? 'bg-status-success' : 'bg-status-error'
                        }`}
                      />
                      <span>{prod.is_available ? 'Available' : 'Sold Out'}</span>
                    </button>
                  </td>

                  <td className="p-4 pr-6 text-right">
                    <button
                      type="button"
                      onClick={() => startEditPrice(prod)}
                      className="p-1.5 rounded-lg text-content-secondary hover:text-brand-copper hover:bg-surface-tertiary transition-colors"
                      title="Edit Price"
                      aria-label="Edit Price"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-surface-secondary border border-border p-6 space-y-5 shadow-elevated">
            <h3 className="text-heading-sm font-display text-content-primary">
              Update Price: {editingProduct.name}
            </h3>
            <div className="space-y-1 text-left">
              <label className="block text-caption font-mono uppercase text-content-secondary">
                Price in Indian Rupees (₹)
              </label>
              <input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-surface-primary border border-border-subtle text-content-primary font-mono text-body-md focus:outline-none focus:border-brand-copper"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setEditingProduct(null)}>
                Cancel
              </Button>
              <Button variant="copper-glow" size="sm" onClick={saveEditPrice}>
                Save Price
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
