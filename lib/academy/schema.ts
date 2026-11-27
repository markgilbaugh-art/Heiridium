import { z } from "zod";

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .max(120);
export const pillarSchema = z.enum([
  "silver-wave",
  "business-valuation",
  "sale-preparation",
  "accounting-cleanup",
  "profitability",
  "marketing-sales",
  "people-leadership",
  "technology-automation",
  "tax-wealth",
  "industry-improvement",
]);
export const topicSchema = z.enum([
  "business-performance",
  "tax-asset-protection",
  "exit-readiness",
  "succession-wealth",
]);
export const industrySchema = z.enum([
  "retail",
  "construction-trades",
  "ecommerce",
  "professional-services",
  "technology-it-services",
  "hvac",
  "plumbing",
]);
const text = z.string().trim().min(1).max(12000);
const sourceIds = z.array(slugSchema).max(8);
const prose = z
  .object({ type: z.enum(["p", "h2", "h3", "callout"]), text, sourceIds })
  .strict();
const list = z
  .object({
    type: z.literal("ul"),
    items: z.array(text).min(1).max(20),
    sourceIds,
  })
  .strict();
const checklist = z
  .object({
    type: z.literal("checklist"),
    title: text,
    items: z.array(text).min(1).max(20),
    sourceIds,
  })
  .strict();
const example = z
  .object({ type: z.literal("example"), title: text, text, sourceIds })
  .strict();
const link = z
  .object({
    type: z.literal("link"),
    label: text,
    href: z.string().min(1).max(300),
    sourceIds,
  })
  .strict();
const table = z
  .object({
    type: z.literal("table"),
    caption: text,
    headings: z.array(text).min(2).max(6),
    rows: z.array(z.array(text).min(2).max(6)).min(1).max(15),
    sourceIds,
  })
  .strict();
export const blockSchema = z.union([
  prose,
  list,
  checklist,
  example,
  link,
  table,
]);
export const sourceSchema = z
  .object({
    id: slugSchema,
    title: text,
    organization: z.string().min(1).max(150),
    url: z.url(),
    publishedAt: z.string().nullable(),
    retrievedAt: z.iso.datetime(),
    contentSha256: z.string().regex(/^[a-f0-9]{64}$/),
    supports: z.array(text).min(1).max(12),
  })
  .strict();
export const calculationSchema = z
  .object({
    id: slugSchema,
    kind: z.literal("ebitda-illustration"),
    currency: z.literal("USD"),
    revenueMinor: z.string().regex(/^\d+$/),
    beforeMarginBps: z.number().int().min(0).max(10000),
    afterMarginBps: z.number().int().min(0).max(10000),
    multipleNumerator: z.number().int().min(1).max(100),
    multipleDenominator: z.number().int().min(1).max(100),
    beforeEbitdaMinor: z.string().regex(/^\d+$/),
    afterEbitdaMinor: z.string().regex(/^\d+$/),
    beforeValueMinor: z.string().regex(/^\d+$/),
    afterValueMinor: z.string().regex(/^\d+$/),
    hypothetical: z.literal(true),
  })
  .strict();
export const draftContentSchema = z
  .object({
    title: z.string().min(20).max(130),
    summary: z.string().min(60).max(400),
    directAnswer: z.string().min(100).max(1400),
    seoTitle: z.string().min(20).max(75),
    metaDescription: z.string().min(90).max(170),
    primaryQuestion: z.string().min(15).max(180),
    searchIntent: z.string().min(15).max(300),
    body: z.array(blockSchema).min(8).max(55),
    relatedBooks: z.array(slugSchema).min(1).max(4),
    relatedArticles: z.array(slugSchema).max(5),
    calculations: z.array(calculationSchema).max(4),
    imagePrompt: z.string().min(80).max(2000),
    imageAlt: z.string().min(20).max(220),
  })
  .strict();
export const reviewSchema = z
  .object({
    outcome: z.enum(["pass", "revise", "human-review"]),
    findings: z.array(text).max(20),
    claimChecks: z
      .array(
        z.object({ claim: text, sourceIds, supported: z.boolean() }).strict(),
      )
      .min(1)
      .max(30),
    duplicateOf: z.array(slugSchema).max(10),
    maximumSimilarity: z.number().min(0).max(1),
    professionalReviewRequired: z.boolean(),
    originalityNotes: text,
  })
  .strict();
export const engineArticleSchema = z
  .object({
    schemaVersion: z.literal(1),
    slug: slugSchema,
    pillar: pillarSchema,
    topic: topicSchema,
    industries: z.array(industrySchema).min(1).max(7),
    proposedDate: z.iso.date(),
    createdAt: z.iso.datetime(),
    content: draftContentSchema,
    sources: z.array(sourceSchema).min(3).max(6),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
        width: z.number().int(),
        height: z.number().int(),
        sha256: z.string().regex(/^[a-f0-9]{64}$/),
        generator: z.string(),
        promptSha256: z.string().regex(/^[a-f0-9]{64}$/),
      })
      .strict()
      .nullable(),
    validation: z
      .object({
        status: z.enum(["pending", "passed", "needs-review"]),
        reviewedAt: z.iso.datetime().nullable(),
        report: reviewSchema.nullable(),
      })
      .strict(),
    disclosure: z.literal(
      "AI-assisted research and drafting. Human editorial approval is required before publication. AI-generated images are illustrative and do not depict actual clients.",
    ),
  })
  .strict();
export type EngineArticle = z.infer<typeof engineArticleSchema>;
export type DraftContent = z.infer<typeof draftContentSchema>;
export type ResearchSource = z.infer<typeof sourceSchema>;
export const approvalSchema = z
  .object({
    schemaVersion: z.literal(1),
    slug: slugSchema,
    digest: z.string().regex(/^[a-f0-9]{64}$/),
    editorial: z
      .object({
        actor: z.string(),
        name: z.string(),
        approvedAt: z.iso.datetime(),
        runUrl: z.url(),
      })
      .strict(),
    professional: z
      .object({
        actor: z.string(),
        name: z.string(),
        qualification: z.string(),
        approvedAt: z.iso.datetime(),
        runUrl: z.url(),
      })
      .strict()
      .nullable(),
  })
  .strict();
export type Approval = z.infer<typeof approvalSchema>;
export const publicationSchema = z
  .object({
    date: z.iso.date(),
    slug: slugSchema,
    digest: z.string().regex(/^[a-f0-9]{64}$/),
    publishedAt: z.iso.datetime(),
    runId: z.string(),
    imageSha256: z.string().regex(/^[a-f0-9]{64}$/),
  })
  .strict();
export type Publication = z.infer<typeof publicationSchema>;
export const calendarEntrySchema = z
  .object({
    id: slugSchema,
    proposedTitle: text,
    pillar: pillarSchema,
    topic: topicSchema,
    industry: industrySchema,
    audience: text,
    primaryQuestion: text,
    relatedQuestions: z.array(text).min(2).max(6),
    searchIntent: text,
    relatedArticles: z.array(slugSchema),
    servicePage: z.string(),
    proposedDate: z.iso.date(),
    researchStatus: z.enum(["brief-prepared", "researched"]),
    publicationStatus: z.enum(["planned", "draft", "approved", "published"]),
  })
  .strict();
export type CalendarEntry = z.infer<typeof calendarEntrySchema>;
