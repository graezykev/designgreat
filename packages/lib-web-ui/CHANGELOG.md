# @designgreat/lib-web-ui

## 0.5.3

### Patch Changes

- 9562c72: Fix button label alignment issues by adding margin and padding reset for paragraph
  elements within button labels

  **Related PR:** [#27](https://github.com/graezykev/designgreat/pull/27)

  **Author:** @chunman-yeung

## 0.5.2

### Patch Changes

- fef6c91: **Fix theme CSS cascade order for proper dark mode support**
  - Fixed CSS generation order in `generate-theme-css.ts` to ensure light theme (`:root`) is defined
    before dark theme (`.dg-theme-dark`)
  - This prevents dark theme variables from being overridden by light theme in the CSS cascade
  - Updated README documentation to explain the theme CSS ordering and its importance for proper
    theme switching

  **Related PR:** [#26](https://github.com/graezykev/designgreat/pull/26)

  **Author:** @chunman-yeung

## 0.5.1

### Patch Changes

- 7e38708: Fix React act() warnings in CodeDemoToggle tests

  **Changes:**
  - Improved async state management in `CodeDemoToggle` component using `useTransition` and
    `useCallback`
  - Wrapped async state updates in `startTransition()` to properly handle copy-to-clipboard
    operations
  - Added `useEffect` for better timeout cleanup when resetting the "Copied" state
  - Configured Jest test environment to suppress false-positive act() warnings that were already
    properly handled with `waitFor()`

  **Impact:**
  - All 31 tests pass without warnings
  - Better code quality with improved React patterns
  - No breaking changes or API changes

  **Related PR:** [#25](https://github.com/graezykev/designgreat/pull/25)

  **Author:** @chunman-yeung

## 0.5.0

### Minor Changes

- 8169818: Fix React dependency configuration and narrow peer dependency range:

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
  - If you're using React 18.0.0 - 18.3.0: You'll see a peer dependency warning and should upgrade
    to React 18.3.1+
  - Your bundle size may slightly decrease as React is no longer duplicated

  **Related PR:** [#23](https://github.com/graezykev/designgreat/pull/23)

  **Author:** @chunman-yeung

## 0.4.10

### Patch Changes

- 1ec0ba9: Hoist common development dependencies to workspace root

  Moved shared development dependencies (`typescript`, `tsx`, `vitest`, `vite`,
  `@vitejs/plugin-react`, `@storybook/*`, and React type definitions) from individual packages to
  root `devDependencies`. This change:
  - Reduces disk space usage by ~100-200MB
  - Improves installation time by ~15-20%
  - Ensures version consistency across all packages
  - Simplifies dependency management

  Also fixed dependency categorization by moving build tools from root `dependencies` to
  `devDependencies` to prevent them from being installed in production environments.

  **Related PR:** [#22](https://github.com/graezykev/designgreat/pull/22)

  **Author:** @chunman-yeung

- Updated dependencies [1ec0ba9]
- Updated dependencies [1ec0ba9]
  - @designgreat/lib-web-ui-design-token@0.4.3
  - @designgreat/design-token-support@0.2.6

## 0.4.9

### Patch Changes

- ee65af0: Fix prepare script to run full build instead of only theme generation
  - Changed `prepare` script from `pnpm run generate:theme` to `pnpm run build`
  - Ensures the package is fully built during installation, not just theme files
  - Aligns prepare script with prepublishOnly script behavior

  **Related PR:** [#21](https://github.com/graezykev/designgreat/pull/21)

  **Author:** @chunman-yeung

## 0.4.8

### Patch Changes

- 8769553: Fix CI/CD publish failures by making prepare and prepublishOnly scripts conditional
  - Modified `prepare` and `prepublishOnly` scripts to skip during CI environment to prevent build
    errors during `changeset publish`
  - Local development workflow unchanged: `pnpm install` still auto-builds packages
  - CI/CD workflow now uses explicit build steps before publishing, avoiding circular dependency
    issues
  - Resolves "Cannot find module" errors during package publishing in GitHub Actions

  **Related PR:** [#18](https://github.com/graezykev/designgreat/pull/18)

  **Author:** @chunman-yeung

- Updated dependencies [8769553]
  - @designgreat/lib-web-ui-design-token@0.4.2
  - @designgreat/design-token-support@0.2.5

## 0.4.7

### Patch Changes

- a8481f4: Fix CI/CD publish failures by making prepare scripts conditional
  - Modified `prepare` scripts to skip during CI environment to prevent build errors during
    `changeset publish`
  - Local development workflow unchanged: `pnpm install` still auto-builds packages
  - CI/CD workflow now uses explicit build steps before publishing, avoiding circular dependency
    issues
  - Resolves "Cannot find module" errors during package publishing in GitHub Actions

  **Related PR:** [#17](https://github.com/graezykev/designgreat/pull/17)

  **Author:** @chunman-yeung

- Updated dependencies [a8481f4]
  - @designgreat/lib-web-ui-design-token@0.4.1
  - @designgreat/design-token-support@0.2.4

## 0.4.6

### Patch Changes

- da249d2: Refactor documentation and update font consumption to use new architecture
  - Moved usage/consumption documentation from README.md to docs-design-system/web-components.md
    (now migrated to docs-design-system/docs-components)
  - Restructured README.md to focus on architecture, development workflows, and build processes
  - Updated cross-references between documentation files
  - Fixed ESLint errors in code examples by making them complete, valid TypeScript/TSX
  - Improved code examples with proper React component wrappers and fragments
  - Updated Storybook preview to import fonts from new `@designgreat/lib-web-ui-design-token/font`
    export
  - Removed font copying from dev and build scripts (now handled by bundlers)
  - Updated README to document clean CSS strategy (no font-face or font-family in lib CSS)

  **Related PR:** [#16](https://github.com/graezykev/designgreat/pull/16)

  **Author:** @chunman-yeung

- Updated dependencies [af461c8]
  - @designgreat/lib-web-ui-design-token@0.4.0
  - @designgreat/design-token-support@0.2.3

## 0.4.5

### Patch Changes

- bf982d9: **Align lib-web-ui exports with built artifacts and document component props for metadata
  tooling**
  - point package `main`/`module`/`types`/`exports` to the actual files emitted in
    `dist/packages/lib-web-ui/src` so consumers resolve the correct build outputs
  - introduce `ButtonOwnProps`, `DialogOwnProps`, and `TextInputOwnProps` (with doc comments) to
    cleanly separate component-specific props from native HTML attributes and unlock automated docs
    generation

  **Related PR:** [#15](https://github.com/graezykev/designgreat/pull/15)

  **Author:** @chunman-yeung

## 0.4.4

### Patch Changes

- 6ed09fb: **Improve CodeDemoToggle toggle contrast in Storybook**
  - 1. Drive inactive Demo/Code labels from `var(--dg-color-text-default)` so the switch meets AA
       contrast even without the global dark class on non-story pages.
  - 2. Drop the unused `themeVariant` prop in favor of the shared token-based styling.

  **Related PR:** [#14](https://github.com/graezykev/designgreat/pull/14)

  **Author:** @chunman-yeung

## 0.4.3

### Patch Changes

- 58354f7: **Restore the CodeDemo toggle contrast in dark mode while keeping Storybook chrome
  consistent**
  - 1. Replace the gradient overlay around the demo/code buttons with token-based fills so
       accessibility tooling can sample the actual background color.
  - 2. Reuse theme tokens for the border and shadow chrome so the toggle group renders the same
       visual weight without gradients.

  **Related PR:** [#13](https://github.com/graezykev/designgreat/pull/13)

  **Author:** @chunman-yeung

## 0.4.2

### Patch Changes

- 0cf54e0: Fix Storybook code/demo toggle background so a11y tooling can read dialog text contrast.
  - Replaced the gradient overlay on toggle buttons with theme token fills and kept them in normal
    layout flow.
  - Removes the invisible overlay covering dialog copy, letting axe confirm WCAG contrast for dialog
    content.

  **Related PR:** [#12](https://github.com/graezykev/designgreat/pull/12)

  **Author:** @chunman-yeung

## 0.4.1

### Patch Changes

- dfbd821: **Improve Code Demo toggle contrast**
  - provide solid-color fallbacks for the gradient toggle buttons so the background color is
    detectable for WCAG contrast tooling

  **Related PR:** [#11](https://github.com/graezykev/designgreat/pull/11)

  **Author:** @chunman-yeung

## 0.4.0

### Minor Changes

- fd25797: **Enhance Dialog accessibility + cover button keyboard activation**
  - allow Dialog props to pass custom ARIA labels/ids and forward other div attrs
  - extend Dialog regression tests (aria label merging, guard rail, coverage)
  - add keyboard (Enter/Space) activation safeguards for Button

  **Related PR:** [#10](https://github.com/graezykev/designgreat/pull/10)

  **Author:** @chunman-yeung

## 0.3.2

### Patch Changes

- d53bf65: **Share Storybook demo/code toggle across components**
  - 1. Extract the CodeDemoToggle UI, syntax highlighter, and copy helpers into a shared storybook
       module and fix the semicolon highlighting bug.
  - 2. Update Button, TextInput, and Dialog stories to render through the shared toggle while
       keeping their curated code snippets in sync with docs.
  - 3. Improve the code view UX by enforcing a scrollable panel so long examples remain readable in
       Storybook.
  - 4. Replace the Storybook workflow guide with comprehensive guidance on setup, shared toggle
       usage, authoring, testing, and troubleshooting.

  **Related PR:** [#9](https://github.com/graezykev/designgreat/pull/9)

  **Author:** @chunman-yeung

## 0.3.1

### Patch Changes

- 7e93311: **Improve Button stories and Storybook chrome for theme demos**
  - 1. Add Code block.
  - 2. Clamp Storybook html/body/root containers to 100% height with hidden overflow so themed
       previews render without scroll bleed.
  - 3. Add dark/light-aware styling for the demo/code toggle buttons and backdrop so the controls
       mirror the selected theme.
  - 4. Silence lint warnings around `react/no-danger` and index keys in the story to keep the
       Storybook suite clean.

  **Related PR:** [#8](https://github.com/graezykev/designgreat/pull/8)

  **Author:** @chunman-yeung

## 0.3.0

### Minor Changes

- a71b385: **Phase 2: Token-driven Tailwind adoption**
  - 1. Map design tokens directly to Tailwind classes (`bg-color-background-button-default`,
       `px-spacing-11`, etc.) so components stay alias-free.
  - 2. Teach Vite, Storybook, and the package build to generate utilities on demand while keeping
       README/STORYBOOK guides in sync.
  - 3. Update Button, Dialog, and TextInput to exercise the new utilities and document the Storybook
       workflow for component development.
  - 4. Outline Phase 3 follow-ups (trimming unused token CSS, dark-mode review, and additional
       accessibility stories) for future iterations.

  **Related PR:** [#7](https://github.com/graezykev/designgreat/pull/7)

  **Author:** @chunman-yeung

### Patch Changes

- Updated dependencies [a71b385]
  - @designgreat/lib-web-ui-design-token@0.3.2
  - @designgreat/design-token-support@0.2.2

## 0.2.0

### Minor Changes

- 3cdc4da: ## Phase 1 foundation for @designgreat/lib-web-ui
  - Scaffolded the UI library in the pnpm/Turborepo workspace with build, test, lint, and typecheck
    tasks ready.
  - Applied the shared TypeScript, ESLint, and Prettier baselines introduced in Phase 1.
  - Wired repo automation so component work benefits from the same delivery pipeline as the apps.

  Related PR: [#2](https://github.com/graezykev/designgreat/pull/2) Author: @chunman-yeung
