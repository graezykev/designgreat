---
'@designgreat/docs-design-system': patch
---

Updated Logo component and added brand assets documentation:

- Logo component now fetches and inlines SVG for CSS variable (theme) support
- Falls back to `<img>` tag if fetch fails or is slow
- Uses `logo.svg` from `@designgreat/lib-design-token` via `copy:brand` script
- Removed inline SVG, simplified CSS
- Added `docs-design-token/guides/brand-assets.mdx` consumer guide with SVGR import examples
- Added `docs-contributing/design-token-development/brand-assets.mdx` contributor guide
- Documented React component import as recommended approach (auto theme support)
- Added consumer usage patterns table (SVGR, fetch/inline, img tag)
- Updated `docs-design-token/guides/installation.mdx` with brand assets export info
- Updated `docs-contributing/design-token-development/publishing.mdx` with brand export
