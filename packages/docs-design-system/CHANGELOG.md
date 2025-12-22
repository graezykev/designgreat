# @designgreat/docs-design-system

## 0.9.0

### Minor Changes

- a3ebdc2: Add Step 13: MDX Text Wrapping check and swap button hover/active colors

  **Problem Solved:** Docusaurus automatically wraps text content within JSX elements in `<p>` tags,
  causing unwanted paragraph margins and UI issues. This happens because MDX treats plain text
  inside JSX as Markdown content.

  **Solution:** Wrap all text content in JSX curly braces: `{'text'}`. This explicitly tells MDX to
  treat the content as a JavaScript expression, preventing Markdown processing and unwanted `<p>`
  tags.

  **New Files Created:**
  - `MDX_TEXT_WRAPPING_GUIDE.md`: Comprehensive guide with examples, correct/incorrect patterns, and
    checklist for wrapping text in `{'text'}` pattern
  - `check-tokens-step13.js`: New check script that validates all text content in JSX elements is
    properly wrapped
  - `MDX_TEXT_WRAPPING_UPDATE_SUMMARY.md`: Summary document of all changes made

  **Files Updated:**
  - `PROMPT_TEMPLATE.md`: Added Step 13 to the documentation review process (updated from 12-step to
    13-step)
  - `run-all-checks.js`: Added Step 13 to the list of checks
  - `README.md`: Updated to reflect 13-step process and added reference to
    MDX_TEXT_WRAPPING_GUIDE.md
  - `src/css/custom.css`: Swapped button hover/active background colors for better UX

  **What Step 13 Checks:**
  - Text content in demo sections (`<TabItem value="demo">`)
  - Text content in code sections (`<TabItem value="code">`)
  - All text elements: buttons, links, labels, spans, divs, paragraphs, headings, etc.
  - Special characters (arrows, symbols) that should also be wrapped

  **Button State Colors Update:**

  Updated button interaction colors at the token level:
  - **Subtle buttons**: Adjusted hover and focus colors
    - Hover: Changed from `{color.alpha.neutral.3}` to `{color.alpha.neutral.4}` (darker, more
      visible)
    - Focus: Changed from `{color.alpha.neutral.4}` to `{color.alpha.neutral.3}` (lighter, clearer
      focus state)
  - **Secondary buttons**: Made active state darker
    - Hover: Remains `{color.secondary.bold}` (unchanged)
    - Active: Changed from `{color.secondary.subtle}` to `{color.secondary.bolder}` (darker, feels
      pressed down)
  - **Primary buttons**: Unchanged

  This creates a more intuitive interaction pattern where active states feel darker (pressed down)
  across all button variants.

  **Files Updated:**
  - `packages/docs-design-system/docs-design-token/colors/shortcuts/interactive-state.mdx`: Updated
    Token Structure section to reflect new token values
  - `packages/docs-design-system/src/css/custom.css`: Updated base button hover/active CSS (now uses
    new token values from lib-design-token)

  **Note:** Token changes are documented in a separate changeset for
  `@designgreat/lib-design-token`.

  **Integration:**

  Step 13 follows the same iterative workflow as other steps and integrates seamlessly with the
  existing documentation review process. All demo and code sections should now use the `{'text'}`
  pattern to prevent unwanted `<p>` tag wrapping.

  **Related PR:** [#52](https://github.com/graezykev/designgreat/pull/52)

  **Author:** @chunman-yeung

### Patch Changes

- Updated dependencies [669a56f]
  - @designgreat/lib-design-token@0.10.0
  - @designgreat/lib-web-component@0.7.6

## 0.8.0

### Minor Changes

- ef6ff01: Add comprehensive design structure documentation

  **New Files Created:**

  **DESIGN_STRUCTURES.md** (1,469 lines): Comprehensive design structure documentation for all major
  components:
  - Button (with all variants, states, modifiers)
  - Spinner
  - Link
  - Tag (with removable variant)
  - Badge
  - Input
  - Checkbox
  - Toggle
  - Radio
  - Select
  - Dropdown
  - Tab
  - List
  - Alert
  - Tooltip
  - Nav Pill
  - Interactive Card
  - **Navigation** (NEW): Complete structure for `.dg-nav`, `.dg-nav-primary`, `.dg-nav-secondary`,
    `.dg-nav-tertiary` with all states (hover, focus, active, selected) and BEM-compliant modifier
    classes

  **ADDITIONAL_DESIGN_STRUCTURES.md** (361 lines): Additional design structures not covered in main
  file:
  - `.dg-app-bar-nav` structure
  - Various card components (`.dg-text-card`, `.dg-card-subtle`, `.dg-card-accent-info`, etc.)
  - Demo-specific card structures

  **Key Features:**
  - Complete component hierarchies with all states and modifiers
  - Token references for all properties
  - BEM-compliant naming conventions
  - Usage examples for each component
  - Navigation structure includes combined state rules (`:focus:hover`, `:focus:active`)
  - Breadcrumb structure with separator handling

  **Location:**
  - Files moved from root to `packages/docs-design-system/` for better organization
  - Part of design system documentation package

  **Purpose:**
  - Provides comprehensive reference for component structures
  - Documents all CSS classes, states, and modifiers
  - Serves as design system specification
  - Enables consistent component implementation

  **Related PR:** [#51](https://github.com/graezykev/designgreat/pull/51)

  **Author:** @chunman-yeung

- ef6ff01: Improve code section consistency across documentation (Step 12 compliance)

  **Issue Found:** Step 12 check identified inconsistencies between demo HTML and code sections
  across multiple documentation files.

  **Changes:**
  - Update code sections to match demo HTML exactly
  - Ensure all component classes shown in demos are documented in code sections
  - Add missing CSS rules to code sections
  - Fix class name inconsistencies (e.g., single-dash vs double-dash modifiers)
  - Update button state examples to use BEM-compliant modifier classes (`--hover`, `--focus`,
    `--active`, `--disabled`)

  **Files Modified:**
  - `docs-design-token/colors/shortcuts/interactive-state.mdx`: Updated button state demos and code
    sections
  - `docs-design-token/colors/shortcuts/text.mdx`: Updated navigation demos and code sections
  - `docs-design-token/colors/shortcuts/background.mdx`: Updated code sections
  - `docs-design-token/colors/shortcuts/border.mdx`: Updated code sections
  - `docs-design-token/colors/shortcuts/shadow.mdx`: Updated code sections
  - Multiple other documentation files: Code section updates for consistency

  **Compliance:**
  - Ensures code sections are complete and consistent with demos (Step 12 requirement)
  - Provides accurate code examples for developers
  - Maintains demo-code consistency across all documentation

  **Related PR:** [#51](https://github.com/graezykev/designgreat/pull/51)

  **Author:** @chunman-yeung

- ef6ff01: Comprehensive documentation updates from 12-step review process

  **Overview:** This changeset includes comprehensive documentation improvements identified and
  fixed during the 12-step documentation review process.

  **Major Updates:**

  **Token Documentation:**
  - Update token references to use consistent naming (e.g., `color.primary.DEFAULT` instead of
    `color.primary.default`)
  - Fix token reference values in tables (e.g., active state now correctly references
    `{color.primary.bolder}` instead of `{color.primary.subtle}`)
  - Update use case descriptions for clarity (e.g., "Subtle emphasis states" instead of
    "Active/pressed states")
  - Add missing token documentation across multiple pages

  **Table Structure:**
  - Reorganize token tables for better clarity
  - Add missing columns and values
  - Fix reference column values
  - Improve table formatting and consistency

  **Code Examples:**
  - Update code examples to use correct token references
  - Fix CSS variable names in examples
  - Ensure code examples match actual implementation
  - Add missing code examples where needed

  **Files Modified (24 files):**
  - `colors/accent-colors.mdx`: Token reference updates
  - `colors/alpha-colors.mdx`: Minor formatting updates
  - `colors/base-colors.mdx`: Documentation improvements
  - `colors/core-concepts-theme-awareness.mdx`: Added examples
  - `colors/primary-brand-colors.mdx`: Token reference fixes, table reorganization
  - `colors/secondary-tertiary-quartus.mdx`: Content updates
  - `colors/semantic-colors.mdx`: Major updates (178 insertions)
  - `colors/shortcuts/background.mdx`: Code section updates
  - `colors/shortcuts/border.mdx`: Major updates (187 insertions)
  - `colors/shortcuts/interactive-state.mdx`: Major updates (830 insertions)
  - `colors/shortcuts/shadow.mdx`: Updates (137 insertions)
  - `colors/shortcuts/text.mdx`: Major updates (537 insertions)
  - `effects/border-radius.mdx`: Updates
  - `effects/elevation.mdx`: Updates
  - `effects/gradients.mdx`: Added content
  - `guides/api/reference.mdx`: Updates
  - `motion/duration.mdx`: Added content
  - `motion/easing.mdx`: Added content
  - `motion/transitions.mdx`: Added content
  - `spacing/pixel-values.mdx`: Updates
  - `spacing/semantic-scales.mdx`: Updates (110 insertions)
  - `typography/font-sizes.mdx`: Updates
  - `typography/font-weights.mdx`: Updates
  - `typography/text-spacing.mdx`: Updates (88 insertions)

  **Statistics:**
  - 24 files changed
  - 2,317 insertions
  - 322 deletions

  **Purpose:**
  - Ensures documentation accuracy and consistency
  - Improves developer experience with correct examples
  - Maintains alignment between documentation and implementation
  - Addresses issues found in comprehensive 12-step review

  **Related PR:** [#51](https://github.com/graezykev/designgreat/pull/51)

  **Author:** @chunman-yeung

- ef6ff01: Add navigation link states documentation and demos

  **Changes:**
  - Add hover, focus, active, and selected states for navigation links (`.dg-nav-primary`,
    `.dg-nav-secondary`, `.dg-nav-tertiary`)
  - Add full state demos showing Default, Hover, Focus, Active, Selected states
  - Update code sections to include all navigation state CSS rules
  - Document combined state rules (`:focus:hover`, `:focus:active`) for proper interaction behavior
  - Use new navigation hierarchy tokens (`--dg-color-text-nav-interaction-*`,
    `--dg-color-text-nav-state-selected`)

  **Files Modified:**
  - `docs-design-token/colors/shortcuts/text.mdx`: Added navigation states section with full state
    demos and code examples

  **Purpose:**
  - Documents navigation component interactive states
  - Provides examples for developers using navigation components
  - Ensures consistency with other interactive components (buttons, links, tabs)

  **Related:**
  - Requires navigation tokens from `@designgreat/lib-design-token` package
  - CSS implementation in `custom.css` (separate changeset)

  **Related PR:** [#51](https://github.com/graezykev/designgreat/pull/51)

  **Author:** @chunman-yeung

- ef6ff01: Add comprehensive 12-step documentation review scripts and tooling

  This changeset adds a complete documentation review system with scripts, validation tools, and
  comprehensive documentation.

  **Scripts Created:**
  - 12 step-by-step check scripts (check-tokens-step1.js through step12.js) for automated
    documentation review
  - run-all-checks.js: Run all 12 steps at once (for baseline assessment only)
  - validate-scripts.js: Script health validation tool

  **Documentation Created:**
  - PROMPT_TEMPLATE.md: Complete prompt template for future reviews with iterative step-by-step
    workflow
  - ORIGINAL_NOTES.md: Comprehensive documentation of all step-specific notes, exceptions, and
    instructions from original prompt
  - SCRIPT_ROBUSTNESS.md: Guide for ensuring script reliability, validation checklists, and testing
    strategies
  - COVERAGE_AND_ROBUSTNESS.md: Answers to coverage and robustness questions with validation results
  - REFACTORING_SUMMARY.md: Summary of workflow improvements and refactoring decisions
  - README.md: Usage guide with quick start, workflow explanation, and script structure

  **Organization:**
  - All scripts organized in `packages/docs-design-system/scripts/documentation-review/`
    subdirectory
  - All review reports moved to `docs/progress-logs/` with sequential numbering
    (20-STEP1_FINAL_REPORT.md through 32-STEP1_ISSUES_REPORT.md)
  - Scripts updated with correct path resolution (../../../..) for new directory structure

  **Workflow Philosophy:**
  - Iterative step-by-step approach: Complete each step fully (check → report → fix → review →
    verify → consent) before moving to next step
  - Prevents fixes in one step from introducing issues that would be caught in later steps
  - Explicit "DO NOT fix" and "wait for approval" instructions to prevent premature changes

  **Related PR:** [#51](https://github.com/graezykev/designgreat/pull/51)

  **Author:** @chunman-yeung

### Patch Changes

- ef6ff01: Fix missing disabled state for primary button component

  **Issue Found:** Step 11 check identified that `.dg-btn-primary` was missing disabled state
  patterns, even though demos were using `dg-btn-primary--disabled` class.

  **Fix:**
  - Add `.dg-btn-primary:disabled` pseudo-class rule with disabled styling
  - Add `.dg-btn-primary--disabled` modifier class rule for static demos
  - Both rules use `--dg-color-background-button-state-disabled` token
  - Sets opacity to 0.6 and cursor to not-allowed

  **Compliance:**
  - Ensures primary button has both pseudo-class (`:disabled`) and modifier class (`--disabled`)
    patterns
  - Required for Step 11: Interactive State Patterns compliance
  - Allows both dynamic interaction and static demo states

  **Related PR:** [#51](https://github.com/graezykev/designgreat/pull/51)

  **Author:** @chunman-yeung

- ef6ff01: Fix CSS syntax error and remove inline style in spacing demo

  **Issue Found:** Step 4 check identified an inline style in spacing/semantic-scales.mdx demo, and
  a CSS syntax error was discovered when the dev server failed to compile.

  **CSS Syntax Fix:**
  - Fix orphaned CSS properties in `.dg-spacing-indicator` class
  - Properties (`justify-content`, `color`, `font-size`, `margin-top`, `margin-bottom`) were
    accidentally left outside the class block when adding `.dg-spacing-indicator-height-md`
  - Moved all properties back into `.dg-spacing-indicator` block

  **Inline Style Removal:**
  - Add `.dg-spacing-indicator-height-md` utility class with `height: var(--dg-spacing-stack-md)`
  - Replace inline style `style={{height: 'var(--dg-spacing-stack-md)'}}` in
    spacing/semantic-scales.mdx demo
  - Update code section in MDX to reflect the change

  **Compliance:**
  - Removes inline style violation (Step 4 requirement)
  - Uses CSS class with design token instead of inline style
  - Maintains functionality while following best practices

  **Related PR:** [#51](https://github.com/graezykev/designgreat/pull/51)

  **Author:** @chunman-yeung

- ef6ff01: Update documentation to use BEM-compliant modifier classes

  **Issue Found:** Documentation was using inconsistent modifier class naming (single-dash vs
  double-dash).

  **Changes:**
  - Update all modifier classes from single-dash (`dg-btn-primary-hover`) to double-dash
    (`dg-btn-primary--hover`) for BEM compliance
  - Update navigation modifier classes to use double-dash (`dg-nav-primary--hover`,
    `dg-nav-primary--focus`, etc.)
  - Ensure all interactive state modifier classes follow BEM standard (`--hover`, `--focus`,
    `--active`, `--disabled`, `--selected`)
  - Update both demo HTML and code sections to reflect BEM-compliant naming

  **Files Modified:**
  - `docs-design-token/colors/shortcuts/interactive-state.mdx`: Button modifier classes
  - `docs-design-token/colors/shortcuts/text.mdx`: Navigation modifier classes
  - Other documentation files: Consistent modifier class naming

  **Compliance:**
  - Follows BEM (Block Element Modifier) methodology
  - Ensures consistency with CSS implementation
  - Provides accurate examples for developers following BEM conventions

  **Related PR:** [#51](https://github.com/graezykev/designgreat/pull/51)

  **Author:** @chunman-yeung

- ef6ff01: Fix sidebar position conflict in API reference guide

  **Issue Found:** `guides/api/reference.mdx` had `sidebar_position: 1`, conflicting with
  `quick-start.mdx`.

  **Changes:**
  - Change `sidebar_position` from `1` to `9` in `guides/api/reference.mdx`
  - Resolves sidebar navigation conflict
  - Maintains proper ordering in documentation navigation

  **Files Modified:**
  - `docs-design-token/guides/api/reference.mdx`: Sidebar position update

  **Note:** Also added TypeScript/JavaScript usage examples section to this file.

  **Related PR:** [#51](https://github.com/graezykev/designgreat/pull/51)

  **Author:** @chunman-yeung

- ef6ff01: Update button demo code sections to include disabled state (Step 11 compliance)

  **Issue Found:** Step 11 check identified that button demos were using `dg-btn-primary--disabled`
  class but code sections didn't show the corresponding CSS.

  **Changes:**
  - Update code sections in interactive-state.mdx to include `.dg-btn-primary:disabled` and
    `.dg-btn-primary--disabled` CSS rules
  - Ensure code sections match demo HTML for all button states
  - Document both pseudo-class and modifier class patterns for disabled state

  **Files Modified:**
  - `docs-design-token/colors/shortcuts/interactive-state.mdx`: Added disabled state CSS to code
    sections

  **Compliance:**
  - Ensures code sections are complete and consistent with demos (Step 12 requirement)
  - Documents both interactive state patterns (Step 11 requirement)
  - Provides accurate code examples for developers

  **Related PR:** [#51](https://github.com/graezykev/designgreat/pull/51)

  **Author:** @chunman-yeung

- ef6ff01: Fix inline style violations in documentation demos (Step 4 compliance)

  **Issue Found:** Step 4 check identified inline styles in demos that should use CSS classes
  instead.

  **Changes:**
  - Remove inline style `style={{height: 'var(--dg-spacing-stack-md)'}}` from
    spacing/semantic-scales.mdx
  - Replace with CSS class `.dg-spacing-indicator-height-md` for consistency
  - Update code sections in MDX files to reflect CSS class usage instead of inline styles

  **Files Modified:**
  - `docs-design-token/spacing/semantic-scales.mdx`: Removed inline style, added CSS class usage

  **Compliance:**
  - Removes inline style violations (Step 4 requirement)
  - Uses CSS classes with design tokens instead of inline styles
  - Maintains functionality while following best practices

  **Related PR:** [#51](https://github.com/graezykev/designgreat/pull/51)

  **Author:** @chunman-yeung

- ef6ff01: Rename demo-related class names to remove "-demo-" keyword (Step 6 compliance)

  **Issue Found:** Step 6 check identified CSS class names containing "-demo-" keyword that should
  be renamed for consistency.

  **Changes:**
  - Rename `dg-gap-demo` → `dg-gap-showcase` in spacing demos
  - Rename `dg-inset-demo-card` → `dg-inset-showcase-card` in spacing demos
  - Update all references in both demo HTML and code sections
  - Maintain functionality while improving naming consistency

  **Files Modified:**
  - `docs-design-token/spacing/semantic-scales.mdx`: Updated class names from `-demo-` to
    `-showcase-`

  **Compliance:**
  - Removes "-demo-" keyword from class names (Step 6 requirement)
  - Uses more semantic naming (`-showcase-` instead of `-demo-`)
  - Keeps legitimate utility classes (`.color-demo`, `.spacing-demo`) unchanged as they're
    acceptable

  **Related PR:** [#51](https://github.com/graezykev/designgreat/pull/51)

  **Author:** @chunman-yeung

- ef6ff01: Fix token reference values and use case descriptions

  **Issue Found:** Token reference values in documentation tables were incorrect or outdated.

  **Changes:**
  - Fix `color.primary.active.DEFAULT` reference from `{color.primary.subtle}` to
    `{color.primary.bolder}` (active state should be darker than hover)
  - Add missing `color.primary.bolder` token to emphasis table
  - Update use case descriptions for clarity:
    - `color.primary.subtle`: Changed from "Active/pressed states" to "Subtle emphasis states"
    - `color.primary.active.DEFAULT`: Updated description to "Active/pressed state (darker than
      hover)"
  - Update mermaid diagram to reflect correct active state reference (`active: bolder` instead of
    `active: subtle`)

  **Files Modified:**
  - `docs-design-token/colors/primary-brand-colors.mdx`: Token reference fixes and table updates

  **Purpose:**
  - Ensures documentation accurately reflects token relationships
  - Provides correct guidance for developers on token usage
  - Maintains consistency between token values and documentation

  **Related PR:** [#51](https://github.com/graezykev/designgreat/pull/51)

  **Author:** @chunman-yeung

- Updated dependencies [ef6ff01]
  - @designgreat/lib-design-token@0.9.0
  - @designgreat/lib-web-component@0.7.5

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
