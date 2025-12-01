#!/bin/bash

# Design Token Refactoring - Comprehensive Test Script
# This script performs all verification checks for the refactoring

set -e  # Exit on error

echo "🧪 Design Token Refactoring - Comprehensive Test Suite"
echo "======================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counters
TESTS_PASSED=0
TESTS_FAILED=0
WARNINGS=0

# Helper functions
pass() {
  echo -e "${GREEN}✓${NC} $1"
  ((TESTS_PASSED++)) || true
}

fail() {
  echo -e "${RED}✗${NC} $1"
  ((TESTS_FAILED++)) || true
}

warn() {
  echo -e "${YELLOW}⚠${NC} $1"
  ((WARNINGS++)) || true
}

section() {
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  $1"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

# ============================================================================
# PHASE 0: Build All Packages (ensures fresh artifacts)
# ============================================================================

section "Phase 0: Building Packages"

echo -e "${BLUE}Building lib-design-token...${NC}"
cd packages/lib-design-token
if pnpm run build > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} lib-design-token built"
else
  echo -e "${RED}✗ lib-design-token build failed - cannot continue${NC}"
  exit 1
fi
cd ../..

echo -e "${BLUE}Building lib-web-ui...${NC}"
cd packages/lib-web-ui
if pnpm run build > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} lib-web-ui built"
else
  echo -e "${RED}✗ lib-web-ui build failed - cannot continue${NC}"
  exit 1
fi
cd ../..

echo -e "${BLUE}Building docs-design-system...${NC}"
cd packages/docs-design-system
if pnpm run build > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} docs-design-system built"
else
  echo -e "${RED}✗ docs-design-system build failed - cannot continue${NC}"
  exit 1
fi
cd ../..

echo ""
echo -e "${GREEN}All packages built successfully. Running tests...${NC}"

# ============================================================================
# PHASE 1: File Existence Checks
# ============================================================================

section "Phase 1: File Existence"

# Check lib-design-token outputs
if [ -f "packages/lib-design-token/dist/css/light/variables.css" ]; then
  pass "Light theme CSS exists"
else
  fail "Light theme CSS missing"
fi

if [ -f "packages/lib-design-token/dist/css/dark/variables.css" ]; then
  pass "Dark theme CSS exists"
else
  fail "Dark theme CSS missing"
fi

if [ -f "packages/lib-design-token/dist/css/combined.css" ]; then
  pass "Combined CSS exists"
else
  fail "Combined CSS missing"
fi

if [ -f "packages/lib-design-token/dist/css/light/variables.scss" ]; then
  pass "Light theme SCSS exists"
else
  fail "Light theme SCSS missing"
fi

if [ -f "packages/lib-design-token/dist/css/dark/variables.scss" ]; then
  pass "Dark theme SCSS exists"
else
  fail "Dark theme SCSS missing"
fi

# Check source themes.ts (generated before compilation)
if [ -f "packages/lib-design-token/src/generated/themes.ts" ]; then
  pass "Source themes.ts exists"
else
  fail "Source themes.ts missing"
fi

# Check compiled themes.js
if [ -f "packages/lib-design-token/dist/generated/themes.js" ]; then
  pass "Compiled themes.js exists"
else
  fail "Compiled themes.js missing"
fi

# Check lib-web-ui outputs
if [ -f "packages/lib-web-ui/src/styles/index.css" ]; then
  pass "lib-web-ui CSS entry point exists"
else
  fail "lib-web-ui CSS entry point missing"
fi

# Check old files are removed
if [ ! -f "packages/lib-web-ui/src/styles/designgreat-theme.css" ]; then
  pass "Old generated theme file removed"
else
  fail "Old generated theme file still exists (should be removed)"
fi

if [ ! -f "packages/lib-web-ui/scripts/generate-theme-css.ts" ]; then
  pass "Old generation script removed"
else
  fail "Old generation script still exists (should be removed)"
fi

# ============================================================================
# PHASE 2: CSS Variable Prefix Checks
# ============================================================================

section "Phase 2: CSS Variable Naming"

# Check light theme CSS
if grep -q "^:root" packages/lib-design-token/dist/css/light/variables.css 2>/dev/null; then
  pass "Light theme uses :root selector"
else
  fail "Light theme doesn't use :root selector"
fi

if grep -q -- "--dg-color-" packages/lib-design-token/dist/css/light/variables.css 2>/dev/null; then
  pass "Light theme CSS uses --dg- prefix"
