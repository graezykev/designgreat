---
'@designgreat/docs-design-system': patch
---

### Documentation Guides Refactor

**Design Token Guides** (`docs-design-token/guides/`)

- Added new `quick-start.mdx` — 2-minute getting started guide
- Renamed `css-integration.mdx` → `basic-usage.mdx` with simplified content
- Renamed `theme-switching.mdx` → `theming.mdx` with reorganized structure
- Renamed `font-integration.mdx` → `fonts.mdx` with TL;DR and collapsible sections
- Added new `react-native.mdx` — React Native integration guide
- Merged `typescript.mdx` and `runtime-apis.mdx` → `api/reference.mdx`
- Updated `tailwind.mdx` with TL;DR and improved examples
- Updated `installation.mdx` with collapsible advanced section
- Updated `overview.mdx` with Learning Path table and Package Exports table

**Web Component Guides** (`docs-web-component/guides/`)

- Added new `quick-start.mdx` — 2-minute getting started guide
- Renamed `font-setup.mdx` → `fonts.mdx` (simplified, cross-links to design-token)
- Renamed `framework-guides.mdx` → `frameworks.mdx`
- Renamed `tailwind-utilities.mdx` → `tailwind.mdx`
- Added new `theming.mdx` (simplified, cross-links to design-token)
- Updated `installation.mdx` with streamlined content
- Updated `overview.mdx` with Learning Path table and corrected Package Exports

**Documentation Conventions** (`docs-contributing/conventions.mdx`)

- Added "Next Steps" as required section for both Integration and Development docs
- Added "Next Steps Format" guidance (table vs bullets vs plain text)
- Fixed rendering issues with example tables

**Link Consistency**

- Removed `.mdx` extensions from all internal links for consistency
- Updated outdated links (e.g., `theme-switching` → `theming`)
- Fixed broken links in progress logs

**Sidebar Positions**

- Verified sequential positioning (0-8 for design-token, 0-6 for web-component)
