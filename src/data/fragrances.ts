import records from "./fragrances.json";
import sephoraCa from "./sephora-ca.json";

// The catalogue lives in fragrances.json and is checked by scripts/validate-fragrances.mjs
// (runs before every build). See docs/updating-fragrances.md for how entries are added.

export type MarketedFor = "male" | "female" | "unisex";

export interface FragranceRecord {
  id: string;
  name: string;
  brand: string;
  marketedFor: MarketedFor;
  concentration: string;
  priceRange: "budget" | "mid" | "premium";
  priceDisplay: string;
  family: string[];
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevity: "short" | "medium" | "long";
  seasons: string[];
  occasions: string[];
  description: string;
  /** Path under sephora.com/ca/en; null when Sephora Canada doesn't carry the brand. */
  sephoraPath: string | null;
  fragrancebuyQuery: string;
  /** ISO date the entry was added; absent on the original catalogue. */
  addedOn?: string;
}

export interface Fragrance extends FragranceRecord {
  sephoraLink: string | null;
  fragrancebuyLink: string;
}

const notCarried = new Set(sephoraCa.notCarried);

export const FRAGRANCES: Fragrance[] = (records as FragranceRecord[]).map((f) => ({
  ...f,
  sephoraLink:
    f.sephoraPath && !notCarried.has(f.brand)
      ? `https://www.sephora.com/ca/en${f.sephoraPath}`
      : null,
  fragrancebuyLink: `https://fragrancebuy.ca/search?q=${encodeURIComponent(f.fragrancebuyQuery)}`,
}));
