---
'@designgreat/docs-design-system': patch
---

### Documentation & CSS Improvements

**New Documentation Sections:**

- Added Spacing documentation (overview, pixel values, semantic scales)
- Added Typography documentation (overview, font sizes, font weights, text spacing)
- Added Effects documentation (border radius, elevation, gradients)
- Added Motion documentation (overview, duration, easing, transitions)

**CSS Component Classes:**

- Refactored button classes (`.dg-btn-*`) with loading and transition modifiers
- Consolidated badge classes (`.dg-badge-*`) with gradient and interactive variants
- Enhanced tag classes (`.dg-tag-*`) with improved color contrast
- Added dropdown classes (`.dg-dropdown-*`) with disabled and hover states
- Added tooltip classes (`.dg-tooltip-*`) with arrow position variants
- Improved interactive card classes with better selected state contrast

**Accessibility Improvements:**

- Fixed tag text color contrast (now uses inverse color on primary background)
- Fixed selected card contrast (primary background with inverse text)
- Added proper hover states for selected interactive elements

**Documentation Enhancements:**

- Added cross-links between related token pages
- Reorganized interactive demos to follow their relevant token tables
- Added comprehensive dropdown demo with all states
- Added tooltip demo with all arrow variants
- Replaced inline styles with reusable utility classes
