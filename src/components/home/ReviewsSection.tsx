import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

export function ReviewsSection() {
  const reviews = [
    {
      author: 'Rohit K.',
      city: 'Motihari',
      rating: 5,
      date: 'Recent Visit',
      comment:
        'The Signature Velvet Latte is on another level. Never expected a café in Motihari to serve coffee that genuinely rivals luxury hotel lounges in Bengaluru and Delhi.',
      dish: 'Aroma Haven Signature Velvet Latte',
    },
    {
      author: 'Priyanka S.',
      city: 'Motihari',
      rating: 5,
      date: 'Dine-In Guest',
      comment:
        'The sourdough Burrata Margherita is phenomenal — crust is crisp, burrata is fresh and creamy. Plus the 24x7 late night atmosphere is super safe and relaxing.',
      dish: 'Artisan Burrata Margherita Pizza',
    },
    {
      author: 'Amit V.',
      city: 'Motihari',
      rating: 5,
      date: 'Delivery Order',
      comment:
        'Ordered midnight delivery to Gandhi Chowk — food arrived piping hot in 25 minutes. Packaging is clean, elegant, and eco-friendly. 10/10 service!',
      dish: 'Molten Valrhona Brownie Sizzler',
    },
  ];

  return (
    <section className="section-spacing bg-surface-secondary/60 border-t border-border-subtle relative">
      <div className="section-container space-y-12 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-caption font-mono uppercase tracking-widest text-brand-copper">
              Guest Impressions
            </span>
            <h2 className="text-display-sm sm:text-display-md font-display text-content-primary">
              Loved By Coffee Connoisseurs
            </h2>
            <p className="text-body-md text-content-secondary max-w-lg">
              Hear what our patrons and night owls in Motihari have to say about their Aroma Haven experience.
            </p>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-primary border border-border-subtle shrink-0">
            <div className="font-mono text-display-sm font-bold text-brand-copper leading-none">
              4.9
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-[12px] text-content-tertiary">Over 450+ Verified Ratings</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-surface-primary border border-border-subtle flex flex-col justify-between space-y-6 shadow-card hover:border-brand-copper/40 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-brand-copper/30" />
                </div>

                <p className="text-body-md text-content-secondary italic">
                  “{rev.comment}”
                </p>
              </div>

              <div className="pt-4 border-t border-border-subtle/50 flex items-center justify-between text-body-sm">
                <div>
                  <div className="font-semibold text-content-primary flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-status-success" aria-label="Verified Customer" />
                  </div>
                  <div className="text-[12px] text-content-tertiary">{rev.city} • {rev.date}</div>
                </div>
                <div className="text-[11px] font-mono text-brand-copper truncate max-w-[130px] text-right">
                  {rev.dish}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
