---
name: verify
description: Build, run and visually verify the portfolio one-pager (Vue 3 + Vite)
---

# Verify the portfolio app

## Build & launch

```bash
npm run build          # production build, ~2s — catches SCSS/template errors
npm run dev            # Vite dev server; picks the next free port if 5173 is taken
```

Read the dev-server output to get the actual port (often 5174).

## Drive & screenshot

No local Playwright — a global install exists (`npm ls -g playwright`) with
Chromium in `$LOCALAPPDATA/ms-playwright`. NODE_PATH does not work for ESM;
import it by absolute file URL:

```js
const { chromium } = await import("file:///D:/applications/node/node_modules/playwright/index.mjs");
```

The site is a one-pager: all sections (`#home`, `#about`, `#gallery`,
`#profiles`, `#contact`) render on `/`. Scroll a section into view with
`page.locator("#id").scrollIntoViewIfNeeded()` and screenshot the locator.

## Gotchas

- Element screenshots smear the fixed-position Logo and MainNav into the
  capture mid-image — artifact, not a layout bug.
- The Logo eye animation logs stray numbers to the console; ignore them.
- `#profiles` fetches the GitHub API on mount and caches in localStorage
  (`profiles-gh-repos`, 1h). To test the snapshot fallback, abort
  `**/api.github.com/**` via `page.route` AND `localStorage.clear()` first.
- Mobile breakpoint is `max-width: 751px` (or portrait ≤751px high);
  tablet/desktop starts at `min-width: 960px`.
