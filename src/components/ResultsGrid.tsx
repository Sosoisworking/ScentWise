import {
  getRefinedResults,
  scoreFragrance,
  type GenderPreference,
  type LongevityPreference,
} from "../utils/scoring";
import { EmailResults } from "./EmailResults";
import { FragranceCard } from "./FragranceCard";

type ResultsGridProps = {
  season: string;
  occasion: string;
  gender: GenderPreference;
  longevity: LongevityPreference;
  selectedNotes: string[];
  avoidedNotes: string[];
  onRestart: () => void;
};

export function ResultsGrid({
  season,
  occasion,
  gender,
  longevity,
  selectedNotes,
  avoidedNotes,
  onRestart,
}: ResultsGridProps) {
  const results = getRefinedResults(
    season,
    occasion,
    selectedNotes,
    gender,
    longevity,
    avoidedNotes,
  );
  const summary = results
    .slice(0, 3)
    .map(
      (f) =>
        `${f.brand} ${f.name} (${scoreFragrance(f, season, occasion, selectedNotes, gender, longevity)}%)`,
    )
    .join("; ");

  const share = async () => {
    await navigator.clipboard.writeText(
      `My Scentwise matches: ${summary || "I am still exploring my perfect scent."}`,
    );
  };

  return (
    <section className="mx-auto max-w-[900px] animate-scent-in">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-6xl">
          Your perfect scents
        </h1>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={share}
            className="rounded-full border bg-card px-5 py-3 text-sm font-bold text-card-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Share My Results
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Start Over
          </button>
        </div>
      </div>
      {results.length === 0 ? (
        <div className="mt-10 rounded-2xl border bg-card p-10 text-center shadow-scent">
          <p className="font-serif text-3xl text-foreground">
            No matches. Try avoiding fewer notes or loving a few more.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {results.map((fragrance) => (
              <FragranceCard
                key={fragrance.id}
                fragrance={fragrance}
                mode="result"
                season={season}
                occasion={occasion}
                selectedNotes={selectedNotes}
                gender={gender}
                longevity={longevity}
              />
            ))}
          </div>
          <EmailResults
            results={results}
            season={season}
            occasion={occasion}
            gender={gender}
            longevity={longevity}
            selectedNotes={selectedNotes}
            avoidedNotes={avoidedNotes}
          />
        </>
      )}
    </section>
  );
}
