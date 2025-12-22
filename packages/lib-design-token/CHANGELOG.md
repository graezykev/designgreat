# @designgreat/lib-design-token

## 0.10.1

### Patch Changes

- 3e10a39: Update input border token to use lighter alpha color

  **Changes:**
  - Changed `color.shortcut.input.border.DEFAULT` token from `{color.border.DEFAULT}` to
    `{color.alpha.neutral.3}`
  - This makes input borders lighter and more subtle, improving visual hierarchy
  - The change affects both light and dark themes automatically through the alpha color system

  **Impact:**
  - Input borders now use a lighter alpha color (`neutral.3`) instead of the default border color
  - Light theme: Border color changed from `#1d1d1f7d` to `#1d1d1f24` (lighter/more transparent)
  - Dark theme: Border color changed from `#e8e8e97d` to `#e8e8e924` (lighter/more transparent)
  - Generated theme files updated automatically

  **Related PR:** [#53](https://github.com/graezykev/designgreat/pull/53)

  **Author:** @chunman-yeung

## 0.10.0

### Minor Changes

- 669a56f: Update button and input interaction color tokens for better UX

  **Button State Colors Update:**

  Updated button interaction colors at the token level to create a more intuitive interaction
  pattern:
  - **Subtle buttons**: Adjusted hover and focus colors
    - Hover: Changed from `{color.alpha.neutral.3}` to `{color.alpha.neutral.4}` (darker, more
      visible)
    - Focus: Changed from `{color.alpha.neutral.4}` to `{color.alpha.neutral.3}` (lighter, clearer
      focus state)
    - Focus-visible: Changed from `{color.alpha.neutral.4}` to `{color.alpha.neutral.3}` (lighter,
      clearer focus state)
    - Active: Remains `{color.alpha.neutral.5}` (unchanged, darkest state)
  - **Secondary buttons**: Made active state darker
    - Hover: Remains `{color.secondary.bold}` (unchanged)
    - Active: Changed from `{color.secondary.subtle}` to `{color.secondary.bolder}` (darker, feels
      pressed down)
  - **Primary buttons**: Unchanged

  **Input State Colors Update:**
  - **Subtle input**: Changed default from `{color.alpha.neutral.4}` to `{color.alpha.neutral.3}`
    (lighter, better contrast)

  This creates a more intuitive interaction pattern where hover states are more visible and focus
  states are clearer, improving the visual feedback for user interactions.

  **Files Updated:**
  - `src/tokens/color/shortcut/input-interaction.js`: Updated subtle button hover/focus token values
  - `src/tokens/color/shortcut/input.js`: Updated subtle input default token value

  **Breaking Changes:**

  None. This is a visual enhancement that maintains API compatibility.

  **Related PR:** [#52](https://github.com/graezykev/designgreat/pull/52)

  **Author:** @chunman-yeung

## 0.9.0

### Minor Changes

- ef6ff01: Add navigation hierarchy interaction and state tokens

  **New Tokens Added:**

  **Interaction Tokens (color/shortcut/interaction.js):**
  - `color.text.nav.interaction.{hover, focus, active}` - Primary navigation interaction states
  - `color.text.nav.secondary.interaction.{hover, focus, active}` - Secondary navigation interaction
    states
  - `color.text.nav.tertiary.interaction.{hover, focus, active}` - Tertiary navigation interaction
    states

  **State Tokens (color/shortcut/state.js):**
  - `color.text.nav.state.selected` - Primary navigation selected state
  - `color.text.nav.secondary.state.selected` - Secondary navigation selected state
  - `color.text.nav.tertiary.state.selected` - Tertiary navigation selected state

  **Purpose:**
  - Enables proper styling for navigation link hierarchy (primary, secondary, tertiary)
  - Supports hover, focus, active, and selected states for all navigation variants
  - Provides semantic tokens for navigation components instead of reusing generic link tokens
  - Ensures consistent interaction patterns across navigation components

  **Note:** Token structure avoids nesting under `DEFAULT` key to ensure proper CSS variable
  generation by Style Dictionary.

  **Related PR:** [#51](https://github.com/graezykev/designgreat/pull/51)

  **Author:** @chunman-yeung

## 0.8.0

### Minor Changes

- c973985: ### Design Token Enhancements

  **New Token Categories:**
  - Added duration tokens (`--dg-duration-*`) for animation timing
  - Added easing/cubic-bezier tokens (`--dg-cubic-bezier-*`) for animation curves
  - Added transition preset tokens (`--dg-transition-*`) for common transitions
  - Enhanced gradient tokens (`--dg-gradient-*`) with new brand and accent gradients
  - Added shadow/elevation tokens (`--dg-shadow-elevation-*`) for consistent depth

  **Token Improvements:**
  - Refactored border radius tokens with semantic naming
  - Enhanced font size tokens with better scale progression
  - Improved spacing tokens with pixel and semantic scales
  - Added line-height and letter-spacing tokens for typography

  **Breaking Changes:**
  - Removed deprecated typography tokens: `direction`, `text-align`, `text-indent`, `text-overflow`,
    `vertical-align`, `white-space`, `word-spacing`
  - Removed `size/shadow.js` (consolidated into shadow tokens)

  **Token Structure:**
  - Reorganized token files for better maintainability
  - Updated generated themes with new token definitions
  - Moved `line-height` tokens from `dg.number['line-height']` to `dg['line-height']`

  **lib-web-component:**
  - Updated Tailwind config to use new `line-height` token location

  **Related PR:** [#50](https://github.com/graezykev/designgreat/pull/50)

  **Author:** @chunman-yeung

## 0.7.0

### Minor Changes

- 0842345: Added CLI commands for copying assets:
  - `dg-copy-brand <dest>` — Copy brand assets (logo.svg)
  - `dg-copy-fonts <dest>` — Copy font assets (font-face.css + woff2 files)
  - `dg-copy-all <dest>` — Copy all assets

  **Usage:**

  ```bash
  # Within monorepo (lib-design-token is a dependency)
  dg-copy-brand ./public

  # External consumers
  npx @designgreat/lib-design-token dg-copy-brand ./public
  ```

  **Implementation:**
  - Added `commander` dependency for CLI argument parsing
  - Created `src/cli/` with CLI entries and shared logic in `lib/` subfolder
  - Added `bin` entries in package.json
  - Removed redundant wrapper scripts from `scripts/` folder
  - Updated `prepare` script to always run build (removed CI skip) so CLI is available after
    `pnpm install`

  **Related PR:** [#47](https://github.com/graezykev/designgreat/pull/47)

  **Author:** @chunman-yeung

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
