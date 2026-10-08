import taxonomy from "./note-taxonomy.json";

// Canonical note list. Every note in fragrances.json maps to exactly one entry here
// (by name or alias); scripts/validate-fragrances.mjs enforces it.

export type NoteFamilyId =
  | "citrus"
  | "fruity"
  | "floral"
  | "green"
  | "aquatic"
  | "spicy"
  | "gourmand"
  | "woody"
  | "amber"
  | "leather"
  | "musky";

export interface NoteFamily {
  id: NoteFamilyId;
  label: string;
  /** Fragrance `family` values that count as this family for "Any …" notes. */
  fragranceFamilies: string[];
}

export interface CanonicalNote {
  name: string;
  family: NoteFamilyId;
  description: string;
  aliases?: string[];
  /** "Any citrus" etc.: matches every note in the family. */
  wildcard?: boolean;
}

export const NOTE_FAMILIES = taxonomy.families as NoteFamily[];
export const NOTES = taxonomy.notes as CanonicalNote[];

export const NOTE_BY_NAME = new Map(NOTES.map((n) => [n.name, n]));

const BY_ALIAS = new Map<string, CanonicalNote>();
for (const note of NOTES) {
  for (const key of [note.name, ...(note.aliases ?? [])]) BY_ALIAS.set(key.toLowerCase(), note);
}

/** Canonical note for a fragrance's note string ("Turkish Rose" → Rose). */
export function canonicalNote(raw: string): CanonicalNote | undefined {
  return BY_ALIAS.get(raw.toLowerCase());
}
