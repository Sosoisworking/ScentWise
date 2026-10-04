import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { ArticleCard } from "../components/article/ArticleCard";
import { ARTICLES, AUTHOR, CATEGORIES, type ArticleCategory } from "../data/articles";

const SITE = "https://scentwisefragrances.lovable.app";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "Fragrance Learn Hub: Guides, Comparisons & FAQs — Scentwise" },
      {
        name: "description",
        content:
          "Editorial fragrance guides on concentrations, longevity, seasonal picks under $150 CAD, designer vs niche, dupes and buying safely online — plus plain-English FAQs.",
      },
      { property: "og:title", content: "Fragrance Learn Hub — Scentwise" },
      {
        property: "og:description",
        content:
          "Human-reviewed fragrance guides: EDT vs EDP, longevity, summer and winter picks, designer vs niche, dupes and safe online buying.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/learn` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/learn` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Fragrance Learn Hub",
          url: `${SITE}/learn`,
          hasPart: ARTICLES.map((a) => ({
            "@type": "Article",
            headline: a.title,
            url: `${SITE}/learn/${a.slug}`,
            datePublished: a.published,
            dateModified: a.updated,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: TOPICS.flatMap((t) =>
            t.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          ),
        }),
      },
    ],
  }),
  component: LearnPage,
});

type FAQ = { q: string; a: string };
type Topic = {
  id: string;
  title: string;
  intro: string;
  faqs: FAQ[];
  tips: string[];
};

const TOPICS: Topic[] = [
  {
    id: "longevity",
    title: "Scent Longevity & How to Improve It",
    intro:
      "Longevity is the #1 frustration new fragrance buyers report. It's mostly driven by concentration, base notes, skin type and application technique — not just price.",
    faqs: [
      {
        q: "Why does my perfume disappear after 1 hour?",
        a: "Most likely it's a top-note-heavy fresh fragrance (citrus, aquatic) on dry skin. Light molecules evaporate fast, and dehydrated skin holds scent poorly. Try moisturising first and layering 2–3 sprays on pulse points plus clothing.",
      },
      {
        q: "How can I make my fragrance last all day?",
        a: "Apply to moisturised skin straight after a shower, spray onto fabric (scarf, hoodie lining), and reapply once mid-afternoon. Heavier base notes — oud, amber, vanilla, musk — naturally last 8+ hours.",
      },
      {
        q: "Does spraying on clothes ruin perfume?",
        a: "It can stain delicate or pale fabrics, but cotton and wool hold scent for days with no damage. Test on an inside seam first.",
      },
      {
        q: "Why do some fragrances vanish on me but last on others?",
        a: "Skin pH, sebum production, hydration and diet all change how molecules evaporate. Dry, alkaline skin burns through scent faster than oily, slightly acidic skin.",
      },
    ],
    tips: [
      "Moisturise first — hydrated skin holds scent longer",
      "Spray pulse points + one fabric spot (scarf, collar)",
      "Carry a 5ml decant for a mid-day refresh",
      "Store bottles cool & dark — heat kills longevity",
    ],
  },
  {
    id: "concentrations",
    title: "EDT vs EDP vs Parfum — Concentration Differences",
    intro:
      "The label tells you roughly how much perfume oil is in the bottle, which influences strength, longevity and price — but never guarantees any of them.",
    faqs: [
      {
        q: "What's the actual difference between EDT and EDP?",
        a: "Eau de Toilette is roughly 5–15% perfume oil and often lasts 3–5 hours; Eau de Parfum is roughly 15–20% and often lasts 6–8 hours. EDP usually smells richer, while EDT feels lighter and fresher.",
      },
      {
        q: "Is Parfum just a stronger EDP?",
        a: "Parfum (or Extrait) is generally 20–40% oil — denser and longer-lasting, but often closer to the skin rather than louder. It's usually the most expensive tier per ml.",
      },
      {
        q: "Is EDP always better than EDT?",
        a: "No. Many citrus and aquatic scents are designed as EDT and lose their sparkle in EDP form. Choose by season and use case, not just strength.",
      },
      {
        q: "Is Cologne the same as EDT?",
        a: "Eau de Cologne is lighter still (roughly 2–5% oil). Colloquially 'cologne' means any masculine fragrance, but technically it's the weakest concentration.",
      },
    ],
    tips: [
      "Hot weather → EDT; cold weather → EDP/Parfum",
      "Office or gym → EDT (less projection)",
      "Date night or evening → EDP/Parfum",
      "Compare $/ml, not bottle price, across concentrations",
    ],
  },
  {
    id: "chemistry",
    title: "How Personal Chemistry Affects Fragrance",
    intro:
      "Two people can wear the exact same perfume and smell different. Skin pH, oil levels, hormones and diet all change how the molecules unfold.",
    faqs: [
      {
        q: "Why does the same perfume smell different on me than on my friend?",
        a: "Your skin's natural oils and pH interact with fragrance molecules, amplifying some notes and muting others. Oily skin tends to project more; dry skin can reveal base notes faster.",
      },
      {
        q: "Why does perfume smell amazing in the bottle but bad on me?",
        a: "What you smell from the bottle is mostly top notes. On skin, your chemistry develops the heart and base — which may clash with your natural scent.",
      },
      {
        q: "Do hormones change how I smell?",
        a: "Pregnancy, menstrual cycle, menopause and stress can all shift skin pH and sebum, which is why a beloved fragrance can suddenly smell 'off'.",
      },
      {
        q: "Can I change my skin chemistry?",
        a: "Not permanently, but moisturising, staying hydrated and using unscented body wash gives fragrance a more neutral canvas.",
      },
    ],
    tips: [
      "Always sample on skin for 4+ hours before buying",
      "Test on a clean, unscented arm — not a paper strip",
      "Don't judge a scent in the first 15 minutes",
      "Use unscented moisturiser before applying",
    ],
  },
  {
    id: "seasons",
    title: "Seasonal & Occasion-Based Wear",
    intro:
      "Temperature changes how fragrance projects. Heat amplifies sweet and heavy notes, while cold can mute fresh ones. Matching scent to context is the easiest upgrade you can make.",
    faqs: [
      {
        q: "What's the best fragrance for summer?",
        a: "Citrus, aquatic, green and light floral EDTs. They stay refreshing in heat without becoming cloying.",
      },
      {
        q: "What should I wear in winter?",
        a: "Warm, resinous, gourmand and woody EDPs. Oud, amber, vanilla, tobacco and incense tend to bloom in cold, dry air.",
      },
      {
        q: "Can I wear the same fragrance year-round?",
        a: "Some flexible scents (musks, soft woods, light ambers) work in any season, but most people are happier with a small rotation — one fresh, one warm, one signature.",
      },
      {
        q: "What's appropriate for the office?",
        a: "Skin-scents and soft musks that stay within arm's reach. Avoid heavy gourmands and anything with strong projection.",
      },
    ],
    tips: [
      "Build a 4-scent wardrobe: fresh, warm, work, evening",
      "Spray less in summer, a little more in winter",
      "Office: 1 spray. Date: 2–3 sprays.",
      "Try seasonal samples before committing to a full bottle",
    ],
  },
];

