---
'@designgreat/docs-design-system': patch
---

Fix TypeScript configuration for proper ES module and React type support

- Added `"type": "module"` to package.json to correctly identify ES module files
- Added `@types/react` as a dev dependency to resolve React type definitions
- Configured `@site/*` path alias in tsconfig.json for Docusaurus imports
- Fixed TypeScript errors related to CommonJS/ES module conflicts and missing type declarations
