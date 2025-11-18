# @designgreat/docs-design-system

## 0.1.4

### Patch Changes

- Updated dependencies [7e38708]
  - @designgreat/lib-web-ui@0.5.1

## 0.1.3

### Patch Changes

- 8169818: Internal: Use pnpm catalog for React dependencies to ensure version consistency across
  the monorepo.

  **Related PR:** [#23](https://github.com/graezykev/designgreat/pull/23)

  **Author:** @chunman-yeung

- Updated dependencies [8169818]
  - @designgreat/lib-web-ui@0.5.0

## 0.1.2

### Patch Changes

- 1ec0ba9: Fix ESM module format for Docusaurus scripts

  Renamed `scripts/copy-fonts.ts` to `scripts/copy-fonts.mts` to explicitly mark it as an ESM
  module. This allows the script to use `import.meta` syntax while being properly linted and
  typechecked by Node.js configs, without requiring `"type": "module"` in package.json (which would
  break Docusaurus compatibility).

  **Related PR:** [#22](https://github.com/graezykev/designgreat/pull/22)

  **Author:** @chunman-yeung

- Updated dependencies [1ec0ba9]
- Updated dependencies [1ec0ba9]
  - @designgreat/lib-web-ui-design-token@0.4.3
  - @designgreat/lib-web-ui@0.4.10

## 0.1.1

### Patch Changes

- ee65af0: Fix TypeScript configuration for proper ES module and React type support
  - Added `"type": "module"` to package.json to correctly identify ES module files
  - Added `@types/react` as a dev dependency to resolve React type definitions
  - Configured `@site/*` path alias in tsconfig.json for Docusaurus imports
  - Fixed TypeScript errors related to CommonJS/ES module conflicts and missing type declarations

  **Related PR:** [#21](https://github.com/graezykev/designgreat/pull/21)

  **Author:** @chunman-yeung

- Updated dependencies [ee65af0]
  - @designgreat/lib-web-ui@0.4.9

## 0.1.0

### Minor Changes

- 579d77c: Make docs-design-system package publicly publishable to npm
  - Changed `private: true` to `private: false` to allow npm publishing
  - Added `publishConfig` with `access: "public"` for public npm registry
  - Updated GitHub Pages deployment workflow with improved concurrency settings

  **Related PR:** [#20](https://github.com/graezykev/designgreat/pull/20)

  **Author:** @chunman-yeung

## 0.0.3

### Patch Changes

- Updated dependencies [8769553]
  - @designgreat/lib-web-ui-design-token@0.4.2
  - @designgreat/lib-web-ui@0.4.8

## 0.0.2

### Patch Changes

- Updated dependencies [a8481f4]
  - @designgreat/lib-web-ui-design-token@0.4.1
  - @designgreat/lib-web-ui@0.4.7

## 0.0.1

### Patch Changes

- 9de7bd0: Initial Docusaurus documentation site for design system
  - Docusaurus-powered documentation site with design system guides
  - Integrated font loading from lib-web-ui-design-token using self-contained font directory
  - Custom CSS configuration with Roboto font family from design tokens
  - Font copying script to populate static assets from lib-web-ui-design-token/dist/font/
  - Configured baseUrl-aware font-face.css loading via Docusaurus stylesheets
  - GitHub Actions workflow for automated deployment to GitHub Pages

  **Related PR:** [#16](https://github.com/graezykev/designgreat/pull/16)

  **Author:** @chunman-yeung

- Updated dependencies [af461c8]
- Updated dependencies [da249d2]
  - @designgreat/lib-web-ui-design-token@0.4.0
  - @designgreat/lib-web-ui@0.4.6
