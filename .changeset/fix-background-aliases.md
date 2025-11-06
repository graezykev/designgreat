---
'@designgreat/lib-web-ui-design-token': patch
---

**Fix neutral backgrounds and refine control aliases**

- 1. Correct the neutral background aliasing so light/dark themes surface opposing shades.
- 2. Expose success/error border variants with explicit `DEFAULT` and `bold` aliases.
- 3. Consolidate input label tokens under a single `label` object to match tailwind token
     generation.
- 4. Rebuild generated artifacts to ensure Storybook and consuming packages pick up the updates.
