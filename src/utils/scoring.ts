import { FRAGRANCES, type Fragrance } from "../data/fragrances";

export type GenderPreference = "male" | "female" | "unisex" | "";
export type LongevityPreference = "short" | "medium" | "long" | "";

const femaleFragranceIds = new Set(["b4", "b8", "b9", "b10", "m1", "m2", "m3", "m5", "m6", "m8", "m10", "m11", "m12", "m15", "m16", "m17", "m18", "m19", "m20", "p3", "p4", "p5", "p7", "p11", "p12", "p16"]);
const maleFragranceIds = new Set(["b3", "b5", "b7", "b12", "m7", "m13", "m14", "m22", "p6", "p8", "p15"]);

function getMarketedFor(fragrance: Fragrance): "male" | "female" | "unisex" {
  if (femaleFragranceIds.has(fragrance.id)) return "female";
  if (maleFragranceIds.has(fragrance.id)) return "male";
  return "unisex";
}

function getGenderAffinity(fragrance: Fragrance, gender: GenderPreference): number {
  if (!gender) return 0;
  const marketedFor = getMarketedFor(fragrance);
  if (gender === "unisex") return marketedFor === "unisex" ? 1 : 0.45;
  if (marketedFor === gender) return 1;
  if (marketedFor === "unisex") return 0.75;
  return 0;
}

function getLongevityAffinity(fragrance: Fragrance, longevity: LongevityPreference): number {
  if (!longevity) return 0;
  if (fragrance.longevity === longevity) return 1;
  // Adjacent longevities partially match (short<->medium, medium<->long)
  const order = ["short", "medium", "long"] as const;
  const diff = Math.abs(order.indexOf(fragrance.longevity) - order.indexOf(longevity));
  return diff === 1 ? 0.4 : 0;
}

export function scoreFragrance(fragrance: Fragrance, season: string, occasion: string, selectedNotes: string[], gender: GenderPreference = "", longevity: LongevityPreference = ""): number {
  let score = 0;
  const allFragranceNotes = [...fragrance.topNotes, ...fragrance.heartNotes, ...fragrance.baseNotes].map((n) => n.toLowerCase());
  const matchedNotes = selectedNotes.filter((note) => allFragranceNotes.some((fn) => fn.includes(note.toLowerCase())));
  const noteScore = selectedNotes.length > 0 ? matchedNotes.length / selectedNotes.length : 0.5;
  const noteWeight = longevity && gender ? 30 : gender ? 40 : longevity ? 40 : 50;
  const occasionWeight = longevity && gender ? 20 : 25;
  const seasonWeight = longevity && gender ? 15 : 15;
  score += noteScore * noteWeight;
  score += fragrance.occasions.includes(occasion) ? occasionWeight : 0;
  score += fragrance.seasons.includes(season) ? seasonWeight : 0;
  score += gender ? getGenderAffinity(fragrance, gender) * 20 : 0;
  score += longevity ? getLongevityAffinity(fragrance, longevity) * 15 : 0;
  return Math.round(score);
}

export function getInitialRecommendations(season: string, occasion: string, gender: GenderPreference = "", longevity: LongevityPreference = ""): Fragrance[] {
  const tiers: Fragrance["priceRange"][] = ["budget", "mid", "premium"];
  return tiers.map((tier) => [...FRAGRANCES.filter((f) => f.priceRange === tier)].sort((a, b) => scoreFragrance(b, season, occasion, [], gender, longevity) - scoreFragrance(a, season, occasion, [], gender, longevity))[0]);
}

export function getRefinedResults(season: string, occasion: string, selectedNotes: string[], gender: GenderPreference = "", longevity: LongevityPreference = ""): Fragrance[] {
  const longevityRank = { long: 3, medium: 2, short: 1 } as const;
  return FRAGRANCES.map((f) => ({ fragrance: f, score: scoreFragrance(f, season, occasion, selectedNotes, gender, longevity) }))
    .filter((x) => x.score > 20)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const longevityDiff = longevityRank[b.fragrance.longevity] - longevityRank[a.fragrance.longevity];
      if (longevity === "short") return -longevityDiff;
      return longevityDiff;
    })
    .slice(0, 8)
    .map((x) => x.fragrance);
}

export function getMatchedNotes(fragrance: Fragrance, selectedNotes: string[]): string[] {
  const allNotes = [...fragrance.topNotes, ...fragrance.heartNotes, ...fragrance.baseNotes];
  return allNotes.filter((fragranceNote) => selectedNotes.some((selected) => fragranceNote.toLowerCase().includes(selected.toLowerCase())));
}
