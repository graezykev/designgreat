---
---

Monorepo configuration improvements

## Changes

### ESLint Configuration

- Enhanced ESLint ignore patterns for documentation files
  - Added ignore for `docs/colors/**/*.mdx` (color documentation)
  - Added ignore for `docs/progress-logs/**/*.md` (development logs)
  - Moved progress logs ignore to dedicated configuration block
  - Updated audit script ignore path after relocation

### TypeScript Configuration

- Added `packages/docs-design-system/audit-color-docs.ts` to Node.js TypeScript project
- Improved type checking for documentation tooling

### Dependencies

- Updated pnpm lockfile with latest dependency resolutions

These changes improve the development experience and ensure consistent linting and type checking
across the monorepo.
