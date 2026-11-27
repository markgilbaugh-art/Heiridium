import fs from "node:fs";
import path from "node:path";
import { imageResponse } from "./provider";
import { optimizeImage } from "./optimize-image";
import { sha256 } from "../../lib/academy/policy";
import { slugSchema } from "../../lib/academy/schema";

export async function generateImage(
  slug: string,
  prompt: string,
  alt: string,
  replace = false,
) {
  slugSchema.parse(slug);
  const file = path.join(
    process.cwd(),
    "public/images/academy",
    `${slug}.webp`,
  );
  if (fs.existsSync(file) && !replace)
    throw new Error(
      "Image already exists; regeneration must use the explicit review-reset operation",
    );
  const specification = `Original professional editorial photograph. Exactly 16:9 landscape. Heiridium: midnight navy, restrained gold light, platinum silver, realistic business settings, respectful older business owners. No logos, readable text, fake charts, watermark, robots, distorted hands, or suggestion of real clients. ${prompt}`;
  const output = await optimizeImage(await imageResponse(specification));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temp, output.bytes, { flag: "wx" });
  fs.renameSync(temp, file);
  return {
    src: `/images/academy/${slug}.webp`,
    alt,
    width: output.width,
    height: output.height,
    sha256: output.sha256,
    generator: "OpenAI Images API",
    promptSha256: sha256(specification),
  };
}
