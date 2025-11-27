# Design Token Refactoring Plan

## Overview

This document outlines the comprehensive refactoring plan to:

1. Change CSS variable prefix from `--token-` to `--dg-`
2. Change SCSS variable prefix from `$token-` to `$dg-`
3. Use `.dark` selector for dark theme instead of `:root`
4. Make lib-web-ui consume CSS directly from lib-web-ui-design-token
5. Update all documentation and dependents

## Current State Analysis

### Package: `lib-web-ui-design-token`

**Current Behavior:**

- Generates CSS/SCSS files with `--token-` prefix (configured in `config.js` line 79)
- Both light and dark themes use `:root` selector
- Generates JS/TS exports without prefix in JS variable names
- Outputs to `dist/css/{light,dark}/variables.{css,scss}`

**Key Files:**

- `scripts/style-dictionary/config.js` - Style Dictionary configuration
- `scripts/style-dictionary/build-style-dictionary.js` - Build orchestration
- `scripts/style-dictionary/post-build-export.js` - Generates themes.ts

**Generated Outputs:**

- `dist/css/light/variables.css` - Light theme CSS (`:root` selector, `--token-` prefix)
- `dist/css/dark/variables.scss` - Dark theme SCSS (`:root` selector, `$token-` prefix)
- `dist/jsts/light/variables.js` - Light theme JS exports
- `dist/generated/themes.ts` - Runtime theme objects

### Package: `design-token-support`

**Current Behavior:**

- Wraps `lib-web-ui-design-token` and provides theme utilities
- Uses `dg` prefix by default (`DEFAULT_PREFIX = 'dg'` in theme.ts line 13)
- Generates CSS variables with `--dg-` prefix via `createCssVariableMap`
- Generates theme class names like `dg-theme-dark`

**Key Files:**

- `src/theme.ts` - Theme generation utilities

### Package: `lib-web-ui`

**Current Behavior:**

- Uses `design-token-support` to generate `designgreat-theme.css`
- Script: `scripts/generate-theme-css.ts`
- Generated file: `src/styles/designgreat-theme.css`
- This file already uses `:root` for light and `.dg-theme-dark` for dark
- All components reference `--dg-` variables (correct!)
- Tailwind config uses `--dg-` variables (correct!)

**Key Files:**

- `scripts/generate-theme-css.ts` - Generates theme CSS
- `src/styles/designgreat-theme.css` - Generated theme file
- `tailwind.config.ts` - Tailwind configuration

### Package: `docs-design-system`

**Current Behavior:**

- Imports `lib-web-ui.css` which contains the generated theme
- Maps Docusaurus Infima variables to `--dg-` tokens
- Documentation mentions both `--token-` (old) and `--dg-` (new) prefixes

**Key Files:**

- `src/css/custom.css` - Uses `--dg-` variables (correct!)
- `docs/tutorial/css-integration.mdx` - Docs mention `--token-` prefix (needs update)
- Multiple color docs files reference `--dg-` variables

## Problem Statement

The current system has **two parallel approaches**:

1. **Direct CSS Import (old, inconsistent):**
   - `lib-web-ui-design-token` generates CSS with `--token-` prefix
   - Both themes use `:root` selector (causes conflicts!)
   - Documented in `css-integration.mdx` Option 2

2. **Design Token Support (new, correct):**
   - `design-token-support` wraps tokens and generates `--dg-` prefix
   - Light theme uses `:root`, dark theme uses `.dg-theme-dark`
   - Used by `lib-web-ui` and works correctly

**Issue:** The direct CSS output from `lib-web-ui-design-token` is outdated and conflicts with the
newer `design-token-support` approach.

## Refactoring Goals

### Primary Goals

1. **Unify token naming:** Make `lib-web-ui-design-token` generate `--dg-` prefix by default
2. **Fix dark theme selector:** Change dark theme CSS from `:root` to `.dark` or `.dg-theme-dark`
3. **Simplify consumption:** Allow direct CSS import from `lib-web-ui-design-token` with proper
   selectors
4. **Update documentation:** Reflect the unified approach across all docs

### Secondary Goals

1. Make `lib-web-ui` optionally consume CSS directly from `lib-web-ui-design-token`
2. Remove redundant theme generation in `lib-web-ui` (or keep as optional)
3. Ensure all component examples use correct variables

## Detailed Refactoring Steps

### Phase 1: Update lib-web-ui-design-token Generation

#### 1.1 Update Style Dictionary Config

**File:** `packages/lib-web-ui-design-token/scripts/style-dictionary/config.js`

**Changes:**

```javascript
// Line 79: Change prefix from 'token' to 'dg'
css: {
  // ...
  prefix: 'dg',  // Changed from 'token'
  // ...
}
```

**Impact:**

- All generated CSS variables will use `--dg-` prefix
- All generated SCSS variables will use `$dg-` prefix

#### 1.2 Add Dark Theme Selector

