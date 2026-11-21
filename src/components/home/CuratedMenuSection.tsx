'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/data/mockMenu';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import { formatPrice } from '@/lib/utils';
import { Plus, ArrowRight, Star } from 'lucide-react';

export function CuratedMenuSection() {
  const [selectedCatId, setSelectedCatId] = useState<string>(MOCK_CATEGORIES[0].id);
  const { addItem } = useCartStore();
  const { setCartDrawerOpen } = useUIStore();

  const activeCategory = MOCK_CATEGORIES.find((c) => c.id === selectedCatId) || MOCK_CATEGORIES[0];
  const categoryProducts = MOCK_PRODUCTS.filter((p) => p.category_id === selectedCatId);

  const handleQuickAdd = (product: typeof MOCK_PRODUCTS[0]) => {
    addItem({
      product,
      variant: product.variants?.[0] || null,
      add_ons: [],
      quantity: 1,
      spice_level: product.spice_level,
      special_instructions: '',
      unit_price: product.special_price || product.base_price,
    });
    setCartDrawerOpen(true);
  };

  return (
    <section className="section-spacing bg-surface-primary relative">
      <div className="section-container space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-caption font-mono uppercase tracking-widest text-brand-copper">
            Curated Tastings
          </span>
          <h2 className="text-display-sm sm:text-display-md font-display text-content-primary">
            Explore The Aroma Haven Menu
          </h2>
          <p className="text-body-md text-content-secondary">
            From sunrise breakfast to midnight cravings — select a category to discover our handcrafted creations.
          </p>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {MOCK_CATEGORIES.slice(0, 7).map((cat) => {
            const isSelected = cat.id === selectedCatId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCatId(cat.id)}
                className={`px-5 py-2.5 rounded-full text-body-sm font-medium transition-all duration-300 whitespace-nowrap select-none ${
                  isSelected
                    ? 'bg-brand-copper text-white shadow-glow-copper font-semibold'
                    : 'bg-surface-secondary text-content-secondary hover:text-content-primary hover:bg-surface-tertiary border border-border-subtle'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Products in selected category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {categoryProducts.map((prod) => (
            <div
              key={prod.id}
              className="p-5 rounded-2xl bg-surface-secondary border border-border-subtle hover:border-brand-copper/40 transition-all flex gap-4 text-left group"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-surface-tertiary shrink-0">
                <Image
                  src={prod.image_url}
                  alt={prod.name}
                  fill
                  sizes="112px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-mono text-brand-copper">
                      {prod.prep_time_min}–{prod.prep_time_max}m prep
                    </span>
                    <span className="inline-flex items-center text-[11px] text-amber-400 font-mono">
                      <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                      {prod.avg_rating.toFixed(1)}
                    </span>
                  </div>

                  <h3 className="text-body-md font-medium text-content-primary group-hover:text-brand-copper transition-colors truncate">
                    {prod.name}
                  </h3>

                  <p className="text-caption text-content-secondary line-clamp-2 mt-0.5">
                    {prod.short_description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono font-bold text-body-md text-content-primary">
                    {formatPrice(prod.special_price || prod.base_price)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAdd(prod)}
                    className="h-8 px-2.5"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    <span>Add</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All CTA */}
        <div className="text-center pt-6">
          <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            <Link href={`/menu?category=${encodeURIComponent(activeCategory.name)}`}>
              View All in {activeCategory.name}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
