import { useMemo, useState } from "react";
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

type QuizState = {
  step: number;
  longevity: LongevityPreference;
  season: string;
  occasion: string;
  gender: GenderPreference;
  selectedNotes: string[];
  avoidedNotes: string[];
};

const initialState: QuizState = {
  step: 1,
  longevity: "",
  season: "",
  occasion: "",
  gender: "",
  selectedNotes: [],
  avoidedNotes: [],
};
const tierLabels = ["Budget Gem", "Best Value", "Premium Pick"];

export default function App() {
  const [quiz, setQuiz] = useState<QuizState>(initialState);
  const [loading, setLoading] = useState(false);

  const advance = (next: Partial<QuizState>) => {
    setLoading(true);
    window.setTimeout(() => {
      setQuiz((current) => ({ ...current, ...next }));
      setLoading(false);
    }, 300);
  };

  const initialRecommendations = useMemo(
    () =>
      quiz.season && quiz.occasion && quiz.gender
        ? getInitialRecommendations(quiz.season, quiz.occasion, quiz.gender, quiz.longevity)
        : [],
    [quiz.gender, quiz.season, quiz.occasion, quiz.longevity],
  );

  const reset = () => setQuiz(initialState);
  const goBack = () => {
    setQuiz((current) => ({ ...current, step: Math.max(1, current.step - 1) }));
  };

  // Tap cycle on a note: not selected → loved → avoided → not selected.
  const cycleNote = (note: string) => {
    setQuiz((current) => {
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

  const clearNotes = () =>
    setQuiz((current) => ({ ...current, selectedNotes: [], avoidedNotes: [] }));

  // The note step has its own action bar with Back and Restart, so the floating buttons
  // would only cover note chips.
  const hideOnNoteStep = quiz.step === 5 ? "hidden" : "";

  const setLongevity = (longevity: LongevityPreference) => {
    setQuiz((current) => ({ ...current, longevity }));
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="scent-aura" aria-hidden="true" />
      <SiteHeader current="home" right={<StepIndicator step={quiz.step} />} />

      {loading && (
        <div
          className="fixed inset-x-0 top-0 z-30 h-1 animate-shimmer bg-shimmer"
          aria-label="Loading next step"
        />
      )}

      <div className="relative z-10 px-5 pb-16 pt-8 sm:pt-14">
        {quiz.step === 1 && <SeasonStep onSelect={(season) => advance({ season, step: 2 })} />}
        {quiz.step === 2 && (
          <LongevityStep onSelect={(longevity) => advance({ longevity, step: 3 })} />
        )}
        {quiz.step === 3 && (
          <OccasionStep onSelect={(occasion, gender) => advance({ occasion, gender, step: 4 })} />
        )}
        {quiz.step === 4 && (
          <section className="mx-auto max-w-[900px] animate-scent-in">
            <div className="text-center">
              <h1 className="font-serif text-4xl font-bold text-foreground sm:text-6xl">
                Your first picks
              </h1>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {initialRecommendations.map((fragrance, index) => (
                <FragranceCard
                  key={fragrance.id}
                  fragrance={fragrance}
                  label={tierLabels[index]}
                  mode="initial"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => advance({ step: 5 })}
              className="mx-auto mt-8 flex rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-scent transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Refine by notes →
            </button>
          </section>
        )}
        {quiz.step === 5 && (
          <NoteSelector
            lovedNotes={quiz.selectedNotes}
            avoidedNotes={quiz.avoidedNotes}
            onCycle={cycleNote}
            onClear={clearNotes}
            longevity={quiz.longevity}
            onLongevityChange={setLongevity}
            onSubmit={() => advance({ step: 6 })}
            onBack={goBack}
            onRestart={reset}
          />
        )}
        {quiz.step === 6 && (
          <ResultsGrid
            season={quiz.season}
            occasion={quiz.occasion}
            gender={quiz.gender}
            longevity={quiz.longevity}
            selectedNotes={quiz.selectedNotes}
            avoidedNotes={quiz.avoidedNotes}
            onRestart={reset}
          />
        )}
      </div>

      <SiteFooter />

      <button
        type="button"
        onClick={reset}
        className={`fixed bottom-5 right-5 z-40 rounded-full ${hideOnNoteStep} bg-foreground px-5 py-3 text-sm font-bold text-background shadow-scent transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
        aria-label="Restart Scentwise quiz"
      >
        Restart
      </button>
      <ScrollToTopButton hidden={quiz.step === 5} />
      {quiz.step > 1 && (
        <button
          type="button"
          onClick={goBack}
          className={`fixed bottom-24 left-5 z-40 rounded-full border bg-card px-5 py-3 text-sm font-bold text-card-foreground shadow-scent transition hover:scale-105 hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${hideOnNoteStep}`}
          aria-label="Go back to previous Scentwise quiz step"
        >
          ← Back
        </button>
      )}
    </main>
  );
}
