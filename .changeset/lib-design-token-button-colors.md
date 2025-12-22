---
'@designgreat/lib-design-token': minor
---

Update button and input interaction color tokens for better UX

**Button State Colors Update:**

Updated button interaction colors at the token level to create a more intuitive interaction pattern:

- **Subtle buttons**: Adjusted hover and focus colors
  - Hover: Changed from `{color.alpha.neutral.3}` to `{color.alpha.neutral.4}` (darker, more
    visible)
  - Focus: Changed from `{color.alpha.neutral.4}` to `{color.alpha.neutral.3}` (lighter, clearer
    focus state)
  - Focus-visible: Changed from `{color.alpha.neutral.4}` to `{color.alpha.neutral.3}` (lighter,
    clearer focus state)
  - Active: Remains `{color.alpha.neutral.5}` (unchanged, darkest state)
- **Secondary buttons**: Made active state darker
  - Hover: Remains `{color.secondary.bold}` (unchanged)
  - Active: Changed from `{color.secondary.subtle}` to `{color.secondary.bolder}` (darker, feels
    pressed down)
- **Primary buttons**: Unchanged

**Input State Colors Update:**

- **Subtle input**: Changed default from `{color.alpha.neutral.4}` to `{color.alpha.neutral.3}`
  (lighter, better contrast)

This creates a more intuitive interaction pattern where hover states are more visible and focus
states are clearer, improving the visual feedback for user interactions.

**Files Updated:**

- `src/tokens/color/shortcut/input-interaction.js`: Updated subtle button hover/focus token values
- `src/tokens/color/shortcut/input.js`: Updated subtle input default token value

**Breaking Changes:**

None. This is a visual enhancement that maintains API compatibility.
