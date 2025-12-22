#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-argument, logical-assignment-operators */

/**
 * Step 6: Check for "-demo-" Keyword in Demo CSS Class Names
 *
 * Checks every demo section to find CSS class names containing "-demo-" keyword.
 * These should be renamed (e.g., .dg-state-demo-xxx -> .dg-state-showcase-xxx)
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

  // Pattern 2: Code sections (might also contain demo-related classes)
  const codePattern = /<TabItem[^>]*value=["']code["'][^>]*>([\s\S]*?)<\/TabItem>/gi
  while ((match = codePattern.exec(content)) !== null) {
    demos.push({
      type: 'code-section',
      content: match[1],
      position: match.index
    })
  }

  return demos
}

// Extract CSS class names containing "-demo-"
function extractDemoClassNames(content) {
  const classNames = new Set()

  // Match className="..." or class="..." containing -demo-
  const classNamePatterns = [
    /className=["']([^"']*-demo-[^"']*)["']/gi,
    /class=["']([^"']*-demo-[^"']*)["']/gi
  ]

  classNamePatterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(content)) !== null) {
      // Split by spaces to get individual class names
      const classes = match[1].split(/\s+/)
      classes.forEach(cls => {
        if (cls.includes('-demo-')) {
          // Exclude legitimate utility classes
          if (!(/^(color|spacing|typography)-demo(-(lg|text|sm))?$/.exec(cls))) {
            classNames.add(cls)
          }
        }
      })
    }
  })

  return classNames
}

// Check CSS file for -demo- class definitions
function checkCSSFileForDemoClasses() {
  if (!fs.existsSync(cssPath)) {
    return new Set()
  }

  const cssContent = fs.readFileSync(cssPath, 'utf8')
  const cssClasses = new Set()

  // Match CSS class definitions containing -demo-
  // But exclude legitimate utility classes: color-demo, spacing-demo, typography-demo
  const cssPattern = /\.([a-z0-9_-]*-demo-[a-z0-9_-]*)/gi
  let match
  while ((match = cssPattern.exec(cssContent)) !== null) {
    const className = match[1]
    // Exclude legitimate utility classes
    if (!(/^(color|spacing|typography)-demo(-(lg|text|sm))?$/.exec(className))) {
      cssClasses.add(className)
    }
  }

  // Also check for problematic patterns: dg-state-demo-xxx, dg-demo-card-xxx, etc.
  const problematicPattern = /\.(dg-[a-z0-9_-]*-demo-[a-z0-9_-]*|dg-demo-[a-z0-9_-]*)/gi
  while ((match = problematicPattern.exec(cssContent)) !== null) {
    cssClasses.add(match[1])
  }

  return cssClasses
}

// Process a single MDX file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(docsRoot, filePath)

  const demos = extractDemoSections(content)
  const issues = []

  demos.forEach(demo => {
    const demoClassNames = extractDemoClassNames(demo.content)

    demoClassNames.forEach(className => {
      issues.push({
        type: 'demo_keyword_in_classname',
        className,
        demoType: demo.type,
        position: demo.position
      })
    })
  })

  return { file: relativePath, demos: demos.length, issues }
}

// Main function
function main() {
  console.log('='.repeat(80))
  console.log('STEP 6: Check for "-demo-" Keyword in Demo CSS Class Names')
  console.log('='.repeat(80))
  console.log()

  const allIssues = []
  const fileResults = []
  const cssDemoClasses = checkCSSFileForDemoClasses()

  if (cssDemoClasses.size > 0) {
    console.log(`⚠️  Found ${cssDemoClasses.size} CSS classes with "-demo-" in custom.css:`)
    cssDemoClasses.forEach(cls => {
      console.log(`   - .${cls}`)
    })
    console.log()
  }

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
        const uniqueClasses = [...new Set(result.issues.map(i => i.className))]
        uniqueClasses.forEach(className => {
          console.log(`   - Class with "-demo-": ${className}`)
          allIssues.push({
            className,
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
  console.log(`Total CSS classes with "-demo-": ${allIssues.length + cssDemoClasses.size}`)
  console.log(`  - In MDX files: ${allIssues.length}`)
  console.log(`  - In CSS file: ${cssDemoClasses.size}`)

  if (allIssues.length > 0 || cssDemoClasses.size > 0) {
    console.log('\n❌ ISSUES FOUND:')
    console.log('-'.repeat(80))

    if (allIssues.length > 0) {
      console.log('\nIn MDX files:')
      const byFile = {}
      allIssues.forEach(issue => {
        if (!byFile[issue.file]) {
          byFile[issue.file] = new Set()
        }

        byFile[issue.file].add(issue.className)
      })

      Object.entries(byFile).forEach(([file, classes]) => {
        console.log(`\n${file}:`)
        classes.forEach(className => {
          console.log(`  - ${className}`)
        })
      })
    }

    if (cssDemoClasses.size > 0) {
      console.log('\nIn CSS file (custom.css):')
      cssDemoClasses.forEach(className => {
        console.log(`  - .${className}`)
      })
    }

    process.exit(1)
  } else {
    console.log('\n✅ No "-demo-" keywords found in CSS class names!')
    process.exit(0)
  }
}

main()

