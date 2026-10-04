import type { LongevityPreference } from "../utils/scoring";

type LongevityOption = { key: Exclude<LongevityPreference, "">; emoji: string; label: string; text: string };

const options: LongevityOption[] = [
  { key: "short", emoji: "⏱", label: "Short", text: "Soft & subtle (2–4h) — close to skin" },
  { key: "medium", emoji: "⏱⏱", label: "Medium", text: "Balanced presence (4–7h) — all-day wear" },
  { key: "long", emoji: "⏱⏱⏱", label: "Long", text: "Powerful & lasting (7h+) — strong projection" },
];

export function LongevityStep({ onSelect }: { onSelect: (longevity: Exclude<LongevityPreference, "">) => void }) {
  return (
    <section className="mx-auto max-w-[900px] text-center animate-scent-in">
      <h1 className="font-serif text-4xl font-bold tracking-normal text-foreground sm:text-6xl">How long should it last?</h1>
      <p className="mx-auto mt-4 max-w-[560px] text-base text-muted-foreground">Pick the longevity that fits your day.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {options.map((option) => (
          <button key={option.key} type="button" onClick={() => onSelect(option.key)} className="group rounded-2xl border bg-card p-7 text-left shadow-scent transition duration-300 hover:-translate-y-1 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Choose ${option.label} longevity`}>
            <span className="text-3xl text-primary" aria-hidden="true">{option.emoji}</span>
            <span className="mt-5 block font-serif text-3xl font-bold text-foreground">{option.label}</span>
            <span className="mt-2 block text-sm text-muted-foreground">{option.text}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
