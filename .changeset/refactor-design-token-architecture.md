---
'@designgreat/lib-web-ui-design-token': minor
'@designgreat/lib-web-ui': minor
'@designgreat/docs-design-system': patch
---

Refactor design token architecture for standalone usage

**lib-web-ui-design-token:**

- Changed CSS variable prefix from `--token-` to `--dg-`
- Changed SCSS variable prefix from `$token-` to `$dg-`
- Changed dark theme selector from `:root` to `.dg-theme-dark`
- Added `dg` namespace to JSTS exports (e.g., `light.dg.color.background.default`)
- Added combined CSS export at `@designgreat/lib-web-ui-design-token/css`
- Added SCSS exports at `/scss/light` and `/scss/dark`
- Updated validation to check for `dg` namespace structure
- **Added theme utilities**: `getThemeClassName()`, `applyTheme()`, `isThemeApplied()`,
  `getOppositeTheme()`, `getThemeSelector()`, `THEME_CLASSES`, `THEME_SELECTORS`

**lib-web-ui:**

- Removed `@designgreat/design-token-support` dependency
- Now imports design tokens directly from `lib-web-ui-design-token`
- Removed `generate:theme` build step
- Deleted `designgreat-theme.css` and `generate-theme-css.ts`
- Updated Storybook to use theme utilities from design token package
- Updated Tailwind config to use `THEME_CLASSES` constant

**docs-design-system:**

- Removed `@designgreat/design-token-support` dependency
- Updated all documentation to reflect new architecture and theme utilities
- Added font-assets contributing documentation
- Updated theme switching examples to use `getThemeClassName()` and `applyTheme()`

**Monorepo:**

- Deleted `@designgreat/design-token-support` package (deprecated, functionality absorbed by
  `lib-web-ui-design-token`)
- Removed all references from `tsconfig.base.json`, GitHub workflows, and documentation
