# Design Tokens

This guide explains how to consume design tokens from `@designgreat/lib-web-ui-design-token` in your
application. For package development, architecture, and build details, see the
[package README](/packages/lib-web-ui-design-token/README.md).

## Installation

```bash
pnpm add @designgreat/lib-web-ui-design-token
```

## Package Exports

The package provides the following exports for easy consumption:

- `@designgreat/lib-web-ui-design-token` – TypeScript runtime APIs
- `@designgreat/lib-web-ui-design-token/font` – Font-face definitions and font files
  (self-contained)
- `@designgreat/lib-web-ui-design-token/css/light` – Light theme variables
- `@designgreat/lib-web-ui-design-token/css/dark` – Dark theme variables

## Runtime APIs

The TypeScript runtime exposes strongly typed helpers for listing themes, cloning overrides, and
performing integrity checks.

```typescript
import {
  DEFAULT_THEME,
  themes,
  getThemeTokens,
  createTheme,
  listThemeNames
} from '@designgreat/lib-web-ui-design-token'

// Enumerate available themes
const ids = listThemeNames()

// Access flattened token payloads
const lightTheme = getThemeTokens('light')
const background = lightTheme.color.background.DEFAULT

// Deep-merge overrides into an existing theme
const highContrast = createTheme(DEFAULT_THEME, {
  color: { background: { DEFAULT: '#F5F5F5' } }
})

console.log(ids, background, highContrast.color.background.DEFAULT)
```

Complementary helpers for CSS-variable generation live in `@designgreat/design-token-support`.

```typescript
import {
  createThemeConfig,
  createCssVariableMap,
  createThemeStyles
} from '@designgreat/design-token-support'

const lightConfig = createThemeConfig('light')
const cssVars = createCssVariableMap(lightConfig.tokens)
const stylesheet = createThemeStyles('light')

console.log(lightConfig.className) // "dg-theme-light"
console.log(cssVars['--dg-color-background-default'])
console.log(stylesheet.slice(0, 60))
```

## CSS Integration

There are two ways to consume design tokens as CSS:

### Option 1: Using `@designgreat/design-token-support` (Recommended)

**For theme switching support**, use the `design-token-support` package to generate CSS with proper
selectors:

```typescript
// scripts/generate-theme-css.ts
import { writeFileSync } from 'node:fs'

import {
  createThemeStyles,
  getThemeClassName,
  listThemeNames
} from '@designgreat/design-token-support'

// Generate theme CSS with proper selectors
const lightCss = createThemeStyles('light', { selector: ':root', indent: 2 })
const darkCss = createThemeStyles('dark', {
  selector: `.${getThemeClassName('dark')}`,
  indent: 2
})

// Write to file
writeFileSync('src/styles/theme.css', `${lightCss}\n\n${darkCss}\n`)
```

Then import in your application:

```css
/* Import generated theme CSS with proper selectors */
@import './styles/theme.css';

body {
  background: var(--dg-color-background-default);
  color: var(--dg-color-text-default);
}
```

```tsx
// Switch themes by applying class to a wrapper
function App() {
  const [isDark, setIsDark] = useState(false)
  const themeClass = isDark ? 'dg-theme-dark' : ''

  return <div className={themeClass}>{/* Your app */}</div>
}
```

**Why this approach?**

- ✅ Proper theme switching with class-based selectors
- ✅ Light theme uses `:root`, dark theme uses `.dg-theme-dark`
- ✅ Supports dynamic theme switching at runtime
- ✅ Variables are scoped correctly

### Option 2: Direct CSS Import (Single Theme Only)

**If you only need ONE theme** (no switching), you can import the raw CSS directly:

```css
/* Import font-face definitions (once, shared across all themes) */
@import '@designgreat/lib-web-ui-design-token/font';

/* Import ONE theme's variables */
@import '@designgreat/lib-web-ui-design-token/css/light';
/* OR */
@import '@designgreat/lib-web-ui-design-token/css/dark';

body {
  background: var(--token-color-background-default);
  color: var(--token-color-text-default);
}
```

