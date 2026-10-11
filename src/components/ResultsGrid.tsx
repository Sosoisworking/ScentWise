import { useState } from "react";
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

// Fallback for browsers or embedded views that block the async clipboard API.
function legacyCopy(value: string): boolean {
  const area = document.createElement("textarea");
  area.value = value;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  area.remove();
  return ok;
}

export function ResultsGrid({
  season,
  occasion,
  gender,
  longevity,
  selectedNotes,
  avoidedNotes,
  onRestart,
}: ResultsGridProps) {
  const PAGE = 8;
  const [visibleCount, setVisibleCount] = useState(PAGE);
  const [shareStatus, setShareStatus] = useState("");
  const allResults = getRefinedResults(
    season,
    occasion,
    selectedNotes,
    gender,
    longevity,
    avoidedNotes,
    24,
  );
  const results = allResults.slice(0, visibleCount);
  const summary = results
    .slice(0, 3)
    .map(
      (f) =>
        `${f.brand} ${f.name} (${scoreFragrance(f, season, occasion, selectedNotes, gender, longevity)}%)`,
    )
    .join("; ");

  // The page URL already carries the quiz answers, so the link reopens these results.
  const share = async () => {
    const url = window.location.href;
    const text = `My Scentwise matches: ${summary || "I am still exploring my perfect scent."}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "My Scentwise matches", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setShareStatus("Link copied");
    } catch (e) {
      if ((e as Error)?.name === "AbortError") return;
      setShareStatus(
        legacyCopy(`${text}\n${url}`)
          ? "Link copied"
          : "Couldn't copy. Copy the address bar instead.",
      );
    }
    window.setTimeout(() => setShareStatus(""), 2500);
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
        <p aria-live="polite" className="mt-2 h-5 text-sm text-muted-foreground">
          {shareStatus}
        </p>
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
          {allResults.length > visibleCount && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + PAGE)}
                className="rounded-full border bg-card px-6 py-3 text-sm font-bold text-card-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Show more matches
              </button>
            </div>
          )}
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
