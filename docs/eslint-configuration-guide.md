# ESLint Configuration & Maintenance Guide

**TL;DR:** We use a shared `@designgreat/eslint-config` package with flat config presets. Sync peer
dependencies with `pnpm sync:eslint-deps`, extend with workspace-specific rules in
`eslint.config.js`.

> **📝 Note:** This guide uses glob patterns (e.g., `packages/lib-*/**`) and generic examples to
> remain maintainable as packages are added/removed. Actual package names may differ from examples.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Architecture](#architecture)
3. [Configuration Guide](#configuration-guide)
4. [Dependency Management](#dependency-management)
5. [Extending & Customizing](#extending--customizing)
6. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Using ESLint in Your Workspace

```bash
# Lint all files
pnpm lint

# Lint with auto-fix
pnpm lint:fix

# Lint specific package
pnpm --filter @designgreat/lib-web-component lint
```

### Syncing ESLint Dependencies

```bash
# Preview changes
pnpm sync:eslint-deps --dry-run

# Apply sync
pnpm sync:eslint-deps
```

---

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ @designgreat/eslint-config                                      │
│ (Shared Package)                                                │
│                                                                 │
│ ├── base.js         → Base rules for all TypeScript           │
│ ├── react.js        → React-specific rules                     │
│ ├── node.js         → Node.js/backend rules                    │
│ └── markdown.js     → Markdown linting                         │
│                                                                 │
│ peerDependencies:   ← Declares what consumers need             │
│   - eslint, plugins, parsers, etc.                             │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ consumed by
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│ Root eslint.config.js                                           │
│                                                                 │
│ import createBaseConfig from '@designgreat/eslint-config/base' │
│ import createReactConfig from '@designgreat/eslint-config/react'│
│                                                                 │
│ Composes presets + workspace-specific overrides               │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ enforced across
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│ All Workspace Packages                                          │
│                                                                 │
│ ├── packages/lib-*/              ← React preset for UI libs   │
│ ├── packages/docs-*/             ← React preset for docs      │
│ ├── packages/app-*/              ← React/Node presets         │
│ ├── packages/shared/             ← Base preset                │
│ └── scripts/                     ← Node preset                │
└─────────────────────────────────────────────────────────────────┘
```

### Flat Config System (ESLint 9+)

We use **ESLint 9 Flat Config** (not legacy `.eslintrc`):

```javascript
// ✅ Modern (What we use)
// eslint.config.js
export default [
  ...baseConfig,
  ...reactConfig,
  { rules: { 'no-console': 'warn' } }
]

// ❌ Legacy (Deprecated)
// .eslintrc.json
{
  "extends": ["base", "react"],
  "rules": { "no-console": "warn" }
}
```

### Preset Breakdown

#### Base Preset (`base.js`)

- **For:** All TypeScript code
- **Includes:**
  - TypeScript ESLint parser & plugin
  - Import plugin with TypeScript resolver
  - Promise plugin
  - Unicorn plugin
  - ESLint comments plugin
  - XO base configurations

**Key Features:**

```javascript
{
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: true,  // ← Resolves TS paths
      node: true
    }
  }
}
```

#### React Preset (`react.js`)

- **For:** React components and applications
- **Includes:**
  - React plugin
  - React Hooks plugin
  - JSX a11y plugin (accessibility)
  - XO React configurations

#### Node Preset (`node.js`)

- **For:** Backend services, scripts, Node-only code
- **Includes:**
  - Node plugin (n)
  - Different TypeScript project settings

#### Markdown Preset (`markdown.js`)

- **For:** Linting code blocks in `.md` files
- **Includes:**
  - ESLint Markdown plugin

---

## Configuration Guide

### Root Configuration (`eslint.config.js`)

```javascript
import createBaseConfig from '@designgreat/eslint-config/base'
import createMarkdownConfig from '@designgreat/eslint-config/markdown'
import createNodeConfig from '@designgreat/eslint-config/node'
import createReactConfig from '@designgreat/eslint-config/react'

// Define which files get which preset
// Note: Update these globs when adding/removing packages
const reactWorkspaceGlobs = [
  'packages/lib-*/**/*.{ts,tsx}', // All UI libraries
  'packages/docs-*/**/*.{ts,tsx}', // All docs sites
  'packages/app-*-web/**/*.{ts,tsx}' // Web applications
]

const nodeWorkspaceGlobs = [
  'scripts/**/*.ts',
  'packages/app-*-service*/**/*.ts', // Backend services
  'packages/shared/**/*.ts'
]

const baseConfig = createBaseConfig()
const reactConfig = createReactConfig(reactWorkspaceGlobs)
const nodeConfig = createNodeConfig(nodeWorkspaceGlobs)
const markdownConfig = createMarkdownConfig()

export default [
  ...baseConfig,
  ...reactConfig,
  ...nodeConfig,
  ...markdownConfig,

  // Custom workspace rules
  {
    name: 'workspace/custom',
    rules: {
      'no-console': 'warn' // Example override
    }
  }
]
```

**💡 Pro Tip:** Use glob patterns (like `packages/lib-*/**`) instead of specific package names. This
makes your config resilient to package additions/removals.

### Package-Level Linting

Packages can have their own lint script:

```json
// packages/<any-package>/package.json
{
  "scripts": {
    "lint": "pnpm exec eslint . --max-warnings 0"
  }
}
```

This inherits from root `eslint.config.js` automatically.

---

## Dependency Management

### How Peer Dependencies Work

```
┌────────────────────────────────────────────────────────────┐
│ @designgreat/eslint-config/package.json                    │
│                                                            │
│ peerDependencies: {                                        │
│   "eslint": "^9.3.0",                                      │
│   "eslint-plugin-import": "^2.29.1",                       │
│   "eslint-import-resolver-typescript": "^4.4.4",          │
│   ...                                                      │
│ }                                                          │
│                                                            │
│ "These packages must be installed by the consumer"        │
└────────────────────────────────────────────────────────────┘
                               │
                               │ Synced by script
                               ▼
┌────────────────────────────────────────────────────────────┐
│ Root package.json                                          │
│                                                            │
│ devDependencies: {                                         │
│   "eslint": "^9.3.0",             ← Satisfies peer        │
│   "eslint-plugin-import": "^2.29.1", ← Satisfies peer    │
│   "eslint-import-resolver-typescript": "^4.4.4", ← NEW!  │
│   ...                                                      │
│ }                                                          │
└────────────────────────────────────────────────────────────┘
```

### Syncing Dependencies

**Automatic Sync with Script:**

```bash
# Check what needs syncing (dry run)
pnpm sync:eslint-deps --dry-run

# Output:
# 📦 Changes to be made:
#   ➕ eslint-plugin-new: ^1.0.0

# Apply changes
pnpm sync:eslint-deps

# Output:
# ✨ Successfully synced ESLint peer dependencies!
# 💡 Next steps:
#    1. Run: pnpm install
#    2. Verify: pnpm lint
```

**What the Script Does:**

1. Reads `peerDependencies` from `@designgreat/eslint-config`
2. Syncs them to root `devDependencies`
3. Verifies the sync succeeded
4. Shows clear diff of changes

### When to Sync

Run `pnpm sync:eslint-deps` when:

- ✅ Adding new ESLint plugins to shared config
- ✅ Updating plugin versions in shared config
- ✅ After pulling changes that modify eslint-config
- ✅ When you see "peer dependency not installed" warnings

---

## Extending & Customizing

### Adding Workspace-Specific Rules

```javascript
// eslint.config.js
export default [
  ...baseConfig,

  // Custom rule for test files
  {
    name: 'workspace/tests',
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      'no-console': 'off', // Allow console in tests
      '@typescript-eslint/no-explicit-any': 'warn' // Relax for tests
    }
  },

  // Custom rule for storybook
  {
    name: 'workspace/storybook',
    files: ['**/*.stories.tsx'],
    rules: {
      'react/jsx-key': 'off' // Stories don't need keys
    }
  }
]
```

### Adding a New Preset to Shared Config

**Step 1:** Create the preset file

```javascript
// packages/shared/eslint-config/vue.js
export default function createVueConfig(globs) {
  return [
    {
      name: 'designgreat/vue',
      files: globs,
      plugins: {
        vue: vuePlugin
      },
      rules: {
        // Vue-specific rules
      }
    }
  ]
}
```

**Step 2:** Add to exports

```json
// packages/shared/eslint-config/package.json
{
  "exports": {
    "./vue": "./vue.js" // ← Add this
  },
  "files": ["vue.js"], // ← Add this
  "peerDependencies": {
    "eslint-plugin-vue": "^9.0.0" // ← Add this
  }
}
```

**Step 3:** Sync dependencies

```bash
pnpm sync:eslint-deps
pnpm install
```

**Step 4:** Use in root config

```javascript
// eslint.config.js
import createVueConfig from '@designgreat/eslint-config/vue'

