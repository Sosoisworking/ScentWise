import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Answers } from "../App";
import { OCCASION_OPTIONS, SEASON_OPTIONS } from "../data/quizOptions";
import { PRICE_BANDS, type PriceBandId } from "../utils/price";
import { getRefinedResults } from "../utils/scoring";
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

const GENDER_LABEL: Record<string, string> = { male: "Men", female: "Women", unisex: "Unisex" };
const LONGEVITY_LABEL: Record<string, string> = {
  short: "Short wear",
  medium: "Medium wear",
  long: "Long wear",
  "": "Any wear time",
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
      className="mt-4 flex flex-wrap justify-center gap-2"
      role="radiogroup"
      aria-label="Price range, typical Canadian price"
    >
      {BUDGET_OPTIONS.map((option) => {
        const active = value === option.id;
        return (
          <button
            key={option.id || "any"}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.id)}
            className={`min-h-11 rounded-full border px-4 text-sm font-semibold tabular-nums transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "border-primary bg-primary text-primary-foreground" : "bg-card text-card-foreground hover:border-primary hover:bg-accent"}`}
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
  const allResults = getRefinedResults(
    season,
    occasion,
    selectedNotes,
    gender,
    longevity,
    avoidedNotes,
    24,
    budget,
  );
  const results = allResults.slice(0, visibleCount);
  const empty = results.length === 0;

  // The page URL already carries the quiz answers, so the link reopens this shortlist.
  const share = async () => {
    const url = window.location.href;
    const top = results
      .slice(0, 3)
      .map((f, i) => `${i + 1}. ${f.brand} ${f.name}`)
      .join("; ");
    const text = `My WhichScent shortlist: ${top}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "My WhichScent shortlist", text, url });
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
      {viewingShared && (
        <div className="mb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border bg-card px-5 py-4 text-center text-sm text-card-foreground shadow-scent">
          <p>You're looking at a shortlist someone shared with you.</p>
          <button
            type="button"
            onClick={onStartFresh}
            className="min-h-11 rounded-full bg-primary px-5 font-bold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Take the quiz yourself
          </button>
        </div>
      )}

      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-6xl">
          {empty ? "No matches yet" : "Your shortlist to sample"}
        </h1>
        <p className="mx-auto mt-4 max-w-[34rem] text-base text-muted-foreground">
          {!empty
            ? "Ranked by how many of your notes each one contains, then by how well it fits your other answers. Try a sample before you buy a bottle."
            : budget
              ? "Nothing in this price range fits your answers. Try another price range."
              : avoidedNotes.length > 0
                ? "Every fragrance that fits these answers contains a note you're avoiding. Avoid fewer notes or love a few more."
                : "Nothing in our catalogue fits these answers yet. Try a different season or occasion."}
        </p>
      </div>

      <div
        className="mt-8 flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Your answers"
      >
        <AnswerChip
          name="Season"
          value={SEASON_OPTIONS.find((o) => o.key === season)?.label ?? season}
          onClick={() => onEdit(1)}
        />
        <AnswerChip name="Wear" value={LONGEVITY_LABEL[longevity]} onClick={() => onEdit(2)} />
        <AnswerChip name="For" value={GENDER_LABEL[gender] ?? gender} onClick={() => onEdit(3)} />
        <AnswerChip
          name="Occasion"
          value={OCCASION_OPTIONS.find((o) => o.key === occasion)?.label ?? occasion}
          onClick={() => onEdit(3)}
        />
        <AnswerChip
          name="Loves"
          value={selectedNotes.length ? selectedNotes.join(", ") : "No notes yet"}
          onClick={() => onEdit(5)}
        />
        {avoidedNotes.length > 0 && (
          <AnswerChip name="Avoids" value={avoidedNotes.join(", ")} onClick={() => onEdit(5)} />
        )}
      </div>

      <BudgetFilter value={budget} onChange={onBudgetChange} />

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {empty && !budget ? (
          <button
            type="button"
            onClick={() => onEdit(5)}
            className="min-h-11 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Edit notes
          </button>
        ) : (
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
      <p aria-live="polite" className="mt-2 h-5 text-center text-sm text-muted-foreground">
        {shareStatus}
      </p>

      {!empty && (
        <>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {results.map((fragrance, index) => (
              <FragranceCard
                key={fragrance.id}
                fragrance={fragrance}
                mode="result"
                rank={index + 1}
                selectedNotes={selectedNotes}
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
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Prices are typical Canadian ranges and change often.{" "}
            <Link
              to="/retailers"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              Compare retailers before you buy →
            </Link>
          </p>
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
