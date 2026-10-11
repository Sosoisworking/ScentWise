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
  body: string;
  related: string[];
};

export const AUTHOR = {
  name: "Scentwise Fragrance Editorial Team",
  bio: "Scentwise's editorial team researches, drafts and reviews every article on this site. We are enthusiasts and researchers, not certified perfumers, and we say so plainly.",
};

/**
 * Body format (rendered by src/components/ArticleBody.tsx):
 *   "## "  → h2 section heading (also used for the table of contents)
 *   "### " → h3 sub-heading
 *   "- "   → bullet list item
 *   "> "   → callout
 *   else   → paragraph
 */

const concentrations = `The biggest misconception about fragrance labels is that they tell you exactly how long a fragrance will last. They don't.

Walk into a fragrance store and you'll quickly encounter terms such as Eau de Toilette, Eau de Parfum, Parfum, and sometimes Eau de Cologne. At first, these names can make choosing a fragrance more confusing than it needs to be.

Fragrance concentration is one factor that influences performance, but the ingredients, formula, skin chemistry, environment, application method, and overall composition can be just as important. Understanding the differences can help you spend your money more intelligently and choose a fragrance based on how you actually want to wear it.

## What does "concentration" mean?

Fragrances are generally made from aromatic materials dissolved in alcohol and sometimes other ingredients. The concentration refers broadly to the amount of fragrance material in the finished product.

Higher concentrations often contain more aromatic material, but there is no universal industry standard that means every Eau de Parfum contains exactly the same percentage. This is why two Eau de Parfums can perform completely differently. One might project strongly for several hours, while another may sit much closer to the skin.

## Eau de Toilette

Eau de Toilette, usually abbreviated EDT, is a popular fragrance format. EDTs are often lighter and more refreshing than their higher-concentration counterparts. They can be particularly appealing for daytime wear, warm weather, offices, and situations where you don't want a fragrance to dominate the room.

However, "lighter" doesn't mean "bad." Some of the most recognizable fragrances ever created are available as Eau de Toilette, and an EDT can perform extremely well depending on its formula.

Best for:

- Warm weather
- Everyday wear
- Office environments
- People who prefer lighter fragrances
- Fresh and citrus-focused compositions

## Eau de Parfum

Eau de Parfum, or EDP, is one of the most common formats you'll encounter today. EDPs generally contain a higher concentration of aromatic material than EDTs, but performance still varies significantly from fragrance to fragrance.

An EDP can be a good middle ground for someone who wants noticeable performance without necessarily choosing the richest version of a fragrance.

Best for:

- Everyday wear
- Evening occasions
- Cooler weather
- People looking for a balance between presence and versatility

## Parfum

Parfum, sometimes called Extrait or Extrait de Parfum depending on the product, generally represents a richer concentration. These fragrances can feel smoother, denser, and more intimate.

However, higher concentration does not automatically mean greater projection. A Parfum may actually project less than an EDT while remaining on the skin longer. That's because longevity and projection are different things.

## Projection vs. longevity

This distinction is extremely important.

- Projection describes how far the fragrance radiates from your skin.
- Longevity describes how long you can detect the fragrance.

A fragrance can have high projection and moderate longevity, or low projection and excellent longevity. For example, a fragrance might fill a room during its first two hours and then become a subtle skin scent for several more. Another might never project aggressively but remain detectable on your skin throughout the day.

Neither approach is automatically better. We go deeper into this in our guide to [why your fragrance seems to stop lasting](/learn/fragrance-longevity).

## Why doesn't my EDP last longer than my EDT?

This is one of the most common fragrance questions. The answer is that concentration isn't the only variable. Performance can be affected by:

- Ingredient volatility
- Fragrance composition
- Skin chemistry
- Temperature
- Humidity
- Application technique
- Moisture level of your skin
- Amount applied

Fresh citrus and aquatic notes can disappear more quickly than heavier woody, amber, vanilla, or musky materials. That's why comparing fragrances solely by EDT versus EDP can be misleading.

## Which concentration should you buy?

Instead of asking "Which concentration lasts the longest?", ask: "How do I want this fragrance to behave?"

If you want something refreshing and easygoing, an EDT may be ideal. If you want versatility, an EDP can be a strong choice. If you want something richer and more intimate, a Parfum may be worth exploring.

Ultimately, the formula matters more than the label.

## The bottom line

Fragrance concentration is a useful starting point, but it shouldn't be the only factor in your buying decision. An EDT isn't automatically weaker. An EDP isn't automatically better. A Parfum isn't automatically longer-lasting.

The best fragrance is the one whose scent profile, performance, price, and intended use fit your needs. Before buying, test the fragrance on your own skin whenever possible, and give it time to develop rather than judging it from the first few minutes.

Your skin — not the bottle label — is ultimately where the fragrance has to work.`;

