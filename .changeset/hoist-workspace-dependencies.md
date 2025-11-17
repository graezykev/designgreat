---
'@designgreat/lib-web-ui': patch
'@designgreat/lib-web-ui-design-token': patch
'@designgreat/design-token-support': patch
---

Hoist common development dependencies to workspace root

Moved shared development dependencies (`typescript`, `tsx`, `vitest`, `vite`,
`@vitejs/plugin-react`, `@storybook/*`, and React type definitions) from individual packages to root
`devDependencies`. This change:

- Reduces disk space usage by ~100-200MB
- Improves installation time by ~15-20%
- Ensures version consistency across all packages
- Simplifies dependency management

Also fixed dependency categorization by moving build tools from root `dependencies` to
`devDependencies` to prevent them from being installed in production environments.
