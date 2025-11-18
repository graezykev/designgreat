# @designgreat/eslint-config

## 0.3.1

### Patch Changes

- 62e6f1b: Fix missing peer dependency and improve ESLint tooling:

  **Fixes:**
  - Added missing `eslint-import-resolver-typescript` peer dependency (used in base.js but not
    declared)
  - Consumers will now be properly notified to install this required dependency

  **Internal Improvements:**
  - Enhanced `sync-eslint-deps.ts` script with dry-run mode, error handling, and verification
  - Created comprehensive ESLint configuration guide (`docs/eslint-configuration-guide.md`)
  - Simplified `ARCHITECTURE.md` with links to detailed guides
  - Made documentation maintainable by using glob patterns instead of hardcoded package names

  **For Consumers:** If you're using `@designgreat/eslint-config`, ensure you have
  `eslint-import-resolver-typescript@^4.4.4` installed. Running `pnpm install` should automatically
  install it based on peer dependencies.

  **Related PR:** [#24](https://github.com/graezykev/designgreat/pull/24)

  **Author:** @chunman-yeung

## 0.3.0

### Minor Changes

- 1ec0ba9: Implement dynamic package discovery for ESLint import resolution

  Enhanced ESLint configuration with:
  - Added `eslint-import-resolver-typescript` dependency for proper TypeScript module resolution
  - Implemented automatic package discovery that dynamically detects all workspace packages
  - Configured absolute paths for `packageDir` in `import/no-extraneous-dependencies` rule

  This eliminates the need for manual maintenance when adding/removing packages and fixes
  false-positive import errors when linting from workspace root. The dynamic discovery ensures
  ESLint works correctly whether running from root or within individual packages.

  **Related PR:** [#22](https://github.com/graezykev/designgreat/pull/22)

  **Author:** @chunman-yeung

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
