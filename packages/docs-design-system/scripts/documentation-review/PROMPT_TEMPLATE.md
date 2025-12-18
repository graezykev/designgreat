# Documentation Review Prompt Template

**Location**: `packages/docs-design-system/scripts/documentation-review/PROMPT_TEMPLATE.md`

Use this template for future comprehensive documentation reviews.

## Refactored Prompt Template

````
Perform a comprehensive 12-step documentation review for all docs under:
- /designgreat/design-token/category/colors
- /designgreat/design-token/category/spacing
- /designgreat/design-token/category/typography
- /designgreat/design-token/category/effects
- /designgreat/design-token/category/motion

## Workflow Philosophy

**Iterative Step-by-Step Approach**: Complete each step fully (check → report → fix → review → verify) before moving to the next step. This ensures fixes in one step don't introduce issues that would be caught in later steps.

## Workflow for EACH Step

### Step N: [Step Name]

1. **Run Check**: Execute the check script for this step only
   ```bash
   node packages/docs-design-system/scripts/documentation-review/check-tokens-stepN.js
````

2. **Report Findings**: Generate a report with:
   - Summary of what was checked
   - Number of issues found
   - List of issues with file locations and details
   - Recommendations for fixes (but DON'T implement yet)

3. **Wait for Permission**:
   - Present findings
   - Wait for my decision on which issues to fix
   - **DO NOT proceed to fixes without explicit approval**

4. **Fix Issues** (only after approval):
   - Fix approved issues one at a time
   - Make changes incrementally
   - **DO NOT fix unapproved issues**

5. **Wait for Review**:
   - Present what was fixed
   - Wait for my review and feedback
   - **DO NOT proceed without review**

6. **Re-check** (if needed):
   - Re-run the check script to verify fixes
   - Report if issues are resolved or if new issues appeared
   - **Repeat fix-review cycle if needed**

7. **Wait for Consent to Proceed**:
   - Only after Step N is fully complete and approved
   - **DO NOT proceed to Step N+1 without explicit consent**

## The 12 Steps (Execute ONE at a time)

1. **Token Existence**: Check every table and token to find tokens that don't exist, CSS variables
   not defined, or not generated
2. **Color Demo Correctness**: Verify color demo blocks use correct CSS variables
3. **Token Usage**: Find tokens defined in tables but not used in subsequent demos
4. **Inline Styles**: Find inline styles in demos (should use CSS classes)
5. **Relevant Token Usage**: Check demos use tokens from same document
6. **Demo Keyword**: Find CSS class names containing "-demo-" keyword
7. **Literal Values**: Find literal values (px, hex colors) instead of design tokens
8. **Undefined CSS Variables**: Find CSS variables not defined in generated CSS
9. **PX Scale Variables**: Find px scale variables (should use semantic scales, except in
   pixel-values doc)
10. **Infima Overrides**: Check for CSS overridden by --ifm-xxx styles
11. **Interactive State Patterns**: Check interactive components have both pseudo-class (:hover) and
    modifier class (.dg-xxx--hover) patterns
12. **Code Section Consistency**: Check code sections are complete (HTML and CSS) and consistent
    with demo

## Critical Instructions

- **ONE STEP AT A TIME**: Complete Step 1 fully before starting Step 2
- **DO NOT fix issues directly** - only report them, wait for approval
- **DO NOT proceed to next step** without explicit consent
- **PAUSE after each action** (check, report, fix, review) to let me review
- **Use existing scripts** in `packages/docs-design-system/scripts/documentation-review/`
- **Save reports** to `docs/progress-logs/` with sequential numbering

## Important Notes and Exceptions

### Step-Specific Notes

- **Step 1**: Shorthand references (e.g., `grey.12`) are allowed in reference columns - filter and
  review manually
- **Step 6**: Exclude legitimate utility classes (`.color-demo`, `.spacing-demo`) - only flag
  problematic patterns
- **Step 7**: Layout dimensions (`180px`, `140px`, etc.) are acceptable - exclude from checks
- **Step 9**: `spacing/pixel-values.mdx` is allowed to use px scale variables - exclude from checks
- **Step 10**: Many flagged conflicts are likely safe - manual verification required
- **Step 11**: `selected` and `opened` states don't need pseudo-classes (state classes only)
- **Step 12**: Exclude utility classes and demo wrapper classes - focus on component classes

### Manual Verification Required

Some steps require manual verification:

- **Step 1**: Review filtered shorthand references
- **Step 10**: Verify Infima conflicts are actual issues
- **Step 12**: Review demo wrapper class flags (may be intentional)

See `ORIGINAL_NOTES.md` for complete list of step-specific instructions.

## Expected Output Flow

For Step 1:

1. Run check → Report findings → Wait
2. Get approval → Fix issues → Wait
3. Get review → Re-check if needed → Wait
4. Get consent → Proceed to Step 2

Repeat for Steps 2-12, one at a time.

```

## Key Improvements

### 1. Clear Phase Separation
- **Phase 1**: Check only (no fixes)
- **Phase 2**: Report findings
- **Phase 3**: Wait for approval

### 2. Explicit Instructions
- "DO NOT fix issues directly"
- "PAUSE after each phase"
- "Wait for explicit approval"

### 3. Reusable Scripts
- Scripts are already created and organized
- Use `run-all-checks.js` to run everything
- Individual scripts can be run for specific steps

### 4. Better Structure
- Clear workflow steps
- Expected output format
- Numbered steps for easy reference

## Usage Example

```

Perform a comprehensive 12-step documentation review using the template above.

Start with Phase 1: Run all checks and generate reports. DO NOT make any fixes - only report
findings.

```

## Benefits

1. **Prevents premature fixes** - AI won't fix issues without approval
2. **Clear workflow** - Easy to follow and understand
3. **Reusable** - Scripts can be run multiple times
4. **Incremental** - Can fix issues one at a time
5. **Traceable** - All reports saved with timestamps

```
