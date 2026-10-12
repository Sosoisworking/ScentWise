import {
  Briefcase,
  Coffee,
  Dumbbell,
  Gem,
  PartyPopper,
  Sofa,
  TreePalm,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { OCCASION_OPTIONS as occasions } from "../data/quizOptions";

const ICONS: Record<string, LucideIcon> = {
  everyday: Coffee,
  office: Briefcase,
  date: Wine,
  party: PartyPopper,
  formal: Gem,
  vacation: TreePalm,
  gym: Dumbbell,
  cozy: Sofa,
};

export function OccasionStep({
  selected = "",
  onSelect,
}: {
  selected?: string;
  onSelect: (occasion: string) => void;
}) {
  return (
    <section className="mx-auto max-w-[900px] text-center animate-scent-in">
      <h1 className="font-serif text-3xl font-bold text-foreground sm:text-6xl">
        Where will you wear it?
      </h1>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 lg:grid-cols-4">
        {occasions.map((occasion) => {
          const Icon = ICONS[occasion.key];
          return (
            <button
              key={occasion.key}
              type="button"
              aria-pressed={selected === occasion.key}
              onClick={() => onSelect(occasion.key)}
              className={`rounded-2xl border bg-card px-4 py-4 shadow-scent sm:py-6 transition duration-300 hover:-translate-y-1 hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected === occasion.key ? "border-primary ring-2 ring-primary" : ""}`}
            >
              <Icon
                className="mx-auto h-7 w-7 text-primary"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="mt-3 block font-semibold text-foreground">{occasion.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
