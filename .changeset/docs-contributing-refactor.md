---
'@designgreat/docs-design-system': minor
---

Refactor and optimize contributing documentation

**CI Workflows:**

- Created `check-code-quality.yml` workflow for PR validation (lint, typecheck, test, coverage,
  validate, build)
- Enhanced `check-changeset.yml` with full changeset validation
  (`pnpm changeset status --since=origin/main`)
- Standardized workflow naming: `check-*` pattern for PR checks

**Publishing Documentation:**

- Standardized publishing docs across all 3 packages with consistent structure:
  - Before Opening a PR (checklist)
  - CI Pipeline (mermaid diagrams + tables + workflow links)
  - Package Distribution / Deployment
  - Next Steps
- Added mermaid flowcharts for CI pipelines (On Every PR, On Merge to Main)
- Consolidated changeset workflow into single source of truth (`changeset-workflow.mdx`)

**Documentation Structure:**

- Split `quality-deployment.mdx` into `quality.mdx` and `publishing.mdx` for
  documentation-site-development
- Added `publishing.mdx` template to contributing-docs-convention
- Fixed sidebar position conflicts in web-component docs (button, text-input, dialog)
- Fixed broken link in `documentation-site-development/get-started.mdx`

**Convention Compliance:**

- Standardized section headings ("Related Documentation" instead of "Related Resources")
- Reviewed and fixed all sidebar_position fields across docs-design-system
- Added workflow file links with 📄 prefix in publishing docs

**Cleanup:**

- Migrated `docs/changeset/` content to docs site
- Renamed `ci.yml` to `check-code-quality.yml` for naming consistency
- Updated all references to renamed/deleted files
- Fixed dead links across monorepo
