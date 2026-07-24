'use client';
import { usePricing } from '@/lib/pricingContext';

export default function BillingToggle() {
  const { isAnnual, setIsAnnual } = usePricing();
  const toggle = () => setIsAnnual(!isAnnual);

  return (
    <div className="flex items-center gap-4">
      {/* Sliding Pill Container */}
      <div className="relative inline-flex items-center p-1.5 rounded-full bg-[rgba(17,76,90,0.06)] border border-[rgba(17,76,90,0.12)] dark:bg-[rgba(255,255,255,0.03)] dark:border-[rgba(255,255,255,0.08)]">
        {/* Sliding Indicator Pill */}
        <div
          className="absolute top-1.5 bottom-1.5 rounded-full transition-all duration-200 ease-out"
          style={{
            width: 'calc(50% - 6px)',
            left: isAnnual ? 'calc(50% + 3px)' : '3px',
            backgroundColor: 'rgba(255,200,1,0.15)',
            border: '1px solid rgba(255,200,1,0.4)',
          }}
        />

        <button
          type="button"
          onClick={() => setIsAnnual(false)}
          className="relative z-10 px-5 py-2 text-xs font-mono transition-colors duration-200 focus-ring rounded-full"
          style={{
            color: !isAnnual ? 'var(--dark)' : 'var(--muted)',
            fontWeight: !isAnnual ? 600 : 400,
          }}
        >
          MONTHLY
        </button>

        <button
          type="button"
          onClick={() => setIsAnnual(true)}
          className="relative z-10 px-5 py-2 text-xs font-mono transition-colors duration-200 focus-ring rounded-full"
          style={{
            color: isAnnual ? 'var(--dark)' : 'var(--muted)',
            fontWeight: isAnnual ? 600 : 400,
          }}
        >
          ANNUAL
        </button>
      </div>

      {/* Save 20% badge with bounce animation */}
      {isAnnual && (
        <span
          className="text-xs font-mono font-bold"
          style={{
            background: 'rgba(255,154,50,0.15)',
            border: '1px solid rgba(255,154,50,0.4)',
            color: 'var(--warm)',
            borderRadius: '999px',
            padding: '2px 10px',
            animation: 'badge-appear 250ms ease-out forwards',
          }}
        >
          Save 20%
        </span>
      )}
    </div>
  );
}
