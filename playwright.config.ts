import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/academy",
  testMatch: "browser.spec.ts",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [
    ["list"],
    ["json", { outputFile: "artifacts/browser-results.json" }],
  ],
  outputDir: "artifacts/browser",
  webServer: {
    command: "node scripts/academy/browser-server.mjs",
    url: "http://127.0.0.1:3427",
    reuseExistingServer: false,
    timeout: 30000,
  },
  use: { baseURL: "http://127.0.0.1:3427", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: "mobile",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
