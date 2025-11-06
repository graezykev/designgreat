# Storybook Workflow for @designgreat/lib-web-ui

This guide walks through common Storybook development tasks using the `Button` component as our
running example.

## Prerequisites

- Run `pnpm install` in the repo root to install dependencies
- Ensure the tokens are up-to-date: `pnpm --filter @designgreat/lib-web-ui generate:theme` (every
  Storybook/dev command invokes this step automatically)

## Quick Start: Running Storybook Locally

```bash
pnpm --filter @designgreat/lib-web-ui storybook
```

Storybook launches at http://localhost:6006. Use the **Theme** toolbar toggle (sun/moon icon) to
switch between light and dark modes—each Storybook story renders inside the `dg-theme-*` wrappers,
so token-driven Tailwind utilities update automatically.

## Editing Component Stories

1. Open the story file, e.g. `packages/lib-web-ui/src/components/button/Button.stories.tsx`.
2. Add stories or tweak args/controls (below we add a new variant).

```tsx
export const Destructive: Story = {
  args: {
    variant: 'primary',
    className: 'bg-color-semantic-error-DEFAULT text-color-text-inverse'
  }
}
```

3. Storybook hot-reloads instantly. The token alias `bg-color-semantic-error-DEFAULT` is generated
   on demand by Tailwind JIT, so you can see the new style immediately.

## Developing with Tailwind Token Utilities

- Use the token-driven classes exposed by our Tailwind config (e.g.
  `bg-color-background-button-default`, `px-spacing-11`).
- Tailwind watches both component source and stories, so classes that only appear in Storybook are
  still generated.
- If you add an entirely new component/story folder, update `content` globs in
  `packages/lib-web-ui/tailwind.config.ts`.

## Props Tables and Docs Tab

Storybook automatically reads TypeScript types and `Button.stories.tsx` args to populate the Docs
Tab. Document props thoroughly in your component TS file to get accurate tables.

## Snapshot Testing with Storybook Stories (Optional)

You can use Storybook snapshots or interaction tests if desired. For example,

```bash
pnpm --filter @designgreat/lib-web-ui storybook test --watch
```

will run Storybook’s test runner (powered by @storybook/test). This is optional—the existing Jest
suite already covers accessibility and behaviour.

## Building Storybook for QA / Deployments

```bash
pnpm --filter @designgreat/lib-web-ui storybook:build
```

Outputs the static Storybook into `packages/lib-web-ui/storybook-static/`. Useful for QA handoffs or
hosting via GitHub Pages/Netlify.

## Debugging Tips

- Run `pnpm --filter @designgreat/lib-web-ui lint` to catch JSX/Storybook lint issues.
- Tailwind classes not applying? Confirm the class exists in the generated styles:
  `tailwind.config.ts` -> check flattened token keys.
- If a story needs HTML/ARIA validation, pair it with your component’s RTL tests so behaviour is
  covered outside of Storybook too.

Happy Storybooking!
