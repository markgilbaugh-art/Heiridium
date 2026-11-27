// The repository and commit IDs are public. No credentials or editorial data are exposed.
export const dynamic = "force-dynamic";
export function GET() {
  const value = process.env.VERCEL_GIT_COMMIT_SHA ?? "";
  return Response.json(
    {
      application: "heiridium",
      commit: /^[a-f0-9]{40}$/.test(value) ? value : null,
      environment: ["production", "preview"].includes(
        process.env.VERCEL_ENV ?? "",
      )
        ? process.env.VERCEL_ENV
        : "local",
    },
    { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } },
  );
}
