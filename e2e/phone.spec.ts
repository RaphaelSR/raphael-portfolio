import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [320, 768])
  test(`phone demo apps work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./en/");
    await page
      .locator(".filters button")
      .filter({ hasText: /Online games|Jogos online|Juegos online/ })
      .click();
    const phone = page.locator(".phone-device");
    await phone.scrollIntoViewIfNeeded();
    const home = () =>
      page
        .locator(".phone-app-toolbar")
        .getByRole("button", { name: "Home", exact: true })
        .click();
    await phone.getByRole("button", { name: "Notes", exact: true }).click();
    await phone.getByRole("button", { name: /Scratchpad/ }).click();
    await phone
      .getByRole("textbox", { name: "Notes", exact: true })
      .fill("A small idea");
    await home();
    await phone.getByRole("button", { name: "Notes", exact: true }).click();
    await expect(
      phone.getByRole("textbox", { name: "Notes", exact: true }),
    ).toHaveValue("A small idea");
    await home();
    await phone.getByRole("button", { name: "Photos", exact: true }).click();
    await phone.getByRole("button", { name: "Photos 2", exact: true }).click();
    await expect(phone.locator(".mock-photo-large")).toBeVisible();
    await home();
    await phone.getByRole("button", { name: "Reminders", exact: true }).click();
    await phone
      .getByRole("textbox", { name: "New reminder" })
      .fill("Review demo");
    await phone.getByRole("button", { name: "Add", exact: true }).click();
    await phone.getByRole("checkbox", { name: "Review demo" }).check();
    await expect(
      phone.getByRole("checkbox", { name: "Review demo" }),
    ).toBeChecked();
    await home();
    await phone.getByRole("button", { name: "Calendar", exact: true }).click();
    await phone.getByRole("button", { name: "12", exact: true }).click();
    await expect(
      phone.getByRole("button", { name: "12", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await home();
    await phone
      .getByRole("button", { name: "Maps", exact: true })
      .first()
      .click();
    await phone
      .locator(".mock-place-list")
      .getByRole("button", { name: "Gym", exact: true })
      .click();
    await expect(
      phone.locator(".mock-map-pin").filter({ hasText: "●" }).nth(2),
    ).toHaveAttribute("aria-pressed", "true");
    await home();
    await phone.getByRole("button", { name: "Health", exact: true }).click();
    await phone.getByRole("button", { name: "Simulate a walk +500" }).click();
    await expect(phone.getByText("4,700", { exact: true })).toBeVisible();
    await home();
    await phone.getByRole("button", { name: "Wallet", exact: true }).click();
    await phone
      .getByRole("button", { name: "Coffee card", exact: true })
      .click();
    await expect(phone.locator(".mock-wallet")).toHaveClass(/card-1/);
    await home();
    await phone.getByRole("button", { name: "Settings", exact: true }).click();
    await phone.getByRole("switch", { name: "Dark appearance" }).check();
    await expect(phone).toHaveAttribute("data-dark", "true");
    await phone.getByRole("switch", { name: "Dark appearance" }).uncheck();
    await home();
    await phone.getByRole("button", { name: "Messages", exact: true }).click();
    await phone.getByRole("textbox", { name: "Write a message" }).fill("Hello");
    await phone.getByRole("button", { name: "Send", exact: true }).click();
    await expect(
      phone.getByText("Message received in this demo."),
    ).toBeVisible();
    await home();
    await page.route("https://raphaelsr.github.io/trivia/", (route) =>
      route.fulfill({ contentType: "text/html", body: "<h1>Trivia demo</h1>" }),
    );
    await phone.getByRole("button", { name: "Browser", exact: true }).click();
    await phone
      .getByRole("textbox", { name: "Website address" })
      .fill("javascript:alert(1)");
    await phone.getByRole("button", { name: "Go", exact: true }).click();
    await expect(phone.getByRole("alert")).toHaveText(
      "Enter a valid HTTPS address.",
    );
    await phone
      .getByRole("textbox", { name: "Website address" })
      .fill("https://raphaelsr.github.io/trivia/");
    await phone.getByRole("button", { name: "Go", exact: true }).click();
    await expect(
      page.frameLocator(".phone-app-content iframe").getByRole("heading"),
    ).toHaveText("Trivia demo");
    await home();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  });
test("escaped snake can eat the broken phone and exit restores its mask", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("./en/");
  await page
    .locator(".filters button")
    .filter({ hasText: /Online games|Jogos online|Juegos online/ })
    .click();
  await page.getByRole("button", { name: "Play Snake", exact: true }).click();
  await page.clock.runFor(2300);
  await expect(page.locator(".phone-stage")).toHaveAttribute(
    "data-phase",
    "escaped",
  );
  await page.clock.runFor(1100);
  await expect(page.locator(".snake-hud")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await page.clock.runFor(450);
  await page.keyboard.press("ArrowUp");
  await page.clock.runFor(2600);
  expect(await page.locator("[data-eaten-phone]").count()).toBeGreaterThan(0);
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-eaten-phone]")).toHaveCount(0);
  await expect(page.locator(".phone-stage")).toHaveAttribute(
    "data-phase",
    "home",
  );
  await expect(
    page.getByRole("button", { name: "Play Snake", exact: true }),
  ).toBeFocused();
});

test.describe("device clock and phone preferences", () => {
  test.use({ timezoneId: "America/Sao_Paulo" });
  test("clock and calendar follow local midnight, month changes and leap years", async ({
    page,
  }) => {
    await page.clock.install({ time: new Date("2028-02-01T02:59:59Z") });
    await page.goto("./en/");
    await page
      .locator(".filters button")
      .filter({ hasText: /Online games|Jogos online|Juegos online/ })
      .click();
    await expect(page.locator(".phone-status time")).toHaveText("23:59");
    await expect(page.locator(".phone-calendar-widget strong")).toHaveText(
      "31",
    );
    await page.clock.runFor(2000);
    await expect(page.locator(".phone-status time")).toHaveText("00:00");
    await expect(page.locator(".phone-calendar-widget strong")).toHaveText("1");
    await expect(page.locator(".phone-calendar-widget b")).toHaveText(
      "Tuesday",
    );
    await page
      .locator(".phone-device")
      .getByRole("button", { name: "Calendar", exact: true })
      .click();
    await expect(page.locator(".mock-calendar-month")).toHaveText(
      "February 2028",
    );
    await expect(page.locator(".mock-calendar button")).toHaveCount(29);
    await page.clock.setSystemTime(new Date("2028-03-01T03:00:00Z"));
    await page.clock.runFor(1100);
    await expect(page.locator(".mock-calendar-month")).toHaveText("March 2028");
    await expect(page.locator(".mock-calendar button")).toHaveCount(31);
  });
  test("settings affect the display, connection and animation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.clock.install({ time: new Date("2028-02-01T16:20:00Z") });
    await page.goto("./en/");
    await page
      .locator(".filters button")
      .filter({ hasText: /Online games|Jogos online|Juegos online/ })
      .click();
    const phone = page.locator(".phone-device");
    const settings = () =>
      phone.getByRole("button", { name: "Settings", exact: true }).click();
    const home = () =>
      phone.getByRole("button", { name: "Home", exact: true }).click();
    await settings();
    await phone.getByRole("switch", { name: "24-hour time" }).uncheck();
    await expect(phone.locator(".phone-status time")).toHaveText("01:20 PM");
    await phone.getByRole("button", { name: "Forest", exact: true }).click();
    await expect(phone).toHaveAttribute("data-wallpaper", "forest");
    await phone.getByRole("slider", { name: /Brightness/ }).focus();
    await page.keyboard.press("Home");
    await expect(phone.locator(".phone-screen")).toHaveCSS(
      "filter",
      "brightness(0.45)",
    );
    await page.keyboard.press("End");
    await phone.getByRole("switch", { name: "Wi-Fi", exact: true }).uncheck();
    await home();
    await phone.getByRole("button", { name: "Browser", exact: true }).click();
    await expect(phone.getByRole("status")).toContainText("No connection");
    await home();
    await settings();
    await phone.getByRole("switch", { name: "Wi-Fi", exact: true }).check();
    await phone
      .getByRole("switch", { name: "Reduce motion", exact: true })
      .check();
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await home();
    await phone
      .getByRole("button", { name: "Play Snake", exact: true })
      .click();
    await page.clock.runFor(500);
    await expect(
      page.getByRole("button", { name: "Pause", exact: true }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
  });
});

test("Escape outside a phone app does not steal focus back from the main menu", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./en/");
  await page
    .locator(".filters button")
    .filter({ hasText: /Online games|Jogos online|Juegos online/ })
    .click();
  const phone = page.locator(".phone-device");
  await phone.getByRole("button", { name: "Notes", exact: true }).click();
  await phone.getByRole("button", { name: "Home", exact: true }).click();
  await page.locator(".menu-toggle").click();
  await page.keyboard.press("Escape");
  await expect(page.locator(".menu-toggle")).toBeFocused();
});
