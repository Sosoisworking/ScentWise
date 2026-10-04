import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { SITE_URL } from "../lib/site";

export const Route = createFileRoute("/retailers")({
  head: () => ({
    meta: [
      { title: "Top Places to Buy Fragrances — Scentwise Retailer Guide" },
      {
        name: "description",
        content:
          "A neutral guide to trusted online fragrance retailers — pricing, authenticity, shipping and what each is best for.",
      },
      { property: "og:title", content: "Top Places to Buy Fragrances" },
      {
        property: "og:description",
        content:
          "Verified online fragrance retailers compared — price, authenticity and shipping at a glance.",
      },
      { property: "og:url", content: `${SITE_URL}/retailers` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/retailers` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Top Places to Buy Fragrances",
          url: `${SITE_URL}/retailers`,
          description:
            "Neutral comparison of trusted online fragrance retailers covering pricing, authenticity and shipping.",
        }),
      },
    ],
  }),
  component: RetailersPage,
});

type Retailer = {
  name: string;
  url: string;
  domain: string;
  description: string;
  pills: { price: string; authenticity: string; shipping: string };
  bestFor: string;
};

const RETAILERS: Retailer[] = [
  {
    name: "FragranceNet",
    url: "https://www.fragrancenet.com",
    domain: "fragrancenet.com",
    description:
      "US-based retailer with one of the largest online inventories, offering 40–70% off retail on authentic fragrances. Shipping can occasionally run slow, but selection is hard to beat.",
    pills: {
      price: "40–70% off retail",
      authenticity: "Verify sourcing",
      shipping: "Occasional delays",
    },
    bestFor: "Budget buyers & variety seekers",
  },
  {
    name: "FragranceBuy.ca",
    url: "https://www.fragrancebuy.ca",
    domain: "fragrancebuy.ca",
    description:
      "Canada's most trusted fragrance discounter, specialising in authentic niche and designer scents at wholesale pricing. Ships across Canada in CAD with no border surprises.",
    pills: { price: "Wholesale CAD", authenticity: "Verify sourcing", shipping: "Canada-wide" },
    bestFor: "Canadian shoppers & niche finds",
  },
  {
    name: "FragranceX",
    url: "https://www.fragrancex.com",
    domain: "fragrancex.com",
    description:
      "Global discounter with consistent pricing and reliable fulfilment across a broad inventory. A safe default for repeat purchases of staples.",
    pills: {
      price: "Consistent discounts",
      authenticity: "Verify sourcing",
      shipping: "Reliable global",
    },
    bestFor: "Dependable everyday buys",
  },
  {
    name: "Jomashop",
    url: "https://www.jomashop.com",
    domain: "jomashop.com",
    description:
      "US-based retailer known for aggressive deals on designer and luxury fragrances with strong inventory depth. Customer service experiences can vary, so review return terms before ordering.",
    pills: { price: "Aggressive deals", authenticity: "Verify sourcing", shipping: "US-based" },
    bestFor: "Deal hunters chasing luxury",
  },
  {
    name: "MaxAroma",
    url: "https://www.maxaroma.com",
    domain: "maxaroma.com",
    description:
      "Grey-market retailer sourcing designer fragrances from global distributors and excess inventory. Sister site to PerfumeSpot with overlapping catalogue and pricing.",
    pills: {
      price: "Discounted designer",
      authenticity: "Verify sourcing",
      shipping: "Standard US",
    },
    bestFor: "Designer staples at a discount",
  },
  {
    name: "PerfumeSpot",
    url: "https://www.perfumespot.com",
    domain: "perfumespot.com",
    description:
      "Sister retailer to MaxAroma offering the same grey-market sourcing model with designer-focused inventory. Useful as a price comparison against MaxAroma on the same SKU.",
    pills: {
      price: "Discounted designer",
      authenticity: "Verify sourcing",
      shipping: "Standard US",
    },
    bestFor: "Cross-checking designer prices",
  },
];

const TIPS = [
  "Check Trustpilot and Reddit (r/fragrance, r/FragranceSwap) reviews before a first-time order.",
  "Verify the batch code on checkfresh.com to confirm production date and freshness.",
  "Read the return and damage policy carefully — grey-market sellers vary.",
  "Avoid unverified third-party sellers on eBay or Amazon Marketplace; stick to the retailer's own site.",
  "Pay with a card that offers chargeback protection in case of disputes.",
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-secondary-foreground">
      {children}
    </span>
  );
}

function RetailersPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="scent-aura" aria-hidden="true" />

      <SiteHeader
        current="retailers"
        tagline="Where to buy, honestly"
        breadcrumb="Home › Retailer Guide"
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-5 pb-20">
        <section className="mt-6 text-center sm:mt-12">
          <h1 className="mx-auto max-w-3xl font-serif text-4xl font-bold leading-tight text-foreground sm:text-6xl">
            Top places to buy fragrances
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
            A short, neutral guide to the online retailers we trust — what each is good at, and what
            to watch for.
          </p>
        </section>

        {/* Retailer grid */}
        <section className="mt-12 grid gap-5 sm:grid-cols-2">
          {RETAILERS.map((r) => (
            <article
              key={r.domain}
              className="flex flex-col rounded-2xl border bg-card p-6 shadow-scent transition hover:-translate-y-0.5 hover:shadow-scent-hover"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-serif text-xl font-bold text-foreground">{r.name}</h2>
                <span className="text-xs text-muted-foreground">{r.domain}</span>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                {r.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>💸 {r.pills.price}</Pill>
                <Pill>✓ {r.pills.authenticity}</Pill>
                <Pill>📦 {r.pills.shipping}</Pill>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    Best for
                  </p>
                  <p className="text-sm font-semibold text-foreground">{r.bestFor}</p>
                </div>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Visit site →
                </a>
              </div>
            </article>
          ))}
        </section>

        {/* Independence disclaimer */}
        <section className="mt-12 rounded-2xl border border-primary/40 bg-accent p-6">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Independent retailer information
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/80">
            This directory is provided for informational purposes only. Inclusion does not
            constitute an endorsement, authorization, partnership, or guarantee of authenticity.
            Consumers should independently evaluate retailers, product sourcing, return policies,
            and authenticity before purchasing. None of the retailers listed here is described as an
            authorized retailer unless that authorization can be verified.
          </p>
          <Link
            to="/learn/$slug"
            params={{ slug: "how-to-buy-fragrance-online" }}
            className="mt-4 inline-block text-xs font-bold uppercase tracking-wide text-primary"
          >
            Read our guide to buying fragrance safely online →
          </Link>
        </section>

        {/* Disclaimer */}
        <section className="mt-6 rounded-2xl border border-border bg-secondary/40 p-6">
          <h2 className="font-serif text-xl font-bold text-foreground">
            A note on grey-market retailers
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Most discount fragrance sites — including the ones above — operate in the{" "}
            <strong className="text-foreground">grey market</strong>. That means they sell{" "}
            <strong className="text-foreground">authentic</strong> products sourced outside the
            brand's official regional distribution channels (excess inventory, parallel imports,
            international distributors). Grey-market goods are
            <strong className="text-foreground"> not counterfeit</strong>, and reselling them is
            legal in most countries. It's how prices stay well below department-store retail. The
            trade-off: no manufacturer warranty, occasional packaging variations, and return
            policies that differ from official boutiques.
          </p>
        </section>

        {/* Tips */}
        <section className="mt-10">
          <h2 className="font-serif text-2xl font-bold text-foreground">Safe buying checklist</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {TIPS.map((t, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-xl border bg-card p-4 text-sm leading-relaxed text-foreground shadow-scent"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-16 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>
            Scentwise is independent. We don't take affiliate commissions from the retailers listed
            above.
          </p>
          <Link to="/" className="mt-4 inline-block font-bold text-primary hover:underline">
            Take the quiz →
          </Link>
        </footer>
      </div>
      <SiteFooter />
      <ScrollToTopButton />
    </main>
  );
}
