import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { AUTHOR } from "../data/articles";
import { SITE_URL } from "../lib/site";

export const Route = createFileRoute("/editorial-policy")({
  head: () => ({
    meta: [
      { title: "Editorial Policy: How We Research & Review Articles — Scentwise" },
      {
        name: "description",
        content:
          "How Scentwise researches, drafts, reviews and corrects its fragrance articles, where AI tools are used, and what we deliberately never claim.",
      },
      { property: "og:title", content: "Scentwise Editorial Policy" },
      {
        property: "og:description",
        content:
          "Our research process, review process, corrections policy and disclosure about AI-assisted drafting.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${SITE_URL}/editorial-policy` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/editorial-policy` }],
  }),
  component: EditorialPolicyPage,
});

const SECTIONS = [
  {
    title: "How articles are researched",
    body: [
      "Every article starts with the questions readers actually ask — in search, on Reddit's fragrance communities, on Fragrantica forums, and in messages sent to us through our contact page.",
      "We research each topic using brand-published product information, retailer listings, perfumery reference material and widely documented consumer experience. Where a claim is contested or varies by person (longevity, projection, skin chemistry), we describe it as variable rather than stating it as fact.",
      "Prices are described in Canadian dollars as ranges and are explicitly labelled as subject to change, because fragrance pricing moves constantly across retailers and promotions.",
    ],
  },
  {
    title: "How content is reviewed",
    body: [
      "No article is published automatically. A member of the editorial team reads every piece before it goes live and checks it for accuracy, clarity, unsupported claims, and anything that reads as promotional rather than informative.",
      "We check that recommendations are framed as options to consider rather than instructions, that product claims stay within what a brand or retailer actually states, and that nothing implies testing or expertise we do not have.",
    ],
  },
  {
    title: "How AI tools may be used",
    body: [
      "We use AI tools in the same way we use search engines and reference books: to gather background, summarise source material, suggest structure and check grammar.",
      "AI output is never published as-is. Editorial articles on this site are human-reviewed before publication, and a human is responsible for every factual claim that remains in the final text.",
    ],
  },
  {
    title: "How corrections are handled",
    body: [
      "If you spot an error, email us and we will check it. When we change a published article's substance, we update the 'Updated' date shown on the article and, for material corrections, note what changed.",
      "We remove or rewrite content that we can no longer support, rather than leaving it live with a caveat.",
    ],
  },
  {
    title: "What we never claim",
    body: [
      "We do not claim perfumery certifications, industry affiliations, laboratory testing, or long-term product testing that we have not carried out. We do not publish invented reviews, ratings, testimonials or statistics.",
      "We are an independent guide. We are not owned by, or affiliated with, any perfume house or retailer, and inclusion in our brand or retailer directories is never sold.",
    ],
  },
];

function EditorialPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader
        current="learn"
        tagline="Editorial standards"
        breadcrumb="Home › Learn › Editorial Policy"
      />
      <div className="mx-auto max-w-[760px] px-5 pb-20 pt-4">
        <h1 className="font-serif text-3xl font-bold leading-tight sm:text-5xl">
          Editorial policy
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Scentwise publishes editorial articles about choosing, wearing and buying fragrance. This
          page explains how that content is made, reviewed and corrected, so you can judge how much
          weight to give it.
        </p>

        <div className="mt-10 space-y-9">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-2xl font-bold text-foreground">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-[15px] leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-3xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl font-bold">Who writes here</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Articles are credited to the <strong className="text-foreground">{AUTHOR.name}</strong>.{" "}
            {AUTHOR.bio}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/learn"
              className="rounded-full border border-border bg-background px-4 py-2 text-xs font-bold uppercase tracking-wide transition hover:border-primary"
            >
              Learn hub
            </Link>
            <Link
              to="/contact"
              className="rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary-foreground transition hover:bg-primary-hover"
            >
              Report a correction
            </Link>
          </div>
        </section>
      </div>
      <SiteFooter />
      <ScrollToTopButton />
    </main>
  );
}
