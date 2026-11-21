import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { BRAND } from '@/lib/constants';
import { getWhatsAppLink } from '@/lib/utils';
import { MapPin, Clock, Phone, MessageSquare, ArrowUpRight, Navigation } from 'lucide-react';

export function LocationHoursSection() {
  return (
    <section className="section-spacing bg-surface-secondary border-t border-border-subtle relative text-left">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Info Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-caption font-mono uppercase tracking-widest text-brand-copper">
                Visit Aroma Haven
              </span>
              <h2 className="text-display-sm sm:text-display-md font-display text-content-primary">
                Open Day &amp; Night In Motihari
              </h2>
            </div>

            <p className="text-body-lg text-content-secondary leading-relaxed">
              Centrally situated in Motihari, Bihar. Whether you are craving an early morning double espresso or late-night hot sourdough pizza with friends, our hospitable team is ready to serve you 24 hours a day, 7 days a week.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-surface-primary border border-border-subtle flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-brand-copper shrink-0 mt-1" />
                <div>
                  <h4 className="text-body-md font-semibold text-content-primary">Location</h4>
                  <p className="text-body-sm text-content-secondary mt-0.5">
                    {BRAND.location} • Dine-in &amp; Takeaway counter
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-primary border border-border-subtle flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-brand-copper shrink-0 mt-1" />
                <div>
                  <h4 className="text-body-md font-semibold text-content-primary">Operating Hours</h4>
                  <p className="text-body-sm text-content-secondary mt-0.5">
                    Continuous 24 × 7 kitchen service, dine-in and citywide delivery.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-primary border border-border-subtle flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-brand-copper shrink-0 mt-1" />
                <div>
                  <h4 className="text-body-md font-semibold text-content-primary">Direct Contact &amp; Concierge</h4>
                  <p className="text-body-sm text-content-secondary mt-0.5">
                    Call: <a href={`tel:${BRAND.phone}`} className="text-brand-copper hover:underline font-mono">{BRAND.phone}</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={getWhatsAppLink(BRAND.whatsapp, 'Hello Aroma Haven Café, I would like to reserve a table / ask about today specials.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="copper-glow" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                  Chat on WhatsApp
                </Button>
              </a>

              <Button variant="secondary">
                <Link href="/contact">View Contact Form &amp; FAQ</Link>
              </Button>
            </div>
          </div>

          {/* Right Map/Atmosphere Showcase */}
          <div className="lg:col-span-6 relative aspect-video sm:aspect-4/3 rounded-3xl overflow-hidden border border-brand-copper/30 shadow-elevated bg-surface-primary flex flex-col justify-between p-8 text-left">
            {/* Stylized Map Vector Simulation */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#b87333_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-brand-copper animate-pulse" />
                <span className="font-mono text-body-sm text-content-primary font-semibold">
                  Motihari Central Hub
                </span>
              </div>
              <span className="text-caption font-mono px-2.5 py-1 rounded-full bg-status-success-soft text-status-success">
                Delivery Active
              </span>
            </div>

            <div className="relative z-10 p-6 rounded-2xl bg-surface-secondary/95 backdrop-blur-md border border-border-subtle space-y-2 max-w-sm">
              <h5 className="text-heading-sm font-display text-content-primary">
                Aroma Haven Café
              </h5>
              <p className="text-body-sm text-content-secondary">
                {BRAND.location}
              </p>
              <div className="pt-2 text-caption font-mono text-brand-copper">
                Serving Motihari with love &amp; quality.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
