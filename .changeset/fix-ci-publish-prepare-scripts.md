---
'@designgreat/lib-web-ui-design-token': patch
'@designgreat/design-token-support': patch
'@designgreat/lib-web-ui': patch
---

Fix CI/CD publish failures by making prepare and prepublishOnly scripts conditional

- Modified `prepare` and `prepublishOnly` scripts to skip during CI environment to prevent build
  errors during `changeset publish`
- Local development workflow unchanged: `pnpm install` still auto-builds packages
- CI/CD workflow now uses explicit build steps before publishing, avoiding circular dependency
  issues
- Resolves "Cannot find module" errors during package publishing in GitHub Actions
