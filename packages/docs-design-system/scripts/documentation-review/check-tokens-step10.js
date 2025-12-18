#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-argument, logical-assignment-operators */

/**
 * Step 10: Check for CSS Overridden by --ifm-xxx Styles
 *
 * Checks every demo section to find CSS that might be overridden by Docusaurus Infima styles.
 * This is a manual review step - we'll identify potential conflicts.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths
const workspaceRoot = path.resolve(__dirname, '../../../..')
const docsRoot = path.resolve(workspaceRoot, 'packages/docs-design-system/docs-design-token')
const cssPath = path.resolve(workspaceRoot, 'packages/docs-design-system/src/css/custom.css')

// Categories to check
const categories = ['colors', 'spacing', 'typography', 'effects', 'motion']

// Common Infima CSS properties that might override demo styles
const INFIMA_PROPERTIES = [
  'color',
  'background-color',
  'border',
  'border-color',
  'padding',
  'margin',
  'font-size',
  'font-weight',
  'line-height'
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

// Check for potential Infima overrides
function checkInfimaOverrides(demo, cssContent) {
  const issues = []
  const { content } = demo

  // Extract CSS class names from demo
  const classNamePattern = /className=["']([^"']+)["']/gi
  const classNames = new Set()
  let match
  while ((match = classNamePattern.exec(content)) !== null) {
    const classes = match[1].split(/\s+/)
    classes.forEach(cls => {
      if (cls.startsWith('dg-')) {
        classNames.add(cls)
      }
    })
  }

  // Check if any of these classes use properties that Infima might override
  classNames.forEach(className => {
    // Check if this class is defined in custom.css
    const classPattern = new RegExp(`\\.${className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{([^}]+)\\}`, 'gi')
    const classMatch = classPattern.exec(cssContent)

    if (classMatch) {
      const classCSS = classMatch[1]

      // Check if it uses properties that Infima commonly overrides
      INFIMA_PROPERTIES.forEach(prop => {
        if (classCSS.includes(`${prop}:`)) {
          // This is a potential conflict - flag for review
          issues.push({
            type: 'potential_infima_override',
            className,
            property: prop,
            position: demo.position
          })
        }
      })
    }
  })

  return issues
}

// Load custom.css content
function loadCustomCSS() {
  if (!fs.existsSync(cssPath)) {
    return ''
  }

  return fs.readFileSync(cssPath, 'utf8')
}

// Process a single MDX file
function processFile(filePath, cssContent) {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(docsRoot, filePath)

  const demos = extractDemoSections(content)
  const issues = []

  demos.forEach(demo => {
    const demoIssues = checkInfimaOverrides(demo, cssContent)
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
  console.log('STEP 10: Check for CSS Overridden by --ifm-xxx Styles')
  console.log('='.repeat(80))
  console.log()
  console.log('Note: This checks for potential conflicts with Docusaurus Infima styles.')
  console.log('Properties checked:', INFIMA_PROPERTIES.join(', '))
  console.log()

  const cssContent = loadCustomCSS()
  if (!cssContent) {
    console.log('⚠️  Could not load custom.css - skipping Infima override checks')
    process.exit(0)
  }

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
      const result = processFile(filePath, cssContent)
      fileResults.push(result)

      if (result.issues.length > 0) {
        console.log(`\n⚠️  ${result.file} (${result.demos} demos)`)
        const byClass = {}
        result.issues.forEach(issue => {
          if (!byClass[issue.className]) {
            byClass[issue.className] = new Set()
          }

          byClass[issue.className].add(issue.property)
        })

        Object.entries(byClass).forEach(([className, properties]) => {
          console.log(`   - ${className}: ${Array.from(properties).join(', ')}`)
          allIssues.push({
            className,
            properties: Array.from(properties),
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
  console.log(`Total potential conflicts: ${allIssues.length}`)

  if (allIssues.length > 0) {
    console.log('\n⚠️  POTENTIAL CONFLICTS FOUND:')
    console.log('-'.repeat(80))
    console.log('These classes use properties that Infima might override.')
    console.log('Review to ensure proper specificity or use !important if needed.')
    console.log()

    const byFile = {}
    allIssues.forEach(issue => {
      if (!byFile[issue.file]) {
        byFile[issue.file] = {}
      }

      if (!byFile[issue.file][issue.className]) {
        byFile[issue.file][issue.className] = new Set()
      }

      issue.properties.forEach(prop => {
        byFile[issue.file][issue.className].add(prop)
      })
    })

    Object.entries(byFile).forEach(([file, classes]) => {
      console.log(`\n${file}:`)
      Object.entries(classes).forEach(([className, properties]) => {
        console.log(`  - ${className}: ${Array.from(properties).join(', ')}`)
      })
    })

    console.log('\nNote: These are potential conflicts. Verify manually if styles are actually overridden.')
    process.exit(0) // Warning, not error
  } else {
    console.log('\n✅ No potential Infima conflicts found!')
    process.exit(0)
  }
}

main()

