import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Award, Gift, Sparkles, Truck, Check } from 'lucide-react';

export function RewardsSection() {
  const tiers = [
    {
      name: 'Bronze',
      range: '0 – 499 pts',
      multiplier: '1× Base Rate',
      perks: ['1 pt earned per ₹10 spent', '100 pts = ₹10 discount on orders', 'Exclusive member specials'],
      color: 'border-amber-700/50 bg-amber-950/20 text-amber-500',
    },
    {
      name: 'Silver',
      range: '500 – 1499 pts',
      multiplier: '1.5× Earning Boost',
      perks: ['1.5× points on all beverage orders', 'Priority table reservations', 'Complimentary birthday dessert'],
      color: 'border-slate-400/50 bg-slate-900/30 text-slate-300',
      highlighted: true,
    },
    {
      name: 'Gold',
      range: '1500+ pts',
      multiplier: '2× Elite Earning',
      perks: ['2× points on every single order', 'FREE Motihari city delivery on all orders', 'Complimentary chef tasting invitations'],
      color: 'border-yellow-500/60 bg-yellow-950/20 text-yellow-400',
    },
  ];

  return (
    <section className="section-spacing bg-surface-primary border-t border-border-subtle relative text-left">
      <div className="section-container space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="copper">Aroma Connoisseur Club</Badge>
          <h2 className="text-display-sm sm:text-display-md font-display text-content-primary">
            Earn Points With Every Sip
          </h2>
          <p className="text-body-md text-content-secondary">
            Join our complimentary loyalty rewards program. Earn points with every eligible order, unlock elite tier multipliers, and enjoy free delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-2xl border flex flex-col justify-between space-y-6 transition-all ${tier.color} ${
                tier.highlighted ? 'shadow-glow-copper scale-[1.02] border-brand-copper' : 'bg-surface-secondary/60'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-heading-md font-display font-bold text-content-primary">
                    {tier.name} Tier
                  </h3>
                  <Award className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <div className="text-caption font-mono uppercase tracking-wider text-content-tertiary">
                    Qualifying Points: {tier.range}
                  </div>
                  <div className="text-body-md font-semibold text-brand-copper">
                    {tier.multiplier}
                  </div>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-border-subtle/50 text-body-sm text-content-secondary">
                  {tier.perks.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-brand-copper shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={tier.highlighted ? 'copper-glow' : 'secondary'}
                className="w-full"
              >
                <Link href="/account/rewards">View Club Details</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
