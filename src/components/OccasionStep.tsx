import { OCCASION_OPTIONS as occasions } from "../data/quizOptions";
import { useId, useState } from "react";
import type { GenderPreference } from "../utils/scoring";

const genderOptions: Array<{ key: GenderPreference; label: string; emoji: string }> = [
  { key: "male", label: "Men", emoji: "♂" },
  { key: "female", label: "Women", emoji: "♀" },
  { key: "unisex", label: "Unisex", emoji: "◇" },
];

export function OccasionStep({
  initialGender = "",
  selectedOccasion = "",
  onSelect,
}: {
  initialGender?: GenderPreference;
  selectedOccasion?: string;
  onSelect: (occasion: string, gender: GenderPreference) => void;
}) {
  const [gender, setGender] = useState<GenderPreference>(initialGender);
  const hintId = useId();

  return (
    <section className="mx-auto max-w-[900px] text-center animate-scent-in">
      <h1 className="font-serif text-4xl font-bold text-foreground sm:text-6xl">
        Who's it for, and where will you wear it?
      </h1>
      <p className="mt-8 text-sm font-semibold text-foreground">Marketed for</p>
      <div
        className="mx-auto mt-3 grid max-w-[620px] gap-3 sm:grid-cols-3"
        role="group"
        aria-label="Marketed for"
      >
        {genderOptions.map((option) => {
          const active = gender === option.key;
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => setGender(option.key)}
              className={`rounded-2xl border px-5 py-4 shadow-scent transition duration-300 hover:-translate-y-1 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "border-primary bg-primary text-primary-foreground" : "bg-card text-card-foreground hover:bg-accent"}`}
              aria-pressed={active}
              aria-label={`Choose ${option.label}`}
            >
              <span className="block font-serif text-3xl" aria-hidden="true">
                {option.emoji}
              </span>
              <span className="mt-2 block font-semibold">{option.label}</span>
            </button>
          );
        })}
      </div>
      <p id={hintId} className="mt-8 text-sm font-semibold text-foreground">
        {gender ? "Occasion" : "Choose who it's marketed for first, then pick an occasion."}
      </p>
      <div
        className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        role="group"
        aria-describedby={hintId}
      >
        {occasions.map((occasion) => (
          <button
            aria-pressed={selectedOccasion === occasion.key}
            key={occasion.key}
            type="button"
            onClick={() => gender && onSelect(occasion.key, gender)}
            disabled={!gender}
            className={`rounded-2xl border bg-card px-5 py-6 shadow-scent transition duration-300 hover:-translate-y-1 hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:border-border disabled:hover:bg-card ${selectedOccasion === occasion.key ? "border-primary ring-2 ring-primary" : ""}`}
            aria-label={`Choose ${occasion.label}`}
          >
            <span className="block text-3xl" aria-hidden="true">
              {occasion.emoji}
            </span>
            <span className="mt-3 block font-semibold text-foreground">{occasion.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
