'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/data/mockMenu';
import { ProductCustomizerModal } from '@/components/menu/ProductCustomizerModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Search, Star, Clock, SlidersHorizontal, Plus, ArrowUpDown, X } from 'lucide-react';

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'vegan'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((prod) => {
      // Category filter
      if (activeCategory !== 'All') {
        const cat = MOCK_CATEGORIES.find((c) => c.name.toLowerCase() === activeCategory.toLowerCase());
        if (cat && prod.category_id !== cat.id) return false;
      }

      // Dietary filter
      if (dietaryFilter === 'veg' && !prod.is_vegetarian) return false;
      if (dietaryFilter === 'vegan' && !prod.is_vegan) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesDesc = prod.short_description.toLowerCase().includes(q);
        const matchesTags = prod.tags.some((t) => t.toLowerCase().includes(q));
        const matchesIngr = prod.ingredients.some((i) => i.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesTags && !matchesIngr) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        const pA = a.special_price || a.base_price;
        const pB = b.special_price || b.base_price;
        return pA - pB;
      }
      if (sortBy === 'price-desc') {
        const pA = a.special_price || a.base_price;
        const pB = b.special_price || b.base_price;
        return pB - pA;
      }
      if (sortBy === 'rating') {
        return b.avg_rating - a.avg_rating;
      }
      return a.display_order - b.display_order;
    });
  }, [activeCategory, dietaryFilter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-surface-primary pb-24 text-left">
      {/* Header Banner */}
      <div className="border-b border-border-subtle bg-surface-secondary/70 py-12 sm:py-16">
        <div className="section-container space-y-4">
          <span className="text-caption font-mono uppercase tracking-widest text-brand-copper">
            Artisanal Dining &amp; Brews
          </span>
          <h1 className="text-display-sm sm:text-display-md font-display text-content-primary">
            The Aroma Haven Menu
          </h1>
          <p className="text-body-lg text-content-secondary max-w-xl">
            Single-origin coffees, hand-kneaded sourdough pizzas, gourmet sandwiches, and handcrafted sweets made fresh 24 hours a day.
          </p>
        </div>
      </div>

      {/* Sticky Filtering & Category Navigation Bar */}
      <div className="sticky top-20 z-30 bg-surface-primary/95 backdrop-blur-md border-b border-border-subtle shadow-sm py-4">
        <div className="section-container space-y-4">
          {/* Search & Filter Controls Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-content-tertiary absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search coffee, pizza, burgers, ingredients…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-full bg-surface-secondary border border-border-subtle text-content-primary placeholder:text-content-tertiary text-body-sm focus:outline-none focus:border-brand-copper focus:ring-1 focus:ring-brand-copper"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-content-tertiary hover:text-content-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary & Sorting Toggles */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {/* Dietary Buttons */}
              <button
                type="button"
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 rounded-full text-caption font-medium transition-all ${
                  dietaryFilter === 'all'
                    ? 'bg-brand-copper text-white'
                    : 'bg-surface-secondary text-content-secondary border border-border-subtle hover:text-content-primary'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'veg' ? 'all' : 'veg')}
                className={`px-3 py-1.5 rounded-full text-caption font-medium transition-all ${
                  dietaryFilter === 'veg'
                    ? 'bg-status-success text-white'
                    : 'bg-surface-secondary text-content-secondary border border-border-subtle hover:text-content-primary'
                }`}
              >
                🌱 Veg Only
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'vegan' ? 'all' : 'vegan')}
                className={`px-3 py-1.5 rounded-full text-caption font-medium transition-all ${
                  dietaryFilter === 'vegan'
                    ? 'bg-status-success text-white'
                    : 'bg-surface-secondary text-content-secondary border border-border-subtle hover:text-content-primary'
                }`}
              >
                Vegan
              </button>

              {/* Sort Selector */}
              <div className="relative inline-flex items-center ml-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  aria-label="Sort products by"
                  className="px-3 py-1.5 rounded-lg bg-surface-secondary border border-border-subtle text-caption text-content-secondary font-medium focus:outline-none focus:border-brand-copper pr-8 appearance-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-content-tertiary absolute right-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-full text-caption font-medium whitespace-nowrap transition-all ${
                activeCategory === 'All'
                  ? 'bg-brand-copper/20 text-brand-copper border border-brand-copper/60 font-semibold'
                  : 'bg-surface-secondary text-content-secondary border border-border-subtle hover:text-content-primary'
              }`}
            >
              All Items ({MOCK_PRODUCTS.length})
            </button>
            {MOCK_CATEGORIES.map((cat) => {
              const count = MOCK_PRODUCTS.filter((p) => p.category_id === cat.id).length;
              const isSelected = activeCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-caption font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-brand-copper/20 text-brand-copper border border-brand-copper/60 font-semibold'
                      : 'bg-surface-secondary text-content-secondary border border-border-subtle hover:text-content-primary'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Grid Area */}
      <div className="section-container pt-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-surface-secondary border border-border-subtle flex items-center justify-center text-content-tertiary mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-heading-md font-display text-content-primary">
              No matching items found
            </h3>
            <p className="text-body-sm text-content-secondary">
              We couldn&apos;t find any dishes matching &ldquo;{searchQuery}&rdquo;. Try another keyword or reset filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setDietaryFilter('all');
              }}
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => {
              const price = prod.special_price || prod.base_price;

              return (
                <div
                  key={prod.id}
                  className="rounded-2xl bg-surface-secondary border border-border-subtle overflow-hidden hover:border-brand-copper/40 hover:shadow-card-hover transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image & Quick Badges */}
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-surface-tertiary">
                      <Image
                        src={prod.image_url}
                        alt={prod.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-luxury"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-primary/80 via-transparent to-transparent opacity-60" />

                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {prod.is_todays_special && (
                          <Badge variant="copper">Today’s Special</Badge>
                        )}
                        {prod.is_vegetarian && (
                          <Badge variant="success">Veg</Badge>
                        )}
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-[11px] font-mono text-content-primary">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span>{prod.avg_rating.toFixed(1)}</span>
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-caption text-content-tertiary">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{prod.prep_time_min}–{prod.prep_time_max}m</span>
                        </span>
                        {prod.variants && prod.variants.length > 0 && (
                          <span className="font-mono text-[11px] text-brand-copper">
                            {prod.variants.length} Sizes
                          </span>
                        )}
                      </div>

                      <Link href={`/product/${prod.slug}`}>
                        <h3 className="text-body-md font-medium text-content-primary group-hover:text-brand-copper transition-colors line-clamp-1">
                          {prod.name}
                        </h3>
                      </Link>

                      <p className="text-caption text-content-secondary line-clamp-2">
                        {prod.short_description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 pt-0 flex items-center justify-between border-t border-border-subtle/40 mt-3">
                    <div>
                      <div className="font-mono text-body-md font-bold text-content-primary">
                        {formatPrice(price)}
                      </div>
                      {prod.special_price && (
                        <span className="text-[11px] font-mono text-content-tertiary line-through">
                          {formatPrice(prod.base_price)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/product/${prod.slug}`}>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-caption">
                          Details
                        </Button>
                      </Link>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setCustomizingProduct(prod)}
                        className="h-8 px-3"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        <span>Customize</span>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Customizer Modal */}
      <ProductCustomizerModal
        product={customizingProduct}
        isOpen={Boolean(customizingProduct)}
        onClose={() => setCustomizingProduct(null)}
      />
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-primary flex items-center justify-center text-content-secondary">Loading Menu…</div>}>
      <MenuContent />
    </Suspense>
  );
}
