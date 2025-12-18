---
'@designgreat/docs-design-system': minor
---

Add navigation link states documentation and demos

**Changes:**

- Add hover, focus, active, and selected states for navigation links (`.dg-nav-primary`,
  `.dg-nav-secondary`, `.dg-nav-tertiary`)
- Add full state demos showing Default, Hover, Focus, Active, Selected states
- Update code sections to include all navigation state CSS rules
- Document combined state rules (`:focus:hover`, `:focus:active`) for proper interaction behavior
- Use new navigation hierarchy tokens (`--dg-color-text-nav-interaction-*`,
  `--dg-color-text-nav-state-selected`)

**Files Modified:**

- `docs-design-token/colors/shortcuts/text.mdx`: Added navigation states section with full state
  demos and code examples

**Purpose:**

- Documents navigation component interactive states
- Provides examples for developers using navigation components
- Ensures consistency with other interactive components (buttons, links, tabs)

**Related:**

- Requires navigation tokens from `@designgreat/lib-design-token` package
- CSS implementation in `custom.css` (separate changeset)
