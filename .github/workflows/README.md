# GitHub Actions Workflows

This directory contains all GitHub Actions workflows for the designgreat monorepo. These workflows
automate releases, deployments, package management, and quality checks.

## 📚 Documentation Index

- **[README.md](README.md)** (this file) - Complete workflow reference and documentation
- **[NAMING-CONVENTIONS.md](NAMING-CONVENTIONS.md)** - Workflow naming conventions and standards
- **[PACKAGE-DEPRECATION.md](PACKAGE-DEPRECATION.md)** - Package deprecation documentation

### GitHub Pages Deployment Documentation

- **[docs-storybook-gh-pages-VISUAL-GUIDE.md](docs-storybook-gh-pages-VISUAL-GUIDE.md)** - Visual
  diagrams for GitHub Pages deployment
- **[docs-storybook-gh-pages-MIGRATION-SUMMARY.md](docs-storybook-gh-pages-MIGRATION-SUMMARY.md)** -
  Migration details and rationale

---

## 🏗️ Workflow Architecture

### Release & Deployment Flow

```
Developer creates PR
          │
          ▼
┌─────────────────────────┐
│ 1. Check for Changeset  │◄── Validates PR has changeset
│    (PR validation)      │
└─────────────────────────┘
          │
          │ PR approved & merged
          ▼
┌─────────────────────────┐
│ 2. Version and Publish  │
│    - Version packages   │
│    - Update changelogs  │
│    - Publish to NPM     │
└──────────┬──────────────┘
           │ triggers on success
           ▼
┌─────────────────────────┐
│ 3. Deploy Docs &        │
│    Storybook            │
│    - Detect changes     │
│    - Build what changed │
│    - Merge intelligently│
│    - Deploy to GH Pages │
└─────────────────────────┘
```

### Package Lifecycle Management

```
Package Deleted from Repo
          │
          ▼
┌─────────────────────────┐
│ 4. Auto-Deprecate       │
│    Deleted Packages     │
│    - Detects deletion   │
│    - Deprecates on NPM  │
└─────────────────────────┘

OR (manual deprecation)

Developer Triggers Manual
          │
          ▼
┌─────────────────────────┐
│ 5. Deprecate NPM        │
│    Package (Manual)     │
│    - Custom message     │
│    - Specific package   │
└─────────────────────────┘
```

---

## 🚀 Active Workflows

### 1. Check for Changeset

**File:** `check-changeset.yml`  
**Status:** ✅ Active  
**Trigger:** Pull requests to `main` branch

**Purpose:**  
Validates that pull requests include a changeset file. Ensures all changes are properly documented
for version bumps and changelog generation.

**Workflow Steps:**

1. Checkout pull request code
2. Check for changeset files in `.changeset/*.md`
3. Fail if no changeset found

**Requirements:**

- PR authors must run `pnpm exec changeset` before merging
- At least one `.changeset/*.md` file must exist

**Why It's Important:**

- Enforces semantic versioning
- Ensures changelog is always up-to-date
- Prevents accidental releases without documentation

**To Fix Failures:**

```bash
# In your PR branch
pnpm exec changeset
# Follow prompts to document your changes
git add .changeset/
git commit -m "docs: add changeset"
git push
```

---

### 2. Version and Publish Packages

**File:** `version-publish-packages.yml`  
**Status:** ✅ Active  
**Trigger:** Push to `main` branch or manual dispatch

**Purpose:**  
Main release workflow that handles versioning and publishing packages to NPM. Uses Changesets for
version management and automated changelog generation.

**Workflow Steps:**

1. **Version Job:**
   - Detects changesets in `.changeset/` directory
   - Bumps package versions according to changeset specifications
   - Updates package.json files and CHANGELOG.md
   - Creates version commit and tags
   - Can be triggered manually with "publish-only" mode

2. **Publish Job:**
   - Builds all packages with dependencies
   - Publishes changed packages to NPM
   - Configured packages:
     - `@designgreat/lib-web-ui-design-token`
     - `@designgreat/lib-web-ui`
     - `@designgreat/docs-design-system`

**Secrets Required:**

- `NPM_TOKEN` - NPM authentication token for publishing

**Manual Trigger Options:**

