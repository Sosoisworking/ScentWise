import { useMemo, useState } from "react";
import type { Answers } from "../App";
import { Link } from "@tanstack/react-router";
import type { Fragrance } from "../data/fragrances";
import { GENDER_LABEL, OCCASION_OPTIONS, SEASON_OPTIONS, WEAR_LABEL } from "../data/quizOptions";
import { copyText } from "../utils/clipboard";
import { PRICE_BANDS, priceBand, type PriceBandId } from "../utils/price";
import {
  fitsAnswers,
  getInitialRecommendations,
  getRankedResults,
  type RankedResult,
} from "../utils/scoring";
import { EmailResults } from "./EmailResults";
import { FragranceCard } from "./FragranceCard";

type ResultsGridProps = {
  answers: Answers;
  viewingShared: boolean;
  onEdit: (step: number) => void;
  onBudgetChange: (budget: PriceBandId | "") => void;
  onRestart: () => void;
  onStartFresh: () => void;
};

/** The page ends on what to do next: sample before buying, and where to buy safely. */
function SampleFirst({ picks }: { picks: Fragrance[] }) {
  const steps = [
    "Try them on skin, not a paper strip. Most beauty counters have testers; ask whether they can make you a sample to take home.",
    "Wear one per day and smell it again after a few hours. The base notes come through late, and they're what you'll live with.",
    "Buy the one you keep reaching for. Sephora Canada is an authorized store with easy returns; FragranceBuy is a Canadian discounter with lower prices and stricter returns. We earn nothing from either.",
  ];
  return (
    <section
      aria-labelledby="sample-first"
      className="mt-14 rounded-2xl border bg-card p-6 text-card-foreground shadow-scent sm:p-8"
    >
      <h2 id="sample-first" className="font-serif text-2xl font-bold sm:text-3xl">
        Sample before you buy
      </h2>
      <p className="mt-3 text-sm text-muted-foreground sm:text-base">
        Start with{" "}
        {picks.map((f, i) => (
          <span key={f.id}>
            {i > 0 && (i === picks.length - 1 ? " and " : ", ")}
            <span className="font-semibold text-card-foreground">
              {f.brand} {f.name}
            </span>
          </span>
        ))}
        .
      </p>
      <ol className="mt-5 space-y-3 text-sm sm:text-base">
        {steps.map((text, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="w-4 shrink-0 font-serif text-lg font-bold leading-6 text-primary"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 flex flex-wrap gap-x-5 text-sm">
        <Link
          to="/learn/$slug"
          params={{ slug: "how-to-choose-a-fragrance" }}
          hash="sample-before-you-buy"
          className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-2 hover:underline"
        >
          How to sample well →
        </Link>
        <Link
          to="/retailers"
          className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-2 hover:underline"
        >
          Compare all retailers →
        </Link>
      </p>
    </section>
  );
}

function AnswerChip({
  name,
  value,
  onClick,
}: {
  name: string;
  value: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Change ${name.toLowerCase()}: ${value}`}
      className="inline-flex min-h-11 max-w-full items-baseline gap-1.5 rounded-3xl border bg-card px-4 py-2.5 text-left text-sm text-card-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="shrink-0 text-muted-foreground">{name}</span>
      <span className="min-w-0 font-semibold">{value}</span>
    </button>
  );
}

const BUDGET_OPTIONS: Array<{ id: PriceBandId | ""; label: string }> = [
  { id: "", label: "Any price" },
  ...PRICE_BANDS,
];

function BudgetFilter({
  value,
  onChange,
}: {
  value: PriceBandId | "";
  onChange: (budget: PriceBandId | "") => void;
}) {
  return (
    <div
      className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
      role="radiogroup"
      aria-labelledby="budget-label"
    >
      <span
        id="budget-label"
        className="w-full text-center text-xs text-muted-foreground sm:w-auto sm:pr-1 sm:text-sm"
      >
        Lowest usual price
      </span>
      {BUDGET_OPTIONS.map((option) => {
        const active = value === option.id;
        return (
          <button
            key={option.id || "any"}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.id)}
            className={`min-h-11 rounded-full border px-3 text-xs font-semibold tabular-nums transition sm:px-4 sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "border-primary bg-primary text-primary-foreground" : "bg-card text-card-foreground hover:border-primary hover:bg-accent"}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function ResultsGrid({
  answers,
  viewingShared,
  onEdit,
  onBudgetChange,
  onRestart,
  onStartFresh,
}: ResultsGridProps) {
  const { season, occasion, gender, longevity, selectedNotes, avoidedNotes, budget } = answers;
  const PAGE = 8;
  const [visibleCount, setVisibleCount] = useState(PAGE);
  const [shareStatus, setShareStatus] = useState("");
  // Phones see a one-line summary of the answers; tapping it opens the chips to change one.
  const [answersOpen, setAnswersOpen] = useState(false);
  // The step-5 first picks, minus any outside the price filter. They win ties in the shortlist,
  // and any that still miss it are shown below it, so a pick the visitor liked never vanishes.
  const firstPicks = useMemo(
    () =>
      getInitialRecommendations(season, occasion, gender, longevity).filter(
        (f) => !budget || priceBand(f).id === budget,
      ),
    [season, occasion, gender, longevity, budget],
  );
  const ranked = getRankedResults(
    season,
    occasion,
    selectedNotes,
    gender,
    longevity,
    avoidedNotes,
    24,
    budget,
    firstPicks.map((f) => f.id),
  );
  const allResults = ranked.map((x) => x.fragrance);
  const shown = ranked.slice(0, visibleCount);
  const results = shown.map((x) => x.fragrance);
  const empty = results.length === 0;
  // Consecutive results that tied are shown as one unnumbered group; the rest keep their rank.
  const segments: Array<{
    tieGroup: string | null;
    items: Array<RankedResult & { rank: number }>;
  }> = [];
  shown.forEach((x, index) => {
    const last = segments[segments.length - 1];
    const item = { ...x, rank: index + 1 };
    if (last && last.tieGroup === x.tieGroup) last.items.push(item);
    else segments.push({ tieGroup: x.tieGroup, items: [item] });
  });
  const firstPickBand = (id: string) => {
    const pick = firstPicks.find((f) => f.id === id);
    return pick ? priceBand(pick).label : undefined;
  };
  const missingFirstPicks = firstPicks.filter((f) => !results.some((r) => r.id === f.id));

  // The page URL already carries the quiz answers, so the link reopens this shortlist.
  const share = async () => {
    const url = window.location.href;
    const top = results
      .slice(0, 3)
      .map((f) => `${f.brand} ${f.name}`)
      .join("; ");
    const text = `My WhichScent shortlist: ${top}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "My WhichScent shortlist", text, url });
        return;
      }
    } catch (e) {
      if ((e as Error)?.name === "AbortError") return;
    }
    setShareStatus(
      (await copyText(`${text}\n${url}`))
        ? "Link copied"
        : "Couldn't copy. Copy the address bar instead.",
    );
    window.setTimeout(() => setShareStatus(""), 2500);
  };

  return (
    <section className="mx-auto max-w-[900px] animate-scent-in">
      {viewingShared && (
        <p className="mb-4 flex flex-wrap items-center justify-center gap-x-1 text-center text-sm text-muted-foreground">
          Someone shared this shortlist with you.
          <button
            type="button"
            onClick={onStartFresh}
            className="min-h-11 px-1 font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Take the quiz yourself →
          </button>
        </p>
      )}

      <div className="text-center">
        <h1 className="font-serif text-3xl font-bold text-foreground sm:text-6xl">
          {empty ? "No matches yet" : "Your shortlist to sample"}
        </h1>
        <p className="mx-auto mt-3 max-w-[34rem] text-sm text-muted-foreground sm:mt-4 sm:text-base">
          {!empty
            ? "Fragrances that fit who it's for and how long you want it to last come first, ranked by how many of your notes they contain. Try a sample before you buy a bottle."
            : budget
              ? "Nothing in this price range fits your answers. Try another price range."
              : avoidedNotes.length > 0
                ? "Every fragrance that fits these answers contains a note you're avoiding. Avoid fewer notes or love a few more."
                : "Nothing in our catalogue fits these answers yet. Try a different season or occasion."}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setAnswersOpen((open) => !open)}
        aria-expanded={answersOpen}
        aria-controls="answer-chips"
        className="mx-auto mt-6 flex min-h-11 max-w-full items-center gap-2 rounded-3xl border bg-card px-4 py-2 text-left text-sm text-card-foreground sm:hidden"
      >
        <span className="min-w-0">
          {[
            SEASON_OPTIONS.find((o) => o.key === season)?.label,
            OCCASION_OPTIONS.find((o) => o.key === occasion)?.label,
            GENDER_LABEL[gender],
            WEAR_LABEL[longevity],
            selectedNotes.length ? `loves ${selectedNotes.join(", ")}` : "",
            avoidedNotes.length ? `avoids ${avoidedNotes.join(", ")}` : "",
            budget ? PRICE_BANDS.find((b) => b.id === budget)?.label : "",
          ]
            .filter(Boolean)
            .join(" · ")}
        </span>
        <span className="shrink-0 font-semibold text-primary">
          {answersOpen ? "Done" : "Change"}
        </span>
      </button>
      <div
        id="answer-chips"
        className={`mt-4 flex-wrap justify-center gap-2 sm:mt-8 sm:flex ${answersOpen ? "flex" : "hidden"}`}
        role="group"
        aria-label="Your answers"
      >
        <AnswerChip
          name="Season"
          value={SEASON_OPTIONS.find((o) => o.key === season)?.label ?? season}
          onClick={() => onEdit(1)}
        />
        <AnswerChip name="Wear" value={WEAR_LABEL[longevity]} onClick={() => onEdit(2)} />
        <AnswerChip name="For" value={GENDER_LABEL[gender] ?? gender} onClick={() => onEdit(3)} />
        <AnswerChip
          name="Occasion"
          value={OCCASION_OPTIONS.find((o) => o.key === occasion)?.label ?? occasion}
          onClick={() => onEdit(4)}
        />
        <AnswerChip
          name="Loves"
          value={selectedNotes.length ? selectedNotes.join(", ") : "No notes yet"}
          onClick={() => onEdit(6)}
        />
        {avoidedNotes.length > 0 && (
          <AnswerChip name="Avoids" value={avoidedNotes.join(", ")} onClick={() => onEdit(6)} />
        )}
      </div>

      <BudgetFilter value={budget} onChange={onBudgetChange} />

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {empty && !budget && (
          <button
            type="button"
            onClick={() => onEdit(6)}
            className="min-h-11 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Edit notes
          </button>
        )}
        {!empty && (
          <button
            type="button"
            onClick={share}
            className="min-h-11 rounded-full border bg-card px-5 text-sm font-bold text-card-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Share shortlist
          </button>
        )}
        <button
          type="button"
          onClick={onRestart}
          className="min-h-11 px-2 text-sm font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Start over
        </button>
      </div>
      <p aria-live="polite" className="mt-1 min-h-5 text-center text-sm text-muted-foreground">
        {shareStatus}
      </p>

      {!empty && (
        <>
          {!fitsAnswers(results[0], gender, longevity) && (
            <p className="mx-auto mt-6 max-w-[34rem] rounded-2xl border bg-card px-5 py-4 text-center text-sm text-card-foreground">
              Nothing here fits every answer, so these are the closest we have. Each card says what
              doesn't fit.
            </p>
          )}
          <div className="mt-6 space-y-8 sm:mt-8">
            {segments.map(({ tieGroup, items }) => (
              <div key={`${tieGroup ?? "ranked"}-${items[0].rank}`}>
                {tieGroup && (
                  <p className="mb-4 text-center text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Equal fit:</span>{" "}
                    {items.length > 1
                      ? `these ${items.length} scored exactly the same for your answers, so we don't number them.`
                      : "this scored exactly the same as the next matches, so we don't number it."}
                    {selectedNotes.length === 0 && " Add notes you love to tell them apart."}
                  </p>
                )}
                <div className="grid gap-5 lg:grid-cols-2">
                  {items.map(({ fragrance, rank }) => (
                    <FragranceCard
                      key={fragrance.id}
                      fragrance={fragrance}
                      mode="result"
                      rankLabel={tieGroup ? "Equal fit" : `#${rank}`}
                      firstPick={firstPickBand(fragrance.id)}
                      selectedNotes={selectedNotes}
                      answers={{ season, occasion, gender, longevity }}
                    />
                  ))}
                </div>
              </div>
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
          {missingFirstPicks.length > 0 && (
            <div className="mt-14">
              <h2 className="text-center font-serif text-2xl font-bold text-foreground sm:text-3xl">
                Your first picks
              </h2>
              <p className="mx-auto mt-3 max-w-[34rem] text-center text-sm text-muted-foreground">
                The best fit at each price point before your notes, from the step before. They
                didn't make the list above, so here they are.
              </p>
              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                {missingFirstPicks.map((fragrance) => (
                  <FragranceCard
                    key={fragrance.id}
                    fragrance={fragrance}
                    mode="result"
                    firstPick={firstPickBand(fragrance.id)}
                    selectedNotes={selectedNotes}
                    answers={{ season, occasion, gender, longevity }}
                  />
                ))}
              </div>
            </div>
          )}
          <EmailResults
            results={results}
            rankLabels={shown.map((x, index) => (x.tieGroup ? "Equal fit" : `#${index + 1}`))}
            season={season}
            occasion={occasion}
            gender={gender}
            longevity={longevity}
            selectedNotes={selectedNotes}
            avoidedNotes={avoidedNotes}
            budget={budget}
          />
          <SampleFirst picks={results.slice(0, 3)} />
        </>
      )}
    </section>
  );
}
