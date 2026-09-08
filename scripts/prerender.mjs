import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createServer } from "vite";
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { renderPage } = await server.ssrLoadModule("/src/entry-server.tsx");
  const template = await readFile("dist/index.html", "utf8");
  for (const locale of ["en", "pt", "es"]) {
    await mkdir(`dist/${locale}`, { recursive: true });
    await writeFile(`dist/${locale}/index.html`, renderPage(template, locale));
  }
  await writeFile("dist/index.html", renderPage(template, "en", true));
  for (const suffix of ["", "en/", "pt/", "es/"]) {
    const directory = `dist/raphael-portfolio/${suffix}`;
    const target = `/${suffix}`;
    await mkdir(directory, { recursive: true });
    await writeFile(
      `${directory}/index.html`,
      `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Raphael Rocha</title><link rel="canonical" href="https://raphaelrocha.com${target}"><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script><noscript><meta http-equiv="refresh" content="0;url=${target}"></noscript></head><body><a href="${target}">Continue to the portfolio</a></body></html>`,
    );
  }
  const urls = ["en", "pt", "es"]
    .map(
      (locale) =>
        `<url><loc>https://raphaelrocha.com/${locale}/</loc></url>`,
    )
    .join("");
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
  );
} finally {
  await server.close();
}
