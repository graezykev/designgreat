# Design Token Refactoring Plan - REVISED

## 🎯 Architecture Goal

**Decouple packages for independent use:**

- `lib-web-ui-design-token` → Standalone, production-ready design token package
- `lib-web-ui` → UI components that directly import from design tokens
- Users can choose: tokens only OR tokens + components

## ✅ Confirmed Decisions

1. **Dark theme class:** `.dg-theme-dark` (namespaced)
2. **JSTS naming:** Namespace object structure
3. **Backward compatibility:** Clean break (no migration guide needed)
4. **lib-web-ui consumption:** Direct CSS import from design tokens
5. **SCSS variables:** Keep as plain variables
6. **Documentation:** Update everything
7. **Implementation:** Batch (all changes at once)
8. **Testing:** Comprehensive (build, visual, browser, a11y)

---

## 📋 Implementation Plan

### Phase 1: lib-web-ui-design-token (Make it Standalone-Ready)

#### 1.1 Update Style Dictionary Config

**File:** `packages/lib-web-ui-design-token/scripts/style-dictionary/config.js`

**Changes:**

```javascript
// Change prefix from 'token' to 'dg'
css: {
  // ...
  prefix: 'dg',  // Line 79
  // ...
}
```

**Add custom CSS format with theme-specific selectors:**

```javascript
function registerBaseFormats(StyleDictionary) {
  if (BASE_FORMATS_REGISTERED.has(StyleDictionary)) {
    return
  }

  // Add custom CSS format that supports selectors
  StyleDictionary.registerFormat({
    name: 'css/variables-themed',
    format({ dictionary, options, file }) {
      const selector = options.selector || ':root'
      const prefix = options.prefix || ''

      const variables = dictionary.allTokens
        .map((token) => {
          const name = prefix ? `--${prefix}-${token.path.join('-')}` : `--${token.path.join('-')}`
          return `  ${name}: ${token.value};`
        })
        .join('\n')

      return `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n${selector} {\n${variables}\n}\n`
    }
  })

  // Keep existing formats...
  StyleDictionary.registerFormat({
    name: 'css/font-face'
    // ... existing code
  })

  BASE_FORMATS_REGISTERED.add(StyleDictionary)
}
```

**Update file generation config:**

```javascript
export default function getStyleDictionaryConfig(theme, StyleDictionary) {
  registerBaseTransforms(StyleDictionary)
  registerBaseFormats(StyleDictionary)
  const colorTransformName = registerColorTransform(StyleDictionary, theme)

  const isFirstTheme = theme === 'light'

  // Determine selector based on theme
  const cssSelector = theme === 'dark' ? '.dg-theme-dark' : ':root'

  return {
    source: [`${resolve(srcRoot, 'tokens')}/**/*.json`, `${resolve(srcRoot, 'tokens')}/**/*.js`],
    platforms: {
      // Font platform - unchanged
      ...(isFirstTheme
        ? {
            font: {
              transforms: ['attribute/cti'],
              buildPath: `${resolve(distRoot, 'font')}/`,
              files: [
                {
                  destination: 'font-face.css',
                  filter: (token) => token.type === 'fontFace' && token?.attributes?.fonts,
                  format: 'css/font-face'
                }
              ]
            }
          }
        : {}),

      // CSS platform - theme-specific with proper selectors
      css: {
        transforms: [
          'attribute/cti',
          'name/kebab',
          'css/flatten-composition-properties',
          'time/seconds',
          'html/icon',
          'size/rem',
          'color/css',
          colorTransformName,
          'asset/url',
          'fontFamily/css',
          'cubicBezier/css',
          'strokeStyle/css/shorthand',
          'border/css/shorthand',
          'typography/css/shorthand',
          'transition/css/shorthand',
          'shadow/css/shorthand',
          'line-height',
          'text-shadow/css/shorthand',
          'linear-gradient/shorthand',
          'radial-gradient/shorthand',
          'conic-gradient/shorthand'
        ],
        buildPath: `${resolve(distRoot, 'css', theme)}/`,
        prefix: 'dg',
        files: [
          {
            destination: 'variables.scss',
            format: 'scss/variables'
            // SCSS doesn't need selector
          },
          {
            destination: 'variables.css',
            format: 'css/variables-themed',
            options: {
              selector: cssSelector,
              prefix: 'dg'
            }
          }
        ],
        actions: []
      },

      // JSTS platform - add namespace structure
      jsts: {
        transforms: [
          'attribute/cti',
          'name/pascal',
          'size/rem',
          colorTransformName,
          'color/css',
          'time/seconds',
          'line-height',
          'linear-gradient/shorthand',
          'radial-gradient/shorthand',
          'conic-gradient/shorthand',
          'asset/url'
        ],
        buildPath: `${resolve(distRoot, 'jsts', theme)}/`,
        files: [
          {
            destination: 'variables.js',
            format: 'javascript/esm'
          },
          {
            destination: 'variables.d.ts',
            format: 'typescript/module-declarations'
          }
        ]
      }
    },
    log: {
      warnings: 'warn',
      verbosity: 'verbose',
      errors: {
        brokenReferences: 'throw'
      }
    }
  }
}
```

