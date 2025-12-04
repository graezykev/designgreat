---
'@designgreat/lib-design-token': minor
---

Added CLI commands for copying assets:

- `dg-copy-brand <dest>` — Copy brand assets (logo.svg)
- `dg-copy-fonts <dest>` — Copy font assets (font-face.css + woff2 files)
- `dg-copy-all <dest>` — Copy all assets

**Usage:**

```bash
# Within monorepo (lib-design-token is a dependency)
dg-copy-brand ./public

# External consumers
npx @designgreat/lib-design-token dg-copy-brand ./public
```

**Implementation:**

- Added `commander` dependency for CLI argument parsing
- Created `src/cli/` with CLI entries and shared logic in `lib/` subfolder
- Added `bin` entries in package.json
- Removed redundant wrapper scripts from `scripts/` folder
