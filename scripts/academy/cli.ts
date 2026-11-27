import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { publishingConfig } from "../../lib/academy/config";
import {
  readArticles,
  readApproval,
  readLedger,
  academyRoot,
  atomicJson,
} from "../../lib/academy/store";
import { allArticles } from "../../lib/content/articles";
import { planPublication } from "../../lib/academy/publish";
import { slugSchema, calendarEntrySchema } from "../../lib/academy/schema";
import { validateArticle } from "../../lib/academy/validate";
import { status } from "./status";
import { budgetReservation } from "./budget";
import { generate } from "./generate";
import { approve } from "./approve";
import { commitContent, openDraftPr } from "./commit";
import { verifyDeployment } from "./verify-deployment";
import { notify } from "./github";
import { modelUses } from "./provider";
import { weeklyReport } from "./weekly-report";
import { maintainDraft } from "./maintain-draft";
import { generationDecision } from "./preflight";
const command = process.argv[2] ?? "status",
  slug = process.env.ACADEMY_SLUG ?? "";
async function main() {
  if (command === "status") return status();
  if (command === "preflight") {
    const decision =
      process.env.ACADEMY_OPERATION === "generate"
        ? await generationDecision()
        : { needed: true, reason: "Explicit operation" };
    if (process.env.GITHUB_OUTPUT)
      fs.appendFileSync(
        process.env.GITHUB_OUTPUT,
        `needed=${decision.needed}\n`,
      );
    return decision;
  }

  if (command === "validate") {
    z.array(calendarEntrySchema).parse(
      JSON.parse(
        fs.readFileSync(
          path.join(academyRoot, "editorial-calendar.json"),
          "utf8",
        ),
      ),
    );
    const results = readArticles().map((a) => ({
      slug: a.slug,
      issues: validateArticle(a, allArticles),
    }));
    if (results.some((r) => r.issues.length))
      throw new Error(JSON.stringify(results.filter((r) => r.issues.length)));
    return {
      validated: results.length,
      machineVerificationPending: readArticles()
        .filter((a) => a.validation.status !== "passed")
        .map((a) => a.slug),
      approvals:
        "Human approvals are checked separately; validation never grants approval.",
    };
  }
  if (command === "budget-reserve") {
    if (
      (!publishingConfig.enabled &&
        process.env.GITHUB_EVENT_NAME !== "workflow_dispatch") ||
      process.env.ACADEMY_PUBLISHING_DISABLED === "true"
    )
      throw new Error("Publisher is disabled");
    const name = await budgetReservation();
    if (process.env.GITHUB_OUTPUT)
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `artifact=${name}\n`);
    return { reservation: name };
  }
  if (command === "generate") {
    const result = await generate(slug || undefined);
    if ("skipped" in result) return result;
    const committed = commitContent(
      `Academy: prepare ${result.slug} for human review`,
      true,
    );
    if (typeof committed !== "string")
      await openDraftPr(
        committed.branch,
        `Original AI-assisted draft; not approved for publication.\n\n${JSON.stringify(result, null, 2)}\n\nReview sources, calculations, originality, image, and qualified-review requirements before manual approval.`,
      );
    await notify(
      `review-${result.slug}`,
      "draft needs human review",
      JSON.stringify(result, null, 2),
    );
    return { ...result, committed, usage: modelUses };
  }
  if (command === "verify-draft" || command === "regenerate-image") {
    const result = await maintainDraft(slug, command === "regenerate-image");
    const committed = commitContent(`Academy: ${command} ${slug}`, true);
    if (typeof committed !== "string")
      await openDraftPr(
        committed.branch,
        `Updated draft requires fresh human review.\n\n${JSON.stringify(result, null, 2)}`,
      );
    return { ...result, committed, usage: modelUses };
  }
  if (command === "approve") {
    const kind = process.env.ACADEMY_REVIEW_KIND;
    if (kind !== "editorial" && kind !== "professional")
      throw new Error("Choose editorial or professional review");
    const result = approve(
      slug,
      kind,
      process.env.ACADEMY_REVIEWER_NAME ?? "",
      process.env.ACADEMY_QUALIFICATION ?? "",
    );
    return {
      ...result,
      commit: commitContent(`Academy: record ${kind} approval of ${slug}`),
    };
  }
  if (command === "publish" || command === "retry") {
    if (
      !publishingConfig.enabled ||
      process.env.ACADEMY_PUBLISHING_DISABLED === "true"
    )
      return { skipped: "Publishing is paused" };
    if (
      process.env.GITHUB_ACTIONS !== "true" ||
      process.env.GITHUB_REF !== "refs/heads/main"
    )
      throw new Error(
        "Production publishing runs only from the reviewed main workflow.",
      );
    const articles = readArticles(),
      ledger = readLedger(),
      approvals = new Map(
        articles.flatMap((a) => {
          const v = readApproval(a.slug);
          return v ? [[a.slug, v] as const] : [];
        }),
      );
    const plan = planPublication({
      articles,
      approvals,
      ledger,
      inventory: allArticles,
      now: new Date(),
      runId: process.env.GITHUB_RUN_ID ?? "",
      disabled: process.env.ACADEMY_PUBLISHING_DISABLED === "true",
    });
    if (command === "retry" && !plan.retry)
      throw new Error(
        "No publication to retry today; use publish after review.",
      );
    if (!plan.retry)
      atomicJson(path.join(academyRoot, "publication-ledger.json"), {
        schemaVersion: 1,
        publications: [...ledger, plan.entry],
      });
    const committed = commitContent(
      `Academy: publish ${plan.entry.slug} on ${plan.entry.date}`,
    );
    // Retry must locate the original ledger commit, not claim a later docs commit was the publication.
    const { execFileSync } = await import("node:child_process");
    const sha = plan.retry
      ? execFileSync(
          "git",
          [
            "log",
            "-1",
            "--format=%H",
            "--",
            "content/academy/publication-ledger.json",
          ],
          { encoding: "utf8" },
        ).trim()
      : typeof committed === "string"
        ? committed
        : committed.sha;
    const verified = await verifyDeployment(
      sha,
      articles.find((a) => a.slug === plan.entry.slug)!,
    );
    await notify(
      `published-${plan.entry.date}`,
      "publication verified",
      JSON.stringify(verified, null, 2),
    );
    const current = status();
    if (current.lowInventory)
      await notify(
        "low-inventory",
        "approved inventory below threshold",
        JSON.stringify(current, null, 2),
      );
    return { plan, verified };
  }
  if (command === "pause" || command === "resume") {
    if (
      process.env.GITHUB_EVENT_NAME !== "workflow_dispatch" ||
      !publishingConfig.editorialActors.includes(process.env.GITHUB_ACTOR ?? "")
    )
      throw new Error("Only an authorized human can change the pause state.");
    if (
      command === "resume" &&
      (!publishingConfig.deployment.projectId ||
        !publishingConfig.deployment.teamId ||
        !process.env.VERCEL_READ_TOKEN)
    )
      throw new Error(
        "Configure and verify deployment access before resuming.",
      );
    atomicJson(path.join(academyRoot, "publishing-config.json"), {
      ...publishingConfig,
      enabled: command === "resume",
    });
    return { commit: commitContent(`Academy: ${command} publishing`) };
  }
  if (command === "weekly") return weeklyReport();
  if (command === "notify-failure")
    return notify(
      "workflow-failure",
      "workflow needs attention",
      `Run: https://github.com/markgilbaugh-art/Heiridium/actions/runs/${process.env.GITHUB_RUN_ID}. No article approval is implied. Inspect the redacted job log.`,
    );
  if (command === "preview") {
    slugSchema.parse(slug);
    return {
      url: `/editorial?slug=${slug}`,
      authentication:
        "Use the protected preview with PREVIEW_SECRET; never add the secret to logs or issue comments.",
    };
  }
  throw new Error("Unknown Academy operation");
}
main()
  .then((result) => {
    const output = JSON.stringify(result, null, 2);
    fs.writeFileSync(".academy-run.json", output + "\n");
    console.log(output);
    if (process.env.GITHUB_STEP_SUMMARY)
      fs.appendFileSync(
        process.env.GITHUB_STEP_SUMMARY,
        `## Academy ${command}\n\n\`\`\`json\n${output}\n\`\`\`\n`,
      );
  })
  .catch((error) => {
    fs.writeFileSync(
      ".academy-run.json",
      JSON.stringify(
        {
          operation: command,
          status: "failed",
          usage: modelUses,
          error:
            error instanceof Error ? error.message : "Academy operation failed",
        },
        null,
        2,
      ),
    );
    console.error(
      error instanceof Error ? error.message : "Academy operation failed",
    );
    process.exitCode = 1;
  });
