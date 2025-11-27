---
'@designgreat/docs-design-system': minor
---

Comprehensive documentation restructure and color documentation expansion

## New Features

### Color Documentation System (NEW)

- Added complete color documentation suite under `/docs/colors/`
  - `base-colors.mdx` - Foundation grayscale and saturated color palettes
  - `accent-colors.mdx` - Theme-aware accent color system with emphasis levels
  - `alpha-colors.mdx` - Transparent color tokens with alpha channels
  - `primary-brand-colors.mdx` - Brand identity colors with categories
  - `secondary-tertiary-quartus.mdx` - Supporting brand colors
  - `semantic-colors.mdx` - Semantic color mappings (info, success, warning, error)
  - `core-concepts-theme-awareness.mdx` - Theme-aware color system explained with interactive
    diagrams
  - Shortcut documentation: `text.mdx`, `background.mdx`, `border.mdx`, `shadow.mdx`,
    `interactive-state.mdx`

### Interactive Components

- Added `<CopyableCode>` component for one-click CSS variable copying
- Enhanced color demo blocks with theme preview capabilities

### Documentation Tools

- Added `audit-color-docs.ts` - Comprehensive documentation auditing tool
  - Validates table structure integrity
  - Checks CSS variable correctness
  - Detects hardcoded colors in demos
  - Validates token references and mappings
  - Verifies alpha values and gradient levels

## Breaking Changes

### Folder Restructure

- **Renamed**: `/docs/design-tokens/` → `/docs/tutorial/`
  - Better reflects content purpose (getting started, integration guides)
  - All internal links updated automatically

### Removed Files

- Removed example tutorial files (`tutorial-basics`, `tutorial-extras`)
- Cleaned up unused documentation scaffolding

## Improvements

### Documentation Quality

- Updated all internal links to use new `/docs/tutorial/` path
- Enhanced navbar with direct link to tutorial overview
- Improved CSS custom properties for better documentation rendering
- Added comprehensive ESLint ignore patterns for documentation files

### Developer Experience

- Added TypeScript-based documentation audit tooling
- Improved documentation maintainability with automated validation
- Better organized content structure with clear separation between tutorial and reference docs

## Migration Guide

If you have bookmarked or linked to old documentation paths:

- `/docs/design-tokens/*` → `/docs/tutorial/*`
- All other documentation paths remain unchanged
