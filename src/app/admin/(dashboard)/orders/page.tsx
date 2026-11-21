'use client';

import React, { useState, useEffect } from 'react';
import { orderService } from '@/lib/services/orderService';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatDateTime } from '@/lib/utils';
import { ORDER_STATUS_LABELS } from '@/lib/constants';
import { Order, OrderStatus } from '@/types';
import {
  RotateCw,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  Printer,
  ChevronDown,
} from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrders(orderService.getOrders());
  }, []);

  const refresh = () => {
    setOrders([...orderService.getOrders()]);
  };

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    const updated = orderService.updateOrderStatus(orderId, status);
    if (updated && selectedOrder?.id === orderId) {
      setSelectedOrder(updated);
    }
    refresh();
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchNum = o.order_number.toLowerCase().includes(q);
      const matchName = o.guest_name?.toLowerCase().includes(q);
      const matchPhone = o.guest_phone?.toLowerCase().includes(q);
      if (!matchNum && !matchName && !matchPhone) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <h1 className="text-heading-lg font-display font-bold text-content-primary">
            Order Management Console
          </h1>
          <p className="text-body-sm text-content-secondary mt-0.5">
            Accept, monitor kitchen preparation, and fulfill orders across Motihari.
          </p>
        </div>

        <Button variant="secondary" size="sm" onClick={refresh} leftIcon={<RotateCw className="w-3.5 h-3.5" />}>
          Refresh Queue
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-content-tertiary absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Order # or customer name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-secondary border border-border-subtle text-caption text-content-primary placeholder:text-content-tertiary focus:outline-none focus:border-brand-copper"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['all', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-caption font-medium capitalize transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-brand-copper text-white font-semibold'
                  : 'bg-surface-secondary text-content-secondary border border-border-subtle hover:text-content-primary'
              }`}
            >
              {st} {st !== 'all' ? `(${orders.filter((o) => o.status === st).length})` : `(${orders.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-surface-secondary border border-border-subtle overflow-hidden shadow-card">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-content-tertiary space-y-2">
            <p className="text-body-md">No orders match the selected filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm">
              <thead className="bg-surface-tertiary/60 border-b border-border-subtle text-caption font-mono uppercase text-content-tertiary">
                <tr>
                  <th className="p-4 pl-6">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Mode</th>
                  <th className="p-4">Dishes</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/50 text-content-secondary">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-surface-primary/40 transition-colors">
                    <td className="p-4 pl-6 font-mono font-bold text-brand-copper">
                      {ord.order_number}
                    </td>

                    <td className="p-4">
                      <div className="font-medium text-content-primary">{ord.guest_name}</div>
                      <div className="text-[11px] font-mono text-content-tertiary">{ord.guest_phone}</div>
                    </td>

                    <td className="p-4">
                      <Badge variant="copper">
                        {ord.dining_mode === 'dine_in'
                          ? `Table ${ord.table_number || 1}`
                          : ord.dining_mode === 'delivery'
                          ? 'Motihari Delivery'
                          : 'Takeaway'}
                      </Badge>
                    </td>

                    <td className="p-4 max-w-[200px] truncate text-[12px]">
                      {ord.items?.map((i) => `${i.quantity}× ${i.product_name}`).join(', ')}
                    </td>

                    <td className="p-4 font-mono font-bold text-content-primary">
                      {formatPrice(ord.grand_total)}
                    </td>

                    <td className="p-4">
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateStatus(ord.id, e.target.value as OrderStatus)}
                        aria-label={`Update status for order ${ord.order_number}`}
                        className="px-2.5 py-1 rounded-md bg-surface-primary border border-border-subtle text-caption font-mono font-medium focus:outline-none focus:border-brand-copper cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="quality_check">Quality Check</option>
                        <option value="ready">Ready</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-4 pr-6 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(ord)}
                        className="p-1.5 rounded-lg text-content-secondary hover:text-brand-copper hover:bg-surface-tertiary transition-colors"
                        title="View Full Detail"
                        aria-label="View Full Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-surface-secondary border border-border p-6 space-y-6 shadow-elevated">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <div>
                <span className="font-mono text-heading-md font-bold text-brand-copper">
                  {selectedOrder.order_number}
                </span>
                <p className="text-caption text-content-tertiary">
                  Placed {formatDateTime(selectedOrder.created_at)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="text-caption text-content-tertiary hover:text-content-primary"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-3 text-body-sm text-content-secondary">
              <div>
                <strong className="text-content-primary">Customer:</strong> {selectedOrder.guest_name} ({selectedOrder.guest_phone})
              </div>
              <div>
                <strong className="text-content-primary">Dining Mode:</strong> {selectedOrder.dining_mode.toUpperCase()}
              </div>
              {selectedOrder.delivery_address && (
                <div>
                  <strong className="text-content-primary">Delivery Address:</strong> {selectedOrder.delivery_address}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-border-subtle space-y-2">
              <span className="text-caption font-mono uppercase text-content-tertiary">Items</span>
              {selectedOrder.items?.map((it) => (
                <div key={it.id} className="flex justify-between text-body-sm">
                  <span>{it.quantity}× {it.product_name}</span>
                  <span className="font-mono">{formatPrice(it.total_price)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-border-subtle flex justify-between font-bold text-content-primary">
                <span>Grand Total</span>
                <span className="font-mono text-brand-copper">{formatPrice(selectedOrder.grand_total)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <Button variant="secondary" size="sm" onClick={() => setSelectedOrder(null)}>
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
