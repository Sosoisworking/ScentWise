type StepIndicatorProps = { step: number };

const STEPS = 7;

export function StepIndicator({ step }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2.5">
      <ol className="flex items-center gap-1" aria-hidden="true">
        {Array.from({ length: STEPS }, (_, index) => (
          <li
            key={index}
            className={`h-2 w-4 rounded-full transition-colors duration-300 ${index < step ? "bg-primary" : "bg-border"}`}
          />
        ))}
      </ol>
      <p className="text-xs font-semibold tabular-nums text-muted-foreground" aria-live="polite">
        Step {step} of {STEPS}
      </p>
    </div>
  );
}
