# @designgreat/lib-web-ui-design-token

Designgreat's source of truth for UI design tokens. The package bundles the token authoring source,
the Style Dictionary build pipeline (light/dark themes, CSS/JS outputs, Tailwind helpers), and the
TypeScript runtime that downstream packages consume.

## Scripts

| Script                  | Description                                                                                                                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm run build`        | Clean previously generated artifacts, rebuild tokens (fonts download → Style Dictionary multi-platform build → TypeScript generation), compile the runtime, and copy the raw token sources into `dist/tokens`. |
| `pnpm run build:tokens` | Run only the token toolchain (best-effort Roboto font fetch, Style Dictionary build, `src/generated/themes.ts` emission).                                                                                      |
| `pnpm run watch`        | Convenience alias for `pnpm run build:tokens`. Useful while iterating on token files.                                                                                                                          |
| `pnpm run validate`     | Execute integrity checks for the generated themes (ensures required sections exist).                                                                                                                           |
| `pnpm run test`         | Run the Vitest suite for the runtime helpers and validation utilities.                                                                                                                                         |
| `pnpm run lint`         | Lint the TypeScript runtime and build scripts.                                                                                                                                                                 |
| `pnpm run typecheck`    | Type-check the runtime source without emitting files.                                                                                                                                                          |

> Full token concepts, API usage, and integration recipes live in
> [`docs/design-system/design-tokens.md`](/docs/design-system/design-tokens.md).

## Build Workflow

1. Update or add files in `src/tokens/**`.
2. Execute `pnpm --filter @designgreat/lib-web-ui-design-token run build` (or `build:tokens` while
   iterating) to regenerate Style Dictionary outputs, fonts, and TypeScript artifacts.
3. Run quality gates:
   `pnpm --filter @designgreat/lib-web-ui-design-token lint test typecheck validate`.
4. Rebuild the integration helper package when needed:
   - `pnpm --filter @designgreat/design-token-support build`
5. Commit regenerated artifacts (`dist/**`, `src/generated/themes.ts`, copied fonts) alongside the
   source changes.

## Validation & Testing

- `pnpm --filter @designgreat/lib-web-ui-design-token test` – verifies runtime helpers and
  validation utilities.
- `pnpm --filter @designgreat/lib-web-ui-design-token validate` – runs integrity assertions against
  the generated themes.
- `pnpm --filter @designgreat/lib-web-ui-design-token typecheck` – static analysis for the runtime.
- `pnpm --filter @designgreat/design-token-support test` – ensures CSS variable helpers continue to
  flatten themes correctly.
- `pnpm --filter @designgreat/design-token-support build` – confirms the public re-export package
  compiles after dependency updates.

## Troubleshooting

- **Roboto download warnings:** Safe to ignore when running offline; rerun the build once network
  access is available to populate `dist/assets/fonts`.
- **Stale generated types:** Run `pnpm run build:tokens` to regenerate `src/generated/themes.ts`
  after editing files in `src/tokens`.
- **Missing CSS variables in downstream apps:** Ensure `pnpm run build` has completed so
  `dist/index.js` and the theme-specific CSS bundles exist before publishing or linking the package.