#### 1.2 Update JSTS Exports to Use Namespace

**File:** `packages/lib-web-ui-design-token/scripts/style-dictionary/post-build-export.js`

**Changes:**

```javascript
// After extracting tokens, wrap in namespace object
const lightTokens = {
  dg: extractTokenValue(asRecord(lightTokensModule.default))
}

const darkTokens = {
  dg: extractTokenValue(asRecord(darkTokensModule.default))
}

const themesSource = `${fileHeader}
export const light = ${JSON.stringify(lightTokens, null, 2)} as const

export const dark = ${JSON.stringify(darkTokens, null, 2)} as const

export const themes = { light, dark } as const

export type ThemeName = keyof typeof themes
`
```

**Expected output structure:**

```typescript
// src/generated/themes.ts
export const light = {
  dg: {
    color: {
      background: {
        default: "#ffffff"
      }
    },
    spacing: { ... }
  }
} as const
```

#### 1.3 Update Package Exports

**File:** `packages/lib-web-ui-design-token/package.json`

Verify exports are correct:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "./font": "./dist/font/font-face.css",
    "./font/*": "./dist/font/*",
    "./css": "./dist/css/combined.css",
    "./css/light": "./dist/css/light/variables.css",
    "./css/dark": "./dist/css/dark/variables.css",
    "./scss/light": "./dist/css/light/variables.scss",
    "./scss/dark": "./dist/css/dark/variables.scss"
  }
}
```

**Optional:** Add a combined CSS file for convenience:

**New File:** `packages/lib-web-ui-design-token/scripts/style-dictionary/post-build-combine-css.js`

```javascript
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageRoot = resolve(__dirname, '..', '..')
const distRoot = resolve(packageRoot, 'dist')

// Combine light and dark CSS into one file
const lightCss = await readFile(resolve(distRoot, 'css/light/variables.css'), 'utf8')
const darkCss = await readFile(resolve(distRoot, 'css/dark/variables.css'), 'utf8')

const combined = `${lightCss}\n${darkCss}`

await writeFile(resolve(distRoot, 'css/combined.css'), combined, 'utf8')
console.log('✓ Combined CSS generated')
```

Update build script:

```javascript
// build-style-dictionary.js
// After building all themes:
await import('./post-build-combine-css.js')
```

---

### Phase 2: Update lib-web-ui (Consume Directly)

#### 2.1 Remove Theme Generation Script

**Delete:** `packages/lib-web-ui/scripts/generate-theme-css.ts`

Or deprecate with a comment explaining it's no longer needed.

#### 2.2 Update package.json

**File:** `packages/lib-web-ui/package.json`

**Remove from scripts:**

```diff
{
  "scripts": {
-   "generate:theme": "tsx ./scripts/generate-theme-css.ts",
-   "build": "pnpm run clean && pnpm run generate:theme && tsc -p tsconfig.build.json && vite build && pnpm run storybook:build",
+   "build": "pnpm run clean && tsc -p tsconfig.build.json && vite build && pnpm run storybook:build",
-   "dev": "pnpm run generate:theme && vite dev",
+   "dev": "vite dev",
-   "storybook": "pnpm run generate:theme && storybook dev -p 6006",
+   "storybook": "storybook dev -p 6006",
-   "storybook:build": "pnpm run generate:theme && storybook build",
+   "storybook:build": "storybook build",
  }
}
```

**Keep dependency:**

```json
{
  "dependencies": {
    "@designgreat/lib-web-ui-design-token": "workspace:*"
    // Remove design-token-support if not needed elsewhere
  }
}
```

**Decision point:** Can we remove `@designgreat/design-token-support` dependency?

- If `tailwind.config.ts` uses it → keep it
- If only used for theme generation → remove it

#### 2.3 Create Main CSS Entry Point

**File:** `packages/lib-web-ui/src/styles/index.css`

Create a new CSS entry that imports design tokens:

```css
/**
 * Main stylesheet for @designgreat/lib-web-ui
 * Imports design tokens and component styles
 */

