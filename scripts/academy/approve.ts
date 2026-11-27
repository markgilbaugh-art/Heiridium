import { publishingConfig } from "../../lib/academy/config";
import {
  readLedger,
  readArticles,
  readApproval,
  academyRoot,
  atomicJson,
} from "../../lib/academy/store";
import { articleDigest } from "../../lib/academy/policy";
import { slugSchema, type Approval } from "../../lib/academy/schema";
import { validateArticle } from "../../lib/academy/validate";
import { allArticles } from "../../lib/content/articles";
import path from "node:path";
export function approve(
  slug: string,
  kind: "editorial" | "professional",
  name: string,
  qualification: string,
) {
  slugSchema.parse(slug);
  if (readLedger().some((p) => p.slug === slug))
    throw new Error(
      "Published articles require a reviewed correction PR, not a new approval operation.",
    );
  const actor = process.env.GITHUB_ACTOR ?? "";
  if (
    process.env.GITHUB_ACTIONS !== "true" ||
    process.env.GITHUB_EVENT_NAME !== "workflow_dispatch" ||
    process.env.GITHUB_REF !== "refs/heads/main" ||
    process.env.GITHUB_REPOSITORY !== "markgilbaugh-art/Heiridium"
  )
    throw new Error(
      "Approval must originate from the reviewed manual workflow on main.",
    );
  const allowed =
    kind === "professional"
      ? publishingConfig.professionalActors
      : publishingConfig.editorialActors;
  if (!allowed.includes(actor) || actor.endsWith("[bot]"))
    throw new Error("Actor is not authorized for this review role.");
  if (name.trim().length < 3 || name.length > 120 || /[<>\r\n]/.test(name))
    throw new Error("Enter the actual human reviewer name.");
  if (
    kind === "professional" &&
    (qualification.trim().length < 3 ||
      qualification.length > 200 ||
      /[<>\r\n]/.test(qualification))
  )
    throw new Error("Enter the actual relevant professional qualification.");
  const article = readArticles().find((a) => a.slug === slug);
  if (
    !article ||
    article.validation.status !== "passed" ||
    article.validation.report?.outcome !== "pass"
  )
    throw new Error(
      "Independent machine verification must pass before human approval.",
    );
  const issues = validateArticle(article, allArticles, {
    checkFreshness: true,
  });
  if (issues.length)
    throw new Error(
      `Cannot approve invalid content: ${issues.map((i) => i.code).join(", ")}`,
    );
  const previous = readApproval(slug),
    digest = articleDigest(article),
    runUrl = `https://github.com/markgilbaugh-art/Heiridium/actions/runs/${process.env.GITHUB_RUN_ID}`;
  if (kind === "professional" && (!previous || previous.digest !== digest))
    throw new Error("Record editorial approval of this exact draft first.");
  const record: Approval =
    kind === "editorial"
      ? {
          schemaVersion: 1,
          slug,
          digest,
          editorial: {
            actor,
            name: name.trim(),
            approvedAt: new Date().toISOString(),
            runUrl,
          },
          professional: null,
        }
      : {
          ...previous!,
          professional: {
            actor,
            name: name.trim(),
            qualification: qualification.trim(),
            approvedAt: new Date().toISOString(),
            runUrl,
          },
        };
  atomicJson(path.join(academyRoot, "approvals", `${slug}.json`), record);
  return { slug, digest, review: kind, actor };
}
