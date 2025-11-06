# Dependency Upgrade Roadmap

> Working list of future package bumps across the mono-repo. Update this document as new major
> releases ship or once the upgrades are complete.

## React Ecosystem

- [ ] React / React DOM → 19.x (current: 18.3.1)
  - Validate Storybook compatibility (upgrade to ≥8.6 or 10.x as needed)
  - Re-run RTL + Jest suites; ensure type packages (`@types/react*`) stay in sync
- [ ] Storybook → 10.x (current: 8.6.x)
  - Adopt Builder V4 config format and new story store
  - Replace `.storybook/main.ts` overrides once migration codemods run

## Build & Tooling

- [ ] Vite → 7.x (current: 6.x)
  - Upgrade `@vitejs/plugin-react` (≥5.x) and rebuild Storybook Vite integration
  - Verify Turborepo cache behaviour and any `esbuild` peer dependency changes
- [ ] TypeScript → ≥5.6 (current: 5.4.x)
  - Regenerate declaration outputs; watch for breaking changes in `verbatimModuleSyntax`
- [ ] TailwindCSS → 4.x (current: 3.4.x)
  - Prototype in a branch; align token integration with new CSS-first authoring model
- [ ] PostCSS / Autoprefixer → latest minor versions once Tailwind upgrades land

## Testing Stack

- [ ] @testing-library/user-event → next major once released (current: 14.6.1)
  - Track changelog for breaking interaction API changes
- [ ] Jest → 30.x (current: 29.7.0)
  - Revisit `ts-node` loader usage; consider native ESM configuration

## CI & Publishing

- [ ] Changesets → latest minor (review release notes for GitHub Actions integration)
- [ ] PNPM → ≥10.x (current workspace default: 9.x)
  - Validate lockfile changes and CI runners

## Infrastructure Packages

- [ ] Re-run `pnpm outdated` quarterly and update this list with new majors
- [ ] For any package already upgraded, check the box above and remove associated TODOs.
