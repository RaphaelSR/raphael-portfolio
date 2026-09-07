import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [320, 390, 768, 1440])
  test(`responsive and accessible at ${width}px`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("canvas")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    await page.screenshot({
      path: info.outputPath(`portfolio-${width}.png`),
      fullPage: true,
    });
    if (width === 1440)
      await page.screenshot({ path: info.outputPath("hero-desktop.png") });
    expect(errors).toEqual([]);
  });
test("language, keyboard navigation, details and modal focus", async ({
  page,
}) => {
  await page.goto("./");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Mobile & beyond.",
  );
  await page.locator("summary").filter({ hasText: "Medely" }).click();
  await expect(
    page.getByText("Modernizing the mobile codebase", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Experiments 2" }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await expect(
    page.getByRole("heading", { name: "ModPro AI", exact: true }),
  ).toHaveCount(0);
  const trigger = page.getByRole("button", {
    name: "About my contribution: Geometry",
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Close details" }),
  ).toBeFocused();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
test("mobile menu closes with Escape and navigation remains usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./");
  const menu = page.getByRole("button", { name: "Abrir menu" });
  await menu.click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation")).not.toBeVisible();
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Trabalhos" })
    .click();
  await expect(page.getByRole("navigation")).not.toBeVisible();
  await expect(page).toHaveURL(/#work$/);
});
test("resume is a real PDF and email copy works", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("./");
  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("link", { name: "Currículo", exact: true })
    .first()
    .click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("raphael-rocha-resume-2026.pdf");
  const response = await page.request.get("./raphael-rocha-resume-2026.pdf");
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await page.getByRole("button", { name: "Copiar e-mail" }).click();
  await expect(page.getByRole("status")).toHaveText("E-mail copiado");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "raphaelrochabcc@gmail.com",
  );
});
test("reduced motion, color controls and WebGL fallback", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  await expect(
    page
      .getByRole("button", { name: "Movimento reduzido pelo sistema" })
      .first(),
  ).toBeDisabled();
  const before = await page.locator("canvas").screenshot();
  await page.getByRole("button", { name: "Trocar cor" }).click();
  const after = await page.locator("canvas").screenshot();
  expect(before.equals(after)).toBe(false);
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (type.includes("webgl")) return null;
      return Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  await page.reload();
  await expect(
    page.getByText("O experimento 3D está indisponível", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Conheça meu trabalho" }),
  ).toBeVisible();
});

test("pausing the visible experiment stops continuous GPU rendering", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = WebGL2RenderingContext.prototype.drawElements;
    Object.assign(window, { gpuDraws: 0 });
    WebGL2RenderingContext.prototype.drawElements = function (
      ...args: Parameters<typeof original>
    ) {
      (window as unknown as { gpuDraws: number }).gpuDraws++;
      return original.apply(this, args);
    };
  });
  await page.goto("./");
  await expect(page.locator("canvas")).toBeVisible();
  const draws = () =>
    page.evaluate(() => (window as unknown as { gpuDraws: number }).gpuDraws);
  await expect.poll(draws).toBeGreaterThan(0);
  await page
    .locator(".playground-caption")
    .getByRole("button", { name: "Pausar animações" })
    .click();
  await page.waitForTimeout(100);
  const paused = await draws();
  await page.waitForTimeout(300);
  expect(await draws()).toBe(paused);
  await page
    .locator(".playground-caption")
    .getByRole("button", { name: "Ativar animações" })
    .click();
  await expect.poll(draws).toBeGreaterThan(paused);
});
