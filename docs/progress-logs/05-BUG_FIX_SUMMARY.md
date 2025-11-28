# Bug Fix Summary: CSS Variable Typo & Audit Enhancement

**Date:** November 24, 2025 **Issue Reported by:** User via browser DevTools inspection

## 🐛 Issue Discovered

While inspecting the accent-colors documentation page in the browser, a color demo `<div>` was found
with **no background-color** style applied. The DevTools showed:

```html
<div class="color-demo"></div>
```

Instead of the expected:

```html
<div class="color-demo" style="background-color: var(--dg-color-accent-red-default);"></div>
```

## 🔍 Root Cause

### Documentation Bug

**File:** `packages/docs-design-system/docs-design-token/colors/accent-colors.mdx`  
**Line:** 292

**Issue:** Malformed CSS variable syntax - missing opening parenthesis after `var`

**Before:**

```jsx
<div className="color-demo" style={{ backgroundColor: 'var--dg-color-accent-red-default)' }}></div>
```

**After:**

```jsx
<div className="color-demo" style={{ backgroundColor: 'var(--dg-color-accent-red-default)' }}></div>
```

The typo caused the browser to ignore the invalid CSS, resulting in no background color being
displayed.

## ✅ Fixes Applied

### 1. Documentation Fix

- **File:** `accent-colors.mdx:292`
- **Change:** Fixed CSS variable syntax from `var--dg-color-accent-red-default)` to
  `var(--dg-color-accent-red-default)`
- **Impact:** Color demo now renders correctly with proper background color

### 2. Audit Script Enhancement

**File:** `audit-color-docs.mjs`

#### New Check 2.5: Malformed CSS Variables

Added validation to catch CSS variable syntax errors:

```javascript
// CHECK 2.5: Malformed CSS variables (var-- instead of var()
const malformedCssVars = []
lines.forEach((line, idx) => {
  // Check for var-- (missing opening parenthesis)
  if (/var--dg-color/.test(line)) {
    malformedCssVars.push(idx + 1)
    addIssue('critical', fileName, 'Malformed CSS variable: var-- should be var(--', idx + 1)
  }

  // Check for var(...) with mismatched parentheses
  if (/var\([^)]*$/.test(line) && !/var\([^)]*\)/.test(line)) {
    malformedCssVars.push(idx + 1)
    addIssue('critical', fileName, 'Malformed CSS variable: missing closing parenthesis', idx + 1)
  }
})
```

**Detection Patterns:**

- `var--dg-color` → Missing opening `(`
- `var(...)` without closing `)` → Mismatched parentheses

**Severity:** 🚨 CRITICAL - These prevent CSS from rendering

#### New Check 10.5: "Level X" Reference Validation

Added validation specifically for accent-colors.mdx tables with theme-aware references:

```javascript
// CHECK 10.5: Validate "Level X" references in accent-colors.mdx theme-aware tables
```

**Purpose:** Validate that alias tokens (boldest, bolder, bold, DEFAULT, subtle, subtler, subtlest,
low, lower, lowest) map to the correct gradient levels in both Light and Dark themes.

**Expected Mappings:**

_Emphasis Levels (Foreground):_ | Alias | Light Theme | Dark Theme |
|-------|-------------|------------| | boldest | Level 10 | Level 1 | | bolder | Level 9 | Level 2 |
| bold | Level 8 | Level 3 | | DEFAULT | Level 7 | Level 4 | | subtle | Level 6 | Level 5 | |
subtler | Level 5 | Level 6 | | subtlest | Level 4 | Level 7 |

_Background Levels:_ | Alias | Light Theme | Dark Theme | |-------|-------------|------------| | low
| Level 3 | Level 8 | | lower | Level 2 | Level 9 | | lowest | Level 1 | Level 10 |

**Validation Logic:**

- Parses tables with "Reference (Light Theme)" and "Reference (Dark Theme)" columns
- Extracts "Level X" values from each cell
- Compares against expected mappings for each alias
- Reports mismatches as errors

**Example Error:**

```
❌ ERROR: Alias "bold" in Light Theme should be Level 8, not Level 7
```

## 📊 Audit Results

**Before Fix:**

- The malformed CSS variable was not detected
- "Level X" references had no dedicated validation

**After Fix:**

```
📄 accent-colors.mdx
--------------------------------------------------------------------------------
  ✅ No issues found
  📊 20 tables, 162 demos, 260 token refs
```

All 11 documentation files now pass audit with:

- 🚨 0 CRITICAL errors
- ❌ 0 ERRORS
- ⚠️ 5 WARNINGS (intentional shorthand ranges in semantic-colors.mdx)

## 🎯 Impact

### User Experience

- ✅ Color demo in accent-colors.mdx now displays correctly
- ✅ All other documentation remains valid

### Code Quality

- ✅ Malformed CSS variables will be caught automatically in future
- ✅ "Level X" references in theme-aware tables are now validated
- ✅ Comprehensive audit coverage for all color documentation

### Prevention

- 🛡️ CHECK 2.5 prevents similar CSS variable typos
- 🛡️ CHECK 10.5 ensures alias-to-level mappings stay correct
- 🛡️ CI/CD can run `node audit-color-docs.mjs` to catch issues before deployment

## 📝 Technical Details

### Browser Behavior

When CSS encounters an invalid value:

1. The browser ignores the entire property
2. No background-color is applied
3. The div remains transparent
4. No console errors are shown (CSS fails silently)

### MDX JSX Syntax

In MDX, inline styles use double curly braces:

```jsx
style={{backgroundColor: 'var(--dg-color-name)'}}
```

The outer `{}` is JSX expression delimiter, inner `{}` is the JavaScript object for style
properties.

### Regex Patterns Used

```javascript
// Detect var-- (missing opening parenthesis)
/var--dg-color/.test(line)

// Detect unclosed var(
/var\([^)]*$/.test(line) && !/var\([^)]*\)/.test(line)

// Extract Level X
/Level (\d+)/.match(cell)
```

## 🔄 Related Files Modified

1. `packages/docs-design-system/docs-design-token/colors/accent-colors.mdx` - Fixed typo
2. `audit-color-docs.mjs` - Added CHECK 2.5 and CHECK 10.5
3. `BUG_FIX_SUMMARY.md` - This document

## ✨ Future Recommendations

1. **Pre-commit Hook:** Run `node audit-color-docs.mjs` before commits
2. **CI/CD Integration:** Add audit step to build pipeline
3. **VSCode Extension:** Could add CSS variable syntax highlighting for MDX
4. **Documentation:** Add contribution guidelines mentioning the audit script

## 🏆 Validation

The fix was validated by:

1. ✅ Running the updated audit script
2. ✅ Confirming accent-colors.mdx passes all checks
3. ✅ Verifying CHECK 2.5 detects malformed CSS variables
4. ✅ Verifying CHECK 10.5 validates "Level X" references
5. ✅ Confirming all 11 documentation files pass audit

**Status:** ✅ COMPLETE - Bug fixed and preventive measures in place
