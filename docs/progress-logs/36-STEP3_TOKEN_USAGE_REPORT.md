# Step 3: Token Usage in Subsequent Demos Report

**Date**: Generated during comprehensive documentation review  
**Step**: 3 of 12  
**Status**: ✅ Script Refactored - 27 Unused Tokens Found (Mostly Acceptable)

## Summary

This report documents the findings from Step 3 of the comprehensive documentation review, which
checks if tokens defined in tables are used in subsequent demos or "Usage Examples" sections.

### Check Results

- **Total files checked**: 22
- **Total tokens found**: 389
- **Total unused tokens**: 27 (after script refactoring)
- **Script improvements**: Bug fix applied (inline demos are visual references only)

## Script Refactoring

### Bug Fix #1: Table End Detection

**Issue**: The script was using `Math.max()` to get the table end position for all tokens in a
table, causing early tokens to be checked against content that came after their actual usage.

**Fix**: Changed the script to check each token individually using its own `tableEnd` position,
rather than the max `tableEnd` of all tokens in the table.

**Result**: ✅ `color.background.boldest` and `color.background.discover.DEFAULT` are now correctly
detected as used.

### Clarification: Inline Demos Are Visual References Only

**Decision**: Both `spacing-demo` and `color-demo` divs are treated as visual references only and
don't exempt tokens from needing usage in subsequent demos.

**Rationale**:

- Inline demos (`spacing-demo`, `color-demo` divs) are visual references showing token values
- They don't demonstrate actual usage patterns or practical applications
- Tokens still need to be shown in separate demo sections to demonstrate real-world usage

**Result**: ✅ All tokens are checked for usage in subsequent demos, regardless of inline demo
presence.

---

## Issues Found (After Refactoring)

### 1. `colors/accent-colors.mdx` (6 unused tokens)

**Tokens**:

- `color.accent.neutral.lower`
- `color.accent.neutral.lowest`
- `color.accent.neutral.dull`
- `color.accent.neutral.duller`
- `color.accent.neutral.dullest`
- `color.accent.neutral.silent`

**Context**: These are neutral accent color variants shown in reference tables with `color-demo`
divs, but not used in subsequent demo sections.

**Status**: ⚠️ **REVIEW REQUIRED** - These tokens have `color-demo` divs (visual references) but may
be intentionally not demonstrated in separate demo sections.

---

### 2. `colors/primary-brand-colors.mdx` (6 unused tokens)

**Tokens**:

- `color.primary.disabled.DEFAULT`
- `color.primary.activated.DEFAULT`
- `color.primary.activated.bg`
- `color.primary.opened.DEFAULT`
- `color.primary.opened.bg`
- `color.primary.checked.DEFAULT`

**Context**: These are primary color state variants (disabled, activated, opened, checked) that may
be intentionally not demonstrated.

**Status**: ⚠️ **REVIEW REQUIRED** - These are state variants that may be intentionally not
demonstrated.

---

### 3. `colors/semantic-colors.mdx` (3 unused tokens)

**Tokens**:

- `color.semantic.error.subtler`
- `color.semantic.error.subtlest`
- `color.semantic.error.lower`

**Context**: These are error semantic color variants that may be intentionally not demonstrated.

**Status**: ⚠️ **REVIEW REQUIRED** - These are variant tokens that may be intentionally not
demonstrated.

---

### 4. `colors/shortcuts/background.mdx` ✅ FIXED

#### Issue 1: `color.background.boldest` ✅ FIXED

**Token Details**:

- **Token**: `color.background.boldest`
- **CSS Variable**: `--dg-color-background-boldest`
- **Defined in**: Table at line 21
- **Reference**: `{color.accent.neutral.dull}`
- **Use Case**: Darkest backgrounds, high contrast

**Actual Usage**:

- ✅ Used in visual demo (line 32):
  `<button className="dg-btn dg-btn-neutral dg-btn-neutral--active">Active</button>`
- ✅ Used in CSS code examples:
  - Line 79: `.dg-btn-neutral:active { background-color: var(--dg-color-background-boldest); }`
  - Line 85:
    `.dg-btn-neutral--active:active { background-color: var(--dg-color-background-boldest); }`
  - Line 151: `.dg-layout-sidebar { background-color: var(--dg-color-background-boldest); }`

