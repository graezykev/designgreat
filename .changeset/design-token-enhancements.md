---
'@designgreat/lib-design-token': minor
---

### Design Token Enhancements

**New Token Categories:**

- Added duration tokens (`--dg-duration-*`) for animation timing
- Added easing/cubic-bezier tokens (`--dg-cubic-bezier-*`) for animation curves
- Added transition preset tokens (`--dg-transition-*`) for common transitions
- Enhanced gradient tokens (`--dg-gradient-*`) with new brand and accent gradients
- Added shadow/elevation tokens (`--dg-shadow-elevation-*`) for consistent depth

**Token Improvements:**

- Refactored border radius tokens with semantic naming
- Enhanced font size tokens with better scale progression
- Improved spacing tokens with pixel and semantic scales
- Added line-height and letter-spacing tokens for typography

**Breaking Changes:**

- Removed deprecated typography tokens: `direction`, `text-align`, `text-indent`, `text-overflow`,
  `vertical-align`, `white-space`, `word-spacing`
- Removed `size/shadow.js` (consolidated into shadow tokens)

**Token Structure:**

- Reorganized token files for better maintainability
- Updated generated themes with new token definitions
