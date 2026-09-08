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
  const urls = ["en", "pt", "es"]
    .map(
      (locale) =>
        `<url><loc>https://raphaelsr.github.io/raphael-portfolio/${locale}/</loc></url>`,
    )
    .join("");
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
  );
} finally {
  await server.close();
}
