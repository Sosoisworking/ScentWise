import type { Fragrance } from "../data/fragrances";
import { scoreFragrance, type GenderPreference, type LongevityPreference } from "../utils/scoring";
import { LongevityBadge, LongevityBar } from "./LongevityBar";
import { NotePills } from "./NotePills";

type FragranceCardProps = {
  fragrance: Fragrance;
  label?: string;
  mode: "initial" | "result";
  season?: string;
  occasion?: string;
  selectedNotes?: string[];
  gender?: GenderPreference;
  longevity?: LongevityPreference;
};

const badgeClass: Record<Fragrance["priceRange"], string> = {
  budget: "bg-budget text-budget-foreground",
  mid: "bg-mid text-mid-foreground",
  premium: "bg-premium text-premium-foreground",
};

function BottleIcon() {
  return (
    <svg
      className="h-[4.2rem] w-[3.15rem] text-primary"
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
  season = "",
  occasion = "",
  selectedNotes = [],
  gender,
  longevity,
}: FragranceCardProps) {
  const matchScore = scoreFragrance(fragrance, season, occasion, selectedNotes, gender, longevity);
  const matchedNotes = mode === "result" ? selectedNotes : [];
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
          <h2 className="font-serif text-[1.575rem] font-bold leading-tight text-card-foreground">
            {fragrance.name}
          </h2>
        </div>
        <BottleIcon />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${badgeClass[fragrance.priceRange]}`}
        >
          {fragrance.priceDisplay}
        </span>
        {mode === "result" && (
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase text-secondary-foreground">
            {fragrance.concentration}
          </span>
        )}
        {mode === "result" && (
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
            {matchScore}% match
          </span>
        )}
      </div>

      {mode === "result" && (
        <p className="mt-3 text-sm font-semibold text-primary">{fragrance.family.join(" · ")}</p>
      )}
      <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{fragrance.description}</p>
      <div className="mt-5">
        <NotePills
          top={fragrance.topNotes}
          heart={fragrance.heartNotes}
          base={fragrance.baseNotes}
          matchedNotes={matchedNotes}
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
          className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Buy ${fragrance.brand} ${fragrance.name} at Fragrancebuy`}
        >
          Fragrancebuy →
        </a>
        {fragrance.sephoraLink && (
          <a
            href={fragrance.sephoraLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border bg-card px-4 py-3 text-sm font-bold text-card-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`View ${fragrance.brand} ${fragrance.name} at Sephora Canada`}
          >
            Sephora →
          </a>
        )}
      </div>
    </article>
  );
}
