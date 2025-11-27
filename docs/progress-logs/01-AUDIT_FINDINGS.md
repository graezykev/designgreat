# Color Documentation Audit Findings

## Summary

This document catalogs findings from the comprehensive manual audit of color documentation in
`packages/docs-design-system/docs/colors/`.

## Understanding Based on Investigation

### Token → CSS → Docs Relationship

1. **Token Definitions** (lib-web-ui-design-token/src/tokens/color/)
   - Define tokens with references like `{color.base.grey}`
   - Include metadata like `attributes: { alpha: 0.7 }`

2. **CSS Generation** (lib-web-ui/dist/lib-web-ui.css)
   - Converts tokens to actual CSS variables
   - Alpha tokens get hex8 format (e.g., `#599effb3` where `b3` = 70% opacity)
   - Theme-aware: `:root` for light, `.dg-theme-dark` for dark

3. **Documentation** (docs-design-system/docs/colors/)
   - Tables display Token names, CSS Variables, References, and metadata
   - Should match both token definitions AND CSS output

### Alpha Conversion

- Token: `attributes: { alpha: 0.7 }`
- CSS: `#599effb3` (where `b3` in hex = 179 decimal = 179/255 ≈ 0.702 ≈ 70%)
- Docs: Should show `70%`

### Reference Chain Logic

User clarification: "Check if the direct reference is user-friendly, if yes use it, if not, show
user-friendly references."

Examples:

- ✅ **User-friendly**: `{color.primary.bold}` - this is meaningful to users
- ✅ **User-friendly**: `{color.accent.blue.DEFAULT}` - clear and direct
- ❌ **Not user-friendly**: Deep nested chains that don't add semantic meaning

### Empty Category Cells

- Allowed when inheriting from the row above
- Logic: If row N has empty Category, it inherits from the nearest non-empty Category above it

### State Column

- Found in: `primary-brand-colors.mdx` → "State-Specific Tokens" section
- Column name: "State"
- Contains values like: "Visited", "Hover", "Focus", "Active", "Disabled", "Activated", "Opened",
  "Checked"

## Current Audit Script Status

- ✅ Basic structure checks (corrupted headers, column counts)
- ✅ Uppercase DEFAULT detection
- ✅ CSS variable existence (basic)
- ✅ Hardcoded hex colors outside theme comparisons
- ✅ Token existence in definitions
- ⚠️ **Limited**: Alpha validation (needs CSS hex8 verification)
- ⚠️ **Limited**: Reference validation (doesn't check user-friendliness logic)
- ⚠️ **Limited**: Gradient Level validation (basic enum check)
- ❌ **Missing**: State column validation
- ❌ **Missing**: Shorthand reference warnings (gradient ranges like `.1 - .10`)
- ❌ **Missing**: Category inheritance logic
- ❌ **Missing**: Color demo CSS variable usage verification
- ❌ **Missing**: User-friendly reference chain validation

## Recommended Enhancements

### 1. Enhanced Alpha Validation

```javascript
// CHECK: Alpha column shows 70% when:
// - Token has attributes: { alpha: 0.7 }
// - CSS shows #599effb3 (b3 = 70%)
// - Docs show "70%"
```

### 2. Reference Chain Validation

```javascript
// Determine if reference is user-friendly:
// - Direct accent/primary/semantic references: ✅
// - References to named tokens (not .1, .2, etc.): ✅
// - Very deep chains: suggest shorter user-friendly version
```

### 3. State Column Validation

Valid states: Visited, Hover, Focus, Active, Disabled, Activated, Opened, Checked

### 4. Shorthand Reference Detection

```markdown
| `color.semantic.info.1` - `color.semantic.info.10` | - | Full gradient scale |
```

⚠️ WARNING: Consider expanding this range for better documentation

### 5. Category Inheritance

Track empty Category cells and verify they logically inherit from rows above

### 6. Color Demo Validation

Verify that `<div className="color-demo" style={{backgroundColor: 'var(--dg-color-xxx)'}}>` uses CSS
variables, not hardcoded hex values

## Files That Need Special Attention

1. **primary-brand-colors.mdx** - Has State column, Category column with inheritance
2. **semantic-colors.mdx** - Has Semantic Type and Accent Color columns
3. **accent-colors.mdx** - Has Gradient Level column, many shorthand reference rows
4. **alpha-colors.mdx** - Alpha validation critical here
5. **shortcuts/\*.mdx** - Reference chain validation important

## Next Steps

1. ✅ Understand token/CSS/docs relationships
2. ✅ Get user clarifications on validation logic
3. 🔄 Build enhanced audit script with all validations
4. 🔄 Run audit and generate detailed report
5. 🔄 Fix any issues found in documentation
