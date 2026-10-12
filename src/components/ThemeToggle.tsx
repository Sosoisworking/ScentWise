import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Holds a theme only when the visitor picked one with this toggle. Without a choice the site
// follows the device, including when the device switches between light and dark later.
const STORAGE_KEY = "whichscent-theme";
// Earlier builds saved the device theme on first load, which pinned it; drop that value.
const LEGACY_KEY = "scentwise-theme";

const systemQuery = () => window.matchMedia?.("(prefers-color-scheme: dark)");

function storedChoice(): boolean | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;
  } catch {
    /* storage unavailable */
  }
  return null;
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.removeItem(LEGACY_KEY);
    } catch {
      /* storage unavailable */
    }
    setDark(storedChoice() ?? systemQuery()?.matches ?? false);
    setHydrated(true);
    const query = systemQuery();
    const follow = (event: MediaQueryListEvent) => {
      if (storedChoice() === null) setDark(event.matches);
    };
    query?.addEventListener("change", follow);
    return () => query?.removeEventListener("change", follow);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    // Switch every colour at once: without this, elements with colour transitions fade while
    // their text flips instantly, which flashes dark-on-dark for a moment.
    const root = document.documentElement;
    root.classList.add("theme-switching");
    root.classList.toggle("dark", dark);
    // Reading a computed style applies the new colours now, while transitions are off.
    void window.getComputedStyle(document.body).color;
    const timer = window.setTimeout(() => root.classList.remove("theme-switching"), 1);
    return () => {
      window.clearTimeout(timer);
      root.classList.remove("theme-switching");
    };
  }, [dark, hydrated]);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* storage unavailable: the choice lasts for this page only */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-scent transition hover:-translate-y-0.5 hover:border-primary hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Both icons render; the page's theme class picks one, so it's right from first paint. */}
      <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
    </button>
  );
}
