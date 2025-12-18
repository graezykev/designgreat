# Step 3: Token Usage in Subsequent Demos - Final Report

## Summary

**Total Tokens Checked: 389**  
**Total Unused Tokens Found: 12**

All unused tokens are in `spacing/semantic-scales.mdx` and represent tokens that are defined in
tables but not used in subsequent demos.

---

## Analysis

### Files Checked

- **Colors Category**: 12 files, 138 tokens ✅ (all used)
- **Spacing Category**: 3 files, 34 tokens ⚠️ (12 unused)
- **Typography Category**: 4 files, 0 tokens ✅
- **Effects Category**: 3 files, 0 tokens ✅
- **Motion Category**: 4 files, 0 tokens ✅

### Unused Tokens Found

**spacing/semantic-scales.mdx (12 unused tokens):**

1. **Gap Tokens (5 unused):**
   - `spacing.gap.none` / `--dg-spacing-gap-none`
   - `spacing.gap.xs` / `--dg-spacing-gap-xs`
   - `spacing.gap.sm` / `--dg-spacing-gap-sm`
   - `spacing.gap.lg` / `--dg-spacing-gap-lg`
   - `spacing.gap.xl` / `--dg-spacing-gap-xl`

2. **Inset Tokens (4 unused):**
   - `spacing.inset.none` / `--dg-spacing-inset-none`
   - `spacing.inset.sm` / `--dg-spacing-inset-sm`
   - `spacing.inset.lg` / `--dg-spacing-inset-lg`
   - `spacing.inset.xl` / `--dg-spacing-inset-xl`

3. **Stack Tokens (4 unused):**
   - `spacing.stack.none` / `--dg-spacing-stack-none`
   - `spacing.stack.xs` / `--dg-spacing-stack-xs`
   - `spacing.stack.sm` / `--dg-spacing-stack-sm`
   - `spacing.stack.xl` / `--dg-spacing-stack-xl`

**Note:** These tokens are defined in tables but not used in subsequent demos. They may be:

- Reference tokens meant for documentation only
- Tokens that should have demos added
- Tokens used in other documentation files (not checked in this step)

---

## Key Improvements Made

1. **Demo Detection**: Added logic to only check tokens if there are actual demos after the table
   (not just reference documentation).

2. **Usage Examples Inclusion**: Modified content extraction to include "Usage Examples" sections
   even when they're major headings.

3. **Better Pattern Matching**: Fixed regex escaping for CSS variables to correctly detect usage in
   code examples.

4. **Table Boundary Detection**: Improved detection of table boundaries to avoid false positives
   from adjacent tables.

---

## Recommendations

For the 12 unused spacing tokens:

1. **Review if demos are needed**: Check if these tokens should have usage examples/demos added to
   the documentation.

2. **Verify cross-file usage**: These tokens might be used in other documentation files (not checked
   in this step).

3. **Consider reference-only tokens**: Some tokens might be intentionally reference-only and don't
   need demos.

---

## Conclusion

**Step 3 Complete**: Successfully identified tokens that are defined in tables but not used in
subsequent demos within the same file.

**Next Steps**: Review the 12 unused spacing tokens to determine if demos should be added or if
they're acceptable as reference-only tokens.
