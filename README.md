# DesignGreat Monorepo

DesignGreat is a PNPM + Turborepo powered monorepo that hosts every web and service surface for the
platform. The repository is structured to support shared infrastructure, reusable component
libraries, frontend applications, and backend services with a single developer experience.

## Tech Stack

- **Runtime:** Node.js 22 (LTS)
- **Package manager:** PNPM 9 with workspace support
- **Build & tasks:** Turborepo pipelines
- **Language:** TypeScript 5 with project-wide base configs
- **Linting:** ESLint 9 using XO-style conventions (no semicolons)
- **Formatting:** Prettier 3 configured for XO compatibility
- **Git hooks:** Husky 9 + lint-staged + Commitlint
- **Versioning:** Changesets for release orchestration

## Repository Layout

```
/
├─ .github/workflows/          # CI workflows (to be populated)
├─ packages/                   # Workspace packages
│  ├─ lib-web-ui-*             # UI libraries and design tokens
│  ├─ app-web-*                # Web applications (React)
│  ├─ app-service-*            # Node and serverless services
│  └─ shared/                  # Shared utilities + eslint config package
├─ infrastructure/             # Terraform & Kubernetes definitions
├─ docs/                       # Architecture and contributor guides
└─ scripts/                    # Automation scripts (setup, clean, etc.)
```

Each package ships with a minimal `package.json` wired to the shared TypeScript and linting setup.
Use `tsconfig.library.json`, `tsconfig.react.json`, or `tsconfig.node.json` depending on the runtime
target.

## Prerequisites

1. Install [Node.js 22](https://nodejs.org/dist/latest-v22.x/) or use `nvm use` with the provided
   `.nvmrc`.
2. Install [PNPM 9](https://pnpm.io/installation).

## Fast Start

```bash
pnpm install
pnpm setup
pnpm turbo run build --dry-run
```

- `pnpm setup` installs Husky hooks and runs lint/format checks.
- Turborepo orchestrates build, test, lint, and typecheck pipelines across packages.

## Useful Commands

| Command          | Description                                       |
| ---------------- | ------------------------------------------------- |
| `pnpm install`   | Install workspace dependencies                    |
| `pnpm lint`      | Run ESLint (flat config) with XO-compatible rules |
| `pnpm format`    | Format files with Prettier                        |
| `pnpm test`      | Execute the Turborepo test pipeline               |
| `pnpm clean`     | Remove build artifacts and dependency caches      |
| `pnpm changeset` | Create a new release note                         |
| `pnpm release`   | Version and publish packages (after approvals)    |

## Contributing

1. Create a topic branch from `main`.
2. Implement your changes and add/update tests when applicable.
3. Run `pnpm lint`, `pnpm test`, and `pnpm typecheck` locally.
4. Add a changeset with `pnpm changeset` if the change affects published packages.
5. Commit using conventional commit messages; Husky will enforce linting and commit message quality.

See [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) for detailed guidelines.

## Releasing

- Merge changes into `main` with their associated changeset files.
- Run `pnpm release` (locally or in CI) to apply versions and publish.
- CI should pick up the generated tags and artifacts.

## Support

- Check the troubleshooting section in this README (below).
- Open a GitHub issue for bugs or create a discussion for architectural topics.
- Reach out to the platform engineering team on the internal Slack channel `#designgreat-dev`.

## Troubleshooting Quick Hits

- Ensure you are using Node 22 (`nvm use`).
- Clear caches with `pnpm clean && pnpm install` if installations fail.
- When in doubt, regenerate Husky hooks via `pnpm prepare`.

Happy shipping!
