import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, disabled, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={selectId} className="block text-body-sm font-medium text-content-primary">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-full px-4 py-2.5 rounded-lg bg-surface-secondary border text-content-primary font-body text-body-md appearance-none pr-10 transition-all duration-250 ease-luxury focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed',
              error
                ? 'border-status-error focus:border-status-error focus:ring-status-error'
                : 'border-border-subtle hover:border-border focus:border-brand-copper focus:ring-brand-copper',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled} className="bg-surface-secondary text-content-primary">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-content-tertiary absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        {error && <p className="text-caption text-status-error mt-1">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
