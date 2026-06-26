'use client';
import { useState } from 'react';
import { emitPricingChange } from '@/lib/pricingEmitter';
import { getCurrentPricing } from './BillingToggle';

export default function CurrencySelector() {
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'INR'>('USD');
  const select = (curr: 'USD' | 'EUR' | 'INR') => {
    setCurrency(curr);
    emitPricingChange({ isAnnual: getCurrentPricing().isAnnual, currency: curr });
  };
  return (
    <div className="flex gap-2">
      {(['USD', 'EUR', 'INR'] as const).map((curr) => (
        <button
          key={curr}
          onClick={() => select(curr)}
          className="px-4 py-2 rounded-lg border-2 font-medium"
          style={{ borderColor: currency === curr ? 'var(--primary)' : '#ccc', backgroundColor: currency === curr ? 'var(--primary)' : 'white', color: currency === curr ? 'white' : 'var(--text)', transition: 'all 150ms ease-out' }}
        >
          {curr}
        </button>
      ))}
    </div>
  );
}
