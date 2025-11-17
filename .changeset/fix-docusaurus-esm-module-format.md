---
'@designgreat/docs-design-system': patch
---

Fix ESM module format for Docusaurus scripts

Renamed `scripts/copy-fonts.ts` to `scripts/copy-fonts.mts` to explicitly mark it as an ESM module.
This allows the script to use `import.meta` syntax while being properly linted and typechecked by
Node.js configs, without requiring `"type": "module"` in package.json (which would break Docusaurus
compatibility).
