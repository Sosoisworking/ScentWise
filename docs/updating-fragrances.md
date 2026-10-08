# Updating the fragrance catalogue

The catalogue is `src/data/fragrances.json`. Sephora Canada availability per brand is
`src/data/sephora-ca.json`. The canonical note list the quiz matches on is
`src/data/note-taxonomy.json`. Both are checked by `npm run validate:data`, which also runs before
every build, so invalid data fails the deploy instead of going live.

A scheduled Claude Code routine follows this procedure every two weeks and opens a pull request.
Nothing is published until a human merges it.

## Each run

1. Start from an up-to-date `main` and create a branch `data/fragrances-YYYY-MM-DD`.
2. Run `npm ci` and `npm run validate:data`. The summary shows how many fragrances exist per tier,
   gender, longevity, season and occasion. Use it to see which areas are thin.
3. Pick **about 10** fragrances to add:
   - Prefer notable releases from the last 6–12 months that are sold in Canada, then well-known
     fragrances that fill the thinnest areas in the summary.
   - Mix price tiers and genders. Skip anything already in the catalogue: the validator rejects
     duplicates by `id`.
   - Skip limited editions, discontinued fragrances, and anything you can't find reliable
     notes for.
4. Research each one with web search: the brand's official page first, then reputable retailers
   or press. Do **not** script or bulk-fetch fragrantica.com, fragrancebuy.ca or sephora.com.
   Their terms forbid automated access, and Fragrancebuy and Sephora actively block it.
5. Add the entries to the end of `fragrances.json` following the field rules below, then add any
   new brand to `sephora-ca.json`.
6. Run `npm run validate:data` and `npm run build`. Fix every error.
7. Commit, push the branch, and open a pull request (format below). **Never merge it yourself.**

Do not edit existing entries, except to fix a factual error you have verified. Call out any
such fix in the pull request.

## Field rules

| Field                                   | Rule                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                    | `slug(brand + " " + name)`: lowercase ASCII, `&` becomes `and`, everything else non-alphanumeric becomes `-`. The validator prints the expected value.                                                                                                                                                                                                                                                                                                                                                                       |
| `name`, `brand`                         | Official spelling. Reuse the exact brand spelling already in the file (e.g. `Giorgio Armani`, `Yves Saint Laurent`, `Viktor & Rolf`, `Kilian Paris`, `Jo Malone`).                                                                                                                                                                                                                                                                                                                                                           |
| `marketedFor`                           | How the brand markets it: `male`, `female` or `unisex`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `concentration`                         | `EDT`, `EDP`, `Parfum`, `Extrait`, `Elixir`, `Cologne`, `Cologne Intense` or `Body Mist`.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `priceDisplay`                          | Approximate Canadian retail from smallest to largest common bottle: `CA$95–$160` (en dash, whole dollars).                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `priceRange`                            | From the starting price: under CA$100 is `budget`, CA$100–199 is `mid`, CA$200+ is `premium`.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `family`                                | 1–3 of: Citrus, Floral, Aquatic, Woody, Fruity, Oriental, Gourmand, Aromatic, Green, Chypre, Amber, Musk, Leather, Spicy, Powdery.                                                                                                                                                                                                                                                                                                                                                                                           |
| `topNotes` / `heartNotes` / `baseNotes` | 1–8 each, from the official pyramid, defining notes first within each tier (position affects scoring). Every note must be a name or alias in `src/data/note-taxonomy.json`; the validator rejects anything else. Use the existing spelling (`Cedarwood` not `Cedar`, `Tonka Bean` not `Tonka`). If a genuinely new note appears, add it to the taxonomy: as an alias if it's a variant of an existing note (e.g. `Sicilian Lemon` under Lemon), otherwise as a new note with its family and a one-line original description. |
| `longevity`                             | `short` (2–4 h), `medium` (4–6 h) or `long` (7 h+), based on concentration and base notes.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `seasons`                               | 1–4 of `spring`, `summer`, `fall`, `winter`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `occasions`                             | 2–8 keys from `src/components/OccasionStep.tsx` (e.g. `office`, `date`, `gym`, `rainy`, `black-tie`).                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `description`                           | One original sentence, 40–220 characters, ending with a full stop. Describe how it smells and when to wear it. **Never copy brand or retailer copy.**                                                                                                                                                                                                                                                                                                                                                                        |
| `sephoraPath`                           | `/search?keyword=<Brand%20Name>` if the brand is in `carried`, otherwise `null`. Don't guess product IDs.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `fragrancebuyQuery`                     | `Brand Name` in plain ASCII without `&` (e.g. `Dolce Gabbana The One`).                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `addedOn`                               | Today's date, `YYYY-MM-DD`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

### Sephora Canada brands

Brands already in `sephora-ca.json` keep their status. A brand you're adding for the first time
goes in `notCarried`, unless you have confirmed (without scraping) that Sephora Canada sells it.
A missing Sephora button is better than one that leads to an empty search. List new
`notCarried` brands in the pull request so the reviewer can move any that Sephora does sell.

## Pull request format

- **Title:** `Add N fragrances (YYYY-MM-DD)`
- **Body:**
  - A table of the new entries: brand, name, tier, price, marketed for, Sephora yes/no.
  - Why these were picked (new releases, gaps filled).
  - New brands added to `notCarried`, for the reviewer to confirm.
  - Anything uncertain: notes that differed between sources, rough price estimates.
  - The validator summary before and after.
