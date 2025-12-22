---
'@designgreat/docs-design-system': patch
---

Fix missing disabled state for primary button component

**Issue Found:** Step 11 check identified that `.dg-btn-primary` was missing disabled state
patterns, even though demos were using `dg-btn-primary--disabled` class.

**Fix:**

- Add `.dg-btn-primary:disabled` pseudo-class rule with disabled styling
- Add `.dg-btn-primary--disabled` modifier class rule for static demos
- Both rules use `--dg-color-background-button-state-disabled` token
- Sets opacity to 0.6 and cursor to not-allowed

**Compliance:**

- Ensures primary button has both pseudo-class (`:disabled`) and modifier class (`--disabled`)
  patterns
- Required for Step 11: Interactive State Patterns compliance
- Allows both dynamic interaction and static demo states
