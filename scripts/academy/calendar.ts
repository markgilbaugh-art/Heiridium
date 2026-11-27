import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import {
  calendarEntrySchema,
  type CalendarEntry,
} from "../../lib/academy/schema";
import { academyRoot, atomicJson } from "../../lib/academy/store";
import { publishingConfig } from "../../lib/academy/config";
import { centralDate, similarity } from "../../lib/academy/policy";
import { structuredResponse } from "./provider";
import { allArticles } from "../../lib/content/articles";
// Keep historical briefs for audit. Add only new, unapproved planning entries.
export async function maintainCalendar(): Promise<CalendarEntry[]> {
  const file = path.join(academyRoot, "editorial-calendar.json");
  const entries = z
    .array(calendarEntrySchema)
    .parse(JSON.parse(fs.readFileSync(file, "utf8")));
  const today = centralDate(),
    future = entries.filter((e) => e.proposedDate >= today);
  const needed = Math.min(7, Math.max(0, 90 - future.length));
  if (!needed) return entries;
  const last =
    entries
      .map((e) => e.proposedDate)
      .sort()
      .at(-1) ?? today;
  const start = new Date(`${last}T12:00:00Z`);
  const dates = Array.from({ length: needed }, (_, i) =>
    new Date(start.getTime() + (i + 1) * 86400000).toISOString().slice(0, 10),
  );
  const response = await structuredResponse(
    "calendar_extension",
    publishingConfig.models.writer,
    z.object({ entries: z.array(calendarEntrySchema).length(needed) }).strict(),
    "Propose practical original business-owner research briefs, not articles or approvals. Cover the supplied dates once each. Balance ten editorial pillars and existing four topic hubs. Each must answer a distinct owner question not already in the inventory. Set researchStatus brief-prepared and publicationStatus planned. Do not invent completed research. Use only existing internal article slugs and service paths. No HTML or code.",
    {
      dates,
      inventory: [
        ...allArticles.map((a) => ({ id: a.slug, title: a.title })),
        ...entries.map((e) => ({ id: e.id, title: e.proposedTitle })),
      ],
    },
  );
  const added = response.value.entries,
    seen = new Set(entries.map((e) => e.id));
  for (const e of added) {
    if (
      seen.has(e.id) ||
      !dates.includes(e.proposedDate) ||
      e.researchStatus !== "brief-prepared" ||
      e.publicationStatus !== "planned" ||
      /[<>]/.test(JSON.stringify(e))
    )
      throw new Error("Calendar proposal failed planning-only safety checks");
    if (
      [
        ...allArticles.map((a) => a.title),
        ...entries.map((x) => x.proposedTitle),
      ].some((t) => similarity(t, e.proposedTitle) >= 0.8)
    )
      throw new Error("Calendar proposal overlaps existing intent");
    if (
      ![
        "/how-we-help",
        "/exit-planning",
        "/succession-planning",
        "/tax-planning-before-a-sale",
      ].includes(e.servicePage) ||
      e.relatedArticles.some(
        (slug) => !allArticles.some((a) => a.slug === slug),
      )
    )
      throw new Error("Calendar proposal has an unknown internal link");
    seen.add(e.id);
  }
  if (new Set(added.map((e) => e.proposedDate)).size !== needed)
    throw new Error("Calendar extension duplicates a date");
  atomicJson(file, [...entries, ...added]);
  return [...entries, ...added];
}