else
  fail "Light theme CSS doesn't use --dg- prefix"
fi

if grep -q -- "--token-" packages/lib-design-token/dist/css/light/variables.css 2>/dev/null; then
  fail "Light theme CSS still contains --token- prefix"
else
  pass "Light theme CSS has no --token- prefix"
fi

# Check dark theme CSS
if grep -q "^\.dg-theme-dark" packages/lib-design-token/dist/css/dark/variables.css 2>/dev/null; then
  pass "Dark theme uses .dg-theme-dark selector"
else
  fail "Dark theme doesn't use .dg-theme-dark selector"
fi

if grep -q -- "--dg-color-" packages/lib-design-token/dist/css/dark/variables.css 2>/dev/null; then
  pass "Dark theme CSS uses --dg- prefix"
else
  fail "Dark theme CSS doesn't use --dg- prefix"
fi

# Check combined CSS has both themes
if grep -q "^:root" packages/lib-design-token/dist/css/combined.css 2>/dev/null && \
   grep -q "^\.dg-theme-dark" packages/lib-design-token/dist/css/combined.css 2>/dev/null; then
  pass "Combined CSS contains both :root and .dg-theme-dark"
else
  fail "Combined CSS missing theme selectors"
fi

# Check SCSS
if grep -q -- "\$dg-color-" packages/lib-design-token/dist/css/light/variables.scss 2>/dev/null; then
  pass "SCSS uses \$dg- prefix"
else
  fail "SCSS doesn't use \$dg- prefix"
fi

if grep -q -- "\$token-" packages/lib-design-token/dist/css/light/variables.scss 2>/dev/null; then
  fail "SCSS still contains \$token- prefix"
else
  pass "SCSS has no \$token- prefix"
fi

# ============================================================================
# PHASE 3: TypeScript/JavaScript Export Structure
# ============================================================================

section "Phase 3: TypeScript Export Structure"

# Check source file for proper export syntax
if grep -q 'export const light' packages/lib-design-token/src/generated/themes.ts 2>/dev/null; then
  pass "Source exports 'light' theme"
else
  fail "Source missing 'light' export"
fi

if grep -q 'export const dark' packages/lib-design-token/src/generated/themes.ts 2>/dev/null; then
  pass "Source exports 'dark' theme"
else
  fail "Source missing 'dark' export"
fi

if grep -q 'export const themes' packages/lib-design-token/src/generated/themes.ts 2>/dev/null; then
  pass "Source exports 'themes' object"
else
  fail "Source missing 'themes' export"
fi

# Check for dg namespace structure in source
if grep -q '"dg":' packages/lib-design-token/src/generated/themes.ts 2>/dev/null || \
   grep -q 'dg:' packages/lib-design-token/src/generated/themes.ts 2>/dev/null; then
  pass "Source uses 'dg' namespace structure"
else
  fail "Source missing 'dg' namespace structure"
fi

# Check compiled output
if grep -q "dg" packages/lib-design-token/dist/generated/themes.js 2>/dev/null; then
  pass "Compiled JS contains 'dg' namespace"
else
  fail "Compiled JS missing 'dg' namespace"
fi

# Check theme-utils.ts exists and exports
if [ -f "packages/lib-design-token/src/theme-utils.ts" ]; then
  pass "theme-utils.ts exists"
else
  fail "theme-utils.ts missing"
fi

# Check theme utilities are exported from index.ts
if grep -q "getThemeClassName" packages/lib-design-token/src/index.ts 2>/dev/null; then
  pass "index.ts exports getThemeClassName"
else
  fail "index.ts missing getThemeClassName export"
fi

if grep -q "applyTheme" packages/lib-design-token/src/index.ts 2>/dev/null; then
  pass "index.ts exports applyTheme"
else
  fail "index.ts missing applyTheme export"
fi

if grep -q "THEME_CLASSES" packages/lib-design-token/src/index.ts 2>/dev/null; then
  pass "index.ts exports THEME_CLASSES"
else
  fail "index.ts missing THEME_CLASSES export"
fi

if grep -q "isThemeApplied" packages/lib-design-token/src/index.ts 2>/dev/null; then
  pass "index.ts exports isThemeApplied"
else
  fail "index.ts missing isThemeApplied export"
fi

# Check compiled theme-utils exists
if [ -f "packages/lib-design-token/dist/theme-utils.js" ]; then
  pass "Compiled theme-utils.js exists"
