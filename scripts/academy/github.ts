const repository = "markgilbaugh-art/Heiridium";
export async function github(path: string, method = "GET", body?: unknown) {
  const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
  if (!token)
    throw new Error("GitHub workflow authentication is not configured");
  if (!path.startsWith("/") || path.includes(".."))
    throw new Error("Invalid GitHub API path");
  const response = await fetch(
    `https://api.github.com/repos/${repository}${path}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "content-type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(30000),
    },
  );
  if (!response.ok)
    throw new Error(`GitHub API ${method} failed (${response.status})`);
  return response.status === 204 ? null : response.json();
}
export async function notify(key: string, title: string, body: string) {
  const marker = `<!-- academy:${key} -->`;
  const list = (await github("/issues?state=open&per_page=100")) as {
    number: number;
    body?: string;
  }[];
  const existing = list.find((i) => i.body?.includes(marker));
  if (existing)
    await github(`/issues/${existing.number}/comments`, "POST", { body });
  else
    await github("/issues", "POST", {
      title: `Academy: ${title}`,
      body: `${marker}\n${body}`,
    });
}
