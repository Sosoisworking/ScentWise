import type { Fragrance } from "../data/fragrances";

const levels: Fragrance["longevity"][] = ["short", "medium", "long"];

/** Three segments, filled up to the given wear time. */
export function LongevityMeter({
  longevity,
  className = "",
}: {
  longevity: Fragrance["longevity"];
  className?: string;
}) {
  const activeCount = levels.indexOf(longevity) + 1;
  return (
    <div className={`flex gap-1.5 ${className}`} aria-hidden="true">
      {levels.map((level, index) => (
        <span
          key={level}
          className={`h-2 flex-1 rounded-full ${index < activeCount ? "bg-primary" : "bg-secondary"}`}
        />
      ))}
    </div>
  );
}

export function LongevityBar({ longevity }: { longevity: Fragrance["longevity"] }) {
  return (
    <div className="space-y-2">
      <LongevityMeter longevity={longevity} />
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {longevity} longevity
      </p>
    </div>
  );
}
