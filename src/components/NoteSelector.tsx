import { ArrowLeft, Heart, RotateCcw, X } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { FRAGRANCES } from "../data/fragrances";
import { NOTES, NOTE_BY_NAME, NOTE_FAMILIES, type CanonicalNote } from "../data/notes";
import { containsAnyNote, containsNote } from "../utils/noteMatching";
import type { LongevityPreference } from "../utils/scoring";

export type NoteState = "loved" | "avoided" | "none";

type NoteSelectorProps = {
  lovedNotes: string[];
  avoidedNotes: string[];
  onCycle: (note: string) => void;
  onApplyVibe: (notes: string[], remove: boolean) => void;
  onClear: () => void;
  longevity: LongevityPreference;
  onLongevityChange: (longevity: LongevityPreference) => void;
  onSubmit: () => void;
  onBack: () => void;
  onRestart: () => void;
};

const longevityOptions: Array<{ key: Exclude<LongevityPreference, "">; label: string }> = [
  { key: "short", label: "Short" },
  { key: "medium", label: "Medium" },
  { key: "long", label: "Long" },
];

// One-tap starting points for people who don't know note names yet. Each loves a small
// set of notes, which then show as selected below and can be adjusted.
const VIBES: Array<{ label: string; notes: string[] }> = [
  { label: "Fresh & clean", notes: ["Any citrus", "Sea Notes", "Musk"] },
  { label: "Sweet & cozy", notes: ["Vanilla", "Tonka Bean", "Caramel"] },
  { label: "Floral & romantic", notes: ["Rose", "Jasmine", "Peony"] },
  { label: "Woody & smoky", notes: ["Any woods", "Incense", "Leather"] },
  { label: "Warm & spicy", notes: ["Any spice", "Amber"] },
  { label: "Fruity & playful", notes: ["Any fruit", "Berries"] },
  { label: "Boozy & rich", notes: ["Rum", "Liquor", "Tobacco", "Honey"] },
];

const longevityLabel = (value: LongevityPreference) =>
  longevityOptions.find((o) => o.key === value)?.label ?? "Any";

// Notes shown per family before "Show more"; picked notes are always shown.
const VISIBLE_PER_FAMILY = 8;
// A note needs this many fragrances in the catalogue before it becomes pickable.
const MIN_FRAGRANCES = 2;

const stateLabel: Record<NoteState, string> = {
  loved: "loved",
  avoided: "avoided",
  none: "not selected",
};

const chipClass: Record<NoteState, string> = {
  loved: "border-primary bg-primary text-primary-foreground",
  avoided: "border-destructive bg-destructive/10 text-destructive",
  none: "border-border bg-card text-card-foreground hover:border-primary hover:bg-accent",
};

function matchesQuery(note: CanonicalNote, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [note.name, ...(note.aliases ?? [])].some((n) => n.toLowerCase().includes(q));
}

