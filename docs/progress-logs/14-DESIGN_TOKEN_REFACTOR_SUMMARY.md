# Design Token Refactoring - Executive Summary

## 🎯 Goals

Transform the design token system to use consistent naming and proper theme selectors:

| Aspect                   | Current (Inconsistent) | Target (Unified)    |
| ------------------------ | ---------------------- | ------------------- |
| **CSS Variables**        | `--token-*`            | `--dg-*`            |
| **SCSS Variables**       | `$token-*`             | `$dg-*`             |
| **Light Theme Selector** | `:root`                | `:root` (unchanged) |
| **Dark Theme Selector**  | `:root` ❌             | `.dark` ✅          |

## 📊 Current State

### ✅ Already Using `--dg-` Prefix (Good!)

- ✓ `lib-web-ui` components
- ✓ `docs-design-system` site
- ✓ `design-token-support` package
- ✓ Tailwind configuration

### ❌ Still Using `--token-` Prefix (Needs Fix)

- ✗ `lib-web-ui-design-token` raw CSS output
- ✗ Documentation examples (Option 2 in css-integration.mdx)

### 🔍 Key Finding

**The system has two parallel approaches:**

1. **Old/Direct:** `lib-web-ui-design-token` → CSS files → Direct import
   - Uses `--token-` prefix ❌
   - Both themes use `:root` (conflicts!) ❌
2. **New/Wrapped:** `lib-web-ui-design-token` → `design-token-support` → Generated CSS
   - Uses `--dg-` prefix ✅
   - Proper selectors (`:root`, `.dg-theme-dark`) ✅

**Most of the codebase already uses the new approach!** We just need to update the source
generation.

## 🔨 Changes Required

### 1️⃣ lib-web-ui-design-token (Source)

**File:** `packages/lib-web-ui-design-token/scripts/style-dictionary/config.js`

```diff
css: {
  // ...
- prefix: 'token',
+ prefix: 'dg',
  // ...
}
```

**Add custom format for theme-specific selectors:**

```javascript
StyleDictionary.registerFormat({
  name: 'css/variables-with-selector',
  format({ dictionary, options }) {
    const selector = options.selector || ':root'
    const vars = dictionary.allTokens.map((token) => `  ${token.name}: ${token.value};`).join('\n')
    return `${selector} {\n${vars}\n}\n`
  }
})

// In config:
files: [
  {
    destination: 'variables.css',
    format: 'css/variables-with-selector',
    options: {
      selector: theme === 'dark' ? '.dark' : ':root'
    }
  }
]
```

### 2️⃣ Documentation Updates

**File:** `packages/docs-design-system/docs/tutorial/css-integration.mdx`

```diff
body {
- background: var(--token-color-background-default);
+ background: var(--dg-color-background-default);
- color: var(--token-color-text-default);
+ color: var(--dg-color-text-default);
}
```

### 3️⃣ No Changes Needed

These already work correctly:

- ✓ `lib-web-ui` components
- ✓ `lib-web-ui/tailwind.config.ts`
- ✓ `docs-design-system/src/css/custom.css`
- ✓ All color documentation files

## 📦 Impact Analysis

### Breaking Changes

| User Type                        | Impact      | Action Required                     |
| -------------------------------- | ----------- | ----------------------------------- |
| **Using `design-token-support`** | ✅ None     | No action needed                    |
| **Using `lib-web-ui`**           | ✅ None     | No action needed                    |
| **Direct CSS import**            | ❌ Breaking | Search/replace `--token-` → `--dg-` |

### Risk Level: **LOW** 🟢

- Most code already uses `--dg-` prefix
- Only affects direct CSS import users (minority)
- Easy to migrate (search/replace)

## 🚀 Implementation Steps

1. **Update Style Dictionary config** (1 file, ~30 lines)
2. **Rebuild design tokens** (1 command)
3. **Update documentation** (~3-5 files)
4. **Test** (docs site + Storybook)
5. **Write migration guide** (1 new file)

**Estimated Time:** 4-6 hours

## ✅ Success Criteria

- [ ] `dist/css/light/variables.css` uses `:root` with `--dg-*`
- [ ] `dist/css/dark/variables.css` uses `.dark` with `--dg-*`
- [ ] `dist/css/dark/variables.scss` uses `$dg-*`
- [ ] All docs reference `--dg-*`
- [ ] Docs site works in both themes
- [ ] Storybook works in both themes
- [ ] Migration guide is published

## 📝 Key Files to Modify

### Code Changes

1. `packages/lib-web-ui-design-token/scripts/style-dictionary/config.js` - Main config
2. `packages/docs-design-system/docs/tutorial/css-integration.mdx` - Doc update

### Generated Files (Will Change)

- `packages/lib-web-ui-design-token/dist/css/light/variables.css`
- `packages/lib-web-ui-design-token/dist/css/dark/variables.css`
- `packages/lib-web-ui-design-token/dist/css/dark/variables.scss`

### No Changes Needed

- `packages/lib-web-ui/src/styles/designgreat-theme.css` (already correct)
- `packages/lib-web-ui/tailwind.config.ts` (already correct)
- `packages/docs-design-system/src/css/custom.css` (already correct)

## 🤔 Decisions to Make

### Q1: Dark theme class name?

**Options:**

- A: `.dark` (simple, matches Tailwind)
- B: `.dg-theme-dark` (namespaced, matches current `design-token-support`)

**Recommendation:** `.dark` for simplicity

### Q2: Maintain backward compatibility?

**Options:**

- A: Clean break (recommended)
- B: Support both for 1 version

**Recommendation:** Clean break with migration guide

### Q3: lib-web-ui consumption?

**Options:**

- A: Keep current (generate via `design-token-support`)
- B: Switch to direct CSS import

**Recommendation:** Keep current (more flexible)

## 📚 Documentation Deliverables

1. **REFACTOR_PLAN.md** - Detailed technical plan ✅
2. **REFACTOR_SUMMARY.md** - Executive summary ✅
3. **MIGRATION_GUIDE.md** - User migration guide (to create)
4. **CHANGELOG.md** - Version change notes (to create)

## 🔄 Next Steps

1. Review this plan with team
2. Make decisions on open questions
3. Create feature branch
4. Implement Phase 1 (Style Dictionary changes)
5. Test and iterate
6. Update documentation
7. Merge to main

---

**Full Details:** See [REFACTOR_PLAN.md](./REFACTOR_PLAN.md)
