# Dead Links Review Report

**Date:** 2024-12-17  
**Scope:** All documentation files under `packages/docs-design-system/docs-design-token/`  
**Total Files Checked:** 36 MDX files  
**Total Links Found:** 256 links

## Summary

✅ **All links are valid!** No dead links found after fixing one anchor link issue.

## Issues Found and Fixed

### 1. Dead Anchor Link (Fixed)

**File:** `colors/primary-brand-colors.mdx`  
**Link:** `[Toggle/Checkbox Patterns](./shortcuts/interactive-state#checkbox--radio-colors)`  
**Issue:** Anchor `#checkbox--radio-colors` did not exist  
**Root Cause:** The heading "## Checkbox & Radio Colors" generates the anchor ID
`checkbox-and-radio-colors` (with `-and-`), not `checkbox--radio-colors`  
**Fix:** Updated link to use correct anchor: `#checkbox-and-radio-colors`

## Link Types Verified

- ✅ Internal page links (`/design-token/...`)
- ✅ Relative page links (`./...`, `../...`)
- ✅ Anchor links within same page (`#section-id`)
- ✅ Anchor links to other pages (`page#section-id`)
- ✅ External links (http/https - skipped)
- ✅ Cross-documentation links (`/web-component/...`, `/contributing/...`)

## Script Created

**File:** `packages/docs-design-system/scripts/check-dead-links.js`

**Features:**

- Recursively finds all MDX files in docs-design-token directory
- Extracts all links (markdown and JSX format)
- Validates file existence for internal links
- Validates anchor existence by parsing heading IDs
- Handles Docusaurus-style heading ID generation (github-slugger algorithm)
- Supports cross-documentation links (web-component, contributing)
- Provides detailed error reporting with available anchors

**Usage:**

```bash
node packages/docs-design-system/scripts/check-dead-links.js
```

## Docusaurus Heading ID Generation

The script correctly implements Docusaurus's heading ID generation algorithm:

- Converts to lowercase
- Replaces `&` with `-and-`
- Replaces spaces with hyphens
- Removes special characters
- Collapses multiple hyphens to single

Example: `## Checkbox & Radio Colors` → `checkbox-and-radio-colors`

## Recommendations

1. **Regular Checks:** Run this script periodically (e.g., in CI/CD) to catch broken links early
2. **Anchor Links:** When linking to sections, verify the actual generated anchor ID (can be checked
   in browser dev tools)
3. **Cross-Documentation Links:** Ensure paths are correct when linking to other documentation
   sections (web-component, contributing)

## Files Modified

- `packages/docs-design-system/docs-design-token/colors/primary-brand-colors.mdx` - Fixed anchor
  link
