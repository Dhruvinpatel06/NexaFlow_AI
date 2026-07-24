'use client';
import { usePricing } from '@/lib/pricingContext';

export default function BillingToggle() {
  const { isAnnual, setIsAnnual } = usePricing();

  return (
    <div className="flex items-center gap-4">
      {/* Glass Container */}
      <div className="glass relative inline-flex items-center p-1 rounded-full border border-[rgba(0,212,255,0.15)]">
        {/* Sliding Indicator Pill */}
        <div
          className="absolute top-1 bottom-1 rounded-full transition-all duration-200 ease-out"
          style={{
            width: 'calc(50% - 4px)',
            left: isAnnual ? 'calc(50% + 2px)' : '2px',
            backgroundColor: 'rgba(0, 212, 255, 0.15)',
            border: '1px solid rgba(0, 212, 255, 0.4)',
          }}
        />

        <button
          type="button"
          onClick={() => setIsAnnual(false)}
          className="relative z-10 px-5 py-2 text-xs font-mono transition-colors duration-200 focus-ring rounded-full cursor-pointer"
          style={{
            color: !isAnnual ? 'var(--primary)' : 'var(--muted)',
            fontWeight: !isAnnual ? 600 : 400,
          }}
        >
          MONTHLY
        </button>

        <button
          type="button"
          onClick={() => setIsAnnual(true)}
          className="relative z-10 px-5 py-2 text-xs font-mono transition-colors duration-200 focus-ring rounded-full cursor-pointer"
          style={{
            color: isAnnual ? 'var(--primary)' : 'var(--muted)',
            fontWeight: isAnnual ? 600 : 400,
          }}
        >
          ANNUAL
        </button>
      </div>

      {/* Save 20% badge */}
      {isAnnual && (
        <span
          className="text-xs font-mono font-bold"
          style={{
            background: 'rgba(255, 200, 1, 0.1)',
            border: '1px solid rgba(255, 200, 1, 0.3)',
            color: 'var(--secondary)',
            borderRadius: '999px',
            padding: '4px 12px',
            animation: 'badge-appear 250ms ease-out forwards',
          }}
        >
          Save 20%
        </span>
      )}
    </div>
  );
}
