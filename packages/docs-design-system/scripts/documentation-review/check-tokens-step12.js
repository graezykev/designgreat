#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-argument, logical-assignment-operators, @typescript-eslint/prefer-nullish-coalescing */

/**
 * Step 12: Check Code Section Completeness and Consistency with Demos
 *
 * Checks every demo section to find:
 * 1. Code sections that are incomplete (missing HTML or CSS)
 * 2. Code sections that don't match the demo (different class names, properties, etc.)
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

// Extract demo and code sections from Tabs
function extractTabsSections(content) {
  const tabs = []

  // Match Tabs with demo and code TabItems
  const tabsPattern = /<Tabs[^>]*>([\s\S]*?)<\/Tabs>/gi
  let match

  while ((match = tabsPattern.exec(content)) !== null) {
    const tabsContent = match[1]

    // Extract demo TabItem
    const demoMatch = /<TabItem[^>]*value=["']demo["'][^>]*>([\s\S]*?)<\/TabItem>/i.exec(tabsContent)
    const codeMatch = /<TabItem[^>]*value=["']code["'][^>]*>([\s\S]*?)<\/TabItem>/i.exec(tabsContent)

    if (demoMatch || codeMatch) {
      tabs.push({
        demo: demoMatch ? demoMatch[1] : null,
        code: codeMatch ? codeMatch[1] : null,
        position: match.index
      })
    }
  }

  return tabs
}

// Utility classes that don't need to be in code sections (layout, spacing utilities)
const UTILITY_CLASSES = [
  'dg-flex', 'dg-flex-wrap', 'dg-flex-col', 'dg-flex-row',
  'dg-items-center', 'dg-items-start', 'dg-items-end',
  'dg-justify-center', 'dg-justify-start', 'dg-justify-end', 'dg-justify-between',
  'dg-gap-xs', 'dg-gap-sm', 'dg-gap-md', 'dg-gap-lg', 'dg-gap-xl',
  'dg-mt-xs', 'dg-mt-sm', 'dg-mt-md', 'dg-mt-lg', 'dg-mt-xl',
  'dg-mb-xs', 'dg-mb-sm', 'dg-mb-md', 'dg-mb-lg', 'dg-mb-xl',
  'dg-p-xs', 'dg-p-sm', 'dg-p-md', 'dg-p-lg', 'dg-p-xl',
  'dg-hint', 'dg-clamp-grid', 'dg-clamp-label',
  'dg-spacing-flex', 'dg-spacing-box', 'dg-box-green', 'dg-box-orange', 'dg-box-blue',
  'dg-showcase-card', 'dg-state-showcase', 'dg-shadow-color'
]

// Check if a class is a utility class
function isUtilityClass(className) {
  return UTILITY_CLASSES.some(util => className === util || className.startsWith(util + '-'))
}

// Extract HTML elements and classes from content
function extractHTMLStructure(content) {
  const elements = []
  const classes = new Set()

  // Match HTML tags with className
  const tagPattern = /<(\w+)[^>]*className=["']([^"']+)["'][^>]*>/gi
  let match
  while ((match = tagPattern.exec(content)) !== null) {
    const tag = match[1]
    const classList = match[2].split(/\s+/).filter(c => c.startsWith('dg-') && !isUtilityClass(c))
    elements.push({ tag, classes: classList })
    classList.forEach(cls => classes.add(cls))
  }

  // Also match class="..." (for code sections)
  const classPattern = /<(\w+)[^>]*class=["']([^"']+)["'][^>]*>/gi
  while ((match = classPattern.exec(content)) !== null) {
    const tag = match[1]
    const classList = match[2].split(/\s+/).filter(c => c.startsWith('dg-') && !isUtilityClass(c))
    elements.push({ tag, classes: classList })
    classList.forEach(cls => classes.add(cls))
  }

  return { elements, classes }
}

// Extract CSS classes from CSS code blocks
function extractCSSClasses(cssContent) {
  const classes = new Set()

  // Match CSS class selectors
  const cssPattern = /\.(dg-[a-z0-9_-]+)/gi
  let match
  while ((match = cssPattern.exec(cssContent)) !== null) {
    classes.add(match[1])
  }

  return classes
}

// Compare demo and code sections
function compareDemoAndCode(demo, code) {
  const issues = []

  if (!demo && !code) {
    return issues // No tabs section
  }

  if (!demo) {
    issues.push({
      type: 'missing_demo',
      note: 'Code section exists but no demo section'
    })
    return issues
  }

  if (!code) {
    issues.push({
      type: 'missing_code',
      note: 'Demo section exists but no code section'
    })
    return issues
  }

  // Extract HTML structure from demo
  const demoHTML = extractHTMLStructure(demo)
  const demoClasses = demoHTML.classes

  // Extract HTML and CSS from code section
  const htmlMatch = code.match(/```html\s*([\s\S]*?)```/i)
  const cssMatch = code.match(/```css\s*([\s\S]*?)```/i)

  if (!htmlMatch && !cssMatch) {
    issues.push({
      type: 'missing_code_blocks',
      note: 'Code section exists but contains no HTML or CSS blocks'
    })
    return issues
  }

  // Check HTML consistency
  if (htmlMatch) {
    const codeHTML = extractHTMLStructure(htmlMatch[1])
    const codeClasses = codeHTML.classes

    // Check for classes in demo but not in code
    demoClasses.forEach(cls => {
      if (!codeClasses.has(cls)) {
        issues.push({
          type: 'demo_class_missing_in_code',
          className: cls,
          note: `Class ${cls} used in demo but not in code HTML`
        })
      }
    })

    // Check for classes in code but not in demo (less critical, but worth noting)
    codeClasses.forEach(cls => {
      if (!demoClasses.has(cls) && !cls.includes('--hover') && !cls.includes('--focus') && !cls.includes('--active')) {
        // Allow modifier classes in code that aren't in demo (they might be examples)
        // But flag if it's a base class
        issues.push({
          type: 'code_class_not_in_demo',
          className: cls,
          note: `Class ${cls} in code HTML but not used in demo (might be intentional)`,
          severity: 'warning'
        })
      }
    })
  }

  // Check CSS consistency
  if (cssMatch) {
    const codeCSSClasses = extractCSSClasses(cssMatch[1])

    // Check if CSS classes match demo classes (excluding utility classes)
    demoClasses.forEach(cls => {
      if (!codeCSSClasses.has(cls) && !isUtilityClass(cls) && !cls.includes('color-demo') && !cls.includes('spacing-demo')) {
        // Allow color-demo, spacing-demo, and utility classes
        issues.push({
          type: 'demo_class_missing_in_css',
          className: cls,
          note: `Class ${cls} used in demo but CSS not shown in code section`
        })
      }
    })
  }

  return issues
}

// Process a single MDX file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(docsRoot, filePath)

  const tabs = extractTabsSections(content)
  const issues = []

  tabs.forEach((tab, index) => {
    const tabIssues = compareDemoAndCode(tab.demo, tab.code)
    tabIssues.forEach(issue => {
      issues.push({
        ...issue,
        file: relativePath,
        tabIndex: index
      })
    })
  })

  return { file: relativePath, tabs: tabs.length, issues }
}

// Main function
function main() {
  console.log('='.repeat(80))
  console.log('STEP 12: Check Code Section Completeness and Consistency')
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
        console.log(`\n❌ ${result.file} (${result.tabs} tabs)`)
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
            if (issue.className) {
              console.log(`     ${issue.className}: ${issue.note}`)
            } else {
              console.log(`     ${issue.note}`)
            }
          })
          if (typeIssues.length > 5) {
            console.log(`     ... and ${typeIssues.length - 5} more`)
          }
        })

        allIssues.push(...result.issues)
      } else {
        console.log(`✅ ${result.file} (${result.tabs} tabs)`)
      }
    })
  })

  // Summary
  console.log('\n' + '='.repeat(80))
  console.log('SUMMARY')
  console.log('='.repeat(80))
  console.log(`Total files checked: ${fileResults.length}`)
  console.log(`Total tabs found: ${fileResults.reduce((sum, r) => sum + r.tabs, 0)}`)
  console.log(`Total issues found: ${allIssues.length}`)

  // Filter out warnings
  const errors = allIssues.filter(i => i.severity !== 'warning')
  const warnings = allIssues.filter(i => i.severity === 'warning')

  if (errors.length > 0 || warnings.length > 0) {
    console.log('\n❌ ISSUES FOUND:')
    console.log('-'.repeat(80))

    if (errors.length > 0) {
      console.log(`\nErrors (${errors.length}):`)
      const byType = {}
      errors.forEach(issue => {
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
            if (issue.className) {
              console.log(`    ${issue.className}: ${issue.note}`)
            } else {
              console.log(`    ${issue.note}`)
            }
          })
          if (fileIssues.length > 10) {
            console.log(`    ... and ${fileIssues.length - 10} more`)
          }
        })
      })
    }

    if (warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${warnings.length}):`)
      console.log('These are less critical - classes in code that aren\'t in demo (might be intentional examples)')
    }

    process.exit(errors.length > 0 ? 1 : 0)
  } else {
    console.log('\n✅ No issues found! All code sections are complete and consistent with demos.')
    process.exit(0)
  }
}

main()

