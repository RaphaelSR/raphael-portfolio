# Raphael Rocha — portfolio

A professional, editorial portfolio focused on mobile product ownership, architecture and applied AI. Lightweight CSS and Web Animations API transitions support navigation and reading. React, TypeScript and Vite. Portuguese, English and Spanish. An illustrated portrait accompanies the static HTML in the header. No backend, analytics, remote fonts or runtime content services.

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

With Google Chrome already installed: `PLAYWRIGHT_CHANNEL=chrome npm test`. Browser tests cover responsive layouts, automated WCAG checks, keyboard navigation, dialog focus, language persistence, project filters, the PDF download, clipboard, reduced motion, and browser-language detection. Automated accessibility tests complement manual review; they do not establish full WCAG conformance.

## Content and art

- `src/messages.ts`: complete, type-checked UI and editorial translations in all three languages.
- `src/i18n.ts`: shared locale types, preference resolution and localized labels.
- `src/content.ts`: typed experience, projects and technical skills.
- `src/hooks/`: preferences, section tracking and motion lifecycle.
- `src/components/`: reusable interface elements.
- `src/styles.css`: responsive layout and interaction styles. Native document scrolling, no scroll hijacking, no autoplay audio.
- `public/raphael-rocha-resume-2026.pdf`: original résumé supplied by Raphael.

Career dates follow the supplied 2026 résumé. Website copy additionally incorporates Raphael’s confirmed mobile ownership and applied-AI experience. Spanish is fluent on the website and in the new résumé; the supplied original PDF is retained separately. Concurrent roles are intentionally retained. ModPro is shown as a current contribution without inventing a job title, start date or relationship to Xseed. Side projects are selected from his public repositories. No private application screens, proprietary code or private repository links are included.

## Publication

Production: https://raphaelsr.github.io/raphael-portfolio/

The workflow validates pull requests and `main`. Publishing requires a manual workflow dispatch on `main`, with lint, build, audit and browser tests before deployment. GitHub Pages uses GitHub Actions as its source. To test the public release: `PLAYWRIGHT_BASE_URL=https://raphaelsr.github.io/raphael-portfolio/ PLAYWRIGHT_CHANNEL=chrome npm test`.

## Design references

- [Rauno Freiberg](https://rauno.me/): restrained interface details and clarity.
- [Josh W. Comeau](https://www.joshwcomeau.com/): readable content with playful touches.
- [Paco Coursey](https://paco.me/): focused content and restrained interaction.
- [Lee Robinson](https://leerob.com/): concise professional presentation.
- [Brittany Chiang](https://brittanychiang.com/): clear experience and contribution hierarchy.

The resulting art and layout are original; no reference site assets or source code were copied.

Language follows a saved manual preference first, then the first supported browser language in preference order (`pt`, `en`, `es`), with English as the fallback. No IP lookup or geolocation request is made. This detects language preference, not physical location.

## Local recruitment and avatar preview

The current preview generates the complete React page as static HTML at the root and at `/en/`, `/pt/` and `/es/`. Vite serves the same pre-rendered markup during development; the browser hydrates it for interaction. Explicit language URLs take priority over stored and browser preferences. Canonical links, language alternatives, a sitemap and ProfilePage/Person metadata use the same locale configuration. Project contributions and external links are readable without opening dialogs; career highlights are visible in each summary.

`src/components/Portrait.tsx` displays an original generated portrait based on the supplied photographs, exclusively in the header. The optimized JPEG retains the approved expression and stays still. A separate SVG eyelid layer adds a brief blink every 6–10 seconds, with no pointer tracking or scroll response. Motion pauses in hidden tabs and all animated layers are removed for reduced motion. This revision prioritizes likeness and visual quality; it is an illustrated portrait with depth, not a rigged 3D character. The earlier procedural model and Three.js dependency have been removed. No original photographs or third-party character assets are shipped.

The new English download, `public/raphael-rocha-resume.pdf`, has two pages and a single reading column, with fluent Spanish. The supplied original remains at `public/raphael-rocha-resume-2026.pdf`. `scripts/resume.py` builds the new PDF from a JSON export of `content.ts` and `messages.ts`, using Python and ReportLab; it is a checked-in document, not generated by the site build. Career dates and contributions remain grounded in the supplied résumé and confirmed details. Employment arrangements for overlapping roles have not been inferred.

Validation also covers static pages with JavaScript disabled, explicit locale routes, history navigation, header placement, image loading, calm blinking and reduced motion. All changes in this branch are for local review, with no production deployment.

Motion research: [Blender Studio’s Wing It! shading](https://studio.blender.org/blog/shading-and-rendering-of-wing-it/) and [Sprite Fright animation guide](https://studio.blender.org/blog/sprite-fright-style-guide/), as references for stylized volume and gesture timing, without importing their character designs or assets.

## Quiet discoveries

The footer exposes a command palette (`Cmd/Ctrl K`) and **Behind this site**, localized in Portuguese, English and Spanish. Commands support search, keyboard navigation, section and language selection and email copying. Native dialogs preserve focus and close with Escape. Backstage explains implementation decisions and offers a blueprint overlay that outlines the page structure without changing its layout; Escape also exits blueprint mode.

A small link beneath the featured projects points to the [original Snake](https://raphaelsr.github.io/snake-game/). An HTML/CSS phone beneath the projects invites visitors to try Snake. Its icon gently nudges while visible. Opening it starts an automatic preview, a brief screen fault and a fractured exit; controls appear only after the snake leaves the phone. Escape cancels the sequence. The broken phone can then be eaten cell by cell through an SVG mask, with fragments falling from each bite. The palette also provides access. This opt-in game consumes any text, links, buttons and images it encounters across the document, with no designated target. Arrow keys/WASD, click/tap steering and mobile directional controls guide it; the page follows its vertical movement. SVG draws the interpolated snake with curved paths, gradients and a detailed face. Canvas draws bite particles and loose pieces of content. Nearby content can lose its support after a bite: a bounded gravity simulation handles falling, rebounds and collisions between up to 42 fragments, which can also be eaten. The compact control bar keeps instructions in an expandable disclosure. CSS Custom Highlights conceal collected text ranges, and temporarily hidden elements preserve their layout. Closing or resizing restores the content and original scroll position and clears listeners, highlights and animation frames. Hidden tabs pause the game. Reduced motion skips the entrance, particles, falling debris and camera easing. The résumé PDF remains unchanged.

The phone also contains session-only mock apps: a photo gallery, editable notes and reminders, selectable calendar and map views, health and wallet demos, appearance/airplane switches and simulated messages. Browser bookmarks and HTTPS addresses load in a sandboxed iframe, with an external link for sites that block embedding. These demos do not send messages or save user data to a backend. The interface supports Portuguese, English and Spanish, keyboard focus restoration and narrow mobile layouts.

Regression tests cover every mock app, browser URL validation, phone escape timing, progressive phone consumption and restoration, reduced motion, the game rules, collection of an actual page letter, restoration after exit, mobile controls, palette keyboard behavior and backstage accessibility in all three languages.


The résumé download is available only in the final contact section. The About section has a native disclosure for tools, grouped by use rather than proficiency ratings. Inventory sources are the supplied résumé, Raphael’s confirmation of Supabase/Railway/Infisical, and dependency manifests in his local ModPro mobile, web and API projects. Package presence supports the technology inventory, not a claim of equal expertise or sole ownership. Project copy uses concrete technologies where supported. Technology chips are consumed as whole elements and restored on exit.
