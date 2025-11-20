# Changesets Workflow [TBD]

This repository uses [Changesets](https://github.com/changesets/changesets) to manage versioning and
releases for every workspace package. Follow the steps below when you introduce user-facing changes:

## 🔁 Workflow Overview

```text
Personal Branch → Changeset File → PR → CI Metadata Injection → Versioning → Publishing
```

### ✅ Flow Summary

1. **Run `pnpm exec changeset` in your personal branch**, when the branch is ready for release.
2. **Select affected packages**
3. **Choose appropriate semver bump (patch / minor / major)**
4. **Describe the change using the [template](./template.md)**
5. **Commit and push the `.changeset/*.md` file**
6. **Open a PR** to `main`
7. **CI blocks PRs without a valid changeset file**
8. **On merge to `main`, CI runs `pnpm exec changeset version`**
   - Auto-inject PR link and author into the changeset
   - Bumps versions
   - Updates changelogs for each package (`CHANGELOG.md`)
   - Deletes `.changeset/*.md` files
9. **CI commit the changelog(s) to `main`**
10. **CI runs `pnpm exec changeset publish` to publish changed packages to npm**

### Best Practices

#### 1. One Changeset Per Logical Change

**Split changesets when changes address different concerns:**

- Bug fix vs. feature vs. refactor
- Different areas of functionality
- Changes that deserve distinct changelog entries

**Example:** Multiple changesets for the same package is OK and encouraged:

```
.changeset/fix-button-accessibility.md
.changeset/add-button-loading-state.md
.changeset/refactor-button-styles.md
```

Changesets will automatically merge all entries into one changelog and take the highest version
bump.

#### 2. Group Tightly Coupled Changes

Combine into a single changeset when changes are part of the same logical unit and don't need
separate documentation.

#### 3. Write Clear, User-Facing Summaries

- Focus on the "what" and "why", not the "how"
- Follow the [template](./template.md) for consistency
- Keep it concise—this becomes part of `CHANGELOG.md`
