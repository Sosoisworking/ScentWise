// Where to buy fragrance as a Canadian. Every fact here was checked against the retailer's
// own pages or a government source on RETAILERS_CHECKED; recheck before changing a claim.

export const RETAILERS_CHECKED = "2026-10-11";

export type RetailerKind = "authorized" | "discounter" | "cross-border";

export interface Retailer {
  name: string;
  url: string;
  domain: string;
  kind: RetailerKind;
  /** One line on who they are and where they ship from. */
  summary: string;
  shipping: string;
  returns: string;
  bestFor: string;
}

export const RETAILER_KINDS: Record<RetailerKind, { title: string; intro: string }> = {
  authorized: {
    title: "Canadian stores the brands sell through",
    intro:
      "Brands supply these stores directly, so you get full brand support, fresh stock and the easiest returns. Prices are usually full retail; watch for sales and gift-with-purchase events.",
  },
  discounter: {
    title: "Canadian discounters",
    intro:
      "Lower prices, shipped from inside Canada so there's no duty or border fee. They buy from distributors and resellers rather than from the brands, so brand warranties may not apply and returns are stricter.",
  },
  "cross-border": {
    title: "US discounters",
    intro:
      "Sometimes cheaper, but prices are in US dollars and the parcel crosses the border. Work out the landed cost below before you order.",
  },
};

export const RETAILERS: Retailer[] = [
  {
    name: "Sephora Canada",
    url: "https://www.sephora.com/ca/en",
    domain: "sephora.com/ca",
    kind: "authorized",
    summary: "Ships within Canada, with stores across the country for returns.",
    shipping:
      "Free standard shipping for Beauty Insider members (a free account); guests ship free over $50.",
    returns:
      "30 days for new or gently used products, free in store or with a prepaid label. Original shipping isn't refunded.",
    bestFor: "Designer and some niche brands, and testing in store first",
  },
  {
    name: "Shoppers Drug Mart",
    url: "https://www.shoppersdrugmart.ca",
    domain: "shoppersdrugmart.ca",
    kind: "authorized",
    summary: "Sells fragrance online and in its Beauty Boutique stores, shipping within Canada.",
    shipping: "Ships within Canada; the free-shipping minimum changes, so check at checkout.",
    returns: "Check the return terms at checkout; opened fragrance may not qualify.",
    bestFor: "Designer staples, PC Optimum points",
  },
  {
    name: "Holt Renfrew",
    url: "https://www.holtrenfrew.com",
    domain: "holtrenfrew.com",
    kind: "authorized",
    summary: "Canadian luxury department store carrying designer and niche houses.",
    shipping: "Ships within Canada; free-shipping offers vary, so check at checkout.",
    returns: "Check the return terms at checkout; opened fragrance may not qualify.",
    bestFor: "Niche and luxury houses you won't find at Sephora",
  },
  {
    name: "FragranceBuy",
    url: "https://www.fragrancebuy.ca",
    domain: "fragrancebuy.ca",
    kind: "discounter",
    summary:
      "Niagara Falls, Ontario company. Says it buys from authorized distributors and other resellers, not from brands directly.",
    shipping: "Ships in 3–5 business days, then 2–6 business days within Canada.",
    returns:
      "14 days, unused and unopened only; you pay return shipping, and items not in original condition carry a 50% restocking fee.",
    bestFor: "Discounted designer and niche bottles shipped from Canada",
  },
  {
    name: "PerfumeOnline",
    url: "https://perfumeonline.ca",
    domain: "perfumeonline.ca",
    kind: "discounter",
    summary: "Ships from Toronto by FedEx. Says its stock comes from approved suppliers.",
    shipping: "Ships within 24–48 business hours.",
    returns:
      "7 days, unopened and sealed only; refund is minus shipping both ways, up to a 25% restocking fee without original packaging, and no returns on testers.",
    bestFor: "Fast delivery on discounted designer fragrance",
  },
  {
    name: "FragranceNet",
    url: "https://www.fragrancenet.com",
    domain: "fragrancenet.com",
    kind: "cross-border",
    summary: "Large US discounter with a broad designer catalogue.",
    shipping: "Ships from the US; duty, tax and courier fees may apply on delivery.",
    returns:
      "Check the return terms before ordering; returns mean shipping back across the border.",
    bestFor: "Hard-to-find designer bottles, once you've done the landed-cost maths",
  },
  {
    name: "Jomashop",
    url: "https://www.jomashop.com",
    domain: "jomashop.com",
    kind: "cross-border",
    summary: "US discounter known for designer and luxury deals.",
    shipping: "Ships from the US; duty, tax and courier fees may apply on delivery.",
    returns:
      "Check the return terms before ordering; returns mean shipping back across the border.",
    bestFor: "Luxury deals, once you've done the landed-cost maths",
  },
];

