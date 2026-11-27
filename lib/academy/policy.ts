import { createHash } from "node:crypto";
import type { EngineArticle, Publication, Approval } from "./schema";

export function sha256(data: string | Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}
export function articleDigest(article: EngineArticle): string {
  return sha256(JSON.stringify(article));
}
export function centralDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  return `${parts.find((p) => p.type === "year")!.value}-${parts.find((p) => p.type === "month")!.value}-${parts.find((p) => p.type === "day")!.value}`;
}
export function centralHour(now = new Date()): number {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      hour: "numeric",
      hourCycle: "h23",
    }).format(now),
  );
}
export function fullText(article: EngineArticle): string {
  return JSON.stringify(article.content);
}
export function requiresProfessionalReview(article: EngineArticle): boolean {
  return (
    article.content.calculations.length > 0 ||
    article.pillar === "tax-wealth" ||
    article.pillar === "business-valuation" ||
    article.topic === "tax-asset-protection" ||
    /capital gains|tax (?:rate|savings|deduction|deferral)|installment sale|seller.financ|estate plan|\btrusts?\b|asset protection|investment (?:return|advice|strategy)|retirement income|asset sale|equity sale/i.test(
      fullText(article),
    ) ||
    article.validation.report?.professionalReviewRequired === true
  );
}
export function validApproval(
  article: EngineArticle,
  approval: Approval | undefined,
  editorialActors: string[],
  professionalActors: string[],
): boolean {
  if (
    !approval ||
    approval.slug !== article.slug ||
    approval.digest !== articleDigest(article)
  )
    return false;
  if (
    !editorialActors.includes(approval.editorial.actor) ||
    approval.editorial.actor.endsWith("[bot]")
  )
    return false;
  return (
    !requiresProfessionalReview(article) ||
    Boolean(
      approval.professional &&
        professionalActors.includes(approval.professional.actor) &&
        approval.professional.qualification.trim().length >= 3 &&
        !approval.professional.actor.endsWith("[bot]"),
    )
  );
}
export function publicationForDay(
  ledger: Publication[],
  date: string,
): Publication | undefined {
  const matching = ledger.filter((entry) => entry.date === date);
  if (matching.length > 1)
    throw new Error(
      "Multiple publications recorded for one Central date. Publishing stopped.",
    );
  return matching[0];
}
export function safeInternalHref(href: string): boolean {
  return (
    /^\/(?!\/)[a-z0-9/?=&%#._-]*$/i.test(href) &&
    !href.includes("..") &&
    !/%(?:2f|5c|2e)/i.test(href)
  );
}
export function allowedSourceUrl(value: string, domains: string[]): URL {
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.port ||
    url.hash ||
    !domains.some(
      (domain) =>
        url.hostname === domain || url.hostname.endsWith(`.${domain}`),
    )
  )
    throw new Error("Research URL is outside the approved HTTPS source policy");
  return url;
}
export function normalizedWords(text: string): Set<string> {
  const stop = new Set([
    "a",
    "an",
    "and",
    "the",
    "for",
    "of",
    "to",
    "in",
    "your",
    "how",
    "what",
    "why",
    "is",
    "can",
    "with",
    "before",
    "business",
    "company",
  ]);
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !stop.has(w))
      .map((w) => w.replace(/(?:ing|ies|s)$/, "")),
  );
}
export function similarity(a: string, b: string): number {
  const x = normalizedWords(a),
    y = normalizedWords(b),
    common = [...x].filter((w) => y.has(w)).length;
  return x.size && y.size ? common / Math.min(x.size, y.size) : 0;
}
export function validateCalculation(
  c: EngineArticle["content"]["calculations"][number],
): boolean {
  const revenue = BigInt(c.revenueMinor),
    before = (revenue * BigInt(c.beforeMarginBps)) / 10000n,
    after = (revenue * BigInt(c.afterMarginBps)) / 10000n;
  if (
    (revenue * BigInt(c.beforeMarginBps)) % 10000n ||
    (revenue * BigInt(c.afterMarginBps)) % 10000n
  )
    return false;
  return (
    before === BigInt(c.beforeEbitdaMinor) &&
    after === BigInt(c.afterEbitdaMinor) &&
    (before * BigInt(c.multipleNumerator)) % BigInt(c.multipleDenominator) ===
      0n &&
    (after * BigInt(c.multipleNumerator)) % BigInt(c.multipleDenominator) ===
      0n &&
    (before * BigInt(c.multipleNumerator)) / BigInt(c.multipleDenominator) ===
      BigInt(c.beforeValueMinor) &&
    (after * BigInt(c.multipleNumerator)) / BigInt(c.multipleDenominator) ===
      BigInt(c.afterValueMinor)
  );
}