**File:** `packages/lib-web-ui-design-token/scripts/style-dictionary/config.js`

**Approach:** We need to make Style Dictionary generate different selectors for different themes.

**Option A (Simpler):** Add theme-specific selector in config

```javascript
export default function getStyleDictionaryConfig(theme, StyleDictionary) {
  // ...
  return {
    // ...
    platforms: {
      css: {
        // ...
        // Add theme-specific options
        options: {
          outputReferences: true,
          selector: theme === 'dark' ? '.dark' : ':root'
        },
        files: [
          {
            destination: 'variables.scss',
            format: 'scss/variables',
            options: {
              selector: theme === 'dark' ? '.dark' : null // SCSS doesn't use selector
            }
          },
          {
            destination: 'variables.css',
            format: 'css/variables',
            options: {
              selector: theme === 'dark' ? '.dark' : ':root'
            }
          }
        ]
      }
    }
  }
}
```

**Option B (More control):** Register custom format that respects selector

```javascript
StyleDictionary.registerFormat({
  name: 'css/variables-with-selector',
  format({ dictionary, options }) {
    const selector = options.selector || ':root'
    const vars = dictionary.allTokens.map((token) => `  ${token.name}: ${token.value};`).join('\n')
    return `${selector} {\n${vars}\n}\n`
  }
})
```

**Recommendation:** Use **Option B** for better control and consistency.

#### 1.3 Update SCSS Generation

SCSS variables don't use selectors, but we should ensure they're properly prefixed. The current
setup should work once prefix is changed to 'dg'.

### Phase 2: Update lib-web-ui

#### 2.1 Add Direct CSS Import Option

**File:** `packages/lib-web-ui/package.json`

**Changes:**

- Consider if we want to keep the current generated approach or switch to direct import
- Current approach (generate via script) is more flexible
- Direct import would be simpler but less customizable

**Recommendation:** Keep current approach but document both options.

#### 2.2 Update Generation Script

**File:** `packages/lib-web-ui/scripts/generate-theme-css.ts`

No changes needed - already uses `design-token-support` which will pick up the new prefix
automatically.

#### 2.3 Update Tailwind Config

**File:** `packages/lib-web-ui/tailwind.config.ts`

Should work as-is since it reads from the JS/TS exports (not affected by CSS prefix). However,
verify the color resolution logic.

### Phase 3: Update Documentation

#### 3.1 Update CSS Integration Guide

**File:** `packages/docs-design-system/docs/tutorial/css-integration.mdx`

**Changes:**

````mdx
## Option 2: Direct CSS Import (Single Theme Only)

**If you only need ONE theme** (no switching), you can import the raw CSS directly:

```css
/* Import font-face definitions (once, shared across all themes) */
@import '@designgreat/lib-web-ui-design-token/font';

/* Import ONE theme's variables */
@import '@designgreat/lib-web-ui-design-token/css/light';
/* OR */
@import '@designgreat/lib-web-ui-design-token/css/dark';

body {
  background: var(--dg-color-background-default); /* Changed from --token- */
  color: var(--dg-color-text-default); /* Changed from --token- */
}
```
````

:::warning Theme Selector Changes

- Light theme uses `:root` selector (works globally)
- Dark theme uses `.dark` selector (requires wrapper element)
- If using dark theme CSS directly, wrap your app with `<div class="dark">` :::

````

#### 3.2 Update All Color Documentation

**Files to Update:**
- `docs/colors/*.mdx` - 12 files
- `docs-components/guides/*.mdx` - 7 files

Search and confirm all use `--dg-` prefix (they already do based on grep results).

#### 3.3 Update Component Examples

**Files:**
- `docs-components/button/*.mdx`
- `docs-components/dialog/*.mdx`
- `docs-components/text-input/*.mdx`

Verify they use `--dg-` variables.

### Phase 4: Testing & Verification

#### 4.1 Rebuild All Packages

```bash
# From workspace root
pnpm run clean
pnpm install
pnpm run build
````

#### 4.2 Verify Generated Files

Check these generated files:

- `packages/lib-web-ui-design-token/dist/css/light/variables.css` - Should have `:root` with `--dg-`
- `packages/lib-web-ui-design-token/dist/css/dark/variables.css` - Should have `.dark` with `--dg-`
- `packages/lib-web-ui-design-token/dist/css/dark/variables.scss` - Should have `$dg-`
- `packages/lib-web-ui/src/styles/designgreat-theme.css` - Should remain unchanged

#### 4.3 Test Theme Switching

1. Build and run docs site
2. Toggle dark mode
3. Verify all colors change correctly
4. Check browser DevTools for CSS variable values

#### 4.4 Test Component Library

1. Build and run Storybook
2. Verify all components render correctly
3. Test theme switching in Storybook

### Phase 5: Documentation Updates

#### 5.1 Update README Files

**Files:**

- `packages/lib-web-ui-design-token/README.md`
- `packages/lib-web-ui/README.md`

Add notes about:

- New `--dg-` prefix
- Dark theme selector change
- Migration guide for existing users

#### 5.2 Add Migration Guide

**New File:** `docs/MIGRATION_TOKEN_PREFIX.md`

Create migration guide for external users:

```md
# Migration Guide: Token Prefix Change

