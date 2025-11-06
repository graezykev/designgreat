---
'@designgreat/eslint-config': patch
---

**Align shared ESLint config with lib-web-ui**

- 1. Update React lint rules to match lib-web-ui conventions (function expressions, 2-space JSX,
     relaxed default-prop/boolean naming).
- 2. Add a package-local `tsconfig.json` and `pnpm lint` script for `@designgreat/eslint-config`.
- 3. Run lint in other packages to ensure no regressions and promote the new script.
