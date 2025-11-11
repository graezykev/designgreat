---
'@designgreat/lib-web-ui': patch
---

Fix Storybook code/demo toggle background so a11y tooling can read dialog text contrast.

- Replaced the gradient overlay on toggle buttons with theme token fills and kept them in normal
  layout flow.
- Removes the invisible overlay covering dialog copy, letting axe confirm WCAG contrast for dialog
  content.
