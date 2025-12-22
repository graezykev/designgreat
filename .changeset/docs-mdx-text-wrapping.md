---
'@designgreat/docs-design-system': minor
---

Add Step 13: MDX Text Wrapping check and comprehensive guide

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

**What Step 13 Checks:**

- Text content in demo sections (`<TabItem value="demo">`)
- Text content in code sections (`<TabItem value="code">`)
- All text elements: buttons, links, labels, spans, divs, paragraphs, headings, etc.
- Special characters (arrows, symbols) that should also be wrapped

**Integration:**

Step 13 follows the same iterative workflow as other steps and integrates seamlessly with the
existing documentation review process. All demo and code sections should now use the `{'text'}`
pattern to prevent unwanted `<p>` tag wrapping.
