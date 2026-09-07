# Raphael Rocha — portfolio

A personal portfolio inspired by desktop utilities and handheld consoles: a simple document-first website with a small, optional Three.js experiment. React, TypeScript and Vite. Portuguese and English. No backend, analytics, remote fonts or runtime content services.

## Run locally

```sh
nvm use
npm ci
npm run dev
```

Open http://127.0.0.1:3010/raphael-portfolio/.

On Raphael's current Mac, this checkout is on the APFS SSD. `node_modules` is a local symlink to `/Users/raphael.rocha/Documents/Codex/dependencies/raphael-portfolio/node_modules` to avoid slow random reads on the external volume. That link is ignored by Git. A normal `npm ci` works on a fresh checkout.

## Validate

```sh
npm run lint
npm run build
npx playwright install chromium
npm test
```

With Google Chrome already installed: `PLAYWRIGHT_CHANNEL=chrome npm test`. Browser tests cover responsive layouts, automated WCAG checks, keyboard navigation, dialog focus, language persistence, project filters, the PDF download, clipboard, reduced motion, and the WebGL fallback. Automated accessibility tests complement manual review; they do not establish full WCAG conformance.

## Content and art

- `src/content.ts`: bilingual editorial content, experience, project links and contact details.
- `src/components/ProjectArt.tsx`: original illustrative SVG/CSS project covers. These are editorial illustrations, not screenshots of the products.
- `src/components/Playground.tsx`: a procedural handheld console, local environment, limited pixel ratio, on-demand rendering when animation is paused, suspension outside the viewport and resource disposal.
- `src/styles.css`: responsive layout and interaction styles. Native document scrolling, no scroll hijacking, no autoplay audio.
- `public/raphael-rocha-resume-2026.pdf`: original résumé supplied by Raphael.

Career dates and descriptions follow the supplied 2026 résumé. Concurrent roles are intentionally retained. ModPro is shown as a current contribution without inventing a job title, start date or relationship to Xseed; those details await Raphael's confirmation. Side projects are selected from his public repositories. No private application screens, proprietary code or private repository links are included.

## Publication

This revision is a **local preview pending Raphael's approval**. No remote branch, PR or deployment has been created for it.

The prepared workflow validates pull requests and `main`; publishing requires a manual workflow dispatch on `main`. Before the first approved publication, change GitHub Pages from its existing legacy `gh-pages` source to GitHub Actions. Do not do this or dispatch the workflow before approval. The existing production site remains unchanged.

## Design references

- [Rauno Freiberg](https://rauno.me/): restrained interface details and clarity.
- [Josh W. Comeau](https://www.joshwcomeau.com/): readable content with playful touches.
- [Bruno Simon](https://bruno-simon.com/): Three.js as a personal experiment.

The resulting art and layout are original; no reference site assets or source code were copied.
