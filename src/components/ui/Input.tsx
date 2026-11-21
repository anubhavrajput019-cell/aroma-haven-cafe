import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, hint, leftIcon, rightIcon, id, disabled, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-body-sm font-medium text-content-primary">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3.5 text-content-tertiary pointer-events-none" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-full px-4 py-2.5 rounded-lg bg-surface-secondary border text-content-primary placeholder:text-content-tertiary font-body text-body-md transition-all duration-250 ease-luxury focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed',
              error
                ? 'border-status-error focus:border-status-error focus:ring-status-error'
                : 'border-border-subtle hover:border-border focus:border-brand-copper focus:ring-brand-copper',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3.5 text-content-tertiary" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-caption text-status-error mt-1">{error}</p>}
        {hint && !error && <p className="text-caption text-content-tertiary mt-1">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, disabled, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={textareaId} className="block text-body-sm font-medium text-content-primary">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          disabled={disabled}
          rows={rows}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-surface-secondary border text-content-primary placeholder:text-content-tertiary font-body text-body-md transition-all duration-250 ease-luxury focus:outline-none focus:ring-1 resize-y disabled:opacity-50 disabled:cursor-not-allowed',
            error
              ? 'border-status-error focus:border-status-error focus:ring-status-error'
              : 'border-border-subtle hover:border-border focus:border-brand-copper focus:ring-brand-copper',
            className
          )}
          {...props}
        />
        {error && <p className="text-caption text-status-error mt-1">{error}</p>}
        {hint && !error && <p className="text-caption text-content-tertiary mt-1">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
