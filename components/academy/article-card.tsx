import Image from "next/image";
import Link from "next/link";
import { getTopic } from "@/lib/content/topics";
import { accentClasses } from "@/lib/content/books";
import type { Article } from "@/lib/content/types";
import { cn } from "@/lib/utils";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function ArticleCard({ article }: { article: Article }) {
  const topic = getTopic(article.topic);
  const accent = topic ? accentClasses[topic.accent] : undefined;
  return (
    <article className="flex h-full flex-col border border-border bg-card p-6">
      {article.cover && (
        <Link
          href={`/academy/${article.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="mb-5 block"
        >
          <Image
            src={article.cover.src}
            alt=""
            width={article.cover.width ?? 1200}
            height={article.cover.height ?? 675}
            className="aspect-video w-full object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>
      )}
      <div className="flex items-center gap-2 text-xs">
        <span
          className={cn("size-2 rounded-full", accent?.bg)}
          aria-hidden="true"
        />
        <span className="eyebrow text-muted-foreground">{topic?.name}</span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold leading-snug text-ink">
        <Link href={`/academy/${article.slug}`} className="hover:underline">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-base text-muted-foreground">
        {article.summary}
      </p>
      <p className="mt-5 text-sm text-muted-foreground">
        <time dateTime={article.publishAt}>
          {formatDate(article.publishAt)}
        </time>
      </p>
    </article>
  );
}
