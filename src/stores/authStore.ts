'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserProfile, UserRole } from '@/types';

interface AuthStore {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;

  // Actions
  login: (email: string, role?: UserRole, name?: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,

      login: (email, role = 'customer', name) => {
        const defaultName = name || (role === 'admin' ? 'Anubhav Rajput' : 'Guest Member');
        const user: UserProfile = {
          id: `usr_${Date.now()}`,
          email,
          full_name: defaultName,
          phone: '+91 9229310610',
          avatar_url: null,
          role,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        set({
          user,
          isAuthenticated: true,
          isAdmin: role === 'admin',
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },

      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data, updated_at: new Date().toISOString() } : null,
        }));
      },
    }),
    {
      name: 'ah_auth_session',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') return localStorage;
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
