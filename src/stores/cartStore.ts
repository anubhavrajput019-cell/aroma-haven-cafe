'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, DiningMode, AppliedCoupon } from '@/types';
import { DEFAULTS } from '@/lib/constants';
import { calculateGST, calculateDeliveryFee } from '@/lib/utils';

interface CartStore {
  items: CartItem[];
  diningMode: DiningMode;
  tableNumber: number | null;
  coupon: AppliedCoupon | null;
  tip: number;
  gstRate: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;

  // Actions
  addItem: (item: Omit<CartItem, 'id' | 'total_price'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  setDiningMode: (mode: DiningMode) => void;
  setTableNumber: (table: number | null) => void;
  setTip: (tip: number) => void;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
  clearCart: () => void;

  // Computed getters
  getSubtotal: () => number;
  getDiscount: () => number;
  getGST: () => number;
  getEffectiveDeliveryFee: () => number;
  getGrandTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      diningMode: 'dine_in',
      tableNumber: 1, // Default table 1 for demo
      coupon: null,
      tip: 0,
      gstRate: DEFAULTS.gstRate,
      deliveryFee: DEFAULTS.deliveryFee,
      freeDeliveryThreshold: DEFAULTS.freeDeliveryThreshold,

      addItem: (itemData) => {
        set((state) => {
          // Check if identical item already exists (same product, same variant, same add-ons)
          const existingIndex = state.items.findIndex(
            (i) =>
              i.product.id === itemData.product.id &&
              i.variant?.id === itemData.variant?.id &&
              JSON.stringify(i.add_ons.map((a) => a.id).sort()) ===
                JSON.stringify(itemData.add_ons.map((a) => a.id).sort()) &&
              i.spice_level === itemData.spice_level
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            const current = updated[existingIndex];
            const newQty = current.quantity + itemData.quantity;
            updated[existingIndex] = {
              ...current,
              quantity: newQty,
              total_price: Math.round(current.unit_price * newQty * 100) / 100,
            };
            return { items: updated };
          }

          const newItem: CartItem = {
            ...itemData,
            id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            total_price: Math.round(itemData.unit_price * itemData.quantity * 100) / 100,
          };
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId
              ? {
                  ...i,
                  quantity,
                  total_price: Math.round(i.unit_price * quantity * 100) / 100,
                }
              : i
          ),
        }));
      },

      setDiningMode: (diningMode) => set({ diningMode }),
      setTableNumber: (tableNumber) => set({ tableNumber }),
      setTip: (tip) => set({ tip: Math.max(0, tip) }),
      applyCoupon: (coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: null }),
      clearCart: () => set({ items: [], coupon: null, tip: 0 }),

      getSubtotal: () => {
        const { items } = get();
        return Math.round(items.reduce((sum, i) => sum + i.total_price, 0) * 100) / 100;
      },

      getDiscount: () => {
        const { coupon } = get();
        if (!coupon) return 0;
        return coupon.calculated_discount;
      },

      getGST: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const taxable = Math.max(0, subtotal - discount);
        return calculateGST(taxable, get().gstRate);
      },

      getEffectiveDeliveryFee: () => {
        const { diningMode, deliveryFee, freeDeliveryThreshold } = get();
        if (diningMode !== 'delivery') return 0;
        const subtotal = get().getSubtotal();
        return calculateDeliveryFee(subtotal, deliveryFee, freeDeliveryThreshold);
      },

      getGrandTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const gst = get().getGST();
        const delivery = get().getEffectiveDeliveryFee();
        const { tip } = get();
        const total = Math.max(0, subtotal - discount) + gst + delivery + tip;
        return Math.round(total * 100) / 100;
      },

      getItemCount: () => {
        return get().items.reduce((count, i) => count + i.quantity, 0);
      },
    }),
    {
      name: 'aroma_haven_cart',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        items: state.items,
        diningMode: state.diningMode,
        tableNumber: state.tableNumber,
        tip: state.tip,
      }),
    }
  )
);
