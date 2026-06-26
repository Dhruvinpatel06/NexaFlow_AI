'use client';
import { useState } from 'react';
import { emitPricingChange } from '@/lib/pricingEmitter';

let _state = { isAnnual: false, currency: 'USD' as 'USD' | 'INR' | 'EUR' };
export function getCurrentPricing() { return _state; }

export default function BillingToggle() {
  const [isAnnual, setIsAnnual] = useState(false);
  const toggle = () => {
    const next = !isAnnual;
    setIsAnnual(next);
    _state = { ..._state, isAnnual: next };
    emitPricingChange({ isAnnual: next, currency: _state.currency });
  };
  return (
    <div className="flex items-center gap-4">
      <span style={{ color: 'var(--text)', fontWeight: 500 }}>Monthly</span>
      <button
        onClick={toggle}
        className="relative inline-flex h-8 w-14 rounded-full border-2"
        style={{ borderColor: isAnnual ? 'var(--primary)' : '#ccc', backgroundColor: isAnnual ? 'var(--primary)' : 'white', transition: 'all 150ms ease-out' }}
        aria-label="Toggle billing"
      >
        <span
          className="inline-block h-6 w-6 transform rounded-full bg-white"
          style={{ transform: isAnnual ? 'translateX(22px)' : 'translateX(2px)', marginTop: '1px', transition: 'transform 150ms ease-out' }}
        />
      </button>
      <span style={{ color: 'var(--text)', fontWeight: 500 }}>Annual</span>
      {isAnnual && (
        <span className="ml-2 px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: 'var(--accent)', color: 'var(--dark)' }}>
          Save 20%
        </span>
      )}
    </div>
  );
}
