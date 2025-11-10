# @designgreat/lib-web-ui

## 0.3.1

### Patch Changes

- 7e93311: **Improve Button stories and Storybook chrome for theme demos**
  - 1. Add Code block.
  - 2. Clamp Storybook html/body/root containers to 100% height with hidden overflow so themed
       previews render without scroll bleed.
  - 3. Add dark/light-aware styling for the demo/code toggle buttons and backdrop so the controls
       mirror the selected theme.
  - 4. Silence lint warnings around `react/no-danger` and index keys in the story to keep the
       Storybook suite clean.

  **Related PR:** [#8](https://github.com/graezykev/designgreat/pull/8)

  **Author:** @chunman-yeung

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