const choose = `Choosing a fragrance can feel overwhelming. Walk into a department store and you're confronted with hundreds of bottles, dozens of brands, unfamiliar ingredients, and sales descriptions filled with words like "woody," "amber," "aromatic," and "olfactive."

The good news is that finding a fragrance doesn't have to be complicated. You don't need to understand every fragrance note in existence. You need to understand your preferences, your environment, and how you want the fragrance to make you feel.

## Start with the situation

Before looking at brands, decide when you'll wear the fragrance. A fragrance for the gym or a summer afternoon doesn't need the same personality as one you'd wear to a formal dinner.

Consider:

- Everyday wear
- Work
- Dates
- Formal events
- Summer
- Winter
- Nighttime
- Casual weekends

This immediately narrows your options.

## Learn the major fragrance families

You don't need to memorize hundreds of notes. Start with broad categories.

### Fresh

Fresh fragrances often feature citrus, aquatic, green, or clean-smelling elements. They're commonly associated with freshness and warm-weather wear.

### Woody

Woody fragrances can feature materials such as cedar, sandalwood, vetiver, or oud. They often create a dry, earthy, sophisticated character.

### Floral

Floral fragrances emphasize flowers such as rose, jasmine, iris, tuberose, or orange blossom. They can range from extremely fresh to rich and dramatic.

### Amber and oriental-style profiles

These fragrances often feature warm, sweet, resinous, spicy, or balsamic characteristics. They're frequently associated with evening and cooler-weather wear.

### Gourmand

Gourmand fragrances are inspired by edible smells: vanilla, chocolate, caramel, coffee, honey, or pastries. If you love sweet smells, this is a category worth exploring.

## Don't buy based on the opening

A fragrance develops over time. The first few minutes represent the opening. As the fragrance evolves, different materials become more noticeable. This is why smelling a fragrance on a paper strip for ten seconds isn't enough to make a serious purchasing decision.

If possible, test it on your skin and give it several hours. Ask yourself: do I still like this after the initial excitement disappears? That's a much better test. Our [concentration guide](/learn/fragrance-concentrations) explains why the same scent can behave so differently across formats.

## Consider your personality — but don't overthink it

Fragrance can be an extension of personal style. Someone who loves minimalist clothing may prefer clean, understated fragrances. Someone who enjoys bold fashion may gravitate toward intense fragrances.

But there are no rules. You don't have to wear a particular fragrance because someone says it "matches" your personality. Your taste is the most important factor.

## Think about your environment

Where you live matters. Warm temperatures can make fragrances project more strongly. Cold weather can make certain compositions feel quieter.

If you're in a hot environment, you might prefer citrus, aquatic, green, or lighter aromatic fragrances. During colder months, richer woody, spicy, amber, vanilla, and gourmand fragrances can feel particularly comfortable.

## Set a budget

Fragrance pricing ranges dramatically. You can find enjoyable fragrances at relatively affordable prices, while luxury and niche fragrances can cost hundreds of dollars.

Don't assume price equals quality. Determine what you're comfortable spending before shopping. A $90 fragrance you genuinely love is a better purchase than a $300 fragrance you feel pressured to buy.

## Sample before you buy

Sampling is one of the best ways to avoid expensive mistakes. Your first impression might change dramatically after an hour. Try to sample fragrances individually rather than spraying ten different scents on yourself simultaneously.

Keep notes about fragrances you test. Record:

- Name
- Opening impression
- After one hour
- After several hours
- Longevity
- Projection
- Whether you'd wear it again

Over time, you'll begin to recognize patterns in your preferences.

## Use our fragrance quiz

If you're still unsure where to start, use our [fragrance quiz](/). Instead of browsing hundreds of products randomly, the quiz narrows your preferences based on factors such as occasion, season, style, scent preferences, and budget. You can also browse the [brand directory](/brands) to explore houses you haven't encountered yet.

Treat the results as recommendations — not rules. The purpose of a recommendation tool is to help you discover fragrances you may enjoy, not tell you what you are supposed to like.

## Final advice

Don't chase popularity. Don't buy something just because everyone online says it's a "must-have." Don't assume expensive means better. And don't judge a fragrance after ten seconds.

The best fragrance for you is ultimately the one you enjoy wearing. Your fragrance should make you feel comfortable, confident, and like yourself.`;

