'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Product, ProductVariant, AddOn, SpiceLevel } from '@/types';
import { SPICE_LEVELS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import { Plus, Minus, Check, Clock, Flame } from 'lucide-react';

interface ProductCustomizerModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductCustomizerModal({
  product,
  isOpen,
  onClose,
}: ProductCustomizerModalProps) {
  const { addItem } = useCartStore();
  const { setCartDrawerOpen } = useUIStore();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel | null>(null);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants?.[0] || null);
      setSelectedAddOns([]);
      setSelectedSpice(product.spice_level || 'none');
      setSpecialInstructions('');
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  // Calculate current unit price
  const basePrice = product.special_price || product.base_price;
  const variantAdjustment = selectedVariant?.price_adjustment || 0;
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = basePrice + variantAdjustment + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddOn = (addon: AddOn) => {
    if (selectedAddOns.some((a) => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handleAddToCart = () => {
    addItem({
      product,
      variant: selectedVariant,
      add_ons: selectedAddOns,
      quantity,
      spice_level: selectedSpice,
      special_instructions: specialInstructions,
      unit_price: unitPrice,
    });
    onClose();
    setCartDrawerOpen(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title={product.name}
      description={product.short_description}
    >
      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
        {/* Product Photo Banner */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-surface-tertiary">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
          />
          <div className="absolute bottom-3 left-3 flex gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xs text-[11px] font-mono text-content-primary">
              <Clock className="w-3.5 h-3.5 text-brand-copper" />
              <span>{product.prep_time_min}–{product.prep_time_max} mins</span>
            </span>
            {product.is_vegetarian && (
              <Badge variant="success">Vegetarian</Badge>
            )}
          </div>
        </div>

        {/* Variant / Size Options */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-2.5 text-left">
            <label className="block text-body-sm font-semibold text-content-primary uppercase tracking-wider font-mono">
              Choose Size / Portion
            </label>
            <div className="grid grid-cols-2 gap-3">
              {product.variants.map((v) => {
                const isSelected = selectedVariant?.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-brand-copper bg-brand-copper/15 text-content-primary'
                        : 'border-border-subtle bg-surface-primary text-content-secondary hover:border-border'
                    }`}
                  >
                    <div>
                      <div className="text-body-sm font-medium">{v.name}</div>
                      {v.price_adjustment > 0 && (
                        <div className="text-caption font-mono text-brand-copper">
                          +{formatPrice(v.price_adjustment)}
                        </div>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-brand-copper" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Add-ons Section */}
        {product.add_ons && product.add_ons.length > 0 && (
          <div className="space-y-2.5 text-left">
            <label className="block text-body-sm font-semibold text-content-primary uppercase tracking-wider font-mono">
              Custom Add-ons &amp; Extras
            </label>
            <div className="space-y-2">
              {product.add_ons.map((addon) => {
                const isSelected = selectedAddOns.some((a) => a.id === addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddOn(addon)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-brand-copper bg-brand-copper/15 text-content-primary'
                        : 'border-border-subtle bg-surface-primary text-content-secondary hover:border-border'
                    }`}
                  >
                    <span className="text-body-sm font-medium">{addon.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-caption text-brand-copper">
                        +{formatPrice(addon.price)}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-brand-copper border-brand-copper text-white'
                            : 'border-border-subtle'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Spice Level (where applicable) */}
        {product.spice_level && product.spice_level !== 'none' && (
          <div className="space-y-2.5 text-left">
            <label className="flex items-center gap-1.5 text-body-sm font-semibold text-content-primary uppercase tracking-wider font-mono">
              <Flame className="w-4 h-4 text-brand-copper" />
              <span>Spice Level</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {SPICE_LEVELS.filter((s) => s.key !== 'none').map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSelectedSpice(s.key)}
                  className={`px-3 py-1.5 rounded-lg border text-caption font-medium transition-all ${
                    selectedSpice === s.key
                      ? 'border-brand-copper bg-brand-copper/20 text-brand-copper font-semibold'
                      : 'border-border-subtle bg-surface-primary text-content-secondary hover:border-border'
                  }`}
                >
                  {s.label} {s.emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Special Instructions */}
        <div className="space-y-1.5 text-left">
          <label className="block text-body-sm font-semibold text-content-primary uppercase tracking-wider font-mono">
            Kitchen Preparation Note
          </label>
          <input
            type="text"
            placeholder="e.g. Extra hot, low sugar, dressing on the side…"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg bg-surface-primary border border-border-subtle text-content-primary placeholder:text-content-tertiary text-body-sm focus:outline-none focus:border-brand-copper"
            maxLength={120}
          />
        </div>
      </div>

      {/* Modal Footer with Live Recalculated Total & Quantity */}
      <div className="mt-6 pt-5 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <span className="text-body-sm text-content-secondary">Qty:</span>
          <div className="inline-flex items-center gap-3 bg-surface-primary border border-border-subtle rounded-lg px-3 py-1.5">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="text-content-secondary hover:text-content-primary disabled:opacity-30"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono text-body-md font-bold min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="text-content-secondary hover:text-content-primary"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add Button with Total Price */}
        <Button
          variant="copper-glow"
          size="lg"
          onClick={handleAddToCart}
          className="w-full sm:w-auto min-w-[200px]"
        >
          Add to Order • {formatPrice(totalPrice)}
        </Button>
      </div>
    </Modal>
  );
}
