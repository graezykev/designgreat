---
'@designgreat/docs-design-system': minor
---

**Major documentation restructure with improved naming conventions and URL consistency**

## Breaking Changes (URL Paths)

- `/docs/` → `/design-token/` (Design Token documentation)
- `/components/` → `/web-component/` (Web Component documentation)

## Folder Renames

### Documentation Folders

- `docs/` → `docs-design-token/`
- `docs-components/` → `docs-web-component/`
- `docs/tutorial/` → `docs-design-token/guides/`
- `docs/colors/` → `docs-design-token/colors/`

### Contributing Folders

- `design-tokens-development/` → `design-token-development/`
- `component-library-development/` → `web-component-development/`
- `documentation-site/` → `documentation-site-development/`

### Sidebar Files

- `sidebars.ts` → `sidebars-design-token.ts`
- `sidebars-components.ts` → `sidebars-web-component.ts`

## Naming Conventions Established

### Singular/Plural Rule

- Nouns (subjects) determine plural/singular: "Guides" (collection), "Guide" (single page)
- Modifiers stay singular: "Design Token", "Web Component", "Color Token"

### Examples

- ✅ "Design Token Guides" (plural noun)
- ✅ "Design Token Development" (singular modifier)
- ❌ "Design Tokens Guides" (modifier should be singular)

## Documentation Improvements

- Added `conventions.mdx` documenting naming rules and templates
- Fixed all `sidebar_position` fields (removed decimals, resolved conflicts)
- Updated all internal links to use new URL paths
- Updated ESLint config paths for new folder structure