const summer = `Summer changes the way many people approach fragrance. Heat can make strong fragrances feel significantly more intense, so many people prefer scents that feel fresh, clean, citrusy, aquatic, green, or lightly aromatic.

Finding a good summer fragrance doesn't require spending hundreds of dollars. The fragrances below represent different styles and price points. Prices vary between retailers and promotions, so always check the current price before purchasing.

## What makes a good summer fragrance?

There isn't one ingredient that automatically makes a fragrance suitable for summer. Instead, look for characteristics such as:

- Citrus freshness
- Aquatic accords
- Green notes
- Light woods
- Aromatic herbs
- Clean musks
- Moderate sweetness

The key is balance.

## 1. Versace Pour Homme

A classic example of an easygoing warm-weather fragrance. Its clean, fresh character makes it particularly versatile for daytime wear. It's the kind of fragrance that works when you don't want to overthink your choice.

Best for: everyday summer wear.

## 2. Montblanc Explorer

Explorer offers a more woody interpretation of freshness. It's versatile enough for casual situations, work, and evenings.

Best for: someone who wants a summer fragrance with more depth.

## 3. Dolce & Gabbana Light Blue

Light Blue has long been associated with warm-weather fragrance. Its fresh character makes it particularly suitable for casual summer environments.

Best for: beach days and casual outings.

## 4. Nautica Voyage

One of the most accessible choices for someone looking for an inexpensive fresh fragrance. It's particularly appealing if you want something casual rather than formal.

Best for: beginners and everyday wear.

## 5. Coach for Men

A versatile option with a fresh opening and a more rounded dry-down. It works well for someone who wants freshness without going completely aquatic.

Best for: casual and smart-casual occasions.

## 6. Jimmy Choo Man Ice

A bright, approachable option that works particularly well during warmer months. Its style makes it easy to wear during the day.

Best for: casual daytime wear.

## 7. Azzaro Chrome

Chrome is another long-running fresh fragrance option. Its clean character makes it appropriate for situations where you want something noticeable without being overly heavy.

Best for: everyday use.

## 8. Calvin Klein CK One

CK One is an iconic unisex fragrance. Its straightforward freshness makes it a useful option for people who want something uncomplicated.

Best for: casual summer days.

## 9. Issey Miyake L'Eau d'Issey Pour Homme

A more distinctive choice for someone who wants a fresh fragrance with additional character. It's particularly interesting if you want something outside the most common designer releases.

Best for: someone looking for a classic fresh profile.

## 10. Bentley For Men Azure

An affordable option worth exploring if you want a fresh fragrance without paying luxury prices.

Best for: budget-conscious fragrance shoppers.

## Don't forget application

Summer doesn't necessarily mean you need to spray less, but it does mean you should pay attention to your environment. If you're entering a small office, car, classroom, or restaurant, excessive spraying can quickly become uncomfortable for others. Consider your surroundings before applying.

Most of the fragrances above are sold as EDTs — our [concentration guide](/learn/fragrance-concentrations) explains what that means for how they behave in the heat.

## The bottom line

A great summer fragrance should make you want to wear it. Don't obsess over whether a fragrance is officially categorized as a "summer scent." If you enjoy the smell, it performs appropriately for your environment, and it fits your budget, it's a good choice.

Use our [fragrance quiz](/) to discover additional options based on your personal preferences.`;

