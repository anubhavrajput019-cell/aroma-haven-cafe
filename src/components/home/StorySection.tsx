import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { BRAND } from '@/lib/constants';
import { ArrowRight, Heart, Sparkles, Coffee } from 'lucide-react';

export function StorySection() {
  return (
    <section className="section-spacing bg-surface-secondary border-y border-border-subtle relative overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Mosaic */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden border border-brand-copper/30 shadow-elevated">
              <Image
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80"
                alt="Barista brewing pour over at Aroma Haven"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-primary/90 via-transparent to-transparent" />

              {/* Floating Quote Card */}
              <div className="absolute bottom-6 inset-x-6 p-6 rounded-2xl bg-surface-secondary/90 backdrop-blur-md border border-border-subtle text-left space-y-2">
                <p className="font-heading text-heading-sm italic text-brand-copper">
                  “{BRAND.tagline}”
                </p>
                <p className="text-caption text-content-secondary">
                  Founded by <strong className="text-content-primary">{BRAND.owner}</strong> with a singular mission: elevate Motihari’s café culture to luxury world-class heights.
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Brand Narrative */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-caption font-mono uppercase tracking-widest text-brand-copper">
                The Aroma Haven Philosophy
              </span>
              <h2 className="text-display-sm sm:text-display-md font-display text-content-primary">
                Craft, Warmth &amp; Uncompromising Hospitality
              </h2>
            </div>

            <p className="text-body-lg text-content-secondary leading-relaxed">
              In a fast-paced world, Aroma Haven Café was built as an oasis of calm confidence. We believe that exceptional coffee is not merely about caffeine — it is a tactile sensory ritual of aroma, crema, temperature, and intimacy.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-copper/15 border border-brand-copper/30 text-brand-copper flex items-center justify-center shrink-0 mt-1">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-body-md font-bold text-content-primary">Ethically Sourced Single-Origin</h4>
                  <p className="text-body-sm text-content-secondary mt-0.5">
                    Our beans originate from high-altitude estates in Chikmagalur and Coorg, slow-roasted in micro-batches to preserve delicate chocolate and berry nuances.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-copper/15 border border-brand-copper/30 text-brand-copper flex items-center justify-center shrink-0 mt-1">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-body-md font-bold text-content-primary">Scratch Kitchen Precision</h4>
                  <p className="text-body-sm text-content-secondary mt-0.5">
                    Every sourdough base, pasta emulsion, and decadent dessert is crafted fresh in our kitchen with pure butter, fresh dairy, and zero artificial preservatives.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-copper/15 border border-brand-copper/30 text-brand-copper flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-body-md font-bold text-content-primary">A Welcoming Haven for Everyone</h4>
                  <p className="text-body-sm text-content-secondary mt-0.5">
                    Whether working on your laptop at 3 AM, sharing a romantic evening, or dining with family, our doors and kitchen remain warmly open 24 hours a day, 7 days a week.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                <Link href="/about">Read Our Full Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
