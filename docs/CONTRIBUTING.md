# Contributing Guide

Thanks for investing in DesignGreat! This guide explains how to build, test, and contribute changes
effectively.

## Workflow Overview

1. Fork or clone the repository and create a feature branch from `main`.
2. Keep your branch focused—small, frequent PRs are easier to review.
3. Run the full validation suite locally before opening a pull request.
4. Document user-facing changes with a changeset.

## Tooling Checklist

- **Node.js:** Use version >=22 (`nvm use`).
- **PNPM:** Version 9 is required to match the workspace lockfile format.
- **Editor:** Ensure the editor respects `.editorconfig` and uses ESLint/Prettier integrations.

## Commands Cheat Sheet

| Task                 | Command                  |
| -------------------- | ------------------------ |
| Install dependencies | `pnpm install`           |
| Lint code            | `pnpm lint` or `pnpm xo` |
| Fix lint issues      | `pnpm lint:fix`          |
| Run tests            | `pnpm test`              |
| Type-check           | `pnpm typecheck`         |
| Format code          | `pnpm format`            |
| Clean artifacts      | `pnpm clean`             |

## Commit Messages

- Follow the [Conventional Commits](https://www.conventionalcommits.org/) spec.
- Husky runs `commitlint` to enforce the convention.
- Example: `feat(app-web-pc-client): add user preferences panel`

## Changesets

- Use `pnpm changeset` to document any change that alters published behavior.
- Choose the correct semver bump (patch/minor/major) per package.
- Commit the generated `.changeset/*.md` file with your code.
- See the
  [Changeset Workflow guide](https://graezykev.github.io/designgreat/contributing/changeset-workflow)
  for detailed steps and templates.

## Linting & Formatting

- ESLint (flat config) enforces XO-aligned rules and no-semicolon style.
- XO can run per-file quickly while coding (`pnpm xo --fix <path>`).
- Prettier keeps formatting consistent; do not manually align code.
- **ESLint config maintenance:** After editing `packages/shared/eslint-config/package.json`, run
  `pnpm sync:eslint-deps` to mirror peer dependency versions into the root `package.json`.
- **Workspace globs:** Keep monorepo file targeting in sync by editing `workspace-globs.js` whenever
  package directories move or new runtimes are added; this file feeds both the shared ESLint preset
  and the root config.
- Style invariants across tools:

  | Convention           | ESLint source                                                                                    | Prettier option                 | `.editorconfig` entry                             | Notes                                                |
  | -------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------- | ------------------------------------------------- | ---------------------------------------------------- |
  | No semicolons        | `@typescript-eslint/semi: ['error', 'never']`                                                    | `semi: false`                   | –                                                 | Applies to `.js/.ts/.tsx` and code fences.           |
  | Single quotes        | `quotes: ['error', 'single']`                                                                    | `singleQuote: true`             | –                                                 | Use `"` only when escaping.                          |
  | 2-space indentation  | `indent: ['error', 2, …]`, `no-tabs: 'error'`                                                    | `tabWidth: 2`, `useTabs: false` | `indent_style = space`, `indent_size = 2`         | Check in before running `pnpm format`.               |
  | No trailing commas   | `comma-dangle: ['error', 'never']`                                                               | `trailingComma: 'none'`         | –                                                 | Applies to all languages.                            |
  | Final newline        | `eol-last: ['error', 'always']`                                                                  | `endOfLine: 'lf'`               | `end_of_line = lf`, `insert_final_newline = true` | Windows users should ensure Git autocrlf is off.     |
  | No trailing spaces   | `no-trailing-spaces: 'error'`                                                                    | –                               | `trim_trailing_whitespace = true`                 | Markdown is handled separately.                      |
  | Markdown prose       | `designgreat/markdown-processor` override                                                        | `overrides[*.md]`               | `[*.md] trim_trailing_whitespace = false`         | Allows two-space line breaks.                        |
  | Markdown code fences | `designgreat/markdown-codeblocks` override disables only type-aware `@typescript-eslint/*` rules | –                               | –                                                 | Keeps stylistic checks while skipping type services. |

- **Maintenance checklist when changing style rules:**
  1. **Update the ESLint rule in `packages/shared/eslint-config/base.js`.**
  2. Mirror the change in `prettier.config.js` and `.editorconfig` (when relevant).
  3. Adjust markdown overrides if the rule affects `.md` files.
  4. Run `pnpm exec eslint . --max-warnings 0` and `pnpm format` to verify consistency.

## Directory Conventions

- Place source code inside `src/` for every package.
- Export public APIs through `src/index.ts` to keep boundaries clear.
- Keep test files **alongside implementation** using `*.test.ts(x)` naming.

## Pull Request Checklist

- [ ] `pnpm lint`
- [ ] `pnpm test`
- [ ] `pnpm typecheck`
- [ ] `pnpm format:check`
- [ ] Changeset added (if required)
- [ ] Documentation updated (when necessary)

## Code Review Expectations

- Provide context and screenshots (if UI changes) in the PR description.
- Respond to reviewer feedback promptly and keep discussion threads resolved.
- Squash or rebase commits into a coherent history before merging.

## Release Flow

1. Merge PRs with their changeset entries into `main`.
2. Run `pnpm release` locally or in CI to apply version bumps.
3. Publish artifacts or packages after verifying the release summary.

## Support

- File GitHub issues for bugs.
- Use the `#designgreat-dev` Slack channel for quick help.
- Update this document when process changes—consistency is a team effort.
