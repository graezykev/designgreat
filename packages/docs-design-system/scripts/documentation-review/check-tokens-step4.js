#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unused-vars, logical-assignment-operators */

/**
 * Step 4: Check for Inline Styles in Demos
 *
 * Checks every demo section to find demos using inline styles instead of CSS classes.
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

// Extract demo sections from MDX content
function extractDemoSections(content) {
  const demos = []

  // Find demo sections - look for <Tabs>, <TabItem value="demo">, or demo divs
  // Also check for className="...demo..." patterns

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

  // Pattern 2: Demo divs with className containing "demo"
  const demoDivPattern = /<div[^>]*className=["'][^"']*demo[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi
  while ((match = demoDivPattern.exec(content)) !== null) {
    demos.push({
      type: 'demo-div',
      content: match[0], // Include the full div tag
      position: match.index
    })
  }

  // Pattern 3: Standalone demo sections (between headings or after tables)
  // This is more complex and might need refinement

  return demos
}

// Check for inline styles in demo content
function checkInlineStyles(demo) {
  const issues = []

  // Check for style={{...}} or style="..." patterns
  // But exclude color-demo blocks which legitimately use inline styles for background colors
  const inlineStylePattern = /style=\{\{([^}]+)\}\}/g
  let match

  while ((match = inlineStylePattern.exec(demo.content)) !== null) {
    const styleContent = match[1]
    const fullMatch = match[0]

    // Skip if this is a color-demo block (they legitimately use inline styles)
    if (demo.content.includes('color-demo') || demo.content.includes('color-demo-text')) {
      continue
    }

    // Skip if this is a spacing-demo block (they legitimately use inline styles for width)
    if (demo.content.includes('spacing-demo')) {
      continue
    }

    // Check if the style contains literal values (non-CSS-variable values)
    // Pattern: property: value where value is NOT var(--dg-xxx)
    // Split by semicolons and check each property-value pair
    const stylePairs = styleContent.split(';').filter(s => s.trim())
    let hasLiteralValues = false
    const problematicPairs = []

    stylePairs.forEach(pair => {
      const match = /^\s*([^:]+):\s*(.+)$/.exec(pair)
      if (match) {
        const property = match[1].trim()
        const value = match[2].trim()

        // Check if value is NOT a CSS variable
        // Allow: var(--dg-xxx), 'var(--dg-xxx)', "var(--dg-xxx)"
        const isCssVar = /^['"]?var\(--dg-[^)]+\)['"]?$/i.test(value)

        if (!isCssVar) {
          hasLiteralValues = true
          problematicPairs.push(`${property}: ${value}`)
        }
      }
    })

    if (hasLiteralValues) {
      issues.push({
        type: 'inline_style',
        styleContent: styleContent.substring(0, 100),
        problematicPairs,
        position: demo.position + match.index
      })
    } else {
      // Even if using tokens, inline styles should be avoided in favor of CSS classes
      // Flag as warning (less critical)
      issues.push({
        type: 'inline_style_warning',
        styleContent: styleContent.substring(0, 100),
        position: demo.position + match.index,
        note: 'Uses CSS variables but still inline style - consider CSS class'
      })
    }
  }

  // Also check for style="..." (string style attribute)
  const stringStylePattern = /style=["']([^"']+)["']/g
  while ((match = stringStylePattern.exec(demo.content)) !== null) {
    const styleContent = match[1]

    // Skip color-demo and spacing-demo blocks
    if (demo.content.includes('color-demo') || demo.content.includes('spacing-demo')) {
      continue
    }

    issues.push({
      type: 'inline_style_string',
      styleContent: styleContent.substring(0, 100),
      position: demo.position + match.index,
      note: 'Uses string style attribute - should use CSS class'
    })
  }

  return issues
}

// Process a single MDX file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(docsRoot, filePath)

  const demos = extractDemoSections(content)
  const issues = []

  demos.forEach(demo => {
    const demoIssues = checkInlineStyles(demo)
    demoIssues.forEach(issue => {
      issues.push({
        ...issue,
        file: relativePath,
        demoType: demo.type
      })
    })
  })

  return { file: relativePath, demos: demos.length, issues }
}

// Main function
function main() {
  console.log('='.repeat(80))
  console.log('STEP 4: Inline Styles in Demos')
  console.log('='.repeat(80))
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
        result.issues.forEach(issue => {
          console.log(`   - ${issue.type}:`)
          if (issue.problematicPart) {
            console.log(`     Problematic: ${issue.problematicPart}`)
          }

          if (issue.note) {
            console.log(`     Note: ${issue.note}`)
          }

          console.log(`     Style: ${issue.styleContent.substring(0, 80)}...`)
          allIssues.push(issue)
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
  console.log(`Total issues found: ${allIssues.length}`)

  if (allIssues.length > 0) {
    console.log('\n❌ ISSUES FOUND:')
    console.log('-'.repeat(80))

    const byType = {}
    allIssues.forEach(issue => {
      if (!byType[issue.type]) {
        byType[issue.type] = []
      }

      byType[issue.type].push(issue)
    })

    Object.entries(byType).forEach(([type, issues]) => {
      console.log(`\n${type} (${issues.length}):`)
      issues.forEach(issue => {
        console.log(`  - ${issue.file}:`)
        if (issue.problematicPart) {
          console.log(`    Problematic: ${issue.problematicPart}`)
        }

        if (issue.note) {
          console.log(`    ${issue.note}`)
        }
      })
    })

    process.exit(1)
  } else {
    console.log('\n✅ No inline style issues found! All demos use CSS classes appropriately.')
    process.exit(0)
  }
}

main()

