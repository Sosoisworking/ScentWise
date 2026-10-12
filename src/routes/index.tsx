import { createFileRoute } from "@tanstack/react-router";
import App from "../App";
import { SITE_URL } from "../lib/site";
import { validateQuizSearch } from "../utils/quizUrl";

export const Route = createFileRoute("/")({
  validateSearch: validateQuizSearch,
  head: () => ({
    meta: [
      { title: "WhichScent — AI Fragrance Discovery" },
      {
        name: "description",
        content:
          "A seven-step fragrance quiz: pick your season, staying power, occasion and the notes you love, and get a ranked shortlist to sample, with typical Canadian prices.",
      },
      { property: "og:title", content: "WhichScent — AI Fragrance Discovery" },
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