function LearnPage() {
  const [category, setCategory] = useState<ArticleCategory | "All">("All");
  const visible = category === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === category);
  const filters: (ArticleCategory | "All")[] = ["All", ...CATEGORIES];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader current="learn" tagline="Fragrance Learn Hub" breadcrumb="Home › Learn" />

      <div className="mx-auto w-full max-w-[1100px] px-5 pb-4 pt-4">
        <h1 className="mt-2 font-serif text-4xl font-bold leading-tight sm:text-6xl">Fragrance Learn Hub</h1>
        <p className="mt-4 max-w-[660px] text-base leading-relaxed text-muted-foreground">
          In-depth, human-reviewed guides to choosing, wearing and buying fragrance — plus plain-English answers to the
          questions people actually search for. No sponsored placements, no invented reviews.{" "}
          <Link to="/editorial-policy" className="font-semibold text-primary underline underline-offset-2">
            How we work
          </Link>
          .
        </p>

        <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
          {filters.map((item) => {
            const active = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={active}
                className={
                  active
                    ? "rounded-full border border-primary bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary-foreground"
                    : "rounded-full border border-border bg-card px-4 py-2 text-xs font-bold uppercase tracking-wide text-card-foreground transition hover:border-primary hover:bg-accent"
                }
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <section className="mx-auto w-full max-w-[1100px] px-5 pb-16 pt-6">
        <h2 className="sr-only">Articles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((article, index) => (
            <ArticleCard key={article.slug} article={article} priority={index === 0} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-5 pb-8">
        <div className="rounded-3xl border border-primary/30 bg-accent p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">Ready to find your match?</h2>
          <p className="mt-3 max-w-[560px] text-sm leading-relaxed text-foreground/80">
            The guided quiz turns everything in these guides into a shortlist: pick your season, longevity, occasion and
            notes, and see fragrances ranked by fit with CAD price ranges and where to buy.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/"
              className="rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wide text-primary-foreground transition hover:bg-primary-hover"
            >
              Start the quiz
            </Link>
            <Link
              to="/brands"
              className="rounded-full border border-border bg-background px-5 py-3 text-xs font-bold uppercase tracking-wide transition hover:border-primary"
            >
              Brand directory
            </Link>
            <Link
              to="/retailers"
              className="rounded-full border border-border bg-background px-5 py-3 text-xs font-bold uppercase tracking-wide transition hover:border-primary"
            >
              Where to buy
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1100px] space-y-8 px-5 pb-24">
        <div>
          <h2 className="font-serif text-3xl font-bold">Quick answers</h2>
          <p className="mt-3 max-w-[640px] text-sm leading-relaxed text-muted-foreground">
            Short answers to the questions we get asked most. For the long versions, read the guides above.
          </p>
        </div>

        {TOPICS.map((topic) => (
          <section key={topic.id} id={topic.id} className="scroll-mt-24 rounded-3xl border bg-card p-6 shadow-scent sm:p-8">
            <h3 className="font-serif text-2xl font-bold">{topic.title}</h3>
            <p className="mt-3 max-w-[680px] text-sm leading-relaxed text-muted-foreground">{topic.intro}</p>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <dl className="space-y-5">
                {topic.faqs.map((f) => (
                  <div key={f.q} className="border-l-2 border-primary/40 pl-4">
                    <dt className="font-serif text-lg font-bold text-foreground">{f.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
                  </div>
                ))}
              </dl>
              <aside className="rounded-2xl border bg-background p-5">
                <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Practical tips</h4>
                <ul className="mt-3 space-y-2 text-sm text-foreground">
                  {topic.tips.map((tip) => (
                    <li key={tip} className="flex gap-2">
                      <span aria-hidden className="text-primary">
                        ✦
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>
        ))}

        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-bold">Who writes these guides</h2>
          <p className="mt-3 max-w-[680px] text-sm leading-relaxed text-muted-foreground">
            {AUTHOR.name} — {AUTHOR.bio} Every article is reviewed by a person before publication. Our{" "}
            <Link to="/editorial-policy" className="font-semibold text-primary underline underline-offset-2">
              editorial policy
            </Link>{" "}
            explains our research, review and corrections process, including where AI tools assist with research and
            drafting.
          </p>
        </section>
      </div>

      <SiteFooter />
      <ScrollToTopButton />
    </main>
  );
}
