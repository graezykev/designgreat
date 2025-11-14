# @designgreat/design-token-support

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
