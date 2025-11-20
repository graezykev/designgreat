# @designgreat/design-token-support

## 0.2.8

### Patch Changes

- Updated dependencies [cad7912]
  - @designgreat/lib-web-ui-design-token@0.4.5

## 0.2.7

### Patch Changes

- Updated dependencies [5d57854]
  - @designgreat/lib-web-ui-design-token@0.4.4

## 0.2.6

### Patch Changes

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

- Updated dependencies [1ec0ba9]
- Updated dependencies [1ec0ba9]
  - @designgreat/lib-web-ui-design-token@0.4.3

## 0.2.5

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

- Updated dependencies [8769553]
  - @designgreat/lib-web-ui-design-token@0.4.2

## 0.2.4

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

- Updated dependencies [a8481f4]
  - @designgreat/lib-web-ui-design-token@0.4.1

## 0.2.3

### Patch Changes

- Updated dependencies [af461c8]
  - @designgreat/lib-web-ui-design-token@0.4.0

## 0.2.2

### Patch Changes

- Updated dependencies [a71b385]
  - @designgreat/lib-web-ui-design-token@0.3.2

## 0.2.1

### Patch Changes

- Updated dependencies [12e545c]
  - @designgreat/lib-web-ui-design-token@0.3.1

## 0.2.0

### Minor Changes

- 5ace98d: ## Design Token Support Alignment
  - **What changed?**
    - 1. Pointed the helpers at the regenerated token outputs.
    - 2. Refreshed CSS-variable generation utilities to match the new structure.
    - 3. Added alignment tests to keep Tailwind integrations in sync.
  - **Why does it matter?**
    - 1. Ensures consumers continue to receive accurate token-derived styles.
    - 2. Reduces drift between runtime helpers and the core token package.
    - 3. Protects against regressions as the token pipeline evolves.
  - **What's next?**
    - 1. Ship utilities for dynamic theme loading in client apps.
    - 2. Document advanced usage patterns for Tailwind v4 and SSR.
    - 3. Track downstream adoption and gather feedback for additional helpers.

  Related PR: [#3](https://github.com/graezykev/designgreat/pull/3) Author: @chunman-yeung

### Patch Changes

- Updated dependencies [5ace98d]
  - @designgreat/lib-web-ui-design-token@0.3.0
