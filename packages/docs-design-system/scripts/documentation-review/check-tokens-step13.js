#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-argument, logical-assignment-operators */

/**
 * Step 13: Check MDX Text Wrapping
 *
 * Checks that all text content in JSX elements is wrapped in {'text'} to prevent
 * Docusaurus from adding unwanted <p> tags.
 *
 * Checks:
 * 1. Text content in buttons, links, labels, spans, divs, paragraphs within demo sections
 * 2. Text content in code sections matches demo format
 * 3. Special characters (arrows, symbols) are also wrapped
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

// Elements that should have text wrapped
const TEXT_ELEMENTS = ['button', 'a', 'label', 'span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'li', 'td', 'th']

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
      position: match.index,
      fullMatch: match[0]
    })
  }

  return demos
}

// Extract code sections from MDX content
function extractCodeSections(content) {
  const codeSections = []

  // Pattern: Code TabItems with jsx code blocks
  const codeTabPattern = /<TabItem[^>]*value=["']code["'][^>]*>[\s\S]*?```jsx\s*([\s\S]*?)```[\s\S]*?<\/TabItem>/gi
  let match
  while ((match = codeTabPattern.exec(content)) !== null) {
    // Only include if it's part of a demo Tabs section
    const beforeMatch = content.substring(Math.max(0, match.index - 500), match.index)
    if (beforeMatch.includes('value="demo"') || beforeMatch.includes("value='demo'")) {
      codeSections.push({
        type: 'jsx-code',
        content: match[1],
        position: match.index
      })
    }
  }

  return codeSections
}

// Helper function to check if text should be skipped
function shouldSkipText(textContent) {
  // Skip if it's already wrapped
  if (textContent.startsWith("{'") && textContent.endsWith("'}")) {
    return true
  }

  // Skip empty or whitespace-only
  if (!textContent || /^\s*$/.test(textContent)) {
    return true
  }

  // Skip comments
  if (textContent.includes('<!--') || textContent.includes('{/*')) {
    return true
  }

  // Skip code block markers
  if (textContent.includes('```')) {
    return true
  }

  // Skip if it's part of a wrapped expression (e.g., {variable})
  if (textContent.startsWith('{') && textContent.endsWith('}')) {
    return true
  }

  return false
}

// Helper function to get context around a match
function getContext(content, matchIndex, matchLength) {
  const start = Math.max(0, matchIndex - 50)
  const end = Math.min(content.length, matchIndex + matchLength + 50)
  return content.substring(start, end)
}

// Check for unwrapped text in specific JSX elements
function checkElementText(content, sectionType) {
  const issues = []

  for (const element of TEXT_ELEMENTS) {
    // Pattern: <element ...>Text</element> where Text is not {'text'}
    // Fixed: removed unnecessary escape from \s
    const pattern = new RegExp(`<${element}[^>]*>([^{<>\\n]+[^\\s{<>\\n][^{<>\\n]*)</${element}>`, 'gi')
    let match

    while ((match = pattern.exec(content)) !== null) {
      const textContent = match[1].trim()

      if (shouldSkipText(textContent)) {
        continue
      }

      issues.push({
        element,
        text: textContent,
        position: match.index,
        context: getContext(content, match.index, match[0].length),
        sectionType
      })
    }
  }

  return issues
}

// Check for unwrapped text between JSX elements
function checkBetweenElements(content, sectionType) {
  const issues = []

  // Pattern: >Text< where Text is not wrapped and not whitespace/comment
  // Fixed: removed unnecessary escape from \s
  const unwrappedPattern = />([^{<>\\n]+[^\\s{<>\\n][^{<>\\n]*)</g
  let match

  while ((match = unwrappedPattern.exec(content)) !== null) {
    const textContent = match[1].trim()

    if (shouldSkipText(textContent)) {
      continue
    }

    // Check if this text is inside a JSX element
    const beforeText = content.substring(0, match.index)
    const lastOpenTag = beforeText.lastIndexOf('<')
    const lastCloseTag = beforeText.lastIndexOf('>')
    if (lastOpenTag > lastCloseTag) {
      // We're inside a JSX element
      issues.push({
        element: 'unknown',
        text: textContent,
        position: match.index,
        context: getContext(content, match.index, match[0].length),
        sectionType
      })
    }
  }

  return issues
}

// Check for unwrapped text in JSX content
function checkUnwrappedText(content, filePath, sectionType) {
  const issues = []

  // Check text in specific elements
  issues.push(...checkElementText(content, sectionType))

  // Check text between elements
  issues.push(...checkBetweenElements(content, sectionType))

  return issues
}

// Process a single file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const issues = []

  // Check demo sections
  const demos = extractDemoSections(content)
  for (const demo of demos) {
    const demoIssues = checkUnwrappedText(demo.content, filePath, 'demo')
    issues.push(...demoIssues.map(issue => ({
      ...issue,
      file: filePath,
      section: 'demo'
    })))
  }

  // Check code sections
  const codeSections = extractCodeSections(content)
  for (const code of codeSections) {
    const codeIssues = checkUnwrappedText(code.content, filePath, 'code')
    issues.push(...codeIssues.map(issue => ({
      ...issue,
      file: filePath,
      section: 'code'
    })))
  }

  return issues
}

// Main function
function main() {
  const allIssues = []

  for (const category of categories) {
    const categoryPath = path.join(docsRoot, category)
    if (!fs.existsSync(categoryPath)) {
      console.error(`Category path does not exist: ${categoryPath}`)
      continue
    }

    const files = fs.readdirSync(categoryPath, { recursive: true })
      .filter(file => file.endsWith('.mdx'))
      .map(file => path.join(categoryPath, file))

    for (const file of files) {
      try {
        const issues = processFile(file)
        allIssues.push(...issues)
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message)
      }
    }
  }

  // Report results
  console.log('\n=== Step 13: MDX Text Wrapping Check ===\n')
  console.log(`Checked categories: ${categories.join(', ')}`)
  console.log(`Total issues found: ${allIssues.length}\n`)

  if (allIssues.length === 0) {
    console.log('✅ No issues found. All text content is properly wrapped in {\'text\'}.\n')
    process.exit(0)
  }

  // Group by file
  const issuesByFile = {}
  for (const issue of allIssues) {
    const relativePath = path.relative(workspaceRoot, issue.file)
    if (!issuesByFile[relativePath]) {
      issuesByFile[relativePath] = []
    }

    issuesByFile[relativePath].push(issue)
  }

  // Print issues grouped by file
  for (const [file, fileIssues] of Object.entries(issuesByFile)) {
    console.log(`\n📄 ${file}`)
    console.log(`   Found ${fileIssues.length} issue(s):\n`)

    for (const issue of fileIssues) {
      console.log(`   [${issue.section.toUpperCase()}] ${issue.element} element:`)
      console.log(`   Text: "${issue.text}"`)
      console.log(`   Context: ...${issue.context}...`)
      console.log(`   Fix: Wrap text in {'...'}: {'${issue.text}'}`)
      console.log('')
    }
  }

  console.log('\n=== Summary ===')
  console.log(`Total files with issues: ${Object.keys(issuesByFile).length}`)
  console.log(`Total issues: ${allIssues.length}`)
  console.log('\n💡 See MDX_TEXT_WRAPPING_GUIDE.md for examples and best practices.\n')

  process.exit(1)
}

main()

