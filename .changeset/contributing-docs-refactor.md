---
'@designgreat/docs-design-system': patch
---

Contributing documentation refactor and optimization

**Critical Fixes:**

- Fixed non-existent `dg-theme-light` class references in `frameworks.mdx` (light theme uses no
  class)
- Removed outdated `generate:theme` command references across multiple files
- Fixed incorrect `vitest.config.ts` → `jest.config.ts` in architecture.mdx
- Removed references to deleted `designgreat-theme.css` file in troubleshooting.mdx
- Corrected "Vitest tests" → "Jest tests" in web-component get-started.mdx

**Terminology Standardization:**

- Changed "UI library" → "component library" in font-handling.mdx and font-assets.mdx
- Replaced ambiguous `dg-theme-*` wildcard with explicit `.dg-theme-dark` class references
- Unified "Related Resources" → "Next Steps" across all contributing docs
- Added naming disclaimer in web-component overview.mdx clarifying React components vs Web
  Components API

**Content Consolidation:**

- Added shared "Getting Started" section to contributing index.mdx
- Simplified both get-started.mdx files to link to shared setup
- Streamlined font-handling.mdx (~176 → ~90 lines) focusing on contributor needs
- Streamlined font-assets.mdx (~294 → ~150 lines) removing consumer-focused content
- Simplified CSS layer explanation in architecture.mdx with link to consumer guide
- Restructured font-handling.mdx with logical flow (Overview → Architecture → Usage → Best
  Practices)
- Moved "Why Component Library Doesn't Bundle Fonts" from font-assets.mdx to font-handling.mdx
- Restored and refined "Import Chain" diagrams for clarity
