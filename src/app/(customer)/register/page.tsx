'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/shared/Logo';
import { Lock, Mail, User, Phone, ArrowRight, CheckCircle2, Award } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isPasswordValid = password.length >= 12;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!isPasswordValid) {
      setError('Password must be at least 12 characters long (per security policy).');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(email.trim(), 'customer', name.trim());
      router.push('/account');
      setIsLoading(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-surface-primary flex items-center justify-center p-6 text-left">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <Logo variant="monogram" size="lg" />
          <h1 className="text-heading-lg font-display text-content-primary">
            Join Aroma Haven Club
          </h1>
          <p className="text-body-sm text-content-secondary">
            Unlock loyalty points, order re-orders, and exclusive member discounts.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-surface-secondary border border-border-subtle shadow-elevated space-y-6">
          {/* Welcome Bonus Callout */}
          <div className="p-3.5 rounded-xl bg-brand-copper/15 border border-brand-copper/30 flex items-center gap-3">
            <Award className="w-5 h-5 text-brand-copper shrink-0" />
            <div className="text-caption text-content-secondary">
              New members start at <strong className="text-brand-copper">Bronze Tier</strong> with 1 point earned per ₹10 spent.
            </div>
          </div>

          {error && (
            <p className="p-3 rounded-lg bg-status-error-soft text-status-error text-caption">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name *"
              placeholder="e.g. Anubhav Rajput"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
            />

            <Input
              label="Email Address *"
              type="email"
              placeholder="e.g. member@aromahavencafe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Phone Number (Optional)"
              placeholder="e.g. 9229310610"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="w-4 h-4" />}
              hint="For delivery coordination in Motihari"
            />

            <div className="space-y-1.5">
              <Input
                label="Password *"
                type="password"
                placeholder="Minimum 12 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
              />
              <div className="flex items-center gap-2 text-caption">
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${
                    isPasswordValid ? 'text-status-success' : 'text-content-tertiary'
                  }`}
                />
                <span
                  className={
                    isPasswordValid ? 'text-status-success font-medium' : 'text-content-tertiary'
                  }
                >
                  12 characters minimum required ({password.length}/12)
                </span>
              </div>
            </div>

            <Button
              type="submit"
              variant="copper-glow"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Create Account
            </Button>
          </form>
        </div>

        <div className="text-center text-body-sm text-content-secondary">
          Already an Aroma Haven member?{' '}
          <Link href="/login" className="text-brand-copper font-medium hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
