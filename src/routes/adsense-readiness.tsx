import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

const STORAGE_KEY = "scentwise-adsense-checklist";

export const Route = createFileRoute("/adsense-readiness")({
  head: () => ({
    meta: [
      { title: "AdSense Readiness Checklist — Scentwise (Internal)" },
      {
        name: "description",
        content:
          "Internal Scentwise checklist tracking Google AdSense approval readiness: content depth, policy pages, crawlability, contact details and HTTPS.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "AdSense Readiness Checklist — Scentwise" },
      {
        property: "og:description",
        content: "Internal tracker for AdSense approval prerequisites.",
      },
    ],
  }),
  component: ReadinessPage,
});

type Item = { id: string; label: string; detail: string; status: "done" | "review" };

const GROUPS: { title: string; blurb: string; items: Item[] }[] = [
  {
    title: "Content volume & originality",
    blurb: "AdSense reviewers want substantial, original pages — not a thin app shell.",
    items: [
      {
        id: "content-quiz",
        label: "Guided quiz with 90+ curated fragrances",
        detail:
          "src/data/fragrances.ts holds the editorial database powering scoring in src/utils/scoring.ts.",
        status: "done",
      },
      {
        id: "content-learn",
        label: "Learn Hub with long-form educational answers",
        detail:
          "/learn covers concentrations, longevity, projection, storage and skin chemistry with FAQPage JSON-LD.",
        status: "done",
      },
      {
        id: "content-brands",
        label: "Brand directory with 80+ researched entries",
        detail:
          "/brands lists origin, founding year and official domains, searchable and A–Z navigable.",
        status: "done",
      },
      {
        id: "content-retailers",
        label: "Retailer guide with safe-buying checklist",
        detail:
          "/retailers compares major retailers and grey-market sellers with original commentary.",
        status: "done",
      },
      {
        id: "content-no-placeholder",
        label: "No lorem ipsum or placeholder copy anywhere",
        detail:
          "Spot-check each route before submitting; every section should read as written editorial.",
        status: "review",
      },
    ],
  },
  {
    title: "Policy & trust pages",
    blurb: "Required policy surfaces must be reachable from every page.",
    items: [
      {
        id: "policy-privacy",
        label: "Privacy Policy discloses cookies and third-party ad data",
        detail: "/privacy names Google AdSense, cookie use, personalised ads and opt-out routes.",
        status: "done",
      },
      {
        id: "policy-terms",
        label: "Terms of Service published",
        detail: "/terms covers acceptable use, data accuracy, AI limits and liability.",
        status: "done",
      },
      {
        id: "policy-about",
        label: "About page identifies the publisher",
        detail: "/about explains who runs Scentwise, editorial standards and independence.",
        status: "done",
      },
      {
        id: "policy-disclosure",
        label: "Affiliate / advertising relationships disclosed",
        detail:
          "Disclosure appears in Terms §7 and the Privacy Policy; repeat it on any page that carries an affiliate link.",
        status: "review",
      },
    ],
  },
  {
    title: "Crawlability & indexing",
    blurb: "Googlebot must see rendered HTML, not just JavaScript.",
    items: [
      {
        id: "crawl-ssr",
        label: "All routes server-rendered (SSR)",
        detail: "TanStack Start renders real HTML per route — no client-only shell.",
        status: "done",
      },
      {
        id: "crawl-robots",
        label: "robots.txt allows Googlebot and declares the sitemap",
        detail:
          "/robots.txt (server route): Allow: / plus the sitemap directive on the configured site URL.",
        status: "done",
      },
      {
        id: "crawl-sitemap",
        label: "XML sitemap lists every indexable route",
        detail:
          "src/routes/sitemap[.]xml.ts — keep in sync when routes change. This internal page stays out of it.",
        status: "done",
      },
      {
        id: "crawl-meta",
        label: "Unique title, description and canonical per page",
        detail: "Each route defines its own head() with canonical and Open Graph tags.",
        status: "done",
      },
      {
        id: "crawl-gsc",
        label: "Site verified in Google Search Console",
        detail: "External step: add the property and submit the sitemap once published.",
        status: "review",
      },
    ],
  },
  {
    title: "Contact & identity",
    blurb: "Reviewers check that a real person can be reached.",
    items: [
      {
        id: "contact-page",
        label: "Contact page with a working email address",
        detail: "/contact lists a monitored mailbox and what to write about.",
        status: "done",
      },
      {
        id: "contact-location",
        label: "Publisher location and entity stated",
        detail: "So Hib Corp, Toronto, Ontario, Canada — appears on About, Contact and Terms.",
        status: "done",
      },
      {
        id: "contact-links",
        label: "Header and footer navigation has no broken links",
        detail: "Every nav and footer target resolves to a real route.",
        status: "done",
      },
    ],
  },
  {
    title: "Delivery & UX",
    blurb: "Technical hygiene that AdSense and Core Web Vitals both reward.",
    items: [
      {
        id: "ux-https",
        label: "HTTPS enforced with a valid certificate",
        detail: "Vercel hosting and custom domains are HTTPS-only with automatic certificates.",
        status: "done",
      },
      {
        id: "ux-mobile",
        label: "Fully mobile-responsive layouts",
        detail: "Re-check the quiz, results grid and directory at 375px width before submitting.",
        status: "review",
      },
      {
        id: "ux-ads-txt",
        label: "ads.txt added after AdSense issues a publisher ID",
        detail: "Post-approval step: serve public/ads.txt with your pub-XXXX line.",
        status: "review",
      },
    ],
  },
];

const ALL_IDS = GROUPS.flatMap((g) => g.items.map((i) => i.id));

function ReadinessPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* ignore corrupt state */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      /* storage unavailable */
    }
  }, [checked, hydrated]);

  const toggle = (id: string) => setChecked((c) => ({ ...c, [id]: !c[id] }));
  const complete = ALL_IDS.filter((id) => checked[id]).length;
  const percent = Math.round((complete / ALL_IDS.length) * 100);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="scent-aura" aria-hidden="true" />
      <SiteHeader current="home" breadcrumb="Home → AdSense readiness (internal)" />

      <div className="relative z-10 mx-auto max-w-[880px] px-5 pb-16 pt-4">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Internal · not indexed
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">
          AdSense readiness checklist
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A working tracker for the things Google checks before approving a site for AdSense. Items
          marked <span className="font-semibold text-foreground">Shipped</span> are already
          implemented in this project; items marked{" "}
          <span className="font-semibold text-foreground">Verify</span> need a human pass or an
          external step. Your ticks are saved in this browser only.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-scent">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-serif text-2xl font-bold">
              {complete} of {ALL_IDS.length} confirmed
            </p>
            <p className="text-sm font-bold text-muted-foreground">{percent}%</p>
          </div>
          <div
            className="mt-3 h-2 overflow-hidden rounded-full bg-accent"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Checklist completion"
          >
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setChecked(Object.fromEntries(ALL_IDS.map((id) => [id, true])))}
              className="rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Mark all complete
            </button>
            <button
              type="button"
              onClick={() => setChecked({})}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs font-bold uppercase tracking-wide text-card-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Clear all
            </button>
          </div>
        </div>

        {GROUPS.map((group) => {
          const groupDone = group.items.filter((i) => checked[i.id]).length;
          return (
            <section key={group.title} className="mt-12">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-serif text-2xl font-bold">{group.title}</h2>
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {groupDone}/{group.items.length}
                </p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{group.blurb}</p>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => {
                  const isChecked = Boolean(checked[item.id]);
                  return (
                    <li key={item.id}>
                      <label
                        className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 shadow-scent transition ${
                          isChecked
                            ? "border-primary bg-accent"
                            : "border-border bg-card hover:border-primary"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(item.id)}
                          className="mt-1 h-5 w-5 shrink-0 accent-primary"
                        />
                        <span>
                          <span className="flex flex-wrap items-center gap-2">
                            <span
                              className={`font-semibold ${isChecked ? "text-foreground" : "text-card-foreground"}`}
                            >
                              {item.label}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                                item.status === "done"
                                  ? "bg-primary text-primary-foreground"
                                  : "border border-border text-muted-foreground"
                              }`}
                            >
                              {item.status === "done" ? "Shipped" : "Verify"}
                            </span>
                          </span>
                          <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                            {item.detail}
                          </span>
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}

        <p className="mt-12 text-sm text-muted-foreground">
          Review the live pages as you tick items:{" "}
          <Link to="/privacy" className="font-semibold text-primary underline">
            Privacy
          </Link>
          ,{" "}
          <Link to="/terms" className="font-semibold text-primary underline">
            Terms
          </Link>
          ,{" "}
          <Link to="/about" className="font-semibold text-primary underline">
            About
          </Link>{" "}
          and{" "}
          <Link to="/contact" className="font-semibold text-primary underline">
            Contact
          </Link>
          .
        </p>
      </div>

      <SiteFooter />
      <ScrollToTopButton />
    </main>
  );
}
