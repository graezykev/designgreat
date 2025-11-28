# design-token-support Deprecation Audit

## 🔍 Comprehensive Review Results

Found **27 files** with references to `@designgreat/design-token-support`. Here's the breakdown:

---

## ✅ Safe to Keep (Documentation/Historical)

These files are **documentation only** and don't need changes:

1. ✅ `docs/REFACTOR_PLAN.md` - Planning document
2. ✅ `docs/REFACTOR_PLAN_REVISED.md` - Planning document
3. ✅ `docs/REFACTOR_SUMMARY.md` - Planning document
4. ✅ `docs/IMPLEMENTATION_COMPLETE.md` - Implementation guide
5. ✅ `test-refactor.sh` - Test script (checks for absence)
6. ✅ `docs/ARCHITECTURE.md` - Architecture documentation
7. ✅ `packages/shared/design-token-support/package.json` - The package itself
8. ✅ `packages/shared/design-token-support/CHANGELOG.md` - Package changelog
9. ✅ `packages/lib-web-ui/CHANGELOG.md` - Historical reference
10. ✅ `packages/docs-design-system/CHANGELOG.md` - Historical reference
11. ✅ `pnpm-lock.yaml` - Will update when we reinstall
12. ✅ `packages/lib-web-ui-design-token/scripts/style-dictionary/prebuild-download-fonts.js` -
    Comment only

---

## 🚨 MUST FIX - Code/Configuration

### 1. **packages/docs-design-system/package.json**

**Issue:** Still has dependency

```json
"@designgreat/design-token-support": "workspace:*"
```

**Action:** REMOVE (docs site uses it in theme sync) **Wait:** Need to check if actually used first

### 2. **packages/docs-design-system/src/theme/constants.ts**

**Issue:** Active import and usage

```typescript
import { getThemeClassName, type ThemeName } from '@designgreat/design-token-support'
```

**Action:** MUST FIX - Replace with hardcoded values

### 3. **packages/lib-web-ui/vite.config.ts**

**Issue:** Listed as external dependency

```typescript
external: ['@designgreat/design-token-support', ...]
```

**Action:** REMOVE from externals array

### 4. **packages/lib-web-ui/jest.config.ts**

**Issue:** Module name mapper

```typescript
'^@designgreat/design-token-support$': '<rootDir>/../shared/design-token-support/src'
```

**Action:** REMOVE from moduleNameMapper

### 5. **tsconfig.base.json**

**Issue:** Path mapping

```json
"@designgreat/design-token-support": ["packages/shared/design-token-support/src/index.ts"]
```

**Action:** REMOVE from paths

---

## 📚 MUST UPDATE - Documentation

### User-Facing Docs (Critical)

1. **packages/docs-design-system/docs-design-token/guides/theme-switching.mdx**
   - 5 references to `createThemeConfig` and `getThemeClassName`
   - Shows users how to use the package
   - **Action:** Rewrite to show direct CSS import approach

2. **packages/docs-design-system/docs-design-token/guides/tailwind-integration.mdx**
   - 2 references to theme generation utilities
   - **Action:** Update to show new approach without generation

3. **packages/docs-design-system/docs-web-component/guides/theming.mdx**
   - 2 references to `createThemeConfig`
   - **Action:** Update to use direct CSS approach

### Developer Docs (Important)

4. **packages/docs-design-system/docs-design-token/guides/installation.mdx**
   - May have package installation instructions
   - **Action:** Verify and update

5. **packages/docs-design-system/docs-design-token/guides/api/typescript.mdx**
   - May reference types from the package
   - **Action:** Update to reference lib-web-ui-design-token

6. **packages/docs-design-system/docs-design-token/guides/api/runtime-apis.mdx**
   - API documentation
   - **Action:** Update to new API

7. **packages/docs-design-system/docs-web-component/guides/troubleshooting.mdx**
   - Troubleshooting guide
   - **Action:** Update common issues

8. **packages/docs-design-system/docs-contributing/design-tokens-development/\*.mdx**
   - Development workflow docs
   - Testing/validation docs
   - Troubleshooting docs
   - **Action:** Update development guides

---

## 🎯 Priority Action Items

### Priority 1: Fix Code That Breaks Build

1. ✅ **lib-web-ui/src/storybook/CodeDemoToggle.tsx** - FIXED
2. ✅ **lib-web-ui/src/storybook/CodeDemoToggle.test.tsx** - FIXED
3. ⚠️ **docs-design-system/src/theme/constants.ts** - NEEDS FIX
4. ⚠️ **lib-web-ui/vite.config.ts** - NEEDS FIX
5. ⚠️ **lib-web-ui/jest.config.ts** - NEEDS FIX
6. ⚠️ **tsconfig.base.json** - NEEDS FIX

### Priority 2: Remove from package.json

7. ⚠️ **docs-design-system/package.json** - Check usage first, then remove

### Priority 3: Update Documentation

8. ⚠️ **docs/tutorial/theme-switching.mdx** - Major rewrite
9. ⚠️ **docs/tutorial/tailwind-integration.mdx** - Update examples
10. ⚠️ **docs-components/guides/theming.mdx** - Update examples
11. ⚠️ **docs/tutorial/api/\*.mdx** - Update API docs
12. ⚠️ **docs-contributing/\*.mdx** - Update dev guides

---

## 📝 Recommended Approach

### Phase 1: Fix Breaking Code (Do Now)

- Fix docs-design-system theme constants
- Remove from vite.config.ts externals
- Remove from jest.config.ts mapper
- Remove from tsconfig.base.json paths

### Phase 2: Check & Remove Dependency (Do Now)

- Verify docs-design-system doesn't need the package
- Remove from package.json if safe

### Phase 3: Update Documentation (Do Soon)

- Rewrite theme-switching guide
- Update tailwind integration guide
- Update component theming guide
- Update API documentation
- Update contributing guides

### Phase 4: Deprecate Package (Do Later)

- Add deprecation notice to design-token-support README
- Update package.json with deprecation warning
- Point users to direct CSS import approach

---

## 🔧 Quick Fix Commands

```bash
# Check if docs actually uses design-token-support at runtime
grep -r "getThemeClassName\|createThemeConfig" packages/docs-design-system/src/

# If not used, remove from all configs
```

---

**Status:** Audit Complete - Ready for Phase 1 Fixes
