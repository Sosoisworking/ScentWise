import { Check, Mail, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { Fragrance } from "../data/fragrances";
import { GENDER_LABEL, OCCASION_OPTIONS, SEASON_OPTIONS, WEAR_LABEL } from "../data/quizOptions";
import { SITE_URL } from "../lib/site";
import { copyText } from "../utils/clipboard";
import { PRICE_BANDS, type PriceBandId } from "../utils/price";
import type { GenderPreference, LongevityPreference } from "../utils/scoring";

type Props = {
  results: Fragrance[];
  /** "#1" or "Equal fit" for each result, as shown on the page. */
  rankLabels: string[];
  season: string;
  occasion: string;
  gender: GenderPreference;
  longevity: LongevityPreference;
  selectedNotes: string[];
  avoidedNotes?: string[];
  budget?: PriceBandId | "";
};

function buildPlainText(args: Props): string {
  const {
    results,
    rankLabels,
    season,
    occasion,
    gender,
    longevity,
    selectedNotes,
    avoidedNotes = [],
    budget = "",
  } = args;
  const lines: string[] = [];
  lines.push("Your WhichScent shortlist");
  lines.push("=========================");
  lines.push("");
  const answers: string[] = [];
  if (season)
    answers.push(`Season: ${SEASON_OPTIONS.find((o) => o.key === season)?.label ?? season}`);
  if (occasion)
    answers.push(
      `Occasion: ${OCCASION_OPTIONS.find((o) => o.key === occasion)?.label ?? occasion}`,
    );
  if (gender) answers.push(`Marketed for: ${GENDER_LABEL[gender] ?? gender}`);
  if (longevity) answers.push(`Wear time: ${WEAR_LABEL[longevity]}`);
  if (selectedNotes.length) answers.push(`Notes you love: ${selectedNotes.join(", ")}`);
  if (avoidedNotes.length) answers.push(`Notes you avoid: ${avoidedNotes.join(", ")}`);
  if (budget) answers.push(`Price: ${PRICE_BANDS.find((b) => b.id === budget)?.label}`);
  if (answers.length) {
    lines.push("Your answers:");
    answers.forEach((a) => lines.push(`  • ${a}`));
    lines.push("");
  }

  results.forEach((f, i) => {
    lines.push(`${rankLabels[i] ?? `#${i + 1}`}: ${f.brand} — ${f.name}`);
    lines.push(`   ${f.concentration} · ${f.priceDisplay} · ${f.family.join(" / ")}`);
    lines.push(`   Top:   ${f.topNotes.join(", ")}`);
    lines.push(`   Heart: ${f.heartNotes.join(", ")}`);
    lines.push(`   Base:  ${f.baseNotes.join(", ")}`);
    lines.push(`   ${WEAR_LABEL[f.longevity]}`);
    // The authorized store first, then the discounter, as on the site.
    if (f.sephoraLink) lines.push(`   Sephora Canada (authorized store): ${f.sephoraLink}`);
    lines.push(`   FragranceBuy (Canadian discounter): ${f.fragrancebuyLink}`);
    lines.push("");
  });

  lines.push(
    'Fragrances that fit who it\'s for and your wear time come first, then by how many of your notes they contain. "Equal fit" means they scored the same. Try a sample on skin before you buy a bottle.',
  );
  lines.push("");
  // The page address carries the answers, so it reopens this exact shortlist.
  lines.push(
    `Open this shortlist again: ${typeof window === "undefined" ? SITE_URL : window.location.href}`,
  );
  return lines.join("\n");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function EmailResults(props: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const body = useMemo(() => buildPlainText(props), [props]);
  const subject = "Your WhichScent fragrance shortlist";

  // The address is optional: without one, the mail app opens with the To field empty.
  const mailtoHref = useMemo(() => {
    const target = isValidEmail(email) ? email.trim() : "";
    return `mailto:${target}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [email, body]);

  const [copied, setCopied] = useState<"" | "copied" | "failed">("");
  const copy = async () => {
    setCopied((await copyText(body)) ? "copied" : "failed");
    window.setTimeout(() => setCopied(""), 2500);
  };

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
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email my results
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground">Email my results</h2>
              <p className="text-sm text-muted-foreground">
                We'll open your mail app with everything filled in. Nothing is sent from our side.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-background text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Your email (optional)
            </span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-full border bg-background px-4 py-3 text-base text-foreground sm:text-sm outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
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
              href={mailtoHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Open in mail app
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border bg-background px-5 py-3 text-sm font-bold text-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copied === "copied" ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Copied
                </>
              ) : (
                "Copy the text"
              )}
            </button>
          </div>

          <p aria-live="polite" className="text-xs text-muted-foreground">
            {copied === "failed"
              ? "Couldn't copy here. Open the preview above and copy it by hand."
              : "Open in mail app starts a new message in your email app, ready to send. If nothing opens, copy the text instead."}
          </p>
        </div>
      )}
    </div>
  );
}
