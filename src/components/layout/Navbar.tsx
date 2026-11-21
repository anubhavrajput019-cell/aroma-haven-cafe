'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { AudioToggle } from '@/components/layout/AudioToggle';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import { CUSTOMER_NAV } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ShoppingBag, Search, Menu, X, Shield, Sparkles } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { setCartDrawerOpen, setSearchModalOpen, isMobileNavOpen, setMobileNavOpen, setConciergeOpen } = useUIStore();
  const { getItemCount, tableNumber, diningMode } = useCartStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itemCount = mounted ? getItemCount() : 0;
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    // Admin layout handles its own topbar
    return null;
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-navbar transition-all duration-350 ease-luxury',
          isScrolled
            ? 'bg-surface-primary/90 backdrop-blur-md border-b border-border-subtle py-3 shadow-card'
            : 'bg-transparent py-5'
        )}
      >
        <div className="section-container flex items-center justify-between">
          {/* Brand Logo */}
          <Logo variant="full" size="md" showTagline={!isScrolled} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {CUSTOMER_NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative text-body-md font-medium transition-colors duration-250 py-1 select-none',
                    isActive
                      ? 'text-brand-copper font-semibold'
                      : 'text-content-secondary hover:text-content-primary'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-copper rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-3">
            {/* Audio Atmosphere */}
            <AudioToggle />

            {/* AI Concierge quick access */}
            <button
              type="button"
              onClick={() => setConciergeOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-copper/10 border border-brand-copper/30 text-brand-copper text-caption font-medium hover:bg-brand-copper/20 transition-all select-none"
              title="Aroma Concierge AI Menu Guide"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Concierge</span>
            </button>

            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="p-2.5 rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-copper"
              aria-label="Search menu"
              title="Search menu (Cmd+K)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              className="relative p-2.5 rounded-lg text-content-primary hover:bg-surface-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-copper"
              aria-label={`Open shopping cart (${itemCount} items)`}
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-copper text-white text-[11px] font-mono font-bold flex items-center justify-center shadow-glow-copper animate-scale-in">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Table indicator for Dine-in */}
            {diningMode === 'dine_in' && tableNumber && (
              <span className="hidden xl:inline-flex items-center text-caption font-mono px-2.5 py-1 rounded bg-surface-secondary border border-border-subtle text-content-secondary">
                T-{String(tableNumber).padStart(2, '0')}
              </span>
            )}

            {/* Admin link badge */}
            <Link
              href="/admin/login"
              className="hidden sm:inline-flex items-center gap-1 p-2 rounded-lg text-content-tertiary hover:text-content-secondary transition-colors"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(!isMobileNavOpen)}
              className="md:hidden p-2.5 rounded-lg text-content-primary hover:bg-surface-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-copper"
              aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileNavOpen}
            >
              {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-modal md:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
            onClick={() => setMobileNavOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-surface-secondary border-l border-border p-6 flex flex-col justify-between animate-slide-in-right">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
                <Logo variant="monogram" size="md" />
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="p-2 text-content-tertiary hover:text-content-primary"
                  aria-label="Close navigation"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile Navigation">
                {CUSTOMER_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={cn(
                      'text-heading-sm font-display py-2 transition-colors',
                      pathname === item.href
                        ? 'text-brand-copper'
                        : 'text-content-primary hover:text-brand-copper'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/search"
                  onClick={() => setMobileNavOpen(false)}
                  className="text-heading-sm font-display py-2 text-content-primary hover:text-brand-copper"
                >
                  Search Menu
                </Link>
                <Link
                  href="/admin/login"
                  onClick={() => setMobileNavOpen(false)}
                  className="text-body-md text-content-tertiary hover:text-content-primary py-2 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Portal</span>
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-border-subtle space-y-4">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  setMobileNavOpen(false);
                  setCartDrawerOpen(true);
                }}
              >
                View Cart ({itemCount})
              </Button>
              <p className="text-[11px] text-center text-content-tertiary">
                Motihari, Bihar • 24 × 7
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
