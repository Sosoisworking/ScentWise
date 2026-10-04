// Scentwise Brand Directory dataset.
//
// Category definitions:
// - DESIGNER: Brands born from large fashion houses; mass-market appeal,
//   widely distributed, often licensed scents (Chanel, Dior, Gucci, Armani).
// - NICHE: Independent perfume houses; artistic/experimental, smaller batches,
//   unconventional compositions (Byredo, Le Labo, Diptyque, Serge Lutens).
// - LUXURY: Heritage houses and ultra-premium independents — rare ingredients,
//   bespoke experiences, prestige pricing (Creed, Amouage, Clive Christian,
//   Roja Parfums, Xerjoff, Maison Francis Kurkdjian).
//
// Domain validation rules:
// 1. Domain matches brand name (chanel.com for Chanel) OR
// 2. Domain is a known official subdomain (us.louisvuitton.com) OR
// 3. Domain is confirmed on the brand's own social media bio AND
// 4. Domain is NOT amazon, fragrantica, sephora, ulta, nordstrom, notino,
//    feelunique, or any third-party retailer/marketplace/reseller.

export type BrandCategory = "designer" | "niche" | "luxury";

export interface Brand {
  id: string;
  name: string;
  slug: string;
  category: BrandCategory;
  officialUrl: string;
  country: string;
  founded: number;
  tagline: string;
  featured?: boolean;
}

