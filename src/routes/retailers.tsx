import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CROSS_BORDER_RULES,
  RETAILERS,
  RETAILERS_CHECKED,
  RETAILER_KINDS,
  SOURCES,
  WARNING_SIGNS,
  type RetailerKind,
} from "../data/retailers";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { SITE_URL } from "../lib/site";

export const Route = createFileRoute("/retailers")({
  head: () => ({
    meta: [
      { title: "Where to Buy Fragrance in Canada — WhichScent Retailer Guide" },
      {
        name: "description",
        content:
          "Canadian stores, Canadian discounters and US sites compared: shipping, returns, what a US order really costs, and the warning signs of fake-perfume shops.",
      },
      { property: "og:title", content: "Where to Buy Fragrance in Canada" },
      {
        property: "og:description",
        content: "Canadian stores first, then discounters, then what a US order really costs.",
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
          name: "Where to Buy Fragrance in Canada",
          url: `${SITE_URL}/retailers`,
          description:
            "Canadian fragrance retailers compared on shipping and returns, with cross-border duty and tax rules for US orders.",
        }),
      },
    ],
  }),
  component: RetailersPage,
});

const KIND_ORDER: RetailerKind[] = ["authorized", "discounter", "cross-border"];

const checkedOn = new Date(`${RETAILERS_CHECKED}T12:00:00`).toLocaleDateString("en-CA", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

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
            Where to buy fragrance in Canada
          </h1>
          <p className="mx-auto mt-5 max-w-[34rem] text-base text-muted-foreground">
            Canadian stores first, then discounters, then what an order from the US really costs.
            Shipping and return terms were checked on {checkedOn}; they change, so confirm at
            checkout.
          </p>
        </section>

        {KIND_ORDER.map((kind) => (
          <section key={kind} className="mt-14" aria-labelledby={`kind-${kind}`}>
            <h2 id={`kind-${kind}`} className="font-serif text-3xl font-bold text-foreground">
              {RETAILER_KINDS[kind].title}
            </h2>
            <p className="mt-3 max-w-[34rem] text-base leading-relaxed text-muted-foreground">
              {RETAILER_KINDS[kind].intro}
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {RETAILERS.filter((r) => r.kind === kind).map((r) => (
                <article
                  key={r.domain}
                  className="flex flex-col rounded-2xl border bg-card p-6 shadow-scent"
                >
                  <h3 className="font-serif text-xl font-bold text-foreground">{r.name}</h3>
                  <p className="text-sm text-muted-foreground">{r.domain}</p>
                  <p className="mt-3 text-sm leading-relaxed text-card-foreground">{r.summary}</p>
                  <dl className="mt-4 flex-1 space-y-3 text-sm leading-relaxed">
                    <div>
                      <dt className="font-semibold text-foreground">Shipping</dt>
                      <dd className="text-muted-foreground">{r.shipping}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-foreground">Returns</dt>
                      <dd className="text-muted-foreground">{r.returns}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-foreground">Best for</dt>
                      <dd className="text-muted-foreground">{r.bestFor}</dd>
                    </div>
                  </dl>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border bg-card px-4 text-sm font-bold text-card-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Visit {r.name} →
                  </a>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-16" aria-labelledby="landed-cost">
          <h2 id="landed-cost" className="font-serif text-3xl font-bold text-foreground">
            What a US order really costs
          </h2>
          <p className="mt-3 max-w-[34rem] text-base leading-relaxed text-muted-foreground">
            The price on a US site is rarely what you pay. These rules decide what's added when the
            parcel reaches Canada.
          </p>
          <dl className="mt-6 grid gap-4 md:grid-cols-2">
            {CROSS_BORDER_RULES.map((rule) => (
              <div key={rule.title} className="rounded-2xl border bg-card p-5 shadow-scent">
                <dt className="font-semibold text-foreground">{rule.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{rule.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-[34rem] text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Example:</strong> a C$180 bottle made in France,
            sent to Ontario by courier, adds about C$11.70 in duty and C$24.92 in HST, so roughly
            C$217 before any brokerage fee. The same bottle from a Canadian shop has no duty or
            border fee.
          </p>
        </section>

        <section className="mt-16" aria-labelledby="avoid">
          <h2 id="avoid" className="font-serif text-3xl font-bold text-foreground">
            Shops to avoid: the warning signs
          </h2>
          <p className="mt-3 max-w-[34rem] text-base leading-relaxed text-muted-foreground">
            Fake perfume is usually sold through convincing copies of real shops. These warning
            signs draw largely on the Canadian Anti-Fraud Centre's guidance:
          </p>
          <ul className="mt-5 max-w-[40rem] list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground">
            {WARNING_SIGNS.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>
          <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-muted-foreground">
            If a bottle turns out to be fake, stop using it, contact your card issuer, and report it
            to the{" "}
            <a
              href="https://antifraudcentre-centreantifraude.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              Canadian Anti-Fraud Centre
            </a>{" "}
            (1-888-495-8501).
          </p>
        </section>

        <section className="mt-16 rounded-2xl border bg-card p-6 shadow-scent">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Grey market isn't the same as fake
          </h2>
          <p className="mt-3 max-w-[40rem] text-sm leading-relaxed text-muted-foreground">
            Discounters sell genuine bottles bought outside the brand's official Canadian
            distribution: excess stock, parallel imports and international distributors. That's
            legal in Canada and it's how prices stay below department-store retail. The trade-offs
            are no brand warranty, occasional packaging differences and stricter returns. Our{" "}
            <Link
              to="/learn/$slug"
              params={{ slug: "how-to-buy-fragrance-online" }}
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              guide to buying fragrance online in Canada
            </Link>{" "}
            goes further.
          </p>
        </section>

        <footer className="mt-16 border-t border-border pt-8 text-sm text-muted-foreground">
          <p>
            WhichScent is independent. We don't earn commission from any shop listed here, and
            listing a shop isn't an endorsement.
          </p>
          <h2 className="mt-6 font-semibold text-foreground">Sources</h2>
          <ul className="mt-2 space-y-1">
            {SOURCES.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
          <Link to="/" className="mt-6 inline-block font-bold text-primary hover:underline">
            Take the quiz →
          </Link>
        </footer>
      </div>
      <SiteFooter />
      <ScrollToTopButton />
    </main>
  );
}
