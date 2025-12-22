---
'@designgreat/docs-design-system': minor
---

Add comprehensive design structure documentation

**New Files Created:**

**DESIGN_STRUCTURES.md** (1,469 lines): Comprehensive design structure documentation for all major
components:

- Button (with all variants, states, modifiers)
- Spinner
- Link
- Tag (with removable variant)
- Badge
- Input
- Checkbox
- Toggle
- Radio
- Select
- Dropdown
- Tab
- List
- Alert
- Tooltip
- Nav Pill
- Interactive Card
- **Navigation** (NEW): Complete structure for `.dg-nav`, `.dg-nav-primary`, `.dg-nav-secondary`,
  `.dg-nav-tertiary` with all states (hover, focus, active, selected) and BEM-compliant modifier
  classes

**ADDITIONAL_DESIGN_STRUCTURES.md** (361 lines): Additional design structures not covered in main
file:

- `.dg-app-bar-nav` structure
- Various card components (`.dg-text-card`, `.dg-card-subtle`, `.dg-card-accent-info`, etc.)
- Demo-specific card structures

**Key Features:**

- Complete component hierarchies with all states and modifiers
- Token references for all properties
- BEM-compliant naming conventions
- Usage examples for each component
- Navigation structure includes combined state rules (`:focus:hover`, `:focus:active`)
- Breadcrumb structure with separator handling

**Location:**

- Files moved from root to `packages/docs-design-system/` for better organization
- Part of design system documentation package

**Purpose:**

- Provides comprehensive reference for component structures
- Documents all CSS classes, states, and modifiers
- Serves as design system specification
- Enables consistent component implementation