**Status**: ✅ **FIXED** - After fixing the script bug, the token is now correctly detected as used.

---

#### Issue 2: `color.background.discover.DEFAULT` ✅ FIXED

**Token Details**:

- **Token**: `color.background.discover.DEFAULT`
- **CSS Variable**: `--dg-color-background-discover-default`
- **Defined in**: Table at line 173
- **Reference**: `{color.semantic.new.lowest}`
- **Use Case**: New feature background

**Actual Usage**:

- ✅ Used in CSS code examples:
  - Line 213: `.dg-badge-discover` style
  - Line 294: `.dg-alert-discover` style
- ✅ Used in visual demos (badge and alert components)

**Status**: ✅ **FIXED** - After fixing the script bug, the token is now correctly detected as used.

---

### 5. `spacing/semantic-scales.mdx` (12 unused tokens)

#### Gap Scale Tokens (5 unused)

**Tokens**:

- `spacing.gap.none`
- `spacing.gap.xs`
- `spacing.gap.sm`
- `spacing.gap.lg`
- `spacing.gap.xl`

**Context**:

- All tokens are defined in the "Gap Scale" table (lines 37-42)
- Each token has an inline `spacing-demo` div in the table showing the width
- Only `spacing.gap.md` is demonstrated in a separate demo section (lines 44-81)
- Inline `spacing-demo` divs are visual references only and don't exempt tokens from needing usage

**Status**: ⚠️ **REVIEW REQUIRED** - These tokens have inline demos but may be intentionally not
demonstrated in separate demo sections.

---

#### Inset Scale Tokens (3 unused)

**Tokens**:

- `spacing.inset.none`
- `spacing.inset.sm`
- `spacing.inset.lg`

**Context**:

- All tokens are defined in the "Inset Scale" table (lines 91-96)
- Each token has an inline `spacing-demo` div in the table showing the width
- Only `spacing.inset.md` and `spacing.inset.xs` are demonstrated in separate demo sections
- Inline `spacing-demo` divs are visual references only and don't exempt tokens from needing usage

**Status**: ⚠️ **REVIEW REQUIRED** - These tokens have inline demos but may be intentionally not
demonstrated in separate demo sections.

---

#### Stack Scale Tokens (4 unused)

**Tokens**:

- `spacing.stack.none`
- `spacing.stack.xs`
- `spacing.stack.sm`
- `spacing.stack.xl`

**Context**:

- All tokens are defined in the "Stack Scale" table (lines 162-167)
- These tokens don't have inline `spacing-demo` divs in the table (unlike gap and inset scales)
- Only `spacing.stack.md` and `spacing.stack.lg` are demonstrated in separate demo sections

**Status**: ⚠️ **REVIEW REQUIRED** - These tokens don't have inline demos and aren't used in
subsequent demos. May be intentionally not demonstrated.

---

## Analysis

### Pattern Recognition

1. **Color Tokens with `color-demo` divs**:
   - Tokens have visual references (`color-demo` divs) in tables
   - These are visual references only, not functional demos
   - Tokens still need usage in subsequent demo sections
   - Many may be intentionally not demonstrated (acceptable per Step 3 notes)

2. **Spacing Tokens with `spacing-demo` divs**:
   - Tokens have inline visual references (`spacing-demo` divs) in tables
   - These are visual references only, not functional demonstrations
   - Tokens still need usage in subsequent demo sections
   - Many may be intentionally not demonstrated (acceptable per Step 3 notes)

3. **State/Variant Tokens**:
   - Many state variants (disabled, activated, opened, checked) may be intentionally not
     demonstrated
   - Variant tokens (subtler, subtlest, lower) may be intentionally not demonstrated

### Script Behavior (After Refactoring)

The Step 3 script now checks for:

- Tokens defined in tables
- Usage in subsequent "Usage Examples" sections
- Usage in separate demo blocks (Tabs components with demo/code)

The script does NOT count:

- Inline demos (`spacing-demo`, `color-demo` divs) - visual references only
- CSS code examples (even if they use the tokens)
- References in other documents

## Recommendations

### Option 1: Accept as-is (Recommended)

**Rationale**:

- Background tokens are used in CSS code examples, showing practical usage
- Spacing tokens are demonstrated inline in tables, which is a valid demonstration method
- Per Step 3 notes: "Some tokens may be intentionally not demonstrated (acceptable)"
- Adding demos for every token might make documentation too verbose

