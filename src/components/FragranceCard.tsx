import type { Fragrance } from "../data/fragrances";
import { priceBand, type PriceBandId } from "../utils/price";
import { LongevityBadge, LongevityBar } from "./LongevityBar";
import { NotePills } from "./NotePills";
import { explainMatch } from "../utils/noteMatching";

type FragranceCardProps = {
  fragrance: Fragrance;
  label?: string;
  mode: "initial" | "result";
  /** Position in the results, shown instead of a percentage. */
  rank?: number;
  selectedNotes?: string[];
};

const badgeClass: Record<PriceBandId, string> = {
  "under-100": "bg-budget text-budget-foreground",
  "100-200": "bg-mid text-mid-foreground",
  "200-plus": "bg-premium text-premium-foreground",
};

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
  label,
  mode,
  rank,
  selectedNotes = [],
}: FragranceCardProps) {
  const match =
    mode === "result" && selectedNotes.length > 0 ? explainMatch(fragrance, selectedNotes) : null;
  const buttonGridClass =
    mode === "initial" || !fragrance.sephoraLink ? "grid-cols-1" : "sm:grid-cols-2";

  return (
    <article className="flex h-full flex-col rounded-2xl border bg-card p-[1.3125rem] shadow-scent transition duration-300 hover:-translate-y-1 hover:shadow-scent-hover">
      <div className="flex items-start justify-between gap-4">
        <div>
          {label && (
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {label}
            </p>
          )}
          <p className="text-sm font-semibold text-muted-foreground">{fragrance.brand}</p>
          <h2 className="font-serif text-2xl font-bold leading-tight text-card-foreground">
            {fragrance.name}
          </h2>
        </div>
        <BottleIcon />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tabular-nums ${badgeClass[priceBand(fragrance).id]}`}
        >
          {fragrance.priceDisplay}
        </span>
        {mode === "result" && (
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase text-secondary-foreground">
            {fragrance.concentration}
          </span>
        )}
        {mode === "result" && rank !== undefined && (
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold tabular-nums text-primary-foreground">
            #{rank}
          </span>
        )}
      </div>

      {mode === "result" && (
        <p className="mt-3 text-sm font-semibold text-primary">{fragrance.family.join(" · ")}</p>
      )}
      {mode === "result" && !match && (
        <p className="mt-2 text-sm text-muted-foreground">Picked for your season and occasion</p>
      )}
      {match && (
        <p className="mt-2 text-sm text-card-foreground">
          {match.matched.length > 0 ? (
            <>
              Matches <span className="font-bold">{match.matched.length}</span> of {match.total} of
              your notes: {match.matched.join(", ")}
            </>
          ) : (
            <span className="text-muted-foreground">
              None of your notes; picked for your season and occasion
            </span>
          )}
        </p>
      )}
      <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{fragrance.description}</p>
      <div className="mt-5">
        <NotePills
          top={fragrance.topNotes}
          heart={fragrance.heartNotes}
          base={fragrance.baseNotes}
          highlight={match?.highlight ?? []}
        />
      </div>
      <div className="mt-5">
        <LongevityBar longevity={fragrance.longevity} />
      </div>
      <div className={`mt-5 grid gap-2 ${buttonGridClass}`}>
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
      </div>
    </article>
  );
}
