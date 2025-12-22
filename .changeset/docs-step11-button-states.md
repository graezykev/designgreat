---
'@designgreat/docs-design-system': patch
---

Update button demo code sections to include disabled state (Step 11 compliance)

**Issue Found:** Step 11 check identified that button demos were using `dg-btn-primary--disabled`
class but code sections didn't show the corresponding CSS.

**Changes:**

- Update code sections in interactive-state.mdx to include `.dg-btn-primary:disabled` and
  `.dg-btn-primary--disabled` CSS rules
- Ensure code sections match demo HTML for all button states
- Document both pseudo-class and modifier class patterns for disabled state

**Files Modified:**

- `docs-design-token/colors/shortcuts/interactive-state.mdx`: Added disabled state CSS to code
  sections

**Compliance:**

- Ensures code sections are complete and consistent with demos (Step 12 requirement)
- Documents both interactive state patterns (Step 11 requirement)
- Provides accurate code examples for developers
