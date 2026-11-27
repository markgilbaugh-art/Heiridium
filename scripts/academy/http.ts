import { publishingConfig } from "../../lib/academy/config";
import { allowedSourceUrl, sha256 } from "../../lib/academy/policy";

export async function boundedText(
  response: Response,
  maxBytes: number,
): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error("Empty response body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw new Error("Response exceeds configured size limit");
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks.map((v) => Buffer.from(v))).toString("utf8");
}
export async function retrieveSource(
  input: string,
  fetcher: typeof fetch = fetch,
): Promise<{
  url: string;
  title: string;
  text: string;
  digest: string;
  publishedAt: string | null;
}> {
  let url = allowedSourceUrl(input, publishingConfig.sourceDomains);
  for (let redirect = 0; redirect < 5; redirect++) {
    const res = await fetcher(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(20000),
      headers: {
        "user-agent":
          "HeiridiumAcademyResearch/1.0 (+https://heiridium.com/about)",
      },
    });
    if ([301, 302, 303, 307, 308].includes(res.status)) {
      const location = res.headers.get("location");
      if (!location) throw new Error("Source redirect lacks a destination");
      url = allowedSourceUrl(
        new URL(location, url).href,
        publishingConfig.sourceDomains,
      );
      continue;
    }
    if (!res.ok) throw new Error(`Source retrieval failed (${res.status})`);
    if (!res.headers.get("content-type")?.includes("text/html"))
      throw new Error(
        "This research adapter requires an accessible HTML source",
      );
    const html = await boundedText(res, publishingConfig.limits.sourceBytes);
    const { load } = await import("cheerio");
    const $ = load(html);
    $("script,style,nav,header,footer,noscript,form,aside").remove();
    const title = $("title").first().text().trim(),
      main = $("main").first().length ? $("main").first() : $("body");
    const text = main
      .text()
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, publishingConfig.limits.sourceCharacters);
    if (text.length < 350)
      throw new Error("Source contains insufficient readable evidence");
    const date = $('meta[property="article:published_time"]').attr("content");
    return {
      url: url.href,
      title: title || url.hostname,
      text,
      digest: sha256(text),
      publishedAt:
        date && Number.isFinite(Date.parse(date))
          ? new Date(date).toISOString()
          : null,
    };
  }
  throw new Error("Too many source redirects");
}
export async function jsonRequest(
  url: string,
  init: RequestInit,
  fetcher: typeof fetch = fetch,
): Promise<unknown> {
  let response: Response | undefined;
  for (let attempt = 0; attempt < 3; attempt++) {
    response = await fetcher(url, {
      ...init,
      signal:
        init.signal ??
        AbortSignal.timeout(publishingConfig.limits.requestTimeoutMs),
    });
    // Retry explicit rate limits only. Ambiguous timeouts/5xx can already be billed;
    // a manual rerun requires a new durable cost reservation instead.
    if (response.status !== 429 || attempt === 2) break;
    await response.body?.cancel();
    await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt));
  }
  if (!response || !response.ok)
    throw new Error(
      `Provider request failed (${response?.status ?? "network"}); provider response omitted to protect credentials`,
    );
  return JSON.parse(await boundedText(response, 20000000));
}
