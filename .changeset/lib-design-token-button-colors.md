---
'@designgreat/lib-design-token': minor
---

Update button interaction color tokens for better UX

**Button State Colors Update:**

Updated button interaction colors at the token level to create a more intuitive interaction pattern:

- **Subtle buttons**: Swapped hover and active colors
  - Hover: Changed from `{color.alpha.neutral.5}` to `{color.alpha.neutral.3}` (lighter, feels
    lifted)
  - Active: Changed from `{color.alpha.neutral.3}` to `{color.alpha.neutral.5}` (darker, feels
    pressed down)
- **Secondary buttons**: Made active state darker
  - Hover: Remains `{color.secondary.bold}` (unchanged)
  - Active: Changed from `{color.secondary.subtle}` to `{color.secondary.bolder}` (darker, feels
    pressed down)
- **Primary buttons**: Unchanged

This creates a more intuitive interaction pattern where active states feel darker (pressed down)
across all button variants, improving the visual feedback for user interactions.

**Files Updated:**

- `src/tokens/color/shortcut/input-interaction.js`: Updated subtle and secondary button hover/active
  token values

**Breaking Changes:**

None. This is a visual enhancement that maintains API compatibility.
