import { FRAGRANCES, type Fragrance } from "../data/fragrances";
import { containsAnyNote, matchNote } from "./noteMatching";
import { PRICE_BANDS, priceBand, type PriceBandId } from "./price";

/** "any" is an explicit "no preference"; "" means not answered. Neither affects the score. */
export type GenderPreference = "male" | "female" | "unisex" | "any" | "";
export type LongevityPreference = "short" | "medium" | "long" | "";

function getGenderAffinity(fragrance: Fragrance, gender: GenderPreference): number {
  if (!gender || gender === "any") return 0;
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
  genderPreference: GenderPreference = "",
  longevity: LongevityPreference = "",
): number {
  let score = 0;
  const gender = genderPreference === "any" ? "" : genderPreference;
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

/** Does the fragrance match the visitor's explicit gender and wear-time answers? */
export function fitsAnswers(
  fragrance: Fragrance,
  gender: GenderPreference,
  longevity: LongevityPreference,
): boolean {
  const genderFits =
    !gender ||
    gender === "any" ||
    fragrance.marketedFor === gender ||
    (gender !== "unisex" && fragrance.marketedFor === "unisex");
  const longevityFits = !longevity || fragrance.longevity === longevity;
  return genderFits && longevityFits;
}

/** Best fit in each price band (under $100, $100–$200, $200+), cheapest band first. */
export function getInitialRecommendations(
  season: string,
  occasion: string,
  gender: GenderPreference = "",
  longevity: LongevityPreference = "",
): Fragrance[] {
  return PRICE_BANDS.map(
    (band) =>
      FRAGRANCES.filter((f) => priceBand(f).id === band.id).sort(
        (a, b) =>
          scoreFragrance(b, season, occasion, [], gender, longevity) -
          scoreFragrance(a, season, occasion, [], gender, longevity),
      )[0],
  ).filter(Boolean);
}

export type RankedResult = {
  fragrance: Fragrance;
  /** Set when it scored exactly the same as a neighbour, so a rank number would claim a
   *  difference that isn't there. Fragrances with the same value tie with each other. */
  tieGroup: string | null;
};

/**
 * The shortlist, best first. Anything missing an explicit answer (who it's for, wear time)
 * sits below everything that fits; within each group, containing more of your notes wins and
 * the score orders the rest. Fragrances that tie on all of that share a `tieGroup`; among them
 * the `preferred` ids (the first picks from step 5) come first, then names A–Z.
 */
export function getRankedResults(
  season: string,
  occasion: string,
  lovedNotes: string[],
  gender: GenderPreference = "",
  longevity: LongevityPreference = "",
  avoidedNotes: string[] = [],
  limit = 8,
  budget: PriceBandId | "" = "",
  preferred: string[] = [],
): RankedResult[] {
  const longevityRank = { long: 3, medium: 2, short: 1 } as const;
  // Short wear asked for: shorter-lasting bottles first; otherwise longer-lasting first.
  const wearRank = (f: Fragrance) =>
    longevity === "short" ? -longevityRank[f.longevity] : longevityRank[f.longevity];
  const sorted = FRAGRANCES.filter(
    (f) => !containsAnyNote(f, avoidedNotes) && (!budget || priceBand(f).id === budget),
  )
    .map((f) => ({
      fragrance: f,
      score: scoreFragrance(f, season, occasion, lovedNotes, gender, longevity),
      matched: lovedNotes.filter((note) => matchNote(f, note).weight > 0).length,
      fits: fitsAnswers(f, gender, longevity),
    }))
    .filter((x) => x.score > 20)
    .map((x) => ({ ...x, key: `${x.fits}|${x.matched}|${x.score}|${wearRank(x.fragrance)}` }))
    .sort((a, b) => {
      if (a.fits !== b.fits) return a.fits ? -1 : 1;
      if (b.matched !== a.matched) return b.matched - a.matched;
      if (b.score !== a.score) return b.score - a.score;
      const wearDiff = wearRank(b.fragrance) - wearRank(a.fragrance);
      if (wearDiff !== 0) return wearDiff;
      const preferDiff =
        Number(preferred.includes(b.fragrance.id)) - Number(preferred.includes(a.fragrance.id));
      if (preferDiff !== 0) return preferDiff;
      return a.fragrance.name.localeCompare(b.fragrance.name);
    });
  // Ties are judged on the whole sorted list, so a tie that straddles the cut still counts.
  const keyCounts = new Map<string, number>();
  for (const x of sorted) keyCounts.set(x.key, (keyCounts.get(x.key) ?? 0) + 1);
  return sorted.slice(0, limit).map((x) => ({
    fragrance: x.fragrance,
    tieGroup: (keyCounts.get(x.key) ?? 0) > 1 ? x.key : null,
  }));
}

export function getRefinedResults(...args: Parameters<typeof getRankedResults>): Fragrance[] {
  return getRankedResults(...args).map((x) => x.fragrance);
}