**⚠️ Warning:** Both `light` and `dark` CSS files use `:root` selector. **Do not import both** or
they will conflict. This approach does not support theme switching.

### Font Assets

The `@designgreat/lib-web-ui-design-token/font` export includes both:

- `font-face.css` with font-face definitions
- All font files (_.woff2, _.ttf, _.otf, _.woff)

**For most applications** (React, Vue, Angular with Vite/Webpack), simply importing the CSS is
enough:

```typescript
// In your main.ts or App.tsx
import '@designgreat/lib-web-ui-design-token/font'
```

Bundlers automatically resolve the relative font paths (`./filename.woff2`) from the CSS and include
the fonts in your build.

**For static site generators** (Docusaurus, Astro, etc.), you may need to copy the font directory:

```javascript
// scripts/copy-fonts.js
import { cpSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fontSource = resolve(
  __dirname,
  '../node_modules/@designgreat/lib-web-ui-design-token/dist/font'
)
const fontTarget = resolve(__dirname, '../static/font')

cpSync(fontSource, fontTarget, { recursive: true })
console.log('✓ Fonts copied to static/font/')
```

Then reference the CSS in your site configuration:

```typescript
// docusaurus.config.ts
const baseUrl = '/your-site/'

export default {
  // ...
  stylesheets: [`${baseUrl}font/font-face.css`]
}
```

## Tailwind CSS v4 Integration

Tailwind v4 favours authoring theme data in CSS. Generate a theme layer with the helpers and import
it alongside the Tailwind entry point:

```typescript
// scripts/generate-tailwind-theme.ts
import { writeFileSync } from 'node:fs'

import { createThemeStyles, getThemeClassName } from '@designgreat/design-token-support'

const rootCss = createThemeStyles('light', { selector: ':root', indent: 2 })
const darkCss = createThemeStyles('dark', {
  selector: `.${getThemeClassName('dark')}`,
  indent: 2
})

writeFileSync('src/styles/designgreat-theme.css', `@layer theme {\n${rootCss}\n\n${darkCss}\n}\n`)
```

```css
/* src/styles/tailwind.css */
@import 'tailwindcss';
@import './designgreat-theme.css';

@custom-variant theme-dark (&:where(.dg-theme-dark &));
```

With the CSS layer in place, utilities such as `bg-[var(--dg-color-background-default)]` map
directly to token values. The helper package continues to offer `createCssVariableMap`,
`getThemeClassName`, and related utilities for JS-driven theming or SSR workflows.

## Theme Switching

Apply theme classes to switch between light and dark modes:

```tsx
import { useState } from 'react'

import { createThemeConfig } from '@designgreat/design-token-support'

// Create theme configurations
const lightTheme = createThemeConfig('light')
const darkTheme = createThemeConfig('dark')

// Get theme class names
console.log(lightTheme.className) // "dg-theme-light"
console.log(darkTheme.className) // "dg-theme-dark"

// Apply to a wrapper element
function App() {
  const [isDark, setIsDark] = useState(false)
  const theme = isDark ? darkTheme : lightTheme

  return <div className={theme.className}>{/* Application content */}</div>
}

// Or apply directly to document
document.body.classList.remove(lightTheme.className, darkTheme.className)
document.body.classList.add(darkTheme.className)
```

For simple use cases where you only need the class name:

```typescript
import { getThemeClassName } from '@designgreat/design-token-support'

const darkClass = getThemeClassName('dark') // "dg-theme-dark"
document.body.className = darkClass
```

## Type Definitions

The package exports TypeScript types for all tokens:

```typescript
import type { ThemeName, ThemeToken, ThemeOverrides } from '@designgreat/lib-web-ui-design-token'

// ThemeName: 'light' | 'dark'
// ThemeToken: The full token structure for a theme
// ThemeOverrides: Partial theme structure for createTheme()
```
