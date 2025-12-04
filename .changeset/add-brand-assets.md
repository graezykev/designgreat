---
'@designgreat/lib-design-token': minor
---

Added brand assets support:

- Added `logo.svg` in `assets/brand/` with CSS variable support and fallback color
- Added `copy-brand-assets.ts` script for other packages to copy brand assets
- Added `./brand/*` export in package.json
- Build now copies brand assets to `dist/brand/`
