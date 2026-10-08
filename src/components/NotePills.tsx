type NotePillsProps = {
  top: string[];
  heart: string[];
  base: string[];
  /** Exact note strings to highlight (already matched by the caller). */
  highlight?: string[];
};

function Row({
  label,
  notes,
  highlight = [],
}: {
  label: string;
  notes: string[];
  highlight?: string[];
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[3.5rem_1fr]">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {notes.map((note) => {
          const matched = highlight.includes(note);
          return (
            <span
              key={`${label}-${note}`}
              className={`rounded-full border px-2.5 py-1 text-xs ${matched ? "border-primary bg-primary/15 text-primary" : "border-border bg-card text-card-foreground"}`}
            >
              {note}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function NotePills({ top, heart, base, highlight }: NotePillsProps) {
  return (
    <div className="space-y-3">
      <Row label="Top" notes={top} highlight={highlight} />
      <Row label="Heart" notes={heart} highlight={highlight} />
      <Row label="Base" notes={base} highlight={highlight} />
    </div>
  );
}
