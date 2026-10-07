// Canonical origin for SEO tags, JSON-LD, sitemap and robots.txt.
// Resolved at build time in vite.config.ts: VITE_SITE_URL if set, otherwise the
// Vercel production URL (*.vercel.app), otherwise localhost for dev.
export const SITE_URL: string = (import.meta.env.VITE_SITE_URL || "http://localhost:8080").replace(
  /\/+$/,
  "",
);
