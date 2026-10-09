import { createFileRoute } from "@tanstack/react-router";
import App from "../App";
import { SITE_URL } from "../lib/site";
import { validateQuizSearch } from "../utils/quizUrl";

export const Route = createFileRoute("/")({
  validateSearch: validateQuizSearch,
  head: () => ({
    meta: [
      { title: "Scentwise — AI Fragrance Discovery" },
      {
        name: "description",
        content:
          "Take a five-step fragrance quiz to discover perfume matches by season, vibe, notes, budget, and longevity.",
      },
      { property: "og:title", content: "Scentwise — AI Fragrance Discovery" },
      {
        property: "og:description",
        content: "Find your signature scent with a warm, guided fragrance quiz.",
      },
      { property: "og:url", content: `${SITE_URL}/` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Index,
});

function Index() {
  return <App search={Route.useSearch()} />;
}