else
  fail "Compiled theme-utils.js missing"
fi

# ============================================================================
# PHASE 4: Package Configuration
# ============================================================================

section "Phase 4: Package Configuration"

# Check lib-design-token package.json exports
if grep -q '"./css": "./dist/css/combined.css"' packages/lib-design-token/package.json 2>/dev/null; then
  pass "lib-design-token exports combined CSS at ./css"
else
  fail "lib-design-token doesn't export combined CSS"
fi

if grep -q '"./css/light": "./dist/css/light/variables.css"' packages/lib-design-token/package.json 2>/dev/null; then
  pass "lib-design-token exports light CSS"
else
  fail "lib-design-token doesn't export light CSS"
fi

if grep -q '"./css/dark": "./dist/css/dark/variables.css"' packages/lib-design-token/package.json 2>/dev/null; then
  pass "lib-design-token exports dark CSS"
else
  fail "lib-design-token doesn't export dark CSS"
fi

if grep -q '"./scss/light": "./dist/css/light/variables.scss"' packages/lib-design-token/package.json 2>/dev/null; then
  pass "lib-design-token exports SCSS"
else
  fail "lib-design-token doesn't export SCSS"
fi

# Check lib-web-ui package.json
if ! grep -q "generate:theme" packages/lib-web-ui/package.json 2>/dev/null; then
  pass "lib-web-ui removed generate:theme script"
else
  fail "lib-web-ui still has generate:theme script"
fi

if ! grep -q "@designgreat/design-token-support" packages/lib-web-ui/package.json 2>/dev/null; then
  pass "lib-web-ui removed design-token-support dependency"
else
  fail "lib-web-ui still depends on design-token-support"
fi

# Check docs-design-system package.json
if ! grep -q "@designgreat/design-token-support" packages/docs-design-system/package.json 2>/dev/null; then
  pass "docs-design-system removed design-token-support dependency"
else
  fail "docs-design-system still depends on design-token-support"
fi

# Check tsconfig.base.json
if ! grep -q "design-token-support" tsconfig.base.json 2>/dev/null; then
  pass "tsconfig.base.json removed design-token-support path"
else
  fail "tsconfig.base.json still has design-token-support path"
fi

# Check design-token-support package is deleted
if [ ! -d "packages/shared/design-token-support" ]; then
  pass "design-token-support package deleted"
else
  fail "design-token-support package still exists (should be deleted)"
fi

# ============================================================================
# PHASE 5: Code Quality Checks
# ============================================================================

section "Phase 5: Code Quality"

# Check lib-web-ui imports design tokens correctly
if grep -q "@designgreat/lib-design-token/css" packages/lib-web-ui/src/styles/index.css 2>/dev/null; then
  pass "lib-web-ui imports design tokens CSS"
else
  fail "lib-web-ui doesn't import design tokens CSS"
fi

# Check Storybook preview imports (either directly or via index.css)
if grep -q "@designgreat/lib-design-token/css" packages/lib-web-ui/.storybook/preview.tsx 2>/dev/null || \
   grep -q "src/styles/index.css" packages/lib-web-ui/.storybook/preview.tsx 2>/dev/null; then
  pass "Storybook preview imports design tokens CSS (directly or via index.css)"
else
  fail "Storybook preview doesn't import design tokens CSS"
fi

if grep -q "@designgreat/lib-design-token/font" packages/lib-web-ui/.storybook/preview.tsx 2>/dev/null; then
  pass "Storybook preview imports fonts"
else
  fail "Storybook preview doesn't import fonts"
fi

# Check Storybook uses theme utilities from design token package
if grep -q "getThemeClassName" packages/lib-web-ui/.storybook/preview.tsx 2>/dev/null; then
  pass "Storybook uses getThemeClassName from design token package"
else
  fail "Storybook doesn't use getThemeClassName"
fi

if grep -q "applyTheme" packages/lib-web-ui/.storybook/preview.tsx 2>/dev/null; then
  pass "Storybook uses applyTheme from design token package"
else
  fail "Storybook doesn't use applyTheme"
fi

# Check CodeDemoToggle uses theme utilities
if grep -q "isThemeApplied" packages/lib-web-ui/src/storybook/CodeDemoToggle.tsx 2>/dev/null; then
  pass "CodeDemoToggle uses isThemeApplied from design token package"
else
  fail "CodeDemoToggle doesn't use isThemeApplied"
fi

