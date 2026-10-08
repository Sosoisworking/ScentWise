// Validates src/data/fragrances.json and src/data/sephora-ca.json.
// Runs before every build (npm "prebuild"), so a bad entry fails the deploy instead of shipping.
// Usage: npm run validate:data
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const fragrances = JSON.parse(read("src/data/fragrances.json"));
const sephora = JSON.parse(read("src/data/sephora-ca.json"));

const SEASONS = ["spring", "summer", "fall", "winter"];
// Must match the keys in src/components/OccasionStep.tsx (checked below).
const OCCASIONS = [
  "date",
  "office",
  "party",
  "everyday",
  "fresh",
  "boozy",
  "luxury",
  "casual",
  "gym",
  "vacation",
  "wedding",
  "cozy",
  "black-tie",
  "brunch",
  "rainy",
  "signature",
];
const FAMILIES = [
  "Citrus",
  "Floral",
  "Aquatic",
  "Woody",
  "Fruity",
  "Oriental",
  "Gourmand",
  "Aromatic",
  "Green",
  "Chypre",
  "Amber",
  "Musk",
  "Leather",
  "Spicy",
  "Powdery",
];
const CONCENTRATIONS = [
  "EDT",
  "EDP",
  "Parfum",
  "Extrait",
  "Elixir",
  "Cologne",
  "Cologne Intense",
  "Body Mist",
];
// Entries added through the update process must sit in the tier their price implies
// (lowest listed CAD price). The original catalogue predates this rule.
const TIER_BY_PRICE = (low) => (low < 100 ? "budget" : low < 200 ? "mid" : "premium");

const errors = [];
const err = (id, msg) => errors.push(`${id}: ${msg}`);

export function slugify(s) {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const occasionSource = read("src/components/OccasionStep.tsx");
for (const o of OCCASIONS) {
  if (!occasionSource.includes(`key: "${o}"`)) errors.push(`OCCASIONS out of sync: "${o}"`);
}

const carried = new Set(sephora.carried);
const notCarried = new Set(sephora.notCarried);
for (const b of carried)
  if (notCarried.has(b)) errors.push(`sephora-ca.json: "${b}" in both lists`);

const isStrArray = (v, min, max) =>
  Array.isArray(v) &&
  v.length >= min &&
  v.length <= max &&
  v.every((x) => typeof x === "string" && x.trim() === x && x.length >= 2 && x.length <= 40);

if (!Array.isArray(fragrances)) {
  errors.push("fragrances.json must be an array");
} else {
  const ids = new Set();
  const descriptions = new Set();
  for (const [i, f] of fragrances.entries()) {
    const id = f?.id ?? `#${i}`;
    for (const k of ["id", "name", "brand", "description", "fragrancebuyQuery", "priceDisplay"]) {
      if (typeof f[k] !== "string" || !f[k].trim()) err(id, `missing ${k}`);
    }
    if (typeof f.brand !== "string" || typeof f.name !== "string") continue;

    if (f.id !== slugify(`${f.brand} ${f.name}`)) {
      err(id, `id must be "${slugify(`${f.brand} ${f.name}`)}"`);
    }
    if (ids.has(f.id)) err(id, "duplicate fragrance");
    ids.add(f.id);

    if (!["male", "female", "unisex"].includes(f.marketedFor)) err(id, "bad marketedFor");
    if (!CONCENTRATIONS.includes(f.concentration)) {
      err(id, `concentration must be one of ${CONCENTRATIONS.join(", ")}`);
    }
    if (!["budget", "mid", "premium"].includes(f.priceRange)) err(id, "bad priceRange");
    if (!["short", "medium", "long"].includes(f.longevity)) err(id, "bad longevity");

    const price = /^CA\$(\d+)–\$(\d+)$/.exec(f.priceDisplay ?? "");
    if (!price) {
      err(id, 'priceDisplay must look like "CA$95–$160" (en dash)');
    } else {
      const [lo, hi] = [Number(price[1]), Number(price[2])];
      if (lo > hi) err(id, "priceDisplay low end above high end");
      if (f.addedOn && TIER_BY_PRICE(lo) !== f.priceRange) {
        err(id, `priceRange should be "${TIER_BY_PRICE(lo)}" for a CA$${lo} starting price`);
      }
    }

    if (!isStrArray(f.family, 1, 3) || !f.family.every((x) => FAMILIES.includes(x))) {
      err(id, `family: 1–3 of ${FAMILIES.join(", ")}`);
    }
    for (const k of ["topNotes", "heartNotes", "baseNotes"]) {
      if (!isStrArray(f[k], 1, 8)) err(id, `${k}: 1–8 trimmed note names`);
      else if (new Set(f[k]).size !== f[k].length) err(id, `${k}: duplicate note`);
    }
    if (!isStrArray(f.seasons, 1, 4) || !f.seasons.every((s) => SEASONS.includes(s))) {
      err(id, `seasons: 1–4 of ${SEASONS.join(", ")}`);
    }
    if (!isStrArray(f.occasions, 2, 8) || !f.occasions.every((o) => OCCASIONS.includes(o))) {
      err(id, "occasions: 2–8 valid occasion keys");
    }

    if (typeof f.description === "string") {
      if (f.description.length < 40 || f.description.length > 220) {
        err(id, "description must be 40–220 characters");
      }
      if (!/[.!]$/.test(f.description)) err(id, "description must end with a full stop");
      if (descriptions.has(f.description)) err(id, "description duplicates another entry");
      descriptions.add(f.description);
    }

    if (carried.has(f.brand)) {
      if (
        typeof f.sephoraPath !== "string" ||
        !/^\/(product\/[\w-]+-P\d+|search\?keyword=[^\s]+)$/.test(f.sephoraPath)
      ) {
        err(id, 'sephoraPath must be "/search?keyword=…" or "/product/…-P123" for a carried brand');
      }
    } else if (notCarried.has(f.brand)) {
      if (f.sephoraPath !== null) err(id, "sephoraPath must be null: brand not at Sephora Canada");
    } else {
      err(id, `brand "${f.brand}" missing from sephora-ca.json (add it to carried or notCarried)`);
    }

    if (f.addedOn !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(f.addedOn)) {
      err(id, "addedOn must be YYYY-MM-DD");
    }
  }

  const used = new Set(fragrances.map((f) => f.brand));
  for (const b of [...carried, ...notCarried]) {
    if (!used.has(b)) errors.push(`sephora-ca.json: "${b}" is listed but no fragrance uses it`);
  }
}

if (errors.length) {
  console.error(`✖ ${errors.length} problem(s) in the fragrance data:\n  ${errors.join("\n  ")}`);
  process.exit(1);
}

const tally = (key) => {
  const t = {};
  for (const f of fragrances) for (const v of [].concat(f[key])) t[v] = (t[v] ?? 0) + 1;
  return Object.entries(t)
    .sort((a, b) => b[1] - a[1])
    .map(([k, n]) => `${k} ${n}`)
    .join(", ");
};
console.log(`✓ ${fragrances.length} fragrances valid`);
for (const k of ["priceRange", "marketedFor", "longevity", "seasons", "occasions"]) {
  console.log(`  ${k}: ${tally(k)}`);
}
