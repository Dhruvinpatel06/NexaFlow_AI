'use client';

import { PRICING_MATRIX } from '@/lib/pricingMatrix';
import PriceDisplay from './PriceDisplay';
import BillingToggle from './BillingToggle';
import CurrencySelector from './CurrencySelector';

export default function Pricing() {
  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="py-20 px-6"
      style={{
        backgroundColor: 'var(--bg)',
        backgroundImage: `radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,200,1,0.05) 0%, transparent 70%), radial-gradient(circle, rgba(17,76,90,0.07) 1px, transparent 1px)`,
        backgroundSize: 'auto, 24px 24px',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text)', fontFamily: 'JetBrains Mono' }}>
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>Choose the plan that fits your needs</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
          <BillingToggle />
          <CurrencySelector />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Starter */}
          <div className="p-8 hover:shadow-lg transition-all" style={{ background: 'white', border: '1px solid rgba(17,76,90,0.1)', borderRadius: '20px' }}>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)', fontFamily: 'JetBrains Mono' }}>Starter</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>{PRICING_MATRIX.plans.starter.description}</p>
            <div className="mb-6">
              <span className="text-3xl font-bold" style={{ color: 'var(--dark)', fontFamily: 'JetBrains Mono' }}>Free</span>
            </div>
            <button className="w-full py-3 rounded-lg font-semibold mb-8" style={{ border: '2px solid var(--primary)', color: 'var(--primary)', backgroundColor: 'white' }}>
              Get Started
            </button>
            <ul className="space-y-3">
              {['5 workflows', '100 executions/month', 'Basic support'].map((f, i) => (
                <li key={i} className="text-sm flex items-center gap-2" style={{ color: 'var(--text)' }}>
                  <span style={{ color: 'var(--primary)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="p-8 relative" style={{ background: 'linear-gradient(135deg, var(--dark) 0%, #1a5f73 100%)', border: '1px solid rgba(255,200,1,0.3)', borderRadius: '20px', boxShadow: '0 25px 60px rgba(17,76,90,0.4)', transform: 'scale(1.04)' }}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: 'var(--primary)', color: 'var(--surface)' }}>
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2 mt-4" style={{ color: 'white', fontFamily: 'JetBrains Mono' }}>Pro</h3>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>{PRICING_MATRIX.plans.pro.description}</p>
            <div className="mb-6">
              <span className="text-3xl font-bold" style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono' }}>
                <PriceDisplay planKey="pro" isAnnual={false} currency="USD" />
              </span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>/month</span>
            </div>
            <button className="btn-shimmer w-full py-3 rounded-lg font-semibold mb-8" style={{ color: 'var(--surface)' }}>
              Start Free Trial
            </button>
            <ul className="space-y-3">
              {['50 workflows', 'Unlimited executions', 'Priority support', 'Advanced analytics'].map((f, i) => (
                <li key={i} className="text-sm flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <span style={{ color: 'var(--primary)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Enterprise */}
          <div className="p-8 hover:shadow-lg transition-all" style={{ background: 'white', border: '1px solid rgba(17,76,90,0.1)', borderRadius: '20px' }}>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)', fontFamily: 'JetBrains Mono' }}>Enterprise</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>{PRICING_MATRIX.plans.enterprise.description}</p>
            <div className="mb-6">
              <span className="text-3xl font-bold" style={{ color: 'var(--dark)', fontFamily: 'JetBrains Mono' }}>
                <PriceDisplay planKey="enterprise" isAnnual={false} currency="USD" />
              </span>
              <span style={{ color: 'var(--muted)' }}>/month</span>
            </div>
            <button className="w-full py-3 rounded-lg font-semibold mb-8" style={{ border: '2px solid var(--primary)', color: 'var(--primary)', backgroundColor: 'white' }}>
              Contact Sales
            </button>
            <ul className="space-y-3">
              {['Unlimited workflows', 'Unlimited executions', 'Dedicated support', 'Custom integrations', 'SLA guarantee'].map((f, i) => (
                <li key={i} className="text-sm flex items-center gap-2" style={{ color: 'var(--text)' }}>
                  <span style={{ color: 'var(--primary)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
