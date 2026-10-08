import type { Fragrance } from "../data/fragrances";
import { NOTE_BY_NAME, NOTE_FAMILIES, canonicalNote } from "../data/notes";

// A base note is what you smell for hours; a top note is gone in minutes. Matches deeper
// in the pyramid count for slightly more, which also stops results tying at 100%.
const TIER_WEIGHT = { topNotes: 0.85, heartNotes: 0.95, baseNotes: 1 } as const;
// Within a tier, pyramids list the defining notes first, so later positions count a little
// less (−4% each, floored at 85%).
const positionWeight = (index: number) => Math.max(0.85, 1 - index * 0.04);
// "Any citrus" satisfied only by the fragrance's overall family, not a listed note.
const FAMILY_ONLY_WEIGHT = 0.85;

const TIERS = Object.keys(TIER_WEIGHT) as Array<keyof typeof TIER_WEIGHT>;

export interface NoteMatch {
  /** Strength 0–1; 0 means no match. */
  weight: number;
  /** The fragrance's own note strings that matched, for highlighting. */
  via: string[];
}

/** How well one picked note (a canonical name, possibly "Any …") matches a fragrance. */
export function matchNote(fragrance: Fragrance, picked: string): NoteMatch {
  const target = NOTE_BY_NAME.get(picked);
  if (!target) return { weight: 0, via: [] };

  let weight = 0;
  const via: string[] = [];
  for (const tier of TIERS) {
    fragrance[tier].forEach((raw, index) => {
      const canon = canonicalNote(raw);
      if (!canon) return;
      const hit = target.wildcard ? canon.family === target.family : canon.name === target.name;
      if (hit) {
        via.push(raw);
        weight = Math.max(weight, TIER_WEIGHT[tier] * positionWeight(index));
      }
    });
  }

  if (target.wildcard && weight === 0) {
    const family = NOTE_FAMILIES.find((f) => f.id === target.family);
    if (family?.fragranceFamilies.some((ff) => fragrance.family.includes(ff))) {
      weight = FAMILY_ONLY_WEIGHT;
    }
  }
  return { weight, via };
}

export function containsNote(fragrance: Fragrance, picked: string): boolean {
  return matchNote(fragrance, picked).weight > 0;
}

export function containsAnyNote(fragrance: Fragrance, picked: string[]): boolean {
  return picked.some((note) => containsNote(fragrance, note));
}

export interface MatchExplanation {
  /** Picked notes this fragrance has. */
  matched: string[];
  /** Fragrance note strings to highlight on the card. */
  highlight: string[];
  total: number;
}

export function explainMatch(fragrance: Fragrance, loved: string[]): MatchExplanation {
  const matched: string[] = [];
  const highlight = new Set<string>();
  for (const note of loved) {
    const m = matchNote(fragrance, note);
    if (m.weight > 0) {
      matched.push(note);
      m.via.forEach((v) => highlight.add(v));
    }
  }
  return { matched, highlight: [...highlight], total: loved.length };
}
