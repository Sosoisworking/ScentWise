import { Check, X } from "lucide-react";
import type { Fragrance } from "../data/fragrances";
import { OCCASION_OPTIONS, SEASON_OPTIONS } from "../data/quizOptions";
import type { GenderPreference, LongevityPreference } from "../utils/scoring";
import { LongevityBar } from "./LongevityBar";
import { NotePills } from "./NotePills";
import { explainMatch } from "../utils/noteMatching";

export type FitAnswers = {
  season: string;
  occasion: string;
  gender: GenderPreference;
  longevity: LongevityPreference;
};

type FragranceCardProps = {
  fragrance: Fragrance;
  mode: "initial" | "result";
  /** "#1" etc., or "Equal fit" when it scored exactly the same as a neighbour. */
  rankLabel?: string;
  /** Set when this was one of the step-5 first picks: the price band it was picked for. */
  firstPick?: string;
  selectedNotes?: string[];
  /** The visitor's answers, so the card can say plainly what fits and what doesn't. */
  answers?: FitAnswers;
};

const WEAR = { short: "Short wear", medium: "Medium wear", long: "Long wear" } as const;
const MARKETED = { male: "men", female: "women", unisex: "everyone" } as const;

/** Each answer this fragrance meets or misses, worded so a miss is never hidden. */
function fitLine(fragrance: Fragrance, answers: FitAnswers) {
  const items: Array<{ ok: boolean; text: string }> = [];
  const season = SEASON_OPTIONS.find((o) => o.key === answers.season)?.label;
  if (season) {
    const ok = fragrance.seasons.includes(answers.season);
    items.push({ ok, text: ok ? season : `${season}: not its season` });
  }
  const occasion = OCCASION_OPTIONS.find((o) => o.key === answers.occasion)?.label;
  if (occasion) {
    const ok = fragrance.occasions.includes(answers.occasion);
    items.push({ ok, text: ok ? occasion : `${occasion}: not a usual pick` });
  }
  if (answers.longevity) {
    const ok = fragrance.longevity === answers.longevity;
    const wear = WEAR[fragrance.longevity];
    items.push({
      ok,
      text: ok ? wear : `${wear} (you asked ${WEAR[answers.longevity].toLowerCase()})`,
    });
  }
  if (answers.gender && answers.gender !== "any") {
    const ok =
      fragrance.marketedFor === answers.gender ||
      (answers.gender !== "unisex" && fragrance.marketedFor === "unisex");
    items.push({ ok, text: `Marketed for ${MARKETED[fragrance.marketedFor]}` });
  }
  return items;
}

