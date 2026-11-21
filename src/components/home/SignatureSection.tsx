'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_PRODUCTS } from '@/lib/data/mockMenu';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import { formatPrice } from '@/lib/utils';
import { Plus, Star, Clock, Check } from 'lucide-react';

export function SignatureSection() {
  const { addItem } = useCartStore();
  const { setCartDrawerOpen } = useUIStore();
  const [addedIds, setAddedIds] = React.useState<Record<string, boolean>>({});

  const featured = MOCK_PRODUCTS.filter((p) => p.is_featured).slice(0, 4);

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

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);

    setCartDrawerOpen(true);
  };

  return (
    <section className="section-spacing bg-surface-secondary/50 border-y border-border-subtle relative">
      <div className="section-container space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-3">
            <span className="text-caption font-mono uppercase tracking-widest text-brand-copper">
              Handcrafted Masterpieces
            </span>
            <h2 className="text-display-sm sm:text-display-md font-display text-content-primary">
              Signature Culinary Creations
            </h2>
            <p className="text-body-md text-content-secondary max-w-xl">
              Each dish and brew is refined through dozens of iterations, highlighting exquisite ingredients and timeless technique.
            </p>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-brand-copper hover:text-brand-copper-300 font-medium text-body-md transition-colors"
          >
            <span>Explore Entire Menu</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((prod) => {
            const isAdded = addedIds[prod.id];
            const price = prod.special_price || prod.base_price;

            return (
              <div
                key={prod.id}
                className="group rounded-2xl bg-surface-primary border border-border-subtle overflow-hidden hover:border-brand-copper/50 hover:shadow-card-hover transition-all duration-350 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-square w-full overflow-hidden bg-surface-tertiary">
                    <Image
                      src={prod.image_url}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-600 ease-luxury"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-primary via-transparent to-transparent opacity-60" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {prod.is_todays_special && (
                        <Badge variant="copper">Today’s Special</Badge>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[11px] font-mono text-content-primary">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>{prod.avg_rating.toFixed(1)}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2 text-left">
                    <div className="flex items-center gap-2 text-caption text-content-tertiary">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{prod.prep_time_min}–{prod.prep_time_max} mins</span>
                    </div>

                    <h3 className="text-heading-sm font-display font-medium text-content-primary group-hover:text-brand-copper transition-colors line-clamp-1">
                      {prod.name}
                    </h3>

                    <p className="text-body-sm text-content-secondary line-clamp-2">
                      {prod.short_description}
                    </p>
                  </div>
                </div>

                {/* Footer with Price and Quick Add */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-border-subtle/40 mt-3">
                  <div>
                    <div className="font-mono text-heading-sm font-bold text-content-primary">
                      {formatPrice(price)}
                    </div>
                    {prod.special_price && (
                      <span className="text-[12px] font-mono text-content-tertiary line-through">
                        {formatPrice(prod.base_price)}
                      </span>
                    )}
                  </div>

                  <Button
                    variant={isAdded ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => handleQuickAdd(prod)}
                    className="min-w-[100px]"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-status-success" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
