type StepIndicatorProps = { step: number };

export function StepIndicator({ step }: StepIndicatorProps) {
  return (
    <nav className="flex items-center justify-center gap-3" aria-label="Quiz progress">
      {Array.from({ length: 6 }, (_, index) => {
        const value = index + 1;
        return (
          <span
            key={value}
            className={`h-2.5 rounded-full transition-all duration-300 ${value <= step ? "w-8 bg-primary" : "w-2.5 bg-border"}`}
            aria-label={`Step ${value}${value === step ? ", current" : ""}`}
          />
        );
      })}
    </nav>
  );
}
