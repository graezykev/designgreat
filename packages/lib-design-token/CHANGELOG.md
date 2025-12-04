# @designgreat/lib-design-token

## 0.6.0

### Minor Changes

- f38433f: Added brand assets support:
  - Added `logo.svg` in `assets/brand/` with CSS variable support and fallback color
  - Added `copy-brand-assets.ts` script for other packages to copy brand assets
  - Added `./brand/*` export in package.json
  - Build now copies brand assets to `dist/brand/`

  **Related PR:** [#46](https://github.com/graezykev/designgreat/pull/46)

  **Author:** @chunman-yeung

## 0.5.2

### Patch Changes

- 18b8d82: Renamed package from `@designgreat/lib-web-ui-design-token` to
  `@designgreat/lib-design-token`.

  **Why:** The package is no longer web-specific. It now supports:
  - Web applications (CSS variables, SCSS)
  - React Native (JavaScript token objects)
  - Future: Native iOS/Android development

  **Migration:** Update your imports:

  ```diff
  - import { themes } from '@designgreat/lib-web-ui-design-token'
  + import { themes } from '@designgreat/lib-design-token'

  - import '@designgreat/lib-web-ui-design-token/css'
  + import '@designgreat/lib-design-token/css'

  - import '@designgreat/lib-web-ui-design-token/font'
  + import '@designgreat/lib-design-token/font'
  ```

  **Related PR:** [#39](https://github.com/graezykev/designgreat/pull/39)

  **Author:** @chunman-yeung

## 0.5.1

### Patch Changes

- b2e07b8: **Update README documentation links to match new URL structure**
  - Updated Design Token Guides link: `/docs/tutorial/overview` → `/design-token/guides/overview`
  - Updated Design Token Development Guides link: `/contributing/design-tokens-development/overview`
    → `/contributing/design-token-development/overview`
  - Changed "Development Guide" to "Development Guides" (plural noun)

  **Related PR:** [#36](https://github.com/graezykev/designgreat/pull/36)

  **Author:** @chunman-yeung

## 0.5.0

### Minor Changes

- ac6c205: Refactor design token architecture for standalone usage

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

  **Related PR:** [#35](https://github.com/graezykev/designgreat/pull/35)

  **Author:** @chunman-yeung

## 0.4.6

### Patch Changes

- 81e67b6: Minor token adjustments and theme improvements

  ## Changes

  ### Token Adjustments
  - Updated semantic color token references for better consistency
  - Refined text and background shortcut token mappings
  - Improved theme variable generation for better theme switching

  ### Generated Themes
  - Regenerated theme TypeScript definitions with improved type safety
  - Enhanced theme variable mappings for semantic colors

  ### Documentation
  - Updated README and CHANGELOG links to reflect new documentation structure
    (`/docs/design-tokens/` → `/docs/tutorial/`)

  These are non-breaking refinements that improve token consistency and documentation accessibility.

  **Related PR:** [#34](https://github.com/graezykev/designgreat/pull/34)

  **Author:** @chunman-yeung

## 0.4.5

### Patch Changes

- cad7912: **Simplify README for better maintainability**
  - Simplified `README.md` to act as a clean entry point with two main documentation links
  - Enhanced package description to better communicate the token authoring, build pipeline, and
    TypeScript runtime capabilities
  - README now matches the concise, low-maintenance style across all packages

  This change reduces maintenance overhead by delegating detailed documentation to the comprehensive
  documentation site.

  **Related PR:** [#31](https://github.com/graezykev/designgreat/pull/31)

  **Author:** @chunman-yeung

## 0.4.4

### Patch Changes

- 5d57854: Update documentation links to point to new Docusaurus structure
  - Updated README links from local markdown files to published Docusaurus URLs
  - Changed design tokens usage guide link to point to
    `https://graezykev.github.io/designgreat/docs/tutorial/overview`
  - Updated all references to design tokens documentation to use new structure

  **Related PR:** [#28](https://github.com/graezykev/designgreat/pull/28)

  **Author:** @chunman-yeung

## 0.4.3

### Patch Changes

- 1ec0ba9: Fix typecheck to generate tokens before type checking

  Updated the `typecheck` script to run `build:tokens` before TypeScript type checking. This ensures
  that generated theme files exist before type checking runs, preventing module resolution errors.

  Also updated workspace TypeScript configuration and Turbo pipeline to ensure all dependency
  packages are fully built before dependent packages run type checking, eliminating race conditions
  in the build process.

  **Related PR:** [#22](https://github.com/graezykev/designgreat/pull/22)

  **Author:** @chunman-yeung

- 1ec0ba9: Hoist common development dependencies to workspace root

  Moved shared development dependencies (`typescript`, `tsx`, `vitest`, `vite`,
  `@vitejs/plugin-react`, `@storybook/*`, and React type definitions) from individual packages to
  root `devDependencies`. This change:
  - Reduces disk space usage by ~100-200MB
  - Improves installation time by ~15-20%
  - Ensures version consistency across all packages
  - Simplifies dependency management

  Also fixed dependency categorization by moving build tools from root `dependencies` to
  `devDependencies` to prevent them from being installed in production environments.

  **Related PR:** [#22](https://github.com/graezykev/designgreat/pull/22)

  **Author:** @chunman-yeung

## 0.4.2

### Patch Changes

- 8769553: Fix CI/CD publish failures by making prepare and prepublishOnly scripts conditional
  - Modified `prepare` and `prepublishOnly` scripts to skip during CI environment to prevent build
    errors during `changeset publish`
  - Local development workflow unchanged: `pnpm install` still auto-builds packages
  - CI/CD workflow now uses explicit build steps before publishing, avoiding circular dependency
    issues
  - Resolves "Cannot find module" errors during package publishing in GitHub Actions

  **Related PR:** [#18](https://github.com/graezykev/designgreat/pull/18)

  **Author:** @chunman-yeung

## 0.4.1

### Patch Changes

- a8481f4: Fix CI/CD publish failures by making prepare scripts conditional
  - Modified `prepare` scripts to skip during CI environment to prevent build errors during
    `changeset publish`
  - Local development workflow unchanged: `pnpm install` still auto-builds packages
  - CI/CD workflow now uses explicit build steps before publishing, avoiding circular dependency
    issues
  - Resolves "Cannot find module" errors during package publishing in GitHub Actions

  **Related PR:** [#17](https://github.com/graezykev/designgreat/pull/17)

  **Author:** @chunman-yeung

## 0.4.0

### Minor Changes

- af461c8: Refactor font architecture to self-contained dist/font directory with relative paths
  - Created self-contained `dist/font/` directory containing font-face.css and all font files
  - Changed font paths from absolute (`/assets/fonts/`) to relative (`./`) for better bundler
    compatibility
  - Updated Style Dictionary configuration to generate font-face.css in dist/font/ directory
  - Modified post-build script to preserve generated font-face.css when copying font files
  - Added new package exports: `./font` (font-face.css) and `./font/*` (font files)
  - Removed old exports: `./css/font-face` and `./fonts`
  - Updated README.md to document new font architecture and self-contained directory structure
  - Fixed Style Dictionary font platform configuration to include required transforms

  **Related PR:** [#16](https://github.com/graezykev/designgreat/pull/16)

  **Author:** @chunman-yeung

## 0.3.2

### Patch Changes

- a71b385: **Fix neutral backgrounds and refine control aliases**
  - 1. Correct the neutral background aliasing so light/dark themes surface opposing shades.
  - 2. Expose success/error border variants with explicit `DEFAULT` and `bold` aliases.
  - 3. Consolidate input label tokens under a single `label` object to match tailwind token
       generation.
  - 4. Rebuild generated artifacts to ensure Storybook and consuming packages pick up the updates.

  **Related PR:** [#7](https://github.com/graezykev/designgreat/pull/7)

  **Author:** @chunman-yeung

## 0.3.1

### Patch Changes

- 12e545c: ## Font Download Optimization
  - **What changed?**
    - 1. Prebuild script now skips downloading Roboto assets when the font file already exists.
  - **Why does it matter?**
    - 1. Prevents unnecessary network calls and speeds up repeated token builds.
  - **What's next?**
    - 1. Monitor build logs to ensure cached fonts remain valid across theme updates.

  **Related PR:** [#4](https://github.com/graezykev/designgreat/pull/4)

  **Author:** @chunman-yeung

## 0.3.0

### Minor Changes

- 5ace98d: ## Design Token Pipeline
  - **What changed?**
    - 1. Migrated the token source into the core package under Style Dictionary v5.
    - 2. Added the multi-stage build (font download, per-theme CSS/JS bundles, flattened TypeScript
         themes).
    - 3. Introduced runtime validators to guard token integrity.
  - **Why does it matter?**
    - 1. Consolidates all token outputs into a single, consumable package.
    - 2. Provides typed accessors and ready-to-use theme assets for downstream apps.
    - 3. Catches regressions early through automated validation.
  - **What's next?**
    - 1. Resolve Style Dictionary naming collisions surfaced during the build.
    - 2. Broaden semantic token coverage now that the pipeline is stable.
    - 3. Publish consumption guides for app teams targeting Tailwind and CSS variables.

  Related PR: [#3](https://github.com/graezykev/designgreat/pull/3) Author: @chunman-yeung

## 0.2.0

### Minor Changes

- 3cdc4da: ## Phase 1 foundation for @designgreat/lib-web-ui-design-token
  - Scaffolded the design token package in the pnpm/Turborepo workspace with build, test, lint, and
    typecheck coverage set.
  - Applied the shared TypeScript, ESLint, and Prettier baselines introduced in Phase 1.
  - Hooked automation and publishing tooling so tokens can version alongside other UI assets.

  Related PR: [#2](https://github.com/graezykev/designgreat/pull/2) Author: @chunman-yeung
