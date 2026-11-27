import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { allArticles } from "../../lib/content/articles";
import {
  calendarEntrySchema,
  engineArticleSchema,
  type EngineArticle,
} from "../../lib/academy/schema";
import { publishingConfig } from "../../lib/academy/config";
import {
  academyRoot,
  articlePath,
  atomicJson,
  readArticles,
} from "../../lib/academy/store";
import { validateArticle } from "../../lib/academy/validate";
import { research } from "./research";
import { writeArticle } from "./write-article";
import { verifyEditorial } from "./verify-editorial";
import { generateImage } from "./generate-image";
import { requireReservation } from "./budget";
import { generationDecision } from "./preflight";
import { requiresProfessionalReview } from "../../lib/academy/policy";
import { maintainCalendar } from "./calendar";
export async function generate(topic?: string) {
  if (
    (!publishingConfig.enabled &&
      process.env.GITHUB_EVENT_NAME !== "workflow_dispatch") ||
    process.env.ACADEMY_PUBLISHING_DISABLED === "true"
  )
    throw new Error("Publisher is disabled");
  const decision = await generationDecision();
  if (!decision.needed) return { skipped: decision.reason };
  const calendar = z
    .array(calendarEntrySchema)
    .parse(
      JSON.parse(
        fs.readFileSync(
          path.join(academyRoot, "editorial-calendar.json"),
          "utf8",
        ),
      ),
    );
  const existing = new Set([
    ...allArticles.map((a) => a.slug),
    ...readArticles().map((a) => a.slug),
  ]);
  const entry = calendar.find(
    (e) => (!topic || e.id === topic) && !existing.has(e.id),
  );
  if (!entry)
    throw new Error(
      "No unused calendar topic matches. Add a researched brief; existing drafts are never overwritten.",
    );
  await requireReservation();
  await maintainCalendar();
  const bundle = await research(entry),
    inventory = allArticles.map((a) => ({
      slug: a.slug,
      title: a.title,
      primaryQuestion: a.directAnswer,
    }));
  const article: EngineArticle = engineArticleSchema.parse({
    schemaVersion: 1,
    slug: entry.id,
    pillar: entry.pillar,
    topic: entry.topic,
    industries: [entry.industry],
    proposedDate: entry.proposedDate,
    createdAt: new Date().toISOString(),
    content: await writeArticle(entry, bundle, inventory),
    sources: bundle.sources,
    image: null,
    validation: { status: "pending", reviewedAt: null, report: null },
    disclosure:
      "AI-assisted research and drafting. Human editorial approval is required before publication. AI-generated images are illustrative and do not depict actual clients.",
  });
  for (
    let attempt = 0;
    attempt <= publishingConfig.limits.maxCorrections;
    attempt++
  ) {
    const report = await verifyEditorial(article, bundle.evidence, inventory);
    article.validation = {
      status: "pending",
      reviewedAt: new Date().toISOString(),
      report,
    };
    const issues = validateArticle(article, inventory, { checkImage: false });
    if (!issues.length && report.outcome === "pass") break;
    if (attempt === publishingConfig.limits.maxCorrections) {
      article.validation.status = "needs-review";
      break;
    }
    article.content = await writeArticle(entry, bundle, inventory, [
      ...issues.map((i) => i.message),
      ...report.findings,
    ]);
    article.validation = { status: "pending", reviewedAt: null, report: null };
  }
  article.image = await generateImage(
    article.slug,
    article.content.imagePrompt,
    article.content.imageAlt,
  );
  const issues = validateArticle(article, inventory);
  article.validation.status =
    issues.length || article.validation.report?.outcome !== "pass"
      ? "needs-review"
      : "passed";
  atomicJson(articlePath(article.slug), article);
  return {
    slug: article.slug,
    validation: article.validation.status,
    issues,
    humanApproval: "required",
    professionalReviewRequired: requiresProfessionalReview(article),
  };
}
