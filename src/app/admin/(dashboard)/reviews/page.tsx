'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Star, CheckCircle, Trash2 } from 'lucide-react';

interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  product: string;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: 'rev-1',
      author: 'Rohit Kumar',
      rating: 5,
      product: 'Aroma Haven Signature Velvet Latte',
      comment: 'The velvety microfoam and vanilla nuance make this one of the best coffees in Bihar. Truly high-end hospitality.',
      date: '2026-11-20',
      status: 'approved',
    },
    {
      id: 'rev-2',
      author: 'Priyanka Sharma',
      rating: 5,
      product: 'Artisan Burrata Margherita Pizza',
      comment: 'Sourdough crust was perfectly charred. Burrata center was cold and rich. Incredible late-night pizza.',
      date: '2026-11-19',
      status: 'approved',
    },
    {
      id: 'rev-3',
      author: 'Amit Verma',
      rating: 4,
      product: 'Molten Valrhona Brownie Sizzler',
      comment: 'Decadent, rich, and delicious. Ice cream was slightly soft on delivery but tasted amazing.',
      date: '2026-11-18',
      status: 'approved',
    },
  ]);

  const toggleStatus = (id: string, status: ReviewItem['status']) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <div className="space-y-8 text-left">
      <div className="border-b border-border-subtle pb-6">
        <h1 className="text-heading-lg font-display font-bold text-content-primary">
          Guest Reviews &amp; Moderation
        </h1>
        <p className="text-body-sm text-content-secondary mt-0.5">
          Verified customer feedback, ratings, and response management.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle space-y-3 shadow-card"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-content-primary">{rev.author}</span>
                <div className="flex items-center text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <Badge variant={rev.status === 'approved' ? 'success' : 'warning'}>
                  {rev.status.toUpperCase()}
                </Badge>
              </div>

              <span className="text-caption font-mono text-content-tertiary">{rev.date}</span>
            </div>

            <p className="text-caption font-mono text-brand-copper">Product: {rev.product}</p>
            <p className="text-body-sm text-content-secondary italic">&ldquo;{rev.comment}&rdquo;</p>

            <div className="pt-2 flex justify-end gap-2 border-t border-border-subtle/50">
              {rev.status === 'pending' && (
                <Button variant="primary" size="sm" onClick={() => toggleStatus(rev.id, 'approved')}>
                  Approve Review
                </Button>
              )}
              {rev.status === 'approved' && (
                <Button variant="secondary" size="sm" onClick={() => toggleStatus(rev.id, 'pending')}>
                  Move to Pending
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
