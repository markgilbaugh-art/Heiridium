import { publishingConfig } from "../../lib/academy/config";
import type { EngineArticle } from "../../lib/academy/schema";
import { articleDigest, sha256 } from "../../lib/academy/policy";
export async function verifyDeployment(
  commit: string,
  article: EngineArticle,
  options: {
    fetcher?: typeof fetch;
    sleep?: (ms: number) => Promise<void>;
    attempts?: number;
  } = {},
) {
  if (!/^[a-f0-9]{40}$/.test(commit))
    throw new Error("Expected a full publication commit SHA");
  const { projectId, teamId, siteUrl } = publishingConfig.deployment,
    token = process.env.VERCEL_READ_TOKEN;
  if (!projectId || !teamId || !token)
    throw new Error(
      "Vercel project/team IDs and VERCEL_READ_TOKEN are required to verify the intended production commit.",
    );
  const request = options.fetcher ?? fetch,
    sleep =
      options.sleep ??
      ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
  let ready = false;
  for (let i = 0; i < (options.attempts ?? 30); i++) {
    const response = await request(
      `https://api.vercel.com/v6/deployments?projectId=${encodeURIComponent(projectId)}&teamId=${encodeURIComponent(teamId)}&target=production&limit=20`,
      {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(20000),
      },
    );
    if (!response.ok)
      throw new Error(`Vercel commit lookup failed (${response.status})`);
    const data = (await response.json()) as {
      deployments: {
        uid: string;
        state: string;
        meta?: { githubCommitSha?: string };
      }[];
    };
    const deployment = data.deployments.find(
      (d) => d.meta?.githubCommitSha === commit,
    );
    if (deployment?.state === "ERROR" || deployment?.state === "CANCELED")
      throw new Error("The intended Vercel production build failed.");
    if (deployment?.state === "READY") {
      ready = true;
      break;
    }
    await sleep(20000);
  }
  if (!ready)
    throw new Error(
      "Timed out waiting for the intended Vercel production commit.",
    );
  const paths = [
    `/academy/${article.slug}`,
    "/academy",
    `/academy/topics/${article.topic}`,
    ...article.industries.map((i) => `/industries/${i}`),
    "/",
    "/sitemap.xml",
    article.image!.src,
  ];
  const checks = [];
  for (const path of paths) {
    const start = Date.now(),
      response = await request(`${siteUrl}${path}`, {
        redirect: "error",
        cache: "no-store",
        signal: AbortSignal.timeout(20000),
      });
    if (response.status !== 200)
      throw new Error(
        `Public verification failed: ${path} (${response.status})`,
      );
    if (path === article.image!.src) {
      if (!response.headers.get("content-type")?.includes("image/webp"))
        throw new Error("Featured image MIME mismatch");
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length > 350000 || sha256(bytes) !== article.image!.sha256)
        throw new Error("Published image digest mismatch");
    } else {
      const text = await response.text();
      if (path === `/academy/${article.slug}`) {
        if (
          !text.includes(articleDigest(article)) ||
          !text.includes(`${siteUrl}/academy/${article.slug}`) ||
          !text.includes("application/ld+json") ||
          !text.includes(article.image!.src)
        )
          throw new Error(
            "Public article digest, canonical, structured data or image is missing",
          );
        if (/name="robots"[^>]*noindex/.test(text))
          throw new Error("Production article unexpectedly has noindex");
      } else if (!text.includes(article.slug))
        throw new Error(`Published article is missing from ${path}`);
    }
    checks.push({ path, status: 200, milliseconds: Date.now() - start });
  }
  return {
    commit,
    article: article.slug,
    verifiedAt: new Date().toISOString(),
    checks,
  };
}
