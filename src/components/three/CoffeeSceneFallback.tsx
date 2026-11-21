'use client';

import React from 'react';
import Image from 'next/image';

export function CoffeeSceneFallback() {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[580px] flex items-center justify-center select-none pointer-events-none">
      {/* Radial Atmospheric Aura */}
      <div className="absolute inset-0 bg-radial-gradient from-brand-copper/20 via-brand-espresso/40 to-transparent blur-3xl opacity-75" />

      {/* Centerpiece Image with gentle hover float */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border border-brand-copper/30 shadow-glow-copper-lg animate-pulse-soft">
        <Image
          src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
          alt="Aroma Haven Artisan Coffee Brew"
          fill
          priority
          sizes="(max-width: 768px) 288px, 384px"
          className="object-cover scale-105"
        />
        {/* Steam overlay effect */}
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-surface-primary/80 to-transparent" />
      </div>

      {/* Floating Coffee Beans Simulation (CSS Keyframes) */}
      <div className="absolute top-12 left-10 w-8 h-8 rounded-full bg-brand-espresso-600 border border-brand-copper/40 shadow-card animate-bounce" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-16 right-12 w-6 h-6 rounded-full bg-brand-espresso-700 border border-brand-copper/30 shadow-card animate-bounce" style={{ animationDuration: '5.5s' }} />
      <div className="absolute top-1/3 right-8 w-5 h-5 rounded-full bg-brand-copper/40 border border-brand-copper/50 animate-pulse" />
    </div>
  );
}
