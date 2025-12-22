# Step 1: Token Existence and CSS Variable Verification - Issues Report

## Summary

**Total Issues Found: 62** (many are false positives that need verification)

---

## Issue Categories

### 1. Shorthand Token References (46 issues) - **LIKELY FALSE POSITIVES**

These appear to be shorthand references in the "Reference" column of tables, not actual token paths:

**Colors:**

- `grey.12`, `grey.1`, `grey.11`, etc. (in `accent-colors.mdx`) - These are shorthand for
  `{color.accent.grey.12}`
- `neutral.12`, `neutral.1`, etc. (in `accent-colors.mdx`) - These are shorthand for
  `{color.accent.neutral.12}`
- `color.accent.neutral`, `color.accent.grey` (in `accent-colors.mdx`) - These might be category
  references
- `color.alpha.neutral`, `color.alpha.grey` (in `alpha-colors.mdx`) - Category references
- `color.text`, `color.background` (in `core-concepts-theme-awareness.mdx`) - Category references
- `base.blue`, `accent.grey.1`, `primary.DEFAULT`, etc. (in `core-concepts-theme-awareness.mdx`) -
  Shorthand references
- `color.semantic.info` (in `semantic-colors.mdx`) - Should be `color.semantic.info.DEFAULT`?
- `color.text.success` (in `shortcuts/background.mdx`) - Should be `color.text.success.DEFAULT`?
- `color.text.link` (in `shortcuts/text.mdx`) - Should be `color.text.link.DEFAULT`?
- `alpha.neutral.4` (in `shortcuts/shadow.mdx`) - Should be `{color.alpha.neutral.4}`?

**Analysis**: These are likely shorthand references used in documentation tables' "Reference"
columns. They should be checked to ensure they're properly formatted as `{color.accent.grey.12}`
style references, not actual token paths.

---

### 2. Partial CSS Variable Matches (16 issues) - **LIKELY FALSE POSITIVES**

These are partial CSS variable names that were matched incorrectly:

- `--dg-border-` (in `border.mdx`) - Partial match, likely in text like "border tokens"
- `--dg-border-input-` (in `border.mdx`) - Partial match
- `--dg-border-divider-` (in `border.mdx`) - Partial match
- `--dg-shadow-elevation-` (in `shadow.mdx`, `elevation.mdx`) - Partial match
- `--dg-shadow-inset-` (in `shadow.mdx`, `elevation.mdx`) - Partial match
- `--dg-spacing-px` (in `pixel-values.mdx`) - Partial match, likely in text like "spacing px values"
- `--dg-spacing-inset-` (in `semantic-scales.mdx`) - Partial match
- `--dg-size-font-h` (in `font-sizes.mdx`) - Partial match, likely in text like "font h1"
- `--dg-font-weight-` (in `font-weights.mdx`) - Partial match
- `--dg-line-height-` (in `text-spacing.mdx`) - Partial match
- `--dg-size-border-radius-` (in `border-radius.mdx`) - Partial match
- `--dg-duration-` (in `duration.mdx`) - Partial match
- `--dg-cubic-bezier-` (in `easing.mdx`) - Partial match
- `--dg-transition-` (in `transitions.mdx`) - Partial match

**Analysis**: These are likely false positives from the regex matching partial variable names in
explanatory text. The script needs to be more precise - it should only match complete CSS variable
references, not partial strings.

---

## Recommendations

### For Shorthand References:

1. **Verify format**: Check if shorthand references like `grey.12` should be
   `{color.accent.grey.12}` in the Reference column
2. **Check actual usage**: Verify if these are used as token paths anywhere or just as documentation
   references

### For Partial Matches:

1. **Improve regex**: The script should match complete CSS variables only, not partial strings
2. **Context checking**: Only match CSS variables that appear in proper contexts (code blocks,
   CopyableCode components, etc.)

### Next Steps:

1. Review the actual MDX files to verify which issues are real vs false positives
2. Fix the script to be more accurate
3. Re-run the check with improved accuracy

---

## Files That Need Manual Review

1. `colors/accent-colors.mdx` - Check Reference column format
2. `colors/core-concepts-theme-awareness.mdx` - Check token reference format
3. `colors/shortcuts/shadow.mdx` - Check `alpha.neutral.4` reference
4. `colors/shortcuts/text.mdx` - Check `color.text.link` vs `color.text.link.DEFAULT`
5. `colors/shortcuts/background.mdx` - Check `color.text.success` reference

All other files with "undefined_css_var" issues are likely false positives from partial matches.
