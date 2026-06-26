'use client';
import { usePricing } from '@/lib/pricingContext';

export default function CurrencySelector() {
  const { currency, setCurrency } = usePricing();
  return (
    <div className="flex gap-1.5 bg-[rgba(17,76,90,0.05)] border border-[rgba(17,76,90,0.1)] p-1.5 rounded-2xl dark:bg-[rgba(255,255,255,0.03)] dark:border-[rgba(255,255,255,0.08)]">
      {(['USD', 'EUR', 'INR'] as const).map((curr) => {
        const isSelected = currency === curr;
        return (
          <button
            key={curr}
            onClick={() => setCurrency(curr)}
            className="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
            style={{
              backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
              color: isSelected ? 'var(--surface)' : 'var(--text)',
              fontFamily: 'var(--font-mono)',
              border: isSelected ? '1px solid rgba(255,200,1,0.4)' : '1px solid transparent',
              boxShadow: isSelected ? '0 4px 12px rgba(255,200,1,0.25)' : 'none',
            }}
          >
            {curr}
          </button>
        );
      })}
    </div>
  );
}
