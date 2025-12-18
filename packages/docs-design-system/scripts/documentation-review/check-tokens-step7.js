#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unused-vars, logical-assignment-operators */

/**
 * Step 7: Check for Literal Values Instead of Design Tokens in Demo CSS
 *
 * Checks every demo section to find CSS using literal values (px, hex colors, etc.)
 * instead of design tokens (CSS variables).
 *
 * Note: Layout dimensions (e.g., 180px, 140px, 80px, 120px) are acceptable as literals.
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

// Acceptable literal layout dimensions (in pixels)
const ACCEPTABLE_LAYOUT_DIMENSIONS = ['180px', '140px', '80px', '120px', '200px', '100px', '160px', '240px', '320px']

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
    // Only include if it's part of a demo Tabs section (has demo TabItem before it)
    const beforeMatch = content.substring(Math.max(0, match.index - 500), match.index)
    if (beforeMatch.includes('value="demo"') || beforeMatch.includes("value='demo'")) {
      demos.push({
        type: 'css-code-demo',
        content: match[1],
        position: match.index
      })
    }
  }

  // Pattern 2: Code sections (CSS code) - but only from demo TabItems, not examples
  // We'll check CSS in demo TabItems separately
  // Skip standalone CSS code blocks as they're likely examples/documentation

  return demos
}

// Check for literal values in CSS
function checkLiteralValues(demo, filePath) {
  const issues = []
  const { content } = demo

  // Skip if this is a color-demo or spacing-demo block (they legitimately use inline styles)
  if (content.includes('color-demo') || content.includes('spacing-demo')) {
    return issues
  }

  // Skip CSS code blocks that are examples/documentation (containing comments with hex values)
  // These are showing token values, not actual usage
  if (demo.type === 'css-code-demo' && content.includes('/*') && content.match(/#[0-9a-fA-F]{6}\s*;/)) {
    // This is likely an example showing token values - skip
    return issues
  }

  // Pattern 1: Literal pixel values (except acceptable layout dimensions)
  const pxPattern = /:\s*(\d+px)(?![;,\s}])/gi
  let match
  while ((match = pxPattern.exec(content)) !== null) {
    const value = match[1]
    if (!ACCEPTABLE_LAYOUT_DIMENSIONS.includes(value)) {
      issues.push({
        type: 'literal_px_value',
        value,
        property: this.extractPropertyName(content, match.index),
        position: demo.position + match.index
      })
    }
  }

  // Pattern 2: Hex color values
  const hexPattern = /:\s*#([0-9a-fA-F]{3,8})(?![;,\s}])/gi
  while ((match = hexPattern.exec(content)) !== null) {
    issues.push({
      type: 'literal_hex_color',
      value: '#' + match[1],
      property: this.extractPropertyName(content, match.index),
      position: demo.position + match.index
    })
  }

  // Pattern 3: RGB/RGBA color values
  const rgbPattern = /:\s*rgba?\([^)]+\)(?![;,\s}])/gi
  while ((match = rgbPattern.exec(content)) !== null) {
    issues.push({
      type: 'literal_rgb_color',
      value: match[0].substring(2), // Remove ": "
      property: this.extractPropertyName(content, match.index),
      position: demo.position + match.index
    })
  }

  // Pattern 4: Named colors (except transparent, inherit, initial, unset, currentColor)
  const namedColorPattern = /:\s*(red|blue|green|yellow|orange|purple|pink|black|white|gray|grey)(?![a-z-])(?![;,\s}])/gi
  while ((match = namedColorPattern.exec(content)) !== null) {
    issues.push({
      type: 'literal_named_color',
      value: match[1],
      property: this.extractPropertyName(content, match.index),
      position: demo.position + match.index
    })
  }

  // Pattern 5: Literal rem/em values (should use spacing tokens)
  const remPattern = /:\s*(\d+\.?\d*rem)(?![;,\s}])/gi
  while ((match = remPattern.exec(content)) !== null) {
    const value = match[1]
    // Allow common rem values that might be layout-related
    if (!['0rem', '0.5rem', '1rem', '2rem'].includes(value)) {
      issues.push({
        type: 'literal_rem_value',
        value,
        property: this.extractPropertyName(content, match.index),
        position: demo.position + match.index
      })
    }
  }

  return issues
}

// Helper to extract property name from CSS
function extractPropertyName(content, position) {
  const beforeMatch = content.substring(Math.max(0, position - 50), position)
  const propertyMatch = beforeMatch.match(/([a-z-]+)\s*:\s*$/)
  return propertyMatch ? propertyMatch[1] : 'unknown'
}

// Attach helper to function context
const checkLiteralValuesBound = checkLiteralValues.bind({
  extractPropertyName
})

// Process a single MDX file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(docsRoot, filePath)

  const demos = extractDemoSections(content)
  const issues = []

  demos.forEach(demo => {
    const demoIssues = checkLiteralValuesBound(demo, filePath)
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
  console.log('STEP 7: Check for Literal Values Instead of Design Tokens')
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
        const byType = {}
        result.issues.forEach(issue => {
          if (!byType[issue.type]) {
            byType[issue.type] = []
          }

          byType[issue.type].push(issue)
        })

        Object.entries(byType).forEach(([type, typeIssues]) => {
          console.log(`   - ${type} (${typeIssues.length}):`)
          typeIssues.slice(0, 5).forEach(issue => {
            console.log(`     ${issue.property}: ${issue.value}`)
          })
          if (typeIssues.length > 5) {
            console.log(`     ... and ${typeIssues.length - 5} more`)
          }
        })

        allIssues.push(...result.issues)
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
      const byFile = {}
      issues.forEach(issue => {
        if (!byFile[issue.file]) {
          byFile[issue.file] = []
        }

        byFile[issue.file].push(issue)
      })

      Object.entries(byFile).forEach(([file, fileIssues]) => {
        console.log(`  ${file} (${fileIssues.length}):`)
        fileIssues.slice(0, 10).forEach(issue => {
          console.log(`    ${issue.property}: ${issue.value}`)
        })
        if (fileIssues.length > 10) {
          console.log(`    ... and ${fileIssues.length - 10} more`)
        }
      })
    })

    process.exit(1)
  } else {
    console.log('\n✅ No literal values found! All demos use design tokens.')
    process.exit(0)
  }
}

main()

