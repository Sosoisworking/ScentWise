import { useMemo, useState } from "react";
import type { Fragrance } from "../data/fragrances";
import { scoreFragrance, type GenderPreference, type LongevityPreference } from "../utils/scoring";

type Props = {
  results: Fragrance[];
  season: string;
  occasion: string;
  gender: GenderPreference;
  longevity: LongevityPreference;
  selectedNotes: string[];
};

function buildPlainText(args: Props): string {
  const { results, season, occasion, gender, longevity, selectedNotes } = args;
  const lines: string[] = [];
  lines.push("Your Scentwise Matches");
  lines.push("=======================");
  lines.push("");
  const prefs: string[] = [];
  if (gender) prefs.push(`Gender: ${gender}`);
  if (season) prefs.push(`Season: ${season}`);
  if (occasion) prefs.push(`Occasion: ${occasion}`);
  if (longevity) prefs.push(`Longevity: ${longevity}`);
  if (selectedNotes.length) prefs.push(`Notes: ${selectedNotes.join(", ")}`);
  if (prefs.length) {
    lines.push("Your preferences:");
    prefs.forEach((p) => lines.push(`  • ${p}`));
    lines.push("");
  }

  results.forEach((f, i) => {
    const score = scoreFragrance(f, season, occasion, selectedNotes, gender, longevity);
    lines.push(`${i + 1}. ${f.brand} — ${f.name}  (${score}% match)`);
    lines.push(`   ${f.concentration} · ${f.priceDisplay} · ${f.family.join(" / ")}`);
    lines.push(`   Top:   ${f.topNotes.join(", ")}`);
    lines.push(`   Heart: ${f.heartNotes.join(", ")}`);
    lines.push(`   Base:  ${f.baseNotes.join(", ")}`);
    lines.push(`   Longevity: ${f.longevity}`);
    lines.push(`   Buy: ${f.fragrancebuyLink}`);
    lines.push("");
  });

  lines.push("Discover more at Scentwise — your AI-powered fragrance guide.");
  return lines.join("\n");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function EmailResults(props: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  const body = useMemo(() => buildPlainText(props), [props]);
  const subject = "Your Scentwise fragrance matches";

  const mailtoHref = useMemo(() => {
    const target = isValidEmail(email) ? email.trim() : "";
    return `mailto:${target}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [email, body]);

  const copy = async () => {
    await navigator.clipboard.writeText(body);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const valid = isValidEmail(email);

  if (props.results.length === 0) return null;

  return (
    <div className="mt-8 rounded-2xl border bg-card p-6 shadow-scent">
      {!open ? (
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="font-serif text-xl font-bold text-foreground">
              Email these results to yourself
            </h2>
            <p className="text-sm text-muted-foreground">
              Save your matches for later — opens your email app.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            ✉ Email My Results
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground">Email My Results</h2>
              <p className="text-sm text-muted-foreground">
                Enter your email, then we'll open your mail app with everything pre-filled.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-full border bg-background px-2.5 py-1 text-sm text-muted-foreground transition hover:text-foreground"
            >
              ✕
            </button>
          </div>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Your email
            </span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-full border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>

          <details className="rounded-xl border bg-background p-3">
            <summary className="cursor-pointer text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Preview message
            </summary>
            <pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap text-xs leading-5 text-muted-foreground">
              {body}
            </pre>
          </details>

          <div className="flex flex-wrap gap-2">
            <a
              href={valid ? mailtoHref : undefined}
              aria-disabled={!valid}
              onClick={(e) => {
                if (!valid) e.preventDefault();
              }}
              className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                valid
                  ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                  : "cursor-not-allowed bg-muted text-muted-foreground"
              }`}
            >
              ✉ Open in Mail App
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex min-h-11 items-center justify-center rounded-full border bg-background px-5 py-3 text-sm font-bold text-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copied ? "✓ Copied" : "Copy to Clipboard"}
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            Tip: clicking <strong>Open in Mail App</strong> launches your default email client
            (Apple Mail, Outlook, Gmail desktop) with the message ready — just press send.
          </p>
        </div>
      )}
    </div>
  );
}
