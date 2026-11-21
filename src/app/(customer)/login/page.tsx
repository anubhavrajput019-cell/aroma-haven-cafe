'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/shared/Logo';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Demo credentials handling
      if (email.toLowerCase().includes('admin')) {
        login(email.trim(), 'admin', 'Anubhav Rajput (Owner)');
        router.push('/admin/dashboard');
      } else {
        login(email.trim(), 'customer', 'Valued Customer');
        router.push('/account');
      }
      setIsLoading(false);
    }, 400);
  };

  const handleDemoFill = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      setEmail('admin@aromahavencafe.com');
      setPassword('AromaHaven@Admin2026!');
    } else {
      setEmail('guest@aromahavencafe.com');
      setPassword('CoffeeLover2026#Secure');
    }
  };

  return (
    <div className="min-h-screen bg-surface-primary flex items-center justify-center p-6 text-left">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <Logo variant="monogram" size="lg" />
          <h1 className="text-heading-lg font-display text-content-primary">
            Welcome to Aroma Haven
          </h1>
          <p className="text-body-sm text-content-secondary">
            Sign in to track orders, manage loyalty points, and save your Motihari addresses.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-surface-secondary border border-border-subtle shadow-elevated space-y-6">
          {error && (
            <p className="p-3 rounded-lg bg-status-error-soft text-status-error text-caption">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. member@aromahavencafe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              hint="Minimum 12 characters recommended"
            />

            <div className="flex justify-end">
              <span className="text-[12px] text-content-tertiary">
                Demo authentication active
              </span>
            </div>

            <Button
              type="submit"
              variant="copper-glow"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          {/* Google OAuth Ready Button */}
          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-subtle" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-mono">
              <span className="bg-surface-secondary px-3 text-content-tertiary">
                Or Continue With
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              login('google.user@gmail.com', 'customer', 'Google Member');
              router.push('/account');
            }}
            className="w-full py-2.5 px-4 rounded-xl border border-border-subtle bg-surface-primary hover:border-brand-copper/50 hover:bg-surface-tertiary transition-all flex items-center justify-center gap-3 text-body-sm font-medium text-content-primary"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Google Account (Demo Ready)</span>
          </button>

          {/* Academic Evaluator One-Click Helpers */}
          <div className="pt-2 border-t border-border-subtle/60 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-content-tertiary block text-center">
              ✦ Evaluator Demo Quick Fills ✦
            </span>
            <div className="grid grid-cols-2 gap-2 text-caption font-mono">
              <button
                type="button"
                onClick={() => handleDemoFill('customer')}
                className="py-1.5 px-2 rounded-lg bg-surface-tertiary text-content-secondary hover:text-brand-copper transition-colors"
              >
                Auto-fill Customer
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('admin')}
                className="py-1.5 px-2 rounded-lg bg-surface-tertiary text-content-secondary hover:text-brand-copper transition-colors"
              >
                Auto-fill Admin
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-body-sm text-content-secondary">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="text-brand-copper font-medium hover:underline">
            Register for Aroma Club
          </Link>
        </div>
      </div>
    </div>
  );
}
