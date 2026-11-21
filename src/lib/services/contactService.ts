import { ContactMessage } from '@/types';

const CONTACT_STORAGE_KEY = 'ah_contact_messages';

export const contactService = {
  getMessages(): ContactMessage[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(CONTACT_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveMessage(msg: Omit<ContactMessage, 'id' | 'status' | 'admin_notes' | 'created_at' | 'updated_at'>): ContactMessage {
    const newMessage: ContactMessage = {
      ...msg,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      status: 'new',
      admin_notes: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      const all = this.getMessages();
      try {
        localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify([newMessage, ...all]));
      } catch (e) {
        console.warn('Failed to save message to localStorage:', e);
      }
    }

    return newMessage;
  },

  updateMessageStatus(id: string, status: ContactMessage['status']): void {
    if (typeof window === 'undefined') return;
    const all = this.getMessages();
    const updated = all.map((m) => (m.id === id ? { ...m, status, updated_at: new Date().toISOString() } : m));
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(updated));
  },
};
