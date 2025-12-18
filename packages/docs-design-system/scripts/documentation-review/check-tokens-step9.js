#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-argument, logical-assignment-operators */

/**
 * Step 9: Check for CSS Variables from px Scales (Unless Doc is About px Scales)
 *
 * Checks every demo section to find CSS variables from px scales (e.g., --dg-spacing-px4)
 * that should be replaced with semantic scales (e.g., --dg-spacing-space-xs).
 *
 * Exception: Documents about pixel values are allowed to use px scale variables.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths
const workspaceRoot = path.resolve(__dirname, '../../../..')
const docsRoot = path.resolve(workspaceRoot, 'packages/docs-design-system/docs-design-token')

// Categories to check
const categories = ['colors', 'spacing', 'typography', 'effects', 'motion']

// Files that are about pixel values (allowed to use px scales)
const PX_SCALE_DOCS = [
  'spacing/pixel-values.mdx'
]

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

// Extract CSS variables from px scales
function extractPxScaleCSSVars(demoContent) {
  const pxVars = new Set()

  // Match var(--dg-spacing-pxX) or var(--dg-size-pxX) patterns
  const pxPattern = /var\((--dg-(spacing|size)-px\d+)\)/gi
  let match
  while ((match = pxPattern.exec(demoContent)) !== null) {
    pxVars.add(match[1])
  }

  return pxVars
}

// Process a single MDX file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(docsRoot, filePath)

  // Check if this is a px scale doc (allowed to use px variables)
  const isPxScaleDoc = PX_SCALE_DOCS.includes(relativePath)

  const demos = extractDemoSections(content)
  const issues = []

  demos.forEach(demo => {
    const pxVars = extractPxScaleCSSVars(demo.content)

    if (!isPxScaleDoc && pxVars.size > 0) {
      pxVars.forEach(pxVar => {
        issues.push({
          type: 'px_scale_var_used',
          cssVar: pxVar,
          demoType: demo.type,
          position: demo.position,
          note: 'Should use semantic scale instead (e.g., --dg-spacing-space-xs instead of --dg-spacing-px4)'
        })
      })
    }
  })

  return { file: relativePath, demos: demos.length, issues, isPxScaleDoc }
}

// Main function
function main() {
  console.log('='.repeat(80))
  console.log('STEP 9: Check for CSS Variables from px Scales')
  console.log('='.repeat(80))
  console.log()
  console.log('Note: Documents about pixel values are allowed to use px scale variables.')
  console.log(`Allowed docs: ${PX_SCALE_DOCS.join(', ')}`)
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
      const result = processFile(filePath)
      fileResults.push(result)

      if (result.issues.length > 0) {
        console.log(`\n❌ ${result.file} (${result.demos} demos)`)
        const uniqueVars = [...new Set(result.issues.map(i => i.cssVar))]
        uniqueVars.forEach(cssVar => {
          console.log(`   - px scale var: ${cssVar}`)
          console.log(`     ${result.issues[0].note}`)
          allIssues.push({
            cssVar,
            file: result.file
          })
        })
      } else {
        const note = result.isPxScaleDoc ? ' (px scale doc - allowed)' : ''
        console.log(`✅ ${result.file} (${result.demos} demos)${note}`)
      }
    })
  })

  // Summary
  console.log('\n' + '='.repeat(80))
  console.log('SUMMARY')
  console.log('='.repeat(80))
  console.log(`Total files checked: ${fileResults.length}`)
  console.log(`Total demos found: ${fileResults.reduce((sum, r) => sum + r.demos, 0)}`)
  console.log(`Total px scale variables found: ${allIssues.length}`)

  if (allIssues.length > 0) {
    console.log('\n❌ ISSUES FOUND:')
    console.log('-'.repeat(80))
    console.log('These files use px scale variables but should use semantic scales:')

    const byFile = {}
    allIssues.forEach(issue => {
      if (!byFile[issue.file]) {
        byFile[issue.file] = new Set()
      }

      byFile[issue.file].add(issue.cssVar)
    })

    Object.entries(byFile).forEach(([file, cssVars]) => {
      console.log(`\n${file} (${cssVars.size} px scale variables):`)
      cssVars.forEach(cssVar => {
        console.log(`  - ${cssVar}`)
      })
    })

    process.exit(1)
  } else {
    console.log('\n✅ No px scale variables found! All demos use semantic scales (or are in px scale docs).')
    process.exit(0)
  }
}

main()

