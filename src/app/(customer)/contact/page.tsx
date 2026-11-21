'use client';

import React, { useState } from 'react';
import { contactService } from '@/lib/services/contactService';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { BRAND } from '@/lib/constants';
import { getWhatsAppLink, isValidEmail } from '@/lib/utils';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [subject, setSubject] = useState<string>('Table Reservation / General Inquiry');
  const [message, setMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are you genuinely open 24 hours every day in Motihari?',
      a: 'Yes, our kitchen and lounge in Motihari are continuously open 24 hours a day, 7 days a week. We serve fresh handcrafted coffee, snacks, pizzas, and desserts throughout the night.',
    },
    {
      q: 'How does table reservation work?',
      a: 'You can walk in anytime or reserve in advance by contacting our WhatsApp concierge at +91 9229310610 or selecting "Dine In" with your table number during online ordering.',
    },
    {
      q: 'What is the delivery radius in Motihari?',
      a: 'We deliver citywide across Motihari within 30 to 45 minutes. Delivery is free for orders above ₹299 (standard ₹30 delivery fee below threshold).',
    },
    {
      q: 'Do you offer vegetarian and vegan selections?',
      a: 'Yes! Over 80% of our menu is vegetarian, and we provide oat milk alternatives, vegan cold brews, and plant-based dishes labeled clearly across our menu.',
    },
    {
      q: 'Is high-speed Wi-Fi available for work or study?',
      a: 'Yes, complimentary high-speed fiber Wi-Fi and power outlets are available at all our lounge booths and work tables.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim() || !isValidEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!message.trim()) {
      setError('Please write your message or inquiry.');
      return;
    }

    contactService.saveMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      subject,
      message: message.trim(),
    });

    setIsSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-surface-primary pb-28 text-left">
      {/* Header */}
      <div className="border-b border-border-subtle bg-surface-secondary/50 py-16">
        <div className="section-container max-w-4xl space-y-4">
          <Badge variant="copper">We Are Here For You</Badge>
          <h1 className="text-display-sm sm:text-display-md font-display text-content-primary">
            Connect With Aroma Haven
          </h1>
          <p className="text-body-lg text-content-secondary max-w-2xl leading-relaxed">
            Have a table inquiry, feedback, or special event request? Reach out directly through phone, WhatsApp, or our concierge form below.
          </p>
        </div>
      </div>

      <div className="section-container pt-14 space-y-16">
        {/* Direct Channels Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-copper/15 border border-brand-copper/30 text-brand-copper flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-body-sm font-semibold text-content-primary">Direct Call</div>
              <a href={`tel:${BRAND.phone}`} className="text-caption text-brand-copper font-mono hover:underline block mt-0.5">
                {BRAND.phone}
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-copper/15 border border-brand-copper/30 text-brand-copper flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-body-sm font-semibold text-content-primary">WhatsApp Desk</div>
              <a
                href={getWhatsAppLink(BRAND.whatsapp, 'Hello Aroma Haven Café, I would like to inquire about...')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-brand-copper hover:underline inline-flex items-center gap-1 mt-0.5"
              >
                <span>Instant Chat</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-copper/15 border border-brand-copper/30 text-brand-copper flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-body-sm font-semibold text-content-primary">Email Inquiries</div>
              <a href={`mailto:${BRAND.email}`} className="text-caption text-brand-copper truncate block mt-0.5">
                {BRAND.email}
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-secondary border border-border-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-copper/15 border border-brand-copper/30 text-brand-copper flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-body-sm font-semibold text-content-primary">Service Schedule</div>
              <span className="text-caption text-content-secondary block mt-0.5">
                Open {BRAND.hours} Continuously
              </span>
            </div>
          </div>
        </div>

        {/* Form & FAQ Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-surface-secondary border border-border-subtle shadow-card space-y-6">
            <div className="space-y-1 border-b border-border-subtle pb-4">
              <h2 className="text-heading-md font-display font-medium text-content-primary">
                Send Us A Message
              </h2>
              <p className="text-body-sm text-content-secondary">
                Submissions appear directly on the Aroma Haven administrator platform.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-status-success-soft border border-status-success/30 text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-status-success mx-auto" />
                <h4 className="text-heading-sm font-display text-content-primary">
                  Message Sent Successfully
                </h4>
                <p className="text-body-sm text-content-secondary max-w-sm mx-auto">
                  Thank you for reaching out. Anubhav and the Aroma Haven team will review your inquiry shortly.
                </p>
                <Button variant="secondary" size="sm" onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <p className="p-3 rounded-lg bg-status-error-soft text-status-error text-caption">
                    {error}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name *"
                    placeholder="e.g. Anubhav Rajput"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    label="Email Address *"
                    type="email"
                    placeholder="e.g. guest@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number (Optional)"
                    placeholder="e.g. 9229310610"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div>
                    <label className="block text-body-sm font-medium text-content-primary mb-1.5">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-surface-secondary border border-border-subtle text-content-primary font-body text-body-md focus:outline-none focus:border-brand-copper"
                    >
                      <option value="Table Reservation">Table Reservation</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Special Event / Gathering">Special Event / Gathering</option>
                      <option value="Feedback / Compliment">Feedback / Compliment</option>
                    </select>
                  </div>
                </div>

                <Textarea
                  label="Your Message *"
                  placeholder="How can our team make your café experience unforgettable?…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />

                <Button variant="copper-glow" size="lg" type="submit" className="w-full sm:w-auto">
                  Submit Inquiry
                </Button>
              </form>
            )}
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-caption font-mono uppercase tracking-widest text-brand-copper">
                Frequently Asked
              </span>
              <h3 className="text-heading-md font-display text-content-primary">
                Common Questions
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl bg-surface-secondary border border-border-subtle overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 text-body-sm font-medium text-content-primary hover:text-brand-copper transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-content-tertiary transition-transform duration-300 shrink-0 ${
                          isOpen ? 'rotate-180 text-brand-copper' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-body-sm text-content-secondary leading-relaxed border-t border-border-subtle/50 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
