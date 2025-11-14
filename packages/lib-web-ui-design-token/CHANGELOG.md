# @designgreat/lib-web-ui-design-token

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
