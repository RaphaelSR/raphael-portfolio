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
test("letter snake eats actual text and restores the document on exit", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-09-07T12:00:00Z") });
  await page.clock.pauseAt(new Date("2026-09-07T12:00:01Z"));
  await page.goto("./en/");
  const original = await page.locator("main").textContent();
  await page.keyboard.press("Control+k");
  await page.getByRole("searchbox").fill("Snake");
  await page.keyboard.press("Enter");
  await expect(page.locator(".snake-canvas")).toBeVisible();
  const path = await page.evaluate(() => {
    const canvas = document.querySelector<HTMLCanvasElement>(".snake-canvas")!;
    const ctx = canvas.getContext("2d")!;
    const scale = Math.min(devicePixelRatio, 2),
      columns = Math.floor(innerWidth / 20),
      rows = Math.floor(innerHeight / 20);
    const blocked = new Set<string>();
    let start = { x: 0, y: 0 };
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < columns; x++) {
        const p = ctx.getImageData(
          (x * 20 + 10) * scale,
          (y * 20 + 10) * scale,
          1,
          1,
        ).data;
        if (p[0] === 28 && p[1] === 96) start = { x, y };
        else if (p[0] === 60 && p[1] === 128) blocked.add(`${x},${y}`);
      }
    const target = [...CSS.highlights.get("snake-target")!][0] as Range;
    const r = target.getBoundingClientRect();
    const goal = {
      x: Math.floor((r.left + r.width / 2) / 20),
      y: Math.floor((r.top + r.height / 2) / 20),
    };
    const queue = [{ ...start, path: [] as string[] }],
      visited = new Set<string>();
    while (queue.length) {
      const cell = queue.shift()!;
      if (cell.x === goal.x && cell.y === goal.y) return cell.path;
      for (const [dx, dy, key] of [
        [1, 0, "ArrowRight"],
        [0, 1, "ArrowDown"],
        [0, -1, "ArrowUp"],
        [-1, 0, "ArrowLeft"],
      ] as const) {
        const x = (cell.x + dx + columns) % columns,
          y = (cell.y + dy + rows) % rows,
          k = `${x},${y}`;
        if (!blocked.has(k) && !visited.has(k)) {
          visited.add(k);
          queue.push({ x, y, path: [...cell.path, key] });
        }
      }
    }
    return [];
  });
  expect(path.length).toBeGreaterThan(0);
  for (const key of path) {
    await page.keyboard.press(key);
    await page.clock.runFor(150);
  }
  await expect(page.getByRole("dialog").getByRole("status")).toHaveText(
    "Letters: 1",
  );
  expect(
    await page.evaluate(() => CSS.highlights.get("snake-eaten")?.size),
  ).toBe(1);
  await page.keyboard.press("Escape");
  expect(await page.evaluate(() => CSS.highlights.has("snake-eaten"))).toBe(
    false,
  );
  expect(await page.locator("main").textContent()).toBe(original);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
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
