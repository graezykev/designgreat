---
'@designgreat/docs-design-system': patch
---

Updated to use CLI commands for asset copying:

- Changed `copy:fonts` and `copy:brand` scripts to use `dg-copy-fonts` and `dg-copy-brand` CLI
  commands
- Updated contributing documentation (brand-assets.mdx, font-assets.mdx, build-system.mdx,
  architecture.mdx, publishing.mdx)
- Updated consumer guides (fonts.mdx, brand-assets.mdx) with CLI usage examples
- Deleted local `scripts/copy-fonts.ts` (now using centralized CLI)
