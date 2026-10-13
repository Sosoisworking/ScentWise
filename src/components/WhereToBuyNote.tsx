import { Link } from "@tanstack/react-router";

/** Why cards link to these two shops, next to the cards themselves. */
export function WhereToBuyNote() {
  return (
    <p className="mx-auto mt-10 max-w-[34rem] text-center text-sm text-muted-foreground">
      Sephora Canada is an authorized store with easy returns; FragranceBuy is a Canadian discounter
      with lower prices and stricter returns. We earn nothing from either, and prices are typical
      Canadian ranges.{" "}
      <Link
        to="/retailers"
        className="font-semibold text-primary underline-offset-2 hover:underline"
      >
        Compare all retailers →
      </Link>
    </p>
  );
}
