'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/data/mockMenu';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { Search, Star, Clock, ArrowRight, X } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';

  const [query, setQuery] = useState<string>(initialQ);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return MOCK_PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.short_description.toLowerCase().includes(q);
      const matchTag = p.tags.some((t) => t.toLowerCase().includes(q));
      const matchIng = p.ingredients.some((i) => i.toLowerCase().includes(q));
      return matchName || matchDesc || matchTag || matchIng;
    });
  }, [query]);

  const quickPills = ['Cold Coffee', 'Latte', 'Pizza', 'Brownie', 'Burger', 'Chai', 'Truffle'];

  return (
    <div className="min-h-screen bg-surface-primary pb-28 text-left">
      <div className="border-b border-border-subtle bg-surface-secondary/40 py-12">
        <div className="section-container max-w-2xl text-center space-y-4">
          <h1 className="text-display-sm font-display text-content-primary">
            Search The Culinary Sanctuary
          </h1>
          <p className="text-body-md text-content-secondary">
            Find coffees, artisanal pizzas, pastas, and desserts by name, flavor, or ingredient.
          </p>

          <div className="relative pt-2">
            <Search className="w-5 h-5 text-content-tertiary absolute left-4 top-1/2 -translate-y-1/2 mt-1" />
            <input
              type="text"
              autoFocus
              placeholder="Try 'cold coffee', 'chocolate', 'spicy', 'sourdough'…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-full bg-surface-primary border border-border-subtle text-content-primary placeholder:text-content-tertiary text-body-md shadow-card focus:outline-none focus:border-brand-copper"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 mt-1 text-content-tertiary hover:text-content-primary"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-caption text-content-tertiary">Quick Tags:</span>
            {quickPills.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setQuery(pill)}
                className="px-3 py-1 rounded-full bg-surface-secondary border border-border-subtle text-caption text-content-secondary hover:text-brand-copper hover:border-brand-copper/50 transition-colors"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="section-container pt-10">
        {!query.trim() ? (
          <div className="text-center py-16 text-content-tertiary space-y-2">
            <Search className="w-12 h-12 mx-auto text-content-tertiary/40" />
            <p className="text-body-md">Start typing to search over 80+ handcrafted café items.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16 space-y-4 max-w-sm mx-auto">
            <h3 className="text-heading-sm font-display text-content-primary">
              No results for &ldquo;{query}&rdquo;
            </h3>
            <p className="text-body-sm text-content-secondary">
              Try searching by a broader term like &ldquo;coffee&rdquo;, &ldquo;burger&rdquo;, or &ldquo;dessert&rdquo;.
            </p>
            <Button variant="outline" onClick={() => setQuery('')}>
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-caption font-mono uppercase tracking-wider text-content-tertiary">
              Found {results.length} {results.length === 1 ? 'match' : 'matches'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((prod) => (
                <Link
                  key={prod.id}
                  href={`/product/${prod.slug}`}
                  className="group rounded-2xl bg-surface-secondary border border-border-subtle p-4 flex gap-4 hover:border-brand-copper/40 transition-all"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-surface-tertiary shrink-0">
                    <Image
                      src={prod.image_url}
                      alt={prod.name}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-body-md font-medium text-content-primary group-hover:text-brand-copper transition-colors truncate">
                        {prod.name}
                      </h4>
                      <p className="text-caption text-content-secondary line-clamp-2 mt-0.5">
                        {prod.short_description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-mono text-body-md font-bold text-brand-copper">
                        {formatPrice(prod.special_price || prod.base_price)}
                      </span>
                      <span className="text-[11px] font-mono text-content-tertiary flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{prod.prep_time_min}m</span>
                      </span>
                    </div>
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-primary flex items-center justify-center text-content-secondary">Loading search…</div>}>
      <SearchContent />
    </Suspense>
  );
}