const vueConfig = createVueConfig(['packages/app-vue/**/*.vue'])

export default [
  ...baseConfig,
  ...vueConfig // ← Add this
]
```

### Modifying Shared Rules

**Option A: Override in Root** (Preferred for workspace-specific needs)

```javascript
// eslint.config.js
export default [
  ...baseConfig,
  {
    name: 'workspace/overrides',
    rules: {
      'unicorn/filename-case': 'off' // Disable strict filename rules
    }
  }
]
```

**Option B: Modify Shared Config** (For monorepo-wide changes)

```javascript
// packages/shared/eslint-config/base.js
rules: {
  'unicorn/filename-case': 'off'  // Affects all consumers
}
```

Then publish a new version of `@designgreat/eslint-config`.

### Ignoring Files

```javascript
// eslint.config.js
export default [
  ...baseConfig,

  {
    name: 'workspace/generated-ignore',
    ignores: ['packages/*/dist/**', 'packages/*/.next/**', '**/generated/**']
  }
]
```

---

## Troubleshooting

### Error: "Failed to load plugin 'X'"

**Cause:** Plugin not installed or wrong version

**Fix:**

```bash
# Check if sync is needed
pnpm sync:eslint-deps --dry-run

# Sync dependencies
pnpm sync:eslint-deps

