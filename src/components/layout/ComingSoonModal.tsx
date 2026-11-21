'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/stores/uiStore';
import { Sparkles } from 'lucide-react';

export function ComingSoonModal() {
  const { comingSoon, closeComingSoon } = useUIStore();

  return (
    <Modal
      isOpen={comingSoon.isOpen}
      onClose={closeComingSoon}
      maxWidth="sm"
      title={
        <span className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-copper" />
          <span>Coming Soon</span>
        </span>
      }
    >
      <div className="text-center py-4 space-y-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-brand-copper/15 border border-brand-copper/30 flex items-center justify-center text-brand-copper">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="space-y-1.5">
          <h4 className="text-heading-sm font-display text-content-primary">
            {comingSoon.featureName || 'This Feature'}
          </h4>
          <p className="text-body-sm text-content-secondary max-w-xs mx-auto">
            Our official channel is currently being prepared to bring you the highest quality updates, specials, and stories.
          </p>
        </div>
        <div className="pt-2">
          <Button variant="primary" className="w-full" onClick={closeComingSoon}>
            Understood
          </Button>
        </div>
      </div>
    </Modal>
  );
}
