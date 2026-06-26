'use client';
import { usePricing } from '@/lib/pricingContext';

export default function BillingToggle() {
  const { isAnnual, setIsAnnual } = usePricing();
  const toggle = () => setIsAnnual(!isAnnual);
  return (
    <div className="flex items-center gap-4 bg-[rgba(17,76,90,0.05)] border border-[rgba(17,76,90,0.1)] p-2 rounded-2xl dark:bg-[rgba(255,255,255,0.03)] dark:border-[rgba(255,255,255,0.08)]">
      <span style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, opacity: isAnnual ? 0.5 : 1 }}>MONTHLY</span>
      <button
        onClick={toggle}
        className="relative inline-flex h-8 w-14 rounded-full border border-transparent cursor-pointer"
        style={{ backgroundColor: isAnnual ? 'var(--primary)' : 'rgba(17,76,90,0.15)', transition: 'background-color 200ms ease' }}
        aria-label="Toggle billing"
      >
        <span
          className="inline-block h-6 w-6 transform rounded-full bg-white shadow-md"
          style={{ transform: isAnnual ? 'translateX(28px)' : 'translateX(2px)', marginTop: '3px', transition: 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />
      </button>
      <span style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, opacity: isAnnual ? 1 : 0.5 }}>ANNUAL</span>
      {isAnnual && (
        <span className="ml-2 px-3 py-1 rounded-full text-xs font-bold badge-shimmer" style={{ backgroundColor: 'var(--accent)', color: 'var(--dark)', border: '1px solid rgba(255,200,1,0.3)', fontFamily: 'var(--font-mono)' }}>
          SAVE 20%
        </span>
      )}
    </div>
  );
}
