import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

const EMAIL = "sohibcorp0706@gmail.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Scentwise — Corrections, Questions, Partnerships" },
      {
        name: "description",
        content:
          "Reach the Scentwise team by email for data corrections, fragrance questions, brand directory submissions, press and advertising enquiries.",
      },
      { property: "og:title", content: "Contact Scentwise" },
      {
        property: "og:description",
        content: "Email us about data corrections, brand submissions, press or advertising. Replies within 2 business days.",
      },
      { property: "og:url", content: "https://scentwisefragrances.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://scentwisefragrances.lovable.app/contact" }],
  }),
  component: ContactPage,
});

const REASONS = [
  {
    title: "Data corrections",
    body: "A note pyramid that is wrong, a price band that is badly out of date, a brand link that now redirects to a reseller. Include the fragrance or brand name and, where you can, a link to the source you are using. Corrections are the fastest email we answer.",
  },
  {
    title: "Brand directory submissions",
    body: "If you run or represent a fragrance house that is missing from our directory, send the official domain, country of origin, founding year and a one-line description. Listings are free and cannot be bought.",
  },
  {
    title: "Fragrance questions",
    body: "Stuck between two bottles, or trying to replace something that was discontinued? Tell us what you have worn and liked, the climate you are in and your rough budget in CAD. Our AI consultant answers instantly in the corner of every page, but we are happy to reply personally to harder cases.",
  },
  {
    title: "Advertising and press",
    body: "For advertising, sponsorship or media enquiries, email us with your outlet or company and what you have in mind. We disclose every commercial relationship on the page it affects.",
  },
  {
    title: "Privacy requests",
    body: "To ask what data we hold about you, request deletion, or raise a concern about advertising cookies, use the same address with \"Privacy\" in the subject line. See our Privacy Policy for the detail.",
  },
];

function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="scent-aura" aria-hidden="true" />
      <SiteHeader current="home" breadcrumb="Home → Contact" />

      <div className="relative z-10 mx-auto max-w-[820px] px-5 pb-16 pt-4">
        <h1 className="font-serif text-4xl font-bold sm:text-5xl">Contact Scentwise</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Scentwise is a small independent editorial project operated by So Hib Corp in Toronto, Ontario, Canada. There is no call centre
          and no ticketing system — email reaches the people who actually maintain the database, and we aim to reply
          within two business days.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-scent">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Email</p>
          <a href={`mailto:${EMAIL}`} className="mt-1 block break-all font-serif text-2xl font-bold text-primary underline">
            {EMAIL}
          </a>
          <p className="mt-3 text-sm text-muted-foreground">
            Based in Toronto, Ontario, Canada (Eastern Time). We read email Monday to Friday.
          </p>
        </div>

        <h2 className="mt-12 font-serif text-2xl font-bold">What to write about</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {REASONS.map((r) => (
            <div key={r.title} className="rounded-2xl border border-border bg-card p-5 shadow-scent">
              <h3 className="font-serif text-lg font-bold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-serif text-2xl font-bold">Before you email</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          We cannot authenticate a bottle from photographs, confirm whether a specific order will arrive, or intervene in
          a dispute with a retailer — those belong with the seller and your payment provider. If you are unsure whether a
          shop is trustworthy in the first place, read the{" "}
          <Link to="/retailers" className="font-semibold text-primary underline">retailer guide</Link> and its safe-buying
          checklist. General questions about longevity, concentrations and skin chemistry are usually answered already in
          the <Link to="/learn" className="font-semibold text-primary underline">Learn Hub</Link>.
        </p>
      </div>

      <SiteFooter />
      <ScrollToTopButton />
    </main>
  );
}
