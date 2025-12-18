# Script Robustness and Validation Guide

## Overview

This document outlines how to ensure the documentation review scripts work correctly and reliably.

## Critical Notes from Original Prompt

### Step-Specific Instructions

1. **Step 1**:
   - Shorthand references allowed (e.g., `grey.12` in reference columns)
   - Filter and print for review
   - Both script improvement and manual verification needed

2. **Step 6**:
   - Rename `.dg-state-demo-xxx` → `.dg-state-showcase-xxx`
   - Rename `.dg-demo-card-xxx` → `.dg-shadow-color-card-xxx`
   - Exclude legitimate utility classes: `.color-demo`, `.spacing-demo`, `.typography-demo`

3. **Step 7**:
   - Layout dimensions acceptable: `180px`, `140px`, `80px`, `120px`, `200px`, `100px`, `160px`,
     `240px`, `320px`
   - `outline` should use border-related scales
   - Replace `px4` with `space-xs`, `px24` with `space-xl`
   - Exclude CSS code examples (documentation, not actual usage)

4. **Step 9**:
   - Exception: `spacing/pixel-values.mdx` is allowed to use px scale variables

5. **Step 10**:
   - Warnings only (not errors) - manual verification needed
   - Many flagged classes are likely safe due to proper naming/specificity

6. **Step 11**:
   - `selected` and `opened` states don't need pseudo-classes (state classes, not interactive)
   - Need both patterns for: `hover`, `focus`, `active`, `disabled`, `visited`, `checked`

7. **Step 12**:
   - Exclude utility classes: `dg-flex`, `dg-gap-*`, `dg-mt-*`, etc.
   - Exclude demo wrapper classes (e.g., `dg-radius-card-title`)
   - Focus on component classes being documented

## Script Validation Checklist

### Pre-Run Validation

- [ ] **Path Resolution**: Verify all paths resolve correctly

  ```bash
  node -e "const path = require('path'); const { fileURLToPath } = require('url'); const __dirname = path.dirname(fileURLToPath(import.meta.url)); console.log(path.resolve(__dirname, '../../../..'));"
  ```

- [ ] **Dependencies**: Ensure required files exist
  - CSS variables file: `packages/lib-design-token/dist/css/light/variables.css`
  - Token source: `packages/lib-design-token/src/tokens`
  - Docs root: `packages/docs-design-system/docs-design-token`

- [ ] **File Structure**: Verify expected directory structure
  ```bash
  ls -la packages/docs-design-system/docs-design-token/{colors,spacing,typography,effects,motion}
  ```

### Runtime Validation

- [ ] **Error Handling**: Scripts should handle:
  - Missing files gracefully
  - Invalid file paths
  - Empty directories
  - Malformed MDX content

- [ ] **Output Validation**: Check that scripts:
  - Produce consistent output format
  - Exit with correct codes (0 = pass, 1 = issues found)
  - Generate readable reports

- [ ] **Edge Cases**: Test with:
  - Empty files
  - Files with no demos
  - Files with no tables
  - Malformed MDX syntax

### Post-Run Validation

- [ ] **Report Completeness**: Verify reports include:
  - Summary statistics
  - Issue details with file locations
  - Clear recommendations

- [ ] **Consistency**: Check that:
  - Same issues produce same results on re-run
  - Reports are reproducible

## Testing Strategy

### Unit Testing (Manual)

1. **Test Each Step Individually**:

   ```bash
   # Test Step 1
   node check-tokens-step1.js > test-step1.log 2>&1
   # Review output, verify expected behavior
   ```

2. **Test Edge Cases**:
   - Empty MDX file
   - File with no demos
   - File with no tables
   - File with malformed syntax

3. **Test Known Issues**:
   - Run on files with known issues
   - Verify scripts catch them correctly
   - Verify scripts don't flag false positives

### Integration Testing

1. **Run All Steps**:

   ```bash
   node run-all-checks.js > test-all.log 2>&1
   ```

2. **Compare Results**:
   - Compare with previous runs
   - Verify consistency

### Validation Script

Create a validation script to check script health:

```javascript
// validate-scripts.js
// Checks that all scripts:
// 1. Can be imported/executed
// 2. Have correct path resolution
// 3. Handle missing files gracefully
// 4. Produce expected output format
```

## Common Issues and Solutions

### Issue: Path Resolution Errors

**Symptoms**: Scripts fail with "file not found" errors

**Solution**:

- Verify `workspaceRoot` calculation
- Check relative path depth (`../../../..` for scripts in `documentation-review/`)

### Issue: False Positives

**Symptoms**: Scripts flag legitimate code as issues

**Solution**:

- Review exclusion patterns
- Add more specific filters
- Update regex patterns

### Issue: Missing Issues

**Symptoms**: Scripts don't catch known problems

**Solution**:

- Review regex patterns
- Check file parsing logic
- Verify issue detection logic

### Issue: Inconsistent Results

**Symptoms**: Same file produces different results on re-run

**Solution**:

- Check for non-deterministic operations (e.g., `Set` iteration order)
- Ensure consistent sorting
- Review regex global flags

## Script Improvement Checklist

When updating scripts, ensure:

- [ ] **Error Handling**: All file operations wrapped in try-catch
- [ ] **Path Validation**: Verify paths exist before use
- [ ] **Output Formatting**: Consistent, readable output
- [ ] **Exit Codes**: Correct exit codes (0 = pass, 1 = issues)
- [ ] **Comments**: Clear comments explaining logic
- [ ] **Edge Cases**: Handle empty files, missing directories
- [ ] **Performance**: Scripts complete in reasonable time
- [ ] **Logging**: Helpful error messages with context

## Monitoring and Maintenance

### Regular Checks

1. **Monthly**: Run all scripts on current codebase
2. **After Major Changes**: Re-run scripts to verify no regressions
3. **Before Reviews**: Validate scripts work correctly

### Version Control

- Track script changes in git
- Document breaking changes
- Maintain changelog

## Quick Validation Commands

```bash
# Check all scripts exist
ls -1 check-tokens-step*.js | wc -l  # Should be 12

# Test path resolution
node -e "console.log(require('path').resolve(__dirname, '../../../..'))"

# Quick syntax check
for f in check-tokens-step*.js; do node --check "$f" || echo "Error in $f"; done

# Test one script
node check-tokens-step1.js 2>&1 | head -20
```
