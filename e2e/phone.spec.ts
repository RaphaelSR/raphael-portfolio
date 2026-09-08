import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [320, 768])
  test(`phone demo apps work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./en/");
    const phone = page.locator(".phone-device");
    await phone.scrollIntoViewIfNeeded();
    const home = () =>
      page
        .locator(".phone-app-toolbar")
        .getByRole("button", { name: "Home", exact: true })
        .click();
    await phone.getByRole("button", { name: "Notes", exact: true }).click();
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
      .getByRole("button", { name: "Studio", exact: true })
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
