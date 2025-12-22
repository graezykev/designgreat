---
'@designgreat/docs-design-system': patch
---

Fix CSS syntax error and remove inline style in spacing demo

**Issue Found:** Step 4 check identified an inline style in spacing/semantic-scales.mdx demo, and a
CSS syntax error was discovered when the dev server failed to compile.

**CSS Syntax Fix:**

- Fix orphaned CSS properties in `.dg-spacing-indicator` class
- Properties (`justify-content`, `color`, `font-size`, `margin-top`, `margin-bottom`) were
  accidentally left outside the class block when adding `.dg-spacing-indicator-height-md`
- Moved all properties back into `.dg-spacing-indicator` block

**Inline Style Removal:**

- Add `.dg-spacing-indicator-height-md` utility class with `height: var(--dg-spacing-stack-md)`
- Replace inline style `style={{height: 'var(--dg-spacing-stack-md)'}}` in
  spacing/semantic-scales.mdx demo
- Update code section in MDX to reflect the change

**Compliance:**

- Removes inline style violation (Step 4 requirement)
- Uses CSS class with design token instead of inline style
- Maintains functionality while following best practices
