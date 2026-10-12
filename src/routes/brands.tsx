import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BRANDS, BRANDS_UPDATED } from "../data/brands";
import { filterBrands, groupByLetter, type CategoryFilter } from "../utils/brandFilters";
import { downloadBrandsJson } from "../utils/exportJson";
import { BrandCard } from "../components/directory/BrandCard";
import { AlphabetNav } from "../components/directory/AlphabetNav";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { SITE_URL } from "../lib/site";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Official Fragrance Brand Directory — WhichScent" },
      {
        name: "description",
        content:
          "Browse official fragrance brand websites — designer, niche and luxury houses. No resellers, no marketplaces. Direct links to the source.",
      },
      { property: "og:title", content: "Official Fragrance Brand Directory — WhichScent" },
      {
        property: "og:description",
        content: "Designer, niche and luxury fragrance houses, each linked to its own website.",
      },
      { property: "og:url", content: `${SITE_URL}/brands` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/brands` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Official Fragrance Brand Directory",
          url: `${SITE_URL}/brands`,
          description:
            "Directory of official fragrance brand websites across designer, niche and luxury categories.",
        }),
      },
    ],
  }),
  component: BrandDirectory,
});

const CATEGORIES: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "designer", label: "Designer" },
  { key: "niche", label: "Niche" },
  { key: "luxury", label: "Luxury" },
];

function BrandDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const counts = useMemo(
    () => ({
      all: BRANDS.length,
      designer: BRANDS.filter((b) => b.category === "designer").length,
      niche: BRANDS.filter((b) => b.category === "niche").length,
      luxury: BRANDS.filter((b) => b.category === "luxury").length,
    }),
    [],
  );

  const filtered = useMemo(() => filterBrands(BRANDS, query, category, null), [query, category]);
  const grouped = useMemo(() => groupByLetter(filtered), [filtered]);
  const letters = useMemo(() => Object.keys(grouped).sort(), [grouped]);
  const availableLetters = useMemo(() => new Set(letters), [letters]);
  const isSearching = query.trim().length > 0;

  const lastUpdated = new Date(`${BRANDS_UPDATED}T12:00:00`).toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="scent-aura" aria-hidden="true" />

      <SiteHeader
        current="brands"
        tagline="Your guide to official fragrance houses"
        breadcrumb="Home › Brand Directory"
        right={
          <button
            type="button"
            onClick={downloadBrandsJson}
            className="rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            Download Excel
          </button>
        }
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-5 pb-20">
        {/* Hero */}
        <section className="mt-6 text-center sm:mt-12">
          <h1 className="mx-auto max-w-3xl font-serif text-4xl font-bold leading-tight text-foreground sm:text-6xl">
            {BRANDS.length} fragrance houses, straight to the source
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
            Designer, niche and luxury houses, each linked to its own website. No resellers, no
            marketplaces.
          </p>
        </section>

        {/* Category Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => {
            const active = category === c.key;
            return (
              <button
                key={c.key}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(c.key)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  active
                    ? "bg-primary text-primary-foreground shadow-scent"
                    : "bg-card text-foreground hover:bg-accent"
                }`}
              >
                {c.label}
                <span className={`ml-2 text-xs ${active ? "opacity-80" : "text-muted-foreground"}`}>
                  {counts[c.key]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="mt-6">
          <div className="relative mx-auto max-w-2xl">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brands — e.g. Creed, Byredo, Dior..."
              className="h-12 w-full rounded-full border border-border bg-card px-6 pr-12 text-base shadow-scent sm:text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring [&::-webkit-search-cancel-button]:appearance-none"
              aria-label="Search brands"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-muted p-1.5 text-muted-foreground transition hover:bg-foreground hover:text-background"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {isSearching && (
            <p className="mt-3 text-center text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "result" : "results"} for “{query}”
            </p>
          )}
        </div>

        {/* Grid. The alphabet bar lives inside it so it can stay pinned while the list scrolls. */}
        <section className={isSearching ? "mt-8" : "mt-12"}>
          {!isSearching && <AlphabetNav availableLetters={availableLetters} />}
          {filtered.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border bg-card p-10 text-center shadow-scent">
              <p className="font-serif text-2xl font-bold text-foreground">No brands found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                No matches for “{query}”. Try a different spelling or browse all brands.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
                className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover"
              >
                Browse all brands
              </button>
            </div>
          ) : (
            letters.map((letter) => (
              <div key={letter} id={`letter-${letter}`} className="mb-12 scroll-mt-20">
                <div className="mb-5 flex items-baseline gap-4">
                  <span className="font-serif text-5xl font-bold text-primary opacity-40">
                    {letter}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground">
                    {grouped[letter].length} {grouped[letter].length === 1 ? "brand" : "brands"}
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {grouped[letter].map((b) => (
                    <BrandCard key={b.id} brand={b} />
                  ))}
                </div>
              </div>
            ))
          )}
        </section>

        <section className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            Every link goes to the brand's own website, never a reseller or marketplace. Spot an
            outdated link or detail?{" "}
            <Link to="/contact" className="font-semibold text-primary hover:underline">
              Tell us
            </Link>
            .
          </p>
          <p className="mt-1">Last updated: {lastUpdated}</p>
        </section>
      </div>
      <SiteFooter />
      <ScrollToTopButton />
    </main>
  );
}