- `run_publish_only` - Skip versioning and only run publish job

**Triggered By:**

- Automated: Push to `main` branch (after PR with changeset is merged)
- Manual: Workflow dispatch in GitHub Actions UI

**Triggers:**

- `deploy-docs-storybook-gh-pages.yml` (on successful completion)

---

### 3. Deploy Docusaurus & Storybook to GitHub Pages

**File:** `deploy-docs-storybook-gh-pages.yml`  
**Status:** ✅ Active  
**Trigger:** After "Version and Publish Packages" completes successfully

**Purpose:**  
Unified deployment workflow that atomically deploys both Docusaurus documentation and Storybook
component library to GitHub Pages. Prevents race conditions and content loss.

**Deployment Strategy:**

- **Root (`/`)**: Docusaurus documentation site
- **Subdirectory (`/lib-web-ui/`)**: Storybook component library

**Smart Deployment Modes:**

1. **Both Changed** (`mode=both`)
   - Builds both Docusaurus and Storybook fresh
   - No need to download existing site
   - Fastest full deployment (~6 minutes)

2. **Docs Only** (`mode=docs_only`)
   - Builds only Docusaurus
   - Downloads existing site to preserve Storybook
   - Merges new docs with existing Storybook

3. **Storybook Only** (`mode=storybook_only`)
   - Builds only Storybook
   - Downloads existing site to preserve docs
   - Merges new Storybook with existing docs

4. **No Changes** (`mode=none`)
   - Skips deployment entirely
   - No resources wasted

**Change Detection:**

- **Docs:** `packages/docs-design-system/`, `packages/lib-web-ui/`,
  `packages/lib-web-ui-design-token/`, workflow files
- **Storybook:** `packages/lib-web-ui/`, `packages/lib-web-ui-design-token/`, workflow files

**Benefits:**

- ✅ Atomic deployments (no race conditions)
- ✅ Smart building (only builds what changed)
- ✅ Content preservation (never loses unchanged content)
- ✅ Comprehensive verification (validates before deployment)

**Deployment URL:** `https://graezykev.github.io/designgreat/`

**Permissions Required:**

- `contents: read` - Read repository contents
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - GitHub Pages deployment token

**See Also:**

- [Visual Guide](docs-storybook-gh-pages-VISUAL-GUIDE.md) for detailed diagrams
- [Migration Summary](docs-storybook-gh-pages-MIGRATION-SUMMARY.md) for implementation details

---

### 4. Auto-Deprecate Deleted Packages

**File:** `auto-deprecate-deleted-packages.yml`  
**Status:** ✅ Active  
**Trigger:** Push to `main` with changes in `packages/**`

**Purpose:**  
Automatically deprecates NPM packages when their directories are deleted from the monorepo. Prevents
users from installing abandoned packages.

**Workflow Steps:**

1. **Detect Deletions:**
   - Compares current commit with previous commit
   - Finds deleted `package.json` files in `packages/`
   - Extracts package names from deleted files

2. **Deprecate on NPM:**
   - Checks if packages exist on NPM registry
   - Deprecates each found package
   - Uses standard deprecation message

**Deprecation Message:**

```
⚠️ This package has been removed from the monorepo and is no longer maintained.
Please remove it from your dependencies.
```

**Secrets Required:**

- `NPM_TOKEN` - NPM authentication token

**Behavior:**

- Only processes non-private packages
- Skips packages not published to NPM
- Provides summary of deprecated packages

**See Also:**

- [Package Deprecation Documentation](PACKAGE-DEPRECATION.md)

---

### 5. Deprecate NPM Package (Manual)

**File:** `deprecate-package.yml`  
**Status:** ✅ Active  
**Trigger:** Manual workflow dispatch only

**Purpose:**  
Manually deprecate a specific NPM package. Used for packages that need deprecation without deleting
from the monorepo.

**Manual Trigger Inputs:**

- `package_name` (required) - Full package name (e.g., `@designgreat/lib-web-ui-website`)
- `deprecation_message` (required) - Custom deprecation message
  - Default: "This package is no longer maintained. Please remove it from your dependencies."

**Workflow Steps:**

1. Verify package exists on NPM
2. Deprecate with custom message
3. Verify deprecation was successful
4. Generate summary report