const winter = `Cold weather changes how fragrance can feel. During winter, many fragrance enthusiasts gravitate toward warmer, richer compositions featuring vanilla, amber, woods, spices, leather, tobacco, and gourmand elements.

That doesn't mean every winter fragrance needs to be heavy. The best choice depends on your personal taste and where you're wearing it. Prices vary between retailers and promotions — always confirm before buying.

## What makes a fragrance work in winter?

Cold temperatures can change how fragrances develop and project. Many people therefore enjoy fragrances with:

- Vanilla
- Amber
- Woods
- Spice
- Tobacco
- Leather
- Tonka
- Gourmand accords

These ingredients can create a warmer and more enveloping fragrance experience.

## 1. Azzaro Wanted

A versatile option with a noticeable presence. It's suitable for evenings and social occasions where you want something more energetic.

Best for: nights out.

## 2. Mercedes-Benz Club Black

An appealing option for people who enjoy vanilla-forward fragrances. Its sweeter personality makes it particularly appropriate for cold evenings.

Best for: vanilla lovers.

## 3. Halloween Man X

An affordable fragrance with a darker, sweeter personality. It's worth exploring if you want something casual and budget-friendly.

Best for: casual winter evenings.

## 4. Bentley For Men Intense

A richer fragrance profile that can work particularly well in cold weather. It's an interesting choice for someone who wants something less mainstream.

Best for: experienced fragrance users.

## 5. Rochas Moustache Eau de Parfum

A warm and approachable option with a more dressed-up character. It can work especially well for evening occasions.

Best for: dates and dinners.

## 6. Lalique Encre Noire

A very different approach to winter fragrance. Instead of sweetness, it emphasizes darker woody and earthy characteristics.

Best for: people who prefer sophisticated woody scents.

## 7. Lattafa Khamrah

A sweet, gourmand-style fragrance that has become popular among people who enjoy rich and dessert-like profiles.

Best for: cold evenings and gourmand enthusiasts.

## 8. Halloween Man Shot

A warmer, sweeter option that can work well during colder months.

Best for: casual winter wear.

## 9. Mercedes-Benz Select Night

A darker and warmer interpretation suitable for evening use.

Best for: winter nights.

## 10. Guess 1981 Los Angeles Men

An affordable option for people looking for a warm, casual fragrance without a large investment.

Best for: everyday winter wear.

## Don't overspray

Winter can tempt people to spray more because cold air can make fragrance feel less noticeable. But indoor environments are different. You may walk outside in freezing weather and then enter a heated restaurant, office, or car, where the fragrance can suddenly become much stronger. Start conservatively and add more if necessary.

## Final thoughts

Winter fragrances don't have to be expensive. You can find excellent options across designer, affordable, and niche-inspired categories. The most important thing is matching the fragrance to your preferences and environment.

If you're unsure which direction to explore, our [fragrance quiz](/) can help narrow your choices, and the [brand directory](/brands) is a good way to research the houses behind these bottles.`;

const designerNiche = `One of the most common debates in fragrance is whether designer or niche fragrances are better. The short answer is: neither category automatically wins.

Designer and niche fragrances often approach fragrance from different perspectives, but the boundaries between them have become increasingly blurred.

## What is a designer fragrance?

Designer fragrance houses are generally associated with broader fashion, beauty, or luxury brands. Examples include brands such as Dior, Chanel, Gucci, Prada, and Yves Saint Laurent.

Designer fragrances are typically created for a relatively broad audience. That doesn't mean they're simple or low quality — many designer houses have created some of the most influential fragrances in modern perfumery.

## What is a niche fragrance?

Niche fragrance houses traditionally focus more heavily on perfumery itself rather than selling fragrances as one part of a larger fashion portfolio. Niche brands may experiment more aggressively with unusual materials, concepts, and compositions.

However, "niche" does not automatically mean better. You can compare both kinds of house side by side in our [brand directory](/brands).

## Price isn't a quality guarantee

One of the biggest mistakes new fragrance buyers make is assuming expensive equals better. It doesn't. A $100 fragrance can be more enjoyable to you than a $400 fragrance.

Price can reflect:

- Ingredients
- Production
- Packaging
- Distribution
- Brand positioning
- Marketing
- Exclusivity

It doesn't provide a universal measurement of how much you'll enjoy the scent.

## Designer advantages

- Accessibility — they're easier to find in department stores and established retailers.
- Testing — you can often smell them before purchasing.
- Versatility — many designer fragrances are designed to appeal to broad audiences.
- Pricing — designer fragrances frequently have discounts and different sizes available.

## Niche advantages

- Distinctiveness — some compositions feel more unusual than mainstream releases.
- Exploration — niche houses can be excellent for people who want to explore unfamiliar fragrance styles.
- Brand identity — many niche houses build their identity almost entirely around perfumery.

## Which should you choose?

Choose designer if you:

- Are new to fragrance
- Want easy availability
- Prefer recognizable styles
- Want to test before buying
- Have a moderate budget

Explore niche if you:

- Already understand your preferences
- Want something less common
- Enjoy experimentation
- Don't mind sampling before buying
- Are interested in unusual compositions

## Don't become a fragrance snob

There's nothing wrong with loving a designer fragrance. There's also nothing wrong with preferring niche. Your goal isn't to impress fragrance collectors — it's to find something you enjoy wearing.

## The bottom line

Designer versus niche is less important than finding a fragrance that matches your taste. Start by learning what you like. Once you understand your preferred scent families, sweetness level, freshness, projection, and performance, you can explore both categories intelligently.

Don't let a label make the decision for you. If you're still mapping your preferences, our [fragrance quiz](/) is a practical starting point.`;

