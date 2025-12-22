# Documentation Review Scripts

This directory contains scripts for comprehensive documentation review following a 12-step process.

## 📋 Documentation

- **PROMPT_TEMPLATE.md** - Complete prompt template for future reviews
- **ORIGINAL_NOTES.md** - All step-specific notes and exceptions from original prompt
- **SCRIPT_ROBUSTNESS.md** - Guide for ensuring script reliability and validation
- **COVERAGE_AND_ROBUSTNESS.md** - Answers to coverage and robustness questions
- **REFACTORING_SUMMARY.md** - Summary of improvements and workflow changes

## 🔍 Validation

Before running reviews, validate script health:

```bash
node validate-scripts.js
```

This checks:

- Script existence and syntax
- Path resolution
- Required paths exist
- Error handling patterns

## Quick Start

### Recommended: Iterative Step-by-Step

Run **one step at a time**, complete it fully before moving to the next:

```bash
# Step 1: Check → Report → Wait → Fix → Review → Verify → Consent
node packages/docs-design-system/scripts/documentation-review/check-tokens-step1.js

# Only after Step 1 is complete and approved:
# Step 2: Check → Report → Wait → Fix → Review → Verify → Consent
node packages/docs-design-system/scripts/documentation-review/check-tokens-step2.js
```

### Optional: Run All Checks (Baseline Only)

For initial assessment or quick overview (not recommended for actual review):

```bash
node packages/docs-design-system/scripts/documentation-review/run-all-checks.js
```

⚠️ **Why not run all at once?** Fixes in Step 1 may introduce issues that Step 2 would catch.
Complete each step fully before moving forward.

## The 12-Step Review Process

1. **Token Existence** - Verify tokens and CSS variables are defined
2. **Color Demo Correctness** - Verify color demo blocks use correct CSS variables
3. **Token Usage in Demos** - Check tokens are used in subsequent demos
4. **Inline Styles** - Find inline styles (should use CSS classes)
5. **Relevant Token Usage** - Verify demos use tokens from same document
6. **Demo Keyword in Classes** - Check for "-demo-" keyword in class names
7. **Literal Values** - Find literal values instead of design tokens
8. **Undefined CSS Variables** - Check for undefined CSS variables
9. **PX Scale Variables** - Find px scale variables (should use semantic scales)
10. **Infima Overrides** - Check for potential CSS conflicts with Infima
11. **Interactive State Patterns** - Verify pseudo-class + modifier class patterns
12. **Code Section Consistency** - Check demo-code consistency

## Workflow (Iterative Step-by-Step)

**Philosophy**: Complete each step fully before moving to the next. Fixes in one step may affect
later steps.

### For Each Step:

1. **Run Check** (one step at a time):

   ```bash
   node check-tokens-step1.js
   ```

2. **Report Findings**:
   - Review output
   - Document issues found
   - **DO NOT fix yet**

3. **Wait for Approval**:
   - Present findings
   - Wait for decision on which issues to fix

4. **Fix Issues** (after approval):
   - Fix approved issues
   - Make changes incrementally

5. **Wait for Review**:
   - Present what was fixed
   - Wait for feedback

6. **Re-check** (if needed):

   ```bash
   node check-tokens-step1.js  # Re-run to verify
   ```

7. **Wait for Consent**:
   - Only proceed to next step after explicit consent

### Why This Approach?

- Fixes in Step 1 may introduce issues caught in Step 2
- Each step builds on the previous one
- Ensures quality at each stage before moving forward

## Script Structure

Each script follows this pattern:

- Input: MDX files in `docs-design-token/`
- Output: Console report + optional JSON report
- Exit codes: 0 = pass, 1 = issues found

## Reusing Scripts

The scripts are designed to be reusable. To run a new review:

1. **Run all checks** to get baseline
2. **Review reports** to understand issues
3. **Fix issues** manually or with guidance
4. **Re-run checks** to verify fixes
5. **Update reports** if needed

## Customization

To customize which files/categories are checked, modify the `categories` array in each script:

```javascript
const categories = ['colors', 'spacing', 'typography', 'effects', 'motion']
```
