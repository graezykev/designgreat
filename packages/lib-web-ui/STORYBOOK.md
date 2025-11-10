# Storybook Workflow for @designgreat/lib-web-ui

This guide captures the end-to-end workflow the design systems team follows when developing or
debugging Storybook stories. It complements the component README files and should be treated as the
single source of truth for Storybook-specific requirements.

## 1. Prerequisites

- Install dependencies from the repo root: `pnpm install`.
- All Storybook/dev commands regenerate tokens automatically, but you can run
  `pnpm --filter @designgreat/lib-web-ui generate:theme` manually if you suspect stale theme output.
- Ensure you are on a recent Node LTS release to avoid Vite/Storybook warnings.

## 2. Running Storybook During Development

```bash
pnpm --filter @designgreat/lib-web-ui storybook
```

Storybook starts on http://localhost:6006. Use the **Theme** toolbar toggle (sun/moon icon) to
switch between light and dark palettes. Stories render inside `dg-theme-*` wrappers, so Tailwind
token utilities update instantly when the theme changes.

### Hot Reload Expectations

- Edits to stories, components, or tokens hot reload in place.
- If Tailwind classes do not appear, confirm the file path is covered by the Tailwind `content`
  globs (see `packages/lib-web-ui/tailwind.config.ts`).

## 3. Shared Demo/Code Toggle

Every interactive story should use the shared toggle that lives in
`packages/lib-web-ui/src/storybook/CodeDemoToggle.tsx`.

```tsx
import { withCodeDemo } from '../../storybook/CodeDemoToggle'

const CODE_SNIPPETS = {
  primary: `import { Button } from '@designgreat/lib-web-ui'

export function PrimaryCTA() {
  return <Button variant="primary">CTA Button</Button>
}`
} as const

const renderWithCodeToggle = (code: string) =>
  withCodeDemo<ButtonProps>({
    code,
    // eslint-disable-next-line react/jsx-no-undef
    render: (args) => <Button {...args} />
  })

export const Primary: Story = {
  render: renderWithCodeToggle(CODE_SNIPPETS.primary),
  parameters: buildDocsParameters(CODE_SNIPPETS.primary)
}
```

### Snippet Requirements

1. Keep snippets short (show only the props needed for that story).
2. Reflect the rendered state exactly—if args change, update the snippet and Docs tab parameters.
3. Declare snippets as template literals in the story file so linting and copy-to-clipboard work.
4. The `CodeDemoToggle` enforces copy-to-clipboard behaviour and a scrollable panel; avoid inline
   `dangerouslySetInnerHTML` elsewhere.

## 4. Story Authoring Checklist

- **Args & Controls:** Provide sensible defaults via `args` so Storybook’s Controls panel can tweak
  props. Use `argTypes` to restrict lists (radio/inline-radio) for enums.
- **Docs Tab:** Use a helper such as `buildDocsParameters` to point Docs at the same snippet string
  used by the toggle. Keep descriptions concise and outcome-oriented.
- **Accessibility:** Prefer real interactive elements (buttons, inputs) over plain `<div>`s. When a
  story relies on keyboard/ARIA interactions, mirror the scenario in RTL tests.
- **Variations:** Group similar stories into their component folder. If you add a new component or
  story tree, export it from `packages/lib-web-ui/src/components/index.ts` so consumers can
  replicate the example.

## 5. Tailwind Token Utilities

- Use the generated token-driven classes (`bg-color-*`, `px-spacing-*`, etc.). Tailwind is
  configured to scan both source and Storybook files, so classes referenced only in stories are
  still emitted.
- If you introduce an entirely new story directory, update the Tailwind `content` globs.

## 6. Linting, Tests, and QA

- `pnpm --filter @designgreat/lib-web-ui lint` to catch JSX, Storybook, or accessibility lint
  issues.
- Optional snapshot/interaction tests can be run via
  `pnpm --filter @designgreat/lib-web-ui storybook test --watch`.
- Components themselves should continue to rely on Jest + React Testing Library for behavioural
  coverage; Storybook is for documentation and visual QA.

## 7. Building Storybook

```bash
pnpm --filter @designgreat/lib-web-ui storybook:build
```

Artifacts land in `packages/lib-web-ui/storybook-static/` and can be uploaded to QA hosts (Netlify,
Pages, etc.). Run this before handoffs to product/design teams.

## 8. Troubleshooting

- **Theme desync:** If toggling light/dark does nothing, ensure the preview iframe body contains the
  expected `dg-theme-*` class. Re-running the dev server typically fixes it.
- **Token mismatch:** Re-run `generate:theme` or blow away `node_modules/.cache` if Tailwind refuses
  to emit a new token class.
- **Story fails to load:** Check the browser console for async import errors—Storybook surfaces
  stack traces pointing to the offending story file.

Happy Storybooking!
