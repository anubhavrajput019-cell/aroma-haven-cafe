'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CoffeeScene } from '@/components/three/CoffeeScene';
import { BRAND } from '@/lib/constants';
import { ArrowRight, UtensilsCrossed, Clock, Truck, Award } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-6 pb-16 lg:py-12">
      {/* Background radial gradients for warm luxury depth */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-copper/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-brand-espresso/60 rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Manifesto & CTA */}
          <div className="lg:col-span-7 space-y-7 text-left">
            <div className="inline-flex items-center gap-2">
              <Badge variant="copper" dot>
                Motihari’s Premier 24×7 Specialty Lounge
              </Badge>
            </div>

            <div className="space-y-3">
              <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-display text-content-primary leading-[1.08]">
                Where Every Drop Tells A{' '}
                <span className="text-gradient-copper italic">Story Of Passion.</span>
              </h1>
              <p className="font-heading text-heading-md sm:text-heading-lg text-brand-copper italic">
                “{BRAND.tagline}”
              </p>
            </div>

            <p className="text-body-lg text-content-secondary max-w-xl leading-relaxed">
              Step into an intimate sanctuary of handcrafted single-origin roasts, slow-fermented sourdough pizzas, and bespoke desserts. Crafted with precision, poured with love, and open day and night in Motihari.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="copper-glow"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                <Link href="/menu">Order For Delivery</Link>
              </Button>

              <Button variant="secondary" size="lg" leftIcon={<UtensilsCrossed className="w-5 h-5" />}>
                <Link href="/menu?dining=dine_in">Reserve A Table</Link>
              </Button>
            </div>

            {/* Trust & Operational Badges */}
            <div className="pt-8 border-t border-border-subtle/80 grid grid-cols-3 gap-4 max-w-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-brand-copper text-caption font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>24 × 7 OPEN</span>
                </div>
                <p className="text-[12px] text-content-tertiary">Fresh kitchen all night</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-brand-copper text-caption font-semibold">
                  <Truck className="w-4 h-4" />
                  <span>MOTIHARI CITY</span>
                </div>
                <p className="text-[12px] text-content-tertiary">Free delivery over ₹299</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-brand-copper text-caption font-semibold">
                  <Award className="w-4 h-4" />
                  <span>100% ARABICA</span>
                </div>
                <p className="text-[12px] text-content-tertiary">Single-estate beans</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Coffee Experience Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative">
              <CoffeeScene />
              <div className="text-center mt-[-10px] pointer-events-none">
                <span className="text-[11px] font-mono text-content-tertiary uppercase tracking-widest">
                  ✦ Drag to orbit • Interactive 3D Brew
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
