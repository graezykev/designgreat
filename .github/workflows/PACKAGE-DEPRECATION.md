# Package Deprecation Workflows

This directory contains GitHub Actions workflows for automatically deprecating NPM packages.

## Workflows

### 1. `deprecate-package.yml` - Manual Deprecation

**Trigger:** Manual (workflow_dispatch)

**Purpose:** Manually deprecate any package on NPM with a custom message.

**Usage:**

1. Go to Actions → "Deprecate NPM Package"
2. Click "Run workflow"
3. Enter:
   - **Package name:** e.g., `@designgreat/lib-web-ui-website`
   - **Deprecation message:** Custom message users will see

**Example:**

```
Package: @designgreat/lib-web-ui-website
Message: This package has been removed and is no longer maintained.
```

### 2. `auto-deprecate-deleted-packages.yml` - Automatic Deprecation

**Trigger:** Automatic on push to `main` when packages are deleted

**Purpose:** Automatically detects when a package directory is deleted and deprecates it on NPM.

**How it works:**

1. Monitors changes to `packages/**` on `main` branch
2. Detects deleted `package.json` files
3. Extracts package names from the deleted files
4. Automatically deprecates them on NPM (if published)

**Behavior:**

- Only processes **non-private** packages (`"private": false`)
- Skips packages that were never published to NPM
- Uses a standard deprecation message

**Standard Message:**

> ⚠️ This package has been removed from the monorepo and is no longer maintained. Please remove it
> from your dependencies.

## Setup Requirements

### NPM Token

Both workflows require an NPM authentication token stored as a GitHub secret:

**Secret name:** `NPM_TOKEN`

**To create:**

1. Log in to npmjs.com
2. Go to Access Tokens → Generate New Token
3. Select "Automation" type
4. Copy the token
5. Add to GitHub: Repository Settings → Secrets → Actions → New repository secret
   - Name: `NPM_TOKEN`
   - Value: [paste token]

**Token Permissions Required:**

- Read and write access to packages
- Ability to deprecate packages

### Workflow Permissions

The workflows use:

- `contents: read` - To check out repository
- `NPM_TOKEN` - For NPM operations

## Usage Examples

### Example 1: Manually Deprecate a Package

When you decide to remove `@designgreat/lib-web-ui-website`:

1. **First, trigger the deprecation workflow:**
   - Actions → "Deprecate NPM Package" → Run workflow
   - Package: `@designgreat/lib-web-ui-website`
   - Message: "This package has been merged into @designgreat/lib-web-ui"

2. **Then, remove from monorepo:**
   ```bash
   git rm -rf packages/lib-web-ui-website
   git commit -m "chore: remove lib-web-ui-website package"
   git push
   ```

### Example 2: Automatic Deprecation

Simply delete the package and push:

```bash
# Delete the package
rm -rf packages/lib-web-ui-website

# Commit and push
git add -A
git commit -m "chore: remove lib-web-ui-website package"
git push origin main
```

The workflow will automatically:

1. Detect the deletion
2. Extract the package name from git history
3. Deprecate it on NPM
4. Provide a summary in the Actions run

## Verification

After deprecation, verify with:

```bash
# Check deprecation status
npm view @designgreat/lib-web-ui-website

# Output should include:
# deprecated: '⚠️ This package has been removed...'
```

## Best Practices

### When to Deprecate vs Unpublish

**Deprecate (Recommended):**

- Package has been published for > 72 hours
- Other projects might depend on it
- You want to provide migration guidance
- Graceful transition period

**Unpublish (Use sparingly):**

- Within 72 hours of publishing
- Package was published by mistake
- Security concerns require immediate removal
- Package never had dependencies

### Deprecation Message Guidelines

**Good messages:** ✅ "This package is no longer maintained. Use @designgreat/lib-web-ui instead."
✅ "Merged into @designgreat/lib-web-ui. See migration guide: [link]" ✅ "This package has been
removed from the monorepo. Please uninstall it."

**Bad messages:** ❌ "Deprecated" (no context) ❌ "Don't use this" (no alternative) ❌ "Old package"
(unclear)

### Migration Strategy

1. **Deprecate first** (with migration message)
2. **Wait 1-2 weeks** for users to see warnings
3. **Remove from monorepo** after grace period
4. **Update documentation** to reflect removal

## Troubleshooting

### Workflow fails with "Package not found"

**Cause:** Package was never published to NPM

**Solution:** This is expected. The workflow will skip it gracefully.

### Workflow fails with "401 Unauthorized"

**Cause:** NPM_TOKEN is invalid or missing

**Solution:**

1. Check GitHub Secrets settings
2. Regenerate NPM token if expired
3. Update `NPM_TOKEN` secret

### Workflow fails with "403 Forbidden"

**Cause:** Token doesn't have deprecation permissions

**Solution:**

1. Ensure token is "Automation" type (not "Read-only")
2. Regenerate with correct permissions

### Auto-deprecation doesn't trigger

**Cause:** Workflow only triggers on `packages/**` changes

**Solution:**

1. Ensure package was deleted from `packages/` directory
2. Check workflow file path filters
3. Verify push was to `main` branch

## Customization

### Customize Deprecation Message

Edit the message in `auto-deprecate-deleted-packages.yml`:

```yaml
npm deprecate "$package" "Your custom message here"
```

### Change Trigger Branch

Edit the `on.push.branches` section:

```yaml
on:
  push:
    branches:
      - main
      - production # Add more branches
```

### Add Notifications

Add a notification step (Slack, Discord, etc.):

```yaml
- name: Notify team
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "Package deprecated: ${{ steps.detect.outputs.package_names }}"
      }
```

## Related Workflows

- `version-publish-packages.yml` - Publishes packages to NPM
- `check-changeset.yml` - Validates changesets

## References

- [NPM Deprecate Documentation](https://docs.npmjs.com/deprecating-and-undeprecating-packages-or-package-versions)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Changesets Documentation](https://github.com/changesets/changesets)
