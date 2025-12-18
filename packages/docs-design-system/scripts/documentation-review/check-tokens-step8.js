#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-argument, logical-assignment-operators */

/**
 * Step 8: Check for Undefined CSS Variables in Demo CSS
 *
 * Checks every demo section to find CSS variables that are not defined in the generated CSS.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths
const workspaceRoot = path.resolve(__dirname, '../../../..')
const docsRoot = path.resolve(workspaceRoot, 'packages/docs-design-system/docs-design-token')
const cssPath = path.resolve(workspaceRoot, 'packages/lib-design-token/dist/css/light/variables.css')

// Categories to check
const categories = ['colors', 'spacing', 'typography', 'effects', 'motion']

// Load CSS variables from generated CSS
function loadCSSVariables() {
  if (!fs.existsSync(cssPath)) {
    console.error(`❌ CSS file not found: ${cssPath}`)
    console.error('   Run: pnpm --filter @designgreat/lib-design-token run build')
    process.exit(1)
  }

  const cssContent = fs.readFileSync(cssPath, 'utf8')
  const cssVars = new Set()

  // Extract all CSS variable definitions
  const varPattern = /--dg-[^:]+/g
  let match
  while ((match = varPattern.exec(cssContent)) !== null) {
    cssVars.add(match[0])
  }

  return cssVars
}

// Extract demo sections from MDX content
function extractDemoSections(content) {
  const demos = []

  // Pattern 1: Tabs with demo TabItem
  const tabsPattern = /<Tabs[^>]*>[\s\S]*?<TabItem[^>]*value=["']demo["'][^>]*>([\s\S]*?)<\/TabItem>/gi
  let match
  while ((match = tabsPattern.exec(content)) !== null) {
    demos.push({
      type: 'tabs-demo',
      content: match[1],
      position: match.index
    })
  }

  // Pattern 2: Code TabItems (CSS code in demos)
  const codeTabPattern = /<TabItem[^>]*value=["']code["'][^>]*>[\s\S]*?```css\s*([\s\S]*?)```[\s\S]*?<\/TabItem>/gi
  while ((match = codeTabPattern.exec(content)) !== null) {
    // Only include if it's part of a demo Tabs section
    const beforeMatch = content.substring(Math.max(0, match.index - 500), match.index)
    if (beforeMatch.includes('value="demo"') || beforeMatch.includes("value='demo'")) {
      demos.push({
        type: 'css-code-demo',
        content: match[1],
        position: match.index
      })
    }
  }

  return demos
}

// Extract CSS variables from demo content
function extractCSSVarsFromDemo(demoContent) {
  const cssVars = new Set()

  // Match var(--dg-xxx) patterns
  const varPattern = /var\((--dg-[^)]+)\)/gi
  let match
  while ((match = varPattern.exec(demoContent)) !== null) {
    cssVars.add(match[1])
  }

  return cssVars
}

// Process a single MDX file
function processFile(filePath, allCSSVars) {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(docsRoot, filePath)

  const demos = extractDemoSections(content)
  const issues = []

  demos.forEach(demo => {
    const demoCSSVars = extractCSSVarsFromDemo(demo.content)

    demoCSSVars.forEach(cssVar => {
      if (!allCSSVars.has(cssVar)) {
        issues.push({
          type: 'undefined_css_var',
          cssVar,
          demoType: demo.type,
          position: demo.position
        })
      }
    })
  })

  return { file: relativePath, demos: demos.length, issues }
}

// Main function
function main() {
  console.log('='.repeat(80))
  console.log('STEP 8: Check for Undefined CSS Variables in Demo CSS')
  console.log('='.repeat(80))
  console.log()

  const allCSSVars = loadCSSVariables()
  console.log(`✅ Loaded ${allCSSVars.size} CSS variables from ${path.relative(process.cwd(), cssPath)}`)
  console.log()

  const allIssues = []
  const fileResults = []

  // Process each category
  categories.forEach(category => {
    const categoryPath = path.join(docsRoot, category)
    if (!fs.existsSync(categoryPath)) {
      console.log(`⚠️  Category not found: ${category}`)
      return
    }

    // Find all MDX files recursively
    function findMDXFiles(dir) {
      const files = []
      const entries = fs.readdirSync(dir, { withFileTypes: true })

      entries.forEach(entry => {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          files.push(...findMDXFiles(fullPath))
        } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
          files.push(fullPath)
        }
      })

      return files
    }

    const mdxFiles = findMDXFiles(categoryPath)

    console.log(`\n📁 ${category.toUpperCase()} (${mdxFiles.length} files)`)
    console.log('-'.repeat(80))

    mdxFiles.forEach(filePath => {
      const result = processFile(filePath, allCSSVars)
      fileResults.push(result)

      if (result.issues.length > 0) {
        console.log(`\n❌ ${result.file} (${result.demos} demos)`)
        const uniqueVars = [...new Set(result.issues.map(i => i.cssVar))]
        uniqueVars.forEach(cssVar => {
          console.log(`   - Undefined: ${cssVar}`)
          allIssues.push({
            cssVar,
            file: result.file
          })
        })
      } else {
        console.log(`✅ ${result.file} (${result.demos} demos)`)
      }
    })
  })

  // Summary
  console.log('\n' + '='.repeat(80))
  console.log('SUMMARY')
  console.log('='.repeat(80))
  console.log(`Total files checked: ${fileResults.length}`)
  console.log(`Total demos found: ${fileResults.reduce((sum, r) => sum + r.demos, 0)}`)
  console.log(`Total undefined CSS variables: ${allIssues.length}`)

  if (allIssues.length > 0) {
    console.log('\n❌ ISSUES FOUND:')
    console.log('-'.repeat(80))

    const byFile = {}
    allIssues.forEach(issue => {
      if (!byFile[issue.file]) {
        byFile[issue.file] = new Set()
      }

      byFile[issue.file].add(issue.cssVar)
    })

    Object.entries(byFile).forEach(([file, cssVars]) => {
      console.log(`\n${file} (${cssVars.size} undefined variables):`)
      cssVars.forEach(cssVar => {
        console.log(`  - ${cssVar}`)
      })
    })

    process.exit(1)
  } else {
    console.log('\n✅ No undefined CSS variables found! All CSS variables used in demos are defined.')
    process.exit(0)
  }
}

main()

