type NotePillsProps = {
  top: string[];
  heart: string[];
  base: string[];
  matchedNotes?: string[];
};

function Row({ label, notes, matchedNotes = [] }: { label: string; notes: string[]; matchedNotes?: string[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[3.5rem_1fr]">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {notes.map((note) => {
          const matched = matchedNotes.some((m) => note.toLowerCase().includes(m.toLowerCase()));
          return (
            <span key={`${label}-${note}`} className={`rounded-full border px-2.5 py-1 text-xs ${matched ? "border-primary bg-primary/15 text-primary" : "border-border bg-card text-card-foreground"}`}>
              {note}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function NotePills({ top, heart, base, matchedNotes }: NotePillsProps) {
  return (
    <div className="space-y-3">
      <Row label="Top" notes={top} matchedNotes={matchedNotes} />
      <Row label="Heart" notes={heart} matchedNotes={matchedNotes} />
      <Row label="Base" notes={base} matchedNotes={matchedNotes} />
    </div>
  );
}
