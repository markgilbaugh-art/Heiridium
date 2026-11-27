import test from "node:test";
import assert from "node:assert/strict";
import {
  articleDigest,
  centralDate,
  centralHour,
  validApproval,
  requiresProfessionalReview,
  safeInternalHref,
  allowedSourceUrl,
  validateCalculation,
  publicationForDay,
} from "../../lib/academy/policy";
import {
  engineArticleSchema,
  type Approval,
  type EngineArticle,
} from "../../lib/academy/schema";
import { readArticles, readLedger } from "../../lib/academy/store";
import { allArticles, getLiveArticles } from "../../lib/content/articles";
import { validateArticle } from "../../lib/academy/validate";
import { publishingConfig } from "../../lib/academy/config";
import { planPublication } from "../../lib/academy/publish";
import { checkReservations } from "../../scripts/academy/budget";
import { allowedGeneratedPath } from "../../scripts/academy/commit";
import { approve } from "../../scripts/academy/approve";

const originals = readArticles();
function article(): EngineArticle {
  const a = structuredClone(
    originals.find(
      (a) => a.slug === "service-business-lead-conversion-scorecard",
    )!,
  );
  a.proposedDate = "2026-11-27";
  a.sources.forEach((s) => {
    s.retrievedAt = "2026-11-27T05:00:00.000Z";
  });
  a.validation = {
    status: "passed",
    reviewedAt: "2026-11-27T10:00:00.000Z",
    report: {
      outcome: "pass",
      findings: [],
      claimChecks: [
        {
          claim: "Synthetic unit-test check only",
          sourceIds: [a.sources[0].id],
          supported: true,
        },
      ],
      duplicateOf: [],
      maximumSimilarity: 0,
      professionalReviewRequired: false,
      originalityNotes:
        "Synthetic unit-test verifier result; never written to inventory.",
    },
  };
  return a;
}
function approval(a: EngineArticle): Approval {
  return {
    schemaVersion: 1,
    slug: a.slug,
    digest: articleDigest(a),
    editorial: {
      actor: "markgilbaugh-art",
      name: "Synthetic unit-test reviewer",
      approvedAt: "2026-11-27T10:00:00.000Z",
      runUrl: "https://github.com/markgilbaugh-art/Heiridium/actions/runs/1",
    },
    professional: null,
  };
}
const enabled = { ...publishingConfig, enabled: true };
function plan(
  a = article(),
  overrides: Partial<Parameters<typeof planPublication>[0]> = {},
) {
  return planPublication({
    articles: [a],
    approvals: new Map([[a.slug, approval(a)]]),
    ledger: [],
    inventory: allArticles,
    now: new Date("2026-11-27T12:00:00Z"),
    runId: "synthetic-unit-test",
    config: enabled,
    ...overrides,
  });
}

test("real content validates and all 13 legacy live articles remain available", () => {
  assert.ok(originals.length >= 7);
  for (const a of originals) {
    assert.deepEqual(validateArticle(a, allArticles), []);
  }
  assert.equal(getLiveArticles().filter((a) => !a.provenance).length, 13);
});
test("unknown schema fields cannot grant publication or insert code", () => {
  assert.throws(() =>
    engineArticleSchema.parse({ ...article(), status: "published" }),
  );
  const a = article();
  assert.throws(() =>
    engineArticleSchema.parse({
      ...a,
      content: {
        ...a.content,
        body: [...a.content.body, { type: "script", text: "alert(1)" }],
      },
    }),
  );
});
test("valid human editorial approval binds the entire draft", () => {
  const a = article(),
    v = approval(a);
  assert.equal(validApproval(a, v, ["markgilbaugh-art"], []), true);
  a.content.summary += " Changed.";
  assert.equal(validApproval(a, v, ["markgilbaugh-art"], []), false);
});
test("image replacement invalidates approval", () => {
  const a = article(),
    v = approval(a);
  a.image!.sha256 = "0".repeat(64);
  assert.equal(validApproval(a, v, ["markgilbaugh-art"], []), false);
});
test("unlisted and bot actors cannot approve", () => {
  const a = article(),
    v = approval(a);
  assert.equal(validApproval(a, v, ["someone-else"], []), false);
  v.editorial.actor = "publisher[bot]";
  assert.equal(validApproval(a, v, ["publisher[bot]"], []), false);
});
test("sensitive financial content requires an allowlisted qualified human", () => {
  const a = article();
  a.pillar = "business-valuation";
  let v = approval(a);
  assert.equal(requiresProfessionalReview(a), true);
  assert.equal(validApproval(a, v, ["markgilbaugh-art"], []), false);
  v = {
    ...v,
    professional: {
      actor: "qualified-reviewer",
      name: "Synthetic reviewer",
      qualification: "Synthetic test qualification",
      approvedAt: v.editorial.approvedAt,
      runUrl: v.editorial.runUrl,
    },
  };
  assert.equal(
    validApproval(a, v, ["markgilbaugh-art"], ["qualified-reviewer"]),
    true,
  );
  assert.equal(validApproval(a, v, ["markgilbaugh-art"], []), false);
});
test("tax wording and exact financial examples independently trigger review", () => {
  const a = article();
  a.content.body.push({
    type: "p",
    text: "Questions about an installment sale.",
    sourceIds: [],
  });
  assert.equal(requiresProfessionalReview(a), true);
  const finance = originals.find((a) => a.content.calculations.length)!;
  assert.equal(requiresProfessionalReview(finance), true);
});
test("local code cannot fabricate a workflow approval", () => {
  const before = process.env.GITHUB_ACTIONS;
  delete process.env.GITHUB_ACTIONS;
  try {
    assert.throws(
      () => approve("synthetic-test-unpublished", "editorial", "A Person", ""),
      /reviewed manual workflow/,
    );
  } finally {
    if (before !== undefined) process.env.GITHUB_ACTIONS = before;
  }
});

