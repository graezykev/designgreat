# @designgreat/eslint-config

## 0.2.1

### Patch Changes

- a71b385: **Align shared ESLint config with lib-web-ui**
  - 1. Update React lint rules to match lib-web-ui conventions (function expressions, 2-space JSX,
       relaxed default-prop/boolean naming).
  - 2. Add a package-local `tsconfig.json` and `pnpm lint` script for `@designgreat/eslint-config`.
  - 3. Run lint in other packages to ensure no regressions and promote the new script.

  **Related PR:** [#7](https://github.com/graezykev/designgreat/pull/7)

  **Author:** @chunman-yeung

## 0.2.0

### Minor Changes

- 3cdc4da: ## Phase 1 foundation for @designgreat/eslint-config
  - Added the eslint-config package to the pnpm/Turborepo workspace so consumers can share lint
    rules immediately.
  - Applied the repo's new TypeScript build setup and validation flow to the configuration package.
  - Connected automation and release tooling so future lint rule updates publish smoothly.

  Related PR: [#2](https://github.com/graezykev/designgreat/pull/2) Author: @chunman-yeung
