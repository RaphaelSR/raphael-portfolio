import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const labels = {
  en: {
    home: "Home",
    apps: [
      "Photos",
      "Notes",
      "Reminders",
      "Health",
      "Maps",
      "Calendar",
      "Wallet",
      "Settings",
      "Browser",
      "Messages",
    ],
  },
  pt: {
    home: "Início",
    apps: [
      "Fotos",
      "Notas",
      "Lembretes",
      "Saúde",
      "Mapas",
      "Calendário",
      "Carteira",
      "Ajustes",
      "Navegador",
      "Mensagens",
    ],
  },
  es: {
    home: "Inicio",
    apps: [
      "Fotos",
      "Notas",
      "Recordatorios",
      "Salud",
      "Mapas",
      "Calendario",
      "Cartera",
      "Ajustes",
      "Navegador",
      "Mensajes",
    ],
  },
};
for (const locale of ["en", "pt", "es"] as const) {
  test(`all phone apps are contained, accessible and local in ${locale}`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width: 320, height: 900 });
    const origin = new URL(testInfo.project.use.baseURL as string).origin;
    const external: string[] = [];
    page.on("request", (request) => {
      if (
        !request.url().startsWith(`${origin}/`) &&
        !request.url().startsWith("data:")
      )
        external.push(request.url());
    });
    await page.goto(`./${locale}/`);
    await page
      .locator(".filters button")
      .filter({ hasText: /Online games|Jogos online|Juegos online/ })
      .click();
    const phone = page.locator(".phone-device");
    for (const app of labels[locale].apps) {
      await phone
        .getByRole("button", { name: app, exact: true })
        .first()
        .click();
      await expect(phone.locator(".phone-app-window")).toBeVisible();
      expect(
        await phone
          .locator(".phone-app-content")
          .evaluate((e) => e.scrollWidth <= e.clientWidth + 1),
        app,
      ).toBe(true);
      expect(
        (
          await new AxeBuilder({ page })
            .include(".phone-device")
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        app,
      ).toEqual([]);
      await phone.screenshot({
        path: testInfo.outputPath(`${locale}-${app}.png`),
      });
      await phone
        .getByRole("button", { name: labels[locale].home, exact: true })
        .click();
    }
    expect(external).toEqual(["https://raphaelrocha.com/analytics.js"]);
  });
}

test("personal apps retain edits and support their secondary controls", async ({
  page,
}) => {
  await page.goto("./en/");
  await page
    .locator(".filters button")
    .filter({ hasText: /Online games|Jogos online|Juegos online/ })
    .click();
  const phone = page.locator(".phone-device");
  const open = (app: string) =>
    phone.getByRole("button", { name: app, exact: true }).first().click();
  const home = () => open("Home");
  await open("Notes");
  await phone.getByRole("searchbox", { name: "Search notes" }).fill("jiu");
  await phone.getByRole("button", { name: /Jiu-jitsu Brown belt/ }).click();
  await expect(
    phone.getByRole("textbox", { name: "Notes", exact: true }),
  ).toContainText("Brown belt.");
  await phone
    .getByRole("textbox", { name: "Notes", exact: true })
    .fill('<img src=x onerror="alert(1)">');
  await home();
  await open("Notes");
  await expect(
    phone.getByRole("textbox", { name: "Notes", exact: true }),
  ).toHaveValue('<img src=x onerror="alert(1)">');
  await expect(phone.locator('img[src="x"]')).toHaveCount(0);
  await phone
    .locator(".ios-actions")
    .getByRole("button", { name: "Notes", exact: false })
    .click();
  await phone.getByRole("searchbox", { name: "Search notes" }).fill("");
  await phone.getByRole("button", { name: /New note/ }).click();
  await phone
    .getByRole("textbox", { name: "Note title" })
    .fill("Training ideas");
  await phone
    .getByRole("textbox", { name: "Notes", exact: true })
    .fill("A new idea");
  await home();
  await open("Photos");
  await open("Photos 2");
  await phone.getByRole("button", { name: "Favorite image" }).click();
  await phone.getByRole("button", { name: /Library/ }).click();
  await phone.getByRole("button", { name: /Favorites/ }).click();
  await expect(phone.locator(".mock-gallery button")).toHaveCount(1);
  await home();
  await open("Health");
  await phone.getByRole("button", { name: "Week", exact: true }).click();
  await expect(phone.locator(".ios-metric")).toHaveText("35,700");
  await phone.getByRole("button", { name: "Gym", exact: true }).click();
  await expect(phone.locator(".ios-sport-detail")).toContainText(
    "Strength training",
  );
  await home();
  await open("Maps");
  await phone.getByRole("button", { name: "Show route" }).click();
  await expect(phone.locator(".ios-map-route")).toHaveCount(1);
  await phone.getByRole("button", { name: "End route" }).click();
  await expect(phone.locator(".ios-map-route")).toHaveCount(0);
  await home();
  await open("Calendar");
  const month = await phone.locator(".mock-calendar-month").innerText();
  await phone.getByRole("button", { name: "Next month" }).click();
  await expect(phone.locator(".mock-calendar-month")).not.toHaveText(month);
  await phone.getByRole("button", { name: "12", exact: true }).click();
  await phone.getByRole("textbox", { name: "New event" }).fill("Jiu-jitsu");
  await phone.getByRole("button", { name: "Add", exact: true }).click();
  await home();
  await open("Calendar");
  await expect(phone.locator(".ios-calendar-event")).toHaveText("Jiu-jitsu");
  await home();
  await open("Wallet");
  await phone.getByRole("button", { name: "Flip card" }).click();
  await expect(phone.locator(".ios-wallet-card")).toContainText(
    "Just for exploring",
  );
  await phone.getByRole("button", { name: "Coffee card", exact: true }).click();
  await phone.getByRole("button", { name: "Simulate a coffee" }).click();
  await expect(
    phone.locator('.ios-coffee-stamps [data-filled="true"]'),
  ).toHaveCount(4);
  await home();
  await phone.getByRole("button", { name: /Search/ }).click();
  await phone.getByRole("searchbox", { name: "Search apps" }).fill("Notes");
  await expect(phone.locator(".ios-app-results button")).toHaveCount(1);
  await phone.locator(".ios-app-results button").click();
  await expect(phone.getByRole("textbox", { name: "Note title" })).toHaveValue(
    "Training ideas",
  );
});

