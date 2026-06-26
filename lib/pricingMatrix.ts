export const PRICING_MATRIX = {
  currencies: {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    INR: { symbol: '₹', rate: 83.12 },
  },
  plans: {
    starter: { base: 0, description: 'Free tier for getting started' },
    pro: { base: 99, description: 'For growing teams' },
    enterprise: { base: 499, description: 'For large organizations' },
  },
  annualMultiplier: 0.8, // 20% discount for annual billing
} as const;

export function computePrice(
  basePriceUSD: number,
  isAnnual: boolean,
  currencyRate: number
): number {
  const multiplier = isAnnual ? PRICING_MATRIX.annualMultiplier : 1;
  const priceUSD = basePriceUSD * multiplier;
  const priceInCurrency = priceUSD * currencyRate;
  return Math.round(priceInCurrency);
}
