---
'@designgreat/app-service-a': minor
'@designgreat/app-service-b': minor
'@designgreat/app-service-c': minor
'@designgreat/app-service-serverless-a': minor
'@designgreat/app-web-mobile-core': minor
'@designgreat/app-web-pc-client': minor
'@designgreat/app-web-pc-core': minor
'@designgreat/eslint-config': minor
'@designgreat/lib-web-ui': minor
'@designgreat/lib-web-ui-design-token': minor
'@designgreat/lib-web-ui-website': minor
'@designgreat/shared': minor
---

## Phase 1 delivers the monorepo foundation—workspace scaffolding, shared tooling, and initial package shells ready for subsequent feature work.

- pnpm
  - packages: libs, apps, node, shared
  - peer dependencies in the package
  - sync: eslint-deps
- turborepo
  - tasks: build, dev, test, lint, typecheck
  - scripts
- husky, commitlint, changeset
- .nvmrc, .npmrc, .gitignore
- .github/workflows
- ESLint
  - XO-style configuration
  - custom rules: no-semicolons single-quote ...
  - base + node + react
  - glob patterns in workspace-globs.js
  - markdown
- prettier & editorconfig - compatible with ESLint
- TS
  - base + node + react + library
  - typecheck scaffold for each package
- scripts
  - setup: install dependencies, run lint, format, typecheck, etc.
  - clean: remove dist, node_modules, etc.
  - sync: eslint-deps
- infrastructure
  - terraform
  - kubernetes
- docs
  - architecture
  - contributing
- README.md
