import { SEASON_OPTIONS as seasons } from "../data/quizOptions";

export function SeasonStep({ onSelect }: { onSelect: (season: string) => void }) {
  return (
    <section className="mx-auto max-w-[900px] text-center animate-scent-in">
      <h1 className="font-serif text-4xl font-bold tracking-normal text-foreground sm:text-6xl">
        When do you want to smell this good?
      </h1>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {seasons.map((season) => (
          <button
            key={season.key}
            type="button"
            onClick={() => onSelect(season.key)}
            className="group rounded-2xl border bg-card p-7 text-left shadow-scent transition duration-300 hover:-translate-y-1 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Choose ${season.label}`}
          >
            <span className="text-4xl" aria-hidden="true">
              {season.emoji}
            </span>
            <span className="mt-5 block font-serif text-3xl font-bold text-foreground">
              {season.label}
            </span>
            <span className="mt-2 block text-sm text-muted-foreground">{season.text}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
