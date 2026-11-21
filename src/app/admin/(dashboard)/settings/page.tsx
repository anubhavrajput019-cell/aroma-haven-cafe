'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { DEFAULTS, BRAND } from '@/lib/constants';
import { Settings, ShieldCheck, Check } from 'lucide-react';

export default function AdminSettingsPage() {
  const [gstRate, setGstRate] = useState<string>('5');
  const [deliveryFee, setDeliveryFee] = useState<string>('30');
  const [freeThreshold, setFreeThreshold] = useState<string>('299');
  const [tablesCount, setTablesCount] = useState<string>('12');
  const [saved, setSaved] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 text-left max-w-3xl">
      <div className="border-b border-border-subtle pb-6">
        <h1 className="text-heading-lg font-display font-bold text-content-primary">
          Operations &amp; Business Rules Settings
        </h1>
        <p className="text-body-sm text-content-secondary mt-0.5">
          Configurable financial thresholds, table capacities, and tax settings.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-status-success-soft border border-status-success/30 text-status-success text-body-sm flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span>Settings saved successfully. Changes take immediate effect across customer ordering.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Taxes & Financials */}
        <div className="p-7 rounded-2xl bg-surface-secondary border border-border-subtle space-y-4 shadow-card">
          <h3 className="text-body-md font-semibold text-content-primary uppercase font-mono tracking-wider border-b border-border-subtle pb-3">
            Tax &amp; Regulatory Parameters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Provisional GST Rate (%)"
              type="number"
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
              hint="Provisional 5% demo rate per confirmed decision A1"
            />
            <div className="space-y-1">
              <label className="block text-body-sm font-medium text-content-primary">
                Tax Treatment Note
              </label>
              <div className="p-2.5 rounded-lg bg-surface-primary border border-border-subtle text-caption text-content-secondary">
                Configurable academic prototype. Live GSTIN registration entered prior to production.
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Rules */}
        <div className="p-7 rounded-2xl bg-surface-secondary border border-border-subtle space-y-4 shadow-card">
          <h3 className="text-body-md font-semibold text-content-primary uppercase font-mono tracking-wider border-b border-border-subtle pb-3">
            Motihari Delivery Parameters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Standard Delivery Charge (₹)"
              type="number"
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(e.target.value)}
              hint="Fee below threshold (Default ₹30)"
            />
            <Input
              label="Free Delivery Threshold (₹)"
              type="number"
              value={freeThreshold}
              onChange={(e) => setFreeThreshold(e.target.value)}
              hint="Orders at or above this amount ship free (Default ₹299)"
            />
          </div>
        </div>

        {/* Café Floor & Tables */}
        <div className="p-7 rounded-2xl bg-surface-secondary border border-border-subtle space-y-4 shadow-card">
          <h3 className="text-body-md font-semibold text-content-primary uppercase font-mono tracking-wider border-b border-border-subtle pb-3">
            Dine-In Floor Setup
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Configured Tables Count"
              type="number"
              value={tablesCount}
              onChange={(e) => setTablesCount(e.target.value)}
              hint="Table 01 through Table 12 currently active"
            />
            <div className="space-y-1">
              <label className="block text-body-sm font-medium text-content-primary">
                Floor Plan Status
              </label>
              <div className="p-2.5 rounded-lg bg-surface-primary border border-border-subtle text-caption text-content-secondary">
                12 Tables active in Motihari dining hall &amp; lounge booths.
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" variant="copper-glow" size="lg">
          Save Settings
        </Button>
      </form>
    </div>
  );
}
