import { Order, OrderStatus } from '@/types';

// Client-side session and local persistence for demo orders until Supabase is active
const ORDERS_STORAGE_KEY = 'ah_demo_orders';

export const orderService = {
  getOrders(): Order[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(ORDERS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  getOrderById(id: string): Order | null {
    const orders = this.getOrders();
    return orders.find((o) => o.id === id || o.order_number === id) || null;
  },

  saveOrder(order: Order): Order {
    if (typeof window === 'undefined') return order;
    const orders = this.getOrders();
    const updated = [order, ...orders.filter((o) => o.id !== order.id)];
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save order to localStorage:', e);
    }
    return order;
  },

  updateOrderStatus(orderId: string, status: OrderStatus, note?: string): Order | null {
    const order = this.getOrderById(orderId);
    if (!order) return null;

    const newHistory = [
      ...(order.status_history || []),
      {
        id: `h_${Date.now()}`,
        order_id: order.id,
        status,
        note: note || `Status updated to ${status}`,
        created_by: 'Admin',
        created_at: new Date().toISOString(),
      },
    ];

    const updatedOrder: Order = {
      ...order,
      status,
      status_history: newHistory,
      updated_at: new Date().toISOString(),
    };

    return this.saveOrder(updatedOrder);
  },
};
