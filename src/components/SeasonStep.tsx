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
      <h1 className="font-serif text-3xl font-bold tracking-normal text-foreground sm:text-6xl">
        When do you want to smell this good?
      </h1>
      {/* The promise, before the first tap: what you get and why it can be trusted. */}
      <p className="mx-auto mt-3 max-w-[34rem] text-sm text-muted-foreground sm:mt-4 sm:text-base">
        A few taps to a shortlist you can sample, with Canadian prices. No paid rankings, no
        sign-up.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4">
        {seasons.map((season) => {
          const Icon = ICONS[season.key];
          return (
            <button
              key={season.key}
              type="button"
              aria-pressed={selected === season.key}
              onClick={() => onSelect(season.key)}
              className={`group flex flex-col items-start justify-start rounded-2xl border bg-card p-4 text-left sm:p-7 shadow-scent transition duration-300 hover:-translate-y-1 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected === season.key ? "border-primary ring-2 ring-primary" : ""}`}
              aria-label={`Choose ${season.label}`}
            >
              <Icon
                className="h-6 w-6 text-primary sm:h-8 sm:w-8"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="mt-3 block font-serif text-2xl font-bold text-foreground sm:mt-5 sm:text-3xl">
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
