# Web Components

This guide explains how to consume React components from `@designgreat/lib-web-ui` in your
application. For package development, architecture, and build details, see the
[package README](/packages/lib-web-ui/README.md).

## Overview

`@designgreat/lib-web-ui` is Designgreat's React component library built with:

- Design tokens from `@designgreat/lib-web-ui-design-token`
- Tailwind CSS utilities
- Custom component styles
- TypeScript definitions

Components include Button, TextInput, Dialog, and more, all with built-in theme support and
accessibility features.

## Installation

```bash
pnpm add @designgreat/lib-web-ui
```

**Peer dependencies:**

- `react` `^18`
- `react-dom` `^18`

## Basic Usage

Import the component(s) you need. The package ships with generated design tokens, utility classes,
and component styles. Ensure your application wraps content with one of the generated theme classes
(`dg-theme-light` / `dg-theme-dark`).

```tsx
import '@designgreat/lib-web-ui/dist/lib-web-ui.css' // once in your app entrypoint
import { Button, TextInput, Dialog } from '@designgreat/lib-web-ui'

function Example() {
  return (
    <>
      <Button variant="primary">Create account</Button>
      <TextInput label="Email" type="email" placeholder="you@example.com" />
    </>
  )
}
```

> **Important:** The distributed CSS contains component styles, token variables, and Tailwind
> utilities. If your build tool tree-shakes CSS per entry (e.g. Next.js), ensure the import executes
> on every page where components are rendered.

## Integration with Existing Tailwind Projects

If your project already uses Tailwind, add our CSS to your existing Tailwind entrypoint:

```css
/* global.css or your main Tailwind file */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Include lib-web-ui tokens + utilities */
@import '@designgreat/lib-web-ui/dist/lib-web-ui.css';
```

Tailwind processes the imported file with your config, so theme variables, utilities, and component
styles coexist with your own styles. Keep the import **after** your `@tailwind` directives if you
emit Tailwind resets locally.

## Theming

### Default Theme

The light theme attaches to `:root` by default, so all components use light theme colors without
additional configuration.

### Switching Themes

Theme classes are generated from `@designgreat/lib-web-ui-design-token`. Apply a theme by wrapping
your content with the theme class:

```tsx
import { createThemeConfig } from '@designgreat/design-token-support'

const darkTheme = createThemeConfig('dark')

export function App() {
  return <div className={darkTheme.className}>{/* Application content */}</div>
}
```

### Dynamic Theme Switching

For runtime theme switching, use state to manage the active theme:

```tsx
import { createThemeConfig } from '@designgreat/design-token-support'
import { useState } from 'react'

const lightTheme = createThemeConfig('light')
const darkTheme = createThemeConfig('dark')

export function App() {
  const [isDark, setIsDark] = useState(false)
  const currentTheme = isDark ? darkTheme : lightTheme

  return (
    <div className={currentTheme.className}>
      <button onClick={() => setIsDark(!isDark)}>Toggle Theme</button>
      {/* Application content */}
    </div>
  )
}
```

### Available Themes

- `light` – Default light theme
- `dark` – Dark theme

For programmatic theme access, see the [Design Tokens guide](./design-tokens.md).

## Font Setup

The library does **not** include `@font-face` declarations in the distributable CSS. If you want to
use the Roboto font family (as defined in the design tokens), you have two options:

### Option 1: Import from Design Token Package

```tsx
// In your app entry point (e.g., main.tsx, _app.tsx)
import '@designgreat/lib-web-ui-design-token/font'
import '@designgreat/lib-web-ui/dist/lib-web-ui.css'
```

This imports the font-face CSS and font files from `lib-web-ui-design-token`.

### Option 2: Use Your Own Font Loading

If you prefer to load fonts differently (CDN, self-hosted, etc.):

```tsx
// Only import the component CSS
import '@designgreat/lib-web-ui/dist/lib-web-ui.css'
```

Then load Roboto (or your preferred font) using your own method:

```html
<!-- Via Google Fonts CDN -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
  rel="stylesheet"
/>
```