## What Changed

- CSS variables: `--token-*` → `--dg-*`
- SCSS variables: `$token-*` → `$dg-*`
- Dark theme selector: `:root` → `.dark`

## How to Migrate

1. Search and replace in your codebase:
   - `--token-` → `--dg-`
   - `$token-` → `$dg-`

2. If using dark theme CSS directly:
   - Wrap your app with `<div class="dark">` when dark mode is active

3. Update import statements if needed
```

#### 5.3 Update CHANGELOG

Update changelog files for:

- `packages/lib-web-ui-design-token/CHANGELOG.md`
- `packages/lib-web-ui/CHANGELOG.md`
- `packages/shared/design-token-support/CHANGELOG.md`

## Implementation Order

1. **Phase 1.1** - Update CSS prefix in Style Dictionary config
2. **Phase 1.2** - Add dark theme selector support
3. **Phase 1.3** - Rebuild and verify lib-web-ui-design-token outputs
4. **Phase 3.1** - Update CSS integration documentation
5. **Phase 3.2** - Update all color documentation
6. **Phase 4** - Full testing and verification
7. **Phase 5** - Documentation and migration guides

## Breaking Changes

### For Direct CSS Import Users

**Breaking:**

- CSS variable names changed: `--token-*` → `--dg-*`
- Dark theme selector changed: `:root` → `.dark`

**Migration:**

- Search/replace all `--token-` references
- Add `.dark` class wrapper for dark theme

### For design-token-support Users

**Non-breaking:**

- `design-token-support` already uses `--dg-` prefix
- No changes needed

### For lib-web-ui Users

**Non-breaking:**

- `lib-web-ui` already uses `--dg-` prefix via `design-token-support`
- No changes needed

## Risk Assessment

### Low Risk

- ✅ lib-web-ui components (already use `--dg-`)
- ✅ docs site styling (already use `--dg-`)
- ✅ design-token-support package (already generates `--dg-`)

### Medium Risk

- ⚠️ Documentation examples (need updates but no functional impact)
- ⚠️ External users using direct CSS import (breaking change, needs migration guide)

### High Risk

- ❌ None identified

## Rollback Plan

If issues arise:

1. Revert changes to `config.js`
2. Rebuild lib-web-ui-design-token
3. Keep old prefix `token` for one more release
4. Add deprecation warnings

## Post-Refactoring Improvements

### Optional Future Enhancements

1. **Consolidate theme generation:**
   - Consider if lib-web-ui should use direct CSS import instead of generating
   - Would reduce build complexity

2. **Add CSS custom property fallbacks:**
   - Provide fallback values for better resilience

3. **Generate TypeScript types for CSS variables:**
   - Type-safe CSS variable names

4. **Add CSS variable documentation generator:**
   - Auto-generate docs from tokens

## Timeline Estimate

- Phase 1: 2-3 hours (config changes, testing)
- Phase 2: 1-2 hours (lib-web-ui updates)
- Phase 3: 2-3 hours (documentation updates)
- Phase 4: 2-3 hours (testing)
- Phase 5: 1-2 hours (migration docs)

**Total: 8-13 hours**

## Success Criteria

- ✅ All CSS variables use `--dg-` prefix
- ✅ Dark theme uses `.dark` selector
- ✅ All tests pass
- ✅ Docs site renders correctly in both themes
- ✅ Storybook works in both themes
- ✅ Migration guide is complete
- ✅ No console errors or warnings

## Open Questions

1. **Dark theme class name:** Should we use `.dark` or `.dg-theme-dark`?
   - **Recommendation:** Use `.dark` for simplicity (matches common patterns like Tailwind)
   - Currently `design-token-support` generates `.dg-theme-dark`
   - Consider making this configurable or standardizing on `.dark`

2. **SCSS selector:** Should SCSS files have selectors or remain as variables only?
   - **Recommendation:** Keep SCSS as variables only (current behavior is correct)

3. **Backward compatibility:** Should we maintain `--token-` prefix for one version?
   - **Recommendation:** No, clean break with migration guide
   - The internal usage is already using `--dg-`, so impact is minimal

4. **lib-web-ui consumption:** Should lib-web-ui switch to direct CSS import?
   - **Recommendation:** Keep current approach (more flexible)
   - Document both options

## Dependencies

- None external
- Internal: Changes to lib-web-ui-design-token affect lib-web-ui and docs

## Stakeholders

- Library users (breaking change for direct CSS import)
- Component developers (no impact)
- Documentation maintainers (update docs)

---

**Status:** Planning Complete - Ready for Implementation **Last Updated:** 2025-11-26 **Author:** AI
Assistant
