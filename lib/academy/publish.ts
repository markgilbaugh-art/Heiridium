import { publishingConfig, type PublishingConfig } from "./config";
import {
  articleDigest,
  centralDate,
  centralHour,
  publicationForDay,
  validApproval,
} from "./policy";
import type { Approval, EngineArticle, Publication } from "./schema";
import { validateArticle } from "./validate";

export function approvedInventory(
  articles: EngineArticle[],
  approvals: Map<string, Approval>,
  ledger: Publication[],
  config: PublishingConfig = publishingConfig,
) {
  return articles
    .filter(
      (a) =>
        !ledger.some((p) => p.slug === a.slug) &&
        a.validation.status === "passed" &&
        a.validation.report?.outcome === "pass" &&
        validApproval(
          a,
          approvals.get(a.slug),
          config.editorialActors,
          config.professionalActors,
        ),
    )
    .sort(
      (a, b) =>
        a.proposedDate.localeCompare(b.proposedDate) ||
        a.slug.localeCompare(b.slug),
    );
}
export function planPublication(input: {
  articles: EngineArticle[];
  approvals: Map<string, Approval>;
  ledger: Publication[];
  inventory: { slug: string; title: string; primaryQuestion?: string }[];
  now: Date;
  runId: string;
  disabled?: boolean;
  config?: PublishingConfig;
  checkImage?: boolean;
}): { entry: Publication; retry: boolean } {
  const config = input.config ?? publishingConfig;
  if (!config.enabled || input.disabled)
    throw new Error("Publisher is disabled. No publication attempted.");
  const date = centralDate(input.now),
    previous = publicationForDay(input.ledger, date);
  // A failed deployment must retry the SAME durable publication, never consume a second article.
  if (previous) return { entry: previous, retry: true };
  if (centralHour(input.now) < config.publicationHour)
    throw new Error("Before 06:00 America/Chicago; no early publication.");
  const article = approvedInventory(
    input.articles,
    input.approvals,
    input.ledger,
    config,
  ).find((a) => a.proposedDate <= date);
  if (!article)
    throw new Error(
      "No approved, validated article is ready. Human review is required; no fallback article published.",
    );
  const issues = validateArticle(article, input.inventory, {
    checkImage: input.checkImage,
    checkFreshness: true,
    now: input.now,
  });
  if (issues.length)
    throw new Error(
      `Publication validation failed: ${issues.map((i) => i.code).join(", ")}`,
    );
  if (!article.image) throw new Error("Original image is missing");
  return {
    entry: {
      date,
      slug: article.slug,
      digest: articleDigest(article),
      publishedAt: input.now.toISOString(),
      runId: input.runId,
      imageSha256: article.image.sha256,
    },
    retry: false,
  };
}
