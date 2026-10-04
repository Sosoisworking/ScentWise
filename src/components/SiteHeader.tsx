import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";

type SiteHeaderProps = {
  tagline?: string;
  current?: "home" | "brands" | "retailers" | "learn" | "about" | "contact";
  breadcrumb?: string;
  right?: ReactNode;
};

const NAV = [
  { to: "/brands", label: "Brands", key: "brands" as const },
  { to: "/retailers", label: "Where to Buy", key: "retailers" as const },
  { to: "/learn", label: "Learn", key: "learn" as const },
  { to: "/about", label: "About", key: "about" as const },
  { to: "/contact", label: "Contact", key: "contact" as const },
];

export function SiteHeader({ tagline = "Find your signature scent", current = "home", breadcrumb, right }: SiteHeaderProps) {
  return (
    <header className="relative z-10 mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-5 py-6">
      <Link to="/" className="shrink-0">
        <p className="font-serif text-2xl font-bold text-foreground">Scentwise</p>
        <p className="text-sm text-muted-foreground">{tagline}</p>
        {breadcrumb && <p className="mt-1 text-xs text-muted-foreground">{breadcrumb}</p>}
      </Link>
      <nav className="flex flex-1 flex-wrap items-center justify-end gap-2 sm:gap-3" aria-label="Primary">
        {NAV.map((item) => {
          const active = current === item.key;
          const className = active
            ? "rounded-full border border-primary bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow-scent"
            : "rounded-full border border-border bg-card px-4 py-2 text-xs font-bold uppercase tracking-wide text-card-foreground shadow-scent transition hover:-translate-y-0.5 hover:border-primary hover:bg-accent hover:text-foreground";
          return (
            <Link key={item.key} to={item.to} className={className}>
              {item.label}
            </Link>
          );
        })}
        <ThemeToggle />
        {right && <div className="ml-1 sm:ml-2">{right}</div>}
      </nav>
    </header>
  );
}
