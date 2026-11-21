import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/shared/Logo';
import { Coffee, ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 rounded-full bg-brand-copper/15 border border-brand-copper/30 flex items-center justify-center mx-auto text-brand-copper">
          <Coffee className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-display-md font-bold text-brand-copper">
            404
          </span>
          <h1 className="text-display-sm font-display text-content-primary">
            A Cup Spilled In The Void
          </h1>
          <p className="text-body-md text-content-secondary">
            The page you are looking for has evaporated like fresh coffee steam or was moved to another table.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="copper-glow">
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Return To Sanctuary</span>
            </Link>
          </Button>
          <Button variant="secondary">
            <Link href="/menu">Browse Our Menu</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
