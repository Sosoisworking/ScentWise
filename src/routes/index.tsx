import { createFileRoute } from "@tanstack/react-router";
import App from "../App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Scentwise — AI Fragrance Discovery" },
      { name: "description", content: "Take a five-step fragrance quiz to discover perfume matches by season, vibe, notes, budget, and longevity." },
      { property: "og:title", content: "Scentwise — AI Fragrance Discovery" },
      { property: "og:description", content: "Find your signature scent with a warm, guided fragrance quiz." },
      { property: "og:url", content: "https://scentwisefragrances.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://scentwisefragrances.lovable.app/" }],
  }),
  component: Index,
});

function Index() {
  return <App />;
}
