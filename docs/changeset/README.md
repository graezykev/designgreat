# Changesets Workflow [TBD]

This repository uses [Changesets](https://github.com/changesets/changesets) to manage versioning and
releases for every workspace package. Follow the steps below when you introduce user-facing changes:

## 🔁 Workflow Overview

```text
Personal Branch → Changeset File → PR → CI Metadata Injection → Versioning → Publishing
```

### ✅ Flow Summary

1. **Run `pnpm exec changeset` in your personal branch**
2. **Select affected packages**
3. **Choose appropriate semver bump (patch / minor / major)**
4. **Describe the change using the [template](./template.md)**
5. **Commit and push the `.changeset/*.md` file**
6. **Open a PR** to `main` — CI will auto-inject PR link and author into the changeset
7. **CI blocks PRs without a valid changeset file**
8. **On merge to `main`, CI runs `pnpm exec changeset version`**
   - Bumps versions
   - Updates changelogs
   - Deletes `.changeset/*.md` files
9. **CI runs `pnpm exec changeset publish` to publish changed packages to npm**

> Tip: group related work into a single changeset and keep the summary concise—this message becomes
> part of the release changelog.
