import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { FragranceCard } from "./components/FragranceCard";
import { LongevityStep } from "./components/LongevityStep";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import { NoteSelector } from "./components/NoteSelector";
import { OccasionStep } from "./components/OccasionStep";
import { ResultsGrid } from "./components/ResultsGrid";
import { SeasonStep } from "./components/SeasonStep";
import { StepIndicator } from "./components/StepIndicator";
import {
  getInitialRecommendations,
  type GenderPreference,
  type LongevityPreference,
} from "./utils/scoring";
import { priceBand, type PriceBandId } from "./utils/price";
import {
  parseSharedQuiz,
  parseStep,
  toQuizSearch,
  type QuizSearch,
  type SharedQuiz,
} from "./utils/quizUrl";

export type Answers = {
  season: string;
  longevity: LongevityPreference;
  occasion: string;
  gender: GenderPreference;
  selectedNotes: string[];
  avoidedNotes: string[];
  budget: PriceBandId | "";
};

const emptyAnswers: Answers = {
  season: "",
  longevity: "",
  occasion: "",
  gender: "",
  selectedNotes: [],
  avoidedNotes: [],
  budget: "",
};

// Answers survive a refresh for as long as this browser tab is open.
const STORAGE_KEY = "whichscent-quiz";

function loadSaved(): Answers | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = { ...emptyAnswers, ...(JSON.parse(raw) as Partial<Answers>) };
    return Array.isArray(saved.selectedNotes) && Array.isArray(saved.avoidedNotes) ? saved : null;
  } catch {
    return null;
  }
}

function save(answers: Answers) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {
    /* storage unavailable: answers just won't survive a refresh */
  }
}

function fromShared(shared: SharedQuiz): Answers {
  return {
    season: shared.season,
    occasion: shared.occasion,
    gender: shared.gender,
    longevity: shared.longevity,
    selectedNotes: shared.loved,
    avoidedNotes: shared.avoided,
    budget: shared.budget,
  };
}

function toShared(answers: Answers): SharedQuiz {
  return {
    season: answers.season,
    occasion: answers.occasion,
    gender: answers.gender,
    longevity: answers.longevity,
    loved: answers.selectedNotes,
    avoided: answers.avoidedNotes,
    budget: answers.budget,
  };
}

// The furthest step these answers can open: each step needs the answers before it.
function reachable(answers: Answers): number {
  if (!answers.season) return 1;
  if (!answers.occasion || !answers.gender) return 3;
  return 5;
}

function searchFor(step: number, answers: Answers): QuizSearch {
  if (step === 6) return toQuizSearch(toShared(answers));
  return step === 1 ? {} : { step };
}

