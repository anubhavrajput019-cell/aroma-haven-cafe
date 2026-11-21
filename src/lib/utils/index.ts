// ============================================================
// AROMA HAVEN CAFÉ — Utility Functions
// ============================================================

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with conflict resolution.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Indian Rupee currency.
 */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Format a date string to a human-readable format.
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format a date string to include time.
 */
export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Format a time from a date string.
 */
export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Generate a unique cart item ID.
 */
export function generateCartItemId(): string {
  return `cart_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Generate a demo order number.
 */
export function generateOrderNumber(sequence: number): string {
  return `AH-${String(sequence).padStart(4, '0')}`;
}

/**
 * Calculate GST amount.
 */
export function calculateGST(subtotal: number, gstRate: number): number {
  return Math.round(subtotal * gstRate * 100) / 100;
}

/**
 * Determine delivery fee based on subtotal and threshold.
 */
export function calculateDeliveryFee(
  subtotal: number,
  deliveryFee: number,
  freeThreshold: number,
  isGoldMember: boolean = false,
  goldFreeDelivery: boolean = true
): number {
  if (isGoldMember && goldFreeDelivery) return 0;
  if (subtotal >= freeThreshold) return 0;
  return deliveryFee;
}

/**
 * Calculate reward points earned from an order.
 */
export function calculatePointsEarned(
  orderTotal: number,
  pointsPerRupee: number,
  tierMultiplier: number
): number {
  return Math.floor(orderTotal * pointsPerRupee * tierMultiplier);
}

/**
 * Calculate the monetary value of reward points.
 */
export function calculatePointsValue(points: number, redemptionValue: number): number {
  return Math.round(points * redemptionValue * 100) / 100;
}

/**
 * Determine reward tier from lifetime points.
 */
export function getRewardTier(
  lifetimePoints: number
): { tier: 'bronze' | 'silver' | 'gold'; multiplier: number } {
  if (lifetimePoints >= 1500) return { tier: 'gold', multiplier: 2 };
  if (lifetimePoints >= 500) return { tier: 'silver', multiplier: 1.5 };
  return { tier: 'bronze', multiplier: 1 };
}

/**
 * Slugify a string for URLs.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text to a maximum length.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

/**
 * Format preparation time range.
 */
export function formatPrepTime(min: number, max: number): string {
  if (min === max) return `${min} min`;
  return `${min}–${max} min`;
}

/**
 * Debounce a function.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Check if the user prefers reduced motion.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Generate WhatsApp link with pre-filled message.
 */
export function getWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  const url = `https://wa.me/${cleanPhone}`;
  if (message) return `${url}?text=${encodeURIComponent(message)}`;
  return url;
}

/**
 * Validate email format.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate phone format (Indian).
 */
export function isValidPhone(phone: string): boolean {
  return /^(\+91[\-\s]?)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
}
