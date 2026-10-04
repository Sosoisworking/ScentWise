import { Link } from "@tanstack/react-router";
import { formatDate, readingTime, type Article } from "../../data/articles";

export function ArticleCard({ article, priority = false }: { article: Article; priority?: boolean }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-scent transition hover:-translate-y-0.5 hover:shadow-scent-hover">
      <Link to="/learn/$slug" params={{ slug: article.slug }} className="block" aria-label={article.title}>
        <img
          src={article.image}
          alt={article.imageAlt}
          width={1280}
          height={720}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="aspect-[16/9] w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-wide text-primary">{article.category}</p>
        <h3 className="mt-2 font-serif text-xl font-bold leading-snug text-foreground">
          <Link to="/learn/$slug" params={{ slug: article.slug }} className="hover:text-primary">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <time dateTime={article.published}>{formatDate(article.published)}</time>
          <span aria-hidden>·</span>
          <span>{readingTime(article.body)} min read</span>
        </div>
        <div className="mt-5 pt-1">
          <Link
            to="/learn/$slug"
            params={{ slug: article.slug }}
            className="inline-flex rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary-foreground transition hover:bg-primary-hover"
          >
            Read article →
          </Link>
        </div>
      </div>
    </article>
  );
}
