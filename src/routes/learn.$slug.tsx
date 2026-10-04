import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { ArticleBody, headings } from "../components/article/ArticleBody";
import { ArticleCard } from "../components/article/ArticleCard";
import { ARTICLES, AUTHOR, formatDate, getArticle, readingTime } from "../data/articles";
import { SITE_URL } from "../lib/site";

const SITE = SITE_URL;

export const Route = createFileRoute("/learn/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ params, loaderData }) => {
    const article = loaderData?.article;
    const url = `${SITE}/learn/${params.slug}`;
    if (!article) {
      return {
        meta: [{ title: "Article not found — Scentwise" }, { name: "robots", content: "noindex" }],
      };
    }
    const image = `${SITE}${article.image}`;
    return {
      meta: [
        { title: article.seoTitle },
        { name: "description", content: article.description },
        { name: "author", content: AUTHOR.name },
        { property: "og:type", content: "article" },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.description },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: article.title },
        { name: "twitter:description", content: article.description },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            image,
            articleSection: article.category,
            datePublished: article.published,
            dateModified: article.updated,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            author: { "@type": "Organization", name: AUTHOR.name, url: `${SITE}/editorial-policy` },
            publisher: { "@type": "Organization", name: "Scentwise", url: SITE },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE },
              { "@type": "ListItem", position: 2, name: "Learn", item: `${SITE}/learn` },
              { "@type": "ListItem", position: 3, name: article.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: ArticleNotFound,
  component: ArticlePage,
});

function ArticleNotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader current="learn" tagline="Fragrance Learn Hub" breadcrumb="Home › Learn" />
      <div className="mx-auto max-w-[760px] px-5 py-20 text-center">
        <h1 className="font-serif text-3xl font-bold sm:text-4xl">We couldn't find that article</h1>
        <p className="mt-4 text-muted-foreground">
          It may have been renamed. Browse everything in the Learn hub.
        </p>
        <Link
          to="/learn"
          className="mt-8 inline-flex rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wide text-primary-foreground"
        >
          Back to Learn
        </Link>
      </div>
      <SiteFooter />
    </main>
  );
}

function ShareLinks({ title, url }: { title: string; url: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const links = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    { label: "Email this", href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
  ];
  return (
    <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-6">
      <span className="mr-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        Share
      </span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-card-foreground transition hover:border-primary hover:text-foreground"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const toc = headings(article.body);
  const related = article.related
    .map((slug) => ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is (typeof ARTICLES)[number] => Boolean(a));
  const url = `${SITE}/learn/${article.slug}`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader current="learn" tagline="Fragrance Learn Hub" />

      <div className="mx-auto w-full max-w-[820px] px-5 pb-6 pt-2">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link to="/learn" className="hover:text-foreground">
                Learn
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-foreground">{article.category}</li>
          </ol>
        </nav>

        <p className="mt-6 text-[11px] font-bold uppercase tracking-wide text-primary">
          {article.category}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold leading-tight sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{article.excerpt}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{AUTHOR.name}</span>
          <span aria-hidden>·</span>
          <span>
            Published <time dateTime={article.published}>{formatDate(article.published)}</time>
          </span>
          <span aria-hidden>·</span>
          <span>
            Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
          </span>
          <span aria-hidden>·</span>
          <span>{readingTime(article.body)} min read</span>
        </div>

        <img
          src={article.image}
          alt={article.imageAlt}
          width={1280}
          height={720}
          decoding="async"
          className="mt-7 aspect-[16/9] w-full rounded-3xl border border-border object-cover shadow-scent"
        />

        {toc.length > 3 && (
          <nav
            aria-label="Table of contents"
            className="mt-8 rounded-2xl border border-border bg-card p-5"
          >
            <h2 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              In this article
            </h2>
            <ol className="mt-3 space-y-1.5 text-sm">
              {toc.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`} className="text-muted-foreground hover:text-primary">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <ArticleBody body={article.body} />

        <ShareLinks title={article.title} url={url} />

        {/* Author box */}
        <section className="mt-8 rounded-3xl border border-border bg-card p-6">
          <h2 className="font-serif text-lg font-bold">{AUTHOR.name}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{AUTHOR.bio}</p>
          <Link
            to="/editorial-policy"
            className="mt-3 inline-block text-xs font-bold uppercase tracking-wide text-primary"
          >
            Read our editorial policy →
          </Link>
        </section>

        {/* Tool CTAs */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-primary/30 bg-accent p-6">
            <h2 className="font-serif text-xl font-bold">Not sure where to start?</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Take the guided fragrance quiz — season, longevity, occasion and notes — and get
              matches ranked by fit.
            </p>
            <Link
              to="/"
              className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary-foreground transition hover:bg-primary-hover"
            >
              Start the quiz
            </Link>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-bold">Browse the fragrance database</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Explore verified brands and official sites, or compare where to buy before you order.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/brands"
                className="rounded-full border border-border bg-background px-4 py-2 text-xs font-bold uppercase tracking-wide transition hover:border-primary"
              >
                Brand directory
              </Link>
              <Link
                to="/retailers"
                className="rounded-full border border-border bg-background px-4 py-2 text-xs font-bold uppercase tracking-wide transition hover:border-primary"
              >
                Where to buy
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold">Related reading</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
      <ScrollToTopButton />
    </main>
  );
}
