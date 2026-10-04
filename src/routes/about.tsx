import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Scentwise — Who Builds These Recommendations" },
      {
        name: "description",
        content:
          "How Scentwise scores fragrance matches, where our price and brand data comes from, how we make money, and what we will never do.",
      },
      { property: "og:title", content: "About Scentwise" },
      {
        property: "og:description",
        content: "Our scoring method, data sources, editorial rules and funding — explained in plain language.",
      },
      { property: "og:url", content: "https://scentwisefragrances.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://scentwisefragrances.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="scent-aura" aria-hidden="true" />
      <SiteHeader current="home" breadcrumb="Home → About" />

      <div className="relative z-10 mx-auto max-w-[820px] px-5 pb-16 pt-4">
        <h1 className="font-serif text-4xl font-bold sm:text-5xl">About Scentwise</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Scentwise is published by So Hib Corp in Toronto, Ontario, Canada. It exists because buying fragrance online is an unusually bad shopping experience. You cannot smell a
          web page, most "top 10" lists are affiliate rankings in disguise, and the same bottle can swing by a hundred
          dollars between two Canadian sellers in the same week. We built a tool that asks what you actually want —
          season, staying power, occasion, presentation, notes — and returns a short, honest shortlist instead of a
          catalogue.
        </p>

        <Section title="How the recommendation engine works">
          <p>
            There is no black box here. Every fragrance in our database is tagged by hand with the attributes that
            matter to a real buyer: dominant note families, projection and longevity band, the seasons where it reads
            best, the occasions it suits, gender presentation, and a Canadian price band.
          </p>
          <p>
            When you take the quiz, each candidate scent is scored across four weighted dimensions. Season fit and
            occasion fit come first, because a beautiful winter oud genuinely does not work at a July brunch. Longevity
            is matched against the staying power you asked for, rather than assuming everyone wants a twelve-hour
            monster. Note overlap is then layered on top: the more of your chosen notes a fragrance actually contains in
            a leading role, the higher it climbs. Ties break in favour of longer wear, unless you told us you wanted
            something light.
          </p>
          <p>
            The first results screen deliberately shows three price tiers — a budget gem, a best-value pick and a
            premium option — so you can see what an extra hundred dollars really buys you before you refine by notes.
          </p>
        </Section>

        <Section title="Where our data comes from">
          <p>
            Fragrance attributes come from the brands' own published note pyramids, cross-checked against community
            consensus on longevity and projection, and adjusted when our own wear-testing disagrees with the marketing
            copy. Brand directory entries — country of origin, founding year, official website — are verified against
            each brand's own site rather than aggregator databases, because aggregators are full of dead domains and
            resellers posing as official stores.
          </p>
          <p>
            Prices are shown as Canadian-dollar ranges, not exact figures, and they are indicative. Fragrance pricing
            moves constantly with grey-market supply, exchange rates and seasonal sales. We would rather tell you "this
            usually lands between $120 and $160 in Canada" than publish a precise number that is wrong by Friday.
            Always confirm the current price on the retailer's own page.
          </p>
        </Section>

        <Section title="How we stay independent">
          <p>
            No brand pays to appear in our database, and no retailer can buy a higher ranking. Placement in the quiz
            results is decided entirely by your answers and our scoring weights. The retailer guide includes sellers we
            think are worth avoiding as well as ones we like, which is the whole point of a guide.
          </p>
          <p>
            The site is free to use and is supported by advertising, and in future may include affiliate links to
            retailers. Where an affiliate relationship exists it will be disclosed on the page it appears on. Ad revenue
            never influences which fragrances the engine surfaces — the scoring code has no concept of a sponsor.
          </p>
        </Section>

        <Section title="What we will not do">
          <p>
            We do not claim fragrance is objective. Skin chemistry, memory and mood matter more than any score, and a
            92% match that you dislike on skin is a 0% match. We treat our output as a shortlist to sample, never a
            verdict. We also will not pretend to authenticate bottles we have never handled: our retailer notes describe
            reputation, sourcing model and buyer-protection policies, not a lab test.
          </p>
        </Section>

        <Section title="Start here">
          <p>
            New to fragrance? The <Link to="/learn" className="font-semibold text-primary underline">Learn Hub</Link>{" "}
            covers concentrations, longevity and skin chemistry without jargon. Know what you want and just need a good
            price? Compare sellers in the{" "}
            <Link to="/retailers" className="font-semibold text-primary underline">retailer guide</Link>. Looking for a
            brand's real website? Try the{" "}
            <Link to="/brands" className="font-semibold text-primary underline">brand directory</Link>. Questions, data
            corrections or partnership enquiries go to our{" "}
            <Link to="/contact" className="font-semibold text-primary underline">contact page</Link>.
          </p>
        </Section>
      </div>

      <SiteFooter />
      <ScrollToTopButton />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-bold">{title}</h2>
      <div className="mt-3 space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
