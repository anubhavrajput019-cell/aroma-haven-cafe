'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/data/mockMenu';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import { ProductVariant, AddOn, SpiceLevel } from '@/types';
import { SPICE_LEVELS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import {
  ChevronRight,
  Star,
  Clock,
  Flame,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = useMemo(() => {
    return MOCK_PRODUCTS.find((p) => p.slug === slug);
  }, [slug]);

  if (!product) {
    // If slug not in mock database
    notFound();
  }

  const category = MOCK_CATEGORIES.find((c) => c.id === product.category_id);
  const related = MOCK_PRODUCTS.filter(
    (p) => p.category_id === product.category_id && p.id !== product.id
  ).slice(0, 3);

  const { addItem } = useCartStore();
  const { setCartDrawerOpen } = useUIStore();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  );
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel | null>(
    product.spice_level || 'none'
  );
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Price calculations
  const basePrice = product.special_price || product.base_price;
  const variantAdj = selectedVariant?.price_adjustment || 0;
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = basePrice + variantAdj + addOnsTotal;
  const grandTotal = unitPrice * quantity;

  const toggleAddOn = (addon: AddOn) => {
    if (selectedAddOns.some((a) => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handleAddToCart = () => {
    addItem({
      product,
      variant: selectedVariant,
      add_ons: selectedAddOns,
      quantity,
      spice_level: selectedSpice,
      special_instructions: specialInstructions,
      unit_price: unitPrice,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    setCartDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface-primary pb-24 text-left">
      {/* Breadcrumbs */}
      <div className="border-b border-border-subtle bg-surface-secondary/40 py-3.5">
        <div className="section-container flex items-center gap-2 text-caption text-content-tertiary overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-content-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/menu" className="hover:text-content-primary transition-colors">
            Menu
          </Link>
          {category && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link
                href={`/menu?category=${encodeURIComponent(category.name)}`}
                className="hover:text-content-primary transition-colors"
              >
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-content-primary font-medium truncate max-w-xs">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="section-container pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Canvas */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-surface-secondary border border-border-subtle shadow-elevated">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {product.is_todays_special && (
                  <Badge variant="copper">Today’s Special</Badge>
                )}
                {product.is_vegetarian && (
                  <Badge variant="success">Vegetarian</Badge>
                )}
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-caption text-content-secondary">
              <div className="p-3 rounded-xl bg-surface-secondary border border-border-subtle flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-copper" />
                <span>Prep: {product.prep_time_min}–{product.prep_time_max} minutes</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-secondary border border-border-subtle flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-brand-copper" />
                <span>100% Quality Assurance</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Customizer Panel */}
          <div className="lg:col-span-6 space-y-7">
            {/* Header Titles */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 border border-border-subtle text-caption font-mono text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.avg_rating.toFixed(1)}</span>
                  <span className="text-content-tertiary">({product.review_count} demo ratings)</span>
                </span>
                <span className="text-caption font-mono text-brand-copper uppercase tracking-wider">
                  {category?.name}
                </span>
              </div>

              <h1 className="text-display-sm sm:text-display-md font-display text-content-primary">
                {product.name}
              </h1>

              <p className="text-body-md text-content-secondary leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pb-2 border-b border-border-subtle">
              <span className="font-mono text-display-sm font-bold text-content-primary">
                {formatPrice(unitPrice)}
              </span>
              {product.special_price && (
                <span className="font-mono text-body-lg text-content-tertiary line-through">
                  {formatPrice(product.base_price)}
                </span>
              )}
              <span className="text-caption text-content-tertiary">per portion</span>
            </div>

            {/* Variants / Sizes */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2.5">
                <label className="block text-caption font-mono uppercase tracking-wider text-content-primary font-semibold">
                  Select Size
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-brand-copper bg-brand-copper/15 text-content-primary'
                            : 'border-border-subtle bg-surface-secondary text-content-secondary hover:border-border'
                        }`}
                      >
                        <div>
                          <div className="text-body-sm font-medium">{v.name}</div>
                          {v.price_adjustment > 0 && (
                            <div className="text-caption font-mono text-brand-copper">
                              +{formatPrice(v.price_adjustment)}
                            </div>
                          )}
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-brand-copper" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add-ons */}
            {product.add_ons && product.add_ons.length > 0 && (
              <div className="space-y-2.5">
                <label className="block text-caption font-mono uppercase tracking-wider text-content-primary font-semibold">
                  Personalize with Add-ons
                </label>
                <div className="space-y-2">
                  {product.add_ons.map((addon) => {
                    const isSelected = selectedAddOns.some((a) => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddOn(addon)}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-brand-copper bg-brand-copper/15 text-content-primary'
                            : 'border-border-subtle bg-surface-secondary text-content-secondary hover:border-border'
                        }`}
                      >
                        <span className="text-body-sm font-medium">{addon.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-caption text-brand-copper">
                            +{formatPrice(addon.price)}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'bg-brand-copper border-brand-copper text-white'
                                : 'border-border-subtle'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Spice Levels */}
            {product.spice_level && product.spice_level !== 'none' && (
              <div className="space-y-2.5">
                <label className="flex items-center gap-1.5 text-caption font-mono uppercase tracking-wider text-content-primary font-semibold">
                  <Flame className="w-4 h-4 text-brand-copper" />
                  <span>Spice Level</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SPICE_LEVELS.filter((s) => s.key !== 'none').map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setSelectedSpice(s.key)}
                      className={`px-3 py-1.5 rounded-lg border text-caption font-medium transition-all ${
                        selectedSpice === s.key
                          ? 'border-brand-copper bg-brand-copper/20 text-brand-copper font-semibold'
                          : 'border-border-subtle bg-surface-secondary text-content-secondary hover:border-border'
                      }`}
                    >
                      {s.label} {s.emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Kitchen Instructions */}
            <div className="space-y-1.5">
              <label className="block text-caption font-mono uppercase tracking-wider text-content-primary font-semibold">
                Kitchen Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Extra hot, low sugar, dressing on the side…"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-surface-secondary border border-border-subtle text-content-primary placeholder:text-content-tertiary text-body-sm focus:outline-none focus:border-brand-copper"
              />
            </div>

            {/* Quantity & Add to Cart Controls */}
            <div className="p-5 rounded-2xl bg-surface-secondary border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-body-sm text-content-secondary">Quantity:</span>
                <div className="inline-flex items-center gap-3 bg-surface-primary border border-border-subtle rounded-lg px-3 py-1.5">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="text-content-secondary hover:text-content-primary disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-body-md font-bold min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-content-secondary hover:text-content-primary"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <Button
                variant="copper-glow"
                size="lg"
                onClick={handleAddToCart}
                className="w-full sm:w-auto min-w-[220px]"
                leftIcon={isAdded ? <Check className="w-5 h-5 text-status-success" /> : <ShoppingBag className="w-5 h-5" />}
              >
                {isAdded ? 'Added to Order!' : `Add • ${formatPrice(grandTotal)}`}
              </Button>
            </div>

            {/* Ingredients Tags */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-border-subtle">
                <span className="text-caption font-mono uppercase tracking-wider text-content-tertiary">
                  Key Ingredients &amp; Profile
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-surface-tertiary text-caption text-content-secondary border border-border-subtle/50"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border-subtle space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-heading-md font-display text-content-primary">
                More from {category?.name || 'the kitchen'}
              </h3>
              <Link
                href="/menu"
                className="text-body-sm font-medium text-brand-copper hover:underline inline-flex items-center gap-1"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.slug}`}
                  className="group rounded-2xl bg-surface-secondary border border-border-subtle overflow-hidden hover:border-brand-copper/40 transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-4/3 w-full bg-surface-tertiary overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="text-body-md font-medium text-content-primary group-hover:text-brand-copper transition-colors truncate">
                      {item.name}
                    </h4>
                    <p className="font-mono text-body-sm font-bold text-brand-copper">
                      {formatPrice(item.special_price || item.base_price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