/** What a parcel from the US costs on top of the price, as of RETAILERS_CHECKED. */
export const CROSS_BORDER_RULES: Array<{ title: string; text: string }> = [
  {
    title: "Courier (UPS, FedEx, DHL) from the US",
    text: "Under C$40: no duty or sales tax. C$40 to C$150: sales tax (GST/HST, plus PST where it applies) but no duty. Over C$150: duty and sales tax.",
  },
  {
    title: "Mail (USPS to Canada Post)",
    text: "Duty and tax apply above C$20. Canada Post may add a handling fee when it collects them.",
  },
  {
    title: "Duty on perfume",
    text: "Canada's general rate on perfume and eau de toilette is 6.5%. Trade agreements can lower it depending on where the bottle was made.",
  },
  {
    title: "US-made perfume: 50% surtax",
    text: 'Since September 8, 2026, Canada adds a 50% surtax on perfume made in the United States, even on orders under the thresholds above. It depends on where the bottle was made, not where the shop is, so check the "Made in" line.',
  },
  {
    title: "Brokerage and card fees",
    text: "Couriers often add a brokerage or clearance fee when they collect duty and tax, and many Canadian cards charge about 2.5% on purchases in US dollars.",
  },
];

/** Warning signs, from the Canadian Anti-Fraud Centre's counterfeit-goods guidance. */
export const WARNING_SIGNS: string[] = [
  "A price far below every other shop, especially on a new or popular release.",
  'Ads on social media pushing "today only" or countdown-timer deals.',
  "A Gmail, Hotmail or Yahoo address as the only contact.",
  "No physical address, no phone number, or no written return policy.",
  'Marketplace sellers with little history, or listings for "testers" and unboxed bottles with no proof of where they came from.',
];

export const SOURCES: Array<{ label: string; url: string }> = [
  {
    label:
      "CBSA: low-value shipments (C$20 by mail; C$40 tax and C$150 duty by courier from the US)",
    url: "https://www.cbsa-asfc.gc.ca/services/cusma-aceum/lvs-efv-eng.html",
  },
  {
    label: "CBSA Customs Tariff 2026, chapter 33 (perfume 3303.00.00: 6.5% MFN)",
    url: "https://www.cbsa-asfc.gc.ca/trade-commerce/tariff-tarif/2026/01-99/ch33-2026-eng.pdf",
  },
  {
    label: "CBSA Customs Notice 26-23: United States Surtax Order (2026)",
    url: "https://www.cbsa-asfc.gc.ca/publications/cn-ad/cn26-23-eng.html",
  },
  {
    label: "Finance Canada: US products subject to counter-tariffs from September 8, 2026",
    url: "https://www.canada.ca/en/department-finance/news/2026/08/list-of-products-from-the-united-states-subject-to-counter-tariffs-effective-september-8-2026.html",
  },
  {
    label: "Canadian Anti-Fraud Centre",
    url: "https://antifraudcentre-centreantifraude.ca",
  },
];
