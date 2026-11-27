import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import {
  approvalSchema,
  engineArticleSchema,
  publicationSchema,
  slugSchema,
  type EngineArticle,
  type Approval,
  type Publication,
} from "./schema";

export const academyRoot = path.join(process.cwd(), "content/academy");
export function articlePath(slug: string): string {
  return path.join(academyRoot, "articles", `${slugSchema.parse(slug)}.json`);
}
export function readArticles(): EngineArticle[] {
  const directory = path.join(academyRoot, "articles");
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => {
      const article = engineArticleSchema.parse(
        JSON.parse(fs.readFileSync(path.join(directory, name), "utf8")),
      );
      if (name !== `${article.slug}.json`)
        throw new Error("Article filename does not match its slug");
      return article;
    });
}
export function readApproval(slug: string): Approval | undefined {
  const file = path.join(
    academyRoot,
    "approvals",
    `${slugSchema.parse(slug)}.json`,
  );
  return fs.existsSync(file)
    ? approvalSchema.parse(JSON.parse(fs.readFileSync(file, "utf8")))
    : undefined;
}
export function readLedger(): Publication[] {
  return z
    .object({
      schemaVersion: z.literal(1),
      publications: z.array(publicationSchema),
    })
    .strict()
    .parse(
      JSON.parse(
        fs.readFileSync(
          path.join(academyRoot, "publication-ledger.json"),
          "utf8",
        ),
      ),
    ).publications;
}
export function atomicJson(file: string, data: unknown): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (fs.existsSync(file) && fs.lstatSync(file).isSymbolicLink())
    throw new Error("Refusing a symbolic link write");
  const temp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(data, null, 2) + "\n", { flag: "wx" });
  fs.renameSync(temp, file);
}
