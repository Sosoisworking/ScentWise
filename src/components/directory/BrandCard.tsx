import type { Brand } from "../../data/brands";
import { flagFor } from "../../data/brands";

const categoryStyles: Record<Brand["category"], { label: string; cls: string }> = {
  designer: { label: "Designer", cls: "bg-budget text-budget-foreground" },
  niche: { label: "Niche", cls: "bg-premium text-premium-foreground" },
  luxury: { label: "Luxury", cls: "bg-mid text-mid-foreground" },
};

export function BrandCard({ brand, accent = false }: { brand: Brand; accent?: boolean }) {
  const cat = categoryStyles[brand.category];
  return (
    <article
      className={`group relative flex flex-col rounded-xl border bg-card p-5 shadow-scent transition duration-200 hover:-translate-y-0.5 hover:shadow-scent-hover ${
        accent ? "border-primary/50" : ""
      }`}
    >
      {brand.featured && (
        <span className="absolute right-3 top-3 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
          ★ Featured
        </span>
      )}
      <div className="flex items-start justify-between gap-2 pr-16">
        <h3 className="font-serif text-lg font-bold leading-tight text-foreground">{brand.name}</h3>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${cat.cls}`}>{cat.label}</span>
        <span className="text-xs text-muted-foreground">
          {flagFor(brand.country)} {brand.country}
        </span>
        <span className="text-xs text-muted-foreground">· est. {brand.founded}</span>
      </div>
      <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{brand.tagline}</p>
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
