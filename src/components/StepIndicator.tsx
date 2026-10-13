type StepIndicatorProps = { step: number };

// Six questions; the seventh screen is the results, which isn't a step to complete.
const STEPS = 6;

export function StepIndicator({ step }: StepIndicatorProps) {
  const results = step > STEPS;
  return (
    <div className="flex items-center gap-2.5">
      <ol className="hidden items-center gap-1 sm:flex" aria-hidden="true">
        {Array.from({ length: STEPS }, (_, index) => (
          <li
            key={index}
            className={`h-2 w-4 rounded-full transition-colors duration-300 ${index < step ? "bg-primary" : "bg-border"}`}
          />
        ))}
      </ol>
      <p className="text-xs font-semibold tabular-nums text-muted-foreground" aria-live="polite">
        {results ? "Your results" : `Step ${step} of ${STEPS}`}
      </p>
    </div>
  );
}
