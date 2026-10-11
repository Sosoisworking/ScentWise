// Quiz answer options, shared by the quiz steps and the shareable-results URL parser.

export const SEASON_OPTIONS = [
  { key: "spring", emoji: "🌸", label: "Spring", text: "Fresh blooms & new beginnings" },
  { key: "summer", emoji: "☀️", label: "Summer", text: "Light, airy & sun-drenched" },
  { key: "fall", emoji: "🍂", label: "Fall", text: "Warm, spiced & golden" },
  { key: "winter", emoji: "❄️", label: "Winter", text: "Rich, deep & cosy" },
];

export const OCCASION_OPTIONS = [
  { key: "date", emoji: "💋", label: "Date Night" },
  { key: "office", emoji: "💼", label: "Office" },
  { key: "party", emoji: "🎉", label: "Party" },
  { key: "everyday", emoji: "🌿", label: "Everyday" },
  { key: "fresh", emoji: "🌊", label: "Fresh" },
  { key: "boozy", emoji: "🥂", label: "Boozy" },
  { key: "luxury", emoji: "👑", label: "Luxury" },
  { key: "casual", emoji: "😌", label: "Casual" },
  { key: "gym", emoji: "🏃", label: "Gym" },
  { key: "vacation", emoji: "🏖️", label: "Vacation" },
  { key: "wedding", emoji: "💐", label: "Wedding" },
  { key: "cozy", emoji: "🕯️", label: "Cozy" },
  { key: "black-tie", emoji: "🖤", label: "Black Tie" },
  { key: "brunch", emoji: "🍊", label: "Brunch" },
  { key: "rainy", emoji: "🌧️", label: "Rainy Day" },
  { key: "signature", emoji: "✨", label: "Signature" },
];

export const GENDER_KEYS = ["male", "female", "unisex"] as const;
export const LONGEVITY_KEYS = ["short", "medium", "long"] as const;
