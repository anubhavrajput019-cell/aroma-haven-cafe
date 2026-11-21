'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useUIStore } from '@/stores/uiStore';
import { useCartStore } from '@/stores/cartStore';
import { MOCK_PRODUCTS } from '@/lib/data/mockMenu';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Sparkles, Coffee, Flame, Plus, Check } from 'lucide-react';

export function CafeConciergeModal() {
  const { isConciergeOpen, setConciergeOpen, setCartDrawerOpen } = useUIStore();
  const { addItem } = useCartStore();

  // Recommendation Criteria State
  const [temperature, setTemperature] = useState<'any' | 'hot' | 'cold'>('any');
  const [sweetness, setSweetness] = useState<'any' | 'sweet' | 'bold'>('any');
  const [creamy, setCreamy] = useState<'any' | 'creamy' | 'light'>('any');
  const [dietary, setDietary] = useState<'any' | 'veg' | 'vegan'>('any');
  const [mealType, setMealType] = useState<'any' | 'beverage' | 'food' | 'dessert'>('any');

  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Filter recommendations based on real menu database (No hallucination per Section 28)
  const recommendations = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      if (!p.is_available) return false;

      // Dietary
      if (dietary === 'veg' && !p.is_vegetarian) return false;
      if (dietary === 'vegan' && !p.is_vegan) return false;

      // Meal Type
      if (mealType === 'beverage' && !['cat-coffee', 'cat-cold-coffee', 'cat-tea', 'cat-shakes', 'cat-mocktails'].includes(p.category_id)) return false;
      if (mealType === 'food' && !['cat-pizza', 'cat-pasta', 'cat-burgers', 'cat-sandwiches'].includes(p.category_id)) return false;
      if (mealType === 'dessert' && p.category_id !== 'cat-desserts') return false;

      // Temperature
      if (temperature === 'hot' && !p.tags.includes('hot')) return false;
      if (temperature === 'cold' && !p.tags.includes('cold')) return false;

      // Sweetness
      if (sweetness === 'sweet' && !p.tags.includes('sweet')) return false;
      if (sweetness === 'bold' && p.tags.includes('sweet')) return false;

      // Creaminess
      if (creamy === 'creamy' && !p.tags.includes('creamy')) return false;

      return true;
    }).slice(0, 3);
  }, [temperature, sweetness, creamy, dietary, mealType]);

  const handleQuickAdd = (product: Product) => {
    addItem({
      product,
      variant: product.variants?.[0] || null,
      add_ons: [],
      quantity: 1,
      spice_level: product.spice_level,
      special_instructions: '',
      unit_price: product.special_price || product.base_price,
    });
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
    setCartDrawerOpen(true);
  };

  return (
    <Modal
      isOpen={isConciergeOpen}
      onClose={() => setConciergeOpen(false)}
      maxWidth="lg"
      title={
        <span className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-copper" />
          <span>Aroma Café Concierge</span>
        </span>
      }
      description="Curated palate guide matching real available dishes from our Motihari kitchen."
    >
      <div className="space-y-6 text-left">
        {/* Selector Filters */}
        <div className="space-y-4 p-5 rounded-2xl bg-surface-primary border border-border-subtle">
          <span className="text-caption font-mono uppercase tracking-wider text-content-tertiary block">
            Tell Us What You Are Craving
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Meal Type */}
            <div className="space-y-1.5">
              <label className="text-caption font-medium text-content-secondary">Craving Type</label>
              <div className="flex gap-2">
                {[
                  { key: 'any', label: 'Surprise Me' },
                  { key: 'beverage', label: 'Brews' },
                  { key: 'food', label: 'Cuisine' },
                  { key: 'dessert', label: 'Dessert' },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setMealType(t.key as typeof mealType)}
                    className={`px-3 py-1.5 rounded-lg text-caption font-medium transition-all ${
                      mealType === t.key
                        ? 'bg-brand-copper text-white'
                        : 'bg-surface-secondary text-content-secondary border border-border-subtle'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature */}
            <div className="space-y-1.5">
              <label className="text-caption font-medium text-content-secondary">Temperature</label>
              <div className="flex gap-2">
                {[
                  { key: 'any', label: 'Either' },
                  { key: 'hot', label: 'Warm & Hot' },
                  { key: 'cold', label: 'Chilled & Iced' },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTemperature(t.key as typeof temperature)}
                    className={`px-3 py-1.5 rounded-lg text-caption font-medium transition-all ${
                      temperature === t.key
                        ? 'bg-brand-copper text-white'
                        : 'bg-surface-secondary text-content-secondary border border-border-subtle'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sweetness */}
            <div className="space-y-1.5">
              <label className="text-caption font-medium text-content-secondary">Flavor Tone</label>
              <div className="flex gap-2">
                {[
                  { key: 'any', label: 'Any' },
                  { key: 'sweet', label: 'Sweet / Dessert' },
                  { key: 'bold', label: 'Bold / Savory' },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setSweetness(t.key as typeof sweetness)}
                    className={`px-3 py-1.5 rounded-lg text-caption font-medium transition-all ${
                      sweetness === t.key
                        ? 'bg-brand-copper text-white'
                        : 'bg-surface-secondary text-content-secondary border border-border-subtle'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Creaminess */}
            <div className="space-y-1.5">
              <label className="text-caption font-medium text-content-secondary">Body Texture</label>
              <div className="flex gap-2">
                {[
                  { key: 'any', label: 'Any' },
                  { key: 'creamy', label: 'Rich & Creamy' },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setCreamy(t.key as typeof creamy)}
                    className={`px-3 py-1.5 rounded-lg text-caption font-medium transition-all ${
                      creamy === t.key
                        ? 'bg-brand-copper text-white'
                        : 'bg-surface-secondary text-content-secondary border border-border-subtle'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Matched Recommendations Results */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-caption font-mono uppercase text-content-tertiary">
            <span>Matched Café Pairings ({recommendations.length})</span>
            <span className="text-[11px] text-brand-copper">Guaranteed in-stock</span>
          </div>

          {recommendations.length === 0 ? (
            <div className="p-8 text-center text-content-tertiary bg-surface-primary rounded-xl border border-border-subtle">
              <p className="text-body-sm">No exact match for this combination. Try setting filters to &ldquo;Any&rdquo;.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recommendations.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-xl bg-surface-primary border border-border-subtle flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-surface-tertiary shrink-0">
                      <Image
                        src={prod.image_url}
                        alt={prod.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-body-sm font-medium text-content-primary truncate">
                        {prod.name}
                      </h4>
                      <p className="text-[12px] text-content-secondary truncate">
                        {prod.short_description}
                      </p>
                      <span className="font-mono text-body-sm font-bold text-brand-copper">
                        {formatPrice(prod.special_price || prod.base_price)}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant={addedIds[prod.id] ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => handleQuickAdd(prod)}
                    className="shrink-0"
                  >
                    {addedIds[prod.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-status-success" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Order</span>
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