const longevity = `You sprayed your fragrance in the morning. A few hours later, you can't smell it anymore. Does that mean the fragrance disappeared? Not necessarily.

Fragrance longevity is more complicated than simply asking how many hours a bottle lasts.

## Your nose can adapt

One of the biggest reasons people think their fragrance disappeared is olfactory adaptation. Your brain becomes accustomed to familiar smells. After wearing the same fragrance for several hours, you may stop noticing it even though people around you can still smell it.

Before adding more sprays, ask someone you trust whether they can still detect it. You might be surprised.

## Skin chemistry matters

Fragrance interacts with your skin. Factors including skin moisture, temperature, and individual chemistry can affect how a fragrance develops. The same fragrance can smell noticeably different on two people. This is why testing a fragrance on your own skin is so valuable.

## Moisturized skin can help

Very dry skin may not hold fragrance as effectively as well-moisturized skin. Applying an unscented moisturizer before fragrance can provide a better surface for fragrance to sit on. Avoid using heavily scented lotions if you don't want them to interfere with your fragrance.

## Don't confuse projection with longevity

This deserves repeating. Projection is how far a fragrance radiates. Longevity is how long it remains detectable.

A fragrance can project strongly for two hours and then become a subtle skin scent for many more hours. That isn't necessarily poor longevity. Our [concentration guide](/learn/fragrance-concentrations) explains how EDT, EDP and Parfum formats fit into this.

## Climate matters

Temperature and humidity influence fragrance behaviour. Warm conditions can increase evaporation and projection. Cold weather can make some fragrances feel quieter. This is one reason the same fragrance can feel completely different in July compared with January.

## Clothing can hold fragrance longer

Fabric can sometimes retain fragrance longer than skin. However, be careful: some fragrance ingredients can stain or damage delicate fabrics. If you're unsure, don't spray directly onto expensive clothing.

## Don't chase extreme performance

A fragrance that lasts 24 hours isn't necessarily better than one that lasts eight. Consider where you're wearing it. A fragrance that lasts all day may be unnecessary for a two-hour dinner, and a subtle fragrance may be preferable in an office. Performance should match the situation.

## How to improve your experience

- Moisturize your skin.
- Apply fragrance to appropriate pulse areas.
- Avoid excessive rubbing.
- Test the fragrance in different weather.
- Give the fragrance time to develop.
- Ask others whether they can still smell it before respraying.

## Final thoughts

Fragrance performance is influenced by the formula, your skin, your environment, and how you perceive scent. Don't automatically blame the fragrance because you stopped noticing it.

Give it time. Test it on your own skin. And remember that fragrance is about the entire experience — not simply achieving the highest possible number of hours. If longevity is your priority, our [fragrance quiz](/) lets you filter recommendations by how long you want a scent to last.`;

