import { test, expect } from "@playwright/test";
for (const [locale, title] of [
  ["en", "Professional experience."],
  ["pt", "Experiência profissional."],
  ["es", "Experiencia profesional."],
]) {
  test(`static ${locale} content is readable without JavaScript`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    const response = await page.goto(`${baseURL}${locale}/`);
    const html = await response!.text();
    expect(html).toContain("Xseed Solutions");
    expect(html).toContain("ModPro AI");
    expect(html).toContain("raphael-rocha-resume.pdf");
    expect(html).toContain("application/ld+json");
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
    await expect(page.locator('a[href="https://modpro.ai/"]')).toBeVisible();
    await expect(page.locator(".experience-highlight").last()).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://raphaelsr.github.io/raphael-portfolio/${locale}/`,
    );
    await expect(page.locator("link[hreflang]")).toHaveCount(4);
    await page.getByRole("link", { name: "Español", exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await context.close();
  });
}
test("explicit locale URL wins over storage and browser, with history navigation", async ({
  page,
}) => {
  await page.addInitScript(() => localStorage.setItem("rr-language", "pt"));
  await page.goto("./es/");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await page.getByRole("combobox").selectOption("en");
  await expect(page).toHaveURL(/\/en\/$/);
  await page.goBack();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});
test("avatar tracks the pointer, performs gestures and stops with reduced motion or offscreen", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./en/");
  await page.locator(".portrait").scrollIntoViewIfNeeded();
  const avatar = page.locator(".portrait-canvas");
  await expect(page.locator('.portrait[data-ready="true"]')).toBeVisible();
  await expect(avatar).toHaveAttribute("data-running", "true");
  await page.mouse.move(0, 400);
  await expect(avatar).toHaveAttribute("data-state", "hat", { timeout: 15000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(avatar).toHaveAttribute("data-state", "still");
  await expect(avatar).toHaveAttribute("data-running", "false");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await expect(avatar).toHaveAttribute("data-running", "false");
  expect(errors).toEqual([]);
});
test("WebGL failure preserves the static portrait and readable content", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      if (String(args[0]).startsWith("webgl")) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("./en/");
  await page.locator(".portrait").scrollIntoViewIfNeeded();
  await expect(
    page.locator('.portrait[data-ready="false"] .portrait-fallback'),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: /Engineering with/,
    }),
  ).toBeVisible();
});