**Usage:**

1. Go to Actions → "Deprecate NPM Package"
2. Click "Run workflow"
3. Enter package name and message
4. Click "Run workflow"

**Use Cases:**

- Deprecating renamed packages
- Marking packages as replaced by alternatives
- Sunsetting experimental packages
- Consolidating duplicate packages

**Secrets Required:**

- `NPM_TOKEN` - NPM authentication token

**See Also:**

- [Package Deprecation Documentation](PACKAGE-DEPRECATION.md)

---

## ⚠️ Deprecated Workflows

### deploy-docs-design-system.yml (DEPRECATED)

### deploy-lib-web-ui-storybook.yml (DEPRECATED)

**Status:** 🔴 Deprecated (triggers disabled)  
**Replacement:** `deploy-docs-storybook-gh-pages.yml`

**Why Deprecated:**  
These workflows had a critical race condition issue where deploying one would overwrite the other's
content on GitHub Pages, leading to lost content.

**Migration:**  
All functionality has been consolidated into `deploy-docs-storybook-gh-pages.yml`. These files are
kept for reference and can be manually triggered via `workflow_dispatch` in emergency situations,
but should not be used in normal operation.

**Triggers:** Disabled (manual `workflow_dispatch` only)

---

## 🔧 Workflow Dependencies

### Secrets Required

The following GitHub secrets must be configured in repository settings:

| Secret      | Used By                                                                                        | Purpose                                                             |
| ----------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `NPM_TOKEN` | version-publish-packages.yml<br/>auto-deprecate-deleted-packages.yml<br/>deprecate-package.yml | NPM registry authentication for publishing and deprecating packages |

### Permissions

Workflows use the following GitHub permissions:

| Permission        | Workflows                          | Purpose                         |
| ----------------- | ---------------------------------- | ------------------------------- |
| `contents: read`  | All                                | Read repository contents        |
| `contents: write` | version-publish-packages.yml       | Create version commits and tags |
| `pages: write`    | deploy-docs-storybook-gh-pages.yml | Deploy to GitHub Pages          |
| `id-token: write` | deploy-docs-storybook-gh-pages.yml | GitHub Pages authentication     |

---

## 📋 Common Tasks

### Releasing a New Version

1. **Create changesets for your changes:**

   ```bash
   pnpm exec changeset
   ```

2. **Open PR and get approval:**
   - Ensure "Check for Changeset" workflow passes
   - Get code review approval

3. **Merge to main:**
   - "Version and Publish Packages" runs automatically
   - Packages are versioned and published to NPM
   - Docs/Storybook deploy automatically if relevant files changed

### Manual Publishing

If automatic publishing fails:

1. Go to Actions → "Version and Publish Packages"
2. Click "Run workflow"
3. Enable "Skip versioning steps and trigger publish job only"
4. Click "Run workflow"

### Deprecating a Package

**If deleting from monorepo:**

- Just delete the package directory and push to main
- Auto-deprecation runs automatically

**If keeping in monorepo but deprecating:**

1. Go to Actions → "Deprecate NPM Package"
2. Click "Run workflow"
3. Enter package name (e.g., `@designgreat/old-package`)
4. Enter deprecation message
5. Click "Run workflow"

### Fixing Deployment Issues

**If docs/Storybook site is missing:**

1. Check latest "Deploy Docusaurus & Storybook to GitHub Pages" run
2. Look for verification failures
3. Manually trigger if needed:
   - Go to Actions → "Deploy Docusaurus & Storybook to GitHub Pages"
   - Click "Run workflow"

**Emergency fallback:**

- Can manually trigger deprecated workflows if absolutely necessary
- Should only be used as last resort

---

## 🧪 Testing Workflows

### Testing Locally

Some workflow steps can be tested locally:

```bash
# Test changeset creation
pnpm exec changeset

# Test package builds
pnpm --filter @designgreat/lib-web-ui build

# Test documentation builds
pnpm --filter @designgreat/docs-design-system build
pnpm --filter @designgreat/lib-web-ui storybook:build
```

### Testing in CI

1. **Create a test branch:**

   ```bash
   git checkout -b test/workflow-changes
   ```

