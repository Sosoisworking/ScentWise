// Canonical origin for SEO tags, JSON-LD, sitemap and robots.txt.
// Resolved at build time in vite.config.ts: VITE_SITE_URL if set, otherwise the
// Vercel production URL (*.vercel.app), otherwise localhost for dev.
export const SITE_URL: string = (import.meta.env.VITE_SITE_URL || "http://localhost:8080").replace(
  /\/+$/,
  "",
);

// The one contact address used across the site. Switch it to an address on the site's own
// domain at launch: the retailer guide lists a free webmail-only contact as a warning sign.
export const CONTACT_EMAIL = "sohibcorp0706@gmail.com";
