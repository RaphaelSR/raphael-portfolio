import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { canTurn, step } from "../src/features/snake-engine";
test("snake rules handle growth, wrapping, tail movement and collisions", () => {
  expect(canTurn("right", "left")).toBe(false);
  expect(canTurn("right", "up")).toBe(true);
  expect(
    step(
      [
        { x: 4, y: 0 },
        { x: 3, y: 0 },
      ],
      "right",
      { x: 0, y: 0 },
      5,
      5,
    ),
  ).toEqual({
    body: [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 3, y: 0 },
    ],
    ate: true,
    collision: false,
  });
  expect(
    step(
      [
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 2, y: 1 },
      ],
      "right",
      { x: 4, y: 4 },
      5,
      5,
    ).collision,
  ).toBe(false);
  expect(
    step(
      [
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
      ],
      "right",
      { x: 4, y: 4 },
      5,
      5,
    ).collision,
  ).toBe(true);
});
test("command palette supports search, keyboard and focus restoration", async ({
  page,
}) => {
  await page.goto("./en/");
  const trigger = page.getByRole("button", { name: /^Commands/ });
  await trigger.focus();
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("searchbox")).toBeFocused();
  await page.getByRole("searchbox").fill("nonsense");
  await expect(page.getByText("No matching commands.")).toBeVisible();
  await page.getByRole("searchbox").fill("Español");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await page.getByRole("button", { name: /^Comandos/ }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: /^Comandos/ })).toBeFocused();
});
for (const [locale, title, blueprint] of [
  ["en", "Behind this site", "Toggle blueprint"],
  ["pt", "Por trás deste site", "Alternar blueprint"],
  ["es", "Detrás de este sitio", "Alternar blueprint"],
]) {
  test(`backstage and blueprint are accessible in ${locale}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`./${locale}/`);
    await page.getByRole("button", { name: title, exact: true }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.getByRole("button", { name: blueprint, exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-blueprint",
      "true",
    );
    await page.keyboard.press("Escape");
    await expect(page.locator("html")).not.toHaveAttribute("data-blueprint");
  });
}
test("snake eats text and buttons, then restores the page", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("./en/");
  const original = await page.locator("main").textContent();
  const initialScroll = await page.evaluate(() => window.scrollY);
  await page.evaluate(() => {
    const y = Math.floor((scrollY + innerHeight * 0.4) / 20) * 20;
    const x = Math.floor(innerWidth / 2 / 20) * 20;
    const fixture = document.createElement("div");
    fixture.id = "snake-content-fixture";
    fixture.style.cssText = `position:absolute;top:${y}px;left:${x + 80}px;z-index:2;pointer-events:none;display:flex;gap:20px;height:20px;font-size:14px;line-height:20px`;
    fixture.innerHTML =
      '<span>ABC</span><button style="height:20px;min-height:0;padding:0">Eat this button</button>';
    document.querySelector("main")!.append(fixture);
  });
  await page.keyboard.press("Control+k");
  await page.getByRole("searchbox").fill("Snake");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute(
    "data-snake-playing",
    "true",
  );
  await page.clock.runFor(3000);
  expect(await page.evaluate(() => CSS.highlights.has("snake-target"))).toBe(
    false,
  );
  expect(
    await page.evaluate(() => CSS.highlights.get("snake-eaten")!.size),
  ).toBeGreaterThan(0);
  await expect(page.locator("#snake-content-fixture button")).toBeHidden();
  await page.keyboard.press("ArrowDown");
  await page.clock.runFor(4000);
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(
    initialScroll,
  );
  await page.keyboard.press("Escape");
  await expect(page.locator("#snake-content-fixture button")).toBeVisible();
  expect(await page.evaluate(() => CSS.highlights.has("snake-eaten"))).toBe(
    false,
  );
  expect(await page.evaluate(() => window.scrollY)).toBe(initialScroll);
  await page.evaluate(() =>
    document.getElementById("snake-content-fixture")!.remove(),
  );
  expect(await page.locator("main").textContent()).toBe(original);
});
test("mobile snake has touch controls and restores highlights when closed", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./pt/");
  await page.keyboard.press("Control+k");
  await page.getByRole("searchbox").fill("Snake");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Cima", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Pausar", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Continuar", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Fechar · Esc" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(await page.evaluate(() => CSS.highlights.has("snake-target"))).toBe(
    false,
  );
});

test("loose content falls, rebounds and settles against other pieces", async () => {
  const { advancePieces } = await import("../src/features/snake-physics");
  const pieces = [
    {
      x: 40,
      y: 20,
      width: 30,
      height: 20,
      vx: 0,
      vy: 0,
      text: "A",
      font: "14px sans-serif",
      color: "#000",
    },
    {
      x: 40,
      y: 180,
      width: 30,
      height: 20,
      vx: 0,
      vy: 0,
      text: "B",
      font: "14px sans-serif",
      color: "#000",
    },
  ];
  advancePieces(pieces, 1 / 60, 300, () => 200);
  expect(pieces[0].y).toBeGreaterThan(20);
  for (let i = 0; i < 240; i++) advancePieces(pieces, 1 / 60, 300, () => 200);
  expect(pieces[0].y + pieces[0].height).toBeLessThanOrEqual(
    pieces[1].y + 0.01,
  );
  expect(pieces[1].y + pieces[1].height).toBeLessThanOrEqual(200);
});

test("snake consumes technology chips", async ({ page }) => {
  await page.clock.install();
  await page.goto("./en/");
  const tag = page.locator(".experience-row .tags span").first();
  await tag.scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    const r = document
      .querySelector(".experience-row .tags span")!
      .getBoundingClientRect();
    window.scrollTo({
      top: scrollY + r.top + r.height / 2 - innerHeight * 0.4,
      behavior: "instant",
    });
  });
  await page.keyboard.press("Control+k");
  await page.getByRole("searchbox").fill("Snake");
  await page.keyboard.press("Enter");
  const rect = await tag.boundingBox();
  await page.mouse.click(rect!.x + rect!.width / 2, rect!.y + rect!.height / 2);
  await page.clock.runFor(2400);
  await expect(tag).toBeHidden();
  await page.keyboard.press("Escape");
  await expect(tag).toBeVisible();
});

test("tool inventory is grouped and résumé download appears only at the end", async ({
  page,
}) => {
  await page.goto("./pt/");
  await expect(page.locator("a[download]")).toHaveCount(1);
  await expect(page.locator("#contact a[download]")).toHaveCount(1);
  await page.locator(".toolkit-disclosure summary").click();
  const tools = page.locator(".toolkit a");
  expect(await tools.count()).toBeGreaterThan(60);
  for (const link of await tools.all()) {
    await expect(link).toHaveAttribute("href", /^https:\/\//);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  const supabase = page
    .locator(".toolkit")
    .getByRole("link", { name: "Supabase", exact: true });
  await supabase.focus();
  await expect(supabase).toBeFocused();
  await expect(supabase).toHaveAttribute("href", "https://supabase.com/");
  for (const name of [
    "Supabase",
    "Railway",
    "Infisical",
    "SQLite",
    "Storybook",
  ]) {
    await expect(
      page.locator(".toolkit").getByRole("link", { name, exact: true }),
    ).toBeVisible();
  }
});

test("phone opens the game, breaks, and only then hands over controls", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("./en/");
  await page.getByRole("button", { name: "Online games 3" }).click();
  const play = page.getByRole("button", { name: "Play Snake", exact: true });
  await play.click();
  await expect(page.locator(".phone-stage")).toHaveAttribute(
    "data-phase",
    "launching",
  );
  await expect(page.locator(".snake-hud")).toHaveCount(0);
  await page.keyboard.press("ArrowLeft");
  await page.clock.runFor(1600);
  await expect(page.locator(".phone-stage")).toHaveAttribute(
    "data-phase",
    "impact",
  );
  await page.clock.runFor(700);
  await expect(page.locator(".phone-stage")).toHaveAttribute(
    "data-phase",
    "escaped",
  );
  await expect(page.locator(".snake-hud")).toBeHidden();
  await page.keyboard.press("ArrowUp");
  await page.clock.runFor(1000);
  await expect(
    page.getByRole("button", { name: "Pause", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".tools-dialog [data-snake-head]")).toHaveAttribute(
    "transform",
    /rotate\(90\)/,
  );
  await page.keyboard.press("Escape");
  await expect(page.locator(".phone-stage")).toHaveAttribute(
    "data-phase",
    "home",
  );
  await expect(play).toBeEnabled();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});

test("phone entrance cancels cleanly and supports reduced motion on mobile", async ({
  page,
}) => {
  await page.clock.install();
  await page.setViewportSize({ width: 320, height: 740 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./pt/");
  await page.getByRole("button", { name: "Jogos online 3" }).click();
  await page.getByRole("button", { name: "Jogar Snake", exact: true }).click();
  await page.keyboard.press("Escape");
  await page.clock.runFor(4000);
  await expect(page.locator(".phone-stage")).toHaveAttribute(
    "data-phase",
    "home",
  );
  await expect(page.locator(".snake-hud")).toHaveCount(0);
  await page.getByRole("button", { name: "Jogar Snake", exact: true }).click();
  await page.clock.runFor(500);
  await expect(
    page.getByRole("button", { name: "Pausar", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.keyboard.press("Escape");
});

for (const selector of [
  ".language-button",
  ".menu-toggle",
  ".portrait-trigger",
]) {
  test(`snake consumes and restores the real header control ${selector}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.clock.install();
    await page.goto("./en/");
    const control = page.locator(selector);
    await expect(control).toBeVisible();
    await control.evaluate((element) => {
      const r = element.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent("portfolio:snake", {
          detail: { x: Math.max(10, r.left - 50), y: r.top + r.height / 2 },
        }),
      );
    });
    await expect(page.locator(".snake-hud")).toBeVisible();
    await page.clock.runFor(1500);
    await expect(control).toHaveCSS("visibility", "hidden");
    await page.keyboard.press("Escape");
    await expect(control).toBeVisible();
    if (selector === ".language-button") {
      await control.selectOption("es");
      await expect(page.locator("html")).toHaveAttribute("lang", "es");
    }
    if (selector === ".menu-toggle") {
      await control.click();
      await expect(control).toHaveAttribute("aria-expanded", "true");
    }
  });
}
test("snake can eat the sticky language control after travelling up a scrolled page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.clock.install();
  await page.goto("./en/");
  await page.evaluate(() => {
    window.scrollTo({ top: 1000, behavior: "instant" });
    const r = document
      .querySelector(".language-button")!
      .getBoundingClientRect();
    window.dispatchEvent(
      new CustomEvent("portfolio:snake", {
        detail: { x: r.left + r.width / 2 - 40, y: scrollY + 170 },
      }),
    );
  });
  await expect(page.locator(".snake-hud")).toBeVisible();
  await page.clock.runFor(1000);
  await page.keyboard.press("ArrowUp");
  await page.clock.runFor(9000);
  await expect(page.locator(".language-button")).toHaveCSS(
    "visibility",
    "hidden",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator(".language-button")).toBeVisible();
});
