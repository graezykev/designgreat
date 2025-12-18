---
'@designgreat/docs-design-system': patch
---

Update documentation to use BEM-compliant modifier classes

**Issue Found:** Documentation was using inconsistent modifier class naming (single-dash vs
double-dash).

**Changes:**

- Update all modifier classes from single-dash (`dg-btn-primary-hover`) to double-dash
  (`dg-btn-primary--hover`) for BEM compliance
- Update navigation modifier classes to use double-dash (`dg-nav-primary--hover`,
  `dg-nav-primary--focus`, etc.)
- Ensure all interactive state modifier classes follow BEM standard (`--hover`, `--focus`,
  `--active`, `--disabled`, `--selected`)
- Update both demo HTML and code sections to reflect BEM-compliant naming

**Files Modified:**

- `docs-design-token/colors/shortcuts/interactive-state.mdx`: Button modifier classes
- `docs-design-token/colors/shortcuts/text.mdx`: Navigation modifier classes
- Other documentation files: Consistent modifier class naming

**Compliance:**

- Follows BEM (Block Element Modifier) methodology
- Ensures consistency with CSS implementation
- Provides accurate examples for developers following BEM conventions