test("dark apps remain accessible and browser frames cannot access the portfolio", async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.goto("./en/");
  await page
    .locator(".filters button")
    .filter({ hasText: /Online games|Jogos online|Juegos online/ })
    .click();
  const phone = page.locator(".phone-device");
  const open = (name: string) =>
    phone.getByRole("button", { name, exact: true }).first().click();
  await open("Settings");
  await phone.getByRole("switch", { name: "Dark appearance" }).check();
  await open("Home");
  for (const name of labels.en.apps) {
    await open(name);
    expect(
      (
        await new AxeBuilder({ page })
          .include(".phone-device")
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      name,
    ).toEqual([]);
    await open("Home");
  }
  await open("Browser");
  for (const invalid of [
    "javascript:alert(1)",
    "data:text/html,test",
    "http://example.com",
    "https://user:secret@example.com",
  ]) {
    await phone.getByRole("textbox", { name: "Website address" }).fill(invalid);
    await open("Go");
    await expect(phone.getByRole("alert")).toBeVisible();
    await expect(phone.locator("iframe")).toHaveCount(0);
  }
  await page.route("https://example.com/", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<p id="result">Checking</p><script>try { parent.document.title="changed"; } catch { document.getElementById("result").textContent="Isolated"; }</script>',
    }),
  );
  await phone
    .getByRole("textbox", { name: "Website address" })
    .fill("https://example.com/");
  await open("Go");
  await expect(
    page.frameLocator(".phone-app-content iframe").locator("#result"),
  ).toHaveText("Isolated");
  await expect(page).not.toHaveTitle("changed");
  await expect(phone.locator("iframe")).toHaveAttribute(
    "sandbox",
    "allow-scripts",
  );
  await expect(phone.locator("iframe")).toHaveAttribute(
    "referrerpolicy",
    "no-referrer",
  );
});

test("published sibling projects use external launch while arbitrary embeds stay opaque", async ({
  page,
  request,
}, testInfo) => {
  const localOrigin = new URL(testInfo.project.use.baseURL as string).origin;
  await page.route(
    "https://trivia.raphaelrocha.com/**",
    async (route) => {
      const local = new URL(route.request().url());
      const response = await request.get(
        `${localOrigin}${local.pathname}${local.search}`,
      );
      await route.fulfill({ response });
    },
  );
  await page.goto("https://trivia.raphaelrocha.com/en/");
  await page
    .locator(".filters button")
    .filter({ hasText: /Online games|Jogos online|Juegos online/ })
    .click();
  const phone = page.locator(".phone-device");
  await phone.getByRole("button", { name: "Browser", exact: true }).click();
  await phone.getByRole("button", { name: "Trivia", exact: true }).click();
  await expect(phone.locator(".ios-browser-full-site")).toContainText(
    "Open the full experience in a new tab.",
  );
  await expect(phone.locator("iframe")).toHaveCount(0);
  await expect(
    phone.getByRole("link", { name: "Open outside the phone ↗" }),
  ).toHaveAttribute("href", "https://trivia.raphaelrocha.com/");
  await page.route("https://trivia.raphaelrocha.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<h1>Untrusted query</h1>",
    }),
  );
  await phone
    .getByRole("textbox", { name: "Website address" })
    .fill("https://trivia.raphaelrocha.com/?untrusted=1");
  await phone.getByRole("button", { name: "Go", exact: true }).click();
  await expect(phone.locator("iframe")).toHaveAttribute(
    "sandbox",
    "allow-scripts",
  );
});
