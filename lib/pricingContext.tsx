'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface PricingCtx {
  isAnnual: boolean;
  currency: 'USD' | 'EUR' | 'INR';
  setIsAnnual: (v: boolean) => void;
  setCurrency: (v: 'USD' | 'EUR' | 'INR') => void;
}

const Ctx = createContext<PricingCtx>({} as PricingCtx);

export function PricingProvider({ children }: { children: ReactNode }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'INR'>('USD');
  return (
    <Ctx.Provider value={{ isAnnual, currency, setIsAnnual, setCurrency }}>
      {children}
    </Ctx.Provider>
  );
}

export const usePricing = () => useContext(Ctx);
