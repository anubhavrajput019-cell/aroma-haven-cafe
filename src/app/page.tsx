'use client';

import React, { useState, useEffect } from 'react';
import { IntroSequence } from '@/components/home/IntroSequence';
import { HeroSection } from '@/components/home/HeroSection';
import { SignatureSection } from '@/components/home/SignatureSection';
import { TodaysSpecialSection } from '@/components/home/TodaysSpecialSection';
import { CuratedMenuSection } from '@/components/home/CuratedMenuSection';
import { StorySection } from '@/components/home/StorySection';
import { AtmosphereSection } from '@/components/home/AtmosphereSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { RewardsSection } from '@/components/home/RewardsSection';
import { LocationHoursSection } from '@/components/home/LocationHoursSection';

export default function HomePage() {
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [hasCheckedStorage, setHasCheckedStorage] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already visited in this session
    const hasVisited = sessionStorage.getItem('ah_intro_seen');
    if (!hasVisited) {
      setShowIntro(true);
    }
    setHasCheckedStorage(true);
  }, []);

  const handleEnterExperience = () => {
    sessionStorage.setItem('ah_intro_seen', 'true');
    setShowIntro(false);
  };

  return (
    <main className="w-full relative">
      {/* First 5-second cinematic intro overlay for new visitors */}
      {showIntro && hasCheckedStorage && (
        <IntroSequence onEnter={handleEnterExperience} />
      )}

      {/* Chapter 01 — Cinematic Hero with 3D Coffee Scene */}
      <HeroSection />

      {/* Chapter 02 — Signature Culinary Highlights */}
      <SignatureSection />

      {/* Chapter 03 — Chef Anubhav Rajput's Daily Special Spotlight */}
      <TodaysSpecialSection />

      {/* Chapter 04 — Curated Category Tastings */}
      <CuratedMenuSection />

      {/* Chapter 05 — The Brand Craft & Philosophy */}
      <StorySection />

      {/* Chapter 06 — Architecture & Ambiance Gallery */}
      <AtmosphereSection />

      {/* Chapter 07 — Verified Guest Impressions */}
      <ReviewsSection />

      {/* Chapter 08 — Loyalty Rewards Program Preview */}
      <RewardsSection />

      {/* Chapter 09 — 24x7 Schedule & Motihari Location */}
      <LocationHoursSection />
    </main>
  );
}
