---
'@designgreat/lib-web-ui': patch
---

**Improve CodeDemoToggle toggle contrast in Storybook**

- 1. Drive inactive Demo/Code labels from `var(--dg-color-text-default)` so the switch meets AA
     contrast even without the global dark class on non-story pages.
- 2. Drop the unused `themeVariant` prop in favor of the shared token-based styling.
