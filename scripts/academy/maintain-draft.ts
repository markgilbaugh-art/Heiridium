import fs from "node:fs";
import path from "node:path";
import {
  academyRoot,
  articlePath,
  atomicJson,
  readArticles,
  readLedger,
} from "../../lib/academy/store";
import { slugSchema } from "../../lib/academy/schema";
import { validateArticle } from "../../lib/academy/validate";
import { allArticles } from "../../lib/content/articles";
import { requireReservation } from "./budget";
import { retrieveSource } from "./http";
import { verifyEditorial } from "./verify-editorial";
import { generateImage } from "./generate-image";
export async function maintainDraft(slug: string, regenerateImage: boolean) {
  slugSchema.parse(slug);
  if (process.env.ACADEMY_PUBLISHING_DISABLED === "true")
    throw new Error("Emergency disable is active");
  if (readLedger().some((e) => e.slug === slug))
    throw new Error(
      "Published articles are immutable in this workflow. Use a reviewed correction PR.",
    );
  const article = readArticles().find((a) => a.slug === slug);
  if (!article) throw new Error("Draft not found");
  await requireReservation();
  const evidence = [];
  for (const source of article.sources) {
    const result = await retrieveSource(source.url);
    source.url = result.url;
    source.title = result.title;
    source.publishedAt = result.publishedAt;
    source.contentSha256 = result.digest;
    source.retrievedAt = new Date().toISOString();
    evidence.push({ id: source.id, text: result.text });
  }
  if (regenerateImage)
    article.image = await generateImage(
      slug,
      article.content.imagePrompt,
      article.content.imageAlt,
      true,
    );
  article.validation = { status: "pending", reviewedAt: null, report: null };
  article.validation.report = await verifyEditorial(
    article,
    evidence,
    allArticles.map((a) => ({
      slug: a.slug,
      title: a.title,
      primaryQuestion: a.directAnswer,
    })),
  );
  article.validation.reviewedAt = new Date().toISOString();
  const issues = validateArticle(article, allArticles);
  article.validation.status =
    issues.length || article.validation.report.outcome !== "pass"
      ? "needs-review"
      : "passed";
  // Any revision requires fresh human approval, even if it is only an image change.
  const approval = path.join(academyRoot, "approvals", `${slug}.json`);
  if (fs.existsSync(approval)) fs.unlinkSync(approval);
  atomicJson(articlePath(slug), article);
  return {
    slug,
    validation: article.validation.status,
    issues,
    approval: "reset; fresh human review required",
  };
}
