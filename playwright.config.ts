import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  timeout: 45000,
  expect: { timeout: 15000 },
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL:
      process.env.PLAYWRIGHT_BASE_URL ||
      "http://127.0.0.1:3010/",
    ...devices["Desktop Chrome"],
    locale: "pt-BR",
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: process.env.CI
          ? "npm run preview -- --port 3010"
          : "npm run dev",
        url: "http://127.0.0.1:3010/",
        reuseExistingServer: !process.env.CI,
      },
});
