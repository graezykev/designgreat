# @designgreat/app-service-serverless-a

## 0.2.1

### Patch Changes

- 1ec0ba9: Add TypeScript configuration and placeholder files for service packages

  Created local `tsconfig.json` files and placeholder `src/index.ts` files for service packages to
  enable proper TypeScript compilation and type checking. Each package now has:
  - Local TypeScript configuration extending workspace Node.js settings
  - Placeholder source files for future implementation
  - Proper build and typecheck scripts

  This establishes the foundation for service package development while maintaining monorepo
  consistency.

  **Related PR:** [#22](https://github.com/graezykev/designgreat/pull/22)

  **Author:** @chunman-yeung

## 0.2.0

### Minor Changes

- 3cdc4da: ## Phase 1 foundation for @designgreat/app-service-serverless-a
  - Scaffolded the serverless package inside the pnpm/Turborepo workspace with build, test, lint,
    and typecheck tasks wired up.
  - Applied the shared TypeScript, ESLint, and Prettier baselines introduced in Phase 1.
  - Connected the package to repo automation so deployment tooling stays aligned with the rest of
    the services.

  Related PR: [#2](https://github.com/graezykev/designgreat/pull/2) Author: @chunman-yeung
