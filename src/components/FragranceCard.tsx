import type { Fragrance } from "../data/fragrances";
import { scoreFragrance } from "../utils/scoring";
import { LongevityBadge, LongevityBar } from "./LongevityBar";
import { NotePills } from "./NotePills";

type FragranceCardProps = {
  fragrance: Fragrance;
  label?: string;
  mode: "initial" | "result";
  season?: string;
  occasion?: string;
  selectedNotes?: string[];
};

const badgeClass: Record<Fragrance["priceRange"], string> = {
  budget: "bg-budget text-budget-foreground",
  mid: "bg-mid text-mid-foreground",
  premium: "bg-premium text-premium-foreground",
};

function BottleIcon() {
  return (
    <svg className="h-[4.2rem] w-[3.15rem] text-primary" viewBox="0 0 80 110" fill="none" aria-hidden="true">
      <path d="M31 6h18v18H31z" fill="currentColor" opacity="0.35" />
      <path d="M24 25h32l8 16v55a8 8 0 0 1-8 8H24a8 8 0 0 1-8-8V41l8-16Z" fill="currentColor" opacity="0.14" stroke="currentColor" strokeWidth="3" />
      <path d="M27 58c8-8 18-8 26 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function FragranceCard({ fragrance, label, mode, season = "", occasion = "", selectedNotes = [] }: FragranceCardProps) {
  const matchScore = scoreFragrance(fragrance, season, occasion, selectedNotes);
  const matchedNotes = mode === "result" ? selectedNotes : [];
  const buttonGridClass = mode === "initial" ? "grid-cols-1" : "sm:grid-cols-2";

  return (
    <article className="flex h-full flex-col rounded-2xl border bg-card p-[1.3125rem] shadow-scent transition duration-300 hover:-translate-y-1 hover:shadow-scent-hover">
      <div className="flex items-start justify-between gap-4">
        <div>
          {label && <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">{label}</p>}
          <p className="text-sm font-semibold text-muted-foreground">{fragrance.brand}</p>
          <h2 className="font-serif text-[1.575rem] font-bold leading-tight text-card-foreground">{fragrance.name}</h2>
        </div>
        <BottleIcon />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${badgeClass[fragrance.priceRange]}`}>{fragrance.priceDisplay}</span>
        {mode === "result" && <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase text-secondary-foreground">{fragrance.concentration}</span>}
        {mode === "result" && <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{matchScore}% match</span>}
      </div>

      {mode === "result" && <p className="mt-3 text-sm font-semibold text-primary">{fragrance.family.join(" · ")}</p>}
      <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{fragrance.description}</p>
      <div className="mt-5"><NotePills top={fragrance.topNotes} heart={fragrance.heartNotes} base={fragrance.baseNotes} matchedNotes={matchedNotes} /></div>
      <div className="mt-5"><LongevityBar longevity={fragrance.longevity} /></div>
      <div className={`mt-5 grid gap-2 ${buttonGridClass}`}>
        <a href={fragrance.fragrancebuyLink} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Buy ${fragrance.brand} ${fragrance.name} at Fragrancebuy`}>Fragrancebuy →</a>
        <a href="https://www.sephora.com" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border bg-card px-4 py-3 text-sm font-bold text-card-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Visit Sephora to search for ${fragrance.brand} ${fragrance.name}`}>Sephora →</a>
      </div>
    </article>
  );
}
