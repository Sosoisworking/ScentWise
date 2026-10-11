import type { Fragrance } from "../data/fragrances";

export type PriceBandId = "under-100" | "100-200" | "200-plus";

export interface PriceBand {
  id: PriceBandId;
  label: string;
}

export const PRICE_BANDS: PriceBand[] = [
  { id: "under-100", label: "Under $100" },
  { id: "100-200", label: "$100–$200" },
  { id: "200-plus", label: "$200+" },
];

/** Low and high ends of a "CA$92–$170" style range, in dollars. */
export function priceSpan(fragrance: Fragrance): [number, number] {
  const numbers = (fragrance.priceDisplay.replace(/,/g, "").match(/\d+/g) ?? []).map(Number);
  return [numbers[0] ?? 0, numbers[numbers.length - 1] ?? 0];
}

/** Band from the middle of the bottle's usual Canadian price range. */
export function priceBand(fragrance: Fragrance): PriceBand {
  const [low, high] = priceSpan(fragrance);
  const middle = (low + high) / 2;
  if (middle < 100) return PRICE_BANDS[0];
  if (middle < 200) return PRICE_BANDS[1];
  return PRICE_BANDS[2];
}
