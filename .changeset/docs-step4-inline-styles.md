---
'@designgreat/docs-design-system': patch
---

Fix inline style violations in documentation demos (Step 4 compliance)

**Issue Found:** Step 4 check identified inline styles in demos that should use CSS classes instead.

**Changes:**

- Remove inline style `style={{height: 'var(--dg-spacing-stack-md)'}}` from
  spacing/semantic-scales.mdx
- Replace with CSS class `.dg-spacing-indicator-height-md` for consistency
- Update code sections in MDX files to reflect CSS class usage instead of inline styles

**Files Modified:**

- `docs-design-token/spacing/semantic-scales.mdx`: Removed inline style, added CSS class usage

**Compliance:**

- Removes inline style violations (Step 4 requirement)
- Uses CSS classes with design tokens instead of inline styles
- Maintains functionality while following best practices