/* Design Tokens - Light and Dark themes */
@import '@designgreat/lib-web-ui-design-token/css/light';
@import '@designgreat/lib-web-ui-design-token/css/dark';

/* OR use combined file */
/* @import '@designgreat/lib-web-ui-design-token/css'; */

/* Fonts */
@import '@designgreat/lib-web-ui-design-token/font';

/* Component styles would go here */
```

#### 2.4 Update Vite Config

**File:** `packages/lib-web-ui/vite.config.ts`

Ensure CSS is bundled correctly:

```typescript
export default defineConfig({
  // ...
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        // Preserve CSS imports
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'lib-web-ui.css'
          }
          return assetInfo.name
        }
      }
    }
  },
  css: {
    // Process CSS imports
  }
})
```

#### 2.5 Delete Generated File

**Delete:** `packages/lib-web-ui/src/styles/designgreat-theme.css`

This is no longer needed since we're importing directly.

#### 2.6 Update Tailwind Config

**File:** `packages/lib-web-ui/tailwind.config.ts`

**Check if design-token-support is used:**

```typescript
import { getThemeClassName } from '@designgreat/design-token-support'
import { light } from '@designgreat/lib-web-ui-design-token'
```

**Options:**

- If `getThemeClassName` is used → keep dependency
- Otherwise → update to use hardcoded `.dg-theme-dark`

**Recommended update:**

```typescript
import { light } from '@designgreat/lib-web-ui-design-token'
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const DARK_THEME_CLASS = 'dg-theme-dark'

// ... rest unchanged, but access nested structure:
const colorUtilities = flattenColorVars(light.dg.color, ['color'])
const spacingScale = flattenTokenValues(light.dg.spacing, ['spacing'])
// etc.
```

---

### Phase 3: Update design-token-support (Optional)

**Decision:** Keep or deprecate this package?

**Options:**

**A. Keep it** (for backward compatibility or advanced use cases)

- Update to work with new structure
- Provide optional utilities

**B. Deprecate it** (simplify architecture)

- Users import CSS directly from `lib-web-ui-design-token`
- Less abstraction, clearer dependencies

**Recommendation:** Keep it minimal, update to work with new namespace structure.

**File:** `packages/shared/design-token-support/src/theme.ts`

```typescript
// Update to handle new namespace structure
export function createCssVariableMap(
  theme: ThemeToken,
  options?: CssVariableOptions
): Record<string, string> {
  const prefix = options?.prefix ?? DEFAULT_PREFIX
  const variables: Record<string, string> = {}

  // Handle both old flat structure and new namespace structure
  const tokenRoot = 'dg' in theme ? theme.dg : theme

  walkTheme(tokenRoot, [], (path, value) => {
    if (!isCssPrimitive(value)) {
      return
    }

    const segments = path.map(normalizeSegment)
    const name = `--${prefix}-${segments.join('-')}`
    variables[name] = String(value)
  })

  return variables
}
```

---

### Phase 4: Update Documentation

#### 4.1 Update CSS Integration Guide

**File:** `packages/docs-design-system/docs/tutorial/css-integration.mdx`

````mdx
---
sidebar_position: 3
---

# CSS Integration

## Installation

```bash
npm install @designgreat/lib-web-ui-design-token
```
````

## Basic Usage

Import the design tokens CSS in your application:

```css
/* Import both light and dark themes */
@import '@designgreat/lib-web-ui-design-token/css/light';
@import '@designgreat/lib-web-ui-design-token/css/dark';

