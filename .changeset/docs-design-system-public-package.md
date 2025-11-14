---
'@designgreat/docs-design-system': minor
---

Make docs-design-system package publicly publishable to npm

- Changed `private: true` to `private: false` to allow npm publishing
- Added `publishConfig` with `access: "public"` for public npm registry
- Updated GitHub Pages deployment workflow with improved concurrency settings
