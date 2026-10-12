import basicsImg from "../assets/learn-basics.jpg";
import buyingImg from "../assets/learn-buying.jpg";
import summerImg from "../assets/learn-summer.jpg";
import winterImg from "../assets/learn-winter.jpg";
// Photos below are from Unsplash (free under the Unsplash License, no credit required):
// designer-niche: Lera Ginzburg, unsplash.com/photos/N8WxMVijPKw
// longevity: Shashi Chaturvedula, unsplash.com/photos/DoREIFvzb60
// dupes: Denise Chan, unsplash.com/photos/SUKlXOejFG8
// buy-online: Anastasiya Doicheva, unsplash.com/photos/2w-EQD1SkuY
import designerNicheImg from "../assets/learn-designer-niche.jpg";
import longevityImg from "../assets/learn-longevity.jpg";
import dupesImg from "../assets/learn-dupes.jpg";
import buyOnlineImg from "../assets/learn-buy-online.jpg";

export type ArticleCategory =
  "Fragrance Basics" | "Buying Guides" | "Fragrance Education" | "Comparisons" | "Seasonal Guides";

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  category: ArticleCategory;
  published: string;
  updated: string;
  image: string;
  imageAlt: string;
  related: string[];
};

export const AUTHOR = {
  name: "WhichScent Fragrance Editorial Team",
  bio: "WhichScent's editorial team researches, drafts and reviews every article on this site. We are enthusiasts and researchers, not certified perfumers, and we say so plainly.",
};

