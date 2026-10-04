// Scraper pseudo-code reference for compiling the Scentwise brand directory.
// This file is intentionally non-executing — it documents the data pipeline used
// to assemble src/data/brands.ts from public directories.
//
// STEP 1 — Fetch brand lists from source directories
//   sources = [
//     "https://www.fragrantica.com/designers/",
//     "https://nichegallerie.com/brands/",
//     "https://scentadvice.com/brands/",
//     "https://perfumeonline.ca/pages/all-brands",
//     "https://fragrancex.com/products/allbrands.html",
//   ]
//   For each source:
//     html = fetch(url, {"User-Agent": "Mozilla/5.0"}).text()
//     links = parseHTML(html).querySelectorAll("a[href*='/brand/'], a[href*='/designer/']")
//     names = dedupe(links.map(l => l.innerText.trim()))
//
// STEP 2 — Resolve official websites
//   For each brand:
//     guesses = [`https://www.${slug}.com`, `https://www.${slug}parfums.com`, ...]
//     for g in guesses: if HEAD(g)==200 && !isReseller(g) -> officialUrl = g
//     fallback: top Google result for `"${name}" official perfume website`
//     manual override map for edge cases
//
// STEP 3 — Validate domain authenticity
//   isReseller(url): blocklist [amazon, sephora, ulta, nordstrom, fragrantica,
//     notino, fragrancex, perfumania, feelunique, lookfantastic, boots, macys,
//     bloomingdales, harrods, selfridges, netaporter, ssense]
//   isOfficial(url, name): domain contains slug || whois registrant matches ||
//     og:site_name matches brand name
//
// STEP 4 — Output structured JSON ready for src/data/brands.ts.

export {};
