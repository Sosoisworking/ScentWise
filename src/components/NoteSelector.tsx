import { ArrowLeft, ChevronDown, Heart, RotateCcw, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FRAGRANCES } from "../data/fragrances";
import { NOTES, NOTE_BY_NAME, NOTE_FAMILIES, type CanonicalNote } from "../data/notes";
import { containsAnyNote, containsNote } from "../utils/noteMatching";
import type { PriceBandId } from "../utils/price";
import {
  getInitialRecommendations,
  getRefinedResults,
  type GenderPreference,
  type LongevityPreference,
} from "../utils/scoring";

export type NoteState = "loved" | "avoided" | "none";
export type NoteMode = "loved" | "avoided";

type NoteSelectorProps = {
  lovedNotes: string[];
  avoidedNotes: string[];
  /** Adds the note to the list for `mode`, or takes it off if it's already there. */
  onToggle: (note: string, mode: NoteMode) => void;
  onApplyVibe: (notes: string[], remove: boolean) => void;
  onClear: () => void;
  season: string;
  occasion: string;
  gender: GenderPreference;
  longevity: LongevityPreference;
  budget: PriceBandId | "";
  onSubmit: () => void;
  onBack: () => void;
  backLabel?: string;
  onRestart: () => void;
};

// One-tap starting points for people who don't know note names yet. Each loves a small
// set of notes, which then show under "Your notes" and can be adjusted.
const VIBES: Array<{ label: string; notes: string[] }> = [
  { label: "Fresh & clean", notes: ["Any citrus", "Sea Notes", "Musk"] },
  { label: "Sweet & cozy", notes: ["Vanilla", "Tonka Bean", "Caramel"] },
  { label: "Floral & romantic", notes: ["Rose", "Jasmine", "Peony"] },
  { label: "Woody & smoky", notes: ["Any woods", "Incense", "Leather"] },
  { label: "Warm & spicy", notes: ["Any spice", "Amber"] },
  { label: "Fruity & playful", notes: ["Any fruit", "Berries"] },
  { label: "Boozy & rich", notes: ["Rum", "Liquor", "Tobacco", "Honey"] },
];

const MODES = [
  { key: "loved", label: "Love it", Icon: Heart },
  { key: "avoided", label: "Avoid it", Icon: X },
] as const;

// Notes shown per family before "Show more"; picked notes are always shown.
const VISIBLE_PER_FAMILY = 8;
// A note needs this many fragrances in the catalogue before it becomes pickable.
const MIN_FRAGRANCES = 2;
// Matches the first page of the results.
const SHORTLIST = 8;

const stateLabel: Record<NoteState, string> = {
  loved: "loved",
  avoided: "avoided",
  none: "not picked",
};

