import type { LongevityPreference } from "../utils/scoring";
import { LongevityMeter } from "./LongevityBar";

type LongevityOption = {
  key: Exclude<LongevityPreference, "">;
  label: string;
  text: string;
};

const options: LongevityOption[] = [
  { key: "short", label: "Short", text: "Soft & subtle (2–4h) — close to skin" },
  { key: "medium", label: "Medium", text: "Balanced presence (4–7h) — all-day wear" },
  {
    key: "long",
    label: "Long",
    text: "Powerful & lasting (7h+) — strong projection",
  },
];

export function LongevityStep({
  selected = "",
  onSelect,
}: {
  selected?: LongevityPreference;
  onSelect: (longevity: Exclude<LongevityPreference, "">) => void;
}) {
  return (
    <section className="mx-auto max-w-[900px] text-center animate-scent-in">
      <h1 className="font-serif text-3xl font-bold tracking-normal text-foreground sm:text-6xl">
        How long should it last?
      </h1>
      <p className="mx-auto mt-4 max-w-[560px] text-base text-muted-foreground">
        Pick the longevity that fits your day.
      </p>
      <div className="mt-6 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
        {options.map((option) => (
          <button
            aria-pressed={selected === option.key}
            key={option.key}
            type="button"
            onClick={() => onSelect(option.key)}
            className={`group rounded-2xl border bg-card p-4 text-left sm:p-7 shadow-scent transition duration-300 hover:-translate-y-1 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected === option.key ? "border-primary ring-2 ring-primary" : ""}`}
            aria-label={`Choose ${option.label} longevity`}
          >
            <LongevityMeter longevity={option.key} className="max-w-24" />
            <span className="mt-3 block font-serif text-2xl font-bold text-foreground sm:mt-5 sm:text-3xl">
              {option.label}
            </span>
            <span className="mt-2 block text-sm text-muted-foreground">{option.text}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
