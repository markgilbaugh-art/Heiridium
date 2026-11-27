import sharp from "sharp";
import { sha256 } from "../../lib/academy/policy";

export async function optimizeImage(
  input: Buffer,
): Promise<{ bytes: Buffer; width: number; height: number; sha256: string }> {
  if (input.length > 20000000)
    throw new Error("Generated image exceeds input size limit");
  for (const width of [1536, 1280])
    for (const quality of [82, 74, 64]) {
      const height = (width * 9) / 16;
      const bytes = await sharp(input, { limitInputPixels: 20000000 })
        .resize(width, height, { fit: "cover" })
        .webp({ quality })
        .toBuffer();
      if (bytes.length <= 350000)
        return { bytes, width, height, sha256: sha256(bytes) };
    }
  throw new Error("Image could not be optimized within the publishing limit");
}
