import { z } from "zod";
import { publishingConfig } from "../../lib/academy/config";
import { jsonRequest } from "./http";

export interface ModelUse {
  stage: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  searchCalls: number;
  estimatedCents: number;
}
export const modelUses: ModelUse[] = [];
const responseSchema = z
  .object({
    status: z.string().optional(),
    output: z.array(z.record(z.string(), z.unknown())),
    usage: z
      .object({ input_tokens: z.number(), output_tokens: z.number() })
      .optional(),
  })
  .passthrough();
function key(): string {
  const value = process.env.OPENAI_API_KEY;
  if (!value)
    throw new Error(
      "Configure OPENAI_API_KEY in GitHub Actions secrets before generating articles. Never paste it into chat.",
    );
  return value;
}
// Keep API schemas within the documented Structured Outputs subset. Zod still
// enforces URL syntax and text lengths locally after the response is parsed.
export function modelSchema(schema: z.ZodType): Record<string, unknown> {
  const formats = new Set([
    "date-time",
    "time",
    "date",
    "duration",
    "email",
    "hostname",
    "ipv4",
    "ipv6",
    "uuid",
  ]);
  function visit(value: unknown): unknown {
    if (Array.isArray(value)) return value.map(visit);
    if (value && typeof value === "object") {
      const result: Record<string, unknown> = {};
      for (const [key, item] of Object.entries(value)) {
        if (["$schema", "minLength", "maxLength"].includes(key)) continue;
        if (key === "format" && !formats.has(String(item))) continue;
        if (key === "const") {
          result.enum = [item];
          continue;
        }
        result[key] = visit(item);
      }
      return result;
    }
    return value;
  }
  return visit(z.toJSONSchema(schema)) as Record<string, unknown>;
}
export async function structuredResponse<T>(
  stage: string,
  model: string,
  schema: z.ZodType<T>,
  instructions: string,
  input: unknown,
  options: { search?: boolean; fetcher?: typeof fetch } = {},
): Promise<{ value: T; sources: string[] }> {
  const body = {
    model,
    instructions,
    input: JSON.stringify(input),
    max_output_tokens: publishingConfig.limits.modelOutputTokens,
    reasoning: { effort: "low" },
    store: false,
    ...(options.search
      ? {
          tools: [
            {
              type: "web_search",
              filters: { allowed_domains: publishingConfig.sourceDomains },
            },
          ],
          tool_choice: "required",
          max_tool_calls: 6,
          include: ["web_search_call.action.sources"],
        }
      : {}),
    text: {
      format: {
        type: "json_schema",
        name: stage.replaceAll("-", "_"),
        strict: true,
        schema: modelSchema(schema),
      },
    },
  };
  const result = responseSchema.parse(
    await jsonRequest(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key()}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      },
      options.fetcher,
    ),
  );
  if (result.status !== "completed")
    throw new Error(
      "Model response did not complete; no partial article accepted",
    );
  const messages = result.output
    .filter((item) => item.type === "message")
    .flatMap((item) => (Array.isArray(item.content) ? item.content : [])) as {
    type?: string;
    text?: string;
    annotations?: { type?: string; url?: string }[];
  }[];
  const output = messages
    .filter((item) => item.type === "output_text")
    .map((item) => item.text ?? "")
    .join("");
  const searches = result.output.filter(
    (item) => item.type === "web_search_call",
  );
  if (options.search && searches.length === 0)
    throw new Error("Research did not execute web search");
  const urls = new Set<string>();
  for (const m of messages)
    for (const a of m.annotations ?? [])
      if (a.type === "url_citation" && a.url) urls.add(a.url);
  for (const search of searches) {
    const action = search.action as
      | { sources?: { url?: string }[] }
      | undefined;
    for (const source of action?.sources ?? [])
      if (source.url) urls.add(source.url);
  }
  const rates = publishingConfig.pricing[model as "gpt-5.4" | "gpt-5.4-mini"];
  if (!rates)
    throw new Error("No reviewed token price is configured for this model");
  const usage = result.usage ?? { input_tokens: 0, output_tokens: 0 };
  modelUses.push({
    stage,
    model,
    inputTokens: usage.input_tokens,
    outputTokens: usage.output_tokens,
    searchCalls: searches.length,
    estimatedCents:
      (100 *
        (usage.input_tokens * rates.inputPerMillion +
          usage.output_tokens * rates.outputPerMillion)) /
        1000000 +
      searches.length * publishingConfig.pricing.webSearchCallCents,
  });
  return { value: schema.parse(JSON.parse(output)), sources: [...urls] };
}
export async function imageResponse(
  prompt: string,
  fetcher: typeof fetch = fetch,
): Promise<Buffer> {
  const result = z
    .object({
      data: z
        .array(z.object({ b64_json: z.string().min(1) }).passthrough())
        .length(1),
      usage: z.record(z.string(), z.unknown()).optional(),
    })
    .passthrough()
    .parse(
      await jsonRequest(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key()}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            model: publishingConfig.models.image,
            prompt,
            n: 1,
            size: "1536x864",
            quality: "medium",
            output_format: "webp",
            output_compression: 80,
          }),
        },
        fetcher,
      ),
    );
  // A conservative reservation is recorded even when image token accounting changes upstream.
  modelUses.push({
    stage: "image",
    model: publishingConfig.models.image,
    inputTokens: 0,
    outputTokens: 0,
    searchCalls: 0,
    estimatedCents: 60,
  });
  return Buffer.from(result.data[0].b64_json, "base64");
}
