# @designgreat/lib-web-ui

## 0.3.0

### Minor Changes

- a71b385: **Phase 2: Token-driven Tailwind adoption**
  - 1. Map design tokens directly to Tailwind classes (`bg-color-background-button-default`,
       `px-spacing-11`, etc.) so components stay alias-free.
  - 2. Teach Vite, Storybook, and the package build to generate utilities on demand while keeping
       README/STORYBOOK guides in sync.
  - 3. Update Button, Dialog, and TextInput to exercise the new utilities and document the Storybook
       workflow for component development.
  - 4. Outline Phase 3 follow-ups (trimming unused token CSS, dark-mode review, and additional
       accessibility stories) for future iterations.

  **Related PR:** [#7](https://github.com/graezykev/designgreat/pull/7)

  **Author:** @chunman-yeung

### Patch Changes

- Updated dependencies [a71b385]
  - @designgreat/lib-web-ui-design-token@0.3.2
  - @designgreat/design-token-support@0.2.2

## 0.2.0

### Minor Changes

- 3cdc4da: ## Phase 1 foundation for @designgreat/lib-web-ui
  - Scaffolded the UI library in the pnpm/Turborepo workspace with build, test, lint, and typecheck
    tasks ready.
  - Applied the shared TypeScript, ESLint, and Prettier baselines introduced in Phase 1.
  - Wired repo automation so component work benefits from the same delivery pipeline as the apps.

  Related PR: [#2](https://github.com/graezykev/designgreat/pull/2) Author: @chunman-yeung
