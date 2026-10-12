# Product

<!-- impeccable:product-schema 1 -->

> Written by `/impeccable init` on 2026-10-11 without the usual interview: the owner asked for every command to run and report back. Facts marked _(owner)_ were confirmed by the owner in conversation; _(inferred)_ facts come from the site's own copy and code and await review.

## Platform

web

## Users

- People in Canada trying to choose a fragrance to buy online, often a first "signature scent" or a seasonal addition, who can't smell before buying. _(inferred from site copy: CAD prices, Canadian retailers, Sephora Canada availability)_
- Their job: get from "I don't know what I want" to a short list worth sampling, then find a trustworthy place to buy it at a fair price. _(inferred)_
- Secondary: readers who arrive from search on a Learn article (concentrations, longevity, dupes, buying safely) and may never take the quiz. _(inferred)_

## Product Purpose

WhichScent (renamed from Scentwise on 2026-10-11 _(owner)_) is a free fragrance discovery site with four parts: a guided quiz that returns a ranked shortlist, an official-brand directory, a Canadian retailer guide, and a Learn hub of editorial articles. Success means a visitor leaves with a few fragrances to sample and a safe place to buy them, and the site earns enough from advertising to keep going. _(inferred; ad funding confirmed by owner)_

## Positioning

- Transparent, hand-tagged scoring instead of a sponsored "top 10": no brand pays for placement and the scoring code has no concept of a sponsor. _(site copy, About page)_
- Canadian-specific: CAD price bands, a Canada-first retailer guide with the real cost of US orders, and Sephora Canada availability shown only for brands Sephora Canada actually carries. _(owner asked for the Sephora rule)_
- A shortlist to sample, never a verdict: the site says skin chemistry outranks any score. _(site copy)_

## Operating Context

- The quiz has seven steps: season, wear time, who it's marketed for, occasion (8 options since 2026-10-12), first picks by price band, loved/avoided notes, then results. Results can be filtered by price, shared by URL and emailed. _(code)_
- The owner reviews every catalogue change as a pull request. A scheduled routine proposes about 10 new fragrances on the 1st and 15th of each month. _(owner)_
- Hosted on Vercel at scent-wise-self.vercel.app. A custom domain (whichscent.com) is planned as the last step before launch. _(owner)_

## Capabilities and Constraints

- Data: 197 fragrances (`src/data/fragrances.json`) with notes from a 173-note taxonomy (`src/data/note-taxonomy.json`), 81 verified brands (`src/data/brands.ts`), 8 Learn articles (`src/data/articles.ts`). _(code)_
- Stack: TanStack Start (React 19, SSR) with Tailwind v4 and shadcn, deployed on Vercel. _(code)_
- Monetization: Google AdSense is planned once the site is on its own domain; the site must stay policy-compliant (privacy, consent, original content). _(owner)_
- Analytics: Vercel Web Analytics only, cookieless. _(owner)_
- No AI chat. It was removed deliberately; don't propose bringing it back. The "AI Fragrance Discovery" tagline stays anyway. _(owner)_
- No accounts, sign-up or user-generated content. _(code)_

## Brand Commitments

- Name: WhichScent. Tagline: "AI Fragrance Discovery". _(owner)_
- Voice: plain, candid and a little dry. It admits limits ("we are enthusiasts and researchers, not certified perfumers") and avoids hype. _(inferred from About, Editorial Policy and article copy)_
- Publisher: So Hib Corp, Toronto, Ontario. _(site copy)_

## Evidence on Hand

- Learn article photos: 4 original assets plus 4 Unsplash photos, each picked and approved by the owner. _(owner)_
- No testimonials, user counts, reviews, press mentions or ratings exist. Don't invent any.
- No wear-testing happens _(owner, 2026-10-11)_. The About page's old wear-testing claim has been removed; don't reintroduce it.
- The retailer guide (`src/data/retailers.ts`) lists Canadian authorized stores, Canadian discounters and US sites, with shipping and return terms checked on the date in `RETAILERS_CHECKED`, plus warning signs of shops to avoid. It names no specific shop as one to avoid; that would need documented evidence.
- Cross-border rules (C$20 mail, C$40/C$150 courier thresholds, 6.5% perfume duty, 50% surtax on US-made perfume since 2026-09-08) come from CBSA and Finance Canada; recheck them when the guide is next reviewed.

## Product Principles

1. Honesty is the product: show why something matched, show what you don't know, and never let money change the ranking.
2. Get to a shortlist fast, then explain it. The quiz is the core; the editorial content supports it.
3. Canada first: prices, retailers and availability must be right for a Canadian buyer.
4. Every data change gets human review. Accuracy beats volume.

## Accessibility & Inclusion

No standard has been set by the owner. The "marketed for" step offers Women, Men, Unisex and No preference, and says plainly that scent has no gender. _(code)_
