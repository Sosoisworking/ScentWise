import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "scentwise-theme";

function getInitialDark(): boolean {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setDark(getInitialDark());
    setHydrated(true);
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
    try {
      window.localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
    return () => {
      window.clearTimeout(timer);
      root.classList.remove("theme-switching");
    };
  }, [dark, hydrated]);

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-scent transition hover:-translate-y-0.5 hover:border-primary hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {dark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