export const BRANDS: Brand[] = [
  // A
  { id: "a1", name: "Acqua di Parma", slug: "acqua-di-parma", category: "luxury", officialUrl: "https://www.acquadiparma.com", country: "Italy", founded: 1916, tagline: "The Italian art of living, bottled since 1916." },
  { id: "a2", name: "Amouage", slug: "amouage", category: "luxury", officialUrl: "https://www.amouage.com", country: "Oman", founded: 1983, tagline: "The gift of kings — Omani opulence in every flacon." },
  { id: "a3", name: "Annick Goutal", slug: "annick-goutal", category: "niche", officialUrl: "https://www.goutal.com", country: "France", founded: 1981, tagline: "Poetry and elegance distilled into pure French fragrance." },
  { id: "a4", name: "Atelier Cologne", slug: "atelier-cologne", category: "niche", officialUrl: "https://www.atelier-cologne.com", country: "France", founded: 2009, tagline: "Colognes absolues inspired by life's most intense moments." },
  { id: "a5", name: "Azzaro", slug: "azzaro", category: "designer", officialUrl: "https://www.parfums.azzaro.com", country: "France", founded: 1967, tagline: "Bold, sensual, and unapologetically French." },

  // B
  { id: "b1", name: "Balmain", slug: "balmain", category: "designer", officialUrl: "https://www.balmain.com", country: "France", founded: 1945, tagline: "Parisian power dressed in scent." },
  { id: "b2", name: "BDK Parfums", slug: "bdk-parfums", category: "niche", officialUrl: "https://www.bdkparfums.com", country: "France", founded: 2016, tagline: "Unconventional French niche with a modern Parisian pulse." },
  { id: "b3", name: "Bond No. 9", slug: "bond-no-9", category: "niche", officialUrl: "https://www.bondno9.com", country: "USA", founded: 2003, tagline: "New York City mapped through olfaction, street by street." },
  { id: "b4", name: "Bottega Veneta", slug: "bottega-veneta", category: "luxury", officialUrl: "https://www.bottegaveneta.com", country: "Italy", founded: 1966, tagline: "Woven Italian luxury, translated into whisper-quiet scent." },
  { id: "b5", name: "Bulgari", slug: "bulgari", category: "luxury", officialUrl: "https://www.bulgari.com", country: "Italy", founded: 1884, tagline: "Roman jewellery house crafting precious olfactory gems." },
  { id: "b6", name: "Burberry", slug: "burberry", category: "designer", officialUrl: "https://www.burberry.com", country: "UK", founded: 1856, tagline: "British heritage in every spritz — iconic, modern, effortless." },
  { id: "b7", name: "Byredo", slug: "byredo", category: "niche", officialUrl: "https://www.byredo.com", country: "Sweden", founded: 2006, tagline: "Minimalist Scandinavian perfumery with an emotional core." },
  { id: "b8", name: "By Kilian", slug: "by-kilian", category: "luxury", officialUrl: "https://www.bykilian.com", country: "France", founded: 2007, tagline: "The art of being unique — bold luxury in refillable flacons.", featured: true },

  // C
  { id: "c1", name: "Calvin Klein", slug: "calvin-klein", category: "designer", officialUrl: "https://www.calvinklein.com", country: "USA", founded: 1968, tagline: "Clean, minimal American modernism — iconic from day one." },
  { id: "c2", name: "Carolina Herrera", slug: "carolina-herrera", category: "designer", officialUrl: "https://www.carolinaherrera.com", country: "Venezuela", founded: 1981, tagline: "Latin glamour and feminine confidence captured in every bottle." },
  { id: "c3", name: "Cartier", slug: "cartier", category: "luxury", officialUrl: "https://www.cartier.com", country: "France", founded: 1847, tagline: "Jeweller of kings — a fragrance as precise as a cut diamond." },
  { id: "c4", name: "Chanel", slug: "chanel", category: "luxury", officialUrl: "https://www.chanel.com", country: "France", founded: 1910, tagline: "The definitive luxury house — timeless, irreplaceable, No. 5.", featured: true },
  { id: "c5", name: "Chloé", slug: "chloe", category: "designer", officialUrl: "https://www.chloe.com", country: "France", founded: 1952, tagline: "Effortlessly feminine and free-spirited Parisian chic." },
  { id: "c6", name: "Christian Louboutin", slug: "christian-louboutin", category: "luxury", officialUrl: "https://www.louboutinbeauty.com", country: "France", founded: 1991, tagline: "Red sole boldness, reimagined as wearable luxury fragrance." },
  { id: "c7", name: "Clive Christian", slug: "clive-christian", category: "luxury", officialUrl: "https://www.clivechristian.com", country: "UK", founded: 1999, tagline: "The world's most expensive perfume house — No. 1 for royalty." },
  { id: "c8", name: "Comme des Garçons", slug: "comme-des-garcons", category: "niche", officialUrl: "https://shop.comme-des-garcons.com", country: "Japan", founded: 1969, tagline: "Avant-garde Japanese conceptualism — fragrance as fashion." },
  { id: "c9", name: "Creed", slug: "creed", category: "luxury", officialUrl: "https://www.creedusa.com", country: "UK/France", founded: 1760, tagline: "Appointed to royal houses — Aventus defined niche prestige.", featured: true },

  // D
  { id: "d1", name: "Davidoff", slug: "davidoff", category: "designer", officialUrl: "https://www.davidoff.com", country: "Switzerland", founded: 1980, tagline: "Cool Water and beyond — Swiss precision in masculine scent." },
  { id: "d2", name: "Dior", slug: "dior", category: "luxury", officialUrl: "https://www.dior.com", country: "France", founded: 1946, tagline: "Sauvage, J'adore, Miss Dior — French haute couture for skin.", featured: true },
  { id: "d3", name: "Diptyque", slug: "diptyque", category: "niche", officialUrl: "https://www.diptyqueparis.com", country: "France", founded: 1961, tagline: "Parisian niche institution — candles, scents, and art since 1961." },
  { id: "d4", name: "DKNY", slug: "dkny", category: "designer", officialUrl: "https://www.dkny.com", country: "USA", founded: 1984, tagline: "New York energy in a bottle — urban, modern, accessible." },
  { id: "d5", name: "Dolce & Gabbana", slug: "dolce-gabbana", category: "designer", officialUrl: "https://www.dolcegabbana.com", country: "Italy", founded: 1985, tagline: "Mediterranean passion and Italian sensuality — Light Blue icon." },

  // E
  { id: "e1", name: "Elizabeth Arden", slug: "elizabeth-arden", category: "designer", officialUrl: "https://www.elizabetharden.com", country: "USA", founded: 1910, tagline: "Classic American beauty house — five decades of fragrance." },
  { id: "e2", name: "Etat Libre d'Orange", slug: "etat-libre-dorange", category: "niche", officialUrl: "https://www.etatlibredorange.com", country: "France", founded: 2006, tagline: "Provocateur, rule-breaker, and olfactory agitator — fearlessly niche." },
  { id: "e3", name: "Ex Nihilo", slug: "ex-nihilo", category: "luxury", officialUrl: "https://www.ex-nihilo-paris.com", country: "France", founded: 2013, tagline: "Paris boutique niche house — bespoke luxury from nothing." },

  // F
  { id: "f1", name: "Floris London", slug: "floris-london", category: "luxury", officialUrl: "https://www.floris.com", country: "UK", founded: 1730, tagline: "Britain's oldest perfumer — a Royal Warrant since King George III." },
  { id: "f2", name: "Frédéric Malle", slug: "frederic-malle", category: "luxury", officialUrl: "https://www.fredericmalle.com", country: "France", founded: 2000, tagline: "The editor of perfumers — every bottle credits its master nose.", featured: true },

  // G
  { id: "g1", name: "Giorgio Armani", slug: "giorgio-armani", category: "designer", officialUrl: "https://www.armani.com", country: "Italy", founded: 1975, tagline: "My Way, Si, Acqua di Giò — Italian architecture in scent." },
  { id: "g2", name: "Givenchy", slug: "givenchy", category: "designer", officialUrl: "https://www.givenchy.com", country: "France", founded: 1952, tagline: "L'Interdit and Gentleman — Parisian couture meets fragrance." },
  { id: "g3", name: "Gucci", slug: "gucci", category: "designer", officialUrl: "https://www.gucci.com", country: "Italy", founded: 1921, tagline: "Bloom, Guilty, and Mémoire — Italian opulence in every bottle." },
  { id: "g4", name: "Guerlain", slug: "guerlain", category: "luxury", officialUrl: "https://www.guerlain.com", country: "France", founded: 1828, tagline: "The oldest French perfume house — Shalimar, Mon Guerlain, Habit Rouge." },

  // H
  { id: "h1", name: "Henry Rose", slug: "henry-rose", category: "niche", officialUrl: "https://henryrose.com", country: "USA", founded: 2020, tagline: "Clean, transparent fine fragrance founded by Michelle Pfeiffer." },
  { id: "h2", name: "Hermès", slug: "hermes", category: "luxury", officialUrl: "https://www.hermes.com", country: "France", founded: 1837, tagline: "Twilly d'Hermès, Terre — artisan excellence from saddle to scent." },
  { id: "h3", name: "Hugo Boss", slug: "hugo-boss", category: "designer", officialUrl: "https://www.hugoboss.com", country: "Germany", founded: 1924, tagline: "Clean, confident masculinity — Boss Bottled is a modern icon." },

  // I
  { id: "i1", name: "Initio Parfums", slug: "initio-parfums", category: "luxury", officialUrl: "https://www.initio.com", country: "France", founded: 2015, tagline: "Hedonist, Atomic Rose — science of attraction meets high perfumery." },
  { id: "i2", name: "Issey Miyake", slug: "issey-miyake", category: "designer", officialUrl: "https://www.isseymiyake.com", country: "Japan", founded: 1970, tagline: "L'Eau d'Issey — water, light, and Japanese minimalism distilled." },

  // J
  { id: "j1", name: "Jimmy Choo", slug: "jimmy-choo", category: "designer", officialUrl: "https://www.jimmychoo.com", country: "UK", founded: 1996, tagline: "Glamorous, bold, and heeled — fragrance as fashion statement." },
  { id: "j2", name: "Jo Malone London", slug: "jo-malone-london", category: "luxury", officialUrl: "https://www.jomalone.com", country: "UK", founded: 1994, tagline: "Layering culture redefined — understated British luxury.", featured: true },
  { id: "j3", name: "Jean Paul Gaultier", slug: "jean-paul-gaultier", category: "designer", officialUrl: "https://www.jeanpaulgaultier.com", country: "France", founded: 1976, tagline: "Le Mâle and Classique — provocateur couture meets iconic flacons." },

  // K
  { id: "k1", name: "Kayali", slug: "kayali", category: "niche", officialUrl: "https://kayali.com", country: "UAE/USA", founded: 2018, tagline: "Huda Beauty's fragrance line — layering-first Middle Eastern-inspired niche." },
  { id: "k2", name: "Kenzo", slug: "kenzo", category: "designer", officialUrl: "https://www.kenzo.com", country: "France", founded: 1970, tagline: "Flower and World — Japanese-French fusion with vivid personality." },
  { id: "k3", name: "Krigler", slug: "krigler", category: "luxury", officialUrl: "https://www.krigler.com", country: "France", founded: 1904, tagline: "Old-money heritage — quietly luxurious since 1904." },

  // L
  { id: "l1", name: "L'Artisan Parfumeur", slug: "lartisan-parfumeur", category: "niche", officialUrl: "https://www.lartisanparfumeur.com", country: "France", founded: 1976, tagline: "Pioneer of niche perfumery — nature, art, and olfactory stories." },
  { id: "l2", name: "Lancôme", slug: "lancome", category: "designer", officialUrl: "https://www.lancome.com", country: "France", founded: 1935, tagline: "La Vie est Belle and Idôle — quintessential French feminine luxury." },
  { id: "l3", name: "Lattafa", slug: "lattafa", category: "designer", officialUrl: "https://www.lattafa.com", country: "UAE", founded: 2002, tagline: "Middle Eastern house delivering extraordinary value at accessible price." },
  { id: "l4", name: "Le Labo", slug: "le-labo", category: "niche", officialUrl: "https://www.lelabofragrances.com", country: "USA", founded: 2006, tagline: "Santal 33 defined a generation — handmade to order in every city.", featured: true },
  { id: "l5", name: "Loewe", slug: "loewe", category: "luxury", officialUrl: "https://www.loewe.com", country: "Spain", founded: 1846, tagline: "Aire, 001 — Spanish leather house crafting elegant modern scents." },
  { id: "l6", name: "Louis Vuitton", slug: "louis-vuitton", category: "luxury", officialUrl: "https://us.louisvuitton.com", country: "France", founded: 1854, tagline: "Les Parfums collection — French maison at its most intimate." },

  // M
  { id: "m1", name: "Maison Crivelli", slug: "maison-crivelli", category: "niche", officialUrl: "https://maisoncrivelli.com", country: "France", founded: 2018, tagline: "Oud Maracujá — experimental Parisian niche with global botanicals." },
  { id: "m2", name: "Maison Francis Kurkdjian", slug: "maison-francis-kurkdjian", category: "luxury", officialUrl: "https://www.maisonfranciskurkdjian.com", country: "France", founded: 2009, tagline: "Baccarat Rouge 540 defined modern luxury niche perfumery.", featured: true },
  { id: "m3", name: "Maison Margiela Replica", slug: "maison-margiela-replica", category: "niche", officialUrl: "https://www.maisonmargiela.com", country: "Belgium", founded: 1988, tagline: "Jazz Club, Flower Market — Replica series memorialises places and moments." },
  { id: "m4", name: "Mancera", slug: "mancera", category: "niche", officialUrl: "https://www.manceraparfums.com", country: "France", founded: 2011, tagline: "Inspired by Middle Eastern grandeur — bold, rich, extraordinary value." },
  { id: "m5", name: "Marc Jacobs", slug: "marc-jacobs", category: "designer", officialUrl: "https://www.marcjacobs.com", country: "USA", founded: 1984, tagline: "Daisy, Dot, Lola — American playful whimsy in pretty bottles." },
  { id: "m6", name: "Memo Paris", slug: "memo-paris", category: "luxury", officialUrl: "https://www.memoparis.com", country: "France", founded: 2007, tagline: "Travel-inspired haute perfumery — stories of the world in scent." },
  { id: "m7", name: "Montale", slug: "montale", category: "niche", officialUrl: "https://www.montaleparis.com", country: "France", founded: 2003, tagline: "Oud and rose specialists — Parisian house with Arabian soul." },
  { id: "m8", name: "Mugler", slug: "mugler", category: "designer", officialUrl: "https://www.mugler.com", country: "France", founded: 1974, tagline: "Angel and Alien — iconic futurist flacons that changed perfumery." },

  // N
  { id: "n1", name: "Narciso Rodriguez", slug: "narciso-rodriguez", category: "designer", officialUrl: "https://www.narcisorodriguez.com", country: "USA", founded: 1997, tagline: "Musc Noir, For Her — minimalist musky sensuality as signature." },
  { id: "n2", name: "Nishane", slug: "nishane", category: "niche", officialUrl: "https://www.nishane.com.tr", country: "Turkey", founded: 2012, tagline: "Istanbul-born niche house — first global Turkish artistic perfumery." },

  // O
  { id: "o1", name: "Ormonde Jayne", slug: "ormonde-jayne", category: "luxury", officialUrl: "https://www.ormondejayne.com", country: "UK", founded: 2000, tagline: "Rare botanicals and feminine precision — London's quiet luxury." },

  // P
  { id: "p1", name: "Parfums de Marly", slug: "parfums-de-marly", category: "luxury", officialUrl: "https://www.parfumsdemarlyusa.com", country: "France", founded: 2009, tagline: "18th-century Versailles opulence — Delina and Layton are cult icons.", featured: true },
  { id: "p2", name: "Penhaligon's", slug: "penhaligons", category: "luxury", officialUrl: "https://www.penhaligons.com", country: "UK", founded: 1870, tagline: "Victorian apothecary turned luxurious British perfume house." },
  { id: "p3", name: "Phlur", slug: "phlur", category: "niche", officialUrl: "https://phlur.com", country: "USA", founded: 2016, tagline: "Missing Person, Golden Rule — Gen Z's clean niche darling." },
  { id: "p4", name: "Prada", slug: "prada", category: "luxury", officialUrl: "https://www.prada.com", country: "Italy", founded: 1913, tagline: "Infusion d'Iris, Candy — Italian intellect in minimalist flacons." },

  // R
  { id: "r1", name: "Ralph Lauren", slug: "ralph-lauren", category: "designer", officialUrl: "https://www.ralphlauren.com", country: "USA", founded: 1967, tagline: "Polo, Romance — preppy American lifestyle poured into a bottle." },
  { id: "r2", name: "Rasasi", slug: "rasasi", category: "designer", officialUrl: "https://www.rasasi.com", country: "UAE", founded: 1979, tagline: "Hawas, La Yuqawam — Dubai's beloved house of long-lasting scents." },
  { id: "r3", name: "Roja Parfums", slug: "roja-parfums", category: "luxury", officialUrl: "https://www.rojaparfums.com", country: "UK", founded: 2011, tagline: "Dove and Scandal — Britain's most expensive contemporary perfumer." },

  // S
  { id: "s1", name: "Serge Lutens", slug: "serge-lutens", category: "niche", officialUrl: "https://www.sergelutens.com", country: "France", founded: 1992, tagline: "Dark, demanding, and poetic — niche perfumery's philosopher king." },
  { id: "s2", name: "Swiss Arabian", slug: "swiss-arabian", category: "niche", officialUrl: "https://www.swissarabian.com", country: "UAE", founded: 1974, tagline: "East meets West — Dubai oil-based attars and artful ouds." },

  // T
  { id: "t1", name: "Thierry Mugler", slug: "thierry-mugler", category: "designer", officialUrl: "https://www.mugler.com", country: "France", founded: 1974, tagline: "Angel changed perfumery forever — gourmand icon with alien grace." },
  { id: "t2", name: "Tom Ford", slug: "tom-ford", category: "luxury", officialUrl: "https://www.tomford.com", country: "USA", founded: 2006, tagline: "Black Orchid, Tobacco Vanille — Private Blend is niche luxury defined.", featured: true },

  // V
  { id: "v1", name: "Van Cleef & Arpels", slug: "van-cleef-arpels", category: "luxury", officialUrl: "https://www.vancleefarpels.com", country: "France", founded: 1896, tagline: "Collection Extraordinaire — haute joaillerie meets haute parfumerie." },
  { id: "v2", name: "Versace", slug: "versace", category: "designer", officialUrl: "https://www.versace.com", country: "Italy", founded: 1978, tagline: "Bright Crystal, Eros — Medusa boldness in iconic Italian flacons." },
  { id: "v3", name: "Viktor & Rolf", slug: "viktor-rolf", category: "designer", officialUrl: "https://www.viktor-rolf.com", country: "Netherlands", founded: 1993, tagline: "Flowerbomb and Spicebomb — conceptual couture that detonates on skin." },

  // X
  { id: "x1", name: "Xerjoff", slug: "xerjoff", category: "luxury", officialUrl: "https://www.xerjoff.com", country: "Italy", founded: 2007, tagline: "Italian artistry meets rare botanicals — the connoisseur's holy grail." },

  // Y
  { id: "y1", name: "Yves Saint Laurent", slug: "yves-saint-laurent", category: "designer", officialUrl: "https://www.ysl.com", country: "France", founded: 1961, tagline: "Libre, Black Opium, Y — the house that made rebellion beautiful." },

  // Z
  { id: "z1", name: "Zadig & Voltaire", slug: "zadig-voltaire", category: "designer", officialUrl: "https://www.zadig-et-voltaire.com", country: "France", founded: 1997, tagline: "This is Her, This is Him — rock-luxe attitude in a bottle." },
];

const FLAGS: Record<string, string> = {
  Italy: "🇮🇹", France: "🇫🇷", UK: "🇬🇧", USA: "🇺🇸", Oman: "🇴🇲",
  Sweden: "🇸🇪", Spain: "🇪🇸", Japan: "🇯🇵", Germany: "🇩🇪", Switzerland: "🇨🇭",
  Venezuela: "🇻🇪", Belgium: "🇧🇪", UAE: "🇦🇪", Turkey: "🇹🇷", Netherlands: "🇳🇱",
  "UK/France": "🇬🇧🇫🇷", "UAE/USA": "🇦🇪🇺🇸",
};

export const flagFor = (country: string) => FLAGS[country] ?? "🌍";
