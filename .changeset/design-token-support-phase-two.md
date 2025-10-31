---
'@designgreat/design-token-support': minor
---

## Design Token Support Alignment

- **What changed?**
  - 1. Pointed the helpers at the regenerated token outputs.
  - 2. Refreshed CSS-variable generation utilities to match the new structure.
  - 3. Added alignment tests to keep Tailwind integrations in sync.

- **Why does it matter?**
  - 1. Ensures consumers continue to receive accurate token-derived styles.
  - 2. Reduces drift between runtime helpers and the core token package.
  - 3. Protects against regressions as the token pipeline evolves.

- **What's next?**
  - 1. Ship utilities for dynamic theme loading in client apps.
  - 2. Document advanced usage patterns for Tailwind v4 and SSR.
  - 3. Track downstream adoption and gather feedback for additional helpers.
