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
test("invitation becomes a snake that eats text and buttons, then restores the page", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("./en/");
  const invite = page.getByRole("button", {
    name: "Let it loose on this page",
  });
  await expect(invite).toBeVisible();
  await invite.scrollIntoViewIfNeeded();
  const original = await page.locator("main").textContent();
  const initialScroll = await page.evaluate(() => window.scrollY);
  await page.evaluate(() => {
    const r = document
      .querySelector(".snake-invitation svg")!
      .getBoundingClientRect();
    const y = Math.floor((r.top + r.height / 2 + scrollY) / 20) * 20;
    const x = Math.floor((r.left + r.width / 2) / 20) * 20;
    const fixture = document.createElement("div");
    fixture.id = "snake-content-fixture";
    fixture.style.cssText = `position:absolute;top:${y}px;left:${x + 80}px;z-index:2;pointer-events:none;display:flex;gap:20px;height:20px;font-size:14px;line-height:20px`;
    fixture.innerHTML =
      '<span>ABC</span><button style="height:20px;min-height:0;padding:0">Eat this button</button>';
    document.querySelector("main")!.append(fixture);
  });
  await invite.click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-snake-playing",
    "true",
  );
  await expect(page.locator(".snake-invitation svg")).toBeHidden();
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
  await expect(invite).toBeFocused();
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

test("snake consumes its invitation and technology chips", async ({ page }) => {
  await page.clock.install();
  await page.goto("./en/");
  await page.getByRole("button", { name: "Let it loose on this page" }).click();
  await page.clock.runFor(2800);
  expect(
    await page.evaluate(() =>
      [...CSS.highlights.get("snake-eaten")!].some((range) =>
        (range as Range).startContainer.parentElement?.closest(
          ".snake-invitation",
        ),
      ),
    ),
  ).toBe(true);
  await page.keyboard.press("Escape");
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
  for (const name of [
    "Supabase",
    "Railway",
    "Infisical",
    "SQLite",
    "Storybook",
  ]) {
    await expect(
      page.locator(".toolkit").getByText(name, { exact: true }),
    ).toBeVisible();
  }
});
