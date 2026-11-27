import Link from "next/link";
import { Check } from "lucide-react";
import type { Block } from "@/lib/content/types";

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6 text-lg leading-relaxed text-ink/85">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}>{block.text}</p>;
          case "h2":
            return (
              <h2
                key={i}
                className="mt-6 text-3xl font-semibold leading-tight text-ink"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-4 text-2xl font-semibold text-ink">
                {block.text}
              </h3>
            );
          case "link":
            return (
              <p key={i}>
                <Link
                  href={block.href}
                  className="font-medium text-ink underline underline-offset-4 hover:text-gold"
                >
                  {block.label}
                </Link>
              </p>
            );
          case "table":
            return (
              <div
                key={i}
                className="overflow-x-auto rounded border border-border"
                role="region"
                aria-label={block.caption}
                tabIndex={0}
              >
                <table className="w-full min-w-[520px] text-left text-base">
                  <caption className="p-4 text-left font-semibold">
                    {block.caption}
                  </caption>
                  <thead className="bg-secondary">
                    <tr>
                      {block.headings.map((h) => (
                        <th key={h} scope="col" className="p-4">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="border-t border-border">
                        {row.map((cell, c) => (
                          <td key={c} className="p-4 align-top">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-2 pl-1">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-3 h-0.5 w-3 shrink-0 bg-gold"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "checklist":
            return (
              <div key={i} className="border border-border bg-card p-6 md:p-8">
                <p className="font-serif text-2xl font-semibold text-ink">
                  {block.title}
                </p>
                <ul className="mt-4 flex flex-col gap-3 text-base">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check
                        className="mt-1 size-4 shrink-0 text-gold"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          case "example":
            return (
              <div
                key={i}
                className="border-l-4 border-gold bg-secondary/70 p-6"
              >
                <p className="eyebrow text-gold">Example</p>
                <p className="mt-2 font-serif text-xl font-semibold text-ink">
                  {block.title}
                </p>
                <p className="mt-2 text-base">{block.text}</p>
              </div>
            );
          case "callout":
            return (
              <p
                key={i}
                className="border-y border-border py-5 font-serif text-2xl leading-snug text-ink"
              >
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
