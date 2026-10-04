import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/** Turns `[label](/path)` and `**bold**` into elements. */
function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] && match[2]) {
      nodes.push(
        <Link
          key={`${keyPrefix}-l${i}`}
          to={match[2]}
          className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
        >
          {match[1]}
        </Link>,
      );
    } else if (match[3]) {
      nodes.push(
        <strong key={`${keyPrefix}-b${i}`} className="font-semibold text-foreground">
          {match[3]}
        </strong>,
      );
    }
    last = match.index + match[0].length;
    i += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function headings(body: string): { id: string; text: string }[] {
  return body
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => {
      const text = l.slice(3).trim();
      return { id: slugifyHeading(text), text };
    });
}

type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] };

function parse(body: string): Block[] {
  const blocks: Block[] = [];
  for (const rawLine of body.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith("## ")) blocks.push({ kind: "h2", text: line.slice(3) });
    else if (line.startsWith("### ")) blocks.push({ kind: "h3", text: line.slice(4) });
    else if (line.startsWith("- ")) {
      const item = line.slice(2);
      const prev = blocks[blocks.length - 1];
      if (prev && prev.kind === "ul") prev.items.push(item);
      else blocks.push({ kind: "ul", items: [item] });
    } else blocks.push({ kind: "p", text: line });
  }
  return blocks;
}

export function ArticleBody({ body }: { body: string }) {
  const blocks = parse(body);
  return (
    <div className="mt-8 space-y-5">
      {blocks.map((block, index) => {
        const key = `b${index}`;
        if (block.kind === "h2") {
          return (
            <h2
              key={key}
              id={slugifyHeading(block.text)}
              className="scroll-mt-24 pt-6 font-serif text-2xl font-bold leading-snug text-foreground sm:text-3xl"
            >
              {block.text}
            </h2>
          );
        }
        if (block.kind === "h3") {
          return (
            <h3 key={key} className="pt-2 font-serif text-xl font-bold text-foreground">
              {block.text}
            </h3>
          );
        }
        if (block.kind === "ul") {
          return (
            <ul key={key} className="space-y-2 pl-1">
              {block.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
                >
                  <span aria-hidden className="mt-[2px] shrink-0 text-primary">
                    ✦
                  </span>
                  <span>{inline(item, `${key}-${itemIndex}`)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={key}
            className="text-[15px] leading-relaxed text-muted-foreground sm:text-base sm:leading-[1.75]"
          >
            {inline(block.text, key)}
          </p>
        );
      })}
    </div>
  );
}
