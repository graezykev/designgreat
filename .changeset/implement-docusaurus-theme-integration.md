---
'@designgreat/docs-design-system': minor
---

**Implement design token theme integration with Docusaurus**

- Integrated `@designgreat/lib-web-ui-design-token`, `@designgreat/lib-web-ui`, and
  `@designgreat/design-token-support` for consistent theming across documentation site
- Implemented robust theme synchronization between Docusaurus's `[data-theme]` attribute and design
  token classes (`.dg-theme-light`, `.dg-theme-dark`)
- Created `Root.tsx` component with `MutationObserver` to maintain theme class synchronization
  during React lifecycle
- Added `preinit.ts` client module to apply theme classes before React hydration, preventing flash
  of unstyled content
- Created `constants.ts` that leverages `@designgreat/design-token-support` utilities
  (`getThemeClassName`, `ThemeName`) for centralized, type-safe theme management
- Mapped all Infima CSS variables (`--ifm-*`) to design token variables (`--dg-*`) in `custom.css`
  for comprehensive theme coverage including colors, typography, spacing, navigation, footer, code
  blocks, table of contents, and more
- Improved script organization by simplifying `dev` and `start` script relationship
- Removed unnecessary `@docusaurus/theme-common` dependency by implementing direct DOM manipulation
