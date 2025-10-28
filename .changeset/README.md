# Changesets Workflow

This repository uses [Changesets](https://github.com/changesets/changesets) to manage versioning and
releases for every workspace package. Follow the steps below when you introduce user-facing changes:

1. Run `pnpm changeset` and select the packages that changed.
2. Choose the appropriate semver bump for each package and describe the change in the generated
   markdown file.
3. Commit the new changeset file together with your code changes.
4. When it is time to release, run `pnpm release` to version every pending changeset and publish (or
   create release artifacts).

> Tip: group related work into a single changeset and keep the summary concise—this message becomes
> part of the release changelog.
