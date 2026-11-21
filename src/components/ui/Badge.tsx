import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'copper' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'demo';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export function Badge({
  className,
  variant = 'copper',
  size = 'md',
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    copper: 'bg-brand-copper/15 text-brand-copper border border-brand-copper/30',
    success: 'bg-status-success-soft text-status-success border border-status-success/30',
    warning: 'bg-status-warning-soft text-status-warning border border-status-warning/30',
    error: 'bg-status-error-soft text-status-error border border-status-error/30',
    info: 'bg-status-info-soft text-status-info border border-status-info/30',
    neutral: 'bg-surface-tertiary text-content-secondary border border-border-subtle',
    demo: 'bg-status-warning-soft text-status-warning border border-status-warning/40 font-mono tracking-wider',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded-full font-medium',
    md: 'text-caption px-2.5 py-1 rounded-full font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 transition-colors duration-250 select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', {
            'bg-brand-copper animate-pulse-soft': variant === 'copper',
            'bg-status-success': variant === 'success',
            'bg-status-warning': variant === 'warning' || variant === 'demo',
            'bg-status-error': variant === 'error',
            'bg-status-info': variant === 'info',
            'bg-content-tertiary': variant === 'neutral',
          })}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
