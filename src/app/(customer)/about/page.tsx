import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BRAND } from '@/lib/constants';
import { Coffee, Heart, Sparkles, Clock, MapPin, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-primary pb-28 text-left">
      {/* Editorial Hero Header */}
      <div className="border-b border-border-subtle bg-surface-secondary/50 py-16 sm:py-24 relative overflow-hidden">
        <div className="section-container max-w-4xl space-y-6">
          <Badge variant="copper">The Aroma Haven Brand Story</Badge>
          <h1 className="text-display-md sm:text-display-lg font-display text-content-primary leading-[1.12]">
            Crafted With Precision. Poured With{' '}
            <span className="text-gradient-copper italic">Warmth &amp; Love.</span>
          </h1>
          <p className="font-heading text-heading-lg text-brand-copper italic">
            “{BRAND.tagline}”
          </p>
          <p className="text-body-lg text-content-secondary max-w-2xl leading-relaxed">
            Founded in Motihari by Anubhav Rajput, Aroma Haven Café is built upon a simple conviction: world-class specialty coffee and refined hospitality belong everywhere people gather to dream, connect, and celebrate.
          </p>
        </div>
      </div>

      <div className="section-container pt-16 space-y-24">
        {/* Story Section 1: The Coffee Craft */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-4/3 rounded-3xl overflow-hidden border border-brand-copper/30 shadow-elevated">
            <Image
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80"
              alt="Artisan coffee beans selection"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-caption font-mono uppercase tracking-widest text-brand-copper">
              Origins &amp; Extraction
            </span>
            <h2 className="text-display-sm font-display text-content-primary">
              100% Specialty Arabica Roasts
            </h2>
            <p className="text-body-md text-content-secondary leading-relaxed">
              Every bean that enters our hoppers is sustainably sourced from high-altitude shade-grown estates in South India. Roasted in deliberate small batches, we extract double ristrettos at 9 bars of pressure to preserve delicate floral aromatics, natural berry sweetness, and rich chocolate undertones.
            </p>
            <p className="text-body-md text-content-secondary leading-relaxed">
              We never use artificial flavorings or commercial pre-ground coffee. From our silky flat whites to our 18-hour cold brew, purity is our benchmark.
            </p>
          </div>
        </div>

        {/* Story Section 2: The Kitchen Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5 lg:order-1 order-2">
            <span className="text-caption font-mono uppercase tracking-widest text-brand-copper">
              The Culinary Kitchen
            </span>
            <h2 className="text-display-sm font-display text-content-primary">
              Scratch Sourdough &amp; Pure Ingredients
            </h2>
            <p className="text-body-md text-content-secondary leading-relaxed">
              Our kitchen operates around the clock. Sourdough pizza dough is naturally fermented for 48 hours for airy digestibility and blistered leopard crusts. Sauces are slow-simmered with real Italian plum tomatoes, fresh basil, and extra virgin olive oil.
            </p>
            <p className="text-body-md text-content-secondary leading-relaxed">
              Whether you order our creamy burrata margherita, truffle mushroom fettuccine, or molten Valrhona brownie, every dish is made to order with honest, wholesome integrity.
            </p>
          </div>

          <div className="lg:col-span-6 relative aspect-4/3 rounded-3xl overflow-hidden border border-brand-copper/30 shadow-elevated lg:order-2 order-1">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
              alt="Kitchen baking freshly made food"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Founder & Vision */}
        <div className="p-8 sm:p-14 rounded-3xl bg-surface-secondary border border-border-subtle relative overflow-hidden text-center max-w-3xl mx-auto space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-brand-copper/15 border border-brand-copper/30 flex items-center justify-center text-brand-copper">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-caption font-mono uppercase tracking-widest text-brand-copper">
              The Founder’s Note
            </span>
            <h3 className="text-display-sm font-display text-content-primary">
              Anubhav Rajput
            </h3>
            <p className="font-heading text-heading-md text-brand-copper italic">
              Founder &amp; Creative Director
            </p>
          </div>

          <p className="text-body-md text-content-secondary leading-relaxed max-w-xl mx-auto">
            “Aroma Haven was conceived not merely as a café, but as an experience of comfort, luxury, and pride for Motihari. We wanted to build a place where you can work with high-speed internet at midnight, take a date for exquisite dessert, or simply sit in silence with a warm cup of coffee.”
          </p>

          <div className="pt-4 flex items-center justify-center gap-6">
            <Button variant="copper-glow">
              <Link href="/menu">Explore The Menu</Link>
            </Button>
            <Button variant="secondary">
              <Link href="/contact">Visit Us in Motihari</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