**Action**: Mark as acceptable and proceed to Step 4

---

### Option 2: Add Demo Sections

**For Background Tokens**:

- Add a demo section showing `color.background.boldest` usage
- Add a demo section showing `color.background.discover.DEFAULT` usage

**For Spacing Tokens**:

- Add demo sections for unused gap tokens (none, xs, sm, lg, xl)
- Add demo sections for unused inset tokens (none, sm, lg)
- Add demo sections for unused stack tokens (none, xs, sm, xl)

**Consideration**: This would significantly expand the documentation and may not add much value
since:

- Background tokens are already shown in code examples
- Spacing tokens are already shown in inline table demos

---

### Option 3: Update Script Logic

**Consideration**: The script could be updated to recognize:

- Inline table demos (`spacing-demo` divs) as valid demonstrations
- CSS code examples as valid usage

**Note**: This would require script modification, which is outside the scope of this review.

---

## Detailed Breakdown

### By File

| File                              | Tokens Defined | Unused Tokens | Usage Pattern                                                  |
| --------------------------------- | -------------- | ------------- | -------------------------------------------------------------- |
| `colors/accent-colors.mdx`        | 138            | 6             | Have `color-demo` divs, not used in demos                      |
| `colors/primary-brand-colors.mdx` | 18             | 6             | State variants, may be intentionally not demonstrated          |
| `colors/semantic-colors.mdx`      | 48             | 3             | Error variants, may be intentionally not demonstrated          |
| `spacing/semantic-scales.mdx`     | 31             | 12            | Have `spacing-demo` divs or no inline demos, not used in demos |

### By Category

| Category                         | Unused Tokens | Pattern                                               |
| -------------------------------- | ------------- | ----------------------------------------------------- |
| Accent colors (neutral variants) | 6             | Have `color-demo` divs, not used in demos             |
| Primary colors (state variants)  | 6             | State variants, may be intentionally not demonstrated |
| Semantic colors (error variants) | 3             | Variant tokens, may be intentionally not demonstrated |
| Gap spacing                      | 5             | Have `spacing-demo` divs, not used in demos           |
| Inset spacing                    | 3             | Have `spacing-demo` divs, not used in demos           |
| Stack spacing                    | 4             | No inline demos, not in demo sections                 |

## Conclusion

**Step 3 Status**: ✅ **SCRIPT REFACTORED - 27 UNUSED TOKENS REMAINING**

**Script Improvements**:

1. ✅ **Bug Fix**: Fixed table end detection - now checks each token individually
2. ✅ **Clarification**: Inline demos (`spacing-demo`, `color-demo` divs) are visual references only
   and don't exempt tokens

**Results**:

- `color.background.boldest` and `color.background.discover.DEFAULT` now correctly detected as used
- All tokens checked for usage in subsequent demos, regardless of inline demo presence
- Inline demos correctly treated as visual references (tokens still need usage in demo sections)

**Remaining Issues** (27 tokens):

- **6 accent color tokens**: Neutral variants (lower, lowest, dull, etc.) - have `color-demo` divs
  but not used in demos
- **6 primary color tokens**: State variants (disabled, activated, opened, checked) - may be
  intentionally not demonstrated
- **3 semantic color tokens**: Error variants (subtler, subtlest, lower) - may be intentionally not
  demonstrated
- **5 gap spacing tokens**: Have `spacing-demo` divs but not used in demos - may be intentionally
  not demonstrated
- **3 inset spacing tokens**: Have `spacing-demo` divs but not used in demos - may be intentionally
  not demonstrated
- **4 stack spacing tokens**: No inline demos, not used in subsequent demos - may be intentionally
  not demonstrated

**Recommendation**:

- ✅ Script refactoring complete - tokens are now correctly detected
- Review remaining 19 tokens - most appear to be intentionally not demonstrated
- Per Step 3 notes: "Some tokens may be intentionally not demonstrated (acceptable)"

## Next Steps

**AWAITING DISCUSSION** - Please review this report and indicate:

1. Should we accept these as-is (recommended)?
2. Should we add demo sections for these tokens?
3. Should we update the script logic to recognize inline demos and code examples?

**DO NOT PROCEED** to fixes without explicit approval.
