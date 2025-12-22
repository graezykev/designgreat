---
'@designgreat/lib-design-token': patch
---

Update input border token to use lighter alpha color

**Changes:**

- Changed `color.shortcut.input.border.DEFAULT` token from `{color.border.DEFAULT}` to
  `{color.alpha.neutral.3}`
- This makes input borders lighter and more subtle, improving visual hierarchy
- The change affects both light and dark themes automatically through the alpha color system

**Impact:**

- Input borders now use a lighter alpha color (`neutral.3`) instead of the default border color
- Light theme: Border color changed from `#1d1d1f7d` to `#1d1d1f24` (lighter/more transparent)
- Dark theme: Border color changed from `#e8e8e97d` to `#e8e8e924` (lighter/more transparent)
- Generated theme files updated automatically
