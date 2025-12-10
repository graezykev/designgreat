# @designgreat/docs-design-system

## 0.7.5

### Patch Changes

- c973985: ### Documentation & CSS Improvements

  **New Documentation Sections:**
  - Added Spacing documentation (overview, pixel values, semantic scales)
  - Added Typography documentation (overview, font sizes, font weights, text spacing)
  - Added Effects documentation (border radius, elevation, gradients)
  - Added Motion documentation (overview, duration, easing, transitions)

  **CSS Component Classes:**
  - Refactored button classes (`.dg-btn-*`) with loading and transition modifiers
  - Consolidated badge classes (`.dg-badge-*`) with gradient and interactive variants
  - Enhanced tag classes (`.dg-tag-*`) with improved color contrast
  - Added dropdown classes (`.dg-dropdown-*`) with disabled and hover states
  - Added tooltip classes (`.dg-tooltip-*`) with arrow position variants
  - Improved interactive card classes with better selected state contrast

  **Accessibility Improvements:**
  - Fixed tag text color contrast (now uses inverse color on primary background)
  - Fixed selected card contrast (primary background with inverse text)
  - Added proper hover states for selected interactive elements

  **Documentation Enhancements:**
  - Added cross-links between related token pages
  - Reorganized interactive demos to follow their relevant token tables
  - Added comprehensive dropdown demo with all states
  - Added tooltip demo with all arrow variants
  - Replaced inline styles with reusable utility classes

  **Related PR:** [#50](https://github.com/graezykev/designgreat/pull/50)

  **Author:** @chunman-yeung

- Updated dependencies [c973985]
  - @designgreat/lib-design-token@0.8.0
  - @designgreat/lib-web-component@0.7.4

## 0.7.4

### Patch Changes

- ae64b7b: docs(design-token): clean up guides section
  - Simplified page titles: "Tailwind Integration" → "Tailwind", "React Native Integration" → "React
    Native"
  - Fixed api folder sidebar position (8 → 9) to avoid conflict with react-native.mdx

  **Related PR:** [#49](https://github.com/graezykev/designgreat/pull/49)

  **Author:** @chunman-yeung

## 0.7.3

### Patch Changes

- b032264: docs: refactor documentation conventions and overview pages

  **Convention Docs:**
  - Refactored `contributing-docs-convention.mdx` with merged file order tables showing actual
    package mappings
  - Restructured `integration-docs-convention` as a folder with index.mdx and child pages
  - Created `web-component-docs-convention.mdx` for React component reference documentation
  - Added collapsible templates using `<details>` for cleaner reading
  - Added flexibility notes to both convention docs
  - Standardized section ordering (Page Templates, Section Headings, Singular vs Plural)

  **Overview Pages:**
  - Added "Next Steps" section to `/design-token/guides/overview`
  - Added "Next Steps" section to `/web-component/guides/overview`
  - Added Brand Assets to Package Exports, Key Features, and Learning Path in design token overview

  **Related PR:** [#48](https://github.com/graezykev/designgreat/pull/48)

  **Author:** @chunman-yeung

## 0.7.2

### Patch Changes

- 0842345: Updated to use CLI commands for asset copying:
  - Changed `copy:fonts` and `copy:brand` scripts to use `dg-copy-fonts` and `dg-copy-brand` CLI
    commands
  - Updated contributing documentation (brand-assets.mdx, font-assets.mdx, build-system.mdx,
    architecture.mdx, publishing.mdx)
  - Updated consumer guides (fonts.mdx, brand-assets.mdx) with CLI usage examples
  - Deleted local `scripts/copy-fonts.ts` (now using centralized CLI)

  **Related PR:** [#47](https://github.com/graezykev/designgreat/pull/47)

  **Author:** @chunman-yeung

- Updated dependencies [0842345]
- Updated dependencies [0842345]
  - @designgreat/lib-design-token@0.7.0
  - @designgreat/lib-web-component@0.7.3

## 0.7.1

### Patch Changes

- f38433f: Updated Logo component and added brand assets documentation:
  - Logo component now fetches and inlines SVG for CSS variable (theme) support
  - Falls back to `<img>` tag if fetch fails or is slow
  - Uses `logo.svg` from `@designgreat/lib-design-token` via `copy:brand` script
  - Removed inline SVG, simplified CSS
  - Added `docs-design-token/guides/brand-assets.mdx` consumer guide with SVGR import examples
  - Added `docs-contributing/design-token-development/brand-assets.mdx` contributor guide
  - Documented React component import as recommended approach (auto theme support)
  - Added consumer usage patterns table (SVGR, fetch/inline, img tag)
  - Updated `docs-design-token/guides/installation.mdx` with brand assets export info
  - Updated `docs-contributing/design-token-development/publishing.mdx` with brand export

  **Related PR:** [#46](https://github.com/graezykev/designgreat/pull/46)

  **Author:** @chunman-yeung

- Updated dependencies [f38433f]
- Updated dependencies [f38433f]
  - @designgreat/lib-design-token@0.6.0
  - @designgreat/lib-web-component@0.7.2

## 0.7.0

### Minor Changes

- 11d6be2: Refactor and optimize contributing documentation

  **CI Workflows:**
  - Created `check-code-quality.yml` workflow for PR validation (lint, typecheck, test, coverage,
    validate, build)
  - Enhanced `check-changeset.yml` with full changeset validation
    (`pnpm changeset status --since=origin/main`)
  - Standardized workflow naming: `check-*` pattern for PR checks

  **Publishing Documentation:**
  - Standardized publishing docs across all 3 packages with consistent structure:
    - Before Opening a PR (checklist)
    - CI Pipeline (mermaid diagrams + tables + workflow links)
    - Package Distribution / Deployment
    - Next Steps
  - Added mermaid flowcharts for CI pipelines (On Every PR, On Merge to Main)
  - Consolidated changeset workflow into single source of truth (`changeset-workflow.mdx`)

  **Documentation Structure:**
  - Split `quality-deployment.mdx` into `quality.mdx` and `publishing.mdx` for
    documentation-site-development
  - Added `publishing.mdx` template to contributing-docs-convention
  - Fixed sidebar position conflicts in web-component docs (button, text-input, dialog)
  - Fixed broken link in `documentation-site-development/get-started.mdx`

  **Convention Compliance:**
  - Standardized section headings ("Related Documentation" instead of "Related Resources")
  - Reviewed and fixed all sidebar_position fields across docs-design-system
  - Added workflow file links with 📄 prefix in publishing docs

  **Cleanup:**
  - Migrated `docs/changeset/` content to docs site
  - Renamed `ci.yml` to `check-code-quality.yml` for naming consistency
  - Updated all references to renamed/deleted files
  - Fixed dead links across monorepo

  **Related PR:** [#45](https://github.com/graezykev/designgreat/pull/45)

  **Author:** @chunman-yeung

## 0.6.8

### Patch Changes

- 1463f73: Contributing documentation refactor and optimization

  **Critical Fixes:**
  - Fixed non-existent `dg-theme-light` class references in `frameworks.mdx` (light theme uses no
    class)
  - Removed outdated `generate:theme` command references across multiple files
  - Fixed incorrect `vitest.config.ts` → `jest.config.ts` in architecture.mdx
  - Removed references to deleted `designgreat-theme.css` file in troubleshooting.mdx
  - Corrected "Vitest tests" → "Jest tests" in web-component get-started.mdx

  **Terminology Standardization:**
  - Changed "UI library" → "component library" in font-handling.mdx and font-assets.mdx
  - Replaced ambiguous `dg-theme-*` wildcard with explicit `.dg-theme-dark` class references
  - Unified "Related Resources" → "Next Steps" across all contributing docs
  - Added naming disclaimer in web-component overview.mdx clarifying React components vs Web
    Components API

  **Content Consolidation:**
  - Added shared "Getting Started" section to contributing index.mdx
  - Simplified both get-started.mdx files to link to shared setup
  - Streamlined font-handling.mdx (~176 → ~90 lines) focusing on contributor needs
  - Streamlined font-assets.mdx (~294 → ~150 lines) removing consumer-focused content
  - Simplified CSS layer explanation in architecture.mdx with link to consumer guide
  - Restructured font-handling.mdx with logical flow (Overview → Architecture → Usage → Best
    Practices)
  - Moved "Why Component Library Doesn't Bundle Fonts" from font-assets.mdx to font-handling.mdx
  - Restored and refined "Import Chain" diagrams for clarity

  **Related PR:** [#44](https://github.com/graezykev/designgreat/pull/44)

  **Author:** @chunman-yeung

## 0.6.7

### Patch Changes

- Updated dependencies [278f847]
  - @designgreat/lib-web-component@0.7.1

## 0.6.6

### Patch Changes

- 9cbdd54: Updated Tailwind integration documentation:
  - Added separate tabs for Tailwind v3 and v4 setup instructions
  - Documented CSS Cascade Layers architecture
  - Added explicit layer control examples for custom overrides
  - Updated contributing docs (architecture, design-token-integration) to reflect new layer
    structure

  **Related PR:** [#42](https://github.com/graezykev/designgreat/pull/42)

  **Author:** @chunman-yeung

- Updated dependencies [9cbdd54]
  - @designgreat/lib-web-component@0.7.0

## 0.6.5

### Patch Changes

- 48e599a: Fixed missing active navbar link highlight color. Added `--ifm-navbar-link-active-color`
  CSS variable and `.navbar__link--active` styling to properly highlight the current page in
  navigation.

  **Related PR:** [#41](https://github.com/graezykev/designgreat/pull/41)

  **Author:** @chunman-yeung

- 48e599a: Updated Tailwind integration docs to recommend importing library CSS before
  `@tailwind utilities`. This ensures consumer utility classes can override library component styles
  as expected.

  **Related PR:** [#41](https://github.com/graezykev/designgreat/pull/41)

  **Author:** @chunman-yeung

## 0.6.4

### Patch Changes

- 313db8e: Updated dependency from `@designgreat/lib-web-ui` to `@designgreat/lib-web-component`.

  **Related PR:** [#40](https://github.com/graezykev/designgreat/pull/40)

  **Author:** @chunman-yeung

- Updated dependencies [313db8e]
  - @designgreat/lib-web-component@0.6.3

## 0.6.3

### Patch Changes

- 18b8d82: Updated dependency from `@designgreat/lib-web-ui-design-token` to
  `@designgreat/lib-design-token`.

  Also fixed React 19 type compatibility issues in homepage components.

  **Related PR:** [#39](https://github.com/graezykev/designgreat/pull/39)

  **Author:** @chunman-yeung

- Updated dependencies [18b8d82]
- Updated dependencies [18b8d82]
  - @designgreat/lib-design-token@0.5.2
  - @designgreat/lib-web-ui@0.6.2

## 0.6.2

### Patch Changes

- c0a8ae6: ### Documentation Guides Refactor

  **Design Token Guides** (`docs-design-token/guides/`)
  - Added new `quick-start.mdx` — 2-minute getting started guide
  - Renamed `css-integration.mdx` → `basic-usage.mdx` with simplified content
  - Renamed `theme-switching.mdx` → `theming.mdx` with reorganized structure
  - Renamed `font-integration.mdx` → `fonts.mdx` with TL;DR and collapsible sections
  - Added new `react-native.mdx` — React Native integration guide
  - Merged `typescript.mdx` and `runtime-apis.mdx` → `api/reference.mdx`
  - Updated `tailwind.mdx` with TL;DR and improved examples
  - Updated `installation.mdx` with collapsible advanced section
  - Updated `overview.mdx` with Learning Path table and Package Exports table

  **Web Component Guides** (`docs-web-component/guides/`)
  - Added new `quick-start.mdx` — 2-minute getting started guide
  - Renamed `font-setup.mdx` → `fonts.mdx` (simplified, cross-links to design-token)
  - Renamed `framework-guides.mdx` → `frameworks.mdx`
  - Renamed `tailwind-utilities.mdx` → `tailwind.mdx`
  - Added new `theming.mdx` (simplified, cross-links to design-token)
  - Updated `installation.mdx` with streamlined content
  - Updated `overview.mdx` with Learning Path table and corrected Package Exports

  **Documentation Conventions** (`docs-contributing/conventions.mdx`)
  - Added "Next Steps" as required section for both Integration and Development docs
  - Added "Next Steps Format" guidance (table vs bullets vs plain text)
  - Fixed rendering issues with example tables

  **Link Consistency**
  - Removed `.mdx` extensions from all internal links for consistency
  - Updated outdated links (e.g., `theme-switching` → `theming`)
  - Fixed broken links in progress logs

  **Sidebar Positions**
  - Verified sequential positioning (0-8 for design-token, 0-6 for web-component)

  **Related PR:** [#38](https://github.com/graezykev/designgreat/pull/38)

  **Author:** @chunman-yeung

## 0.6.1

### Patch Changes

- f4bc7f2: ### Documentation Improvements

  **CSS Import Path Consistency**
  - Updated all CSS imports to use explicit path `@designgreat/lib-web-ui/dist/lib-web-ui.css` for
    universal bundler compatibility (Webpack, Vite, Next.js, Remix, Astro, esbuild)
  - Affected files: `installation.mdx`, `framework-guides.mdx`, `font-setup.mdx`

  **Files Updated:**
  - `docs-web-component/guides/installation.mdx` - Updated Basic Setup, "What Gets Imported" tip,
    and Troubleshooting sections
  - `docs-web-component/guides/framework-guides.mdx` - Updated Next.js (App/Pages Router), Vite,
    Create React App, and Astro examples
  - `docs-web-component/guides/font-setup.mdx` - Updated Quick Start and Google Fonts alternative
    sections

  **Related PR:** [#37](https://github.com/graezykev/designgreat/pull/37)

  **Author:** @chunman-yeung

## 0.6.0

### Minor Changes

- b2e07b8: **Major documentation restructure with improved naming conventions and URL consistency**

  ## Breaking Changes (URL Paths)
  - `/docs/` → `/design-token/` (Design Token documentation)
  - `/components/` → `/web-component/` (Web Component documentation)

  ## Folder Renames

  ### Documentation Folders
  - `docs/` → `docs-design-token/`
  - `docs-components/` → `docs-web-component/`
  - `docs/tutorial/` → `docs-design-token/guides/`
  - `docs/colors/` → `docs-design-token/colors/`

  ### Contributing Folders
  - `design-tokens-development/` → `design-token-development/`
  - `component-library-development/` → `web-component-development/`
  - `documentation-site/` → `documentation-site-development/`

  ### Sidebar Files
  - `sidebars.ts` → `sidebars-design-token.ts`
  - `sidebars-components.ts` → `sidebars-web-component.ts`

  ## Naming Conventions Established

  ### Singular/Plural Rule
  - Nouns (subjects) determine plural/singular: "Guides" (collection), "Guide" (single page)
  - Modifiers stay singular: "Design Token", "Web Component", "Color Token"

  ### Examples
  - ✅ "Design Token Guides" (plural noun)
  - ✅ "Design Token Development" (singular modifier)
  - ❌ "Design Tokens Guides" (modifier should be singular)

  ## Documentation Improvements
  - Added `conventions.mdx` documenting naming rules and templates
  - Fixed all `sidebar_position` fields (removed decimals, resolved conflicts)
  - Updated all internal links to use new URL paths
  - Updated ESLint config paths for new folder structure

  **Related PR:** [#36](https://github.com/graezykev/designgreat/pull/36)

  **Author:** @chunman-yeung

### Patch Changes

- Updated dependencies [b2e07b8]
- Updated dependencies [b2e07b8]
  - @designgreat/lib-web-ui-design-token@0.5.1
  - @designgreat/lib-web-ui@0.6.1

## 0.5.0

### Minor Changes

- 81e67b6: Comprehensive documentation restructure and color documentation expansion

  ## New Features

  ### Color Documentation System (NEW)
  - Added complete color documentation suite under `/docs/colors/`
    - `base-colors.mdx` - Foundation grayscale and saturated color palettes
    - `accent-colors.mdx` - Theme-aware accent color system with emphasis levels
    - `alpha-colors.mdx` - Transparent color tokens with alpha channels
    - `primary-brand-colors.mdx` - Brand identity colors with categories
    - `secondary-tertiary-quartus.mdx` - Supporting brand colors
    - `semantic-colors.mdx` - Semantic color mappings (info, success, warning, error)
    - `core-concepts-theme-awareness.mdx` - Theme-aware color system explained with interactive
      diagrams
    - Shortcut documentation: `text.mdx`, `background.mdx`, `border.mdx`, `shadow.mdx`,
      `interactive-state.mdx`

  ### Interactive Components
  - Added `<CopyableCode>` component for one-click CSS variable copying
  - Enhanced color demo blocks with theme preview capabilities

  ### Documentation Tools
  - Added `audit-color-docs.ts` - Comprehensive documentation auditing tool
    - Validates table structure integrity
    - Checks CSS variable correctness
    - Detects hardcoded colors in demos
    - Validates token references and mappings
    - Verifies alpha values and gradient levels

  ## Breaking Changes

  ### Folder Restructure
  - **Renamed**: `/docs/design-tokens/` → `/docs/tutorial/`
    - Better reflects content purpose (getting started, integration guides)
    - All internal links updated automatically

  ### Removed Files
  - Removed example tutorial files (`tutorial-basics`, `tutorial-extras`)
  - Cleaned up unused documentation scaffolding

  ## Improvements

  ### Documentation Quality
  - Updated all internal links to use new `/docs/tutorial/` path
  - Enhanced navbar with direct link to tutorial overview
  - Improved CSS custom properties for better documentation rendering
  - Added comprehensive ESLint ignore patterns for documentation files

  ### Developer Experience
  - Added TypeScript-based documentation audit tooling
  - Improved documentation maintainability with automated validation
  - Better organized content structure with clear separation between tutorial and reference docs

  ## Migration Guide

  If you have bookmarked or linked to old documentation paths:
  - `/docs/design-tokens/*` → `/docs/tutorial/*`
  - All other documentation paths remain unchanged

  **Related PR:** [#34](https://github.com/graezykev/designgreat/pull/34)

  **Author:** @chunman-yeung

### Patch Changes

- Updated dependencies [81e67b6]
- Updated dependencies [81e67b6]
  - @designgreat/lib-web-ui@0.5.7
  - @designgreat/lib-web-ui-design-token@0.4.6
  - @designgreat/design-token-support@0.2.9

## 0.4.4

### Patch Changes

- daed5c0: Refined README.md to improve clarity and remove redundant information
  - Removed unnecessary Quick Start section
  - Removed Blog Setup link from Additional Resources
  - Fixed contributing documentation link to point to correct path
  - Removed duplicate Contributing section

  **Related PR:** [#33](https://github.com/graezykev/designgreat/pull/33)

  **Author:** @chunman-yeung

## 0.4.3

### Patch Changes

- cad7912: **Enhance documentation structure and fix link consistency**

  ### Documentation Structure Improvements
  - Enhanced "Quick Links" sections in Design Tokens Guide and Web Components Guide with DocCardList
    visual cards
  - Added `description` frontmatter to multiple MDX files for better card display
  - Improved cross-linking between consumer docs and contributor docs

  ### Link Consistency Fixes
  - Standardized all relative links in `docs-contributing/design-tokens-development/` to remove
    `.mdx` extensions
  - Updated 7 files: troubleshooting, testing-validation, development-workflow, build-system,
    token-authoring, architecture
  - Fixed link in `documentation-site/writing-docs.mdx` to use consistent format
  - Verified all links working correctly with zero broken links detected

  ### Related Resources Updates
  - Updated "Related Resources" sections to include Component Library Development Guide
  - Ensured consistent navigation patterns across all documentation sections

  **Related PR:** [#31](https://github.com/graezykev/designgreat/pull/31)

  **Author:** @chunman-yeung

- cad7912: **Improve Web Components Guide maintainability**
  - Removed "Component Documentation" section from Web Components Guide to avoid laborious
    maintenance as the component library grows
  - Added "Contributing to Web Components" section linking to the Component Library Development
    Guide
  - Enhanced "Related Resources" to include Component Library Development Guide

  This change eliminates the need to manually maintain a list of components in the overview page,
  reducing maintenance burden as the library scales.

  **Related PR:** [#31](https://github.com/graezykev/designgreat/pull/31)

  **Author:** @chunman-yeung

- Updated dependencies [cad7912]
- Updated dependencies [cad7912]
  - @designgreat/lib-web-ui-design-token@0.4.5
  - @designgreat/lib-web-ui@0.5.6
  - @designgreat/design-token-support@0.2.8

## 0.4.2

### Patch Changes

- bda057c: Migrate blog setup guide and improve documentation structure
  - Migrated `BLOG-FEATURES.md` content into `docs-contributing/features.mdx` under the "Blog"
    section
  - Updated README and CHANGELOG references to point to the new documentation location
  - Improved ESLint configuration to ignore all MDX files in `docs-contributing/**/*.mdx`,
    `docs/design-tokens/**/*.mdx`, and `docs-components/**/*.mdx`
  - All blog setup instructions now accessible directly in the Contributing documentation section

  **Related PR:** [#30](https://github.com/graezykev/designgreat/pull/30)

  **Author:** @chunman-yeung

- Updated dependencies [bda057c]
  - @designgreat/lib-web-ui@0.5.5

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
