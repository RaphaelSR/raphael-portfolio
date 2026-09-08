import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("portrait expands, deforms actual pixels, springs back and restores focus", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const requested: string[] = [];
  page.on("request", (request) => requested.push(request.url()));
  await page.goto("./en/");
  expect(requested.some((url) => url.includes("avatar-full"))).toBe(false);
  const opener = page.locator(".portrait-trigger");
  await opener.click();
  const dialog = page.getByRole("dialog"),
    stage = page.locator(".elastic-portrait"),
    canvas = stage.locator("canvas");
  await expect(stage).toHaveAttribute("data-ready", "true");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button")).toHaveCount(1);
  await expect(dialog).toHaveText("×");
  await page.screenshot({ path: "test-results/portrait-minimal-desktop.png" });
  await expect
    .poll(() => stage.evaluate((el) => el.getAnimations().length))
    .toBe(0);
  const before = await canvas.screenshot();
  const rect = (await stage.boundingBox())!;
  await page.mouse.move(
    rect.x + rect.width * 0.32,
    rect.y + rect.height * 0.58,
  );
  await page.mouse.down();
  await page.mouse.move(
    rect.x + rect.width * 0.15,
    rect.y + rect.height * 0.62,
    { steps: 15 },
  );
  await expect(canvas).toHaveAttribute("data-deformed", "true");
  expect((await canvas.screenshot()).equals(before)).toBe(false);
  await expect(stage).toHaveCSS("cursor", /hand-grab|svg\+xml/);
  await page.mouse.up();
  await expect(canvas).toHaveAttribute("data-deformed", "false");
  await expect
    .poll(async () => (await canvas.screenshot()).equals(before))
    .toBe(true);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  await expect(page.locator("canvas")).toHaveCount(0);
  await opener.click();
  await expect(stage).toHaveAttribute("data-ready", "true");
  await page
    .getByRole("button", { name: "Close portrait", exact: true })
    .click();
  expect(errors).toEqual([]);
});
test("portrait supports touch cancellation, keyboard and reduced motion at 320px", async ({
  page,
  context,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("./pt/");
  await page.locator(".portrait-trigger").click();
  const stage = page.locator(".elastic-portrait"),
    canvas = stage.locator("canvas");
  await expect(stage).toHaveAttribute("data-ready", "true");
  await expect
    .poll(() => stage.evaluate((el) => el.getAnimations().length))
    .toBe(0);
  const r = (await stage.boundingBox())!;
  const cdp = await context.newCDPSession(page);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: r.x + r.width * 0.5, y: r.y + r.height * 0.54 }],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: r.x + r.width * 0.62, y: r.y + r.height * 0.55 }],
  });
  await expect(canvas).toHaveAttribute("data-deformed", "true");
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchCancel",
    touchPoints: [],
  });
  await expect(canvas).toHaveAttribute("data-deformed", "false");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await stage.focus();
  await page.screenshot({ path: "test-results/portrait-minimal-mobile.png" });
  await page.keyboard.down("ArrowRight");
  await expect(canvas).toHaveAttribute("data-deformed", "true");
  await page.keyboard.up("ArrowRight");
  await expect(canvas).toHaveAttribute("data-deformed", "false");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.keyboard.press("Escape");
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});
test("portrait retains a usable image when WebGL is unavailable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: function (
        this: HTMLCanvasElement,
        type: string,
        options?: unknown,
      ) {
        return type === "webgl"
          ? null
          : Reflect.apply(original, this, [type, options]);
      },
    });
  });
  await page.goto("./es/");
  await page.locator(".portrait-trigger").click();
  await expect(page.getByRole("dialog").getByRole("status")).toHaveText(
    "Retrato ampliado. La interacción gráfica no está disponible en este navegador.",
  );
  await expect(page.locator(".elastic-portrait img")).toBeVisible();
  await page
    .getByRole("button", { name: "Cerrar retrato", exact: true })
    .click();
  await expect(page.locator(".portrait-trigger")).toBeFocused();
});
