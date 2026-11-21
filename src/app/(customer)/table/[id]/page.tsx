'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import { Utensils, Coffee, Bell, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function TableLandingPage() {
  const params = useParams();
  const router = useRouter();
  const tableParam = typeof params.id === 'string' ? params.id : '1';
  const tableNum = parseInt(tableParam, 10) || 1;
  const tableLabel = `Table ${String(tableNum).padStart(2, '0')}`;

  const { setDiningMode, setTableNumber } = useCartStore();
  const [calledServer, setCalledServer] = useState(false);

  useEffect(() => {
    // Automatically set cart store state for this table
    setDiningMode('dine_in');
    setTableNumber(tableNum);
  }, [tableNum, setDiningMode, setTableNumber]);

  const handleCallServer = () => {
    setCalledServer(true);
    setTimeout(() => setCalledServer(false), 5000);
  };

  return (
    <div className="min-h-screen bg-haven-charcoal text-haven-parchment py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        {/* Welcome Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-haven-amber/10 border border-haven-amber/30 text-haven-amber text-xs uppercase tracking-widest font-mono mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Dine-In Digital Experience</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-bold text-haven-parchment mb-2">
          Welcome to <span className="text-haven-gold">{tableLabel}</span>
        </h1>
        <p className="text-haven-sand/70 text-sm sm:text-base max-w-md mx-auto mb-8 font-serif italic">
          &ldquo;Served With Love & Quality !!&rdquo; &mdash; Order directly from your seat and our baristas will bring it to your table.
        </p>

        {/* Status Card */}
        <div className="p-6 rounded-2xl bg-haven-espresso border border-haven-sand/15 shadow-2xl mb-8 text-left">
          <div className="flex items-center justify-between pb-4 border-b border-haven-sand/10">
            <div>
              <p className="text-xs text-haven-sand/50 uppercase tracking-wider font-mono">Current Location</p>
              <p className="text-lg font-bold text-haven-amber font-display">Aroma Haven Café, Motihari</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-haven-sand/50 uppercase tracking-wider font-mono">Assigned Seat</p>
              <p className="text-lg font-bold text-haven-parchment">{tableLabel}</p>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3 text-xs text-haven-sand/70">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span>Digital ordering session active. Taxes automatically set to provisional demo 5% GST.</span>
          </div>
        </div>

        {/* Quick Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Button
            size="lg"
            variant="primary"
            onClick={() => router.push('/menu')}
            className="w-full flex items-center justify-center gap-2"
          >
            <Coffee className="w-5 h-5" />
            <span>Explore Menu & Order</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleCallServer}
            disabled={calledServer}
            className="w-full flex items-center justify-center gap-2"
          >
            {calledServer ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-green-400">Server Notified!</span>
              </>
            ) : (
              <>
                <Bell className="w-5 h-5" />
                <span>Call Captain / Water</span>
              </>
            )}
          </Button>
        </div>

        {/* Featured Recommendation */}
        <div className="p-5 rounded-xl bg-haven-charcoal-dark border border-haven-sand/10 text-left">
          <p className="text-xs uppercase tracking-widest text-haven-amber font-mono mb-2">Today&apos;s Highlight</p>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-display font-semibold text-haven-parchment">Saffron Royal Cold Brew</h4>
              <p className="text-xs text-haven-sand/60">Steeped 24 hours with Kashmiri saffron and cardamom.</p>
            </div>
            <Link
              href="/product/saffron-royal-cold-brew"
              className="text-xs text-haven-amber hover:underline font-mono ml-4 shrink-0"
            >
              View →
            </Link>
          </div>
        </div>

        {/* Wi-Fi & Support info */}
        <div className="mt-12 text-xs text-haven-sand/50 space-y-1">
          <p>Complimentary High-Speed Wi-Fi: <strong className="text-haven-sand/80">AromaHaven_Guest</strong></p>
          <p>Need assistance? Contact our team 24×7 at +91 9229310610</p>
        </div>
      </div>
    </div>
  );
}
