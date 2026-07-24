'use client';
import { usePricing } from '@/lib/pricingContext';

export default function CurrencySelector() {
  const { currency, setCurrency } = usePricing();
  return (
    <div className="glass flex gap-1.5 p-1 rounded-full border border-[rgba(0,212,255,0.15)]">
      {(['USD', 'EUR', 'INR'] as const).map((curr) => {
        const isSelected = currency === curr;
        return (
          <button
            key={curr}
            onClick={() => setCurrency(curr)}
            className="px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer focus-ring"
            style={{
              backgroundColor: isSelected ? 'rgba(0, 212, 255, 0.15)' : 'transparent',
              color: isSelected ? 'var(--primary)' : 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              border: isSelected ? '1px solid rgba(0, 212, 255, 0.4)' : '1px solid transparent',
              boxShadow: isSelected ? '0 0 12px rgba(0, 212, 255, 0.2)' : 'none',
            }}
          >
            {curr}
          </button>
        );
      })}
    </div>
  );
}
