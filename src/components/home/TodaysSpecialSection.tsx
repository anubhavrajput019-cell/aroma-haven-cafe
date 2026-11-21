'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_PRODUCTS } from '@/lib/data/mockMenu';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import { formatPrice } from '@/lib/utils';
import { Sparkles, ArrowRight, Flame, Clock } from 'lucide-react';

export function TodaysSpecialSection() {
  const { addItem } = useCartStore();
  const { setCartDrawerOpen } = useUIStore();

  // Find today's special product
  const specialProduct = MOCK_PRODUCTS.find((p) => p.is_todays_special) || MOCK_PRODUCTS[0];

  const handleOrderSpecial = () => {
    addItem({
      product: specialProduct,
      variant: specialProduct.variants?.[0] || null,
      add_ons: [],
      quantity: 1,
      spice_level: specialProduct.spice_level,
      special_instructions: '',
      unit_price: specialProduct.special_price || specialProduct.base_price,
    });
    setCartDrawerOpen(true);
  };

  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="section-container">
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-espresso-600 via-surface-secondary to-surface-primary border border-brand-copper/30 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-elevated">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-copper/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Image Showcase */}
            <div className="lg:col-span-6 relative aspect-video sm:aspect-square lg:aspect-4/3 rounded-2xl overflow-hidden border border-brand-copper/40 shadow-glow-copper">
              <Image
                src={specialProduct.image_url}
                alt={specialProduct.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="copper" dot className="bg-black/70 backdrop-blur-xs">
                  Today&apos;s Exclusive Spotlight
                </Badge>
              </div>
            </div>

            {/* Details & Ordering */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-brand-copper text-caption font-mono uppercase tracking-widest">
                  <Flame className="w-4 h-4 text-brand-copper" />
                  <span>Chef Anubhav Rajput&apos;s Daily Choice</span>
                </div>
                <h2 className="text-display-sm sm:text-display-md font-display text-content-primary">
                  {specialProduct.name}
                </h2>
              </div>

              <p className="text-body-lg text-content-secondary leading-relaxed">
                {specialProduct.description}
              </p>

              {/* Ingredients & Prep */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-body-sm text-content-secondary">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-tertiary border border-border-subtle">
                  <Clock className="w-4 h-4 text-brand-copper" />
                  <span>Prep: {specialProduct.prep_time_min}–{specialProduct.prep_time_max} mins</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-tertiary border border-border-subtle">
                  <Sparkles className="w-4 h-4 text-brand-copper" />
                  <span>Rating: {specialProduct.avg_rating.toFixed(1)} / 5.0</span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border-subtle">
                <div>
                  <div className="text-caption text-content-tertiary uppercase font-mono">
                    Special Offer
                  </div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-display-sm font-bold text-brand-copper">
                      {formatPrice(specialProduct.special_price || specialProduct.base_price)}
                    </span>
                    {specialProduct.special_price && (
                      <span className="font-mono text-body-lg text-content-tertiary line-through">
                        {formatPrice(specialProduct.base_price)}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  variant="copper-glow"
                  size="lg"
                  onClick={handleOrderSpecial}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Order Special Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