# Clean install
pnpm install
```

### Error: "Cannot find module 'eslint-import-resolver-typescript'"

**Cause:** Missing peer dependency (fixed in recent update!)

**Fix:**

```bash
pnpm sync:eslint-deps
pnpm install
```

### Error: "Parsing error: Cannot read file 'tsconfig.json'"

**Cause:** TypeScript project configuration issue

**Fix:**

```javascript
// eslint.config.js - Update parserOptions
{
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.json', './packages/*/tsconfig.json'],
      tsconfigRootDir: import.meta.dirname
    }
  }
}
```

### Warning: "Peer dependency X@Y.Y.Y is not satisfied"

**Cause:** Version mismatch between shared config and root

**Fix:**

```bash
pnpm sync:eslint-deps  # Automatically fixes version mismatches
```

### Linting is Slow

**Optimization Tips:**

1. **Limit TypeScript project scope:**

```javascript
parserOptions: {
  project: ['./tsconfig.json'],  // Don't include all node_modules
  tsconfigRootDir: import.meta.dirname
}
```

2. **Use ignore patterns:**

```javascript
ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**']
```

3. **Cache results:**

```bash
pnpm exec eslint . --cache --cache-location .eslintcache
```

### Rules Conflict Between Presets

**Cause:** Multiple presets defining the same rule

**Fix:** Use explicit override with clear name

```javascript
export default [
  ...baseConfig,
  ...reactConfig,

  // Explicit override - last one wins
  {
    name: 'workspace/final-overrides',
    rules: {
      'import/order': [
        'error',
        {
          /* your preference */
        }
      ]
    }
  }
]
```

---

## Maintenance Checklist

### Adding a New ESLint Plugin

```
□ Add plugin to @designgreat/eslint-config peerDependencies
□ Add plugin to appropriate preset file (base/react/node/markdown)
□ Run: pnpm sync:eslint-deps
□ Run: pnpm install
□ Test: pnpm lint
□ Update this documentation if needed
□ Commit with message: "feat(eslint): add [plugin-name] plugin"
```

### Updating ESLint Version

```
□ Check breaking changes in ESLint release notes
□ Update eslint version in @designgreat/eslint-config peerDependencies
□ Run: pnpm sync:eslint-deps
□ Run: pnpm install
□ Test: pnpm lint (check for new errors)
□ Fix any breaking changes in configs
□ Update flat config patterns if needed
□ Commit with message: "chore(eslint): upgrade to vX.Y.Z"
```

### Regular Maintenance

**Monthly:**

- Review and update plugin versions for security patches
- Check for new recommended rules in updated plugins
- Run `pnpm sync:eslint-deps` to catch any drift

**Quarterly:**

- Review custom rules for continued relevance
- Audit ignored files/patterns
- Consider adopting new ESLint/plugin features

---

## Best Practices

### 1. Keep Shared Config Minimal

**Do:**

- ✅ Enforce critical errors (syntax, bugs, security)
- ✅ Maintain consistent style (imports, formatting)

**Don't:**

- ❌ Enforce opinionated style preferences
- ❌ Add rules that frequently need overrides

### 2. Use Semantic Names

```javascript
// ✅ Good
{
  name: 'workspace/test-files',
  files: ['**/*.test.ts']
}

// ❌ Bad
{
  name: 'config-1',
  files: ['**/*.test.ts']
}
```

### 3. Document Overrides

```javascript
{
  name: 'workspace/legacy-code',
  files: ['packages/legacy/**'],
  rules: {
    // Temporarily disabled while refactoring
    // TODO: Enable after migration - Issue #123
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
```

### 4. Test Changes Incrementally

```bash
# Test specific package first
pnpm --filter @designgreat/lib-web-component lint

# Then test all
pnpm lint
```

---

## Related Files

- [`packages/shared/eslint-config/`](../packages/shared/eslint-config/) - Shared config package
- [`eslint.config.js`](../eslint.config.js) - Root configuration
- [`workspace-globs.js`](../workspace-globs.js) - File patterns
- [`scripts/sync-eslint-deps.ts`](../scripts/sync-eslint-deps.ts) - Dependency sync script

---

## References

- [ESLint Flat Config Documentation](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)
- [eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript)
- [XO Code Style](https://github.com/xojs/xo)