See the [Font Assets section in the Design Tokens guide](./design-tokens.md#font-assets) for more
details.

## Available Components

### Button

Primary/secondary/outline variants with loading states and icon support.

```tsx
import { Button } from '@designgreat/lib-web-ui'

function Example() {
  return (
    <>
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>

      <Button variant="secondary" loading>
        Processing...
      </Button>

      <Button variant="outline" disabled>
        Disabled
      </Button>
    </>
  )
}
```

**Props:**

- `variant` – `'primary'` | `'secondary'` | `'outline'`
- `loading` – Show loading spinner
- `disabled` – Disable interaction
- Standard button HTML attributes

### TextInput

Labeled input with helper text, error messaging, and icon support.

```tsx
import { TextInput } from '@designgreat/lib-web-ui'

function Example() {
  return (
    <>
      <TextInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        helperText="We'll never share your email"
      />

      <TextInput label="Password" type="password" error="Password must be at least 8 characters" />
    </>
  )
}
```

**Props:**

- `label` – Input label text
- `helperText` – Helper text below input
- `error` – Error message (turns input red)
- Standard input HTML attributes

### Dialog

Accessible modal with focus trapping, portal rendering, and section subcomponents.

```tsx
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from '@designgreat/lib-web-ui'
import { useState } from 'react'

function Example() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogHeader>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogDescription>
          Are you sure you want to proceed? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogBody>{/* Modal content */}</DialogBody>
      <DialogFooter>
        <Button variant="outline" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
```

**Components:**

- `Dialog` – Main modal wrapper
- `DialogHeader` – Header section
- `DialogTitle` – Title text
- `DialogDescription` – Description text
- `DialogBody` – Content area
- `DialogFooter` – Footer with actions

## Using Tailwind Token Utilities

The library includes Tailwind utilities that map directly to design tokens, allowing you to build
custom UIs using the design system:

```tsx
<div className="bg-color-background-card p-spacing-11 rounded-md">
  <h2 className="text-color-text-heading font-typography-heading-h2-font-weight">Custom Card</h2>
  <p className="text-color-text-body mt-spacing-4">Build with design tokens</p>
</div>
```

All color utilities resolve to CSS variables (e.g. `var(--dg-color-…)`) so they automatically
respond to `dg-theme-light` / `dg-theme-dark` switches.

### Token Naming Convention

Utilities follow the design token tree structure:

- **Colors:** `bg-color-{category}-{element}-{state}`
  - Example: `bg-color-background-button-default`
  - Example: `text-color-text-heading`
- **Spacing:** `p-spacing-{number}`, `m-spacing-{number}`
  - Example: `p-spacing-11`, `mt-spacing-4`
- **Typography:** `font-typography-{element}-{property}`
  - Example: `font-typography-heading-h2-font-weight`

This eliminates the need for verbose `bg-[var(--dg-…)]` syntax while maintaining full theme
awareness.

## Storybook Documentation

For interactive component demos with live controls, see the published Storybook:

🔗 **[Storybook Documentation](https://chunwenyang.github.io/designgreat/storybook/)**

You can also run Storybook locally:

```bash
pnpm --filter @designgreat/lib-web-ui storybook
```

## TypeScript Support

The package includes full TypeScript definitions. Component props are fully typed:

```tsx
import type { ButtonProps, TextInputProps } from '@designgreat/lib-web-ui'

const customButton: ButtonProps = {
  variant: 'primary',
  onClick: () => console.log('clicked')
}
```

## Framework-Specific Notes

### Next.js

In Next.js 13+ (App Router), import styles in your root layout:

```tsx
// app/layout.tsx
import '@designgreat/lib-web-ui-design-token/font'
import '@designgreat/lib-web-ui/dist/lib-web-ui.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="dg-theme-light">{children}</body>
    </html>
  )
}
```

### Vite

In Vite projects, import in your main entry:

```tsx
// src/main.tsx
import '@designgreat/lib-web-ui-design-token/font'
import '@designgreat/lib-web-ui/dist/lib-web-ui.css'
import { createRoot } from 'react-dom/client'

import App from './App'

createRoot(document.getElementById('root')!).render(<App />)
```

### Create React App

Import in your index file:

```tsx
// src/index.tsx
import '@designgreat/lib-web-ui-design-token/font'
import '@designgreat/lib-web-ui/dist/lib-web-ui.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
```

## Troubleshooting

### Components Don't Have Styles

**Problem:** Components render but have no styling.

**Solution:** Ensure you've imported the CSS:

```tsx
import '@designgreat/lib-web-ui/dist/lib-web-ui.css'
```

### Theme Isn't Applied

**Problem:** Components always show light theme colors.

**Solution:** Wrap your app with a theme class:

```tsx
<div className="dg-theme-dark">{/* Your app */}</div>
```

### Fonts Don't Load

**Problem:** Text renders in fallback font, not Roboto.

**Solution:** Import the font CSS:

```tsx
import '@designgreat/lib-web-ui-design-token/font'
```

Or use an alternative font loading method (see [Font Setup](#font-setup)).

### TypeScript Errors

**Problem:** TypeScript can't find type definitions.

**Solution:** The package includes built-in types. Ensure `@designgreat/lib-web-ui` is in your
`package.json` dependencies and run:

```bash
pnpm install
```

### CSS Purging/Tree-Shaking Issues

**Problem:** Some styles are missing in production.

**Solution:** If using a CSS purging tool (like PurgeCSS), ensure it doesn't remove the library's
classes. Add to your purge safelist or exclude the library CSS from purging:

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/@designgreat/lib-web-ui/**/*.js']
}
```

## Related Resources

- [Design Tokens Guide](./design-tokens.md) – How to consume design tokens
- [Package README](/packages/lib-web-ui/README.md) – Architecture and development guide
- [Storybook](https://chunwenyang.github.io/designgreat/storybook/) – Interactive component demos
