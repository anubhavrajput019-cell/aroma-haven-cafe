'use client';

import React, { useState, useEffect } from 'react';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/Button';
import { BRAND } from '@/lib/constants';
import { ArrowRight, Sparkles } from 'lucide-react';

interface IntroSequenceProps {
  onEnter: () => void;
}

export function IntroSequence({ onEnter }: IntroSequenceProps) {
  const [step, setStep] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Step progression
    const t1 = setTimeout(() => setStep(2), 700);  // Atmosphere & Tagline
    const t2 = setTimeout(() => setStep(3), 1600); // Depth & CTA emergence

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(() => {
      onEnter();
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-intro bg-surface-primary flex flex-col items-center justify-between p-6 sm:p-12 transition-opacity duration-700 ease-cinematic">
      {/* Top Bar with Skip */}
      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={handleEnter}
          className="text-caption font-mono text-content-tertiary hover:text-brand-copper transition-colors uppercase tracking-widest px-3 py-1.5 rounded-full border border-border-subtle hover:border-brand-copper/40"
        >
          Skip Intro
        </button>
      </div>

      {/* Center Cinematic Stage */}
      <div className="flex flex-col items-center text-center max-w-xl mx-auto space-y-6">
        {/* Monogram / Brand Identity Reveal */}
        <div
          className={`transition-all duration-1000 ease-cinematic transform ${
            step >= 1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}
        >
          <Logo variant="monogram" size="xl" asLink={false} />
        </div>

        {/* Wordmark & Tagline Emergence */}
        <div
          className={`transition-all duration-1000 delay-200 ease-cinematic transform ${
            step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h1 className="text-display-md sm:text-display-lg font-display tracking-wider text-content-primary">
            AROMA HAVEN
            <span className="block text-brand-copper font-serif text-heading-lg sm:text-display-sm font-light mt-1">
              CAFÉ
            </span>
          </h1>

          <p className="mt-4 font-heading text-heading-md sm:text-heading-lg text-brand-copper italic tracking-wide">
            “{BRAND.tagline}”
          </p>

          <p className="mt-2 text-body-sm text-content-tertiary tracking-widest uppercase font-mono">
            Motihari, Bihar • Est. 2026
          </p>
        </div>

        {/* Refined CTA */}
        <div
          className={`pt-6 transition-all duration-1000 delay-300 ease-cinematic transform ${
            step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Button
            variant="copper-glow"
            size="lg"
            onClick={handleEnter}
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="tracking-wider text-body-lg"
          >
            Enter Aroma Haven
          </Button>
        </div>
      </div>

      {/* Bottom Ambient Cue */}
      <div className="flex items-center gap-2 text-[11px] text-content-tertiary font-mono tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-brand-copper" />
        <span>A Cinematic Café Experience</span>
      </div>
    </div>
  );
}
