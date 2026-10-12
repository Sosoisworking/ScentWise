import type { GenderPreference } from "../utils/scoring";

const options: Array<{ key: Exclude<GenderPreference, "">; label: string; text: string }> = [
  { key: "female", label: "Women", text: "Fragrances marketed for women" },
  { key: "male", label: "Men", text: "Fragrances marketed for men" },
  { key: "unisex", label: "Unisex", text: "Fragrances marketed to everyone" },
  { key: "any", label: "No preference", text: "Show me everything that fits" },
];

export function MarketedForStep({
  selected = "",
  onSelect,
}: {
  selected?: GenderPreference;
  onSelect: (gender: Exclude<GenderPreference, "">) => void;
}) {
  return (
    <section className="mx-auto max-w-[900px] text-center animate-scent-in">
      <h1 className="font-serif text-4xl font-bold tracking-normal text-foreground sm:text-6xl">
        Who is it marketed for?
      </h1>
      <p className="mx-auto mt-4 max-w-[34rem] text-base text-muted-foreground">
        Scent has no gender; this only decides which bottles we lean towards. Skip it with No
        preference.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            aria-pressed={selected === option.key}
            onClick={() => onSelect(option.key)}
            className={`rounded-2xl border bg-card p-6 text-left shadow-scent transition duration-300 hover:-translate-y-1 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected === option.key ? "border-primary ring-2 ring-primary" : ""}`}
          >
            <span className="block font-serif text-2xl font-bold text-foreground">
              {option.label}
            </span>
            <span className="mt-1 block text-sm text-muted-foreground">{option.text}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
