// Canonical origin for SEO tags, JSON-LD, sitemap and robots.txt.
// Resolved at build time in vite.config.ts: VITE_SITE_URL if set, otherwise the
// Vercel production URL (*.vercel.app), otherwise localhost for dev.
export const SITE_URL: string = (import.meta.env.VITE_SITE_URL || "http://localhost:8080").replace(
  /\/+$/,
  "",
);

// Off until a provider key is wired up on the host; see src/lib/chat.functions.ts.
export const CHAT_ENABLED = import.meta.env.VITE_ENABLE_CHAT === "true";
