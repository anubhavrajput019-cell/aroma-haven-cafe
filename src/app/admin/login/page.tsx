'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/shared/Logo';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [email, setEmail] = useState<string>('admin@aromahavencafe.com');
  const [password, setPassword] = useState<string>('AromaHaven@Admin2026!');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide administrator credentials.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(email.trim(), 'admin', 'Anubhav Rajput (Administrator)');
      router.push('/admin/dashboard');
      setIsLoading(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-surface-primary flex items-center justify-center p-6 text-left">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-copper/15 border border-brand-copper/40 flex items-center justify-center text-brand-copper">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-heading-lg font-display text-content-primary">
            Aroma Haven Operations SaaS
          </h1>
          <p className="text-body-sm text-content-secondary">
            Authorized administrative &amp; kitchen management portal.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-surface-secondary border border-border-subtle shadow-elevated space-y-6">
          {error && (
            <p className="p-3 rounded-lg bg-status-error-soft text-status-error text-caption">
              {error}
            </p>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <Input
              label="Admin Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Admin Secure Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <Button
              type="submit"
              variant="copper-glow"
              size="lg"
              className="w-full mt-2 font-bold"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Access Operations Console
            </Button>
          </form>

          <div className="p-3 rounded-xl bg-surface-tertiary border border-border-subtle text-caption text-content-tertiary font-mono text-center">
            Default Owner ID: <strong className="text-brand-copper">admin@aromahavencafe.com</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
