import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "scentwise-consent";
const OPEN_EVENT = "scentwise:open-consent";

export type ConsentChoice = "accepted" | "declined";

/**
 * Gate any advertising script, or anything that sets cookies, on this returning "accepted".
 * Vercel Web Analytics is cookieless and aggregate, so it runs regardless.
 */
export function getStoredConsent(): ConsentChoice | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

/** Re-open the banner so visitors can change or withdraw consent. */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // While open, publish the banner's height so fixed controls (quiz buttons, the note bar)
  // can sit above it instead of underneath.
  useEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    if (!open || !el) return;
    const update = () =>
      root.style.setProperty("--consent-offset", `${Math.ceil(el.offsetHeight) + 24}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--consent-offset");
    };
  }, [open]);

  useEffect(() => {
    if (getStoredConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const choose = (choice: ConsentChoice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* storage unavailable — banner will show again next visit */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-[640px] animate-scent-in rounded-2xl border bg-card p-4 text-card-foreground shadow-scent-hover sm:p-5"
    >
      <p className="text-sm leading-6 text-muted-foreground">
        WhichScent uses essential storage to remember your theme and this choice. With your
        permission, our advertising partners may also set cookies to show and measure ads. See our{" "}
        <Link
          to="/privacy"
          className="font-semibold text-primary underline-offset-2 hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-3 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={() => choose("declined")}
          className="rounded-full border bg-card px-4 py-2 text-sm font-bold text-card-foreground transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Essential only
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}
