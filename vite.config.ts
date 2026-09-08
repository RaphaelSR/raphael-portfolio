import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [
    react(),
    {
      name: "portfolio-static-preview",
      async transformIndexHtml(html, context) {
        if (!context.server) return html;
        const { renderPage } = await context.server.ssrLoadModule(
          "/src/entry-server.tsx",
        );
        const segment = (context.originalUrl ?? context.path)
          .replace(/^\//, "")
          .split("/")[0];
        const locale = ["pt", "en", "es"].includes(segment) ? segment : "en";
        return renderPage(html, locale, !["pt", "en", "es"].includes(segment));
      },
    },
  ],
  base: "/",
  server: { port: 3010, strictPort: true },
  build: { target: "es2022" },
});