# Check tailwind.config.ts uses THEME_CLASSES constant
if grep -q "THEME_CLASSES" packages/lib-web-ui/tailwind.config.ts 2>/dev/null; then
  pass "Tailwind config uses THEME_CLASSES constant"
else
  fail "Tailwind config doesn't use THEME_CLASSES constant"
fi

# Check tailwind.config.ts uses dg namespace for tokens
if grep -q "light.dg" packages/lib-web-ui/tailwind.config.ts 2>/dev/null; then
  pass "Tailwind config accesses tokens via dg namespace"
else
  fail "Tailwind config doesn't use dg namespace"
fi

# Check docs-design-system uses theme utilities from design token package
if grep -q "getThemeClassName as getTokenThemeClassName" packages/docs-design-system/src/theme/constants.ts 2>/dev/null || \
   grep -q "from '@designgreat/lib-design-token'" packages/docs-design-system/src/theme/constants.ts 2>/dev/null; then
  pass "docs-design-system imports theme utils from design token package"
else
  fail "docs-design-system doesn't import theme utils from design token package"
fi

# ============================================================================
# PHASE 6: Documentation Check
# ============================================================================

section "Phase 6: Documentation"

# Check CSS integration guide
if ! grep -q -- "--token-" packages/docs-design-system/docs/tutorial/css-integration.mdx 2>/dev/null; then
  pass "CSS integration guide uses --dg- prefix (no --token-)"
else
  fail "CSS integration guide still references --token-"
fi

if grep -q ".dg-theme-dark" packages/docs-design-system/docs/tutorial/css-integration.mdx 2>/dev/null; then
  pass "CSS integration guide mentions .dg-theme-dark class"
else
  fail "CSS integration guide doesn't mention .dg-theme-dark class"
fi

if grep -q "light.dg.color" packages/docs-design-system/docs/tutorial/css-integration.mdx 2>/dev/null; then
  pass "CSS integration guide shows namespace structure"
else
  fail "CSS integration guide doesn't show namespace structure"
fi

# Check font-integration guide
if [ -f "packages/docs-design-system/docs/tutorial/font-integration.mdx" ]; then
  pass "Font integration guide exists"
else
  fail "Font integration guide missing"
fi

if grep -q "Architecture Details" packages/docs-design-system/docs/tutorial/font-integration.mdx 2>/dev/null; then
  pass "Font integration links to architecture docs"
else
  warn "Font integration doesn't link to architecture docs"
fi

# Check theme-switching guide
if ! grep -q "design-token-support" packages/docs-design-system/docs/tutorial/theme-switching.mdx 2>/dev/null; then
  pass "Theme switching guide has no design-token-support refs"
else
  fail "Theme switching guide still references design-token-support"
fi

# Check theme-switching guide documents theme utilities
if grep -q "getThemeClassName" packages/docs-design-system/docs/tutorial/theme-switching.mdx 2>/dev/null; then
  pass "Theme switching guide documents getThemeClassName"
else
  fail "Theme switching guide missing getThemeClassName documentation"
fi

if grep -q "applyTheme" packages/docs-design-system/docs/tutorial/theme-switching.mdx 2>/dev/null; then
  pass "Theme switching guide documents applyTheme"
else
  fail "Theme switching guide missing applyTheme documentation"
fi

# Check runtime-apis guide documents theme utilities
if grep -q "getThemeClassName" packages/docs-design-system/docs/tutorial/api/runtime-apis.mdx 2>/dev/null; then
  pass "Runtime APIs guide documents getThemeClassName"
else
  fail "Runtime APIs guide missing getThemeClassName documentation"
fi

if grep -q "THEME_CLASSES" packages/docs-design-system/docs/tutorial/api/runtime-apis.mdx 2>/dev/null; then
  pass "Runtime APIs guide documents THEME_CLASSES"
else
  fail "Runtime APIs guide missing THEME_CLASSES documentation"
fi

# Check contributing docs exist
if [ -f "packages/docs-design-system/docs-contributing/design-tokens-development/font-assets.mdx" ]; then
  pass "Font assets contributing doc exists"
else
  fail "Font assets contributing doc missing"
fi

if [ -f "packages/docs-design-system/docs-contributing/component-library-development/font-handling.mdx" ]; then
  pass "Font handling contributing doc exists"
else
  fail "Font handling contributing doc missing"
fi

