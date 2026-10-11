import { FRAGRANCES, type Fragrance } from "../data/fragrances";
import { containsAnyNote, matchNote } from "./noteMatching";

export type GenderPreference = "male" | "female" | "unisex" | "";
export type LongevityPreference = "short" | "medium" | "long" | "";

function getGenderAffinity(fragrance: Fragrance, gender: GenderPreference): number {
  if (!gender) return 0;
  const { marketedFor } = fragrance;
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

// Occasions and seasons are listed most-fitting first, so an exact primary match scores a
// little higher than a secondary one (1, 0.9, 0.8 … floored at 0.7).
function getListAffinity(list: string[], value: string): number {
  const index = list.indexOf(value);
  return index < 0 ? 0 : Math.max(0.7, 1 - index * 0.1);
}

export function scoreFragrance(
  fragrance: Fragrance,
  season: string,
  occasion: string,
  lovedNotes: string[],
  gender: GenderPreference = "",
  longevity: LongevityPreference = "",
): number {
  let score = 0;
  const noteScore =
    lovedNotes.length > 0
      ? lovedNotes.reduce((sum, note) => sum + matchNote(fragrance, note).weight, 0) /
        lovedNotes.length
      : 0.5;
  const noteWeight = longevity && gender ? 30 : gender ? 40 : longevity ? 40 : 50;
  const occasionWeight = longevity && gender ? 20 : 25;
  const seasonWeight = 15;
  score += noteScore * noteWeight;
  score += getListAffinity(fragrance.occasions, occasion) * occasionWeight;
  score += getListAffinity(fragrance.seasons, season) * seasonWeight;
  score += gender ? getGenderAffinity(fragrance, gender) * 20 : 0;
  score += longevity ? getLongevityAffinity(fragrance, longevity) * 15 : 0;
  return Math.round(score);
}

export function getInitialRecommendations(
  season: string,
  occasion: string,
  gender: GenderPreference = "",
  longevity: LongevityPreference = "",
): Fragrance[] {
  const tiers: Fragrance["priceRange"][] = ["budget", "mid", "premium"];
  return tiers.map(
    (tier) =>
      [...FRAGRANCES.filter((f) => f.priceRange === tier)].sort(
        (a, b) =>
          scoreFragrance(b, season, occasion, [], gender, longevity) -
          scoreFragrance(a, season, occasion, [], gender, longevity),
      )[0],
  );
}

export function getRefinedResults(
  season: string,
  occasion: string,
  lovedNotes: string[],
  gender: GenderPreference = "",
  longevity: LongevityPreference = "",
  avoidedNotes: string[] = [],
  limit = 8,
): Fragrance[] {
  const longevityRank = { long: 3, medium: 2, short: 1 } as const;
  return FRAGRANCES.filter((f) => !containsAnyNote(f, avoidedNotes))
    .map((f) => ({
      fragrance: f,
      score: scoreFragrance(f, season, occasion, lovedNotes, gender, longevity),
    }))
    .filter((x) => x.score > 20)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const longevityDiff =
        longevityRank[b.fragrance.longevity] - longevityRank[a.fragrance.longevity];
      if (longevityDiff !== 0) return longevity === "short" ? -longevityDiff : longevityDiff;
      return a.fragrance.name.localeCompare(b.fragrance.name);
    })
    .slice(0, limit)
    .map((x) => x.fragrance);
}
