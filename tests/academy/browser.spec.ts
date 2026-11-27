import { test, expect } from "@playwright/test";
import fs from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { getEditorialQueue } from "../../lib/content/articles";
const queue = getEditorialQueue();
const preview =
  queue.find((a) => a.slug === "silver-wave-ownership-transition-checklist") ??
  queue.find((a) => a.provenance) ??
  queue[0];
if (!preview)
  throw new Error(
    "A private draft fixture is required for the browser rehearsal.",
  );
const slug = preview.slug;
test("private preview: normal queue navigation, image, headings, keyboard and responsive layout", async ({
  page,
}, info) => {
  const token = fs
    .readFileSync(
      process.env.ACADEMY_TEST_PREVIEW_SECRET_FILE ??
        path.join(tmpdir(), "heiridium-academy-preview-secret"),
      "utf8",
    )
    .trim();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(`/editorial?token=${encodeURIComponent(token)}`);
  await expect(
    page.getByRole("heading", { level: 1, name: "Editorial queue" }),
  ).toBeVisible();
  await page.screenshot({
    path: `artifacts/editorial-queue-${info.project.name}.png`,
    fullPage: true,
  });
  await page.locator(`a[href*="slug=${slug}"]`).click();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: preview.title,
    }),
  ).toBeVisible();
  await expect(page.getByText("Proposed", { exact: true })).toBeVisible();
  if (preview.cover) {
    const image = page.getByRole("img", { name: preview.cover.alt });
    await expect(image).toBeVisible();
    expect(
      await image.evaluate((el) => (el as HTMLImageElement).naturalWidth),
    ).toBeGreaterThan(0);
  }
  const structured = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  expect(structured.some((text) => text.includes('"@type":"Article"'))).toBe(
    false,
  );
  const table = preview.body.find((block) => block.type === "table");
  if (table?.type === "table") {
    const region = page.getByRole("region", { name: table.caption });
    await expect(region).toBeVisible();
    await region.focus();
    await expect(region).toBeFocused();
  }
  const back = page.getByRole("link", { name: "Back to queue" });
  await back.focus();
  await expect(back).toBeFocused();
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(150);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: `artifacts/private-article-preview-${info.project.name}.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
});
test("unapproved article stays out of public pages, sitemap and structured data", async ({
  request,
}) => {
  for (const route of [
    "/editorial",
    "/editorial?token=wrong",
    `/academy/${slug}`,
  ])
    expect((await request.get(route)).status()).toBe(404);
  for (const route of [
    "/",
    "/academy",
    `/academy/topics/${preview.topic}`,
    "/sitemap.xml",
  ]) {
    const response = await request.get(route);
    expect(response.status()).toBe(200);
    expect(await response.text()).not.toContain(slug);
  }
});
test("legacy article, book and consultation remain accessible", async ({
  page,
  request,
}) => {
  await page.goto("/academy/why-profit-and-cash-flow-tell-different-stories");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(
    await page.locator('script[type="application/ld+json"]').allTextContents(),
  ).toEqual(
    expect.arrayContaining([expect.stringContaining('"@type":"Article"')]),
  );
  for (const route of [
    "/books/build-a-profitable-business",
    "/contact",
    "/industries/hvac",
  ])
    expect((await request.get(route)).status()).toBe(200);
  await page
    .locator(
      'a[href="/contact?source=academy&article=why-profit-and-cash-flow-tell-different-stories"]',
    )
    .first()
    .click();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Start with a confidential conversation",
    }),
  ).toBeVisible();
  await expect(page.locator('input[name="academy_article"]')).toHaveValue(
    "why-profit-and-cash-flow-tell-different-stories",
  );
});

test("release diagnostics expose only the public deployment identity", async ({
  request,
}) => {
  const response = await request.get("/api/academy/release");
  expect(response.status()).toBe(200);
  const value = await response.json();
  expect(Object.keys(value).sort()).toEqual([
    "application",
    "commit",
    "environment",
  ]);
  expect(value.application).toBe("heiridium");
  expect(response.headers()["cache-control"]).toBe("no-store");
  expect(value.commit === null || /^[a-f0-9]{40}$/.test(value.commit)).toBe(
    true,
  );
});
