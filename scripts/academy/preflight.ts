import { publishingConfig } from "../../lib/academy/config";
import { status } from "./status";
import { github } from "./github";
export async function generationDecision(
  fetchPulls: () => Promise<
    { head: { ref: string }; html_url: string }[]
  > = async () => github("/pulls?state=open&per_page=100"),
  approvedCount: number = status().approved,
) {
  if (process.env.ACADEMY_PUBLISHING_DISABLED === "true")
    return { needed: false, reason: "Emergency disable is active" };
  if (
    !publishingConfig.enabled &&
    process.env.GITHUB_EVENT_NAME !== "workflow_dispatch"
  )
    return { needed: false, reason: "Scheduled publishing is paused" };
  if (approvedCount >= publishingConfig.approvedInventoryTarget)
    return { needed: false, reason: "Approved inventory target is met" };
  const pulls = await fetchPulls();
  const pending = pulls.find((p) => p.head.ref.startsWith("academy/drafts/"));
  if (pending)
    return {
      needed: false,
      reason:
        "An engine draft PR is awaiting review; do not create a duplicate",
      pullRequest: pending.html_url,
    };
  return { needed: true, reason: "Approved inventory needs replenishing" };
}
