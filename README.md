# Scentwise

Independent fragrance discovery site: a guided scent quiz, a verified brand directory, a Canadian retailer guide and a learn hub.

Built with TanStack Start (React 19, SSR), Tailwind CSS v4 and shadcn/ui. Originally generated with Lovable; it now deploys to Vercel.

## Develop

```bash
npm install
npm run dev        # http://localhost:8080
```

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build      # emits .vercel/output (Vercel Build Output API)
```

## Deploy (Vercel)

Import the repo in Vercel. No build settings are needed: `npm run build` produces `.vercel/output` directly.

Environment variables (see `.env.example`):

| Variable        | Purpose                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL` | Canonical origin. Optional until you buy a domain; falls back to the Vercel production URL. |

## Project layout

- `src/App.tsx`: quiz flow; scoring lives in `src/utils/scoring.ts`
- `src/routes/`: file-based routes, including `sitemap.xml` and `robots.txt`
- `src/data/`: fragrances (`fragrances.json`), brands, notes and articles
- `scripts/validate-fragrances.mjs`: checks the catalogue; runs before every build

## Fragrance catalogue

A scheduled Claude Code routine adds about 10 fragrances every two weeks and opens a pull request for review. The procedure and field rules are in [`docs/updating-fragrances.md`](docs/updating-fragrances.md). Check data with `npm run validate:data`.

- `src/lib/site.ts`: site URL and feature flags
