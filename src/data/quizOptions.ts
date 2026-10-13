// Quiz answer options, shared by the quiz steps and the shareable-results URL parser.

export const SEASON_OPTIONS = [
  { key: "spring", label: "Spring", text: "Fresh blooms & new beginnings" },
  { key: "summer", label: "Summer", text: "Light, airy & sun-drenched" },
  { key: "fall", label: "Fall", text: "Warm, spiced & golden" },
  { key: "winter", label: "Winter", text: "Rich, deep & cozy" },
];

export const OCCASION_OPTIONS = [
  { key: "everyday", label: "Everyday" },
  { key: "office", label: "Office" },
  { key: "date", label: "Date night" },
  { key: "party", label: "Party" },
  { key: "formal", label: "Formal events" },
  { key: "vacation", label: "Vacation & brunch" },
  { key: "gym", label: "Gym" },
  { key: "cozy", label: "Cozy days in" },
];

// Occasions that were merged on 2026-10-12, so older shared links still open.
export const LEGACY_OCCASIONS: Record<string, string> = {
  casual: "everyday",
  signature: "everyday",
  wedding: "formal",
  "black-tie": "formal",
  luxury: "formal",
  brunch: "vacation",
  rainy: "cozy",
  fresh: "everyday",
  boozy: "party",
};

// "any" is the explicit "no preference" answer; "" means not answered yet.
export const GENDER_KEYS = ["male", "female", "unisex", "any"] as const;
export const LONGEVITY_KEYS = ["short", "medium", "long"] as const;

// How answers read back to the visitor, on the results and in the emailed shortlist.
export const GENDER_LABEL: Record<string, string> = {
  male: "Men",
  female: "Women",
  unisex: "Unisex",
  any: "No preference",
};
export const WEAR_LABEL: Record<string, string> = {
  short: "Short wear",
  medium: "Medium wear",
  long: "Long wear",
  "": "Any wear time",
};
