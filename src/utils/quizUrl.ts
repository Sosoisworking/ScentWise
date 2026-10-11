import { NOTE_BY_NAME } from "../data/notes";
import { GENDER_KEYS, LONGEVITY_KEYS, OCCASION_OPTIONS, SEASON_OPTIONS } from "../data/quizOptions";
import type { GenderPreference, LongevityPreference } from "./scoring";

// Quiz answers in the homepage URL, so a results link can be shared and reopened:
// /?season=fall&longevity=long&occasion=date&gender=female&love=Vanilla,Rose&avoid=Oud

export interface QuizSearch {
  season?: string;
  longevity?: string;
  occasion?: string;
  gender?: string;
  love?: string;
  avoid?: string;
}

const KEYS = ["season", "longevity", "occasion", "gender", "love", "avoid"] as const;

/** TanStack Router `validateSearch`: keep only known string params. */
export function validateQuizSearch(search: Record<string, unknown>): QuizSearch {
  const out: QuizSearch = {};
  for (const key of KEYS) {
    const value = search[key];
    if (typeof value === "string" && value.length <= 500) out[key] = value;
  }
  return out;
}

export interface SharedQuiz {
  season: string;
  occasion: string;
  gender: GenderPreference;
  longevity: LongevityPreference;
  loved: string[];
  avoided: string[];
}

const notesFrom = (value: string | undefined) =>
  (value ?? "")
    .split(",")
    .map((n) => n.trim())
    .filter((n) => NOTE_BY_NAME.has(n));

/** A complete, valid set of answers from the URL, or null. */
export function parseSharedQuiz(search: QuizSearch): SharedQuiz | null {
  const { season, occasion, gender, longevity } = search;
  if (!SEASON_OPTIONS.some((s) => s.key === season)) return null;
  if (!OCCASION_OPTIONS.some((o) => o.key === occasion)) return null;
  if (!GENDER_KEYS.includes(gender as (typeof GENDER_KEYS)[number])) return null;
  const loved = notesFrom(search.love);
  return {
    season: season as string,
    occasion: occasion as string,
    gender: gender as GenderPreference,
    longevity: LONGEVITY_KEYS.includes(longevity as (typeof LONGEVITY_KEYS)[number])
      ? (longevity as LongevityPreference)
      : "",
    loved,
    avoided: notesFrom(search.avoid).filter((n) => !loved.includes(n)),
  };
}

export function toQuizSearch(quiz: SharedQuiz): QuizSearch {
  const search: QuizSearch = {
    season: quiz.season,
    occasion: quiz.occasion,
    gender: quiz.gender,
  };
  if (quiz.longevity) search.longevity = quiz.longevity;
  if (quiz.loved.length) search.love = quiz.loved.join(",");
  if (quiz.avoided.length) search.avoid = quiz.avoided.join(",");
  return search;
}
