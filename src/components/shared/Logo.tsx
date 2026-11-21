import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'full' | 'monogram' | 'stacked';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  asLink?: boolean;
  href?: string;
}

export function Logo({
  variant = 'full',
  className,
  size = 'md',
  showTagline = false,
  asLink = true,
  href = '/',
}: LogoProps) {
  // Size metrics
  const sizes = {
    sm: {
      mark: 'w-7 h-7',
      text: 'text-lg',
      tagline: 'text-[9px]',
    },
    md: {
      mark: 'w-9 h-9',
      text: 'text-xl',
      tagline: 'text-[10px]',
    },
    lg: {
      mark: 'w-12 h-12',
      text: 'text-2xl',
      tagline: 'text-xs',
    },
    xl: {
      mark: 'w-16 h-16',
      text: 'text-3xl',
      tagline: 'text-sm',
    },
  };

  // Monogram SVG: Geometric luxury monogram with intertwined 'A' & 'H' inside an octagonal coffee ring
  const MonogramMark = ({ markSize }: { markSize: string }) => (
    <svg
      className={cn('text-brand-copper transition-transform duration-350 ease-luxury group-hover:scale-105', markSize)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer subtle shield / octagon */}
      <polygon
        points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeOpacity="0.35"
        className="transition-colors duration-350 group-hover:stroke-opacity-80"
      />
      {/* Inner luxury ring */}
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        strokeOpacity="0.4"
      />
      {/* Coffee steam curve */}
      <path
        d="M45,26 C45,20 48,16 52,14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />
      <path
        d="M52,24 C52,18 55,15 58,13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
      {/* Stylized 'A' */}
      <path
        d="M34,70 L50,30 L66,70"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Central bar forming 'H' crossbar */}
      <path
        d="M40,55 L60,55"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Core coffee bean droplet at apex */}
      <circle cx="50" cy="45" r="2.5" fill="currentColor" />
    </svg>
  );

  const content = (
    <div className={cn('inline-flex items-center gap-3 select-none group', className)}>
      <MonogramMark markSize={sizes[size].mark} />

      {variant !== 'monogram' && (
        <div className="flex flex-col text-left">
          <span className={cn('font-display font-medium tracking-wider text-content-primary leading-tight', sizes[size].text)}>
            AROMA HAVEN
            <span className="text-brand-copper font-serif ml-1.5 text-[0.85em] font-light">CAFÉ</span>
          </span>
          {showTagline && (
            <span className={cn('font-heading text-brand-copper italic tracking-widest leading-none mt-0.5', sizes[size].tagline)}>
              Served With Love &amp; Quality !!
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link href={href} className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-copper rounded-md">
        {content}
      </Link>
    );
  }

  return content;
}
