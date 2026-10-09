import { OCCASION_OPTIONS as occasions } from "../data/quizOptions";
import { useState } from "react";
import type { GenderPreference } from "../utils/scoring";

const genderOptions: Array<{ key: GenderPreference; label: string; emoji: string }> = [
  { key: "male", label: "Male", emoji: "♂" },
  { key: "female", label: "Female", emoji: "♀" },
  { key: "unisex", label: "Unisex", emoji: "◇" },
];

export function OccasionStep({
  onSelect,
}: {
  onSelect: (occasion: string, gender: GenderPreference) => void;
}) {
  const [gender, setGender] = useState<GenderPreference>("");

  return (
    <section className="mx-auto max-w-[900px] text-center animate-scent-in">
      <h1 className="font-serif text-4xl font-bold text-foreground sm:text-6xl">
        What's the vibe?
      </h1>
      <div
        className="mx-auto mt-8 grid max-w-[620px] gap-3 sm:grid-cols-3"
        aria-label="Choose fragrance gender preference"
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
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {occasions.map((occasion) => (
          <button
            key={occasion.key}
            type="button"
            onClick={() => gender && onSelect(occasion.key, gender)}
            disabled={!gender}
            className="rounded-2xl border bg-card px-5 py-6 shadow-scent transition duration-300 hover:-translate-y-1 hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:border-border disabled:hover:bg-card"
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
