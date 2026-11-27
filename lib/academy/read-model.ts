import type { Article, Block } from "@/lib/content/types";
import { publishingConfig } from "./config";
import { readArticles, readApproval, readLedger } from "./store";
import {
  articleDigest,
  validApproval,
  requiresProfessionalReview,
} from "./policy";

export function engineArticles(): Article[] {
  const ledger = readLedger();
  return readArticles().map((record) => {
    const approval = readApproval(record.slug),
      entry = ledger.find((p) => p.slug === record.slug);
    const permitted =
      record.validation.status === "passed" &&
      record.validation.report?.outcome === "pass" &&
      record.image !== null &&
      validApproval(
        record,
        approval,
        publishingConfig.editorialActors,
        publishingConfig.professionalActors,
      );
    const published = Boolean(
      permitted &&
        entry &&
        entry.digest === articleDigest(record) &&
        entry.imageSha256 === record.image?.sha256,
    );
    return {
      slug: record.slug,
      title: record.content.title,
      summary: record.content.summary,
      directAnswer: record.content.directAnswer,
      topic: record.topic,
      industries: record.industries,
      author: {
        name: "Heiridium Academy Editorial Team",
        role: "Editorial team",
      },
      reviewer:
        published && approval?.professional
          ? {
              name: approval.professional.name,
              role: approval.professional.qualification,
            }
          : undefined,
      requiresProfessionalReview: requiresProfessionalReview(record),
      status: published ? "published" : "in-review",
      publishAt:
        published && entry
          ? entry.publishedAt
          : `${record.proposedDate}T12:00:00.000Z`,
      cover: record.image
        ? {
            src: record.image.src,
            alt: record.image.alt,
            width: record.image.width,
            height: record.image.height,
          }
        : undefined,
      body: record.content.body as Block[],
      sources: record.sources.map((s) => ({
        label: `${s.organization}: ${s.title}`,
        url: s.url,
      })),
      relatedBooks: record.content.relatedBooks,
      relatedArticles: record.content.relatedArticles,
      seo: {
        title: record.content.seoTitle,
        description: record.content.metaDescription,
        ogImage: record.image?.src,
      },
      provenance: {
        digest: articleDigest(record),
        machineValidation: record.validation.status,
        approved: permitted,
        disclosure: record.disclosure,
        editorialApproval:
          permitted && approval
            ? `${approval.editorial.name} · ${approval.editorial.approvedAt.slice(0, 10)}`
            : undefined,
      },
    };
  });
}
