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
- `src/data/`: fragrances, brands, notes and articles
- `src/lib/site.ts`: site URL and feature flags
