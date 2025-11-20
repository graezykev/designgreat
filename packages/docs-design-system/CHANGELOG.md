# @designgreat/docs-design-system

## 0.4.1

### Patch Changes

- 1459393: Reorganize design tokens documentation structure
  - Merged "Package Exports" content into "Installation" page as a subsection for better logical
    flow
  - Users now learn about available package exports immediately after installation instructions
  - Updated API Reference category to contain only Runtime APIs and TypeScript Types
  - Adjusted sidebar positions to reflect new structure
  - Updated cross-references in overview page to point to correct locations
  - Fixed component category ordering (Button → TextInput → Dialog) to follow alphabetical order

  **Related PR:** [#29](https://github.com/graezykev/designgreat/pull/29)

  **Author:** @chunman-yeung

## 0.4.0

### Minor Changes

- 5d57854: Reorganize design system documentation structure

  **Component Library Documentation:**
  - Migrated `docs/design-system/web-components.md` to multiple focused MDX files in
    `docs-components/guides/`
  - Created comprehensive guides: Overview, Installation, Theming, Font Setup, Tailwind Utilities,
    Framework Guides, and Troubleshooting
  - Updated navbar to point to `guides/overview` as the main entry point for component documentation
  - Added `_category_.json` files to control sidebar ordering and enable category linking
  - Organized component-specific docs under their respective folders (button, text-input, dialog)

  **Design Tokens Documentation:**
  - Migrated `docs/design-system/design-tokens.md` to multiple focused MDX files in
    `docs/design-tokens/`
  - Created comprehensive guides: Overview, Installation, CSS Integration, Theme Switching, Font
    Integration, and Tailwind Integration
  - Grouped API documentation (Package Exports, Runtime APIs, TypeScript Types) under
    `docs/design-tokens/api/` subfolder
  - Positioned Design Tokens category first in the main docs sidebar
  - Renamed font documentation from "Font Assets" to "Font Integration" for clarity

  **Link Updates:**
  - Fixed all internal documentation links to use correct relative paths
  - Updated GitHub organization references from `chunwenyang` to `graezykev` across all
    documentation
  - Corrected component documentation links to point to proper index pages
  - Updated cross-references between design token and component library documentation

  **Content Improvements:**
  - Refined font documentation to accurately reflect provided font assets (Roboto, woff2 only)
  - Added detailed usage instructions for Roboto font integration
  - Improved documentation structure with better logical flow and categorization
  - Enhanced cross-linking between related documentation sections

  **Related PR:** [#28](https://github.com/graezykev/designgreat/pull/28)

  **Author:** @chunman-yeung

### Patch Changes

- Updated dependencies [5d57854]
- Updated dependencies [5d57854]
  - @designgreat/lib-web-ui-design-token@0.4.4
  - @designgreat/lib-web-ui@0.5.4
  - @designgreat/design-token-support@0.2.7

## 0.3.0

### Minor Changes

- 9562c72: Major documentation improvements:
  - Add local search functionality using `@easyops-cn/docusaurus-search-local`
  - Create separate "Contributing" documentation section with dedicated plugin instance
  - Create comprehensive "Components" documentation section with interactive examples for Button,
    Dialog, and TextInput components
  - Implement tabbed UI (Preview/Code toggle) for all component examples using Docusaurus Tabs
  - Add blog feature configuration guide (migrated to docs-contributing/features.mdx)
  - Restructure documentation with improved navigation and sidebar organization
  - Update site branding to "Design Great"
  - Remove broken Storybook links from component documentation
  - Simplify README with links to web-based documentation

  **Related PR:** [#27](https://github.com/graezykev/designgreat/pull/27)

  **Author:** @chunman-yeung

### Patch Changes

- Updated dependencies [9562c72]
  - @designgreat/lib-web-ui@0.5.3

## 0.2.0

### Minor Changes

- fef6c91: **Implement design token theme integration with Docusaurus**
  - Integrated `@designgreat/lib-web-ui-design-token`, `@designgreat/lib-web-ui`, and
    `@designgreat/design-token-support` for consistent theming across documentation site
  - Implemented robust theme synchronization between Docusaurus's `[data-theme]` attribute and
    design token classes (`.dg-theme-light`, `.dg-theme-dark`)
  - Created `Root.tsx` component with `MutationObserver` to maintain theme class synchronization
    during React lifecycle
  - Added `preinit.ts` client module to apply theme classes before React hydration, preventing flash
    of unstyled content
  - Created `constants.ts` that leverages `@designgreat/design-token-support` utilities
    (`getThemeClassName`, `ThemeName`) for centralized, type-safe theme management
  - Mapped all Infima CSS variables (`--ifm-*`) to design token variables (`--dg-*`) in `custom.css`
    for comprehensive theme coverage including colors, typography, spacing, navigation, footer, code
    blocks, table of contents, and more
  - Improved script organization by simplifying `dev` and `start` script relationship
  - Removed unnecessary `@docusaurus/theme-common` dependency by implementing direct DOM
    manipulation

  **Related PR:** [#26](https://github.com/graezykev/designgreat/pull/26)

  **Author:** @chunman-yeung

### Patch Changes

- Updated dependencies [fef6c91]
  - @designgreat/lib-web-ui@0.5.2

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
