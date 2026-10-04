import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

const EMAIL = "sohibcorp0706@gmail.com";
const UPDATED = "August 4, 2026";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Cookies & Ad Data | Scentwise" },
      {
        name: "description",
        content:
          "How Scentwise handles data: cookies, Google AdSense and third-party ad vendors, AI consultant chat data, analytics, your choices and how to contact us.",
      },
      { property: "og:title", content: "Scentwise Privacy Policy" },
      {
        property: "og:description",
        content: "Cookies, third-party advertising data, AI chat handling and your privacy choices on Scentwise.",
      },
      { property: "og:url", content: "https://scentwisefragrances.lovable.app/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://scentwisefragrances.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="scent-aura" aria-hidden="true" />
      <SiteHeader current="home" breadcrumb="Home → Privacy Policy" />

      <div className="relative z-10 mx-auto max-w-[820px] px-5 pb-16 pt-4">
        <h1 className="font-serif text-4xl font-bold sm:text-5xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {UPDATED}</p>
        <p className="mt-4 text-lg text-muted-foreground">
          This policy explains what Scentwise collects when you use this site, what our advertising and infrastructure
          partners collect, and the choices you have. It is written to be read, not to be skimmed past — if anything here
          is unclear, email us at{" "}
          <a href={`mailto:${EMAIL}`} className="font-semibold text-primary underline">{EMAIL}</a>.
        </p>

        <S title="Who we are">
          <p>
            Scentwise is an independent fragrance discovery and education site operated by So Hib Corp in Toronto, Ontario, Canada.
            For the purposes of Canadian privacy law (PIPEDA) and the EU/UK GDPR, Scentwise is the data controller for
            the limited personal information described below. Our advertising and hosting partners act as independent
            controllers or processors for the data they collect, as described in their own policies.
          </p>
        </S>

        <S title="What we collect directly">
          <p>
            <strong className="text-foreground">Quiz answers.</strong> The season, longevity, occasion, presentation and
            note selections you make are held in your browser for the length of your session so the tool can score
            matches. They are not tied to an account, because there are no accounts on this site.
          </p>
          <p>
            <strong className="text-foreground">AI consultant messages.</strong> When you use the chat consultant, the
            messages you type are sent to our server and forwarded to our AI model provider to generate a reply. We do
            not store transcripts for marketing, and we do not attach your name or email to them. Please do not type
            sensitive personal information into the chat.
          </p>
          <p>
            <strong className="text-foreground">Email you send us.</strong> If you email us — including via the "email my
            results" feature, which composes a message in your own mail client — we receive whatever you choose to send
            and keep it only as long as needed to answer you.
          </p>
          <p>
            <strong className="text-foreground">No account data.</strong> Scentwise has no sign-up, no password and no
            newsletter database. We do not sell personal information, and we do not knowingly collect information from
            children under 13.
          </p>
        </S>

        <S title="Cookies and similar technologies">
          <p>
            A cookie is a small file a site or its partners store on your device. Scentwise itself relies mainly on your
            browser's local storage to remember quiz progress and interface preferences — strictly functional, and no use
            for tracking you across other sites.
          </p>
          <p>
            Our partners, however, do set cookies and read device identifiers. This includes advertising cookies,
            analytics cookies and security cookies set by our host and content delivery network. You can block or delete
            cookies at any time in your browser settings; functional storage aside, the site keeps working without them,
            though ads may become less relevant and repeated.
          </p>
        </S>

        <S title="Advertising, Google AdSense and third-party ad data">
          <p>
            Scentwise is free to read and is funded by advertising. We use Google AdSense and may use other third-party
            advertising vendors and ad networks to serve ads on this site.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website
              or other websites.
            </li>
            <li>
              Google's use of advertising cookies — including the DoubleClick DART cookie — enables it and its partners
              to serve ads to you based on your visit to Scentwise and/or other sites on the internet.
            </li>
            <li>
              Ad vendors may collect your IP address, approximate location, device and browser type, pages viewed, time
              on page and interactions with ads, and may combine that with data they already hold in order to measure
              performance and limit how often you see the same ad.
            </li>
            <li>
              You may opt out of personalised advertising by visiting{" "}
              <a href="https://www.google.com/settings/ads" className="font-semibold text-primary underline" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>
              , or opt out of a third-party vendor's use of cookies for personalised advertising at{" "}
              <a href="https://www.aboutads.info" className="font-semibold text-primary underline" target="_blank" rel="noopener noreferrer">
                aboutads.info
              </a>{" "}
              and{" "}
              <a href="https://optout.networkadvertising.org" className="font-semibold text-primary underline" target="_blank" rel="noopener noreferrer">
                optout.networkadvertising.org
              </a>
              .
            </li>
            <li>
              Where required by law — including in the EEA, the UK and Switzerland — a consent notice is shown before
              non-essential advertising cookies are set, and you can withdraw or change that consent at any time.
            </li>
            <li>
              You can read how Google uses information from sites that use its services at{" "}
              <a href="https://policies.google.com/technologies/partner-sites" className="font-semibold text-primary underline" target="_blank" rel="noopener noreferrer">
                policies.google.com/technologies/partner-sites
              </a>
              .
            </li>
          </ul>
          <p>
            We do not receive your name, email address or payment details from advertisers, and we cannot see which
            individual visitor clicked which ad — only aggregate reporting.
          </p>
        </S>

        <S title="Analytics and hosting">
          <p>
            Our hosting and delivery infrastructure processes standard server logs (IP address, user agent, requested URL,
            timestamp) to serve pages, block abuse and diagnose errors. Aggregate traffic analytics tell us which pages
            are read and where visitors arrive from; we use this to decide what to write next, not to profile individuals.
          </p>
        </S>

        <S title="Affiliate and outbound links">
          <p>
            The site links to retailers such as FragranceBuy and Sephora. Some outbound links may be affiliate links now
            or in future, meaning we could earn a commission on a purchase at no extra cost to you; where that applies we
            disclose it on the page. Once you follow a link, the destination site's own privacy policy and cookies apply —
            we have no visibility into what you buy.
          </p>
        </S>

        <S title="Legal bases and retention">
          <p>
            Where the GDPR applies, we rely on legitimate interests for essential site operation, security and aggregate
            analytics, and on your consent for personalised advertising cookies. We keep email correspondence for up to
            24 months, server logs for a short rolling window set by our infrastructure provider, and quiz state only
            until you close or reset the tool.
          </p>
        </S>

        <S title="Your rights and choices">
          <p>
            Depending on where you live, you may have the right to access, correct or delete personal information we
            hold, to withdraw consent, to object to processing, or to complain to a regulator (in Canada, the Office of
            the Privacy Commissioner). Because we hold almost nothing about you, most requests are answered simply — email{" "}
            <a href={`mailto:${EMAIL}`} className="font-semibold text-primary underline">{EMAIL}</a> with "Privacy" in
            the subject line and we will respond within 30 days.
          </p>
          <p>
            You can also send a Do Not Track signal, clear site data in your browser, or use the opt-out links above to
            stop personalised ads while continuing to use every feature of Scentwise.
          </p>
        </S>

        <S title="Changes to this policy">
          <p>
            If we add a new vendor or materially change how data is used, we will update this page and revise the date at
            the top. Continuing to use Scentwise after a change means you accept the updated policy. See also our{" "}
            <Link to="/terms" className="font-semibold text-primary underline">Terms of Service</Link>.
          </p>
        </S>
      </div>

      <SiteFooter />
      <ScrollToTopButton />
    </main>
  );
}

function S({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-bold">{title}</h2>
      <div className="mt-3 space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