export function NoteSelector({
  lovedNotes,
  avoidedNotes,
  onCycle,
  onApplyVibe,
  onClear,
  longevity,
  onLongevityChange,
  onSubmit,
  onBack,
  onRestart,
}: NoteSelectorProps) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [editingLongevity, setEditingLongevity] = useState(false);
  // Last tapped note, whose description is shown under its family (hover titles don't
  // exist on touch screens).
  const [lastTapped, setLastTapped] = useState<string | null>(null);
  const hintId = useId();

  // How many catalogue fragrances contain each note; never changes, so it decides which
  // notes are pickable and their order.
  const catalogueCounts = useMemo(
    () =>
      new Map(NOTES.map((n) => [n.name, FRAGRANCES.filter((f) => containsNote(f, n.name)).length])),
    [],
  );

  // Live numbers, after removing fragrances that contain an avoided note.
  const pool = useMemo(
    () => FRAGRANCES.filter((f) => !containsAnyNote(f, avoidedNotes)),
    [avoidedNotes],
  );
  const liveCounts = useMemo(
    () => new Map(NOTES.map((n) => [n.name, pool.filter((f) => containsNote(f, n.name)).length])),
    [pool],
  );
  const matchCount =
    lovedNotes.length > 0
      ? pool.filter((f) => lovedNotes.some((n) => containsNote(f, n))).length
      : pool.length;
  const allCount = pool.filter((f) => lovedNotes.every((n) => containsNote(f, n))).length;

  const stateOf = (name: string): NoteState =>
    lovedNotes.includes(name) ? "loved" : avoidedNotes.includes(name) ? "avoided" : "none";

  const families = NOTE_FAMILIES.map((family) => {
    const notes = NOTES.filter(
      (n) =>
        n.family === family.id &&
        (n.wildcard ||
          (catalogueCounts.get(n.name) ?? 0) >= MIN_FRAGRANCES ||
          stateOf(n.name) !== "none"),
    ).sort(
      (a, b) =>
        Number(!!b.wildcard) - Number(!!a.wildcard) ||
        (catalogueCounts.get(b.name) ?? 0) - (catalogueCounts.get(a.name) ?? 0),
    );
    const searching = query.trim().length > 0;
    const matching = notes.filter((n) => matchesQuery(n, query));
    const showAll = searching || expanded.has(family.id);
    const visible = showAll
      ? matching
      : matching.filter((n, i) => i < VISIBLE_PER_FAMILY || stateOf(n.name) !== "none");
    return { family, visible, hidden: matching.length - visible.length };
  }).filter((g) => g.visible.length > 0);

  const toggleExpanded = (id: string) =>
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const pickedCount = lovedNotes.length + avoidedNotes.length;

  return (
    <>
      <section className="mx-auto max-w-[900px] animate-scent-in pb-44">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground sm:text-6xl">
            Pick what you love
          </h1>
          <p id={hintId} className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Tap a note once if you love it, twice if it's a no, and again to clear it. Numbers show
            how many fragrances contain each note.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border bg-card px-5 py-4 shadow-scent">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <p>
                <span className="font-bold uppercase tracking-[0.2em] text-primary text-xs">
                  Longevity
                </span>{" "}
                <span className="ml-2 font-semibold text-card-foreground">
                  {longevityLabel(longevity)}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setEditingLongevity((v) => !v)}
                aria-expanded={editingLongevity}
                className="inline-flex min-h-6 items-center px-1 font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {editingLongevity ? "Done" : "Change"}
              </button>
            </div>
            {editingLongevity && (
              <div
                className="mt-4 grid gap-2 sm:grid-cols-3"
                role="radiogroup"
                aria-label="Longevity preference"
              >
                {longevityOptions.map((option) => {
                  const active = longevity === option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => onLongevityChange(active ? "" : option.key)}
                      className={`rounded-full border px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-card-foreground hover:border-primary hover:bg-accent"}`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <p className="mb-3 text-center text-sm font-semibold text-foreground">
              Not sure? Start with a vibe
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {VIBES.map((vibe) => {
                const active = vibe.notes.every((n) => lovedNotes.includes(n));
                return (
                  <button
                    key={vibe.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onApplyVibe(vibe.notes, active)}
                    title={vibe.notes.join(", ")}
                    className={`rounded-2xl border px-4 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-card-foreground hover:border-primary hover:bg-accent"}`}
                  >
                    <span className="block font-semibold">{vibe.label}</span>
                    <span className="block text-xs opacity-75">{vibe.notes.join(" · ")}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="note-search" className="sr-only">
              Search notes
            </label>
            <input
              id="note-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes, e.g. vanilla, oud, peony"
              autoComplete="off"
              className="w-full rounded-full border bg-card px-5 py-3 text-sm text-card-foreground shadow-scent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {families.length === 0 && (
            <p className="rounded-2xl border bg-card p-6 text-center text-sm text-muted-foreground">
              No notes match “{query}”.
            </p>
          )}

          {families.map(({ family, visible, hidden }) => (
            <fieldset key={family.id} className="rounded-2xl border bg-card p-5 shadow-scent">
              <legend className="px-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {family.label}
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {visible.map((note) => {
                  const state = stateOf(note.name);
                  const count = liveCounts.get(note.name) ?? 0;
                  const disabled = count === 0 && state === "none";
                  return (
                    <button
                      key={note.name}
                      type="button"
                      title={note.description}
                      disabled={disabled}
                      aria-describedby={hintId}
                      aria-label={`${note.name}, ${stateLabel[state]}. ${note.description}${state === "avoided" ? "" : ` ${count} fragrances.`}`}
                      onClick={() => {
                        onCycle(note.name);
                        setLastTapped(note.name);
                      }}
                      className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40 ${chipClass[state]} ${note.wildcard ? "italic" : ""}`}
                    >
                      {state === "loved" && (
                        <Heart className="mr-1.5 h-3.5 w-3.5 fill-current" aria-hidden="true" />
                      )}
                      {state === "avoided" && (
                        <X className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      <span className={state === "avoided" ? "line-through" : undefined}>
                        {note.name}
                      </span>
                      {state !== "avoided" && (
                        <span aria-hidden="true" className="ml-1.5 text-xs font-normal opacity-70">
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
                {hidden > 0 && (
                  <button
                    type="button"
                    onClick={() => toggleExpanded(family.id)}
                    className="rounded-full px-3 py-2 text-sm font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Show {hidden} more
                  </button>
                )}
                {hidden === 0 && expanded.has(family.id) && !query.trim() && (
                  <button
                    type="button"
                    onClick={() => toggleExpanded(family.id)}
                    className="rounded-full px-3 py-2 text-sm font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Show fewer
                  </button>
                )}
              </div>
              {lastTapped && NOTE_BY_NAME.get(lastTapped)?.family === family.id && (
                <p aria-live="polite" className="mt-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-card-foreground">{lastTapped}:</span>{" "}
                  {NOTE_BY_NAME.get(lastTapped)?.description}
                </p>
              )}
            </fieldset>
          ))}
        </div>
      </section>

      {/* Kept outside the animated section: a transformed ancestor would stop `fixed` from
          pinning the bar to the viewport. */}
      <div className="fixed inset-x-0 bottom-[var(--consent-offset,0px)] z-50 border-t bg-background/95 px-4 pb-4 pt-3 backdrop-blur">
        <div className="mx-auto flex max-w-[900px] flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <p aria-live="polite">
            {lovedNotes.length > 0 && (
              <span className="mr-1 inline-flex items-center gap-1 font-semibold text-foreground">
                <Heart className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                {lovedNotes.length}
                <span className="sr-only"> loved</span>
              </span>
            )}
            {avoidedNotes.length > 0 && (
              <span className="mr-1 inline-flex items-center gap-1 font-semibold text-destructive">
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                {avoidedNotes.length}
                <span className="sr-only"> avoided</span>
              </span>
            )}
            {pickedCount > 0 && "· "}
            <span className="font-semibold text-foreground">{matchCount}</span> fragrances match
            {lovedNotes.length > 1 && (
              <>
                {" "}
                · <span className="font-semibold text-foreground">{allCount}</span> have them all
              </>
            )}
          </p>
          {pickedCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex min-h-6 items-center px-1 font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Clear
            </button>
          )}
        </div>
        <div className="mx-auto mt-3 flex max-w-[900px] items-center gap-2 sm:justify-center">
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back to previous WhichScent quiz step"
            className="rounded-full border bg-card p-4 text-card-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="flex flex-1 justify-center rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-scent transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-none sm:px-10"
          >
            Find My Fragrance →
          </button>
          <button
            type="button"
            onClick={onRestart}
            aria-label="Restart WhichScent quiz"
            className="rounded-full border bg-card p-4 text-card-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}
