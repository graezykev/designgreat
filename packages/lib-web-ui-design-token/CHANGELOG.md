# @designgreat/lib-web-ui-design-token

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
