# MDX Text Wrapping Update Summary

## Overview

This document summarizes the changes made to support the `{'text'}` wrapping pattern in MDX files to
prevent Docusaurus from adding unwanted `<p>` tags around text content in JSX elements.

## Problem

Docusaurus automatically wraps text content within JSX elements in `<p>` tags, causing unwanted
paragraph margins and UI issues. This happens because MDX treats plain text inside JSX as Markdown
content.

## Solution

Wrap all text content in JSX curly braces: `{'text'}`. This explicitly tells MDX to treat the
content as a JavaScript expression, preventing Markdown processing and unwanted `<p>` tags.

## Changes Made

### 1. New Documentation

- **MDX_TEXT_WRAPPING_GUIDE.md** - Comprehensive guide with examples, correct/incorrect patterns,
  and checklist

### 2. Updated Prompt Template

- **PROMPT_TEMPLATE.md** - Added Step 13 for MDX Text Wrapping check
- Updated from 12-step to 13-step process
- Added step-specific notes for Step 13

### 3. New Check Script

- **check-tokens-step13.js** - Checks that all text content in JSX elements is wrapped in `{'text'}`
  - Checks demo sections (`<TabItem value="demo">`)
  - Checks code sections (`<TabItem value="code">`)
  - Detects unwrapped text in buttons, links, labels, spans, divs, paragraphs, etc.
  - Provides context and fix suggestions

### 4. Updated Scripts

- **run-all-checks.js** - Added Step 13 to the list of checks
- **README.md** - Updated to reflect 13-step process and added reference to
  MDX_TEXT_WRAPPING_GUIDE.md

## Usage

### Running Step 13 Check

```bash
node packages/docs-design-system/scripts/documentation-review/check-tokens-step13.js
```

### Running All Checks (includes Step 13)

```bash
node packages/docs-design-system/scripts/documentation-review/run-all-checks.js
```

## What Gets Checked

Step 13 checks for:

1. **Demo sections** - Text content in JSX elements within `<TabItem value="demo">` sections
2. **Code sections** - Text content in JSX code blocks within `<TabItem value="code">` sections
3. **All text elements** - buttons, links, labels, spans, divs, paragraphs, headings, etc.
4. **Special characters** - arrows, symbols that should also be wrapped

## Examples

### ✅ Correct

```jsx
<button className="dg-btn dg-btn-primary">{'Default'}</button>
<a href="#" className="dg-link">{'Click here'}</a>
<span className="dg-badge">{'New'}</span>
<div className="dg-nav-pill">{'Home'}</div>
<span className="dg-select-arrow">{'▼'}</span>
```

### ❌ Incorrect

```jsx
<button className="dg-btn dg-btn-primary">Default</button>
<a href="#" className="dg-link">Click here</a>
<span className="dg-badge">New</span>
<div className="dg-nav-pill">Home</div>
<span className="dg-select-arrow">▼</span>
```

## Integration with Existing Workflow

Step 13 follows the same iterative workflow as other steps:

1. **Run Check** → Report findings → Wait
2. **Get Approval** → Fix issues → Wait
3. **Get Review** → Re-check if needed → Wait
4. **Get Consent** → Proceed to next step (if any)

## Files Modified

- `packages/docs-design-system/scripts/documentation-review/PROMPT_TEMPLATE.md`
- `packages/docs-design-system/scripts/documentation-review/run-all-checks.js`
- `packages/docs-design-system/scripts/documentation-review/README.md`

## Files Created

- `packages/docs-design-system/scripts/documentation-review/MDX_TEXT_WRAPPING_GUIDE.md`
- `packages/docs-design-system/scripts/documentation-review/check-tokens-step13.js`
- `packages/docs-design-system/scripts/documentation-review/MDX_TEXT_WRAPPING_UPDATE_SUMMARY.md`
  (this file)

## Next Steps

1. Run Step 13 check to identify any remaining unwrapped text
2. Fix issues found by Step 13
3. Update any AI prompts/templates used for generating documentation to include text wrapping
   instructions
4. Add Step 13 to CI/CD pipeline if desired

## References

- See `MDX_TEXT_WRAPPING_GUIDE.md` for detailed examples and best practices
- See `PROMPT_TEMPLATE.md` for the complete review workflow
