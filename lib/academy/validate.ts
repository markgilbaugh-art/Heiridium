import fs from "node:fs";
import path from "node:path";
import { publishingConfig } from "./config";
import {
  allowedSourceUrl,
  fullText,
  safeInternalHref,
  similarity,
  validateCalculation,
  sha256,
  requiresProfessionalReview,
} from "./policy";
import type { EngineArticle } from "./schema";

export interface ValidationIssue {
  code: string;
  message: string;
}
export function validateArticle(
  article: EngineArticle,
  inventory: { slug: string; title: string; primaryQuestion?: string }[],
  options: { checkImage?: boolean; checkFreshness?: boolean; now?: Date } = {},
): ValidationIssue[] {
  const issues: ValidationIssue[] = [],
    add = (code: string, message: string) => issues.push({ code, message });
  const body = article.content.body
    .map((b) =>
      "text" in b
        ? b.text
        : "items" in b
          ? b.items.join(" ")
          : "rows" in b
            ? b.rows.flat().join(" ")
            : b.label,
    )
    .join(" ");
  const words = body.trim().split(/\s+/).length;
  if (words < 650 || words > 2600)
    add(
      "WORD_COUNT",
      `Article has ${words} words; use 650–2600 substantive words without padding.`,
    );
  const text = fullText(article);
  if (/[<>]|\u2014/.test(text))
    add(
      "PLAIN_TEXT",
      "HTML/JSX and em dashes are not allowed in generated content.",
    );
  if (
    /\b(?:guaranteed (?:return|tax|savings)|risk.free|tax.free guaranteed|our (?:acquisition pipeline|growth target|internal financial goal))\b/i.test(
      text,
    )
  )
    add("CLAIMS", "Unsupported guarantees or internal company information.");
  if (
    /(?:sk-[a-zA-Z0-9_-]{15,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]+)/.test(
      JSON.stringify(article),
    )
  )
    add("CONFIDENTIAL", "Possible credential material in article data.");
  if (article.content.body[0]?.type === "h3")
    add("HEADINGS", "A subsection cannot precede its H2 section.");
  let heading = false;
  for (const block of article.content.body) {
    if (block.type === "h2") heading = true;
    if (block.type === "h3" && !heading)
      add("HEADINGS", "H3 has no preceding H2.");
    if (
      block.type === "table" &&
      block.rows.some((row) => row.length !== block.headings.length)
    )
      add("TABLE", "Table rows do not match their headings.");
    if (
      block.sourceIds.some(
        (id) => !article.sources.some((source) => source.id === id),
      )
    )
      add("CITATION", "A block references an unknown source.");
  }
  const links = article.content.body.filter((b) => b.type === "link");
  if (links.length < 2 || links.length > 5)
    add("INTERNAL_LINKS", "Use two to five relevant internal links.");
  for (const block of links) {
    if (!safeInternalHref(block.href)) add("URL", "Unsafe internal link.");
    else {
      const pathname = block.href.split(/[?#]/)[0];
      if (
        pathname.startsWith("/academy/") &&
        !inventory.some((a) => `/academy/${a.slug}` === pathname)
      )
        add("BROKEN_LINK", `Unknown Academy link: ${pathname}`);
      else if (
        !pathname.startsWith("/academy/") &&
        ![
          "/contact",
          "/how-we-help",
          "/exit-planning",
          "/tax-planning-before-a-sale",
          "/succession-planning",
          "/industries",
          "/books",
        ].includes(pathname) &&
        !/^\/books\/[a-z0-9-]+$/.test(pathname)
      )
        add("BROKEN_LINK", `Unrecognized service/book link: ${pathname}`);
    }
  }
  if (
    !links.some((b) => b.href === "/contact" || b.href.startsWith("/contact?"))
  )
    add("CTA", "Confidential consultation link is required.");
  if (
    !article.content.body.some((b) =>
      ["checklist", "table", "example"].includes(b.type),
    )
  )
    add(
      "PRACTICAL_VALUE",
      "Add a substantial checklist, decision table, or worked example.",
    );
  for (const c of article.content.calculations)
    if (!validateCalculation(c))
      add("CALCULATION", `Exact financial calculation failed: ${c.id}`);
  if (/\$\s*\d/.test(body) && !article.content.calculations.length)
    add(
      "CALCULATION",
      "Monetary examples need structured, programmatically checked calculations.",
    );
  if (article.content.calculations.length) {
    const allowed = new Set(
      article.content.calculations.flatMap((c) => [
        c.revenueMinor,
        c.beforeEbitdaMinor,
        c.afterEbitdaMinor,
        c.beforeValueMinor,
        c.afterValueMinor,
        (BigInt(c.afterEbitdaMinor) - BigInt(c.beforeEbitdaMinor)).toString(),
        (BigInt(c.afterValueMinor) - BigInt(c.beforeValueMinor)).toString(),
      ]),
    );
    for (const match of body.matchAll(
      /\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)/g,
    )) {
      const [whole, fraction = ""] = match[1].replaceAll(",", "").split(".");
      const minor = (
        BigInt(whole) * BigInt(100) +
        BigInt(fraction.padEnd(2, "0"))
      ).toString();
      if (!allowed.has(minor))
        add(
          "CALCULATION_TEXT",
          "A monetary amount does not match the exact recorded calculation.",
        );
    }
  }
  const books = [
    "build-a-profitable-business",
    "protect-what-you-built",
    "build-a-sellable-business",
    "build-generational-wealth",
  ];
  if (article.content.relatedBooks.some((book) => !books.includes(book)))
    add("BROKEN_BOOK", "Related book does not exist.");
  if (
    article.content.relatedArticles.some(
      (slug) => !inventory.some((a) => a.slug === slug),
    )
  )
    add("BROKEN_LINK", "Related article does not exist.");
  if (
    article.sources.length < 3 ||
    new Set(article.sources.map((s) => s.url)).size < 3
  )
    add("SOURCES", "Use at least three distinct, retrieved sources.");
  if (new Set(article.sources.map((s) => s.id)).size !== article.sources.length)
    add("CITATION", "Source identifiers must be unique.");
  if (
    article.validation.status === "passed" &&
    (!article.validation.reviewedAt || !article.validation.report)
  )
    add(
      "EDITORIAL_VERIFICATION",
      "Passed verification requires a dated independent report.",
    );
  for (const source of article.sources) {
    try {
      allowedSourceUrl(source.url, publishingConfig.sourceDomains);
    } catch {
      add("SOURCE_URL", "A source is outside the approved HTTPS domains.");
    }
    if (
      options.checkFreshness &&
      (options.now ?? new Date()).getTime() - Date.parse(source.retrievedAt) >
        (requiresProfessionalReview(article) ? 30 : 90) * 86400000
    )
      add(
        "STALE_SOURCE",
        "Refresh and reverify the evidence before human approval or publication.",
      );
    if (
      Date.parse(source.retrievedAt) >
      (options.now ?? new Date()).getTime() + 300000
    )
      add("SOURCE_DATE", "Source retrieval date is in the future.");
  }
  for (const existing of inventory) {
    if (existing.slug === article.slug) continue;
    if (
      similarity(article.content.title, existing.title) >= 0.8 ||
      (existing.primaryQuestion &&
        similarity(article.content.primaryQuestion, existing.primaryQuestion) >=
          0.85)
    )
      add("DUPLICATE", `Potential duplicate intent: ${existing.slug}`);
  }
  if (article.validation.report) {
    const report = article.validation.report;
    if (
      report.outcome !== "pass" ||
      report.claimChecks.some((c) => !c.supported) ||
      report.duplicateOf.length ||
      report.maximumSimilarity >= 0.85
    )
      add(
        "EDITORIAL_VERIFICATION",
        "Independent factual/originality verification has not passed.",
      );
    if (
      report.claimChecks.some(
        (c) =>
          !c.sourceIds.length ||
          c.sourceIds.some((id) => !article.sources.some((s) => s.id === id)),
      )
    )
      add("EDITORIAL_CITATION", "Verifier cited an absent source.");
  }
  if (options.checkImage !== false) {
    if (!article.image) add("IMAGE", "Original featured image is required.");
    else {
      const expected = `/images/academy/${article.slug}.webp`;
      if (
        article.image.src !== expected ||
        article.image.alt !== article.content.imageAlt ||
        article.image.width * 9 !== article.image.height * 16
      )
        add("IMAGE", "Image path, alt text or 16:9 dimensions are invalid.");
      const file = path.join(process.cwd(), "public", expected);
      if (!fs.existsSync(file)) add("IMAGE", "Featured image file is missing.");
      else if (
        sha256(fs.readFileSync(file)) !== article.image.sha256 ||
        fs.statSync(file).size > 350000
      )
        add("IMAGE", "Featured image digest or maximum file size failed.");
    }
  }
  return issues;
}
