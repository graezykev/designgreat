---
'@designgreat/lib-web-ui': patch
---

Refactor documentation and update font consumption to use new architecture

- Moved usage/consumption documentation from README.md to docs/design-system/web-components.md
- Restructured README.md to focus on architecture, development workflows, and build processes
- Updated cross-references between documentation files
- Fixed ESLint errors in code examples by making them complete, valid TypeScript/TSX
- Improved code examples with proper React component wrappers and fragments
- Updated Storybook preview to import fonts from new `@designgreat/lib-web-ui-design-token/font`
  export
- Removed font copying from dev and build scripts (now handled by bundlers)
- Updated README to document clean CSS strategy (no font-face or font-family in lib CSS)
