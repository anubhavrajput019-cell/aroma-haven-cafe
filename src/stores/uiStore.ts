'use client';

import { create } from 'zustand';

interface ComingSoonState {
  isOpen: boolean;
  featureName: string;
}

interface UIStore {
  isCartDrawerOpen: boolean;
  isMobileNavOpen: boolean;
  isConciergeOpen: boolean;
  isSearchModalOpen: boolean;
  isAudioPlaying: boolean;
  comingSoon: ComingSoonState;

  // Actions
  setCartDrawerOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setConciergeOpen: (open: boolean) => void;
  setSearchModalOpen: (open: boolean) => void;
  toggleAudio: () => void;
  openComingSoon: (featureName: string) => void;
  closeComingSoon: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCartDrawerOpen: false,
  isMobileNavOpen: false,
  isConciergeOpen: false,
  isSearchModalOpen: false,
  isAudioPlaying: false, // Default MUTED per master specification Section 9
  comingSoon: {
    isOpen: false,
    featureName: '',
  },

  setCartDrawerOpen: (open) => set({ isCartDrawerOpen: open }),
  setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
  setConciergeOpen: (open) => set({ isConciergeOpen: open }),
  setSearchModalOpen: (open) => set({ isSearchModalOpen: open }),
  toggleAudio: () => set((state) => ({ isAudioPlaying: !state.isAudioPlaying })),
  openComingSoon: (featureName) =>
    set({
      comingSoon: {
        isOpen: true,
        featureName,
      },
    }),
  closeComingSoon: () =>
    set({
      comingSoon: {
        isOpen: false,
        featureName: '',
      },
    }),
}));
