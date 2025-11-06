# @designgreat/lib-web-ui

Designgreat's React component library. Components consume the shared design token generated
variables and Tailwind utility layer emitted during the build step. Phase 3 introduces the initial
foundation with Button, TextInput, and Dialogue primitives alongside Storybook documentation and
testing infrastructure.

## Installation

```bash
pnpm add @designgreat/lib-web-ui
```

Peer dependencies:

- `react` `^18`
- `react-dom` `^18`

## Usage

Import the component(s) you need. The library automatically ships the Tailwind reset and theme
layer; ensure your application wraps content with one of the generated theme classes
(`dg-theme-light` / `dg-theme-dark`).

```tsx
import '@designgreat/lib-web-ui/dist/styles/tailwind.css' // once in your app entrypoint
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

> The distributed CSS already contains Tailwind base layers, component resets, and the exported
> design token variables. If your build tool tree-shakes CSS per entry (e.g. Next.js), make sure the
> import above executes on every page where components are rendered.
>
> **Already using Tailwind?** Add our CSS to your existing Tailwind entrypoint (e.g. `global.css`):
>
> ```css
> @tailwind base;
> @tailwind components;
> @tailwind utilities;
>
> /* include lib-web-ui tokens + utilities */
> @import '@designgreat/lib-web-ui/dist/styles/tailwind.css';
> ```
>
> Tailwind processes the imported file with your config, so theme variables and utilities coexist
> with your own layers. If you rely on `@tailwind base` to reset styles, keep the import after those
> directives to avoid overriding the reset order.

## Theming

Theme classes are generated from `@designgreat/lib-web-ui-design-token`. The light theme attaches to
`:root`, while additional themes can be applied via a wrapper:

```tsx
import { createThemeConfig } from '@designgreat/design-token-support'

const darkTheme = createThemeConfig('dark')

export function App() {
  return <div className={darkTheme.className}>{/* Application content */}</div>
}
```

## Components

- `Button` – Primary/secondary/outline variants with loading states and icon support.
- `TextInput` – Labeled input with helper and error messaging plus icon affordances.
- `Dialog` – Accessible modal with focus trapping, portal rendering, and section subcomponents
  (`DialogHeader`, `DialogBody`, `DialogFooter`, `DialogTitle`, `DialogDescription`).

See Storybook for interactive demos and controls. Run
`pnpm --filter @designgreat/lib-web-ui storybook` locally to explore the latest build.

## Development

```
┌───────────────────────────┐
│  Token Authoring (src/)   │
└──────────────┬────────────┘
               │  pnpm run generate:theme
               ▼
┌───────────────────────────┐
│ Style Dictionary build    │ ➜ emits theme CSS, JS helpers, TS typings
└──────────────┬────────────┘
               │
     ┌─────────┴──────────────────────────┐
     │                                    │
     ▼                                    ▼
┌───────────────────────────┐      ┌───────────────────────────┐
│  Dev flow (pnpm dev)      │      │  Storybook flow           │
│  • regenerate tokens      │      │  • regenerate tokens      │
│  • Vite dev server        │      │  • Vite Storybook server  │
│  • Tailwind JIT utilities │      │  • Tailwind JIT utilities │
│    from component usage   │      │    from stories           │
└──────────────┬────────────┘      └──────────────┬────────────┘
               │                                  │
               └──────────────┬───────────────────┘
                              ▼
                 Live preview with token-aware classes

┌───────────────────────────┐
│  pnpm build pipeline      │
│  • clean                  │
│  • generate:theme         │
│  • tsc -p tsconfig.build  │
│  • vite build (ESM/CJS)   │
│  • storybook build        │
└──────────────┬────────────┘
               │
               ▼
┌───────────────────────────┐
│  Published package        │ ➜ exports compiled bundles + `src/styles/tailwind.css`.
└───────────────────────────┘
```

- `pnpm --filter @designgreat/lib-web-ui dev`
  - Regenerates design tokens and launches the Vite dev server.
  - Tailwind generates token-aware utilities on demand as you edit components.
- `pnpm --filter @designgreat/lib-web-ui storybook`
  - Same pre-step (`generate:theme`) followed by the Vite-powered Storybook server.
  - Use the toolbar to toggle between light/dark theme classes.
- `pnpm --filter @designgreat/lib-web-ui build`
  - Executes the full CI pipeline (clean → tokens → typecheck → Vite build → Storybook static
    output).
- `pnpm --filter @designgreat/lib-web-ui lint`
  - Runs ESLint with the unified monorepo rules.
- `pnpm --filter @designgreat/lib-web-ui test`
  - Executes the Jest + React Testing Library suites under JSDOM.
- `pnpm --filter @designgreat/lib-web-ui typecheck`
  - Ensures the package compiles (`tsc --noEmit`). Generated artifacts
    (`src/styles/designgreat-theme.css`, declaration outputs) are committed to ease local iteration
    and integration with CI.

### Tailwind Token Utilities

The Tailwind configuration mirrors the design token tree so you can reference tokens directly in
utility class names without the verbose `bg-[var(--dg-…)]` syntax:

```tsx
<button className="bg-color-background-button-default text-color-text-button-default px-spacing-11">
  Submit
</button>
```

All colour utilities resolve to CSS variables (e.g. `var(--dg-color-…)`) so they respond
automatically to `dg-theme-light` / `dg-theme-dark`. Spacing, font size, and other scales are
generated from the active theme at build time.

> TODO: explore whether the design token build can emit CSS variables on demand (only for the tokens
> actually used) to trim the generated theme bundle size without hurting Theme switch behaviour.

## Storybook

- Quick-start, workflow tips, and troubleshooting live in [`STORYBOOK.md`](./STORYBOOK.md).
