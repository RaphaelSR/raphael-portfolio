import { test, expect } from "@playwright/test";
import {
  bodyOutline,
  mealExpansion,
  swallow,
} from "../src/features/snake-digestion";

test("large meals remain in the body and each new bite pushes them toward the tail", () => {
  const small = mealExpansion([{ width: 8, height: 16 }]);
  const large = mealExpansion([{ width: 48, height: 76 }]);
  expect(small).toBe(0);
  expect(large).toBeGreaterThan(8);
  expect(mealExpansion([{ width: 2000, height: 1200 }])).toBe(13);
  const first = swallow([0, 0, 0, 0], large);
  const second = swallow(first, small);
  expect(first).toEqual([0, large, 0, 0, 0]);
  expect(second).toEqual([0, 0, large, 0, 0, 0]);
  const third = swallow(second, 5);
  expect(third[3]).toBe(large);
});

test("the skin rounds corners and splits at wrapped edges without invalid coordinates", () => {
  const curve = [
    { x: 80, y: 40 },
    { x: 60, y: 40 },
    { x: 40, y: 60 },
    { x: 40, y: 80 },
  ];
  const straight = bodyOutline(curve, [0, 0, 0, 0], [0, 0, 0, 0], 1, 20);
  const bulged = bodyOutline(curve, [0, 12, 0, 0], [0, 0, 0, 0], 1, 20);
  expect(bulged).not.toBe(straight);
  expect(bulged).not.toMatch(/NaN|Infinity/);
  expect(bodyOutline(curve, [0, 12, 0, 0], [0, 0, 0, 0], 0, 20)).toBe(straight);
  const wrapped = bodyOutline(
    [
      { x: 380, y: 30 },
      { x: 360, y: 30 },
      { x: 20, y: 30 },
      { x: 0, y: 30 },
    ],
    [0, 12, 0, 0],
    [0, 12, 0, 0],
    1,
    20,
  );
  expect(wrapped.match(/M/g)).toHaveLength(2);
});

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`actual large letters swell the moving skin, persist, shift on feeding and reset (${reducedMotion})`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 1000, height: 800 });
    await page.emulateMedia({ reducedMotion });
    await page.clock.install();
    await page.goto("./en/");
    await page.evaluate(() => {
      const main = document.querySelector("main")!;
      main.style.visibility = "hidden";
      const fixture = document.createElement("div");
      fixture.id = "meal-fixture";
      fixture.style.cssText =
        "position:absolute;top:360px;left:240px;visibility:visible;pointer-events:none";
      fixture.innerHTML =
        '<span style="position:absolute;left:0;top:0;font-size:64px;line-height:80px">W</span><span style="position:absolute;left:300px;top:20px;font-size:16px;line-height:20px">i</span>';
      main.append(fixture);
      window.dispatchEvent(
        new CustomEvent("portfolio:snake", { detail: { x: 210, y: 390 } }),
      );
    });
    const skin = page.locator("[data-snake-outline]");
    const meals = async () =>
      (await skin.getAttribute("data-meals"))!.split(",").map(Number);
    await page.clock.runFor(reducedMotion === "reduce" ? 400 : 1050);
    const first = await meals();
    expect(first[1]).toBeGreaterThan(8);
    expect((await skin.boundingBox())!.height).toBeGreaterThan(34);
    await page.clock.runFor(400);
    expect(await meals()).toEqual(first);
    await page.clock.runFor(1600);
    const fedAgain = await meals();
    expect(fedAgain[2]).toBe(first[1]);
    await page.keyboard.press("ArrowDown");
    await page.clock.runFor(450);
    await page.getByRole("button", { name: "Pause", exact: true }).click();
    const paused = await skin.getAttribute("d");
    await page.clock.runFor(500);
    expect(await skin.getAttribute("d")).toBe(paused);
    await page.screenshot({
      path: testInfo.outputPath(`swallowed-letter-${reducedMotion}.png`),
    });
    await page.getByRole("button", { name: "Restart", exact: true }).click();
    await page.clock.runFor(40);
    expect((await meals()).every((value) => value === 0)).toBe(true);
    await page.keyboard.press("Escape");
    await expect(skin).toHaveCount(0);
    await expect(page.locator("#meal-fixture span").first()).toBeVisible();
  });
}
