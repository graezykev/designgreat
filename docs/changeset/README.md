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
9. **CI runs `pnpm exec changeset publish` to publish changed packages to npm**
10. **CI commit the changelog(s) to `main`**

### Best Practices

1. If the changes are unrelated or deserve different summaries, split them into separate
   `.changeset/*.md` files. You can run `pnpm exec changeset` multiple times to create multiple
   `.md` files — one per logical change.

2. Otherwise, group related work into a single changeset if the changes are general.

3. Keep the summary concise — this message becomes part of the release **changelog**
   (`CHANGELOG.md`).
