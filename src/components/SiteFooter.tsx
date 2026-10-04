import { Link } from "@tanstack/react-router";

const LINKS = [
  { to: "/", label: "Fragrance Quiz" },
  { to: "/brands", label: "Brand Directory" },
  { to: "/retailers", label: "Where to Buy" },
  { to: "/learn", label: "Learn Hub" },
  { to: "/editorial-policy", label: "Editorial Policy" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
] as const;

const ARTICLE_LINKS = [
  { slug: "fragrance-concentrations", label: "EDP vs EDT vs Parfum" },
  { slug: "how-to-choose-a-fragrance", label: "How to Choose a Fragrance" },
  { slug: "fragrance-longevity", label: "Understanding Longevity" },
  { slug: "best-summer-fragrances-under-150", label: "Summer Picks Under $150" },
  { slug: "best-winter-fragrances-under-150", label: "Winter Picks Under $150" },
  { slug: "how-to-buy-fragrance-online", label: "Buying Safely Online" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border bg-card/60">
      <div className="mx-auto max-w-[1100px] px-5 py-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-sm">
            <p className="font-serif text-xl font-bold text-foreground">Scentwise</p>
            <p className="mt-2 text-sm text-muted-foreground">
              An independent fragrance discovery guide: a guided scent quiz, a verified brand directory, retailer
              comparisons and plain-English fragrance education. We are not owned by, or affiliated with, any perfume
              house or retailer.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-8">
            <nav className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-1" aria-label="Footer">
              {LINKS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav className="grid gap-y-2" aria-label="Popular guides">
              <p className="text-[11px] font-bold uppercase tracking-wide text-foreground">Popular guides</p>
              {ARTICLE_LINKS.map((item) => (
                <Link
                  key={item.slug}
                  to="/learn/$slug"
                  params={{ slug: item.slug }}
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} So Hib Corp — Scentwise, Toronto, Ontario, Canada. Prices and availability shown on this site are estimates in Canadian
          dollars and change frequently — always confirm on the retailer's own page before buying.
        </p>
      </div>
    </footer>
  );
}
