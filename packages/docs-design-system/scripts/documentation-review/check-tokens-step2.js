#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unused-vars, logical-assignment-operators, no-lonely-if */

/**
 * Step 2: Check Color Demo Block Correctness
 *
 * Checks every table cell with a color demo block to find:
 * - Color demo block that is not using the css variable (or the corresponding reference color) to set its background color.
 *
 * Note: If the token is a compound token like "shadow.xxx" or "border.xxx", find its "color"'s value or reference and the corresponding css variable.
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
const tokenSrcRoot = path.resolve(workspaceRoot, 'packages/lib-design-token/src/tokens')

// Categories to check
const categories = ['colors', 'spacing', 'typography', 'effects', 'motion']

// Load CSS variables
function loadCSSVariables() {
  if (!fs.existsSync(cssPath)) {
    console.error(`❌ CSS file not found: ${cssPath}`)
    console.error('   Run: pnpm --filter @designgreat/lib-design-token run build')
    process.exit(1)
  }

  const cssContent = fs.readFileSync(cssPath, 'utf8')
  const cssVars = new Map()

  // Parse CSS variables and their values
  const varPattern = /--dg-([^:]+):\s*([^;]+);/g
  let match
  while ((match = varPattern.exec(cssContent)) !== null) {
    cssVars.set(`--dg-${match[1].trim()}`, match[2].trim())
  }

  return cssVars
}

// Load token definitions to find color references
function loadTokenDefinitions() {
  // This is a simplified version - would need to parse JS files for full implementation
  // For now, we'll use CSS variable values to infer references
  return new Map()
}

// Extract color demo blocks from MDX content
function extractColorDemoBlocks(content) {
  const demos = []

  // Match color demo blocks with backgroundColor
  // Pattern 1: backgroundColor in color-demo (but NOT color-demo-text)
  const demoPattern1 = /<div\s+className=["']color-demo(?!-text)[^"']*["']\s+style=\{\{[^}]*backgroundColor:\s*['"]([^'"]+)['"]/gi

  // Process backgroundColor demos
  let match
  while ((match = demoPattern1.exec(content)) !== null) {
    const bgColor = match[1]
    const startPos = match.index

    // Find the table row containing this demo
    const rowStart = content.lastIndexOf('|', startPos)
    const rowEnd = content.indexOf('\n', startPos)
    if (rowStart === -1 || rowEnd === -1) continue

    const rowContent = content.substring(rowStart, rowEnd)

    // Extract token and CSS variable from the same row
    // Token is typically in CopyableCode after the demo
    const tokenMatch = rowContent.match(/CopyableCode[^>]*>([a-z]+\.[a-z0-9.]+)</i)
    // CSS Variable is in CopyableCode, typically after the token
    const cssVarMatches = [...rowContent.matchAll(/CopyableCode[^>]*>(--dg-[a-z0-9-]+)</gi)]
    // Get the CSS variable that matches the token (usually the second CopyableCode)
    const cssVar = cssVarMatches.length > 0 ? cssVarMatches[cssVarMatches.length - 1][1] : null

    demos.push({
      backgroundColor: bgColor,
      token: tokenMatch ? tokenMatch[1] : null,
      cssVariable: cssVar,
      context: rowContent.substring(0, 200)
    })
  }

  // Process color-demo-text blocks - extract both backgroundColor and color
  // Match style={{...}} - use non-greedy match to stop at }}
  const textDemoPattern = /<div\s+className=["']color-demo-text[^"']*["']\s+style=\{\{(.*?)\}\}/gis
  while ((match = textDemoPattern.exec(content)) !== null) {
    const styleContent = match[1]
    const startPos = match.index

    // Find the table row containing this demo
    const rowStart = content.lastIndexOf('|', startPos)
    const rowEnd = content.indexOf('\n', startPos)
    if (rowStart === -1 || rowEnd === -1) continue

    const rowContent = content.substring(rowStart, rowEnd)

    // Extract token and CSS variable from the same row
    const tokenMatch = rowContent.match(/CopyableCode[^>]*>([a-z]+\.[a-z0-9.]+)</i)
    const cssVarMatches = [...rowContent.matchAll(/CopyableCode[^>]*>(--dg-[a-z0-9-]+)/gi)]
    const cssVar = cssVarMatches.length > 0 ? cssVarMatches[cssVarMatches.length - 1][1] : null

    // Extract the color property value (not backgroundColor)
    // Match: color: 'var(--dg-xxx)' or color: "var(--dg-xxx)"
    const colorMatch = /color:\s*['"]var\((--dg-[^)]+)\)['"]/.exec(styleContent)
    let textColorVar = colorMatch ? colorMatch[1] : null

    // If not found, try without quotes (shouldn't happen but just in case)
    if (!textColorVar) {
      const colorMatch2 = /color:\s*var\((--dg-[^)]+)\)/.exec(styleContent)
      textColorVar = colorMatch2 ? colorMatch2[1] : null
    }

    if (textColorVar) {
      demos.push({
        backgroundColor: textColorVar, // Store the actual text color here
        token: tokenMatch ? tokenMatch[1] : null,
        cssVariable: cssVar,
        context: rowContent.substring(0, 200),
        isTextDemo: true
      })
    }
  }

  return demos
}

// Check if color demo uses correct CSS variable
function checkColorDemo(demo, cssVars, allCSSVars) {
  const issues = []

  // Skip if we don't have the expected CSS variable (can't verify)
  if (!demo.cssVariable) {
    return issues
  }

  let usedVar = null

  // Extract the CSS variable being used
  if (demo.isTextDemo) {
    // For text demos, backgroundColor field contains the CSS variable name directly
    usedVar = demo.backgroundColor
  } else {
    // For regular demos, extract from var() syntax
    if (demo.backgroundColor.startsWith('var(')) {
      const varMatch = demo.backgroundColor.match(/var\((--dg-[^)]+)\)/)
      if (varMatch) {
        usedVar = varMatch[1]
      }
    } else if (demo.backgroundColor.startsWith('--dg-')) {
      // Already a CSS variable name
      usedVar = demo.backgroundColor
    }
  }

  if (!usedVar) {
    // Demo uses a literal color value - should use CSS variable instead
    if (demo.backgroundColor !== 'transparent') {
      issues.push({
        type: 'literal_color_in_demo',
        literalColor: demo.backgroundColor,
        expectedVar: demo.cssVariable,
        token: demo.token
      })
    }

    return issues
  }

  // Check if the CSS variable exists
  if (!allCSSVars.has(usedVar)) {
    issues.push({
      type: 'undefined_css_var_in_demo',
      usedVar,
      expectedVar: demo.cssVariable,
      token: demo.token
    })
    return issues // Can't verify further if variable doesn't exist
  }

  // Check if it matches the expected CSS variable from the table
  if (usedVar !== demo.cssVariable) {
    issues.push({
      type: 'css_var_mismatch',
      usedVar,
      expectedVar: demo.cssVariable,
      token: demo.token,
      note: demo.isTextDemo ? 'Text color mismatch' : 'Background color mismatch'
    })
  }

  return issues
}

// Process a single MDX file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(docsRoot, filePath)

  const colorDemos = extractColorDemoBlocks(content)
  const cssVars = loadCSSVariables()
  const allCSSVars = new Set(cssVars.keys())

  const issues = []

  colorDemos.forEach(demo => {
    const demoIssues = checkColorDemo(demo, cssVars, allCSSVars)
    demoIssues.forEach(issue => {
      issues.push({
        ...issue,
        file: relativePath,
        demoContext: demo.context
      })
    })
  })

  return { file: relativePath, colorDemos: colorDemos.length, issues }
}

// Main function
function main() {
  console.log('='.repeat(80))
  console.log('STEP 2: Color Demo Block Correctness')
  console.log('='.repeat(80))
  console.log()

  const cssVars = loadCSSVariables()
  console.log(`✅ Loaded ${cssVars.size} CSS variables from ${path.relative(process.cwd(), cssPath)}`)
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
        console.log(`\n❌ ${result.file} (${result.colorDemos} color demos)`)
        result.issues.forEach(issue => {
          console.log(`   - ${issue.type}:`)
          console.log(`     Used: ${issue.usedVar || issue.literalColor}`)
          console.log(`     Expected: ${issue.expectedVar || 'N/A'}`)
          console.log(`     Token: ${issue.token || 'N/A'}`)
          allIssues.push(issue)
        })
      } else {
        console.log(`✅ ${result.file} (${result.colorDemos} color demos)`)
      }
    })
  })

  // Summary
  console.log('\n' + '='.repeat(80))
  console.log('SUMMARY')
  console.log('='.repeat(80))
  console.log(`Total files checked: ${fileResults.length}`)
  console.log(`Total color demos found: ${fileResults.reduce((sum, r) => sum + r.colorDemos, 0)}`)
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
        console.log(`    Token: ${issue.token || 'N/A'}`)
        console.log(`    Used: ${issue.usedVar || issue.literalColor}`)
        console.log(`    Expected: ${issue.expectedVar || 'N/A'}`)
      })
    })

    process.exit(1)
  } else {
    console.log('\n✅ No issues found! All color demo blocks use correct CSS variables.')
    process.exit(0)
  }
}

main()

