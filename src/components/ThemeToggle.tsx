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
    document.documentElement.classList.toggle("dark", dark);
    try {
      window.localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  }, [dark, hydrated]);

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-scent transition hover:-translate-y-0.5 hover:border-primary hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {dark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
