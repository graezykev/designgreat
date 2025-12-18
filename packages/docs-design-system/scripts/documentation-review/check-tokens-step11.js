#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-argument, logical-assignment-operators */

/**
 * Step 11: Check for Interactive State Patterns
 *
 * Checks every demo section to find interactive components that should have both:
 * 1. Pseudo-class selectors (:hover, :focus, :active, etc.)
 * 2. Supplementary modifier classes (.dg-xxx--hover, .dg-xxx--focus, etc.)
 *
 * This allows for both dynamic interaction and static demo states.
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

// Interactive components that should have state patterns
const INTERACTIVE_COMPONENTS = [
  'dg-btn',
  'dg-link',
  'dg-tag',
  'dg-badge',
  'dg-input',
  'dg-checkbox',
  'dg-toggle',
  'dg-radio',
  'dg-select',
  'dg-dropdown',
  'dg-tab',
  'dg-list',
  'dg-nav',
  'dg-card'
]

// Interactive states to check
// Note: 'selected' is not a CSS pseudo-class - it's handled via classes/data attributes
// So it only needs modifier classes, not pseudo-classes
const INTERACTIVE_STATES = {
  'hover': { needsPseudo: true, needsModifier: true },
  'focus': { needsPseudo: true, needsModifier: true },
  'active': { needsPseudo: true, needsModifier: true },
  'disabled': { needsPseudo: true, needsModifier: true },
  'selected': { needsPseudo: false, needsModifier: true }, // State class, not pseudo-class
  'visited': { needsPseudo: true, needsModifier: true },
  'opened': { needsPseudo: false, needsModifier: true }, // State class
  'checked': { needsPseudo: true, needsModifier: true }
}

// Load CSS file
function loadCSS() {
  if (!fs.existsSync(cssPath)) {
    return ''
  }

  return fs.readFileSync(cssPath, 'utf8')
}

// Check if a component has both pseudo-class and modifier class for a state
function checkStatePattern(cssContent, component, state, stateConfig) {
  let hasPseudoClass = false
  let hasModifierClass = false

  if (stateConfig.needsPseudo) {
    const pseudoClassPattern = new RegExp(`\\.${component.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:${state}[\\s{:,]`, 'gi')
    hasPseudoClass = pseudoClassPattern.test(cssContent)
  } else {
    // States like 'selected' don't need pseudo-classes
    hasPseudoClass = true // Consider it satisfied
  }

  if (stateConfig.needsModifier) {
    const modifierClassPattern = new RegExp(`\\.${component.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}--${state}[\\s{:,]`, 'gi')
    hasModifierClass = modifierClassPattern.test(cssContent)
  }

  return { hasPseudoClass, hasModifierClass }
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

  return demos
}

// Extract component class names from demo
function extractComponentClasses(demoContent) {
  const components = new Set()

  // Match className="dg-xxx"
  const classNamePattern = /className=["']([^"']*dg-[^"']+)["']/gi
  let match
  while ((match = classNamePattern.exec(demoContent)) !== null) {
    const classes = match[1].split(/\s+/)
    classes.forEach(cls => {
      // Extract base component name (remove modifiers)
      const baseMatch = /^(dg-[a-z]+(?:-[a-z]+)*)/.exec(cls)
      if (baseMatch) {
        const baseComponent = baseMatch[1]
        // Check if it's an interactive component
        if (INTERACTIVE_COMPONENTS.some(ic => baseComponent.startsWith(ic))) {
          components.add(baseComponent)
        }
      }
    })
  }

  return components
}

// Process a single MDX file
function processFile(filePath, cssContent) {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(docsRoot, filePath)

  const demos = extractDemoSections(content)
  const issues = []

  demos.forEach(demo => {
    const components = extractComponentClasses(demo.content)

    components.forEach(component => {
      Object.entries(INTERACTIVE_STATES).forEach(([state, stateConfig]) => {
        const { hasPseudoClass, hasModifierClass } = checkStatePattern(cssContent, component, state, stateConfig)

        // Check if this component actually uses this state in the demo
        const usesStateInDemo = demo.content.includes(`${component}--${state}`) ||
                               demo.content.includes(`${component}:${state}`)

        if (usesStateInDemo) {
          // Check based on state requirements
          if (stateConfig.needsPseudo && stateConfig.needsModifier) {
            // Needs both
            if (!hasPseudoClass && !hasModifierClass) {
              issues.push({
                type: 'missing_both_patterns',
                component,
                state,
                position: demo.position
              })
            } else if (!hasPseudoClass) {
              issues.push({
                type: 'missing_pseudo_class',
                component,
                state,
                position: demo.position
              })
            } else if (!hasModifierClass) {
              issues.push({
                type: 'missing_modifier_class',
                component,
                state,
                position: demo.position
              })
            }
          } else if (stateConfig.needsModifier && !hasModifierClass) {
            // Only needs modifier class (e.g., selected, opened)
            issues.push({
              type: 'missing_modifier_class',
              component,
              state,
              position: demo.position
            })
          }
        }
      })
    })
  })

  return { file: relativePath, demos: demos.length, issues }
}

// Main function
function main() {
  console.log('='.repeat(80))
  console.log('STEP 11: Check for Interactive State Patterns')
  console.log('='.repeat(80))
  console.log()
  console.log('Checking that interactive components have both:')
  console.log('  1. Pseudo-class selectors (:hover, :focus, etc.)')
  console.log('  2. Supplementary modifier classes (.dg-xxx--hover, .dg-xxx--focus, etc.)')
  console.log()

  const cssContent = loadCSS()
  if (!cssContent) {
    console.log('⚠️  Could not load custom.css - skipping state pattern checks')
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
            console.log(`     ${issue.component} --${issue.state}`)
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
      const byComponent = {}
      issues.forEach(issue => {
        if (!byComponent[issue.component]) {
          byComponent[issue.component] = new Set()
        }

        byComponent[issue.component].add(issue.state)
      })

      Object.entries(byComponent).forEach(([component, states]) => {
        console.log(`  ${component}: ${Array.from(states).join(', ')}`)
      })
    })

    process.exit(1)
  } else {
    console.log('\n✅ No issues found! All interactive components have both pseudo-class and modifier class patterns.')
    process.exit(0)
  }
}

main()

