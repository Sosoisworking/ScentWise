import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { SITE_URL } from "../lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About WhichScent — Who Builds These Recommendations" },
      {
        name: "description",
        content:
          "How WhichScent scores fragrance matches, where our price and brand data comes from, how we make money, and what we will never do.",
      },
      { property: "og:title", content: "About WhichScent" },
      {
        property: "og:description",
        content:
          "Our scoring method, data sources, editorial rules and funding — explained in plain language.",
      },
      { property: "og:url", content: `${SITE_URL}/about` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="scent-aura" aria-hidden="true" />
      <SiteHeader current="about" breadcrumb="Home › About" />

      <div className="relative z-10 mx-auto max-w-[820px] px-5 pb-16 pt-4">
        <h1 className="font-serif text-4xl font-bold sm:text-5xl">About WhichScent</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          WhichScent is published by So Hib Corp in Toronto, Ontario, Canada. It exists because
          buying fragrance online is an unusually bad shopping experience. You cannot smell a web
          page, most "top 10" lists are affiliate rankings in disguise, and the same bottle can
          swing by a hundred dollars between two Canadian sellers in the same week. We built a tool
          that asks what you actually want — season, staying power, occasion, presentation, notes —
          and returns a short, honest shortlist instead of a catalogue.
        </p>

        <Section title="How the recommendation engine works">
          <p>
            There is no black box here. Every fragrance in our database carries the attributes that
            matter to a real buyer: its note pyramid and scent family, how long it lasts, the
            seasons where it reads best, the occasions it suits, who it's marketed for, and a
            typical Canadian price range. Every addition is reviewed by a person before it goes
            live.
          </p>
          <p>
            Each fragrance gets a fit score out of 100 from five of your answers. The notes you love
            count most: 30 points, or more if you skip longevity or choose No preference for who
            it's marketed for, and a note in the base of the pyramid counts a little more than one
            that fades in the first few minutes. Occasion is worth 20 to 25 points, season 15, who
            it's marketed for 20, and staying power 15. A near miss, like medium wear when you asked
            for long, earns partial credit. Anything containing a note you said to avoid is removed
            entirely.
          </p>
          <p>
            Results that fit who it's marketed for and the wear time you chose always come first;
            anything that misses either sits below them, and its card says so. Within each group, a
            fragrance with more of your loved notes ranks higher, the fit score orders the rest, and
            longer wear breaks a tie unless you asked for something light. Fragrances that still
            score exactly the same are shown together as an <strong>equal fit</strong>, without
            numbers, because ranking them would claim a difference we can't measure.
          </p>
          <p>
            The first picks show the best fit at three price points (under $100, $100 to $200, and
            $200 and up, by the lowest price you can usually find it for in Canada) so you can see
            what extra money buys before you refine by notes. They win any tie in your shortlist,
            and any that don't make it are shown below it, so a pick you liked never disappears.
          </p>
        </Section>

        <Section title="Where our data comes from">
          <p>
            Notes come from each brand's published note pyramid. Longevity, season and occasion tags
            are our editorial judgement, not lab measurements, and skin chemistry will move them
            either way. The brand directory links every brand to its own website rather than to
            resellers or aggregator listings, which are full of dead domains and resellers posing as
            official stores.
          </p>
          <p>
            Prices are shown as Canadian-dollar ranges, not exact figures, and they are indicative.
            Fragrance pricing moves constantly with grey-market supply, exchange rates and seasonal
            sales. We would rather tell you "this usually lands between $120 and $160 in Canada"
            than publish a precise number that is wrong by Friday. Always confirm the current price
            on the retailer's own page.
          </p>
        </Section>

        <Section title="How we stay independent">
          <p>
            No brand pays to appear in our database, and no retailer can buy a higher ranking.
            Placement in the quiz results is decided entirely by your answers and our scoring
            weights. The retailer guide covers Canadian stores, discounters and US sites alike, and
            lists the warning signs of shops to avoid.
          </p>
          <p>
            The site is free to use and is supported by advertising, and in future may include
            affiliate links to retailers. Where an affiliate relationship exists it will be
            disclosed on the page it appears on. Ad revenue never influences which fragrances the
            engine surfaces — the scoring code has no concept of a sponsor.
          </p>
        </Section>

        <Section title="What we will not do">
          <p>
            We do not claim fragrance is objective. Skin chemistry, memory and mood matter more than
            any score, and a top-ranked match that you dislike on skin is no match at all. We treat
            our output as a shortlist to sample, never a verdict. We also will not pretend to
            authenticate bottles we have never handled: our retailer notes describe reputation,
            sourcing model and buyer-protection policies, not a lab test.
          </p>
        </Section>

        <Section title="Start here">
          <p>
            New to fragrance? The{" "}
            <Link to="/learn" className="font-semibold text-primary underline">
              Learn Hub
            </Link>{" "}
            covers concentrations, longevity and skin chemistry without jargon. Know what you want
            and just need a good price? Compare sellers in the{" "}
            <Link to="/retailers" className="font-semibold text-primary underline">
              retailer guide
            </Link>
            . Looking for a brand's real website? Try the{" "}
            <Link to="/brands" className="font-semibold text-primary underline">
              brand directory
            </Link>
            . Questions, data corrections or partnership enquiries go to our{" "}
            <Link to="/contact" className="font-semibold text-primary underline">
              contact page
            </Link>
            .
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
      <div className="mt-3 space-y-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}
