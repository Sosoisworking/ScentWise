import { NOTE_DESCRIPTIONS, NOTE_GROUPS } from "../data/notes";
import type { LongevityPreference } from "../utils/scoring";

type NoteSelectorProps = {
  selectedNotes: string[];
  onToggle: (note: string) => void;
  longevity: LongevityPreference;
  onLongevityChange: (longevity: LongevityPreference) => void;
  onSubmit: () => void;
};

const labels = { top: "Top Notes", heart: "Heart Notes", base: "Base Notes" } as const;

const longevityOptions: Array<{
  key: Exclude<LongevityPreference, "">;
  label: string;
  icon: string;
}> = [
  { key: "short", label: "Short", icon: "⏱" },
  { key: "medium", label: "Medium", icon: "⏱⏱" },
  { key: "long", label: "Long", icon: "⏱⏱⏱" },
];

export function NoteSelector({
  selectedNotes,
  onToggle,
  longevity,
  onLongevityChange,
  onSubmit,
}: NoteSelectorProps) {
  return (
    <section className="mx-auto max-w-[900px] animate-scent-in pb-28 sm:pb-0">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-6xl">
          Pick what you love
        </h1>
      </div>
      <div className="mt-10 space-y-8">
        <fieldset className="rounded-2xl border bg-card p-5 shadow-scent">
          <legend className="px-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Longevity
          </legend>
          <div
            className="mt-4 grid gap-2 sm:grid-cols-3"
            role="radiogroup"
            aria-label="Longevity preference"
          >
            {longevityOptions.map((option) => {
              const active = longevity === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onLongevityChange(active ? "" : option.key)}
                  className={`rounded-full border px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-card-foreground hover:border-primary hover:bg-accent"}`}
                >
                  <span aria-hidden="true" className="mr-2">
                    {option.icon}
                  </span>
                  {option.label}
                </button>
              );
            })}
          </div>
        </fieldset>
        {(Object.keys(NOTE_GROUPS) as Array<keyof typeof NOTE_GROUPS>).map((group) => (
          <fieldset key={group} className="rounded-2xl border bg-card p-5 shadow-scent">
            <legend className="px-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {labels[group]}
            </legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {NOTE_GROUPS[group].map((note) => {
                const active = selectedNotes.includes(note);
                return (
                  <button
                    key={note}
                    type="button"
                    title={NOTE_DESCRIPTIONS[note]}
                    aria-pressed={active}
                    aria-label={`${note}. ${NOTE_DESCRIPTIONS[note]}`}
                    onClick={() => onToggle(note)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-card-foreground hover:border-primary hover:bg-accent"}`}
                  >
                    {note}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/90 p-4 backdrop-blur sm:static sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0">
        <button
          type="button"
          onClick={onSubmit}
          className="mx-auto flex w-full max-w-[900px] justify-center rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-scent transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
        >
          Find My Fragrance →
        </button>
      </div>
    </section>
  );
}
