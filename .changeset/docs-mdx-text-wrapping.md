---
'@designgreat/docs-design-system': minor
---

Add Step 13: MDX Text Wrapping check and swap button hover/active colors

**Problem Solved:** Docusaurus automatically wraps text content within JSX elements in `<p>` tags,
causing unwanted paragraph margins and UI issues. This happens because MDX treats plain text inside
JSX as Markdown content.

**Solution:** Wrap all text content in JSX curly braces: `{'text'}`. This explicitly tells MDX to
treat the content as a JavaScript expression, preventing Markdown processing and unwanted `<p>`
tags.

**New Files Created:**

- `MDX_TEXT_WRAPPING_GUIDE.md`: Comprehensive guide with examples, correct/incorrect patterns, and
  checklist for wrapping text in `{'text'}` pattern
- `check-tokens-step13.js`: New check script that validates all text content in JSX elements is
  properly wrapped
- `MDX_TEXT_WRAPPING_UPDATE_SUMMARY.md`: Summary document of all changes made

**Files Updated:**

- `PROMPT_TEMPLATE.md`: Added Step 13 to the documentation review process (updated from 12-step to
  13-step)
- `run-all-checks.js`: Added Step 13 to the list of checks
- `README.md`: Updated to reflect 13-step process and added reference to MDX_TEXT_WRAPPING_GUIDE.md
- `src/css/custom.css`: Swapped button hover/active background colors for better UX

**What Step 13 Checks:**

- Text content in demo sections (`<TabItem value="demo">`)
- Text content in code sections (`<TabItem value="code">`)
- All text elements: buttons, links, labels, spans, divs, paragraphs, headings, etc.
- Special characters (arrows, symbols) that should also be wrapped

**Button State Colors Update:**

Swapped hover and active background colors at the token level for subtle and secondary buttons:

- **Hover states**: Now lighter (feels lifted)
  - Subtle: Changed from `{color.alpha.neutral.5}` to `{color.alpha.neutral.3}`
  - Secondary: Changed from `{color.secondary.bold}` to `{color.secondary.subtle}`
- **Active states**: Now darker (feels pressed down)
  - Subtle: Changed from `{color.alpha.neutral.3}` to `{color.alpha.neutral.5}`
  - Secondary: Changed from `{color.secondary.subtle}` to `{color.secondary.bold}`

This creates a more intuitive interaction pattern where hover feels lighter (lifted) and active
feels darker (pressed down) for subtle and secondary buttons. Primary buttons remain unchanged.

**Files Updated:**

- `packages/lib-design-token/src/tokens/color/shortcut/input-interaction.js`: Updated subtle and
  secondary button hover/active tokens
- `packages/docs-design-system/src/css/custom.css`: Updated base button hover/active CSS (now uses
  new token values for subtle/secondary)

**Integration:**

Step 13 follows the same iterative workflow as other steps and integrates seamlessly with the
existing documentation review process. All demo and code sections should now use the `{'text'}`
pattern to prevent unwanted `<p>` tag wrapping.
