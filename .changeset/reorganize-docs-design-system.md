---
'@designgreat/docs-design-system': minor
---

Reorganize design system documentation structure

**Component Library Documentation:**

- Migrated `docs/design-system/web-components.md` to multiple focused MDX files in
  `docs-components/guides/`
- Created comprehensive guides: Overview, Installation, Theming, Font Setup, Tailwind Utilities,
  Framework Guides, and Troubleshooting
- Updated navbar to point to `guides/overview` as the main entry point for component documentation
- Added `_category_.json` files to control sidebar ordering and enable category linking
- Organized component-specific docs under their respective folders (button, text-input, dialog)

**Design Tokens Documentation:**

- Migrated `docs/design-system/design-tokens.md` to multiple focused MDX files in
  `docs/design-tokens/`
- Created comprehensive guides: Overview, Installation, CSS Integration, Theme Switching, Font
  Integration, and Tailwind Integration
- Grouped API documentation (Package Exports, Runtime APIs, TypeScript Types) under
  `docs/design-tokens/api/` subfolder
- Positioned Design Tokens category first in the main docs sidebar
- Renamed font documentation from "Font Assets" to "Font Integration" for clarity

**Link Updates:**

- Fixed all internal documentation links to use correct relative paths
- Updated GitHub organization references from `chunwenyang` to `graezykev` across all documentation
- Corrected component documentation links to point to proper index pages
- Updated cross-references between design token and component library documentation

**Content Improvements:**

- Refined font documentation to accurately reflect provided font assets (Roboto, woff2 only)
- Added detailed usage instructions for Roboto font integration
- Improved documentation structure with better logical flow and categorization
- Enhanced cross-linking between related documentation sections
