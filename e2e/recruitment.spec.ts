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
test("portrait belongs to the header and respects reduced motion", async ({
  page,
}) => {
  await page.goto("./en/");
  const portrait = page.locator("header .portrait");
  await expect(portrait).toBeVisible();
  await expect(page.locator("#about .portrait")).toHaveCount(0);
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect
    .poll(() =>
      portrait
        .locator("img")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await page.mouse.move(1000, 600);
  await expect(portrait).not.toHaveAttribute("style");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(portrait).not.toHaveAttribute("style");
  await expect(portrait).toHaveCSS("transform", "none");
});

test("portrait stays still during pointer and scroll input and blinks calmly", async ({
  page,
}) => {
  await page.goto("./en/");
  const portrait = page.locator("header .portrait");
  await expect(portrait.locator(".portrait-eyes")).toBeVisible();
  await expect(portrait.locator(".portrait-iris")).toHaveCount(0);
  await page.mouse.move(1200, 600);
  await page.evaluate(() => scrollTo({ top: 500, behavior: "instant" }));
  await expect(portrait).not.toHaveAttribute("style");
  await expect(portrait).toHaveCSS("transform", "none");
  const blinkDuration = await portrait.evaluate(
    (element) =>
      new Promise<number>((resolve, reject) => {
        let started = 0;
        const observer = new MutationObserver(() => {
          if (element.getAttribute("data-blink") === "true")
            started = performance.now();
          else if (started) {
            clearTimeout(timeout);
            observer.disconnect();
            resolve(performance.now() - started);
          }
        });
        const timeout = setTimeout(() => {
          observer.disconnect();
          reject(new Error("No blink observed"));
        }, 7000);
        observer.observe(element, {
          attributes: true,
          attributeFilter: ["data-blink"],
        });
      }),
  );
  expect(blinkDuration).toBeGreaterThan(100);
  expect(blinkDuration).toBeLessThan(500);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(portrait.locator(".portrait-eyes")).toHaveCount(0);
  await expect(portrait).not.toHaveAttribute("data-blink");
});
