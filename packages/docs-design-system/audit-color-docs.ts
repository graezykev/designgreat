#!/usr/bin/env node

/**
 * Comprehensive Color Documentation Audit Script
 * ===============================================
 *
 * Audits all color documentation files in packages/docs-design-system/docs/colors/
 *
 * CHECKS:
 * 1. Table structure integrity (corrupted/duplicated headers, column count)
 * 2. CSS variable correctness (uppercase DEFAULT, non-existent vars)
 * 3. Hardcoded hex colors in demos (outside theme comparison sections)
 * 4. Shorthand references that should use {color.} format
 * 5. Hex value correctness (validates against CSS output)
 * 6. Alpha column validation (percentage format + CSS hex8 verification)
 * 7. Gradient Level column validation (descriptive labels)
 * 8. Semantic Type column validation (semantic types and accent colors)
 * 9. Category column validation (primary token categories + inheritance logic)
 * 10. State column validation (interactive state names)
 * 11. Reference column validation (format + user-friendly reference check)
 * 12. Shorthand range warnings (e.g., ".1 - .10" should be expanded)
 * 13. Color demo CSS variable usage (no hardcoded hex in demos)
 * 14. Basic file statistics (tables, demos, token references)
 *
 * USAGE:
 *   node audit-color-docs.mjs
 *
 * EXIT CODES:
 *   0 - All checks passed
 *   1 - Issues found (see output for details)
 *
 * SEVERITY LEVELS:
 *   🚨 CRITICAL - Corrupted markdown that breaks rendering (must fix immediately)
 *   ❌ ERROR    - Invalid tokens, missing CSS vars, hardcoded colors (should fix)
 *   ⚠️  WARNING  - Style/consistency issues, shorthand ranges (review recommended)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const CONFIG = {
  docsDir: path.join(__dirname, 'docs/colors'),
  cssPath: path.join(__dirname, '../lib-web-ui/dist/lib-web-ui.css'),
  tokensDir: path.join(__dirname, '../lib-web-ui-design-token/src/tokens/color'),
  files: [
    'base-colors.mdx',
    'accent-colors.mdx',
    'alpha-colors.mdx',
    'primary-brand-colors.mdx',
    'secondary-tertiary-quartus.mdx',
    'semantic-colors.mdx',
    'shortcuts/text.mdx',
    'shortcuts/background.mdx',
    'shortcuts/border.mdx',
    'shortcuts/shadow.mdx',
    'shortcuts/interactive-state.mdx'
  ]
}

// Load CSS for variable existence checking
let cssContent = ''
try {
  cssContent = fs.readFileSync(CONFIG.cssPath, 'utf8')
} catch (e) {
  console.warn('⚠️  Could not load CSS file for variable validation\n')
}

// Token Tree Builder
// ==================
// Loads token definitions using ES module imports
const tokenTree = {}

function buildTokenPath(obj, basePath = '') {
  const result = {}

  for (const key in obj) {
    const value = obj[key]
    const currentPath = basePath ? `${basePath}.${key}` : key

    if (value && typeof value === 'object') {
      if (value.value !== undefined) {
        // This is a token definition
        result[currentPath] = {
          value: value.value,
          type: value.type,
          attributes: value.attributes || {}
        }
      } else {
        // Recurse into nested objects
        Object.assign(result, buildTokenPath(value, currentPath))
      }
    }
  }

  return result
}

async function loadAllTokens() {
  console.log('🔧 Loading token definitions...')

  // Import all token files using dynamic imports
  const [
    baseGrey,
    baseSaturated,
    accentGrey,
    accentNeutral,
    accentSaturated,
    alphaGrey,
    alphaNeutral,
    brandTokens,
    primaryTokens,
    secondaryTokens,
    tertiaryTokens,
    quartusTokens,
    semanticTokens,
    textTokens,
    backgroundTokens,
    borderTokens,
    shadowTokens
  ] = await Promise.all([
    import('../lib-web-ui-design-token/dist/tokens/color/base/grey.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/base/saturated.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/accent/grey.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/accent/neutral.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/accent/saturated.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/alpha/grey.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/alpha/neutral.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/brand.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/primary.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/secondary.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/tertiary.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/quartus.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/semantic.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/shortcut/text.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/shortcut/background.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/shortcut/border.js'),
    import('../lib-web-ui-design-token/dist/tokens/color/shortcut/shadow.js')
  ])

  // Build token paths from all imported modules
  const allModules = [
    baseGrey.default,
    baseSaturated.default,
    accentGrey.default,
    accentNeutral.default,
    accentSaturated.default,
    alphaGrey.default,
    alphaNeutral.default,
    brandTokens.default,
    primaryTokens.default,
    secondaryTokens.default,
    tertiaryTokens.default,
    quartusTokens.default,
    semanticTokens.default,
    textTokens.default,
    backgroundTokens.default,
    borderTokens.default,
    shadowTokens.default
  ]

  allModules.forEach(module => {
    if (module) {
      const tokens = buildTokenPath(module)
      Object.assign(tokenTree, tokens)
    }
  })

  console.log(`   Loaded ${Object.keys(tokenTree).length} token definitions\n`)
}

const issues: Record<'critical' | 'error' | 'warning', string[]> = {
  critical: [],
  error: [],
  warning: []
}

function addIssue(severity: 'critical' | 'error' | 'warning', file: string, message: string, line: number | null = null) {
  const entry = line ? `${file}:${line} - ${message}` : `${file} - ${message}`
  issues[severity].push(entry)
}

// Helper function to convert token name to CSS variable (global for reuse)
function tokenToCssVar(tokenName: string): string {
  return '--dg-' + tokenName.replace(/\./g, '-').toLowerCase()
}

// Main execution function
async function main() {
  // Load tokens before running checks
  await loadAllTokens()

function checkFile(filePath, fileName) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${fileName}: FILE NOT FOUND`)
    return
  }

  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split('\n')

  console.log(`\n📄 ${fileName}`)
  console.log('-'.repeat(80))

  let fileIssues = 0

  // CHECK 1: Table structure issues
  const tableIssues: Array<{ line: number; headerCols: number; rowCols: number }> = []

  for (let i = 0; i < lines.length - 2; i++) {
    const line = lines[i]
    const nextLine = lines[i + 1]
    const thirdLine = lines[i + 2]

    // Check for corrupted table separators
    if (nextLine.includes('||--|') || nextLine.includes('--||--')) {
      addIssue('critical', fileName, 'Corrupted table separator', i + 2)
      console.log(`  🚨 CRITICAL (line ${i + 2}): Corrupted table separator`)
      fileIssues++
      continue
    }

    // Check for duplicated header content
    if (/^\|.*Token.*\|.*Token.*\|$/.test(line)) {
      addIssue('critical', fileName, 'Duplicated table header', i + 1)
      console.log(`  🚨 CRITICAL (line ${i + 1}): Duplicated table header`)
      fileIssues++
      continue
    }

    // Check for column count mismatch between header and rows
    if (/^\|.*\|$/.test(line) && nextLine.startsWith('|--') && /^\|.*\|$/.test(thirdLine)) {
      // This looks like a table (header | separator | row)
      const headerCols = (line.match(/\|/g) || []).length
      const sepCols = (nextLine.match(/\|/g) || []).length
      const rowCols = (thirdLine.match(/\|/g) || []).length

      // Check if row has color demo (indicates missing first column in header)
      const rowHasColorDemo = thirdLine.includes('color-demo') || thirdLine.includes('<div')

      if (rowHasColorDemo && headerCols !== rowCols) {
        addIssue('critical', fileName,
          `Column count mismatch: header has ${headerCols-1} cols, rows have ${rowCols-1} cols (missing "| |" for color demo?)`,
          i + 1)
        console.log(`  🚨 CRITICAL (line ${i + 1}): Column mismatch - header ${headerCols-1} cols, rows ${rowCols-1} cols`)
        tableIssues.push({ line: i + 1, headerCols, rowCols })
        fileIssues++
      }

      // Check if separator matches header
      if (headerCols !== sepCols) {
        addIssue('critical', fileName,
          `Separator mismatch: header has ${headerCols} pipes, separator has ${sepCols} pipes`,
          i + 2)
        console.log(`  🚨 CRITICAL (line ${i + 2}): Separator mismatch`)
        fileIssues++
      }
    }
  }

  // CHECK 2: Hardcoded hex colors OUTSIDE theme comparison sections
  const hardcodedColors: number[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/backgroundColor:\s*['"]#[0-9a-fA-F]{6}/.test(line)) {
      // Check surrounding context
      const contextStart = Math.max(0, i - 15)
      const contextEnd = Math.min(lines.length, i + 5)
      const context = lines.slice(contextStart, contextEnd).join('\n')

      // Skip if in theme comparison section
      if (context.includes('SWITCHED') || context.includes('SAME') ||
          context.includes('Light Theme') || context.includes('Dark Theme') ||
          context.includes('Visual Example')) {
        continue
      }

      hardcodedColors.push(i + 1)
    }
  }

  if (hardcodedColors.length > 0) {
    hardcodedColors.forEach(lineNum => {
      addIssue('error', fileName, 'Hardcoded hex color in demo', lineNum)
    })
    console.log(`  ❌ ERROR: ${hardcodedColors.length} hardcoded hex color(s) in demos`)
    console.log(`     Lines: ${hardcodedColors.slice(0, 5).join(', ')}${hardcodedColors.length > 5 ? '...' : ''}`)
    fileIssues++
  }

  // CHECK 2.5: Malformed CSS variables (var-- instead of var()
  const malformedCssVars: number[] = []
  lines.forEach((line, idx) => {
    // Check for var-- (missing opening parenthesis)
    if (line.includes('var--dg-color')) {
      malformedCssVars.push(idx + 1)
      addIssue('critical', fileName, 'Malformed CSS variable: var-- should be var(--', idx + 1)
    }

    // Check for var(...) with mismatched parentheses
    if (/var\([^)]*$/.test(line) && !/var\([^)]*\)/.test(line)) {
      malformedCssVars.push(idx + 1)
      addIssue('critical', fileName, 'Malformed CSS variable: missing closing parenthesis', idx + 1)
    }
  })

  if (malformedCssVars.length > 0) {
    console.log(`  🚨 CRITICAL: ${malformedCssVars.length} malformed CSS variable(s)`)
    console.log(`     Lines: ${malformedCssVars.slice(0, 5).join(', ')}${malformedCssVars.length > 5 ? '...' : ''}`)
    fileIssues++
  }

  // CHECK 3: Uppercase DEFAULT in CSS variables
  const uppercaseDefaults: number[] = []
  lines.forEach((line, idx) => {
    if (/--dg-color-[a-zA-Z-]+-DEFAULT/.test(line)) {
      uppercaseDefaults.push(idx + 1)
    }
  })

  if (uppercaseDefaults.length > 0) {
    uppercaseDefaults.forEach(lineNum => {
      addIssue('error', fileName, 'CSS variable with uppercase DEFAULT', lineNum)
    })
    console.log(`  ❌ ERROR: ${uppercaseDefaults.length} uppercase DEFAULT in CSS variables`)
    console.log(`     Lines: ${uppercaseDefaults.slice(0, 5).join(', ')}${uppercaseDefaults.length > 5 ? '...' : ''}`)
    fileIssues++
  }

  // CHECK 4: CSS variables that don't exist in output (excluding code blocks)
  if (cssContent) {
    const missingVars = new Set<{ var: string; line: number }>()
    lines.forEach((line, idx) => {
      const matches = line.match(/--dg-color-[a-z0-9-]+/g)
      if (matches) {
        // Skip if in code block
        const contextLines = lines.slice(Math.max(0, idx - 5), idx + 1)
        if (contextLines.some(l => l.includes('```'))) {
          return
        }

        matches.forEach((varName: string) => {
          if (!cssContent.includes(varName + ':')) {
            missingVars.add({ var: varName, line: idx + 1 })
          }
        })
      }
    })

    if (missingVars.size > 0) {
      missingVars.forEach(item => {
        addIssue('error', fileName, `CSS variable not found: ${item.var}`, item.line)
      })
      console.log(`  ❌ ERROR: ${missingVars.size} CSS variable(s) not in output`)
      Array.from(missingVars).slice(0, 3).forEach(item => {
        console.log(`     Line ${item.line}: ${item.var}`)
      })
      fileIssues++
    }
  }

  // CHECK 5: Hex value correctness (for base-colors.mdx)
  if (fileName === 'base-colors.mdx' && cssContent) {
    const hexMismatches: Array<{ line: number; varName: string; docHex: string; cssHex: string }> = []

    // Extract all CSS variable to hex mappings from base colors
    const cssHexMap: Record<string, string> = {}
    const baseColorMatches = cssContent.match(/--dg-color-base-[a-z]+:\s*#[0-9a-fA-F]{6}/g)
    if (baseColorMatches) {
      baseColorMatches.forEach(match => {
        const [varName, hexValue] = match.split(':').map(s => s.trim())
        cssHexMap[varName] = hexValue.toLowerCase()
      })
    }

    // Check each table row with hex values
    lines.forEach((line, idx) => {
      // Look for table rows with hex values: | ... | --dg-color-base-xxx | `#XXXXXX` | ...
      const hexMatch = /\|\s*<CopyableCode>(--dg-color-base-[a-z]+)<\/CopyableCode>\s*\|\s*`(#[0-9a-fA-F]{6})`/.exec(line)
      if (hexMatch) {
        const varName = hexMatch[1]
        const docHex = hexMatch[2].toLowerCase()
        const cssHex = cssHexMap[varName]

        if (cssHex && cssHex !== docHex) {
          hexMismatches.push({
            line: idx + 1,
            varName,
            docHex: hexMatch[2], // Keep original case for display
            cssHex: cssHexMap[varName]
          })
        }
      }
    })

    if (hexMismatches.length > 0) {
      hexMismatches.forEach(item => {
        addIssue('error', fileName,
          `Hex value mismatch for ${item.varName}: doc has ${item.docHex}, CSS has ${item.cssHex}`,
          item.line)
      })
      console.log(`  ❌ ERROR: ${hexMismatches.length} hex value mismatch(es)`)
      hexMismatches.forEach(item => {
        console.log(`     Line ${item.line}: ${item.varName} (doc: ${item.docHex}, CSS: ${item.cssHex})`)
      })
      fileIssues++
    }
  }

  // CHECK 6: Alpha column validation
  const alphaFormatIssues: Array<{ line: number; value: string; reason: string }> = []
  const alphaColumnLines: number[] = []

  // Find tables with Alpha column
  lines.forEach((line, idx) => {
    if (/\|\s*Alpha\s*\|/.test(line) && (lines[idx + 1] || '').startsWith('|--')) {
      alphaColumnLines.push(idx)
    }
  })

  // Validate Alpha column values
  alphaColumnLines.forEach(headerIdx => {
    // Find the end of this table
    let tableEndIdx = headerIdx + 2
    while (tableEndIdx < lines.length && lines[tableEndIdx].startsWith('|')) {
      const line = lines[tableEndIdx]

      // Extract Alpha column value (should be before "Use Case" or at the end)
      // Pattern: | ... | Alpha_Value | (Use Case or end) |
      const alphaMatch = /\|\s*([^|]+?)\s*\|\s*(?:[^|]+\s*\|)?$/.exec(line)

      if (alphaMatch) {
        // Get the second-to-last or last cell content
        const cells = line.split('|').map(c => c.trim()).filter(c => c)
        let alphaValue: string | null = null

        // Try to identify Alpha column by position
        if (line.includes('| Alpha |')) {
          // This is the header, skip
        } else if (cells.length >= 5) {
          // Check if token ends with .blur or is an alpha.* token
          const tokenCell = cells.find(c => c.includes('color.'))

          if (tokenCell) {
            // Determine expected alpha position based on table structure
            // Most tables: ... | Reference | Alpha | Use Case |
            // So Alpha is second-to-last or third-to-last
            const possibleAlphaIdx = cells.length - 2 // Usually second-to-last
            alphaValue = cells[possibleAlphaIdx]

            // Validate: should be "X%" or "-" or "0.XX (X%)"
            if (alphaValue && !alphaValue.includes('<div') && !alphaValue.includes('CopyableCode')) {
              const isValidAlpha = /^(\d+%|-)$/.test(alphaValue) || /^0\.\d+\s*\(\d+%\)$/.test(alphaValue)

              if (!isValidAlpha) {
                alphaFormatIssues.push({
                  line: tableEndIdx + 1,
                  value: alphaValue,
                  reason: 'Should be "X%", "0.XX (X%)", or "-"'
                })
              }
            }
          }
        }
      }

      tableEndIdx++
    }
  })

  if (alphaFormatIssues.length > 0) {
    alphaFormatIssues.forEach(item => {
      addIssue('warning', fileName,
        `Invalid Alpha column value: "${item.value}" (${item.reason})`,
        item.line)
    })
    console.log(`  ⚠️  WARNING: ${alphaFormatIssues.length} invalid Alpha column value(s)`)
    alphaFormatIssues.slice(0, 3).forEach(item => {
      console.log(`     Line ${item.line}: "${item.value}"`)
    })
    fileIssues++
  }

  // CHECK 7: Gradient Level column validation (for accent-colors.mdx)
  if (fileName === 'accent-colors.mdx') {
    const gradientIssues: Array<{ line: number; value: string; token: string | undefined }> = []
    const validGradientLevels = [
      'Lightest', 'Very light', 'Light', 'Medium-light', 'Medium',
      'Medium-dark', 'Base (DEFAULT)', 'Dark', 'Darker', 'Darkest'
    ]

    // Find tables with Gradient Level column
    lines.forEach((line, idx) => {
      if (/\|\s*Gradient Level\s*\|/.test(line) && (lines[idx + 1] || '').startsWith('|--')) {
        // This is a Gradient Level table header
        let tableIdx = idx + 2

        while (tableIdx < lines.length && lines[tableIdx].startsWith('|')) {
          const tableLine = lines[tableIdx]

          // Extract Gradient Level column (last column in these tables)
          const cells = tableLine.split('|').map(c => c.trim()).filter(c => c)

          if (cells.length >= 4) {
            const gradientLevel = cells[cells.length - 1]

            // Skip if it's a demo block or code
            if (!gradientLevel.includes('<div') && !gradientLevel.includes('CopyableCode')) {
              if (!validGradientLevels.includes(gradientLevel)) {
                gradientIssues.push({
                  line: tableIdx + 1,
                  value: gradientLevel,
                  token: cells.find(c => c.includes('color.accent.'))
                })
              }
            }
          }

          tableIdx++
        }
      }
    })

    if (gradientIssues.length > 0) {
      gradientIssues.forEach(item => {
        addIssue('warning', fileName,
          `Invalid Gradient Level: "${item.value}" (should be one of: ${validGradientLevels.slice(0, 3).join(', ')}...)`,
          item.line)
      })
      console.log(`  ⚠️  WARNING: ${gradientIssues.length} invalid Gradient Level value(s)`)
      console.log(`     Valid values: ${validGradientLevels.join(', ')}`)
      gradientIssues.slice(0, 3).forEach(item => {
        console.log(`     Line ${item.line}: "${item.value}"`)
      })
      fileIssues++
    }
  }

  // CHECK 8: Semantic Type column validation (for semantic-colors.mdx)
  if (fileName === 'semantic-colors.mdx') {
    const semanticTypeIssues: Array<{ line: number; column: string; value: string; expected: string[] }> = []
    const validSemanticTypes = ['Info', 'New', 'Success', 'Warning', 'Error']
    const validAccentColors = ['Blue (Primary)', 'Purple', 'Green', 'Orange', 'Red']

    // Find table with Semantic Type column
    lines.forEach((line, idx) => {
      if (/\|\s*Semantic Type\s*\|/.test(line) && (lines[idx + 1] || '').startsWith('|--')) {
        // This is a Semantic Type table header
        let tableIdx = idx + 2

        while (tableIdx < lines.length && lines[tableIdx].startsWith('|')) {
          const tableLine = lines[tableIdx]

          // Parse table row: |  | Semantic Type | Accent Color | Use Case |
          const cells = tableLine.split('|').map(c => c.trim()).filter(c => c)

          if (cells.length >= 3) {
            // Extract Semantic Type (second column, after color demo)
            let semanticType = cells[1]
            let accentColor = cells[2]

            // Remove markdown formatting
            semanticType = semanticType.replace(/\*\*/g, '').trim()
            accentColor = accentColor.trim()

            // Skip if it's a demo block or code
            if (!semanticType.includes('<div') && !semanticType.includes('CopyableCode')) {
              // Validate Semantic Type
              if (!validSemanticTypes.includes(semanticType)) {
                semanticTypeIssues.push({
                  line: tableIdx + 1,
                  column: 'Semantic Type',
                  value: semanticType,
                  expected: validSemanticTypes
                })
              }

              // Validate Accent Color mapping
              if (!accentColor.includes('<div') && !accentColor.includes('CopyableCode')) {
                if (!validAccentColors.includes(accentColor)) {
                  semanticTypeIssues.push({
                    line: tableIdx + 1,
                    column: 'Accent Color',
                    value: accentColor,
                    expected: validAccentColors
                  })
                }
              }
            }
          }

          tableIdx++
        }
      }
    })

    if (semanticTypeIssues.length > 0) {
      semanticTypeIssues.forEach(item => {
        addIssue('error', fileName,
          `Invalid ${item.column}: "${item.value}" (should be one of: ${item.expected.join(', ')})`,
          item.line)
      })
      console.log(`  ❌ ERROR: ${semanticTypeIssues.length} invalid Semantic Type/Accent Color value(s)`)
      console.log(`     Valid Semantic Types: ${validSemanticTypes.join(', ')}`)
      console.log(`     Valid Accent Colors: ${validAccentColors.join(', ')}`)
      semanticTypeIssues.slice(0, 3).forEach(item => {
        console.log(`     Line ${item.line} (${item.column}): "${item.value}"`)
      })
      fileIssues++
    }
  }

  // CHECK 9: Category column validation (for primary-brand-colors.mdx)
  if (fileName === 'primary-brand-colors.mdx') {
    const categoryIssues: Array<{ line: number; value: string; token: string }> = []
    const validCategories = ['Emphasis', 'Interactive', 'Component', 'Alias']

    // Find table with Category column
    lines.forEach((line, idx) => {
      if (/\|\s*Category\s*\|/.test(line) && (lines[idx + 1] || '').startsWith('|--')) {
        // This is a Category table header
        let tableIdx = idx + 2

        while (tableIdx < lines.length && lines[tableIdx].startsWith('|')) {
          const tableLine = lines[tableIdx]

          // Parse table row: | Category |  | Token | CSS Variable | Reference | Use Case |
          const cells = tableLine.split('|').map(c => c.trim()).filter(c => c)

          if (cells.length >= 1) {
            // Extract Category (first column, before color demo)
            let category = cells[0]

            // Remove markdown formatting (bold)
            category = category.replace(/\*\*/g, '').trim()

            // Skip if it's a demo block or code or empty (non-category rows)
            if (category && !category.includes('<div') && !category.includes('CopyableCode')) {
              if (!validCategories.includes(category)) {
                categoryIssues.push({
                  line: tableIdx + 1,
                  value: category,
                  token: cells[2] // Token name for context (third column)
                })
              }
            }
          }

          tableIdx++
        }
      }
    })

    if (categoryIssues.length > 0) {
      categoryIssues.forEach(item => {
        addIssue('error', fileName,
          `Invalid Category: "${item.value}" (should be one of: ${validCategories.join(', ')})`,
          item.line)
      })
      console.log(`  ❌ ERROR: ${categoryIssues.length} invalid Category value(s)`)
      console.log(`     Valid Categories: ${validCategories.join(', ')}`)
      categoryIssues.slice(0, 3).forEach(item => {
        console.log(`     Line ${item.line}: "${item.value}"`)
      })
      fileIssues++
    }
  }

  // CHECK 10: Comprehensive column validation (Token, CSS Variable, Reference, Alpha, Gradient Level)
  const columnIssues: Array<{ line: number; column: string; token: string; value: string; expected?: string; issue: string }> = []

  // Helper function to get expected gradient level description
  function getExpectedGradientLevel(tokenName: string): string | null {
    const match = tokenName.match(/\.(\d+)$/)
    if (!match) return null

    const level = parseInt(match[1])
    const isGrey = tokenName.includes('.grey.') || tokenName.includes('.neutral.')
    const defaultLevel = isGrey ? 11 : 7

    // Map gradient levels to descriptions
    const greyLevelMap = {
      1: 'Lightest',
      2: 'Very light',
      3: 'Light',
      4: 'Medium-light',
      5: 'Medium',
      6: 'Medium-dark',
      7: 'Dark',
      8: 'Darker',
      9: 'Very dark',
      10: 'Almost black',
      11: 'Base (DEFAULT)',
      12: 'Darkest'
    }

    const saturatedLevelMap = {
      1: 'Lightest',
      2: 'Very light',
      3: 'Light',
      4: 'Medium-light',
      5: 'Medium',
      6: 'Medium-dark',
      7: 'Base (DEFAULT)',
      8: 'Dark',
      9: 'Darker',
      10: 'Darkest'
    }

    return isGrey ? greyLevelMap[level] : saturatedLevelMap[level]
  }

  // Find all tables (any table, not just Reference tables)
  lines.forEach((line, idx) => {
    if (/^\|.*\|$/.test(line) && (lines[idx + 1] || '').startsWith('|--')) {
      // Skip theme comparison tables where shorthand is intentional
      const contextBefore = lines.slice(Math.max(0, idx - 10), idx).join('\n')
      if (contextBefore.includes('Light Theme') || contextBefore.includes('Dark Theme') ||
          line.includes('Reference (Light') || line.includes('Reference (Dark')) {
        return
      }

      // Found a table header
      const headerCells = line.split('|').map(c => c.trim()).filter(c => c)
      const tokenColIdx = headerCells.findIndex(h => /^Token$/i.test(h))
      const cssVarColIdx = headerCells.findIndex(h => /^CSS Variable$/i.test(h))
      const referenceColIdx = headerCells.findIndex(h => /^Reference$/i.test(h) && !h.includes('('))
      const alphaColIdx = headerCells.findIndex(h => /^Alpha$/i.test(h))
      const gradientLevelColIdx = headerCells.findIndex(h => /^Gradient Level$/i.test(h))
      const useCaseColIdx = headerCells.findIndex(h => /^Use Case$/i.test(h))

      // Skip if no data columns found
      if (tokenColIdx === -1) return

      let tableIdx = idx + 2 // Skip header and separator

      while (tableIdx < lines.length && lines[tableIdx].startsWith('|')) {
        const tableLine = lines[tableIdx]
        const cells = tableLine.split('|').map(c => c.trim()).filter(c => c)

        // Determine if there's a color demo column (causes offset)
        const hasExtraCol = cells.length > headerCells.length

        // Adjust column indices for color demo column
        const getActualIdx = (colIdx) => (hasExtraCol && colIdx !== -1) ? colIdx + 1 : colIdx

        const actualTokenIdx = getActualIdx(tokenColIdx)
        const actualCssVarIdx = getActualIdx(cssVarColIdx)
        const actualRefIdx = getActualIdx(referenceColIdx)
        const actualAlphaIdx = getActualIdx(alphaColIdx)
        const actualGradientIdx = getActualIdx(gradientLevelColIdx)
        const actualUseCaseIdx = getActualIdx(useCaseColIdx)

        // Extract Token name
        let tokenName = ''
        if (actualTokenIdx !== -1 && cells.length > actualTokenIdx) {
          const tokenCell = cells[actualTokenIdx]
          if (tokenCell.includes('CopyableCode')) {
            const match = />([^<]+)</.exec(tokenCell)
            if (match) tokenName = match[1].trim()
          }
        }

        if (!tokenName) {
          tableIdx++
          continue // Skip rows without token
        }

        // VALIDATION 1: Token exists in tokenTree
        const tokenDef = tokenTree[tokenName]
        if (Object.keys(tokenTree).length > 0 && !tokenDef) {
          columnIssues.push({
            line: tableIdx + 1,
            column: 'Token',
            token: tokenName,
            value: tokenName,
            issue: 'TOKEN: Not found in token definitions'
          })
        }

        // VALIDATION 2: CSS Variable correctness
        if (actualCssVarIdx !== -1 && cells.length > actualCssVarIdx) {
          const cssVarCell = cells[actualCssVarIdx]
          if (cssVarCell.includes('CopyableCode')) {
            const match = />([^<]+)</.exec(cssVarCell)
            if (match) {
              const docCssVar = match[1].trim()
              const expectedCssVar = tokenToCssVar(tokenName)

              if (docCssVar !== expectedCssVar) {
                columnIssues.push({
                  line: tableIdx + 1,
                  column: 'CSS Variable',
                  token: tokenName,
                  value: docCssVar,
                  expected: expectedCssVar,
                  issue: `CSS VAR: Incorrect (expected: ${expectedCssVar})`
                })
              }
            }
          }
        }

        // VALIDATION 3: Reference value (if token definition exists)
        if (tokenDef && actualRefIdx !== -1 && cells.length > actualRefIdx) {
          const refCell = cells[actualRefIdx]
          if (refCell && !refCell.includes('<div') && !refCell.includes('CopyableCode')) {
            const refContent = refCell.replace(/`([^`]+)`/g, '$1').trim()

            // Format check
            if (refContent.startsWith('{') && refContent.endsWith('}')) {
              const innerContent = refContent.slice(1, -1)
              if (!innerContent.startsWith('color.')) {
                columnIssues.push({
                  line: tableIdx + 1,
                  column: 'Reference',
                  token: tokenName,
                  value: refContent,
                  issue: 'FORMAT: Reference should start with {color.'
                })
              }

              // Value check - Skip for alias/derived tokens (they intentionally reference other tokens)
              const expectedRef = tokenDef.value
              const isAliasToken = tokenName.includes('.neutral.') ||
                                   tokenName.includes('.alpha.') ||
                                   tokenName.includes('.semantic.') ||
                                   tokenName.includes('.primary.') ||
                                   tokenName.includes('.secondary.') ||
                                   tokenName.includes('.tertiary.') ||
                                   tokenName.includes('.quartus.') ||
                                   tokenName.includes('.text.') ||
                                   tokenName.includes('.background.') ||
                                   tokenName.includes('.brand')

              if (expectedRef && expectedRef !== refContent && !isAliasToken) {
                columnIssues.push({
                  line: tableIdx + 1,
                  column: 'Reference',
                  token: tokenName,
                  value: refContent,
                  expected: expectedRef,
                  issue: `VALUE: Reference mismatch (expected: ${expectedRef})`
                })
              }
            } else if (refContent && refContent !== '-' && !/^[A-Z]/.test(refContent)) {
              if (/\w+\.\w+/.test(refContent) || /^(color|accent|primary|semantic|alpha)/.test(refContent)) {
                columnIssues.push({
                  line: tableIdx + 1,
                  column: 'Reference',
                  token: tokenName,
                  value: refContent,
                  issue: 'FORMAT: Reference missing curly braces (should be {...})'
                })
              }
            }
          }
        }

        // VALIDATION 4: Alpha value (if token definition has alpha attribute)
        if (tokenDef && actualAlphaIdx !== -1 && cells.length > actualAlphaIdx) {
          const alphaValue = cells[actualAlphaIdx].replace(/`/g, '').trim()

          if (alphaValue && alphaValue !== '-') {
            const expectedAlpha = tokenDef.attributes?.alpha
            if (expectedAlpha !== undefined) {
              const alphaMatch = /([0-9.]+)/.exec(alphaValue)
              let docAlpha = alphaMatch ? parseFloat(alphaMatch[1]) : null

              if (docAlpha !== null && alphaValue.includes('%') && docAlpha > 1) {
                docAlpha /= 100
              }

              if (docAlpha !== null && Math.abs(docAlpha - expectedAlpha) > 0.001) {
                columnIssues.push({
                  line: tableIdx + 1,
                  column: 'Alpha',
                  token: tokenName,
                  value: alphaValue,
                  expected: expectedAlpha,
                  issue: `VALUE: Alpha mismatch (expected: ${expectedAlpha})`
                })
              }
            }
          }
        }

        // VALIDATION 5: Gradient Level description
        if (actualGradientIdx !== -1 && cells.length > actualGradientIdx) {
          const gradientValue = cells[actualGradientIdx].trim()
          const expectedGradient = getExpectedGradientLevel(tokenName)

          if (expectedGradient && gradientValue && gradientValue !== expectedGradient) {
            columnIssues.push({
              line: tableIdx + 1,
              column: 'Gradient Level',
              token: tokenName,
              value: gradientValue,
              expected: expectedGradient,
              issue: `VALUE: Gradient Level mismatch (expected: ${expectedGradient})`
            })
          }
        }

        // VALIDATION 6: Category column validation
        const categoryColIdx = headerCells.findIndex(h => /^Category$/i.test(h))
        const actualCategoryIdx = getActualIdx(categoryColIdx)

        if (actualCategoryIdx !== -1 && cells.length > actualCategoryIdx) {
          const categoryValue = cells[actualCategoryIdx].replace(/\*\*/g, '').trim()
          const validCategories = ['Emphasis', 'Interactive', 'Component', 'Alias']

          if (categoryValue && !validCategories.includes(categoryValue) && !/^$|color-demo/.test(categoryValue)) {
            columnIssues.push({
              line: tableIdx + 1,
              column: 'Category',
              token: tokenName,
              value: categoryValue,
              expected: validCategories.join(' | '),
              issue: `VALUE: Invalid Category (expected one of: ${validCategories.join(', ')})`
            })
          }
        }

        // VALIDATION 7: Semantic Type column validation
        const semanticTypeColIdx = headerCells.findIndex(h => /^Semantic Type$/i.test(h))
        const actualSemanticTypeIdx = getActualIdx(semanticTypeColIdx)

        if (actualSemanticTypeIdx !== -1 && cells.length > actualSemanticTypeIdx) {
          const semanticTypeValue = cells[actualSemanticTypeIdx].replace(/\*\*/g, '').trim()
          const validSemanticTypes = ['Info', 'New', 'Success', 'Warning', 'Error']

          if (semanticTypeValue && !validSemanticTypes.includes(semanticTypeValue) && !/^$|color-demo/.test(semanticTypeValue)) {
            columnIssues.push({
              line: tableIdx + 1,
              column: 'Semantic Type',
              token: tokenName,
              value: semanticTypeValue,
              expected: validSemanticTypes.join(' | '),
              issue: `VALUE: Invalid Semantic Type (expected one of: ${validSemanticTypes.join(', ')})`
            })
          }
        }

        tableIdx++
      }
    }
  })

  if (columnIssues.length > 0) {
    columnIssues.forEach(item => {
      const tokenInfo = item.token ? ` (token: ${item.token})` : ''
      const expectedInfo = item.expected ? ` → Expected: "${item.expected}"` : ''
      addIssue('error', fileName,
        `${item.issue}: "${item.value}"${tokenInfo}${expectedInfo}`,
        item.line)
    })
    console.log(`  ❌ ERROR: ${columnIssues.length} column validation issue(s)`)
    console.log(`     Validating: Token, CSS Variable, Reference, Alpha, Gradient Level`)
    columnIssues.slice(0, 5).forEach(item => {
      const expectedStr = item.expected ? ` → Expected: "${item.expected}"` : ''
      console.log(`     Line ${item.line} [${item.column}]: ${item.issue} - "${item.value}"${expectedStr}`)
    })
    fileIssues++
  }


  // CHECK 10.5: Validate "Level X" references in accent-colors.mdx theme-aware tables
  if (fileName === 'accent-colors.mdx') {
    const levelRefIssues: Array<{ line: number; alias: string; theme: string; actual: number; expected: number }> = []

    lines.forEach((line, idx) => {
      // Find tables with "Reference (Light Theme)" and "Reference (Dark Theme)" columns
      if (line.includes('Reference (Light Theme)') && line.includes('Reference (Dark Theme)')) {
        // Found a theme-aware reference table
        const headerCells = line.split('|').map(c => c.trim()).filter(c => c)
        const aliasColIdx = headerCells.findIndex(h => /^Alias$/i.test(h))
        const lightRefColIdx = headerCells.findIndex(h => h.includes('Reference (Light Theme)'))
        const darkRefColIdx = headerCells.findIndex(h => h.includes('Reference (Dark Theme)'))

        if (aliasColIdx === -1 || lightRefColIdx === -1 || darkRefColIdx === -1) return

        // Expected mapping for saturated colors (Emphasis Levels)
        const emphasisLevelMap: Record<string, { light: number; dark: number }> = {
          'boldest': { light: 10, dark: 1 },
          'bolder': { light: 9, dark: 2 },
          'bold': { light: 8, dark: 3 },
          'DEFAULT': { light: 7, dark: 4 },
          'subtle': { light: 6, dark: 5 },
          'subtler': { light: 5, dark: 6 },
          'subtlest': { light: 4, dark: 7 }
        }

        // Expected mapping for Background Levels
        const backgroundLevelMap: Record<string, { light: number; dark: number }> = {
          'low': { light: 3, dark: 8 },
          'lower': { light: 2, dark: 9 },
          'lowest': { light: 1, dark: 10 }
        }

        // Combine both maps
        const levelMap = { ...emphasisLevelMap, ...backgroundLevelMap }

        // Process rows
        let tableIdx = idx + 2 // Skip header and separator
        while (tableIdx < lines.length && lines[tableIdx].startsWith('|')) {
          const tableLine = lines[tableIdx]
          const cells = tableLine.split('|').map(c => c.trim()).filter(c => c)

          // Determine if there's a color demo column (causes offset)
          const hasExtraCol = cells.length > headerCells.length
          const getActualIdx = (colIdx: number) => (hasExtraCol && colIdx !== -1) ? colIdx + 1 : colIdx

          const actualAliasIdx = getActualIdx(aliasColIdx)
          const actualLightRefIdx = getActualIdx(lightRefColIdx)
          const actualDarkRefIdx = getActualIdx(darkRefColIdx)

          // Extract alias name
          let aliasName = ''
          if (actualAliasIdx !== -1 && cells.length > actualAliasIdx) {
            const aliasCell = cells[actualAliasIdx]
            aliasName = aliasCell.replace(/`/g, '').trim()
          }

          if (!aliasName || !levelMap[aliasName]) {
            tableIdx++
            continue
          }

          // Extract and validate Light Theme reference
          if (actualLightRefIdx !== -1 && cells.length > actualLightRefIdx) {
            const lightRefCell = cells[actualLightRefIdx]
            const lightMatch = /Level (\d+)/.exec(lightRefCell)
            if (lightMatch) {
              const actualLevel = parseInt(lightMatch[1])
              const expectedLevel = levelMap[aliasName].light
              if (actualLevel !== expectedLevel) {
                levelRefIssues.push({
                  line: tableIdx + 1,
                  alias: aliasName,
                  theme: 'Light',
                  actual: actualLevel,
                  expected: expectedLevel
                })
              }
            }
          }

          // Extract and validate Dark Theme reference
          if (actualDarkRefIdx !== -1 && cells.length > actualDarkRefIdx) {
            const darkRefCell = cells[actualDarkRefIdx]
            const darkMatch = /Level (\d+)/.exec(darkRefCell)
            if (darkMatch) {
              const actualLevel = parseInt(darkMatch[1])
              const expectedLevel = levelMap[aliasName].dark
              if (actualLevel !== expectedLevel) {
                levelRefIssues.push({
                  line: tableIdx + 1,
                  alias: aliasName,
                  theme: 'Dark',
                  actual: actualLevel,
                  expected: expectedLevel
                })
              }
            }
          }

          tableIdx++
        }
      }
    })

    if (levelRefIssues.length > 0) {
      levelRefIssues.forEach(item => {
        addIssue('error', fileName,
          `Level Reference: Alias "${item.alias}" in ${item.theme} Theme should be Level ${item.expected}, not Level ${item.actual}`,
          item.line)
      })
      console.log(`  ❌ ERROR: ${levelRefIssues.length} incorrect "Level X" reference(s)`)
      levelRefIssues.slice(0, 5).forEach(item => {
        console.log(`     Line ${item.line}: Alias "${item.alias}" (${item.theme} Theme) → Level ${item.actual} should be Level ${item.expected}`)
      })
      fileIssues++
    }
  }

  // CHECK 11: Shorthand references in table cells (should use {color.})
  const shorthandRefs: Array<{ ref: string; line: number }> = []
  lines.forEach((line, idx) => {
    // Look for references in table cells (not in comparison/reference tables)
    const contextBefore = lines.slice(Math.max(0, idx - 10), idx).join('\n')
    const contextAfter = lines.slice(idx, idx + 3).join('\n')
    const fullContext = contextBefore + contextAfter

    // Skip theme comparison and reference mapping tables
    if (fullContext.includes('Light Theme') || fullContext.includes('Dark Theme') ||
        fullContext.includes('Reference (Light') || fullContext.includes('Reference (Dark') ||
        contextBefore.includes('Emphasis Levels') || contextBefore.includes('Background Levels')) {
      return
    }

    const matches = line.match(/\|\s*`([a-z]+\.[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)?)`\s*\|/g)
    if (matches) {
      matches.forEach(match => {
        const refMatch = /`([^`]+)`/.exec(match)
        if (!refMatch) return
        const ref = refMatch[1]
        // Check if it's a color reference without {color.}
        const colorPrefixes = ['neutral', 'grey', 'red', 'blue', 'teal', 'lime',
          'magenta', 'purple', 'orange', 'yellow', 'green',
          'primary', 'secondary', 'tertiary', 'quartus',
          'text', 'background', 'semantic']

        if (colorPrefixes.some(prefix => ref.startsWith(prefix + '.')) && !ref.startsWith('{')) {
          shorthandRefs.push({ ref, line: idx + 1 })
        }
      })
    }
  })

  if (shorthandRefs.length > 0) {
    shorthandRefs.forEach(item => {
      addIssue('warning', fileName, `Shorthand reference: ${item.ref}`, item.line)
    })
    console.log(`  ⚠️  WARNING: ${shorthandRefs.length} shorthand reference(s)`)
    console.log(`     ${shorthandRefs.slice(0, 3).map(i => `Line ${i.line}: ${i.ref}`).join('; ')}`)
    fileIssues++
  }

  // CHECK 12: State column validation (for primary-brand-colors.mdx State-Specific Tokens)
  if (fileName === 'primary-brand-colors.mdx') {
    const stateIssues: Array<{ line: number; value: string }> = []
    const validStates = ['Visited', 'Hover', 'Focus', 'Active', 'Disabled', 'Activated', 'Opened', 'Checked']

    lines.forEach((line, idx) => {
      if (/\|\s*State\s*\|/.test(line) && (lines[idx + 1] || '').startsWith('|--')) {
        // This is a State column table header
        let tableIdx = idx + 2

        while (tableIdx < lines.length && lines[tableIdx].startsWith('|')) {
          const tableLine = lines[tableIdx]
          const cells = tableLine.split('|').map(c => c.trim()).filter(c => c)

          if (cells.length >= 2) {
            // Extract State column (second column, after color demo)
            let stateValue = cells[1]

            // Remove markdown formatting
            stateValue = stateValue.replace(/\*\*/g, '').trim()

            // Skip if it's a demo block or code
            if (stateValue && !stateValue.includes('<div') && !stateValue.includes('CopyableCode')) {
              if (!validStates.includes(stateValue)) {
                stateIssues.push({
                  line: tableIdx + 1,
                  value: stateValue
                })
              }
            }
          }

          tableIdx++
        }
      }
    })

    if (stateIssues.length > 0) {
      stateIssues.forEach(item => {
        addIssue('error', fileName,
          `Invalid State value: "${item.value}" (should be one of: ${validStates.join(', ')})`,
          item.line)
      })
      console.log(`  ❌ ERROR: ${stateIssues.length} invalid State value(s)`)
      console.log(`     Valid States: ${validStates.join(', ')}`)
      stateIssues.slice(0, 3).forEach(item => {
        console.log(`     Line ${item.line}: "${item.value}"`)
      })
      fileIssues++
    }
  }

  // CHECK 13: Shorthand range warnings (e.g., ".1 - .10" should be expanded)
  const shorthandRanges: Array<{ line: number; range: string }> = []
  lines.forEach((line, idx) => {
    // Look for patterns like: | `color.semantic.info.1` - `color.semantic.info.10` | - | Full gradient scale |
    const rangeMatch = /`(color\.[a-z]+\.[a-z]+\.\d+)`\s*-\s*`(color\.[a-z]+\.[a-z]+\.\d+)`/.exec(line)
    if (rangeMatch) {
      shorthandRanges.push({
        line: idx + 1,
        range: `${rangeMatch[1]} - ${rangeMatch[2]}`
      })
    }
  })

  if (shorthandRanges.length > 0) {
    shorthandRanges.forEach(item => {
      addIssue('warning', fileName,
        `Shorthand range found: "${item.range}" - consider expanding for better documentation`,
        item.line)
    })
    console.log(`  ⚠️  WARNING: ${shorthandRanges.length} shorthand range(s) - consider expanding`)
    shorthandRanges.slice(0, 3).forEach(item => {
      console.log(`     Line ${item.line}: ${item.range}`)
    })
    fileIssues++
  }

  // CHECK 14: Enhanced Alpha validation with CSS hex8 verification
  if (cssContent) {
    const alphaVerificationIssues: Array<{ line: number; token: string; docAlpha: string; cssAlpha: string; hexAlpha: string }> = []

    lines.forEach((line, idx) => {
      // Find Alpha column entries with percentage
      const alphaMatch = /\|\s*(\d+)%\s*\|/.exec(line)
      if (alphaMatch) {
        const alphaPercent = parseInt(alphaMatch[1])
        const alphaDecimal = alphaPercent / 100

        // Try to find the token name in the same row
        const tokenMatch = /color\.[a-z]+\.[a-z]+(?:\.[a-z]+)?(?:\.[a-z]+)?/.exec(line)
        if (tokenMatch) {
          const tokenName = tokenMatch[0]
          const cssVar = tokenToCssVar(tokenName)

          // Check if CSS has this variable with alpha
          const cssVarMatch = new RegExp(`${cssVar}:\\s*#[0-9a-fA-F]{6}([0-9a-fA-F]{2})`).exec(cssContent)
          if (cssVarMatch) {
            const hexAlpha = cssVarMatch[1]
            const cssAlphaDecimal = parseInt(hexAlpha, 16) / 255
            const cssAlphaPercent = Math.round(cssAlphaDecimal * 100)

            // Allow 1% tolerance for rounding
            if (Math.abs(cssAlphaPercent - alphaPercent) > 1) {
              alphaVerificationIssues.push({
                line: idx + 1,
                token: tokenName,
                docAlpha: alphaPercent + '%',
                cssAlpha: cssAlphaPercent + '%',
                hexAlpha
              })
            }
          }
        }
      }
    })

    if (alphaVerificationIssues.length > 0) {
      alphaVerificationIssues.forEach(item => {
        addIssue('error', fileName,
          `Alpha mismatch for ${item.token}: docs show ${item.docAlpha}, CSS has ${item.cssAlpha} (hex: ${item.hexAlpha})`,
          item.line)
      })
      console.log(`  ❌ ERROR: ${alphaVerificationIssues.length} alpha verification issue(s)`)
      alphaVerificationIssues.slice(0, 3).forEach(item => {
        console.log(`     Line ${item.line}: ${item.token} - docs: ${item.docAlpha}, CSS: ${item.cssAlpha}`)
      })
      fileIssues++
    }
  }

  // CHECK 15: Stats
  const tableCount = (content.match(/^\|.*\|$/gm) || []).filter((line, idx, arr) => idx < arr.length - 1 && arr[idx + 1].startsWith('|--')).length
  const demoCount = (content.match(/className="color-demo/g) || []).length
  const tokenCount = (content.match(/color\.[a-z]+\.[a-z]+/g) || []).length

  if (fileIssues === 0) {
    console.log(`  ✅ No issues found`)
  }

  console.log(`  📊 ${tableCount} tables, ${demoCount} demos, ${tokenCount} token refs`)
}

// Main execution
  // Audit Files
  console.log('🔍 COMPREHENSIVE COLOR DOCUMENTATION AUDIT')
  console.log('='.repeat(80))
  console.log(`Checking ${CONFIG.files.length} files...\n`)

  CONFIG.files.forEach(file => {
    const filePath = path.join(CONFIG.docsDir, file)
    checkFile(filePath, file)
  })

  // Summary
  console.log('\n' + '='.repeat(80))
  console.log('📊 AUDIT SUMMARY')
  console.log('='.repeat(80))

  const totalIssues = issues.critical.length + issues.error.length + issues.warning.length

  if (totalIssues === 0) {
    console.log('\n✅ ✅ ✅  ALL DOCUMENTATION IS CLEAN - NO ISSUES FOUND!  ✅ ✅ ✅\n')
    process.exit(0)
  } else {
    console.log(`\n❌ Found ${totalIssues} issue(s):\n`)
    console.log(`   🚨 ${issues.critical.length} CRITICAL`)
    console.log(`   ❌ ${issues.error.length} ERROR`)
    console.log(`   ⚠️  ${issues.warning.length} WARNING\n`)

    if (issues.critical.length > 0) {
      console.log('🚨 CRITICAL ISSUES (must fix immediately):')
      issues.critical.forEach((issue, idx) => {
        console.log(`   ${idx + 1}. ${issue}`)
      })
      console.log('')
    }

    if (issues.error.length > 0) {
      console.log('❌ ERRORS (should fix):')
      issues.error.slice(0, 20).forEach((issue, idx) => {
        console.log(`   ${idx + 1}. ${issue}`)
      })
      if (issues.error.length > 20) {
        console.log(`   ... and ${issues.error.length - 20} more`)
      }

      console.log('')
    }

    if (issues.warning.length > 0) {
      console.log('⚠️  WARNINGS (review recommended):')
      issues.warning.slice(0, 10).forEach((issue, idx) => {
        console.log(`   ${idx + 1}. ${issue}`)
      })
      if (issues.warning.length > 10) {
        console.log(`   ... and ${issues.warning.length - 10} more`)
      }

      console.log('')
    }

    console.log('='.repeat(80))
    process.exit(1)
  }
}

// Run the main function
main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})

