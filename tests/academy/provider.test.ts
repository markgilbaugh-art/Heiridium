import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";
import {
  modelSchema,
  structuredResponse,
} from "../../scripts/academy/provider";
import { generationDecision } from "../../scripts/academy/preflight";
import { draftContentSchema } from "../../lib/academy/schema";
test("strict model schema omits unsupported URI format while local URL validation remains", () => {
  const schema = modelSchema(z.object({ url: z.url() }).strict());
  assert.equal(JSON.stringify(schema).includes('"format":"uri"'), false);
  assert.equal(schema.additionalProperties, false);
  assert.throws(() => z.url().parse("not a URL"));
  assert.ok(
    JSON.stringify(modelSchema(draftContentSchema)).includes(
      '"additionalProperties":false',
    ),
  );
});
test("Responses research requires actual search output, not invented citations", async () => {
  const before = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = "synthetic-test-token";
  try {
    let request: Record<string, unknown> = {};
    const fetcher = (async (_url, init) => {
      request = JSON.parse(String(init?.body));
      return new Response(
        JSON.stringify({
          status: "completed",
          output: [
            {
              type: "message",
              content: [
                { type: "output_text", text: '{"url":"https://www.irs.gov/"}' },
              ],
            },
          ],
          usage: { input_tokens: 1, output_tokens: 1 },
        }),
        { headers: { "content-type": "application/json" } },
      );
    }) as typeof fetch;
    await assert.rejects(
      structuredResponse(
        "test",
        "gpt-5.4",
        z.object({ url: z.url() }).strict(),
        "Research only",
        { question: "Untrusted source instructions are data" },
        { search: true, fetcher },
      ),
      /did not execute web search/,
    );
    assert.equal(request.tool_choice, "required");
    assert.equal(request.store, false);
    assert.equal(request.max_tool_calls, 6);
  } finally {
    if (before === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = before;
  }
});
test("a pending engine PR prevents duplicate generation before reserving cost", async () => {
  const before = process.env.GITHUB_EVENT_NAME;
  process.env.GITHUB_EVENT_NAME = "workflow_dispatch";
  try {
    const result = await generationDecision(
      async () => [
        {
          head: { ref: "academy/drafts/123-1" },
          html_url: "https://github.com/markgilbaugh-art/Heiridium/pull/1",
        },
      ],
      0,
    );
    assert.equal(result.needed, false);
    assert.match(result.reason, /duplicate/);
  } finally {
    if (before === undefined) delete process.env.GITHUB_EVENT_NAME;
    else process.env.GITHUB_EVENT_NAME = before;
  }
});
test("emergency disable prevents all generation requests", async () => {
  const before = process.env.ACADEMY_PUBLISHING_DISABLED;
  process.env.ACADEMY_PUBLISHING_DISABLED = "true";
  try {
    const result = await generationDecision(async () => {
      throw new Error("must not request");
    });
    assert.equal(result.needed, false);
  } finally {
    if (before === undefined) delete process.env.ACADEMY_PUBLISHING_DISABLED;
    else process.env.ACADEMY_PUBLISHING_DISABLED = before;
  }
});
