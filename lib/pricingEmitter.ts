export const pricingEmitter = new EventTarget();

export interface PricingChangeEvent extends Event {
  detail?: {
    isAnnual?: boolean;
    currency?: string;
  };
}

export function emitPricingChange(detail: { isAnnual?: boolean; currency?: string }) {
  const event = new CustomEvent('pricing-change', { detail });
  pricingEmitter.dispatchEvent(event);
}

export function onPricingChange(callback: (detail: any) => void) {
  const handler = (event: Event) => {
    if (event instanceof CustomEvent) {
      callback(event.detail);
    }
  };
  pricingEmitter.addEventListener('pricing-change', handler);
  return () => pricingEmitter.removeEventListener('pricing-change', handler);
}
