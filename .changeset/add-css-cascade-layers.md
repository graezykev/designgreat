---
'@designgreat/lib-web-component': minor
---

Added CSS Cascade Layers for predictable styling and easier consumer overrides.

**New layer architecture:**

- `dg-tokens` — Design tokens (lowest priority)
- `dg-components` — Component styles
- Unlayered utilities — Tailwind utilities (highest priority)

**Benefits:**

- Consumer utility classes like `<Button className="bg-red-500">` now reliably override component
  styles
- Works with both Tailwind v3 and v4
- Explicit cascade control regardless of import order

**Migration:** No breaking changes. Existing consumers will benefit automatically.