2. **Make workflow changes:**
   - Edit workflow files
   - Commit and push

3. **Create PR to main:**
   - Observe "Check for Changeset" workflow
   - Test PR-triggered workflows

4. **Test deployment workflows:**
   - May need to temporarily enable on test branches
   - Or merge to main and observe results

---

## 🐛 Troubleshooting

### "Check for Changeset" fails

**Problem:** PR is blocked because no changeset found

**Solution:**

```bash
pnpm exec changeset
# Follow prompts, then commit and push
```

### "Version and Publish Packages" fails at publish step

**Problem:** NPM authentication failure

**Solution:**

1. Verify `NPM_TOKEN` secret is set correctly
2. Check token hasn't expired
3. Verify token has publish permissions

### "Deploy Docs & Storybook" deploys incomplete site

**Problem:** Only docs or only Storybook deployed

**Solution:**

1. Check workflow logs for "mode" determination
2. Verify change detection patterns are correct
3. Check if wget download of existing site succeeded
4. Manually trigger workflow if needed

### Package deprecation not working

**Problem:** Auto-deprecation didn't run or failed

**Solution:**

1. Check "Auto-Deprecate Deleted Packages" workflow logs
2. Verify package was actually published to NPM
3. Check `NPM_TOKEN` secret is valid
4. Manually run "Deprecate NPM Package" workflow

---

## 📊 Workflow Statistics

| Workflow                   | Avg Duration | Frequency             | Critical       |
| -------------------------- | ------------ | --------------------- | -------------- |
| 1. Check for Changeset     | ~30 seconds  | Per PR                | ✅ Yes         |
| 2. Version and Publish     | ~5-8 minutes | Per merge to main     | ✅ Yes         |
| 3. Deploy Docs & Storybook | ~4-8 minutes | After version/publish | ⚠️ Important   |
| 4. Auto-Deprecate          | ~1-2 minutes | On package deletion   | ℹ️ Maintenance |
| 5. Manual Deprecate        | ~30 seconds  | Rare                  | ℹ️ Maintenance |

---

## 🔐 Security Considerations

### NPM Token Security

- **Token Scope:** Should have publish and deprecate permissions only
- **Token Type:** Use automation tokens (not personal tokens)
- **Rotation:** Rotate tokens periodically
- **Access:** Never log or expose `NPM_TOKEN` in workflow output

### GitHub Pages Security

- **Token:** GitHub automatically provides deployment token
- **Permissions:** Limited to Pages deployment only
- **Content:** All content is public (be careful what you deploy)

### Workflow Permissions

- Workflows use minimum required permissions
- Write permissions only where absolutely necessary
- Read-only by default

---

## 🚀 Future Improvements

### Potential Enhancements

1. **Deployment:**
   - Add deployment preview URLs for PRs
   - Implement rollback capability
   - Add deployment status notifications

2. **Testing:**
   - Add E2E tests before deployment
   - Visual regression testing for Storybook
   - Link checking for documentation

3. **Performance:**
   - Parallel builds for docs and Storybook
   - Better caching strategies
   - Incremental builds

4. **Notifications:**
   - Slack/Discord notifications for deployments
   - Email alerts for failed workflows
   - Status badges in README

5. **Quality Gates:**
   - Automated accessibility testing
   - Bundle size tracking
   - Performance budgets

---

## 📞 Support

### Getting Help

- **Workflow Issues:** Check workflow logs in Actions tab
- **Permission Issues:** Contact repository administrators
- **NPM Issues:** Check NPM token and permissions
- **Documentation:** See linked docs in this README

### Reporting Issues

When reporting workflow issues, include:

1. Workflow name and run ID
2. Error messages from logs
3. Steps to reproduce
4. Expected vs actual behavior

---

## 📝 Maintenance Notes

**Last Major Update:** November 2025  
**Maintained By:** Development Team  
**Review Frequency:** Quarterly or when issues arise

**Key Responsibilities:**

- Keep actions up to date (Dependabot recommended)
- Monitor workflow success rates
- Update documentation when workflows change
- Rotate NPM tokens periodically
- Review and optimize workflow performance

---

**Version:** 2.0  
**Status:** ✅ Complete and Comprehensive  
**Last Updated:** November 17, 2025
