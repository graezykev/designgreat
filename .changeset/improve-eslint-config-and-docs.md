---
'@designgreat/eslint-config': patch
---

Fix missing peer dependency and improve ESLint tooling:

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