export default function App({ search = {} }: { search?: QuizSearch }) {
  const navigate = useNavigate();
  // A results link (/?season=…&occasion=…) opens straight on the results.
  const shared = parseSharedQuiz(search);
  const sharedKey = shared ? JSON.stringify(shared) : "";
  const urlStep = shared ? 6 : (parseStep(search) ?? 1);

  const [answers, setAnswers] = useState<Answers>(() =>
    shared ? fromShared(shared) : emptyAnswers,
  );
  const [hydrated, setHydrated] = useState(false);
  // True when the results came from someone else's link rather than this visitor's quiz.
  const [viewingShared, setViewingShared] = useState(false);
  // Set when a summary chip on the results sends the visitor back to change one answer.
  const [editing, setEditing] = useState(false);
  const [undo, setUndo] = useState<{ answers: Answers; step: number } | null>(null);

  useEffect(() => {
    const saved = loadSaved();
    if (shared) {
      setViewingShared(JSON.stringify(saved ? toShared(saved) : null) !== sharedKey);
    } else if (saved) {
      setAnswers(saved);
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Back and Forward between two results links show the answers each one carries.
  useEffect(() => {
    if (shared) setAnswers(fromShared(shared));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sharedKey]);

  useEffect(() => {
    if (hydrated && !viewingShared) save(answers);
  }, [answers, hydrated, viewingShared]);

  const go = (step: number, next: Answers = answers, replace = false) =>
    void navigate({ to: "/", search: searchFor(step, next), replace });

  // A step in the URL that these answers can't reach (a new tab, cleared storage) falls back
  // to the furthest one they can.
  const step = urlStep === 6 ? 6 : hydrated ? Math.min(urlStep, reachable(answers)) : urlStep;
  useEffect(() => {
    if (hydrated && step !== urlStep) go(step, answers, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, step, urlStep]);

  // Each step starts at its question, and focus moves to it so keyboard and screen-reader
  // users land on the new step instead of the top of the page.
  const shownStep = useRef(step);
  useEffect(() => {
    if (shownStep.current === step) return;
    shownStep.current = step;
    window.scrollTo({ top: 0 });
    const heading = document.querySelector<HTMLElement>("#quiz h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
  }, [step]);

  useEffect(() => {
    if (!undo) return;
    const timer = window.setTimeout(() => setUndo(null), 8000);
    return () => window.clearTimeout(timer);
  }, [undo]);

  const answer = (next: Partial<Answers>, nextStep: number) => {
    const merged = { ...answers, ...next };
    setAnswers(merged);
    setViewingShared(false);
    // Changing one answer from the results goes straight back to the results.
    const target = editing ? 6 : nextStep;
    if (target === 6) setEditing(false);
    go(target, merged);
  };

  const editAnswer = (target: number) => {
    setEditing(target < 5);
    setViewingShared(false);
    go(target);
  };

  const startFresh = () => {
    setAnswers(emptyAnswers);
    setEditing(false);
    setViewingShared(false);
    go(1, emptyAnswers);
  };

  const restart = () => {
    setUndo({ answers, step });
    startFresh();
  };

  const undoRestart = () => {
    if (!undo) return;
    setAnswers(undo.answers);
    go(undo.step, undo.answers);
    setUndo(null);
  };

  const goBack = () => go(Math.max(1, step - 1));

  // Filtering by price stays on the results and updates the link in place.
  const setBudget = (budget: PriceBandId | "") => {
    const merged = { ...answers, budget };
    setAnswers(merged);
    go(6, merged, true);
  };

  const initialRecommendations = useMemo(
    () =>
      answers.season && answers.occasion && answers.gender
        ? getInitialRecommendations(
            answers.season,
            answers.occasion,
            answers.gender,
            answers.longevity,
          )
        : [],
    [answers.gender, answers.season, answers.occasion, answers.longevity],
  );

  // Tap cycle on a note: not selected → loved → avoided → not selected.
  const cycleNote = (note: string) => {
    setAnswers((current) => {
      const without = (list: string[]) => list.filter((item) => item !== note);
      if (current.selectedNotes.includes(note)) {
        return {
          ...current,
          selectedNotes: without(current.selectedNotes),
          avoidedNotes: [...current.avoidedNotes, note],
        };
      }
      if (current.avoidedNotes.includes(note)) {
        return { ...current, avoidedNotes: without(current.avoidedNotes) };
      }
      return { ...current, selectedNotes: [...current.selectedNotes, note] };
    });
  };

  // A vibe loves its notes (and un-avoids them); tapping an active vibe removes them.
  const applyVibe = (notes: string[], remove: boolean) => {
    setAnswers((current) => ({
      ...current,
      selectedNotes: remove
        ? current.selectedNotes.filter((n) => !notes.includes(n))
        : [...current.selectedNotes, ...notes.filter((n) => !current.selectedNotes.includes(n))],
      avoidedNotes: current.avoidedNotes.filter((n) => !notes.includes(n)),
    }));
  };

  const clearNotes = () =>
    setAnswers((current) => ({ ...current, selectedNotes: [], avoidedNotes: [] }));

  const setLongevity = (longevity: LongevityPreference) => {
    setAnswers((current) => ({ ...current, longevity }));
  };

  // Steps 2–4 get floating Back and Restart; the note step has its own action bar and the
  // results have their own controls.
  const showFloatingControls = step >= 2 && step <= 4;
  const waitingForSavedAnswers = !hydrated && urlStep > 1 && urlStep < 6;

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="scent-aura" aria-hidden="true" />
      <SiteHeader current="home" right={<StepIndicator step={step} />} />

      <div id="quiz" className="relative z-10 px-5 pb-16 pt-8 sm:pt-14">
        {waitingForSavedAnswers ? null : (
          <>
            {step === 1 && (
              <SeasonStep selected={answers.season} onSelect={(season) => answer({ season }, 2)} />
            )}
            {step === 2 && (
              <LongevityStep
                selected={answers.longevity}
                onSelect={(longevity) => answer({ longevity }, 3)}
              />
            )}
            {step === 3 && (
              <OccasionStep
                initialGender={answers.gender}
                selectedOccasion={answers.occasion}
                onSelect={(occasion, gender) => answer({ occasion, gender }, 4)}
              />
            )}
            {step === 4 && (
              <section className="mx-auto max-w-[900px] animate-scent-in">
                <div className="text-center">
                  <h1 className="font-serif text-4xl font-bold text-foreground sm:text-6xl">
                    Your first picks
                  </h1>
                  <p className="mx-auto mt-4 max-w-[34rem] text-base text-muted-foreground">
                    The best fit for your season and occasion at three price points. Add the notes
                    you love next to sharpen the list.
                  </p>
                </div>
                <div className="mt-10 grid gap-5 lg:grid-cols-3">
                  {initialRecommendations.map((fragrance) => (
                    <FragranceCard
                      key={fragrance.id}
                      fragrance={fragrance}
                      label={priceBand(fragrance).label}
                      mode="initial"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => go(5)}
                  className="mx-auto mt-8 flex rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-scent transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Refine by notes →
                </button>
              </section>
            )}
            {step === 5 && (
              <NoteSelector
                lovedNotes={answers.selectedNotes}
                avoidedNotes={answers.avoidedNotes}
                onCycle={cycleNote}
                onApplyVibe={applyVibe}
                onClear={clearNotes}
                longevity={answers.longevity}
                onLongevityChange={setLongevity}
                onSubmit={() => answer({}, 6)}
                onBack={goBack}
                onRestart={restart}
              />
            )}
            {step === 6 && (
              <ResultsGrid
                answers={answers}
                viewingShared={viewingShared}
                onEdit={editAnswer}
                onBudgetChange={setBudget}
                onRestart={restart}
                onStartFresh={startFresh}
              />
            )}
          </>
        )}
      </div>

      <SiteFooter />

      {showFloatingControls && (
        <>
          <button
            type="button"
            onClick={restart}
            className="fixed bottom-5 right-5 z-40 rounded-full bg-foreground px-5 py-3 text-sm font-bold text-background shadow-scent transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Restart WhichScent quiz"
          >
            Restart
          </button>
          <button
            type="button"
            onClick={goBack}
            className="fixed bottom-24 left-5 z-40 rounded-full border bg-card px-5 py-3 text-sm font-bold text-card-foreground shadow-scent transition hover:scale-105 hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Go back to previous WhichScent quiz step"
          >
            ← Back
          </button>
        </>
      )}
      <ScrollToTopButton hidden={step === 5} />

      {undo && (
        <div
          role="status"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-[420px] items-center justify-between gap-4 rounded-full bg-foreground py-2 pl-5 pr-2 text-sm text-background shadow-scent-hover"
        >
          <span>Quiz restarted.</span>
          <button
            type="button"
            onClick={undoRestart}
            className="min-h-11 rounded-full px-4 font-bold underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Undo
          </button>
        </div>
      )}
    </main>
  );
}