/* OR use the combined file */
@import '@designgreat/lib-web-ui-design-token/css';

/* Import fonts */
@import '@designgreat/lib-web-ui-design-token/font';
```

The CSS will be available globally:

- Light theme: `:root { --dg-* }`
- Dark theme: `.dg-theme-dark { --dg-* }`

## Theme Switching

Apply the dark theme by adding the class to a wrapper element:

```tsx
function App() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div className={isDark ? 'dg-theme-dark' : ''}>
      <YourContent />
    </div>
  )
}
```

## Using CSS Variables

Reference design tokens in your styles:

```css
.my-component {
  background-color: var(--dg-color-background-default);
  color: var(--dg-color-text-default);
  padding: var(--dg-spacing-px16);
  font-family: var(--dg-font-family-primary);
}
```

## SCSS Usage

For SCSS projects, import the SCSS variables:

```scss
@import '@designgreat/lib-web-ui-design-token/scss/light';

.my-component {
  background: $dg-color-background-default;
  color: $dg-color-text-default;
}
```

**Note:** SCSS variables are theme-specific. Import light or dark, not both.

## TypeScript/JavaScript Usage

Import token objects for programmatic access:

```typescript
import { light, dark } from '@designgreat/lib-web-ui-design-token'

// Access tokens via namespace
const bgColor = light.dg.color.background.default
const spacing = light.dg.spacing.px16

console.log(bgColor) // "#ffffff"
```

## Next Steps

- Learn about [Theme Switching](./theme-switching.mdx)
- See [Tailwind CSS Integration](./tailwind-integration.mdx)
- Explore [Runtime APIs](./api/runtime-apis.mdx)

````

#### 4.2 Update All Other Documentation Files

Search and replace in all `.mdx` files:
- `--token-` → `--dg-`
- `$token-` → `$dg-`
- Update theme class references
- Update import examples

**Files to update:**
1. All files in `docs/colors/`
2. All files in `docs/tutorial/`
3. All files in `docs-components/guides/`
4. All files in `docs-contributing/`

---

### Phase 5: Update docs-design-system

#### 5.1 Update Custom CSS

**File:** `packages/docs-design-system/src/css/custom.css`

Verify it imports from `lib-web-ui`:

```css
@import '@designgreat/lib-web-ui/dist/lib-web-ui.css';

/* This now includes design tokens directly */
````

No changes needed if the import chain is correct.

---

### Phase 6: Comprehensive Testing

#### 6.1 Build Test

```bash
# Clean everything
pnpm run clean

# Install dependencies
pnpm install

# Build in correct order
cd packages/lib-web-ui-design-token
pnpm run build

cd ../lib-web-ui
pnpm run build

cd ../docs-design-system
pnpm run build

# Check for errors
echo "✓ All builds succeeded"
```

#### 6.2 Visual Testing

**Docs Site:**

1. Run `pnpm run start` in docs-design-system
2. Test light/dark theme toggle
3. Verify all pages render correctly
4. Check color examples
5. Verify component demos

**Storybook:**

1. Run `pnpm run storybook` in lib-web-ui
2. Test all component stories
3. Toggle dark mode
4. Verify colors, spacing, typography

#### 6.3 Browser Testing

Test in:

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

Check:

- CSS variables are applied
- Theme switching works
- No console errors
- No visual glitches

#### 6.4 Accessibility Testing

**Tools:**

- Lighthouse audit
- axe DevTools
- WAVE browser extension

**Checks:**

- Color contrast ratios
- Focus indicators
- ARIA labels
- Keyboard navigation

#### 6.5 Verify Generated Files

**Check these files exist and are correct:**

```bash
# Design tokens
packages/lib-web-ui-design-token/dist/css/light/variables.css
packages/lib-web-ui-design-token/dist/css/dark/variables.css
packages/lib-web-ui-design-token/dist/css/combined.css
packages/lib-web-ui-design-token/dist/css/light/variables.scss
packages/lib-web-ui-design-token/dist/css/dark/variables.scss
packages/lib-web-ui-design-token/dist/generated/themes.ts
packages/lib-web-ui-design-token/dist/font/font-face.css

# UI library
packages/lib-web-ui/dist/lib-web-ui.css
packages/lib-web-ui/dist/packages/lib-web-ui/src/index.mjs
```