export const ARTICLES: Article[] = [
  {
    slug: "fragrance-concentrations",
    title: "Eau de Parfum vs. Eau de Toilette vs. Parfum: What's the Difference?",
    seoTitle: "EDP vs EDT vs Parfum: Fragrance Concentrations Explained — WhichScent",
    description:
      "What Eau de Toilette, Eau de Parfum and Parfum actually mean, why concentration doesn't guarantee longevity, and how to pick the right format for how you wear fragrance.",
    excerpt:
      "Concentration labels don't tell you how long a fragrance lasts. Here's what EDT, EDP and Parfum really mean — and how to choose between them.",
    category: "Fragrance Basics",
    published: "2026-02-10",
    updated: "2026-08-23",
    image: basicsImg,
    imageAlt: "Amber glass fragrance bottle resting on soft off-white linen in warm light",
    related: ["fragrance-longevity", "how-to-choose-a-fragrance", "designer-vs-niche-fragrance"],
  },
  {
    slug: "how-to-choose-a-fragrance",
    title: "How to Choose a Fragrance That Actually Fits You",
    seoTitle: "How to Choose a Fragrance That Fits You — WhichScent",
    description:
      "A practical, jargon-free method for choosing a fragrance: start with the occasion, learn the main families, test on skin, set a budget and sample before you buy.",
    excerpt:
      "Skip the jargon. Start with the occasion, learn five broad families, test on skin — and let the quiz narrow the rest.",
    category: "Buying Guides",
    published: "2026-02-14",
    updated: "2026-08-23",
    image: buyingImg,
    imageAlt: "Hands holding a small fragrance sample vial and a scent card at a shop counter",
    related: [
      "fragrance-concentrations",
      "designer-vs-niche-fragrance",
      "how-to-buy-fragrance-online",
    ],
  },
  {
    slug: "best-summer-fragrances-under-150",
    title: "10 Great Summer Fragrances Under $150 CAD",
    seoTitle: "10 Great Summer Fragrances Under $150 CAD — WhichScent",
    description:
      "Ten fresh, citrus, aquatic and light woody fragrances that work in Canadian summer heat, all typically available under $150 CAD, plus what makes a scent summer-friendly.",
    excerpt:
      "Fresh, citrus and aquatic picks that hold up in the heat — ten options that usually sit under $150 CAD.",
    category: "Seasonal Guides",
    published: "2026-03-02",
    updated: "2026-08-23",
    image: summerImg,
    imageAlt: "Citrus slices, mint leaves and a clear glass fragrance bottle on sunlit stone",
    related: [
      "best-winter-fragrances-under-150",
      "fragrance-concentrations",
      "how-to-choose-a-fragrance",
    ],
  },
  {
    slug: "best-winter-fragrances-under-150",
    title: "10 Great Winter Fragrances Under $150 CAD",
    seoTitle: "10 Great Winter Fragrances Under $150 CAD — WhichScent",
    description:
      "Warm, spicy, woody and gourmand fragrances built for Canadian winters — ten options typically under $150 CAD, plus advice on not overspraying indoors.",
    excerpt:
      "Vanilla, amber, spice and smoke: ten cold-weather fragrances that usually stay under $150 CAD.",
    category: "Seasonal Guides",
    published: "2026-03-09",
    updated: "2026-08-23",
    image: winterImg,
    imageAlt: "Dark amber fragrance bottle beside cinnamon sticks and a wool knit in moody light",
    related: [
      "best-summer-fragrances-under-150",
      "fragrance-longevity",
      "how-to-choose-a-fragrance",
    ],
  },
  {
    slug: "designer-vs-niche-fragrance",
    title: "Designer vs. Niche Fragrances: Which Should You Buy?",
    seoTitle: "Designer vs Niche Fragrance: Which Should You Buy? — WhichScent",
    description:
      "What separates designer from niche perfumery, why price isn't a quality guarantee, and how to decide which category fits your experience level and budget.",
    excerpt:
      "Neither category automatically wins. What actually separates designer from niche — and how to choose between them.",
    category: "Comparisons",
    published: "2026-03-20",
    updated: "2026-08-23",
    image: designerNicheImg,
    imageAlt: "Minimal perfume bottles with blank labels in streaks of sunlight",
    related: ["dupes-vs-originals", "how-to-choose-a-fragrance", "fragrance-concentrations"],
  },
  {
    slug: "fragrance-longevity",
    title: "Why Does My Fragrance Stop Lasting? Understanding Fragrance Longevity",
    seoTitle: "Why Your Fragrance Seems to Stop Lasting — WhichScent",
    description:
      "Olfactory adaptation, skin chemistry, climate and application all shape how long a fragrance lasts. Here's how to diagnose weak performance before blaming the bottle.",
    excerpt:
      "It's often your nose, not the bottle. Adaptation, skin chemistry, climate and application, explained.",
    category: "Fragrance Education",
    published: "2026-04-04",
    updated: "2026-08-23",
    image: longevityImg,
    imageAlt: "A woman applying a fragrance oil to her wrist in soft morning light",
    related: [
      "fragrance-concentrations",
      "best-winter-fragrances-under-150",
      "how-to-choose-a-fragrance",
    ],
  },
  {
    slug: "dupes-vs-originals",
    title: "Fragrance Dupes vs. Originals: What Are You Actually Getting?",
    seoTitle: "Fragrance Dupes vs Originals: What You're Really Buying — WhichScent",
    description:
      "How fragrance dupes differ from the originals they reference, why they cost less, when they make sense, and how to tell a legitimate alternative from a counterfeit.",
    excerpt:
      "Similar isn't identical. What a dupe really gives you, what it costs you, and where counterfeits differ.",
    category: "Comparisons",
    published: "2026-04-18",
    updated: "2026-08-23",
    image: dupesImg,
    imageAlt: "Two near-identical unlabelled amber glass bottles lying on linen",
    related: [
      "how-to-buy-fragrance-online",
      "designer-vs-niche-fragrance",
      "fragrance-concentrations",
    ],
  },
  {
    slug: "how-to-buy-fragrance-online",
    title: "How to Safely Buy Fragrance Online in Canada",
    seoTitle: "How to Safely Buy Fragrance Online in Canada — WhichScent",
    description:
      "Buying fragrance online in Canada: shops that ship from inside Canada, what a US order really costs in duty, tax and the 2026 surtax, grey market versus fake, and the warning signs of a counterfeit shop.",
    excerpt:
      "Where to buy, what a US order really costs once duty, tax and the 2026 surtax are added, and how to spot a fake-perfume shop.",
    category: "Buying Guides",
    published: "2026-05-06",
    updated: "2026-10-12",
    image: buyOnlineImg,
    imageAlt: "A plain cardboard parcel box in warm afternoon sunlight",
    related: ["dupes-vs-originals", "how-to-choose-a-fragrance", "designer-vs-niche-fragrance"],
  },
];

export const CATEGORIES: ArticleCategory[] = [
  "Fragrance Basics",
  "Buying Guides",
  "Fragrance Education",
  "Comparisons",
  "Seasonal Guides",
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
