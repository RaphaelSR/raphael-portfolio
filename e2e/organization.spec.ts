import { test, expect } from "@playwright/test";

for (const width of [320, 1440]) {
  test(`reading layout remains usable with enlarged text at ${width}px`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./pt/");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page
      .locator("#work")
      .screenshot({ path: info.outputPath("work.png") });
    await page
      .locator("#about")
      .screenshot({ path: info.outputPath("about.png") });
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    await page.locator(".toolkit-disclosure > summary").click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator(".toolkit a").first()).toBeVisible();
  });
}

test("mobile navigation and every project remain available without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}en/`);
  await expect(page.locator(".project-card:visible")).toHaveCount(11);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: /Let’s talk/ })
    .click();
  await expect(
    page.getByRole("link", { name: "Résumé", exact: true }),
  ).toBeInViewport();
  await context.close();
});
