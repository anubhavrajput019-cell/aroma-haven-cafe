'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { ScrollText, Shield } from 'lucide-react';

export default function AdminAuditPage() {
  const auditLogs = [
    {
      id: 'aud-1',
      action: 'Price Update',
      user: 'admin@aromahavencafe.com',
      description: 'Latte price updated from ₹180 to ₹195',
      time: '10 mins ago',
      type: 'pricing',
    },
    {
      id: 'aud-2',
      action: 'Availability Change',
      user: 'admin@aromahavencafe.com',
      description: 'Marked "Chocolate Cake" available to order',
      time: '42 mins ago',
      type: 'inventory',
    },
    {
      id: 'aud-3',
      action: 'Order Status Change',
      user: 'kitchen@aromahavencafe.com',
      description: 'Order #AH-1042 advanced: Preparing → Ready',
      time: '1 hour ago',
      type: 'order',
    },
    {
      id: 'aud-4',
      action: 'Promo Created',
      user: 'admin@aromahavencafe.com',
      description: 'Created coupon code "WELCOME50" with ₹50 discount',
      time: '3 hours ago',
      type: 'promo',
    },
  ];

  return (
    <div className="space-y-8 text-left">
      <div className="border-b border-border-subtle pb-6">
        <h1 className="text-heading-lg font-display font-bold text-content-primary">
          Operations Activity &amp; Audit Log
        </h1>
        <p className="text-body-sm text-content-secondary mt-0.5">
          Immutable operational history of price changes, order state shifts, and menu updates.
        </p>
      </div>

      <div className="rounded-2xl bg-surface-secondary border border-border-subtle overflow-hidden shadow-card">
        <table className="w-full text-left text-body-sm">
          <thead className="bg-surface-tertiary/60 border-b border-border-subtle text-caption font-mono uppercase text-content-tertiary">
            <tr>
              <th className="p-4 pl-6">Timestamp</th>
              <th className="p-4">Action</th>
              <th className="p-4">Operator</th>
              <th className="p-4 pr-6">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle/50 text-content-secondary">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-surface-primary/40 transition-colors">
                <td className="p-4 pl-6 font-mono text-caption text-content-tertiary">
                  {log.time}
                </td>
                <td className="p-4">
                  <Badge variant="copper">{log.action}</Badge>
                </td>
                <td className="p-4 font-mono text-caption text-content-primary">
                  {log.user}
                </td>
                <td className="p-4 pr-6 text-body-sm text-content-secondary">
                  {log.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
