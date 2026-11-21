'use client';

import React, { useState, useEffect } from 'react';
import { contactService } from '@/lib/services/contactService';
import { ContactMessage } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDateTime } from '@/lib/utils';
import { MessageSquare, Mail, Phone, RotateCw, CheckCircle, Trash2 } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    // Initial load + sample seed if empty
    const all = contactService.getMessages();
    if (all.length === 0) {
      contactService.saveMessage({
        name: 'Vikramaditya Roy',
        email: 'vikram.roy@example.com',
        phone: '+91 9835012345',
        subject: 'Table Reservation for Anniversary Dinner',
        message: 'Looking to reserve window booth Table 01 or 02 for 4 guests this Saturday at 8 PM. Please confirm availability of the chocolate sizzler.',
      });
      contactService.saveMessage({
        name: 'Dr. Sunita Mishra',
        email: 'dr.sunita@motiharihospital.org',
        phone: '+91 9431098765',
        subject: 'Corporate Coffee Catering Inquiry',
        message: 'We are hosting a medical conference in Motihari next month and would love Aroma Haven artisan coffee dispenser catering for 60 doctors.',
      });
      setMessages(contactService.getMessages());
    } else {
      setMessages(all);
    }
  }, []);

  const refresh = () => {
    setMessages(contactService.getMessages());
  };

  const markStatus = (id: string, status: ContactMessage['status']) => {
    contactService.updateMessageStatus(id, status);
    refresh();
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <h1 className="text-heading-lg font-display font-bold text-content-primary">
            Customer Inquiries &amp; Messages
          </h1>
          <p className="text-body-sm text-content-secondary mt-0.5">
            Table reservations, catering requests, and guest feedback from Motihari.
          </p>
        </div>

        <Button variant="secondary" size="sm" onClick={refresh} leftIcon={<RotateCw className="w-3.5 h-3.5" />}>
          Refresh Inbox
        </Button>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-content-tertiary bg-surface-secondary rounded-2xl border border-border-subtle">
            <MessageSquare className="w-8 h-8 mx-auto mb-2" />
            <p className="text-body-md">Your guest inbox is clear.</p>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle space-y-4 shadow-card hover:border-brand-copper/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle/50 pb-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-body-md font-bold text-content-primary">{m.name}</h3>
                  <Badge variant={m.status === 'new' ? 'copper' : 'success'}>
                    {m.status.toUpperCase()}
                  </Badge>
                  <span className="text-caption font-mono text-content-tertiary">
                    {formatDateTime(m.created_at)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {m.status === 'new' && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => markStatus(m.id, 'read')}
                    >
                      Mark Read
                    </Button>
                  )}
                  {m.status !== 'responded' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => markStatus(m.id, 'responded')}
                    >
                      Mark Responded
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-body-sm text-brand-copper">
                  {m.subject}
                </div>
                <p className="text-body-md text-content-secondary leading-relaxed">
                  {m.message}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-caption text-content-tertiary border-t border-border-subtle/40">
                <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 hover:text-brand-copper">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{m.email}</span>
                </a>
                {m.phone && (
                  <a href={`tel:${m.phone}`} className="flex items-center gap-1.5 hover:text-brand-copper font-mono">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{m.phone}</span>
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
