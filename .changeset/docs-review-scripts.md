---
'@designgreat/docs-design-system': minor
---

Add comprehensive 12-step documentation review scripts and tooling

This changeset adds a complete documentation review system with scripts, validation tools, and
comprehensive documentation.

**Scripts Created:**

- 12 step-by-step check scripts (check-tokens-step1.js through step12.js) for automated
  documentation review
- run-all-checks.js: Run all 12 steps at once (for baseline assessment only)
- validate-scripts.js: Script health validation tool

**Documentation Created:**

- PROMPT_TEMPLATE.md: Complete prompt template for future reviews with iterative step-by-step
  workflow
- ORIGINAL_NOTES.md: Comprehensive documentation of all step-specific notes, exceptions, and
  instructions from original prompt
- SCRIPT_ROBUSTNESS.md: Guide for ensuring script reliability, validation checklists, and testing
  strategies
- COVERAGE_AND_ROBUSTNESS.md: Answers to coverage and robustness questions with validation results
- REFACTORING_SUMMARY.md: Summary of workflow improvements and refactoring decisions
- README.md: Usage guide with quick start, workflow explanation, and script structure

**Organization:**

- All scripts organized in `packages/docs-design-system/scripts/documentation-review/` subdirectory
- All review reports moved to `docs/progress-logs/` with sequential numbering
  (20-STEP1_FINAL_REPORT.md through 32-STEP1_ISSUES_REPORT.md)
- Scripts updated with correct path resolution (../../../..) for new directory structure

**Workflow Philosophy:**

- Iterative step-by-step approach: Complete each step fully (check → report → fix → review → verify
  → consent) before moving to next step
- Prevents fixes in one step from introducing issues that would be caught in later steps
- Explicit "DO NOT fix" and "wait for approval" instructions to prevent premature changes
