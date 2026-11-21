import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'copper-glow' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-body font-medium transition-all duration-300 ease-luxury select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary active:scale-[0.98]';

    const variants = {
      primary:
        'bg-brand-copper text-white hover:bg-brand-copper-500 hover:shadow-glow-copper border border-brand-copper-400/40',
      'copper-glow':
        'bg-brand-copper text-white shadow-glow-copper hover:shadow-glow-copper-lg hover:bg-brand-copper-500 border border-brand-copper-300/60',
      secondary:
        'bg-surface-secondary text-content-primary border border-border-subtle hover:border-brand-copper hover:text-brand-copper hover:bg-surface-tertiary',
      outline:
        'bg-transparent text-content-primary border border-border hover:border-brand-copper hover:text-brand-copper hover:bg-brand-copper/10',
      ghost:
        'bg-transparent text-content-secondary hover:text-content-primary hover:bg-surface-secondary active:bg-surface-tertiary',
      danger:
        'bg-status-error text-white hover:bg-red-700 shadow-sm border border-red-500/40',
    };

    const sizes = {
      sm: 'px-3.5 py-1.5 text-body-sm rounded-md gap-1.5 min-h-[34px]',
      md: 'px-5 py-2.5 text-body-md rounded-lg gap-2 min-h-[42px]',
      lg: 'px-7 py-3.5 text-body-lg rounded-xl gap-2.5 min-h-[50px] font-semibold',
      icon: 'p-2 rounded-lg w-10 h-10 min-h-[40px] min-w-[40px]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current" aria-hidden="true" />
            <span>Loading…</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0" aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex shrink-0" aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
