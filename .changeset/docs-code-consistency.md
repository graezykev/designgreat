---
'@designgreat/docs-design-system': minor
---

Improve code section consistency across documentation (Step 12 compliance)

**Issue Found:** Step 12 check identified inconsistencies between demo HTML and code sections across
multiple documentation files.

**Changes:**

- Update code sections to match demo HTML exactly
- Ensure all component classes shown in demos are documented in code sections
- Add missing CSS rules to code sections
- Fix class name inconsistencies (e.g., single-dash vs double-dash modifiers)
- Update button state examples to use BEM-compliant modifier classes (`--hover`, `--focus`,
  `--active`, `--disabled`)

**Files Modified:**

- `docs-design-token/colors/shortcuts/interactive-state.mdx`: Updated button state demos and code
  sections
- `docs-design-token/colors/shortcuts/text.mdx`: Updated navigation demos and code sections
- `docs-design-token/colors/shortcuts/background.mdx`: Updated code sections
- `docs-design-token/colors/shortcuts/border.mdx`: Updated code sections
- `docs-design-token/colors/shortcuts/shadow.mdx`: Updated code sections
- Multiple other documentation files: Code section updates for consistency

**Compliance:**

- Ensures code sections are complete and consistent with demos (Step 12 requirement)
- Provides accurate code examples for developers
- Maintains demo-code consistency across all documentation
