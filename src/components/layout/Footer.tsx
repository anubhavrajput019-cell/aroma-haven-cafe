'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { BRAND, SOCIAL_LINKS } from '@/lib/constants';
import { getWhatsAppLink } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';
import { Phone, Mail, MapPin, Clock, MessageSquare, Instagram, Facebook, Twitter, Youtube, ArrowUpRight, Shield } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  const { openComingSoon } = useUIStore();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const socialIcons: Record<string, React.ReactNode> = {
    Instagram: <Instagram className="w-4 h-4" />,
    Facebook: <Facebook className="w-4 h-4" />,
    Twitter: <Twitter className="w-4 h-4" />,
    Youtube: <Youtube className="w-4 h-4" />,
  };

  return (
    <footer className="bg-surface-secondary border-t border-border-subtle relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-brand-copper/5 blur-3xl pointer-events-none" />

      <div className="section-container section-spacing relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="full" size="lg" showTagline asLink={false} />
            <p className="text-body-md text-content-secondary max-w-sm">
              Aroma Haven Café brings luxury hospitality, artisanal single-origin brews, and freshly prepared gourmet cuisine to the heart of Motihari, Bihar.
            </p>
            <div className="pt-2 flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => openComingSoon(`${s.name} Official Channel`)}
                  className="w-10 h-10 rounded-lg bg-surface-tertiary border border-border-subtle text-content-secondary hover:text-brand-copper hover:border-brand-copper transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-copper"
                  aria-label={`Visit Aroma Haven on ${s.name} (Coming Soon)`}
                >
                  {socialIcons[s.name]}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-heading-sm font-display text-content-primary">Explore</h4>
            <ul className="space-y-2.5 text-body-md text-content-secondary">
              <li>
                <Link href="/menu" className="hover:text-brand-copper transition-colors">
                  Full Menu
                </Link>
              </li>
              <li>
                <Link href="/menu?category=Coffee" className="hover:text-brand-copper transition-colors">
                  Artisanal Coffee
                </Link>
              </li>
              <li>
                <Link href="/menu?category=Specials" className="hover:text-brand-copper transition-colors">
                  Today&apos;s Specials
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-copper transition-colors">
                  Our Story &amp; Craft
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-copper transition-colors">
                  Location &amp; Hours
                </Link>
              </li>
            </ul>
          </div>

          {/* Ordering & Support */}
          <div className="space-y-4">
            <h4 className="text-heading-sm font-display text-content-primary">Hospitality</h4>
            <ul className="space-y-2.5 text-body-md text-content-secondary">
              <li>
                <Link href="/cart" className="hover:text-brand-copper transition-colors">
                  Your Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-brand-copper transition-colors">
                  Online Ordering
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-brand-copper transition-colors inline-flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-brand-copper" />
                  <span>Admin SaaS Portal</span>
                </Link>
              </li>
              <li>
                <a
                  href={getWhatsAppLink(BRAND.whatsapp, 'Hello Aroma Haven Café, I would like to inquire about a table reservation.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-copper transition-colors inline-flex items-center gap-1"
                >
                  <span>WhatsApp Concierge</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-content-tertiary" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-heading-sm font-display text-content-primary">Visit Us</h4>
            <ul className="space-y-3 text-body-sm text-content-secondary">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-copper shrink-0 mt-1" />
                <span>{BRAND.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-copper shrink-0" />
                <span>Open {BRAND.hours} Daily</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-copper shrink-0" />
                <a href={`tel:${BRAND.phone}`} className="hover:text-brand-copper transition-colors font-mono">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-copper shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-brand-copper transition-colors truncate">
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Academic & Demo Disclaimers */}
        <div className="mt-16 pt-8 border-t border-border-subtle/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-caption text-content-tertiary">
          <div>
            © {new Date().getFullYear()} {BRAND.name}. Designed &amp; Engineered by{' '}
            <span className="text-content-secondary font-medium">{BRAND.owner}</span>.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-status-warning-soft text-status-warning font-mono text-[11px]">
              Academic CS-1 Prototype • Demo Sandbox
            </span>
            <span>Motihari City Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