const dupes = `Fragrance dupes have become one of the most discussed topics in modern perfumery. A fragrance that costs $50 can sometimes remind you of one that costs $300. That raises an obvious question: why pay more?

The answer depends on what you're actually looking for.

## What is a fragrance dupe?

A dupe is generally a fragrance designed to resemble another fragrance. The resemblance may involve the overall scent profile, certain recognizable notes, or the way the fragrance develops.

However, a dupe is not necessarily identical to the original. Two fragrances can smell similar while still having meaningful differences.

## Similarity isn't identity

Imagine two fragrances that both contain prominent vanilla and amber characteristics. They might remind you of each other immediately. But after an hour, their development could become completely different. One might become woody. The other might become sweeter. The opening may be similar while the dry-down differs substantially.

This is why claims such as "100% identical" should be approached cautiously.

## Why are dupes cheaper?

A fragrance's retail price includes much more than the liquid inside the bottle. Costs can include:

- Packaging
- Marketing
- Distribution
- Retail overhead
- Brand positioning
- Product development
- Licensing
- Advertising

A lower-priced fragrance may have a different cost structure. That doesn't automatically mean it's worse.

## What you may give up

A cheaper alternative may differ in:

- Longevity
- Projection
- Ingredient quality
- Complexity
- Packaging
- Development
- Consistency

For some consumers, these differences matter. For others, they don't.

## When does a dupe make sense?

A dupe can make sense when:

- You enjoy the general scent profile
- You don't want to spend heavily
- You're experimenting with a style
- You want a casual everyday fragrance
- You're comfortable with some differences

## When should you buy the original?

The original may be worth considering if:

- You love the exact composition
- You value the brand
- You enjoy the bottle and presentation
- You prefer its specific development
- You want the complete product experience

Our [brand directory](/brands) links to official brand sites so you can confirm which products a house actually makes.

## Beware of counterfeits

A legitimate fragrance alternative is different from a counterfeit. A counterfeit product attempts to misrepresent itself as the original brand or product. That's a completely different issue.

When purchasing fragrance online, verify the seller, product information, return policy, and authenticity claims. Extremely low prices should encourage additional research rather than an impulse purchase. Our [retailer guide](/retailers) explains what to check before ordering.

## The bottom line

Dupes aren't automatically scams, and expensive originals aren't automatically superior. The right choice depends on what you value.

If you simply want a scent profile you enjoy, an affordable alternative may make sense. If you want the exact fragrance and complete brand experience, buy the original from a reputable source. The important thing is knowing what you're actually purchasing — and our [fragrance quiz](/) can help you describe the profile you're chasing in the first place.`;

const buyOnline = `Buying fragrance online can be convenient and affordable. You can compare prices across multiple retailers, discover brands that aren't available locally, and find promotions that may not be offered in stores.

But a low price doesn't automatically make a website a good place to buy. Before purchasing, take a few minutes to evaluate the seller.

## 1. Research the retailer

Start with the retailer itself. Look for:

- Established contact information
- Clear return policies
- Customer service information
- Secure checkout
- Company information
- Reviews from multiple sources

Don't rely entirely on testimonials displayed on the retailer's own website. Our [retailer guide](/retailers) summarizes what to look for on the sites Canadians use most.

## 2. Understand the difference between authorized and independent sellers

Not every legitimate fragrance retailer operates in exactly the same way. Some sellers are authorized retailers. Others may sell products through independent distribution channels.

These differences can affect:

- Pricing
- Packaging
- Availability
- Warranty or return policies
- Product sourcing

If authenticity is particularly important to you, investigate the retailer's sourcing and policies before purchasing.

## 3. Be careful with extremely low prices

Discounts happen. Clearance sales happen. Older packaging happens. But a price that seems dramatically lower than every other retailer deserves investigation.

Ask: why is this product so much cheaper? Don't automatically assume you've found an incredible deal.

## 4. Check the return policy

Before paying, understand:

- Whether returns are accepted
- How many days you have
- Whether opened fragrances can be returned
- Who pays return shipping
- What happens if the product arrives damaged

A low price isn't attractive if you're unable to resolve a problem.

## 5. Protect your payment information

Use established payment methods and secure checkout systems. Avoid sending sensitive payment information through email, social media messages, or unofficial channels. Look for HTTPS in your browser and verify that you're actually on the retailer's intended domain.

## 6. Understand grey-market fragrance

Grey-market products are generally genuine products sold outside a brand's preferred or authorized distribution network. Grey-market retail is not automatically synonymous with counterfeit products.

However, consumers should understand that sourcing and warranty arrangements may differ. That is why retailer transparency matters.

## 7. Know the difference between grey market and counterfeit

These terms should not be treated as interchangeable. A counterfeit product is designed to misrepresent itself as an authentic branded product. A grey-market product can be genuine while being sold through an alternative distribution channel.

If you're unsure about a seller or product, investigate before purchasing. Our article on [dupes versus originals](/learn/dupes-vs-originals) covers the related question of inspired-by fragrances.

## 8. Don't ignore your own experience

If you regularly buy fragrances online, keep track of reputable retailers you've had good experiences with. Save receipts and order confirmations. When purchasing expensive fragrances, document the product when it arrives, particularly if you have concerns about authenticity or damage.

## A simple safe-buying checklist

Before purchasing, ask:

- Who is selling it?
- Where is the seller located?
- Is the price realistic?
- What is the return policy?
- How can I contact customer service?
- How is the product described?
- Does the retailer explain its sourcing?
- What payment protections are available?

If several answers are unclear, consider another seller.

## Final thoughts

Online fragrance shopping doesn't have to be risky. The goal isn't to avoid every retailer that isn't a major department store — the goal is to make informed decisions.

Compare prices, research the seller, understand the distribution model, read the return policy, and be cautious when something seems too good to be true. A few minutes of research can save you considerably more money and frustration later. Once you know where to buy, our [fragrance quiz](/) can help you decide what to buy.`;