**Verify content:**

```bash
# Check light theme uses :root
grep "^:root" packages/lib-web-ui-design-token/dist/css/light/variables.css

# Check dark theme uses .dg-theme-dark
grep "^\.dg-theme-dark" packages/lib-web-ui-design-token/dist/css/dark/variables.css

# Check all variables use --dg- prefix
grep -- "--dg-" packages/lib-web-ui-design-token/dist/css/light/variables.css | head -5

# Check SCSS uses $dg- prefix
grep -- "\$dg-" packages/lib-web-ui-design-token/dist/css/light/variables.scss | head -5

# Check namespace structure in TypeScript
grep "dg:" packages/lib-web-ui-design-token/dist/generated/themes.ts
```

---

## 🚀 Implementation Checklist

### Phase 1: lib-web-ui-design-token

- [ ] Update config.js: change prefix to 'dg'
- [ ] Add custom CSS format with selectors
- [ ] Update selector logic (`:root` for light, `.dg-theme-dark` for dark)
- [ ] Update post-build-export.js for namespace structure
- [ ] Add combined CSS generation script
- [ ] Update package.json exports
- [ ] Run build and verify outputs

### Phase 2: lib-web-ui

- [ ] Remove/deprecate generate-theme-css.ts script
- [ ] Update package.json scripts
- [ ] Create src/styles/index.css with direct imports
- [ ] Update vite.config.ts for CSS bundling
- [ ] Delete src/styles/designgreat-theme.css
- [ ] Update tailwind.config.ts for namespace structure
- [ ] Decide on design-token-support dependency
- [ ] Run build and verify outputs

### Phase 3: design-token-support (Optional)

- [ ] Update theme.ts for namespace structure
- [ ] Test with new token structure
- [ ] OR deprecate if not needed

### Phase 4: Documentation

- [ ] Update css-integration.mdx
- [ ] Update theme-switching.mdx
- [ ] Update tailwind-integration.mdx
- [ ] Update api/runtime-apis.mdx
- [ ] Update all color docs files
- [ ] Update component guide files
- [ ] Update contributing docs
- [ ] Search/replace `--token-` → `--dg-`
- [ ] Search/replace `$token-` → `$dg-`

### Phase 5: docs-design-system

- [ ] Verify custom.css imports
- [ ] Test theme switching
- [ ] Verify all Infima mappings work

### Phase 6: Testing

- [ ] Clean build test
- [ ] Visual testing (docs + Storybook)
- [ ] Cross-browser testing
- [ ] Accessibility audit
- [ ] Verify all generated files
- [ ] Check variable names
- [ ] Performance test

---

## 📊 Expected Outcomes

### lib-web-ui-design-token Becomes Standalone

**Users can install and use independently:**

```bash
npm install @designgreat/lib-web-ui-design-token
```

```css
@import '@designgreat/lib-web-ui-design-token/css';
```

```typescript
import { light } from '@designgreat/lib-web-ui-design-token'
const bg = light.dg.color.background.default
```

### lib-web-ui Becomes Simpler

**Cleaner dependency chain:**

- No theme generation script
- Direct CSS import
- Smaller build footprint
- Faster build times

### Users Have Clear Options

**Option 1: Design tokens only**

```bash
npm install @designgreat/lib-web-ui-design-token
```

**Option 2: Full UI library (includes tokens)**

```bash
npm install @designgreat/lib-web-ui
# Also gets lib-web-ui-design-token automatically
```

---

## 🎯 Success Metrics

- ✅ `lib-web-ui-design-token` builds successfully standalone
- ✅ All CSS uses `--dg-` prefix
- ✅ Dark theme uses `.dg-theme-dark` selector
- ✅ JSTS exports use namespace structure
- ✅ `lib-web-ui` imports CSS directly
- ✅ All tests pass
- ✅ Docs site renders correctly
- ✅ Storybook works correctly
- ✅ Theme switching works in both
- ✅ No console errors
- ✅ Accessibility scores remain high
- ✅ Build times are acceptable

---

**Ready to implement!** 🚀
