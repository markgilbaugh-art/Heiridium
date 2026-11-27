import configJson from "@/content/academy/publishing-config.json";
import { z } from "zod";

export const configSchema = z
  .object({
    schemaVersion: z.literal(1),
    enabled: z.boolean(),
    timezone: z.literal("America/Chicago"),
    publicationHour: z.literal(6),
    approvedInventoryTarget: z.number().int().min(1).max(30),
    lowInventoryThreshold: z.number().int().min(1),
    editorialActors: z.array(z.string().regex(/^[a-zA-Z0-9-]+$/)).min(1),
    professionalActors: z.array(z.string().regex(/^[a-zA-Z0-9-]+$/)),
    models: z
      .object({
        research: z.string(),
        writer: z.string(),
        validator: z.string(),
        image: z.string(),
      })
      .strict(),
    budget: z
      .object({
        reservationCents: z.number().int().positive(),
        dailyLimitCents: z.number().int().positive(),
        monthlyLimitCents: z.number().int().positive(),
      })
      .strict(),
    limits: z
      .object({
        researchSources: z.number().int().min(3).max(6),
        sourceBytes: z.number().int().positive().max(2000000),
        sourceCharacters: z.number().int().positive().max(20000),
        modelOutputTokens: z.number().int().min(1000).max(8000),
        maxCorrections: z.number().int().min(0).max(1),
        requestTimeoutMs: z.number().int().min(1000).max(180000),
      })
      .strict(),
    sourceDomains: z.array(z.string().regex(/^[a-z0-9.-]+$/)).min(1),
    deployment: z
      .object({
        projectName: z.string(),
        projectId: z.string().nullable(),
        teamId: z.string().nullable(),
        siteUrl: z.literal("https://heiridium.com"),
        requireCommitVerification: z.literal(true),
      })
      .strict(),
    notifications: z
      .object({ githubIssues: z.boolean(), assignee: z.string() })
      .strict(),
    pricingReviewedAt: z.iso.date(),
    pricing: z
      .object({
        "gpt-5.4": z
          .object({ inputPerMillion: z.number(), outputPerMillion: z.number() })
          .strict(),
        "gpt-5.4-mini": z
          .object({ inputPerMillion: z.number(), outputPerMillion: z.number() })
          .strict(),
        webSearchCallCents: z.number(),
      })
      .strict(),
  })
  .strict();
export const publishingConfig = configSchema.parse(configJson);
export type PublishingConfig = z.infer<typeof configSchema>;