export const ARTICLES: Article[] = [
  {
    slug: "fragrance-concentrations",
    title: "Eau de Parfum vs. Eau de Toilette vs. Parfum: What's the Difference?",
    seoTitle: "EDP vs EDT vs Parfum: Fragrance Concentrations Explained — Scentwise",
    description:
      "What Eau de Toilette, Eau de Parfum and Parfum actually mean, why concentration doesn't guarantee longevity, and how to pick the right format for how you wear fragrance.",
    excerpt:
      "Concentration labels don't tell you how long a fragrance lasts. Here's what EDT, EDP and Parfum really mean — and how to choose between them.",
    category: "Fragrance Basics",
    published: "2026-02-10",
    updated: "2026-08-23",
    image: basicsImg,
    imageAlt: "Amber glass fragrance bottle resting on soft off-white linen in warm light",
    body: concentrations,
    related: ["fragrance-longevity", "how-to-choose-a-fragrance", "designer-vs-niche-fragrance"],
  },
  {
    slug: "how-to-choose-a-fragrance",
    title: "How to Choose a Fragrance That Actually Fits You",
    seoTitle: "How to Choose a Fragrance That Fits You — Scentwise",
    description:
      "A practical, jargon-free method for choosing a fragrance: start with the occasion, learn the main families, test on skin, set a budget and sample before you buy.",
    excerpt:
      "Skip the jargon. Start with the occasion, learn five broad families, test on skin — and let the quiz narrow the rest.",
    category: "Buying Guides",
    published: "2026-02-14",
    updated: "2026-08-23",
    image: buyingImg,
    imageAlt: "Hands holding a small fragrance sample vial and a scent card at a shop counter",
    body: choose,
    related: [
      "fragrance-concentrations",
      "designer-vs-niche-fragrance",
      "how-to-buy-fragrance-online",
    ],
  },
  {
    slug: "best-summer-fragrances-under-150",
    title: "10 Great Summer Fragrances Under $150 CAD",
    seoTitle: "10 Great Summer Fragrances Under $150 CAD — Scentwise",
    description:
      "Ten fresh, citrus, aquatic and light woody fragrances that work in Canadian summer heat, all typically available under $150 CAD, plus what makes a scent summer-friendly.",
    excerpt:
      "Fresh, citrus and aquatic picks that hold up in the heat — ten options that usually sit under $150 CAD.",
    category: "Seasonal Guides",
    published: "2026-03-02",
    updated: "2026-08-23",
    image: summerImg,
    imageAlt: "Citrus slices, mint leaves and a clear glass fragrance bottle on sunlit stone",
    body: summer,
    related: [
      "best-winter-fragrances-under-150",
      "fragrance-concentrations",
      "how-to-choose-a-fragrance",
    ],
  },
  {
    slug: "best-winter-fragrances-under-150",
    title: "10 Great Winter Fragrances Under $150 CAD",
    seoTitle: "10 Great Winter Fragrances Under $150 CAD — Scentwise",
    description:
      "Warm, spicy, woody and gourmand fragrances built for Canadian winters — ten options typically under $150 CAD, plus advice on not overspraying indoors.",
    excerpt:
      "Vanilla, amber, spice and smoke: ten cold-weather fragrances that usually stay under $150 CAD.",
    category: "Seasonal Guides",
    published: "2026-03-09",
    updated: "2026-08-23",
    image: winterImg,
    imageAlt: "Dark amber fragrance bottle beside cinnamon sticks and a wool knit in moody light",
    body: winter,
    related: [
      "best-summer-fragrances-under-150",
      "fragrance-longevity",
      "how-to-choose-a-fragrance",
    ],
  },
  {
    slug: "designer-vs-niche-fragrance",
    title: "Designer vs. Niche Fragrances: Which Should You Buy?",
    seoTitle: "Designer vs Niche Fragrance: Which Should You Buy? — Scentwise",
    description:
      "What separates designer from niche perfumery, why price isn't a quality guarantee, and how to decide which category fits your experience level and budget.",
    excerpt:
      "Neither category automatically wins. What actually separates designer from niche — and how to choose between them.",
    category: "Comparisons",
    published: "2026-03-20",
    updated: "2026-08-23",
    image: designerNicheImg,
    imageAlt: "Minimal perfume bottles with blank labels in streaks of sunlight",
    body: designerNiche,
    related: ["dupes-vs-originals", "how-to-choose-a-fragrance", "fragrance-concentrations"],
  },
  {
    slug: "fragrance-longevity",
    title: "Why Does My Fragrance Stop Lasting? Understanding Fragrance Longevity",
    seoTitle: "Why Your Fragrance Seems to Stop Lasting — Scentwise",
    description:
      "Olfactory adaptation, skin chemistry, climate and application all shape how long a fragrance lasts. Here's how to diagnose weak performance before blaming the bottle.",
    excerpt:
      "It's often your nose, not the bottle. Adaptation, skin chemistry, climate and application, explained.",
    category: "Fragrance Education",
    published: "2026-04-04",
    updated: "2026-08-23",
    image: longevityImg,
    imageAlt: "A woman applying a fragrance oil to her wrist in soft morning light",
    body: longevity,
    related: [
      "fragrance-concentrations",
      "best-winter-fragrances-under-150",
      "how-to-choose-a-fragrance",
    ],
  },
  {
    slug: "dupes-vs-originals",
    title: "Fragrance Dupes vs. Originals: What Are You Actually Getting?",
    seoTitle: "Fragrance Dupes vs Originals: What You're Really Buying — Scentwise",
    description:
      "How fragrance dupes differ from the originals they reference, why they cost less, when they make sense, and how to tell a legitimate alternative from a counterfeit.",
    excerpt:
      "Similar isn't identical. What a dupe really gives you, what it costs you, and where counterfeits differ.",
    category: "Comparisons",
    published: "2026-04-18",
    updated: "2026-08-23",
    image: dupesImg,
    imageAlt: "Two near-identical unlabelled amber glass bottles lying on linen",
    body: dupes,
    related: [
      "how-to-buy-fragrance-online",
      "designer-vs-niche-fragrance",
      "fragrance-concentrations",
    ],
  },
  {
    slug: "how-to-buy-fragrance-online",
    title: "How to Safely Buy Fragrance Online in Canada",
    seoTitle: "How to Safely Buy Fragrance Online in Canada — Scentwise",
    description:
      "A checklist for buying fragrance online in Canada: vetting retailers, understanding grey-market versus counterfeit, return policies, payment safety and realistic pricing.",
    excerpt:
      "Vetting sellers, understanding grey market versus counterfeit, and the checklist to run before you pay.",
    category: "Buying Guides",
    published: "2026-05-06",
    updated: "2026-08-23",
    image: buyOnlineImg,
    imageAlt: "A plain cardboard parcel box in warm afternoon sunlight",
    body: buyOnline,
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

export function wordCount(body: string): number {
  return body.split(/\s+/).filter(Boolean).length;
}

export function readingTime(body: string): number {
  return Math.max(3, Math.round(wordCount(body) / 220));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
