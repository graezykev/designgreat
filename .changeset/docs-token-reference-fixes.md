---
'@designgreat/docs-design-system': patch
---

Fix token reference values and use case descriptions

**Issue Found:** Token reference values in documentation tables were incorrect or outdated.

**Changes:**

- Fix `color.primary.active.DEFAULT` reference from `{color.primary.subtle}` to
  `{color.primary.bolder}` (active state should be darker than hover)
- Add missing `color.primary.bolder` token to emphasis table
- Update use case descriptions for clarity:
  - `color.primary.subtle`: Changed from "Active/pressed states" to "Subtle emphasis states"
  - `color.primary.active.DEFAULT`: Updated description to "Active/pressed state (darker than
    hover)"
- Update mermaid diagram to reflect correct active state reference (`active: bolder` instead of
  `active: subtle`)

**Files Modified:**

- `docs-design-token/colors/primary-brand-colors.mdx`: Token reference fixes and table updates

**Purpose:**

- Ensures documentation accurately reflects token relationships
- Provides correct guidance for developers on token usage
- Maintains consistency between token values and documentation
