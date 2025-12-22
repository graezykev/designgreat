# Original Prompt Notes and Instructions

This document captures all the specific notes, exceptions, and instructions from the original prompt
that must be preserved in scripts and template.

## Step-Specific Instructions

### Step 1: Token Existence

**Original Notes**:

- Shorthand references are allowed (e.g., `grey.12` in reference columns)
- Filter and print them for review
- Both script improvement and manual verification needed

**Script Implementation**:

- ✅ Filters out shorthand references in "Reference" columns
- ✅ Filters out partial CSS variable matches
- ⚠️ Manual verification still needed for edge cases

### Step 2: Color Demo Correctness

**Original Notes**:

- For compound tokens (e.g., `shadow.xxx`, `border.xxx`), find the "color" value/reference and
  corresponding CSS variable
- Handle both `color-demo` (background) and `color-demo-text` (text color)

**Script Implementation**:

- ✅ Handles compound tokens
- ✅ Differentiates between background and text color demos
- ✅ Extracts correct CSS property for comparison

### Step 3: Token Usage in Demos

**Original Notes**:

- Include "Usage Examples" sections when searching for token usage
- Some tokens may be intentionally not demonstrated (acceptable)

**Script Implementation**:

- ✅ Includes "Usage Examples" sections
- ✅ Reports tokens not used (for manual review)

### Step 4: Inline Styles

**Original Notes**:

- Distinguish between literal values (errors) and CSS variables (warnings)
- Inline styles using CSS variables are less ideal but still use tokens

**Script Implementation**:

- ✅ Categorizes as `inline_style_error` vs `inline_style_warning`
- ✅ Flags both for review

### Step 6: Demo Keyword in Classes

**Original Notes**:

- Rename `.dg-state-demo-xxx` → `.dg-state-showcase-xxx`
- Rename `.dg-demo-card-xxx` → `.dg-shadow-color-card-xxx`
- Exclude legitimate utility classes: `.color-demo`, `.spacing-demo`, `.typography-demo`

**Script Implementation**:

- ✅ Excludes legitimate utility classes
- ✅ Checks for problematic patterns
- ⚠️ Renaming must be done manually (script only reports)

### Step 7: Literal Values

**Original Notes**:

- Layout dimensions acceptable: `180px`, `140px`, `80px`, `120px`, `200px`, `100px`, `160px`,
  `240px`, `320px`
- `outline` should use border-related scales
- Replace `px4` with `space-xs`, `px24` with `space-xl`
- Exclude CSS code examples (documentation, not actual usage)

**Script Implementation**:

- ✅ Excludes acceptable layout dimensions
- ✅ Excludes CSS code examples
- ⚠️ `outline` and `px4`/`px24` replacements must be done manually

### Step 8: Undefined CSS Variables

**Original Notes**:

- Must load CSS variables from generated CSS file
- Verify all `var(--dg-xxx)` references are valid

**Script Implementation**:

- ✅ Loads CSS variables from `variables.css`
- ✅ Checks all references

### Step 9: PX Scale Variables

**Original Notes**:

- Exception: `spacing/pixel-values.mdx` is allowed to use px scale variables
- Should use semantic scales elsewhere (e.g., `--dg-spacing-space-xs` instead of `--dg-spacing-px4`)

**Script Implementation**:

- ✅ Excludes `spacing/pixel-values.mdx` from checks
- ✅ Reports px scale variables in other docs

### Step 10: Infima Overrides

**Original Notes**:

- Warnings only (not errors) - manual verification needed
- Many flagged classes are likely safe due to proper naming/specificity
- Check common properties: `color`, `background-color`, `border`, `padding`, `margin`, `font-size`,
  `font-weight`, `line-height`

**Script Implementation**:

- ✅ Flags as warnings (not errors)
- ✅ Checks specified properties
- ⚠️ Manual verification required

### Step 11: Interactive State Patterns

**Original Notes**:

- `selected` and `opened` states don't need pseudo-classes (state classes, not interactive
  pseudo-classes)
- Need both patterns for: `hover`, `focus`, `active`, `disabled`, `visited`, `checked`
- Check interactive components: buttons, links, tags, badges, inputs, checkboxes, toggles, radios,
  selects, dropdowns, tabs, lists, nav, cards

**Script Implementation**:

- ✅ Handles `selected` and `opened` correctly (modifier only)
- ✅ Checks both patterns for interactive states
- ✅ Checks specified components

### Step 12: Code Section Consistency

**Original Notes**:

- Exclude utility classes: `dg-flex`, `dg-gap-*`, `dg-mt-*`, `dg-p-*`, etc.
- Exclude demo wrapper classes (e.g., `dg-radius-card-title`, `dg-elevation-card-title`)
- Focus on component classes being documented
- Check both HTML and CSS code blocks

**Script Implementation**:

- ✅ Excludes utility classes
- ✅ Excludes demo wrapper classes
- ✅ Checks both HTML and CSS
- ⚠️ May still flag some demo wrapper classes (acceptable)

## General Instructions

### Workflow Philosophy

**Original Instructions**:

- "Don't solve them directly, let me decide the fix"
- "pause to let me review the changes, and then I'll ask you to proceed"
- Iterative step-by-step: complete Step N fully before Step N+1

**Template Implementation**:

- ✅ Explicit "DO NOT fix" instructions
- ✅ "Wait for approval" at each stage
- ✅ "Wait for consent" before next step

### Reporting

**Original Instructions**:

- Save reports to `docs/progress-logs/` with sequential numbering
- Generate summary reports
- Include file locations and details

**Script Implementation**:

- ✅ Scripts output to console
- ⚠️ Reports must be manually saved (or use `run-all-checks.js`)

### Categories

**Original Instructions**:

- Check all docs under: colors, spacing, typography, effects, motion
- Recursively find all `.mdx` files

**Script Implementation**:

- ✅ Recursively finds all MDX files
- ✅ Checks specified categories

## Missing from Template

### Verification Steps

**Original Instructions** (implied):

- After fixes, re-run checks to verify
- Compare before/after results
- Ensure no new issues introduced

**Template Status**:

- ✅ Included in workflow (Step 6: Re-check)

### Manual Verification

**Original Instructions**:

- Some checks require manual verification (e.g., Step 1 shorthand references, Step 10 Infima
  conflicts)

**Template Status**:

- ⚠️ Should be more explicit about which steps need manual verification

## Recommendations

1. **Add to Template**: Explicit list of steps requiring manual verification
2. **Add to Scripts**: Comments noting manual verification requirements
3. **Add to README**: Section on manual verification steps
4. **Create Checklist**: Manual verification checklist for each step
