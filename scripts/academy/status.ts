import { publishingConfig } from "../../lib/academy/config";
import {
  readArticles,
  readApproval,
  readLedger,
} from "../../lib/academy/store";
import { approvedInventory } from "../../lib/academy/publish";
import {
  centralDate,
  requiresProfessionalReview,
} from "../../lib/academy/policy";
export function status() {
  const articles = readArticles(),
    ledger = readLedger(),
    approvals = new Map(
      articles.flatMap((a) => {
        const v = readApproval(a.slug);
        return v ? [[a.slug, v] as const] : [];
      }),
    );
  const approved = approvedInventory(articles, approvals, ledger);
  return {
    asOf: new Date().toISOString(),
    centralDate: centralDate(),
    enabled:
      publishingConfig.enabled &&
      process.env.ACADEMY_PUBLISHING_DISABLED !== "true",
    schedule: "06:00 America/Chicago, seven days per week",
    approved: approved.length,
    target: publishingConfig.approvedInventoryTarget,
    lowInventory: approved.length < publishingConfig.lowInventoryThreshold,
    next: approved[0]?.slug ?? null,
    drafts: articles.length - ledger.length,
    needsProfessionalReview: articles
      .filter(
        (a) =>
          requiresProfessionalReview(a) && !approvals.get(a.slug)?.professional,
      )
      .map((a) => a.slug),
    publications: ledger.slice(-30),
  };
}
