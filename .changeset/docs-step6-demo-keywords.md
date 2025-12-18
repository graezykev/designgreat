---
'@designgreat/docs-design-system': patch
---

Rename demo-related class names to remove "-demo-" keyword (Step 6 compliance)

**Issue Found:** Step 6 check identified CSS class names containing "-demo-" keyword that should be
renamed for consistency.

**Changes:**

- Rename `dg-gap-demo` → `dg-gap-showcase` in spacing demos
- Rename `dg-inset-demo-card` → `dg-inset-showcase-card` in spacing demos
- Update all references in both demo HTML and code sections
- Maintain functionality while improving naming consistency

**Files Modified:**

- `docs-design-token/spacing/semantic-scales.mdx`: Updated class names from `-demo-` to `-showcase-`

**Compliance:**

- Removes "-demo-" keyword from class names (Step 6 requirement)
- Uses more semantic naming (`-showcase-` instead of `-demo-`)
- Keeps legitimate utility classes (`.color-demo`, `.spacing-demo`) unchanged as they're acceptable
