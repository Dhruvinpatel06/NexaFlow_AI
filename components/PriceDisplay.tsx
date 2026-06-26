'use client';

import { useEffect, useRef } from 'react';
import { computePrice, PRICING_MATRIX } from '@/lib/pricingMatrix';
import { onPricingChange } from '@/lib/pricingEmitter';

interface PriceDisplayProps {
  planKey: 'starter' | 'pro' | 'enterprise';
  isAnnual: boolean;
  currency: 'USD' | 'EUR' | 'INR';
}

export default function PriceDisplay({ planKey, isAnnual, currency }: PriceDisplayProps) {
  const textNodeRef = useRef<Text | null>(null);

  useEffect(() => {
    const element = textNodeRef.current?.parentElement;
    if (element && textNodeRef.current) {
      const basePrice = PRICING_MATRIX.plans[planKey].base;
      const currencyData = PRICING_MATRIX.currencies[currency];
      const price = computePrice(basePrice, isAnnual, currencyData.rate);
      textNodeRef.current.data = `${currencyData.symbol}${price}`;
    }
  }, [planKey, isAnnual, currency]);

  useEffect(() => {
    const unsubscribe = onPricingChange(({ isAnnual: newIsAnnual, currency: newCurrency }) => {
      if (textNodeRef.current && textNodeRef.current.parentElement) {
        const basePrice = PRICING_MATRIX.plans[planKey].base;
        const currencyData = PRICING_MATRIX.currencies[newCurrency];
        const price = computePrice(basePrice, newIsAnnual, currencyData.rate);
        textNodeRef.current.data = `${currencyData.symbol}${price}`;
      }
    });

    return unsubscribe;
  }, [planKey]);

  const basePrice = PRICING_MATRIX.plans[planKey].base;
  const currencyData = PRICING_MATRIX.currencies[currency];
  const initialPrice = computePrice(basePrice, isAnnual, currencyData.rate);

  return (
    <span ref={(el) => { if (el?.firstChild && el.firstChild.nodeType === 3) textNodeRef.current = el.firstChild as Text; }}>
      {`${currencyData.symbol}${initialPrice}`}
    </span>
  );
}
