---
'@designgreat/lib-web-ui': patch
---

Fix prepare script to run full build instead of only theme generation

- Changed `prepare` script from `pnpm run generate:theme` to `pnpm run build`
- Ensures the package is fully built during installation, not just theme files
- Aligns prepare script with prepublishOnly script behavior
