# @designgreat/docs-design-system

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
