import type { Fragrance } from "../data/fragrances";

const levels: Fragrance["longevity"][] = ["short", "medium", "long"];

export function LongevityBar({ longevity }: { longevity: Fragrance["longevity"] }) {
  const activeCount = levels.indexOf(longevity) + 1;
  return (
    <div className="space-y-2" aria-label={`Longevity ${longevity}`}>
      <div className="flex gap-1.5">
        {levels.map((level, index) => (
          <span
            key={level}
            className={`h-2 flex-1 rounded-full ${index < activeCount ? "bg-primary" : "bg-secondary"}`}
          />
        ))}
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {longevity} longevity
      </p>
    </div>
  );
}

export function LongevityBadge({ longevity }: { longevity: Fragrance["longevity"] }) {
  const icons = { short: "⏱", medium: "⏱⏱", long: "⏱⏱⏱" };
  return (
    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase text-secondary-foreground">
      {longevity} {icons[longevity]}
    </span>
  );
}
