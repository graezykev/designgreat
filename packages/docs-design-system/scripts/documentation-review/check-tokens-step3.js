#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unused-vars, logical-assignment-operators, radix */

/**
 * Step 3: Check Token Usage in Subsequent Demos
 *
 * Checks every table and every token one by one to find tokens that are not used in subsequent demos.
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
const categories = ['colors', 'spacing', 'typography', 'effects', 'mion']

// Extract tokens from tables
function extractTokensFromTables(content) {
  const tokens = []
  const tables = []

  // Find all table rows that contain tokens
  // Tables typically start with |--| or | Token |
  const tableRowPattern = /\|.*CopyableCode[^>]*>([a-z]+\.[a-z0-9.]+).*\|/gi

  let match
  let currentTableStart = -1
  let tableIndex = 0

  while ((match = tableRowPattern.exec(content)) !== null) {
    const token = match[1]
    const matchPos = match.index

    // Find the start of this table (look backwards for table header)
    if (currentTableStart === -1 || matchPos - currentTableStart > 1000) {
      // Find table start (look for |--| or header row)
      const beforeMatch = content.substring(Math.max(0, matchPos - 500), matchPos)
      const headerMatch = beforeMatch.match(/\|.*Token.*\|/i)
      if (headerMatch) {
        currentTableStart = matchPos - beforeMatch.length + headerMatch.index
        tableIndex++
      } else {
        // Try to find |--| separator
        const separatorMatch = beforeMatch.match(/\|[-:]+\|/)
        if (separatorMatch) {
          currentTableStart = matchPos - beforeMatch.length + separatorMatch.index
          tableIndex++
        }
      }
    }

    // Find the end of this table (next section or empty line)
    const afterMatch = content.substring(matchPos, Math.min(content.length, matchPos + 2000))
    const tableEndMatch = afterMatch.match(/\n\n|\n##|\n---/)
    const tableEnd = tableEndMatch ? matchPos + tableEndMatch.index : content.length

    // Extract CSS variable if present
    const cssVarMatch = /CopyableCode[^>]*>(--dg-[a-z0-9-]+)/i.exec(match[0])
    const cssVar = cssVarMatch ? cssVarMatch[1] : null

    tokens.push({
      token,
      cssVariable: cssVar,
      tableIndex,
      position: matchPos,
      tableStart: currentTableStart,
      tableEnd
    })
  }

  return tokens
}

// Extract content after a table (subsequent demos)
function getContentAfterTable(content, tableEnd) {
  // Get content from table end to end of file or next major section
  const afterContent = content.substring(tableEnd)

  // Stop at next ## heading (new major section) or next table
  // BUT include "Usage Examples" sections even if they're ## headings
  const nextSectionMatch = afterContent.match(/^##\s+(?!Usage)/m)
  const nextTableMatch = afterContent.match(/^\|.*Token.*\|/m)

  let stopPos = afterContent.length
  if (nextSectionMatch && nextSectionMatch.index < stopPos) {
    stopPos = nextSectionMatch.index
  }

  if (nextTableMatch && nextTableMatch.index < stopPos) {
    stopPos = nextTableMatch.index
  }

  return afterContent.substring(0, stopPos)
}

// Check if content contains actual demos (not just tables)
function hasDemos(content) {
  // Look for demo patterns: className="...demo", <Tabs, Usage Examples, etc.
  const demoPatterns = [
    /className=["'][^"']*demo[^"']*["']/i,
    /<Tabs/i,
    /Usage Examples/i,
    /## Usage/i,
    /### CSS/i,
    /### TypeScript/i,
    /### JavaScript/i
  ]

  return demoPatterns.some(pattern => pattern.test(content))
}

// Check if token is used in content
function isTokenUsedInContent(token, cssVar, content) {
  // Check for token reference
  const tokenPatterns = [
    new RegExp(`\\{${token.replace(/\./g, '\\.')}\\}`, 'gi'), // {token.path}
    new RegExp(`\`${token.replace(/\./g, '\\.')}\``, 'gi'), // `token.path`
    new RegExp(`tokens\\.${token.replace(/\./g, '\\.')}`, 'gi'), // tokens.token.path
    new RegExp(`CopyableCode[^>]*>${token.replace(/\./g, '\\.')}`, 'gi') // <CopyableCode>token.path
  ]

  // Check for CSS variable reference
  // Escape special regex characters, but handle $ specially
  const escapedCssVar = cssVar.replace(/[.*+?^${}()|[\]\\]/g, (match) => {
    if (match === '$') return '\\$'
    return '\\' + match
  })

  const cssVarPatterns = [
    new RegExp(`var\\(${escapedCssVar}\\)`, 'gi'), // var(--dg-xxx)
    new RegExp(`['"]${escapedCssVar}['"]`, 'gi'), // '--dg-xxx'
    new RegExp(`CopyableCode[^>]*>${escapedCssVar}`, 'gi') // <CopyableCode>--dg-xxx
  ]

  // Check token patterns
  for (const pattern of tokenPatterns) {
    if (pattern.test(content)) {
      return true
    }
  }

  // Check CSS variable patterns
  if (cssVar) {
    for (const pattern of cssVarPatterns) {
      if (pattern.test(content)) {
        return true
      }
    }
  }

  return false
}

// Process a single MDX file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(docsRoot, filePath)

  const tokens = extractTokensFromTables(content)
  const issues = []

  // Group tokens by table
  const tokensByTable = {}
  tokens.forEach(token => {
    if (!tokensByTable[token.tableIndex]) {
      tokensByTable[token.tableIndex] = []
    }

    tokensByTable[token.tableIndex].push(token)
  })

  // Check each table's tokens
  Object.entries(tokensByTable).forEach(([tableIndex, tableTokens]) => {
    // Check each token individually using its own tableEnd position
    // This fixes the bug where tokens with different tableEnd positions
    // were all checked against content after the MAX tableEnd
    tableTokens.forEach(token => {
      // Note: Inline demos (spacing-demo, color-demo) are visual references only
      // and don't exempt tokens from needing usage in subsequent demos
      // They still need to be checked for usage in demo sections

      // Get content after THIS token's table end
      const afterContent = getContentAfterTable(content, token.tableEnd)

      // Only check if there are actual demos after this table
      if (hasDemos(afterContent)) {
        if (!isTokenUsedInContent(token.token, token.cssVariable, afterContent)) {
          issues.push({
            token: token.token,
            cssVariable: token.cssVariable,
            tableIndex: parseInt(tableIndex),
            position: token.position
          })
        }
      }
      // If no demos after table, skip checking (tokens might be reference-only)
    })
  })

  return { file: relativePath, tokens: tokens.length, issues }
}

// Main function
function main() {
  console.log('='.repeat(80))
  console.log('STEP 3: Token Usage in Subsequent Demos')
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
        console.log(`\n❌ ${result.file} (${result.tokens} tokens)`)
        result.issues.forEach(issue => {
          console.log(`   - Token not used: ${issue.token}`)
          if (issue.cssVariable) {
            console.log(`     CSS Variable: ${issue.cssVariable}`)
          }

          allIssues.push({ ...issue, file: result.file })
        })
      } else {
        console.log(`✅ ${result.file} (${result.tokens} tokens)`)
      }
    })
  })

  // Summary
  console.log('\n' + '='.repeat(80))
  console.log('SUMMARY')
  console.log('='.repeat(80))
  console.log(`Total files checked: ${fileResults.length}`)
  console.log(`Total tokens found: ${fileResults.reduce((sum, r) => sum + r.tokens, 0)}`)
  console.log(`Total unused tokens: ${allIssues.length}`)

  if (allIssues.length > 0) {
    console.log('\n❌ UNUSED TOKENS FOUND:')
    console.log('-'.repeat(80))

    const byFile = {}
    allIssues.forEach(issue => {
      if (!byFile[issue.file]) {
        byFile[issue.file] = []
      }

      byFile[issue.file].push(issue)
    })

    Object.entries(byFile).forEach(([file, issues]) => {
      console.log(`\n${file} (${issues.length} unused tokens):`)
      issues.forEach(issue => {
        console.log(`  - ${issue.token}`)
        if (issue.cssVariable) {
          console.log(`    CSS Variable: ${issue.cssVariable}`)
        }
      })
    })

    process.exit(1)
  } else {
    console.log('\n✅ No unused tokens found! All tokens are used in subsequent demos.')
    process.exit(0)
  }
}

main()

