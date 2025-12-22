---
'@designgreat/lib-design-token': minor
---

Add input border hover token for better interactive feedback

**Changes:**

- Added `color.border.input.interaction.hover` token using `{color.alpha.neutral.4}` (slightly
  darker than default `neutral.3`)
- Added `color.border.input.interaction.focus` token using `{color.primary.focus.DEFAULT}`
  (standardized focus color)
- Added `border.input.hover` border token that combines width, style, and hover color
- Generated theme files updated automatically

**Impact:**

- Input borders now have a dedicated hover state for better visual feedback
- Hover state uses `neutral.4` alpha color (darker than default `neutral.3`) for improved visibility
- Focus state now uses the standardized primary focus color for consistency
- CSS variable `--dg-border-input-hover` is now available for use

**Usage:**

```css
.dg-input:hover {
  border: var(--dg-border-input-hover);
}
```
