---
'@designgreat/lib-web-ui': minor
---

Fix React dependency configuration and narrow peer dependency range:

**Breaking Changes:**

- Updated `peerDependencies` to require `react@^18.3.1` and `react-dom@^18.3.1` (previously
  `^18.0.0`)
- This ensures the library is tested against the actual minimum supported React version

**Fixes:**

- Removed React and React-DOM from `dependencies` to prevent multiple React instances in consuming
  applications
- Moved React and React-DOM to `devDependencies` for local development, testing, and Storybook
- Now uses pnpm catalog for consistent React versioning across the monorepo

**Impact on Consumers:**

- If you're using React 18.3.1+: No action needed ✅
- If you're using React 18.0.0 - 18.3.0: You'll see a peer dependency warning and should upgrade to
  React 18.3.1+
- Your bundle size may slightly decrease as React is no longer duplicated
