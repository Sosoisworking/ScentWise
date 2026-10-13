import type { Brand } from "../../data/brands";

const categoryStyles: Record<Brand["category"], { label: string; cls: string }> = {
  designer: { label: "Designer", cls: "bg-secondary text-secondary-foreground" },
  niche: { label: "Niche", cls: "bg-accent text-accent-foreground" },
  luxury: { label: "Luxury", cls: "bg-primary/10 text-primary" },
};

export function BrandCard({ brand }: { brand: Brand }) {
  const cat = categoryStyles[brand.category];
  return (
    <article className="group relative flex flex-col rounded-xl border bg-card p-5 shadow-scent transition duration-200 hover:-translate-y-0.5 hover:shadow-scent-hover">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-serif text-lg font-bold leading-tight text-foreground">{brand.name}</h3>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${cat.cls}`}>
          {cat.label}
        </span>
        <span className="text-xs text-muted-foreground">{brand.country}</span>
        <span className="text-xs text-muted-foreground">· est. {brand.founded}</span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {brand.tagline}
      </p>
      <a
        href={brand.officialUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={brand.officialUrl}
        className="mt-4 inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-xs font-bold text-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Visit Official Site →
      </a>
    </article>
  );
}
