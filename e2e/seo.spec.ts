import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";
for (const locale of ["en", "pt", "es"]) {
  test(`SEO: ${locale} is complete without JavaScript`, async ({
    browser,
    request,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    const base = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3010/";
    const response = await page.goto(new URL(`${locale}/`, base).href);
    expect(response?.status()).toBe(200);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://portfolio.raphaelrocha.com/${locale}/`,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      `https://portfolio.raphaelrocha.com/${locale}/`,
    );
    expect(await page.title()).toContain("Raphael Rocha");
    expect(
      await page.locator('meta[name="description"]').getAttribute("content"),
    ).toContain("React Native");
    await expect(page.locator("link[hreflang]")).toHaveCount(4);
    for (const other of ["en", "pt", "es"])
      await expect(page.locator(`a[hreflang="${other}"]`)).toBeVisible();
    const schema = JSON.parse(
      (await page.locator("#structured-data").textContent()) || "{}",
    );
    expect(schema.mainEntity.name).toBe("Raphael Rocha");
    expect(schema.url).toBe(`https://portfolio.raphaelrocha.com/${locale}/`);
    await expect(page.locator("h1")).toContainText("Raphael Rocha");
    expect((await request.get("/social-card.png")).status()).toBe(200);
    expect(await (await request.get("/sitemap.xml")).text()).toContain(
      `/${locale}/`,
    );
    await context.close();
  });
}
test("SEO metadata follows language selection and browser history", async ({
  page,
}) => {
  await page.goto("en/");
  await page.locator("select.language-button").selectOption("es");
  await expect(page).toHaveTitle(/Portafolio/);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    "es_ES",
  );
  await page.goBack();
  await expect(page).toHaveTitle(/Portfolio/);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    "https://portfolio.raphaelrocha.com/en/",
  );
});

for (const locale of ["en", "pt", "es"]) {
  test(`visible labels match accessible names in ${locale}`, async ({ page }) => {
    await page.goto(`${locale}/`);
    const results = await new AxeBuilder({ page }).withRules(["label-content-name-mismatch"]).analyze();
    expect(results.violations).toEqual([]);
  });
}
