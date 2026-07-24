'use client';

import { computePrice, PRICING_MATRIX } from '@/lib/pricingMatrix';
import { usePricing } from '@/lib/pricingContext';

interface PriceDisplayProps {
  planKey: 'starter' | 'pro' | 'enterprise';
}

export default function PriceDisplay({ planKey }: PriceDisplayProps) {
  const { isAnnual, currency } = usePricing();
  const basePrice = PRICING_MATRIX.plans[planKey].base;
  const currKey = (currency && PRICING_MATRIX.currencies[currency]) ? currency : 'USD';
  const currencyData = PRICING_MATRIX.currencies[currKey];
  const price = computePrice(basePrice, isAnnual, currencyData.rate);

  return (
    <span>{`${currencyData.symbol}${price}`}</span>
  );
}
