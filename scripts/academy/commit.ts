import { execFileSync } from "node:child_process";
import { github } from "./github";
const git = (...args: string[]) =>
  execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
const permitted =
  /^(?:content\/academy\/(?:articles\/[a-z0-9-]+\.json|approvals\/[a-z0-9-]+\.json|runs\/[a-z0-9-]+\.json|publication-ledger\.json|publishing-config\.json|editorial-calendar\.json)|public\/images\/academy\/[a-z0-9-]+\.webp)$/;
export function allowedGeneratedPath(file: string) {
  return permitted.test(file) && !file.includes("..");
}
export function commitContent(message: string, pr = false) {
  const files = execFileSync(
    "git",
    ["status", "--porcelain=v1", "-z", "--untracked-files=all"],
    { encoding: "utf8" },
  )
    .split("\0")
    .filter(Boolean)
    .map((line) => line.slice(3));
  if (!files.length) return git("rev-parse", "HEAD");
  if (files.some((f) => !allowedGeneratedPath(f)))
    throw new Error(
      "Generated write escaped the content allowlist; refusing commit.",
    );
  const before = git("rev-parse", "HEAD");
  if (pr)
    git(
      "switch",
      "-c",
      `academy/drafts/${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT}`,
    );
  git("config", "user.name", "Heiridium Academy Publisher");
  git("config", "user.email", "academy-publisher@users.noreply.github.com");
  git("add", "--", ...files);
  git("commit", "-m", message);
  const branch = pr ? git("branch", "--show-current") : "main";
  try {
    git("push", "origin", `HEAD:refs/heads/${branch}`);
  } catch {
    throw new Error(
      "Git push was denied or conflicted. Respect branch protection; reconcile the current head and rerun. No force push attempted.",
    );
  }
  return { sha: git("rev-parse", "HEAD"), before, branch };
}
export async function openDraftPr(branch: string, description: string) {
  return github("/pulls", "POST", {
    title: "Academy: original draft for human editorial review",
    head: branch,
    base: "main",
    draft: true,
    body: description,
  });
}