// Decorative, so it uses the soft gold rather than the text gold.
function BottleIcon() {
  return (
    <svg
      className="h-[4.2rem] w-[3.15rem] text-primary-soft"
      viewBox="0 0 80 110"
      fill="none"
      aria-hidden="true"
    >
      <rect x="29" y="6" width="22" height="13" rx="3" fill="currentColor" opacity="0.45" />
      <rect x="35" y="19" width="10" height="8" fill="currentColor" opacity="0.3" />
      <path
        d="M22 27h36a8 8 0 0 1 8 8v59a9 9 0 0 1-9 9H23a9 9 0 0 1-9-9V35a8 8 0 0 1 8-8Z"
        fill="currentColor"
        opacity="0.1"
      />
      <path
        d="M16 62c8-5 16-5 24 0s16 5 24 0v32a7 7 0 0 1-7 7H23a7 7 0 0 1-7-7Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M22 27h36a8 8 0 0 1 8 8v59a9 9 0 0 1-9 9H23a9 9 0 0 1-9-9V35a8 8 0 0 1 8-8Z"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

export function FragranceCard({
  fragrance,
  mode,
  rankLabel,
  firstPick,
  selectedNotes = [],
  answers,
}: FragranceCardProps) {
  const match =
    mode === "result" && selectedNotes.length > 0 ? explainMatch(fragrance, selectedNotes) : null;
  const buttonGridClass =
    mode === "initial" || !fragrance.sephoraLink ? "grid-cols-1" : "sm:grid-cols-2";

  return (
    <article className="flex h-full flex-col rounded-2xl border bg-card p-[1.3125rem] shadow-scent transition duration-300 hover:-translate-y-1 hover:shadow-scent-hover">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{fragrance.brand}</p>
          <h2 className="font-serif text-2xl font-bold leading-tight text-card-foreground">
            {fragrance.name}
          </h2>
        </div>
        <BottleIcon />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {mode === "result" && rankLabel && (
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold tabular-nums text-primary-foreground">
            {rankLabel}
          </span>
        )}
        {firstPick && (
          <span className="rounded-full border border-primary px-3 py-1 text-xs font-bold text-primary">
            First pick · {firstPick}
          </span>
        )}
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold tabular-nums text-secondary-foreground">
          {fragrance.priceDisplay}
        </span>
        {mode === "result" && (
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase text-secondary-foreground">
            {fragrance.concentration}
          </span>
        )}
      </div>

      {mode === "result" && (
        <p className="mt-3 text-sm font-semibold text-primary">{fragrance.family.join(" · ")}</p>
      )}
      {mode === "result" && answers && (
        <ul
          className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs"
          aria-label="How it fits your answers"
        >
          {fitLine(fragrance, answers).map((item) => (
            <li
              key={item.text}
              className={`inline-flex items-center gap-1 ${item.ok ? "text-card-foreground" : "text-muted-foreground"}`}
            >
              {item.ok ? (
                <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              ) : (
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span className="sr-only">{item.ok ? "Fits: " : "Doesn't fit: "}</span>
              {item.text}
            </li>
          ))}
        </ul>
      )}
      {match && (
        <p className="mt-2 text-sm text-card-foreground">
          {match.matched.length > 0 ? (
            <>
              Matches <span className="font-bold">{match.matched.length}</span> of {match.total} of
              your notes: {match.matched.join(", ")}
            </>
          ) : (
            <span className="text-muted-foreground">None of your notes</span>
          )}
        </p>
      )}
      <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{fragrance.description}</p>
      {/* Phones get the pyramid on request, so a card fits closer to one screen. */}
      <details className="group mt-4 sm:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1 text-sm font-semibold text-primary [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Show full note pyramid</span>
          <span className="hidden group-open:inline">Hide note pyramid</span>
        </summary>
        <div className="mt-2">
          <NotePills
            top={fragrance.topNotes}
            heart={fragrance.heartNotes}
            base={fragrance.baseNotes}
            highlight={match?.highlight ?? []}
          />
        </div>
      </details>
      <div className="mt-5 hidden sm:block">
        <NotePills
          top={fragrance.topNotes}
          heart={fragrance.heartNotes}
          base={fragrance.baseNotes}
          highlight={match?.highlight ?? []}
        />
      </div>
      {/* The fit line already states wear time when the visitor answered it. */}
      {!(mode === "result" && answers?.longevity) && (
        <div className="mt-5">
          <LongevityBar longevity={fragrance.longevity} />
        </div>
      )}
      <div className={`mt-5 grid gap-2 ${buttonGridClass}`}>
        {/* The store the brand sells through comes first; the discounter is the cheaper option. */}
        {fragrance.sephoraLink && (
          <a
            href={fragrance.sephoraLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 flex-col items-center justify-center rounded-3xl border bg-card px-4 py-2 text-sm font-bold leading-tight text-card-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`View ${fragrance.brand} ${fragrance.name} at Sephora Canada, an authorized store`}
          >
            Sephora Canada →
            <span className="mt-0.5 text-xs font-normal text-muted-foreground">
              Authorized store
            </span>
          </a>
        )}
        <a
          href={fragrance.fragrancebuyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 flex-col items-center justify-center rounded-3xl border bg-card px-4 py-2 text-sm font-bold leading-tight text-card-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Buy ${fragrance.brand} ${fragrance.name} at FragranceBuy, a Canadian discounter`}
        >
          FragranceBuy →
          <span className="mt-0.5 text-xs font-normal text-muted-foreground">
            Canadian discounter
          </span>
        </a>
      </div>
    </article>
  );
}
