'use client';

import React from 'react';
import Link from 'next/link';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useUIStore } from '@/stores/uiStore';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export function CartDrawer() {
  const { isCartDrawerOpen, setCartDrawerOpen } = useUIStore();
  const { items, updateQuantity, removeItem, getSubtotal, getItemCount, diningMode } = useCartStore();

  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  return (
    <Drawer
      isOpen={isCartDrawerOpen}
      onClose={() => setCartDrawerOpen(false)}
      title={
        <span className="flex items-center gap-2.5">
          <span>Your Selection</span>
          {itemCount > 0 && <Badge variant="copper">{itemCount}</Badge>}
        </span>
      }
      subtitle={`Dining Mode: ${diningMode.replace('_', ' ').toUpperCase()}`}
      footer={
        items.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-body-md">
              <span className="text-content-secondary">Subtotal</span>
              <span className="font-mono font-semibold text-content-primary text-price">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-[11px] text-content-tertiary">
              Taxes (provisional 5% GST) and delivery calculated at checkout.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                onClick={() => setCartDrawerOpen(false)}
                className="w-full"
              >
                <Link href="/cart" className="w-full">
                  View Full Cart
                </Link>
              </Button>
              <Button
                variant="copper-glow"
                onClick={() => setCartDrawerOpen(false)}
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                <Link href="/checkout" className="w-full">
                  Checkout
                </Link>
              </Button>
            </div>
          </div>
        ) : null
      }
    >
      {items.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-full bg-surface-tertiary flex items-center justify-center text-content-tertiary">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-heading-sm font-display text-content-primary">Your cart is empty</h4>
            <p className="text-body-sm text-content-secondary max-w-xs">
              Explore our handcrafted coffee, fresh bakery, and gourmet kitchen dishes.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setCartDrawerOpen(false)}
            className="mt-2"
          >
            <Link href="/menu">Browse Menu</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-surface-primary border border-border-subtle flex gap-3.5 transition-all"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-surface-tertiary shrink-0">
                <Image
                  src={item.product.image_url}
                  alt={item.product.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h5 className="text-body-sm font-medium text-content-primary truncate">
                    {item.product.name}
                  </h5>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-content-tertiary hover:text-status-error transition-colors p-1"
                    aria-label={`Remove ${item.product.name} from cart`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {item.variant && (
                  <p className="text-caption text-content-secondary">
                    Size: {item.variant.name}
                  </p>
                )}

                {item.add_ons.length > 0 && (
                  <p className="text-[11px] text-content-tertiary truncate">
                    + {item.add_ons.map((a) => a.name).join(', ')}
                  </p>
                )}

                <div className="flex items-center justify-between mt-2.5">
                  <span className="font-mono text-body-sm font-medium text-brand-copper">
                    {formatPrice(item.total_price)}
                  </span>

                  <div className="inline-flex items-center gap-2 bg-surface-secondary border border-border-subtle rounded-md px-1.5 py-0.5">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-content-secondary hover:text-content-primary p-0.5"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-caption min-w-[16px] text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-content-secondary hover:text-content-primary p-0.5"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
}
