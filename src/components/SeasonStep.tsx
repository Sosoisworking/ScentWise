import { Flower2, Leaf, Snowflake, Sun, type LucideIcon } from "lucide-react";
import { SEASON_OPTIONS as seasons } from "../data/quizOptions";

const ICONS: Record<string, LucideIcon> = {
  spring: Flower2,
  summer: Sun,
  fall: Leaf,
  winter: Snowflake,
};

export function SeasonStep({
  selected = "",
  onSelect,
}: {
  selected?: string;
  onSelect: (season: string) => void;
}) {
  return (
    <section className="mx-auto max-w-[900px] text-center animate-scent-in">
      <h1 className="font-serif text-4xl font-bold tracking-normal text-foreground sm:text-6xl">
        When do you want to smell this good?
      </h1>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {seasons.map((season) => {
          const Icon = ICONS[season.key];
          return (
            <button
              key={season.key}
              type="button"
              aria-pressed={selected === season.key}
              onClick={() => onSelect(season.key)}
              className={`group rounded-2xl border bg-card p-7 text-left shadow-scent transition duration-300 hover:-translate-y-1 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected === season.key ? "border-primary ring-2 ring-primary" : ""}`}
              aria-label={`Choose ${season.label}`}
            >
              <Icon className="h-8 w-8 text-primary" strokeWidth={1.75} aria-hidden="true" />
              <span className="mt-5 block font-serif text-3xl font-bold text-foreground">
                {season.label}
              </span>
              <span className="mt-2 block text-sm text-muted-foreground">{season.text}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
