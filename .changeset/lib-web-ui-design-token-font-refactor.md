---
'@designgreat/lib-web-ui-design-token': minor
---

Refactor font architecture to self-contained dist/font directory with relative paths

- Created self-contained `dist/font/` directory containing font-face.css and all font files
- Changed font paths from absolute (`/assets/fonts/`) to relative (`./`) for better bundler
  compatibility
- Updated Style Dictionary configuration to generate font-face.css in dist/font/ directory
- Modified post-build script to preserve generated font-face.css when copying font files
- Added new package exports: `./font` (font-face.css) and `./font/*` (font files)
- Removed old exports: `./css/font-face` and `./fonts`
- Updated README.md to document new font architecture and self-contained directory structure
- Fixed Style Dictionary font platform configuration to include required transforms
