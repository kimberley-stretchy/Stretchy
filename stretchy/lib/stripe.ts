import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
});

// Pricing formula: (host_target + STRETCHY_FEE) / attendee_count
export const STRETCHY_FEE_NZD = 20;

export function calcPricePerPerson(hostTarget: number, attendees: number): number {
  return Math.round((hostTarget + STRETCHY_FEE_NZD) / Math.max(attendees, 1));
}

export function calcStartPrice(hostTarget: number, minSpots: number): number {
  return calcPricePerPerson(hostTarget, minSpots);
}

export function calcFloorPrice(hostTarget: number, maxCapacity: number): number {
  return calcPricePerPerson(hostTarget, maxCapacity);
}
