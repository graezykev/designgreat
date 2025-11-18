---
'@designgreat/lib-web-ui': patch
---

**Fix theme CSS cascade order for proper dark mode support**

- Fixed CSS generation order in `generate-theme-css.ts` to ensure light theme (`:root`) is defined
  before dark theme (`.dg-theme-dark`)
- This prevents dark theme variables from being overridden by light theme in the CSS cascade
- Updated README documentation to explain the theme CSS ordering and its importance for proper theme
  switching
