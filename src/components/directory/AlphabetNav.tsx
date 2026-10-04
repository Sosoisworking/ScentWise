import { ALPHABET } from "../../utils/brandFilters";

export function AlphabetNav({ availableLetters }: { availableLetters: Set<string> }) {
  const handleClick = (letter: string) => {
    const el = document.getElementById(`letter-${letter}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <nav
      aria-label="Jump to letter"
      className="sticky top-0 z-20 -mx-5 mb-8 border-y border-border bg-background/85 px-5 py-3 backdrop-blur"
    >
      <div className="mx-auto flex max-w-[900px] flex-wrap justify-center gap-1.5">
        {ALPHABET.map((l) => {
          const active = availableLetters.has(l);
          return (
            <button
              key={l}
              type="button"
              disabled={!active}
              onClick={() => handleClick(l)}
              className={`h-8 w-8 rounded-full text-xs font-bold transition ${
                active
                  ? "bg-card text-foreground hover:bg-primary hover:text-primary-foreground"
                  : "cursor-not-allowed text-muted-foreground/40"
              }`}
            >
              {l}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
