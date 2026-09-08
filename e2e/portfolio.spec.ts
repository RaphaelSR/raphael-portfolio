import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [320, 390, 768, 1440])
  test(`responsive and accessible at ${width}px`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".portrait")).toHaveCount(1);
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
  await page
    .getByRole("combobox", { name: "Selecionar idioma" })
    .selectOption("en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Senior Mobile Engineer",
  );
  await page.locator("summary").filter({ hasText: "Medely" }).click();
  await expect(
    page.getByText("Modernizing the mobile codebase", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Experiments 1" }).click();
  await expect(page.locator(".project-card:visible")).toHaveCount(1);
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
  await expect(
    page.getByRole("navigation", { name: "Navegação principal" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("navigation", { name: "Navegação principal" }),
  ).not.toBeVisible();
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Navegação principal" })
    .getByRole("link", { name: "Trabalhos" })
    .click();
  await expect(
    page.getByRole("navigation", { name: "Navegação principal" }),
  ).not.toBeVisible();
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
  expect(download.suggestedFilename()).toBe("raphael-rocha-resume.pdf");
  const response = await page.request.get("./raphael-rocha-resume.pdf");
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await page.getByRole("button", { name: "Copiar e-mail" }).click();
  await expect(page.getByRole("status")).toHaveText("E-mail copiado");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "raphaelrochabcc@gmail.com",
  );
});
test("reduced motion and manual motion preference", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  await expect(
    page.getByRole("button", { name: "Movimento reduzido pelo sistema" }),
  ).toBeDisabled();
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "Pausar animações" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
});
for (const [locale, expected] of [
  ["en-US", "en"],
  ["pt-BR", "pt-BR"],
  ["es-AR", "es"],
  ["es-ES", "es"],
  ["fr-FR", "en"],
])
  test(`initial language follows ${locale}`, async ({ browser }) => {
    const context = await browser.newContext({ locale });
    const page = await context.newPage();
    await page.goto(
      process.env.PLAYWRIGHT_BASE_URL ||
        "http://127.0.0.1:3010/raphael-portfolio/",
    );
    await expect(page.locator("html")).toHaveAttribute("lang", expected);
    await page
      .getByRole("combobox")
      .selectOption(expected === "en" ? "pt" : "en");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      expected === "en" ? "pt-BR" : "en",
    );
    await context.close();
  });

for (const width of [320, 768, 1440]) {
  test(`Spanish content and accessibility at ${width}px`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./");
    const language = page.getByRole("combobox");
    await expect(language.locator("option")).toHaveText([
      "Português",
      "English",
      "Español",
    ]);
    await language.selectOption("es");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(
      page.getByRole("heading", { name: "Experiencia profesional." }),
    ).toBeVisible();
    await expect(
      page.getByText("Portugués nativo · Inglés fluido · Español fluido"),
    ).toBeVisible();
    await page
      .locator("summary")
      .filter({ hasText: "Ver experiencia anterior" })
      .click();
    await page.locator("summary").filter({ hasText: "LAB3D" }).click();
    await expect(page.getByText("Impresión 3D", { exact: true })).toBeVisible();
    await page.locator("summary").filter({ hasText: "Medely" }).click();
    await expect(page.getByText("Arquitectura", { exact: true })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.screenshot({
      path: info.outputPath(`spanish-${width}.png`),
      fullPage: true,
    });
    await page
      .getByRole("button", { name: "Sobre mi participación: ModPro AI" })
      .click();
    await expect(page.getByRole("dialog")).toContainText(
      "Desarrollo móvil con React Native y Expo",
    );
    await expect(page.getByRole("dialog")).toContainText("Supabase");
    await page.getByRole("button", { name: "Cerrar detalles" }).click();
    for (const [locale, lang] of [
      ["en", "en"],
      ["pt", "pt-BR"],
      ["es", "es"],
    ]) {
      await language.selectOption(locale);
      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
    }
  });
}
test("unsupported saved locale uses the next supported browser preference", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("rr-language", "invalid");
    Object.defineProperty(navigator, "languages", {
      value: ["fr-FR", "es-AR", "en-US"],
    });
  });
  await page.goto("./");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});
test("language selection remains usable without persistent storage", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage unavailable");
      },
    });
  });
  await page.goto("./");
  await page.getByRole("combobox").selectOption("es");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

test("professional work leads, with games discoverable in their category", async ({
  page,
}) => {
  await page.goto("./en/");
  await expect(
    page.getByRole("button", { name: "Products 2" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".project-card:visible")).toHaveCount(2);
  await expect(page.locator(".phone-device")).toHaveCount(0);
  await expect(page.locator("a[download]")).toHaveCount(1);
  await page.getByRole("button", { name: "Online games 3" }).click();
  await expect(page.locator(".project-card:visible")).toHaveCount(3);
  await expect(page.locator(".phone-device")).toBeVisible();
  for (const path of ["trivia", "snake-game", "mimica"]) {
    await expect(
      page.locator(
        `.project-card a[href="https://raphaelsr.github.io/${path}/"]`,
      ),
    ).toBeVisible();
  }
  await page.getByRole("button", { name: "All 6" }).click();
  await expect(page.locator(".project-card:visible")).toHaveCount(6);
});

for (const width of [320, 768])
  test(`contact is reachable from the keyboard menu at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./en/");
    const menu = page.getByRole("button", { name: "Open menu", exact: true });
    await menu.click();
    const navigation = page.getByRole("navigation", {
      name: "Main navigation",
    });
    await expect(navigation.getByRole("link", { name: /Home/ })).toBeFocused();
    await navigation.getByRole("link", { name: /Let’s talk/ }).click();
    await expect(navigation).toBeHidden();
    await expect(page).toHaveURL(/#contact$/);
    await expect(
      page.getByRole("link", { name: "Résumé", exact: true }),
    ).toBeInViewport();
    await menu.click();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
  });
