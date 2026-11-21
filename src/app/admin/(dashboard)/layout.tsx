'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Logo } from '@/components/shared/Logo';
import { ADMIN_NAV, BRAND } from '@/lib/constants';
import {
  LayoutDashboard,
  ClipboardList,
  UtensilsCrossed,
  Users,
  BarChart3,
  Ticket,
  Star,
  MessageSquare,
  ToggleLeft,
  Settings,
  ScrollText,
  LogOut,
  ExternalLink,
  Shield,
  Bell,
  Menu,
  X,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // Basic route protection check
    if (!isAuthenticated || !isAdmin) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isAdmin, router]);

  const navIcons: Record<string, React.ReactNode> = {
    LayoutDashboard: <LayoutDashboard className="w-4 h-4" />,
    ClipboardList: <ClipboardList className="w-4 h-4" />,
    UtensilsCrossed: <UtensilsCrossed className="w-4 h-4" />,
    Users: <Users className="w-4 h-4" />,
    BarChart3: <BarChart3 className="w-4 h-4" />,
    Ticket: <Ticket className="w-4 h-4" />,
    Star: <Star className="w-4 h-4" />,
    MessageSquare: <MessageSquare className="w-4 h-4" />,
    ToggleLeft: <ToggleLeft className="w-4 h-4" />,
    Settings: <Settings className="w-4 h-4" />,
    ScrollText: <ScrollText className="w-4 h-4" />,
  };

  const handleSignOut = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-surface-primary flex text-left font-body">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col justify-between bg-surface-secondary border-r border-border-subtle p-5 shrink-0 select-none">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-5 border-b border-border-subtle">
            <Logo variant="full" size="sm" asLink={false} />
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-surface-tertiary/70 border border-border-subtle text-[11px] font-mono text-content-tertiary flex items-center justify-between">
            <span>SaaS Version</span>
            <span className="text-brand-copper font-bold">v1.0.0</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1" aria-label="Admin Navigation">
            {ADMIN_NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-body-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-copper text-white font-semibold shadow-glow-copper'
                      : 'text-content-secondary hover:text-content-primary hover:bg-surface-tertiary'
                  }`}
                >
                  <span className="shrink-0">{navIcons[item.icon]}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-border-subtle space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-caption text-content-tertiary hover:text-brand-copper hover:bg-surface-tertiary transition-colors"
          >
            <span>Live Customer Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-caption text-content-tertiary hover:text-status-error transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Operator</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-surface-secondary/80 backdrop-blur-md border-b border-border-subtle px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 text-content-secondary hover:text-content-primary"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
              <span className="text-caption font-mono text-content-secondary font-medium">
                Motihari Kitchen: 24×7 Operational
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle text-caption text-content-secondary hover:text-brand-copper hover:border-brand-copper transition-colors"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-3 pl-3 border-l border-border-subtle">
              <div className="w-8 h-8 rounded-full bg-brand-copper/20 border border-brand-copper/40 flex items-center justify-center text-brand-copper text-caption font-bold">
                AR
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-body-sm font-medium text-content-primary leading-none">
                  {BRAND.owner}
                </div>
                <div className="text-[11px] text-content-tertiary font-mono">Owner / Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Workspace */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