# Check for design-token-support in docs (excluding CHANGELOG)
DOCS_WITH_OLD_REFS=$(grep -rl "design-token-support" packages/docs-design-system --include="*.mdx" 2>/dev/null | grep -v CHANGELOG || true)
if [ -z "$DOCS_WITH_OLD_REFS" ]; then
  pass "No docs reference design-token-support (excluding CHANGELOG)"
else
  fail "Some docs still reference design-token-support: $DOCS_WITH_OLD_REFS"
fi

# Check for design-token-support in GitHub workflows
WORKFLOWS_WITH_OLD_REFS=$(grep -l "design-token-support" .github/workflows/*.yml 2>/dev/null || true)
if [ -z "$WORKFLOWS_WITH_OLD_REFS" ]; then
  pass "No GitHub workflows reference design-token-support"
else
  fail "Some workflows still reference design-token-support: $WORKFLOWS_WITH_OLD_REFS"
fi

# Check for design-token-support in GitHub workflow docs
WORKFLOW_DOCS_WITH_OLD_REFS=$(grep -l "design-token-support" .github/workflows/*.md 2>/dev/null || true)
if [ -z "$WORKFLOW_DOCS_WITH_OLD_REFS" ]; then
  pass "No GitHub workflow docs reference design-token-support"
else
  fail "Some workflow docs still reference design-token-support: $WORKFLOW_DOCS_WITH_OLD_REFS"
fi

# Check docs/ARCHITECTURE.md doesn't reference design-token-support
if ! grep -q "design-token-support" docs/ARCHITECTURE.md 2>/dev/null; then
  pass "docs/ARCHITECTURE.md doesn't reference design-token-support"
else
  fail "docs/ARCHITECTURE.md still references design-token-support"
fi

# ============================================================================
# PHASE 7: Quality Checks (lint, typecheck, validate, test)
# ============================================================================

section "Phase 7: Quality Checks"

echo -e "${BLUE}Running lib-design-token quality checks...${NC}"
cd packages/lib-design-token
if pnpm run lint > /dev/null 2>&1; then
  pass "lib-design-token lint"
else
  fail "lib-design-token lint failed"
fi
if pnpm run typecheck > /dev/null 2>&1; then
  pass "lib-design-token typecheck"
else
  fail "lib-design-token typecheck failed"
fi
if pnpm run validate > /dev/null 2>&1; then
  pass "lib-design-token validate"
else
  fail "lib-design-token validate failed"
fi
if pnpm run test > /dev/null 2>&1; then
  pass "lib-design-token test"
else
  fail "lib-design-token test failed"
fi
cd ../..

echo -e "${BLUE}Running lib-web-ui quality checks...${NC}"
cd packages/lib-web-ui
if pnpm run lint > /dev/null 2>&1; then
  pass "lib-web-ui lint"
else
  fail "lib-web-ui lint failed"
fi
if pnpm run typecheck > /dev/null 2>&1; then
  pass "lib-web-ui typecheck"
else
  fail "lib-web-ui typecheck failed"
fi
if pnpm run test > /dev/null 2>&1; then
  pass "lib-web-ui test"
else
  fail "lib-web-ui test failed"
fi
cd ../..

echo -e "${BLUE}Running docs-design-system quality checks...${NC}"
cd packages/docs-design-system
if pnpm run lint > /dev/null 2>&1; then
  pass "docs-design-system lint"
else
  fail "docs-design-system lint failed"
fi
if pnpm run typecheck > /dev/null 2>&1; then
  pass "docs-design-system typecheck"
else
  fail "docs-design-system typecheck failed"
fi
cd ../..

# ============================================================================
# SUMMARY
# ============================================================================

section "Test Summary"

TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))
PASS_RATE=0

if [ $TOTAL_TESTS -gt 0 ]; then
  PASS_RATE=$((TESTS_PASSED * 100 / TOTAL_TESTS))
fi

echo ""
echo "Total Tests Run: $TOTAL_TESTS"
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Failed: $TESTS_FAILED${NC}"
echo -e "${YELLOW}Warnings: $WARNINGS${NC}"
echo "Pass Rate: $PASS_RATE%"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All tests passed!${NC}"
  echo ""
  echo "Next steps:"
  echo "1. Run visual tests: cd packages/docs-design-system && pnpm start"
  echo "2. Test theme switching manually"
  echo "3. Run Storybook: cd packages/lib-web-ui && pnpm storybook"
  exit 0
else
  echo -e "${RED}✗ Some tests failed. Please review the output above.${NC}"
  exit 1
fi
