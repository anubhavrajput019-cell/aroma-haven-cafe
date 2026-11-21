'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { Users, Award, Mail, Phone } from 'lucide-react';

export default function AdminCustomersPage() {
  const sampleCustomers = [
    { id: 'c-1', name: 'Rohit Kumar', email: 'rohit.k@example.com', phone: '+91 9835012345', orders: 12, spent: 4850, tier: 'Silver' },
    { id: 'c-2', name: 'Priyanka Sharma', email: 'priyanka.s@example.com', phone: '+91 9431098765', orders: 24, spent: 11200, tier: 'Gold' },
    { id: 'c-3', name: 'Amit Verma', email: 'amit.v@example.com', phone: '+91 9122334455', orders: 5, spent: 1650, tier: 'Bronze' },
    { id: 'c-4', name: 'Dr. Sunita Mishra', email: 'dr.sunita@hospital.org', phone: '+91 9835123890', orders: 18, spent: 7800, tier: 'Silver' },
    { id: 'c-5', name: 'Rajesh Anand', email: 'rajesh.anand@bihar.in', phone: '+91 9229112233', orders: 31, spent: 16400, tier: 'Gold' },
  ];

  return (
    <div className="space-y-8 text-left">
      <div className="border-b border-border-subtle pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-lg font-display font-bold text-content-primary">
            Customer Accounts &amp; Loyalty Roster
          </h1>
          <p className="text-body-sm text-content-secondary mt-0.5">
            Registered patrons, loyalty tier progressions, and spending history in Motihari.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-status-warning-soft border border-status-warning/30 text-status-warning text-xs font-mono shrink-0">
          Academic Demo Data • No Real PII
        </span>
      </div>

      <div className="rounded-2xl bg-surface-secondary border border-border-subtle overflow-hidden shadow-card">
        <table className="w-full text-left text-body-sm">
          <thead className="bg-surface-tertiary/60 border-b border-border-subtle text-caption font-mono uppercase text-content-tertiary">
            <tr>
              <th className="p-4 pl-6">Customer</th>
              <th className="p-4">Contact</th>
              <th className="p-4 text-center">Loyalty Tier</th>
              <th className="p-4 text-center">Orders Placed</th>
              <th className="p-4 pr-6 text-right">Lifetime Spend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle/50 text-content-secondary">
            {sampleCustomers.map((cust) => (
              <tr key={cust.id} className="hover:bg-surface-primary/40 transition-colors">
                <td className="p-4 pl-6 font-medium text-content-primary">
                  {cust.name}
                </td>
                <td className="p-4 text-caption font-mono">
                  <div>{cust.email}</div>
                  <div className="text-content-tertiary">{cust.phone}</div>
                </td>
                <td className="p-4 text-center">
                  <Badge variant={cust.tier === 'Gold' ? 'copper' : cust.tier === 'Silver' ? 'info' : 'neutral'}>
                    {cust.tier}
                  </Badge>
                </td>
                <td className="p-4 text-center font-mono font-medium">
                  {cust.orders}
                </td>
                <td className="p-4 pr-6 text-right font-mono font-bold text-brand-copper">
                  {formatPrice(cust.spent)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