// Avoided is a neutral "ruled out" look rather than error red: it's a preference, not a fault.
const chipClass: Record<NoteState, string> = {
  loved: "border-primary bg-primary text-primary-foreground",
  avoided: "border-dashed border-muted-foreground bg-muted text-muted-foreground",
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
  onToggle,
  onApplyVibe,
  onClear,
  season,
  occasion,
  gender,
  longevity,
  budget,
  onSubmit,
  onBack,
  backLabel = "Back",
  onRestart,
}: NoteSelectorProps) {
  const [query, setQuery] = useState("");
  const [browsing, setBrowsing] = useState(false);
  const [mode, setMode] = useState<NoteMode>("loved");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  // Last tapped note, whose description is shown under its family (hover titles don't
  // exist on touch screens).
  const [lastTapped, setLastTapped] = useState<string | null>(null);

  // The bar's height, published so the page can leave room for it and the undo toast can sit
  // above it instead of covering its buttons.
  const barRef = useRef<HTMLDivElement>(null);
  const publishBarHeight = () => {
    const bar = barRef.current;
    if (bar) document.documentElement.style.setProperty("--bottom-bar", `${bar.offsetHeight}px`);
  };
  // After every render (the mode row and status change its height) and on resize (wrapping).
  useEffect(publishBarHeight);
  useEffect(() => {
    const observer = new ResizeObserver(publishBarHeight);
    if (barRef.current) observer.observe(barRef.current);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--bottom-bar");
    };
  }, []);

  // How many catalogue fragrances contain each note; never changes, so it decides which
  // notes are pickable, their order and the number on each chip.
  const catalogueCounts = useMemo(
    () =>
      new Map(NOTES.map((n) => [n.name, FRAGRANCES.filter((f) => containsNote(f, n.name)).length])),
    [],
  );

  // A preview of the first page of results, ranked exactly as the results will be, so the bar
  // can say what the picks actually do.
  const shortlist = useMemo(
    () =>
      getRefinedResults(
        season,
        occasion,
        lovedNotes,
        gender,
        longevity,
        avoidedNotes,
        SHORTLIST,
        budget,
        getInitialRecommendations(season, occasion, gender, longevity).map((f) => f.id),
      ),
    [season, occasion, lovedNotes, gender, longevity, avoidedNotes, budget],
  );
  const withLoved = shortlist.filter((f) => lovedNotes.some((n) => containsNote(f, n))).length;
  const ruledOut = useMemo(
    () => FRAGRANCES.filter((f) => containsAnyNote(f, avoidedNotes)).length,
    [avoidedNotes],
  );

  const stateOf = (name: string): NoteState =>
    lovedNotes.includes(name) ? "loved" : avoidedNotes.includes(name) ? "avoided" : "none";

  const searching = query.trim().length > 0;
  const showFamilies = browsing || searching;

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

  const picked = [
    ...lovedNotes.map((name) => ({ name, state: "loved" as const })),
    ...avoidedNotes.map((name) => ({ name, state: "avoided" as const })),
  ];

  const status =
    picked.length === 0
      ? "No notes yet. Your shortlist uses your other answers."
      : shortlist.length === 0
        ? "Nothing left to show. Remove an avoided note."
        : [
            lovedNotes.length > 0 &&
              (withLoved === shortlist.length
                ? `All of your top ${shortlist.length} have a note you love`
                : `${withLoved} of your top ${shortlist.length} have a note you love`),
            avoidedNotes.length > 0 && `${ruledOut} fragrances ruled out`,
          ]
            .filter(Boolean)
            .join(" · ");

  return (
    // Padding leaves room for the pinned bar, whatever its height.
    <div className="pb-[calc(var(--bottom-bar,10rem)+2rem)]">
      <section className="mx-auto max-w-[900px] animate-scent-in">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground sm:text-6xl">
            Pick what you love
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Start with a vibe, or browse every note to love or rule out. This step is optional: you
            can skip straight to your results.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <h2 className="mb-3 text-center text-sm font-semibold text-foreground">
              Start with a vibe
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {VIBES.map((vibe) => {
                const active = vibe.notes.every((n) => lovedNotes.includes(n));
                return (
                  <button
                    key={vibe.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onApplyVibe(vibe.notes, active)}
                    className={`rounded-2xl border px-4 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-card-foreground hover:border-primary hover:bg-accent"}`}
                  >
                    <span className="block font-semibold">{vibe.label}</span>
                    <span className="block text-xs opacity-90">{vibe.notes.join(" · ")}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {picked.length > 0 && (
            <div className="rounded-2xl border bg-card p-5 shadow-scent">
              <div className="flex items-center justify-between gap-2 text-sm">
                <h2 className="font-semibold text-card-foreground">Your notes</h2>
                <button
                  type="button"
                  onClick={onClear}
                  className="inline-flex min-h-11 items-center px-2 font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Clear all
                </button>
              </div>
              <ul className="mt-2 flex flex-wrap gap-2">
                {picked.map(({ name, state }) => (
                  <li key={name}>
                    <button
                      type="button"
                      onClick={() => onToggle(name, state)}
                      aria-label={`Remove ${name} (${stateLabel[state]})`}
                      className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${chipClass[state]}`}
                    >
                      {state === "loved" && (
                        <Heart className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                      )}
                      <span className={state === "avoided" ? "line-through" : undefined}>
                        {name}
                      </span>
                      <X className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-3">
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
              className="w-full rounded-full border bg-card px-5 py-3 text-base text-card-foreground shadow-scent sm:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-search-cancel-button]:hidden"
            />
            {!searching && (
              <button
                type="button"
                onClick={() => setBrowsing((v) => !v)}
                aria-expanded={browsing}
                aria-controls="note-families"
                className="mx-auto flex min-h-11 items-center gap-1.5 rounded-full border bg-card px-5 text-sm font-semibold text-card-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {browsing ? "Hide the note list" : "Browse all notes"}
                <ChevronDown
                  className={`h-4 w-4 transition ${browsing ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* The pinned bar comes before the note list in the page so keyboard users reach the mode
          switch and Find before tabbing through every note. It stays outside the animated
          section: a transformed ancestor would stop `fixed` from pinning it to the viewport. */}
      <div
        ref={barRef}
        className="fixed inset-x-0 bottom-[var(--consent-offset,0px)] z-50 border-t bg-background/95 px-4 pb-4 pt-3 backdrop-blur"
      >
        {showFamilies && (
          <div className="mx-auto mb-3 flex max-w-[900px] items-center justify-center gap-3">
            <p id="note-mode-label" className="text-sm font-semibold text-foreground">
              Tap a note to
            </p>
            <div
              role="group"
              aria-labelledby="note-mode-label"
              className="inline-flex rounded-full border bg-card p-1"
            >
              {MODES.map(({ key, label, Icon }) => {
                const active = mode === key;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setMode(key)}
                    className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? (key === "loved" ? "bg-primary text-primary-foreground" : "bg-foreground text-background") : "text-card-foreground hover:bg-accent"}`}
                  >
                    <Icon
                      className={`h-3.5 w-3.5 ${key === "loved" && active ? "fill-current" : ""}`}
                      aria-hidden="true"
                    />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <p
          aria-live="polite"
          className="mx-auto max-w-[900px] text-center text-sm text-muted-foreground"
        >
          {lovedNotes.length > 0 && (
            <span className="mr-1.5 inline-flex items-center gap-1 font-semibold text-foreground">
              <Heart className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              {lovedNotes.length}
              <span className="sr-only"> loved,</span>
            </span>
          )}{" "}
          {avoidedNotes.length > 0 && (
            <span className="mr-1.5 inline-flex items-center gap-1 font-semibold text-foreground">
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              {avoidedNotes.length}
              <span className="sr-only"> avoided.</span>
            </span>
          )}{" "}
          {status}
        </p>
        <div className="mx-auto mt-3 flex max-w-[900px] items-center gap-2 sm:justify-center">
          <button
            type="button"
            onClick={onBack}
            aria-label={
              backLabel === "Back" ? "Go back to previous WhichScent quiz step" : backLabel
            }
            className="rounded-full border bg-card p-4 text-card-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="flex flex-1 justify-center rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-scent transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-none sm:px-10"
          >
            {picked.length === 0 ? "Skip to my results →" : "Find My Fragrance →"}
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

      <div
        id="note-families"
        hidden={!showFamilies}
        className="mx-auto mt-6 max-w-[900px] space-y-6"
      >
        {showFamilies && (
          <>
            <p className="text-center text-xs text-muted-foreground">
              Numbers show how many fragrances in our catalogue contain each note.
            </p>

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
                    const count = catalogueCounts.get(note.name) ?? 0;
                    return (
                      <button
                        key={note.name}
                        type="button"
                        title={note.description}
                        aria-pressed={state === mode}
                        aria-label={`${note.name}, ${stateLabel[state]}. In ${count} fragrances.`}
                        onClick={() => {
                          onToggle(note.name, mode);
                          setLastTapped(note.name);
                        }}
                        className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${chipClass[state]} ${note.wildcard ? "italic" : ""}`}
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
                        <span aria-hidden="true" className="ml-1.5 text-xs font-normal opacity-80">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                  {hidden > 0 && (
                    <button
                      type="button"
                      onClick={() => toggleExpanded(family.id)}
                      className="min-h-10 rounded-full px-3 text-sm font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Show {hidden} more
                    </button>
                  )}
                  {hidden === 0 && expanded.has(family.id) && !searching && (
                    <button
                      type="button"
                      onClick={() => toggleExpanded(family.id)}
                      className="min-h-10 rounded-full px-3 text-sm font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          </>
        )}
      </div>
    </div>
  );
}
