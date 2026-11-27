import { createSign } from "node:crypto";
import { status } from "./status";
import { notify } from "./github";
export async function searchPerformance() {
  const value = process.env.GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT;
  if (!value)
    return {
      status: "unconfigured",
      note: "Search Console is optional. No search traffic or conversion results have been invented.",
    };
  const account = JSON.parse(value) as {
    client_email: string;
    private_key: string;
  };
  if (!account.client_email || !account.private_key)
    throw new Error("Invalid Search Console service-account configuration");
  const encode = (v: unknown) =>
      Buffer.from(JSON.stringify(v)).toString("base64url"),
    now = Math.floor(Date.now() / 1000);
  const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({ iss: account.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 900 })}`;
  const jwt = `${unsigned}.${createSign("RSA-SHA256").update(unsigned).sign(account.private_key, "base64url")}`;
  const auth = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!auth.ok) throw new Error("Search Console authentication failed");
  const { access_token } = (await auth.json()) as { access_token: string };
  const end = new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10),
    start = new Date(Date.parse(end) - 6 * 86400000).toISOString().slice(0, 10);
  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent("sc-domain:heiridium.com")}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        startDate: start,
        endDate: end,
        dimensions: ["page"],
        dimensionFilterGroups: [
          {
            filters: [
              {
                dimension: "page",
                operator: "contains",
                expression: "https://heiridium.com/academy/",
              },
            ],
          },
        ],
        rowLimit: 100,
      }),
      signal: AbortSignal.timeout(20000),
    },
  );
  if (!response.ok) throw new Error("Search Console read-only query failed");
  const result = (await response.json()) as {
    rows?: {
      keys: string[];
      clicks: number;
      impressions: number;
      ctr: number;
      position: number;
    }[];
  };
  return {
    status: "available",
    start,
    end,
    rows: result.rows ?? [],
    privacy:
      "Page aggregates only; no visitor identities or search query strings.",
  };
}
export async function weeklyReport() {
  const result = {
    publishing: status(),
    search: await searchPerformance(),
    conversions:
      "CTA and accepted-form events are recorded in existing Vercel Analytics. Read them in the project dashboard; no unconfigured Analytics export is presented as measured data.",
  };
  await notify(
    `weekly-${new Date().toISOString().slice(0, 10)}`,
    "weekly publishing and search summary",
    JSON.stringify(result, null, 2),
  );
  return result;
}
