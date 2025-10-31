---
'@designgreat/lib-web-ui-design-token': minor
---

## Design Token Pipeline

- **What changed?**
  - 1. Migrated the token source into the core package under Style Dictionary v5.
  - 2. Added the multi-stage build (font download, per-theme CSS/JS bundles, flattened TypeScript
       themes).
  - 3. Introduced runtime validators to guard token integrity.

- **Why does it matter?**
  - 1. Consolidates all token outputs into a single, consumable package.
  - 2. Provides typed accessors and ready-to-use theme assets for downstream apps.
  - 3. Catches regressions early through automated validation.

- **What's next?**
  - 1. Resolve Style Dictionary naming collisions surfaced during the build.
  - 2. Broaden semantic token coverage now that the pipeline is stable.
  - 3. Publish consumption guides for app teams targeting Tailwind and CSS variables.
