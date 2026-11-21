import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Brand Colors ──────────────────────────────────────────
      colors: {
        brand: {
          espresso: {
            DEFAULT: '#2C1810',
            50: '#F5EDE8',
            100: '#E8D5CA',
            200: '#D4B59E',
            300: '#B8886A',
            400: '#8B5E3C',
            500: '#2C1810',
            600: '#24140D',
            700: '#1C0F0A',
            800: '#140B07',
            900: '#0C0604',
          },
          black: {
            DEFAULT: '#1A1110',
            soft: '#2A201F',
            deep: '#0F0A09',
          },
          cream: {
            DEFAULT: '#F5EDE4',
            50: '#FFFDF9',
            100: '#FAF5EF',
            200: '#F5EDE4',
            300: '#EDE0D2',
            400: '#E2CFBA',
            500: '#D4BA9E',
          },
          copper: {
            DEFAULT: '#B87333',
            50: '#F7EDE2',
            100: '#EEDCC6',
            200: '#DEC19E',
            300: '#CDA070',
            400: '#B87333',
            500: '#9A5F2A',
            600: '#7C4D22',
            700: '#5E3A19',
            800: '#402711',
            900: '#221408',
          },
        },
        // Semantic tokens
        surface: {
          primary: '#1A1110',
          secondary: '#2A201F',
          tertiary: '#3A2F2D',
          elevated: '#2C1810',
          cream: '#F5EDE4',
          'cream-soft': '#FAF5EF',
        },
        content: {
          primary: '#F5EDE4',
          secondary: '#D4BA9E',
          tertiary: '#8B7B6E',
          inverse: '#1A1110',
          accent: '#B87333',
        },
        border: {
          subtle: 'rgba(184, 115, 51, 0.15)',
          DEFAULT: 'rgba(184, 115, 51, 0.25)',
          strong: 'rgba(184, 115, 51, 0.4)',
        },
        status: {
          success: '#4A7C59',
          'success-soft': 'rgba(74, 124, 89, 0.15)',
          warning: '#C4842D',
          'warning-soft': 'rgba(196, 132, 45, 0.15)',
          error: '#B84233',
          'error-soft': 'rgba(184, 66, 51, 0.15)',
          info: '#5B8DB8',
          'info-soft': 'rgba(91, 141, 184, 0.15)',
        },
      },

      // ── Typography ────────────────────────────────────────────
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        heading: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-xl': ['1.75rem', { lineHeight: '1.3' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.3' }],
        'heading-md': ['1.25rem', { lineHeight: '1.4' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.4' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.6' }],
        'body-md': ['0.9375rem', { lineHeight: '1.6' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
        'price': ['1.25rem', { lineHeight: '1', fontWeight: '600' }],
        'price-lg': ['1.75rem', { lineHeight: '1', fontWeight: '600' }],
      },

      // ── Spacing ───────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      // ── Border Radius ─────────────────────────────────────────
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },

      // ── Shadows ───────────────────────────────────────────────
      boxShadow: {
        'glow-copper': '0 0 20px rgba(184, 115, 51, 0.15)',
        'glow-copper-lg': '0 0 40px rgba(184, 115, 51, 0.2)',
        'elevated': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'elevated-lg': '0 16px 64px rgba(0, 0, 0, 0.4)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.15)',
        'inner-glow': 'inset 0 1px 0 rgba(245, 237, 228, 0.05)',
      },

      // ── Transitions ───────────────────────────────────────────
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'cinematic': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },

      // ── Animations ────────────────────────────────────────────
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'steam': {
          '0%': { opacity: '0', transform: 'translateY(0) scaleX(1)' },
          '50%': { opacity: '0.3', transform: 'translateY(-15px) scaleX(1.2)' },
          '100%': { opacity: '0', transform: 'translateY(-30px) scaleX(0.8)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s var(--tw-ease-luxury) forwards',
        'fade-up': 'fade-up 0.6s var(--tw-ease-luxury) forwards',
        'fade-down': 'fade-down 0.6s var(--tw-ease-luxury) forwards',
        'scale-in': 'scale-in 0.5s var(--tw-ease-luxury) forwards',
        'slide-in-right': 'slide-in-right 0.5s var(--tw-ease-luxury) forwards',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'steam': 'steam 3s ease-out infinite',
      },

      // ── Backdrop Blur ─────────────────────────────────────────
      backdropBlur: {
        'xs': '2px',
      },

      // ── Z-Index ───────────────────────────────────────────────
      zIndex: {
        'behind': '-1',
        'base': '0',
        'above': '10',
        'navbar': '50',
        'sidebar': '60',
        'modal-backdrop': '70',
        'modal': '80',
        'toast': '90',
        'tooltip': '100',
        'intro': '110',
      },
    },
  },
  plugins: [],
};

export default config;
