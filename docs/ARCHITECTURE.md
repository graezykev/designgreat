# Architecture Overview

This document captures the high-level architecture for the DesignGreat platform as implemented in
this monorepo. It focuses on package boundaries, runtime targets, and shared tooling expectations.

## Monorepo Philosophy

- **One toolchain:** All applications and services share ESLint, Prettier, TypeScript, and testing
  tooling to reduce drift.
- **Independent deployability:** Each package owns its build and deployment pipeline. Turborepo
  orchestrates the graph so that dependent builds run in the correct order.
- **Separation of concerns:** UI libraries, applications, backend services, and infrastructure
  definitions live in purpose-built packages.

## Workspace Domains

### UI Libraries

| Package                                | Purpose                                                     | Runtime                   |
| -------------------------------------- | ----------------------------------------------------------- | ------------------------- |
| `@designgreat/lib-web-ui-design-token` | Design token source of truth exported as TypeScript modules | Library (Node + browsers) |
| `@designgreat/lib-web-ui`              | Shared UI primitives (React components, hooks)              | Browser (React)           |
| `@designgreat/docs-design-system`      | Marketing site components and composition helpers           | Browser (React)           |

### Web Applications

| Package                            | Purpose                        | Notes                              |
| ---------------------------------- | ------------------------------ | ---------------------------------- |
| `@designgreat/app-web-pc-core`     | Core shell app for desktop web | React + Turborepo build            |
| `@designgreat/app-web-pc-client`   | Client-facing desktop product  | React + server side data hydration |
| `@designgreat/app-web-mobile-core` | Mobile-optimized experience    | React with responsive design       |

Each application consumes the shared UI libraries and produces deployable assets via build pipelines
defined alongside the package.

### Backend & Serverless Services

| Package                                 | Purpose                     | Runtime                       |
| --------------------------------------- | --------------------------- | ----------------------------- |
| `@designgreat/app-service-a`            | Core API service            | Node 22 runtime               |
| `@designgreat/app-service-b`            | Background jobs / workers   | Node 22 runtime               |
| `@designgreat/app-service-c`            | Integration partner service | Node 22 runtime               |
| `@designgreat/app-service-serverless-a` | Serverless API surface      | Serverless (Lambda/Functions) |

Backend services share the same linting and TypeScript configuration, enabling cross-team
consistency.

### Shared Utilities

- `@designgreat/shared`: Cross-cutting utilities (logging, metrics, domain DTOs).
- `@designgreat/design-token-support`: Utilities and fixtures for theme CSS variables and docs.
- `@designgreat/eslint-config`: Flat-config ESLint presets for base, React, and Node environments.

## Infrastructure

- `infrastructure/terraform`: Declarative provisioning for cloud resources. Organize modules by
  environment (e.g., `envs/prod`).
- `infrastructure/kubernetes`: Kubernetes manifests and Helm charts for services that run on
  clusters.

Infrastructure code should import shared modules where possible and rely on the scripts in
`scripts/` for automation.

## Build & Automation

- **Turborepo** coordinates tasks. Pipelines are defined in `turbo.json` with default targets for
  `build`, `test`, `lint`, `typecheck`, and `format`.
- **TypeScript** base configuration lives in `tsconfig.base.json`; package-specific tasks use
  `tsconfig.library.json`, `tsconfig.react.json`, or `tsconfig.node.json` depending on runtime.
- **Linting** is enforced through ESLint 9 flat configs provided by `@designgreat/eslint-config` and
  wired in the root `eslint.config.js`. Project-specific glob patterns live in `workspace-globs.js`;
  update that file when packages move or new targets are added so linting remains accurate.
- **Formatting** uses Prettier 3 configured to match XO's no-semicolon style.

## Environments

| Environment | Branch           | Notes                                                                    |
| ----------- | ---------------- | ------------------------------------------------------------------------ |
| Development | feature branches | Developers run services locally with `pnpm turbo run dev --filter=<pkg>` |
| Staging     | `main`           | Automated deployments triggered in CI                                    |
| Production  | tagged releases  | Changesets + CI manage semantic versioning                               |

## Observability & Quality Gates

- Linting, formatting, and type-checking gates run locally via Husky pre-commit hooks and in CI.
- Unit testing is provided through Vitest (configure per package as implementation lands).
- Changesets enforce change documentation for any package release.

## Future Enhancements

- Add CI workflows under `.github/workflows/` for lint/test build pipelines.
- Introduce storybook previews for UI packages.
- Add deployment scripts to `scripts/` for infrastructure automation.

For deeper contribution workflow guidance, read [`docs/CONTRIBUTING.md`](./CONTRIBUTING.md).
