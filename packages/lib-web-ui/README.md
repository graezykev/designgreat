# @designgreat/lib-web-ui

React component library built with design tokens from `@designgreat/lib-web-ui-design-token`.
Components consume shared design token variables and component styles emitted during the build step.

**Looking to use this library?** See the
[Component Library Usage Guide](https://graezykev.github.io/designgreat/components/guides/overview).

## Package Overview

This package provides:

- **React Components:** Button, TextInput, Dialog with full TypeScript support
- **Design Token Integration:** CSS variables generated from `@designgreat/lib-web-ui-design-token`
- **Tailwind Utilities:** Token-aware utility classes for custom UIs
- **Component Styles:** Handcrafted styles for each component
- **Storybook Documentation:** Interactive demos and development environment

## Architecture

### Build Artifacts

```
dist/
├── lib-web-ui.css           # Complete CSS bundle (tokens + utilities + components)
├── index.js                 # ESM entry point
├── index.cjs                # CommonJS entry point
├── index.d.ts               # TypeScript definitions
└── components/              # Individual component bundles
    ├── Button.js
    ├── TextInput.js
    └── Dialog.js
```

### CSS Bundling Strategy

The distributed CSS (`dist/lib-web-ui.css`) is intentionally **clean** and does not include:

- ❌ `@font-face` declarations
- ❌ Default `font-family` rules on `body` or `html`

This allows consumers to:

- Load fonts independently (from `@designgreat/lib-web-ui-design-token/font` or via CDN)
- Integrate seamlessly with existing projects without font conflicts
- Control font loading strategy (preload, async, etc.)

The CSS **does** include:

- ✅ Design token CSS variables (color, spacing, typography values)
- ✅ Tailwind utilities (generated from token values)
- ✅ Component-specific styles

**Theme CSS Order:**

The distributed CSS includes both light and dark themes in a specific order to ensure proper CSS
cascade:

1. **`:root { ... }`** - Light theme variables (applied by default)
2. **`.dg-theme-dark { ... }`** - Dark theme variables (override when class is present)

This ordering ensures that when the `.dg-theme-dark` class is applied to the `<html>` element, dark
theme variables correctly override the light theme defaults.

### Dependency Flow

```
┌────────────────────────────────────┐
│  @designgreat/lib-web-ui-design-   │
│  token (Design Tokens)             │
│  • CSS variables (colors, spacing) │
│  • Typography values               │
│  • Font files + font-face.css      │
└──────────────┬─────────────────────┘
               │ consumed by
               ▼
┌────────────────────────────────────┐
│  @designgreat/lib-web-ui           │
│  (Component Library)               │
│  • React components                │
│  • Tailwind config (token-aware)   │
│  • Component styles                │
└────────────────────────────────────┘
```

## Development

### Prerequisites

- Node.js 22+
- pnpm (monorepo dependency)
- `@designgreat/lib-web-ui-design-token` (workspace dependency)

### Quick Start

```bash
# Install dependencies (from monorepo root)
pnpm install

# Start Storybook development server
pnpm --filter @designgreat/lib-web-ui storybook

# Run dev build (component development without Storybook)
pnpm --filter @designgreat/lib-web-ui dev

# Run tests
pnpm --filter @designgreat/lib-web-ui test

# Type check
pnpm --filter @designgreat/lib-web-ui typecheck

# Lint
pnpm --filter @designgreat/lib-web-ui lint
```

### Development Workflows

#### Storybook Development (Recommended)

Storybook is the primary development environment for components. See
[`STORYBOOK.md`](./STORYBOOK.md) for detailed workflow guidance.

```bash
pnpm --filter @designgreat/lib-web-ui storybook
```

**What happens:**

1. Fonts are copied from `lib-web-ui-design-token/dist/font/` to `public/assets/fonts/`
2. Design tokens are regenerated (`generate:theme`)
3. Vite-powered Storybook server starts
4. Tailwind JIT generates utilities on-demand as you write stories
5. Theme switcher toolbar allows testing light/dark themes

#### Component Development Without Storybook

```bash
pnpm --filter @designgreat/lib-web-ui dev
```

**What happens:**

1. Design tokens are regenerated
2. Vite dev server starts
3. Tailwind JIT generates utilities from component usage
4. No font copying (not needed for library development)

### Build Pipeline

```
┌───────────────────────────┐
│  pnpm build pipeline      │
│  • clean                  │
│  • generate:theme         │ ← Regenerate design tokens
│  • tsc -p tsconfig.build  │ ← Type check and emit .d.ts
│  • vite build (ESM/CJS)   │ ← Bundle components and CSS
│  • storybook build        │ ← Build static Storybook site
└──────────────┬────────────┘
               │
               ▼
┌───────────────────────────┐
│  Published package        │ ← Clean CSS without font dependencies
└───────────────────────────┘
```

**Full build:**

```bash
pnpm --filter @designgreat/lib-web-ui build
```

**What happens:**

1. `clean` – Remove previous build artifacts
2. `generate:theme` – Regenerate CSS from design tokens
3. `typecheck` – Verify TypeScript compilation
4. `vite build` – Bundle library (ESM + CJS) and CSS
5. `storybook:build` – Generate static Storybook site

**Build artifacts:**

- `dist/` – Published package artifacts
- `storybook-static/` – Deployable Storybook site (includes fonts)

### Testing

```bash
# Run all tests
pnpm --filter @designgreat/lib-web-ui test

# Watch mode
pnpm --filter @designgreat/lib-web-ui test -- --watch

# Coverage
pnpm --filter @designgreat/lib-web-ui test -- --coverage
```

Testing stack:

- **Vitest** – Test runner
- **React Testing Library** – Component testing
- **JSDOM** – DOM environment

### Type Checking

```bash
pnpm --filter @designgreat/lib-web-ui typecheck
```

Type checking uses `tsconfig.json` with strict mode enabled. Generated artifacts
(`src/styles/designgreat-theme.css`) are committed to support local iteration and CI.

## Project Structure

```
packages/lib-web-ui/
├── .storybook/              # Storybook configuration
│   ├── main.ts              # Vite + addon config
│   ├── preview.tsx          # Global decorators (theme switching)
│   └── theme.ts             # Storybook UI theme
├── public/                  # Static assets for Storybook
│   └── assets/fonts/        # Copied from lib-web-ui-design-token (gitignored)
├── src/
│   ├── components/          # React components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── Button.stories.tsx
│   │   ├── TextInput/
│   │   └── Dialog/
│   ├── styles/
│   │   ├── tailwind.css     # Main Tailwind entrypoint
│   │   ├── designgreat-theme.css  # Generated theme CSS (committed)
│   │   └── components/      # Component-specific styles
│   │       ├── button.css
│   │       ├── textinput.css
│   │       └── dialog.css
│   └── index.ts             # Package entry point
├── scripts/
│   └── generate-theme.ts    # Theme CSS generation script
├── tailwind.config.ts       # Tailwind configuration (token-aware)
├── vite.config.ts           # Vite build configuration
├── vitest.config.ts         # Vitest test configuration
└── package.json
```

## Scripts Reference

| Script            | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| `dev`             | Start Vite dev server for component development                      |
| `build`           | Full build pipeline (clean → tokens → typecheck → build → storybook) |
| `storybook`       | Start Storybook dev server on port 6006                              |
| `storybook:build` | Build static Storybook site to `storybook-static/`                   |
| `generate:theme`  | Regenerate CSS from design tokens                                    |
| `test`            | Run Vitest tests                                                     |
| `typecheck`       | Run TypeScript compiler (no emit)                                    |
| `lint`            | Run ESLint                                                           |
| `clean`           | Remove build artifacts                                               |

## Tailwind Configuration

The Tailwind config (`tailwind.config.ts`) extends the design token system to generate utility
classes:

```typescript
// Simplified example from tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'color-background-button-default': 'var(--dg-color-background-button-default)',
        'color-text-heading': 'var(--dg-color-text-heading)'
        // ... all color tokens
      },
      spacing: {
        '1': 'var(--dg-spacing-1)',
        '4': 'var(--dg-spacing-4)'
        // ... all spacing tokens
      }
    }
  }
}
```

This allows developers to use design tokens directly in utility classes without verbose
`bg-[var(--dg-…)]` syntax:

```tsx
<button className="bg-color-background-button-default text-color-text-button-default px-spacing-11">
  Submit
</button>
```

**Benefits:**

- ✅ Automatic theme switching (utilities use CSS variables)
- ✅ Type-safe (via Tailwind IntelliSense)
- ✅ JIT optimization (only used utilities are generated)

## Design Token Integration

### Token Generation Flow

```
┌────────────────────────────────┐
│ lib-web-ui-design-token build  │ ← Design token package
│ • Style Dictionary processes   │
│   token JSON files             │
│ • Generates CSS variables      │
└───────────────┬────────────────┘
                │
                ▼
┌────────────────────────────────┐
│ lib-web-ui generate:theme      │ ← This package
│ • Reads generated CSS from     │
│   lib-web-ui-design-token      │
│ • Combines into single file    │
│ • Emits to src/styles/         │
│ • Order: light (:root) first,  │
│   then dark (.dg-theme-dark)   │
└────────────────────────────────┘
```

**Important:** The theme generation script (`scripts/generate-theme-css.ts`) explicitly orders
themes as `['light', 'dark']` to ensure proper CSS cascade. This means light theme variables in
`:root` are defined first, followed by dark theme variables in `.dg-theme-dark`, allowing the dark
theme to correctly override light theme when the class is applied.

### Regenerating Tokens

During development, you may need to regenerate tokens after changes to `lib-web-ui-design-token`:

```bash
# From monorepo root
pnpm --filter @designgreat/lib-web-ui-design-token build
pnpm --filter @designgreat/lib-web-ui generate:theme
```

Or use the dev workflow which handles this automatically:

```bash
pnpm --filter @designgreat/lib-web-ui dev
```

## Storybook

Storybook serves as:

- **Component Playground:** Interactive demos with live controls
- **Documentation:** Component API and usage examples
- **Visual Testing:** Theme switching and responsive previews
- **Development Environment:** Isolated component development

### Running Storybook

```bash
# Development server
pnpm --filter @designgreat/lib-web-ui storybook

# Production build
pnpm --filter @designgreat/lib-web-ui storybook:build
```

### Storybook Build Output

The `storybook:build` script generates a static site in `storybook-static/` with:

- Bundled component stories
- Font files copied to `assets/fonts/`
- Theme switching functionality
- Full component documentation

**Deployment:** The static site can be deployed to any static hosting service (GitHub Pages,
Netlify, Vercel, etc.).

See [`STORYBOOK.md`](./STORYBOOK.md) for detailed Storybook development guidance.

## Font Handling

### Why No Fonts in Library CSS?

The library CSS intentionally **excludes** fonts to:

- Avoid font conflicts in consuming applications
- Allow consumers to choose font loading strategy
- Reduce bundle size for applications using different fonts
- Enable better performance optimization (preload, async, etc.)

### Storybook Font Loading

Storybook **does** load fonts for preview purposes:

- Fonts are copied from `lib-web-ui-design-token/dist/font/` to `public/assets/fonts/`
- `font-face.css` is imported in `.storybook/preview.tsx`
- `font-family` is applied dynamically via React `useEffect` in `ThemeDecorator`

This happens **only** for Storybook, not in the published library.

### Consumer Font Options

Consumers can load fonts in two ways:

**Option 1:** Import from design token package

```tsx
import '@designgreat/lib-web-ui-design-token/font'
```

**Option 2:** Use custom font loading

```html
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
  rel="stylesheet"
/>
```

See the [Font Setup guide](https://graezykev.github.io/designgreat/components/guides/font-setup) for
details.

## Publishing

The package is published to NPM via GitHub Actions on version changes.

**Package exports:**

```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./dist/lib-web-ui.css": "./dist/lib-web-ui.css"
  }
}
```

**Published files:**

- `dist/` – All build artifacts
- `README.md` – This file
- `LICENSE` – MIT license

## Troubleshooting

### Theme CSS Not Updating

**Problem:** Changes to design tokens don't appear in Storybook or dev server.

**Solution:** Regenerate theme CSS:

```bash
pnpm --filter @designgreat/lib-web-ui generate:theme
```

Or rebuild the design token package:

```bash
pnpm --filter @designgreat/lib-web-ui-design-token build
```

### Storybook Fonts Missing

**Problem:** Fonts don't load in Storybook.

**Solution:** Ensure fonts are copied before starting Storybook. This happens automatically with:

```bash
pnpm --filter @designgreat/lib-web-ui storybook
```

If fonts are still missing, manually copy them:

```bash
cp -r ../lib-web-ui-design-token/dist/font/* public/assets/fonts/
```

### Tailwind Utilities Not Generated

**Problem:** Utility classes don't work in components or stories.

**Solution:** Ensure Tailwind is processing the correct files. Check `tailwind.config.ts`:

```typescript
// tailwind.config.ts
;['./src/**/*.{js,jsx,ts,tsx}', './.storybook/**/*.{js,jsx,ts,tsx}']
```

Restart the dev server to regenerate utilities.

### TypeScript Build Errors

**Problem:** TypeScript fails to compile after token regeneration.

**Solution:** Ensure generated files are present:

```bash
ls -la src/styles/designgreat-theme.css
```

If missing, run:

```bash
pnpm --filter @designgreat/lib-web-ui generate:theme
```

### Test Failures

**Problem:** Tests fail after component or token changes.

**Solution:**

1. Run tests in watch mode to see detailed errors:
   ```bash
   pnpm --filter @designgreat/lib-web-ui test -- --watch
   ```
2. Update snapshots if needed:
   ```bash
   pnpm --filter @designgreat/lib-web-ui test -- -u
   ```

## Related Documentation

- [Component Library Usage Guide](https://graezykev.github.io/designgreat/components/guides/overview)
  – How to consume this library
- [Design Tokens Guide](https://graezykev.github.io/designgreat/docs/design-tokens/overview) –
  Understanding design tokens
- [Storybook Development](./STORYBOOK.md) – Detailed Storybook workflow
- [Design Token Package](/packages/lib-web-ui-design-token/README.md) – Token architecture

## Contributing

See the [monorepo root README](/README.md) for contribution guidelines.

## Future Improvements

- [ ] Explore on-demand CSS variable generation (only emit used tokens)
- [ ] Add component composition examples
- [ ] Investigate accessibility testing automation
- [ ] Add visual regression testing
- [ ] Improve tree-shaking for component bundles
