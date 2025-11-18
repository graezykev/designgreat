# React Version Management & Update Guide

**TL;DR:** We use pnpm Catalog to manage React versions from one place. Update the catalog → run
sync → done!

## Table of Contents

1. [Quick Update Guide](#quick-update-guide)
2. [Architecture](#architecture)
3. [Commands Reference](#commands-reference)
4. [Important Notes](#important-notes)
5. [Troubleshooting](#troubleshooting)

---

## Quick Update Guide

### 🚀 Update React in 3 Steps

```
┌─────────────────────────────────────────────────────────────────┐
│ Step 1: Edit Catalog                                            │
└─────────────────────────────────────────────────────────────────┘

vim pnpm-workspace.yaml

  catalog:
    react: ^19.0.0        # ← Change here
    react-dom: ^19.0.0    # ← And here


┌─────────────────────────────────────────────────────────────────┐
│ Step 2: Sync peerDependencies                                   │
└─────────────────────────────────────────────────────────────────┘

$ pnpm check:react-versions --sync

🔧 Syncing peerDependencies to match catalog...
  🔧 Updating react: ^18.3.1 → ^19.0.0
  🔧 Updating react-dom: ^18.3.1 → ^19.0.0
✅ Synced: packages/lib-web-ui/package.json
✨ Synced 1 file(s) successfully!


┌─────────────────────────────────────────────────────────────────┐
│ Step 3: Install & Verify                                        │
└─────────────────────────────────────────────────────────────────┘

$ pnpm install
$ pnpm test
$ git add .
$ git commit -m "chore: update React to v19.0.0"
```

### What Gets Updated Automatically

```
┌───────────────────────────┬─────────────────────────────────────┐
│ Location                  │ How Updated                         │
├───────────────────────────┼─────────────────────────────────────┤
│ Root devDependencies      │ ✅ Auto (catalog:)                  │
│ lib-web-ui devDependencies│ ✅ Auto (catalog:)                  │
│ docs-design-system deps   │ ✅ Auto (catalog:)                  │
│ lib-web-ui peerDeps       │ 🔧 Semi-auto (--sync command)       │
└───────────────────────────┴─────────────────────────────────────┘
```

---

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ pnpm-workspace.yaml                                             │
│                                                                 │
│   catalog:                                                      │
│     react: ^18.3.1        ◄─── SINGLE SOURCE OF TRUTH          │
│     react-dom: ^18.3.1                                          │
│     '@types/react': ^18                                         │
│     '@types/react-dom': ^18                                     │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ Automatic propagation
                               │
        ┌──────────────────────┼──────────────────┐
        │                      │                  │
        ▼                      ▼                  ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ lib-web-ui   │   │ docs-design  │   │ Root         │
│ (Library)    │   │ -system      │   │ (Workspace)  │
│              │   │ (App)        │   │              │
│ peerDeps:    │   │              │   │ devDeps:     │
│  react:      │   │ deps:        │   │  react:      │
│  ^18.3.1     │   │  react:      │   │  catalog:    │
│  (explicit)  │   │  catalog: ✓  │   │  ✓           │
│              │   │  ✓           │   │              │
│ devDeps:     │   │              │   │              │
│  react:      │   │              │   │              │
│  catalog: ✓  │   │              │   │              │
└──────────────┘   └──────────────┘   └──────────────┘
```

### How It Works

```yaml
# pnpm-workspace.yaml
catalog:
  react: ^18.3.1 # ← Define once here
```

```json
// In any package.json
{
  "devDependencies": {
    "react": "catalog:" // ← Reference, no version!
  }
}
```

**Key Principle:** Edit version once → Catalog propagates everywhere automatically!

### Special Case: peerDependencies

```
┌─────────────────────────────────────────────────────────────────┐
│ Why peerDependencies can't use catalog:                        │
│                                                                 │
│ • Published to npm                                              │
│ • External users need to see actual version ranges             │
│ • "catalog:" is pnpm-internal only                              │
│                                                                 │
│ Solution: Our script syncs them automatically! ✨               │
└─────────────────────────────────────────────────────────────────┘

lib-web-ui/package.json:
{
  "peerDependencies": {
    "react": "^18.3.1"     ◄─── Synced by --sync command
  },
  "devDependencies": {
    "react": "catalog:"    ◄─── Auto-updates from catalog
  }
}
```

### Industry Standard Pattern

This is the established pattern used by major React component libraries:

**Material-UI (MUI):**

```json
{
  "peerDependencies": {
    "react": "^17.0.0 || ^18.0.0"
  },
  "devDependencies": {
    "react": "^18.2.0"
  }
}
```

**React Router:**

```json
{
  "peerDependencies": {
    "react": ">=16.8"
  },
  "devDependencies": {
    "react": "^18.2.0"
  }
}
```

**Why This Pattern?**

```
Component Library Pattern:
┌─────────────────────────────────────────┐
│ dependencies:     Things to bundle      │
│   ✅ clsx (utility, small)              │
│   ✅ Other utilities                    │
│                                         │
│ peerDependencies: Consumer provides     │
│   ✅ react (consumer's version)         │
│   ✅ react-dom (consumer's version)     │
│                                         │
│ devDependencies:  Local dev only        │
│   ✅ react (for testing/storybook)      │
│   ✅ storybook (dev tool)               │
│   ✅ jest (testing tool)                │
└─────────────────────────────────────────┘
```

**Key Insight:** Your library doesn't bundle React, it expects the consumer to provide it. But you
still need React locally to develop, test, and document your components.

**Why NOT in dependencies?**

If React was in `dependencies`, when someone installs your library:

1. npm would install React as part of your library
2. They likely already have React in their app
3. Now they have TWO React instances → **React breaks!**

```
❌ Error: Invalid hook call. Hooks can only be called inside
the body of a function component. This could happen because
you have more than one copy of React in the same app.
```

---

## Commands Reference

### Check Only (Read-Only)

```bash
pnpm check:react-versions
```

**Output:**

```
📦 React versions found:

  package.json
    🔧 devDependencies      react     : catalog:

  packages/lib-web-ui/package.json
    🔧 devDependencies      react     : catalog:
    👥 peerDependencies     react     : ^18.3.1

  packages/docs-design-system/package.json
    📦 dependencies         react     : catalog:

✅ All React versions are consistent!
```

### Check & Sync (Auto-Update)

```bash
pnpm check:react-versions --sync
```

**Use when:**

- ✅ After updating catalog
- ✅ To fix version mismatches
- ✅ Before committing React updates

### Verify Installation

```bash
# See what versions are actually installed
pnpm list react react-dom --depth=0

# Expected output:
# @designgreat/monorepo
# ├─┬ react 18.3.1
# └─┬ react-dom 18.3.1
```

---

## Important Notes

### Catalog Location

```
❌ WRONG                          ✅ CORRECT

package.json:                    pnpm-workspace.yaml:
{                                packages:
  "pnpm": {                        - packages/*
    "catalog": {
      "react": "^18.3.1"         catalog:
    }                              react: ^18.3.1
  }                                react-dom: ^18.3.1
}
```

**Remember:** Catalog must be in `pnpm-workspace.yaml`, not `package.json`!

**Note:** pnpm version requirements are defined in [`package.json`](../package.json) `engines`
field.

---

## Troubleshooting

### Error: "react@catalog: isn't supported"

**Cause:** Wrong location or old pnpm version

**Fix:**

```bash
# 1. Check pnpm version (must be >= 9.7.0)
pnpm --version

# 2. Upgrade if needed
corepack prepare pnpm@9.15.0 --activate

# 3. Verify catalog is in pnpm-workspace.yaml
cat pnpm-workspace.yaml | grep -A 5 "catalog:"

# 4. Clean install
rm -rf node_modules packages/*/node_modules pnpm-lock.yaml
pnpm install
```

### Warning: "peerDependencies mismatches found"

**Fix:**

```bash
pnpm check:react-versions --sync
```

### Tests fail with React version mismatch

**Fix:**

```bash
# Clean everything
rm -rf node_modules packages/*/node_modules pnpm-lock.yaml
pnpm install

# Verify single version
pnpm list react react-dom --depth=0
```

### Script says OK but pnpm shows warnings

**Cause:** Lockfile needs update

**Fix:**

```bash
pnpm install
```

---

## CI/CD Integration

**TODO:** Add to your pipeline:

```yaml
# .github/workflows/ci.yml
- name: Check React version consistency
  run: pnpm check:react-versions # Fails if mismatched
```

This will prevent version drift by failing the build if React versions are inconsistent.

---

## Maintenance Checklist

```
□ Run pnpm check:react-versions (before)
□ Edit pnpm-workspace.yaml catalog
□ Run pnpm check:react-versions --sync
□ Run pnpm install
□ Run pnpm check:react-versions (verify)
□ Run pnpm test
□ Run pnpm build
□ Commit: "chore: update React to vX.Y.Z"
```

---

## Benefits Summary

```
✅ Single Source of Truth    → Update one file
✅ Automatic Propagation     → No manual find & replace
✅ Type Safe                 → pnpm validates at install
✅ No Version Drift          → Impossible to mismatch
✅ Automated Sync            → Script handles peerDeps
✅ CI-Ready                  → Automatic validation
```

---

## Related Files

- [`pnpm-workspace.yaml`](../pnpm-workspace.yaml) - Edit catalog here!
- [`scripts/check-react-versions.ts`](../scripts/check-react-versions.ts) - Validation script
- [`packages/lib-web-ui/package.json`](../packages/lib-web-ui/package.json) - Library example
- [`packages/docs-design-system/package.json`](../packages/docs-design-system/package.json) - App
  example

## Related Guides

- [`eslint-configuration-guide.md`](./eslint-configuration-guide.md) - ESLint setup and maintenance
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) - Monorepo overview

---

## References

- [pnpm Catalogs Documentation](https://pnpm.io/catalogs)
- [pnpm 9.7.0 Release Notes](https://github.com/pnpm/pnpm/releases/tag/v9.7.0)
- [Semantic Versioning](https://semver.org/)
