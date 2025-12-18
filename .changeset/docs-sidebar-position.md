---
'@designgreat/docs-design-system': patch
---

Fix sidebar position conflict in API reference guide

**Issue Found:** `guides/api/reference.mdx` had `sidebar_position: 1`, conflicting with
`quick-start.mdx`.

**Changes:**

- Change `sidebar_position` from `1` to `9` in `guides/api/reference.mdx`
- Resolves sidebar navigation conflict
- Maintains proper ordering in documentation navigation

**Files Modified:**

- `docs-design-token/guides/api/reference.mdx`: Sidebar position update

**Note:** Also added TypeScript/JavaScript usage examples section to this file.