test("first publication uses the current Central date", () => {
  const result = plan();
  assert.equal(result.retry, false);
  assert.equal(result.entry.date, "2026-11-27");
  assert.equal(result.entry.slug, article().slug);
});
test("a deployment retry does not consume a second article, even without approval", () => {
  const first = plan().entry;
  const retry = plan(article(), {
    ledger: [first],
    articles: [],
    approvals: new Map(),
  });
  assert.equal(retry.retry, true);
  assert.deepEqual(retry.entry, first);
});
test("early, disabled, unapproved and pending publications fail closed", () => {
  assert.throws(
    () => plan(article(), { now: new Date("2026-11-27T11:59:00Z") }),
    /Before 06/,
  );
  assert.throws(
    () => plan(article(), { config: publishingConfig }),
    /disabled/,
  );
  assert.throws(() => plan(article(), { disabled: true }), /disabled/);
  assert.throws(() => plan(article(), { approvals: new Map() }), /No approved/);
  const a = article();
  a.validation.status = "pending";
  assert.throws(() => plan(a), /No approved/);
});
test("duplicate ledger date is a safety stop", () => {
  const entry = plan().entry;
  assert.throws(
    () => publicationForDay([entry, entry], entry.date),
    /Multiple publications/,
  );
});
for (const [utc, date, hour] of [
  ["2026-03-08T11:00:00Z", "2026-03-08", 6],
  ["2026-11-01T12:00:00Z", "2026-11-01", 6],
  ["2026-07-01T04:30:00Z", "2026-06-30", 23],
] as const) {
  test(`Central date and DST: ${utc}`, () => {
    assert.equal(centralDate(new Date(utc)), date);
    assert.equal(centralHour(new Date(utc)), hour);
  });
}
for (const href of [
  "https://evil.example",
  "//evil.example",
  "/../secrets",
  "/%2e%2e/secrets",
  "/a%2fb",
  "javascript:alert(1)",
  "/a\\b",
])
  test(`reject unsafe generated href ${href}`, () =>
    assert.equal(safeInternalHref(href), false));
test("valid consultation attribution is a relative URL", () =>
  assert.equal(
    safeInternalHref("/contact?source=academy&article=valid-slug"),
    true,
  ));
for (const url of [
  "http://www.irs.gov/",
  "https://irs.gov.evil.example/",
  "https://127.0.0.1/",
  "https://user:pass@irs.gov/",
  "https://irs.gov:8443/",
])
  test(`reject unsafe research URL ${url}`, () =>
    assert.throws(() => allowedSourceUrl(url, publishingConfig.sourceDomains)));
test("known primary source is allowed", () =>
  assert.equal(
    allowedSourceUrl(
      "https://www.irs.gov/businesses",
      publishingConfig.sourceDomains,
    ).hostname,
    "www.irs.gov",
  ));
test("exact EBITDA arithmetic and all monetary strings are checked", () => {
  const a = structuredClone(
    originals.find((a) => a.content.calculations.length)!,
  );
  assert.equal(validateCalculation(a.content.calculations[0]), true);
  a.content.calculations[0].afterValueMinor = "300000001";
  assert.equal(validateCalculation(a.content.calculations[0]), false);
  assert.ok(
    validateArticle(a, allArticles).some((i) => i.code === "CALCULATION"),
  );
  a.content.body.push({
    type: "p",
    text: "The hypothetical result is $9,000,000.",
    sourceIds: [],
  });
  assert.ok(
    validateArticle(a, allArticles).some((i) => i.code === "CALCULATION_TEXT"),
  );
});
test("duplicate intent, missing source IDs and HTML are rejected", () => {
  const a = article();
  a.content.title = allArticles.find((a) => a.slug !== article().slug)!.title;
  assert.ok(
    validateArticle(a, allArticles).some((i) => i.code === "DUPLICATE"),
  );
  a.content.body.push({
    type: "p",
    text: "<script>alert(1)</script>",
    sourceIds: ["missing-source"],
  });
  const codes = validateArticle(a, allArticles).map((i) => i.code);
  assert.ok(codes.includes("PLAIN_TEXT"));
  assert.ok(codes.includes("CITATION"));
});
test("writer-generated paths cannot escape the content allowlist", () => {
  for (const p of [
    "../../secret",
    ".github/workflows/steal.yml",
    "app/page.tsx",
    "content/academy/articles/../publishing-config.json",
    "public/images/academy/a.svg",
  ])
    assert.equal(allowedGeneratedPath(p), false);
  assert.equal(
    allowedGeneratedPath("content/academy/articles/a-draft.json"),
    true,
  );
});
test("budget includes durable reservations even when runs crash or artifacts expire", () => {
  const items = [
    { name: "academy-spend-2026-11-27-250-1-1", expired: true },
    { name: "academy-spend-2026-11-27-250-2-1" },
  ];
  assert.throws(
    () => checkReservations(items, "2026-11-27", 250, 500, 7500),
    /cap/,
  );
  assert.equal(
    checkReservations(items, "2026-11-28", 250, 500, 7500).month,
    500,
  );
});
test("monthly budget fails before a new paid call", () =>
  assert.throws(
    () =>
      checkReservations(
        [{ name: "academy-spend-2026-11-01-7500-1-1" }],
        "2026-11-27",
        250,
        500,
        7500,
      ),
    /cap/,
  ));
