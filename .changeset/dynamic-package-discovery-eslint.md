---
'@designgreat/eslint-config': minor
---

Implement dynamic package discovery for ESLint import resolution

Enhanced ESLint configuration with:

- Added `eslint-import-resolver-typescript` dependency for proper TypeScript module resolution
- Implemented automatic package discovery that dynamically detects all workspace packages
- Configured absolute paths for `packageDir` in `import/no-extraneous-dependencies` rule

This eliminates the need for manual maintenance when adding/removing packages and fixes
false-positive import errors when linting from workspace root. The dynamic discovery ensures ESLint
works correctly whether running from root or within individual packages.
