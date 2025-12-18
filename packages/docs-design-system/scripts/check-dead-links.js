#!/usr/bin/env node

/**
 * Check Dead Links in Documentation
 *
 * Reviews all links in docs-design-system, including:
 * - Links to other pages
 * - Anchor links to sections within pages (#section-id)
 */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const workspaceRoot = path.resolve(__dirname, '../../..')
const docsRoot = path.resolve(workspaceRoot, 'packages/docs-design-system/docs-design-token')

// Find all MDX files recursively
function findMDXFiles(dir) {
  const files = []
  const dirPath = String(dir)
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  entries.forEach(entry => {
    const entryName = String(entry.name)
    const fullPath = path.join(dirPath, entryName)
    if (entry.isDirectory()) {
      const subFiles = findMDXFiles(fullPath)
      for (const file of subFiles) {
        files.push(file)
      }
    } else if (entry.isFile() && entryName.endsWith('.mdx')) {
      files.push(fullPath)
    }
  })

  return files
}

// Extract heading IDs from MDX content (for anchor link validation)
function extractHeadingIds(content) {
  const ids = new Set()

  // Match markdown headings: # Heading, ## Heading, etc.
  const headingPattern = /^(#{1,6})\s+(.+)$/gm
  let match

  while ((match = headingPattern.exec(content)) !== null) {
    const text = String(match[2] ?? '').trim()

    // Generate ID from heading text (Docusaurus style)
    // Docusaurus uses github-slugger which:
    // - Converts to lowercase
    // - Replaces & with -- (double dash, preserved)
    // - Replaces spaces with hyphens
    // - Removes special chars
    // - Collapses sequences of 3+ hyphens to --, but preserves -- from &
    let id = text
      .toLowerCase()
      .replace(/&/g, '--')  // Ampersand becomes -- (preserved)
      .replace(/[^\w\s-]/g, '')  // Remove other special chars
      .replace(/\s+/g, '-')  // Spaces to hyphens

    // Collapse sequences of 3+ hyphens to --, preserving original -- from &
    // This handles cases like "checkbox -- radio" -> "checkbox----radio" -> "checkbox--radio"
    id = id.replace(/-{3,}/g, '--')

    // Remove leading/trailing hyphens
    id = id.replace(/^-+|-+$/g, '')

    if (id) {
      ids.add(id)
    }
  }

  // Also check for explicit IDs in JSX headings: <h2 id="custom-id">
  const jsxHeadingPattern = /<h[1-6][^>]*id=["']([^"']+)["'][^>]*>/gi
  while ((match = jsxHeadingPattern.exec(content)) !== null) {
    ids.add(String(match[1] ?? ''))
  }

  return ids
}

// Extract all links from MDX content
function extractLinks(content) {
  const links = []

  // Pattern 1: Markdown links [text](url)
  const markdownLinkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
  let match
  while ((match = markdownLinkPattern.exec(content)) !== null) {
    links.push({
      text: String(match[1] ?? ''),
      url: String(match[2] ?? ''),
      type: 'markdown',
      position: Number(match.index ?? 0)
    })
  }

  // Pattern 2: JSX links <a href="..."> or <Link to="...">
  const jsxLinkPatterns = [
    /<a[^>]+href=["']([^"']+)["'][^>]*>/gi,
    /<Link[^>]+to=["']([^"']+)["'][^>]*>/gi
  ]

  jsxLinkPatterns.forEach(pattern => {
    while ((match = pattern.exec(content)) !== null) {
      links.push({
        text: String(match[0] ?? ''),
        url: String(match[1] ?? ''),
        type: 'jsx',
        position: Number(match.index ?? 0)
      })
    }
  })

  return links
}

// Resolve link path relative to current file
// eslint-disable-next-line complexity
function resolveLinkPath(linkUrl, currentFilePath) {
  // Skip external links
  if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://') || linkUrl.startsWith('//')) {
    return { type: 'external', valid: true }
  }

  // Skip mailto links
  if (linkUrl.startsWith('mailto:')) {
    return { type: 'mailto', valid: true }
  }

  // Handle anchor-only links (same page)
  if (linkUrl.startsWith('#')) {
    return {
      type: 'same_page_anchor',
      file: currentFilePath,
      anchor: linkUrl.substring(1)
    }
  }

  // Extract anchor if present
  const [pathPart, anchor] = linkUrl.split('#')

  // If pathPart is empty, it's an anchor-only link (should have been caught above, but handle anyway)
  if (!pathPart || pathPart === '') {
    return {
      type: 'same_page_anchor',
      file: currentFilePath,
      anchor: anchor || linkUrl.substring(1)
    }
  }

  // Handle absolute paths from root (Docusaurus style: /design-token/...)
  if (pathPart.startsWith('/design-token/')) {
    const relativePath = pathPart.replace('/design-token/', '')
    const targetFile = path.resolve(docsRoot, relativePath + '.mdx')
    return {
      type: 'internal',
      file: targetFile,
      anchor: anchor || null,
      relativePath
    }
  }

  // Handle web-component paths
  if (pathPart.startsWith('/web-component/')) {
    const relativePath = pathPart.replace('/web-component/', '')
    const targetFile = path.resolve(docsRoot, '..', 'docs-web-component', relativePath + '.mdx')
    return {
      type: 'internal',
      file: targetFile,
      anchor: anchor || null,
      relativePath: 'docs-web-component/' + relativePath
    }
  }

  // Handle contributing paths
  if (pathPart.startsWith('/contributing/')) {
    const relativePath = pathPart.replace('/contributing/', '')
    const targetFile = path.resolve(docsRoot, '..', 'docs-contributing', relativePath + '.mdx')
    return {
      type: 'internal',
      file: targetFile,
      anchor: anchor || null,
      relativePath: 'docs-contributing/' + relativePath
    }
  }

  // Handle absolute paths with /designgreat/ prefix
  if (pathPart.startsWith('/designgreat/')) {
    const relativePath = pathPart.replace('/designgreat/', '')
    const targetFile = path.resolve(docsRoot, '..', relativePath + '.mdx')
    return {
      type: 'internal',
      file: targetFile,
      anchor: anchor || null,
      relativePath
    }
  }

  // Handle other absolute paths starting with /
  if (pathPart.startsWith('/')) {
    // Try to resolve from docs root
    const relativePath = pathPart.substring(1) // Remove leading /
    const targetFile = path.resolve(docsRoot, relativePath + '.mdx')
    return {
      type: 'internal',
      file: targetFile,
      anchor: anchor || null,
      relativePath
    }
  }

  // Handle relative paths
  if (pathPart.startsWith('./') || pathPart.startsWith('../')) {
    const currentDir = path.dirname(String(currentFilePath))
    const targetFile = path.resolve(currentDir, String(pathPart) + '.mdx')
    return {
      type: 'internal',
      file: targetFile,
      anchor: anchor || null,
      relativePath: path.relative(docsRoot, targetFile)
    }
  }

  // Handle relative paths without ./
  if (!pathPart.startsWith('/') && !pathPart.includes('://')) {
    const currentDir = path.dirname(String(currentFilePath))
    const targetFile = path.resolve(currentDir, String(pathPart) + '.mdx')
    return {
      type: 'internal',
      file: targetFile,
      anchor: anchor || null,
      relativePath: path.relative(docsRoot, targetFile)
    }
  }

  return { type: 'unknown', valid: false }
}

// Check if anchor exists in target file
function checkAnchor(targetFile, anchor) {
  if (!anchor) return { exists: true }

  const targetFilePath = String(targetFile)
  if (!fs.existsSync(targetFilePath)) {
    return { exists: false, reason: 'file_not_found' }
  }

  const content = fs.readFileSync(targetFilePath, 'utf8')
  const headingIds = extractHeadingIds(content)

  // Check exact match
  if (headingIds.has(anchor)) {
    return { exists: true }
  }

  // Check case-insensitive match
  const anchorLower = anchor.toLowerCase()
  const matchingId = Array.from(headingIds).find(id => id.toLowerCase() === anchorLower)
  if (matchingId) {
    return { exists: true, note: `Case mismatch: found "${matchingId}" but link uses "${anchor}"` }
  }

  return { exists: false, reason: 'anchor_not_found', availableIds: Array.from(headingIds).slice(0, 5) }
}

// Process a single file
function processFile(filePath) {
  const filePathStr = String(filePath)
  const content = fs.readFileSync(filePathStr, 'utf8')
  const relativePath = path.relative(docsRoot, filePathStr)
  const links = extractLinks(content)
  const issues = []

  links.forEach(link => {
    const resolved = resolveLinkPath(link.url, filePathStr)

    if (resolved.type === 'same_page_anchor') {
      // Check anchor in same file
      const anchorCheck = checkAnchor(resolved.file, resolved.anchor)
      if (anchorCheck.exists) {
        if (anchorCheck.note) {
          issues.push({
            type: 'anchor_case_mismatch',
            link: link.url,
            text: link.text,
            target: relativePath,
            anchor: resolved.anchor,
            note: anchorCheck.note,
            position: link.position,
            samePage: true
          })
        }
      } else {
        issues.push({
          type: 'dead_anchor',
          link: link.url,
          text: link.text,
          target: relativePath,
          anchor: resolved.anchor,
          reason: anchorCheck.reason,
          availableIds: anchorCheck.availableIds,
          note: anchorCheck.note,
          position: link.position,
          samePage: true
        })
      }
    } else if (resolved.type === 'internal') {
      // Check if file exists
      const resolvedFilePath = String(resolved.file)
      if (!fs.existsSync(resolvedFilePath)) {
        issues.push({
          type: 'dead_link',
          link: link.url,
          text: link.text,
          target: resolved.relativePath,
          reason: 'file_not_found',
          position: link.position
        })
      } else if (resolved.anchor) {
        // Check anchor if present
        const anchorCheck = checkAnchor(resolvedFilePath, resolved.anchor)
        if (!anchorCheck.exists) {
          issues.push({
            type: 'dead_anchor',
            link: link.url,
            text: link.text,
            target: resolved.relativePath,
            anchor: resolved.anchor,
            reason: anchorCheck.reason,
            availableIds: anchorCheck.availableIds,
            note: anchorCheck.note,
            position: link.position
          })
        } else if (anchorCheck.note) {
          issues.push({
            type: 'anchor_case_mismatch',
            link: link.url,
            text: link.text,
            target: resolved.relativePath,
            anchor: resolved.anchor,
            note: anchorCheck.note,
            position: link.position
          })
        }
      }
    } else if (resolved.type === 'unknown') {
      issues.push({
        type: 'unknown_link_format',
        link: link.url,
        text: link.text,
        position: link.position
      })
    }
  })

  return {
    file: relativePath,
    totalLinks: links.length,
    issues
  }
}

// Main function
function main() {
  console.log('='.repeat(80))
  console.log('DEAD LINK CHECK - Documentation Review')
  console.log('='.repeat(80))
  console.log()

  const mdxFiles = findMDXFiles(docsRoot)
  console.log(`Found ${mdxFiles.length} MDX files to check\n`)

  const allIssues = []
  const fileResults = []

  mdxFiles.forEach(filePath => {
    const result = processFile(filePath)
    fileResults.push(result)

    if (result.issues.length > 0) {
      const mappedIssues = result.issues.map(issue => ({ ...issue, file: result.file }))
      for (const mappedIssue of mappedIssues) {
        allIssues.push(mappedIssue)
      }
    }
  })

  // Group issues by type
  const byType = {
    dead_link: [],
    dead_anchor: [],
    anchor_case_mismatch: [],
    unknown_link_format: []
  }

  allIssues.forEach(issue => {
    if (byType[issue.type]) {
      byType[issue.type].push(issue)
    }
  })

  // Print results
  console.log('='.repeat(80))
  console.log('RESULTS')
  console.log('='.repeat(80))
  console.log(`Total files checked: ${fileResults.length}`)
  console.log(`Total links found: ${fileResults.reduce((sum, r) => sum + r.totalLinks, 0)}`)
  console.log(`Total issues found: ${allIssues.length}`)
  console.log()

  if (allIssues.length > 0) {
    console.log('❌ ISSUES FOUND:\n')

    // Dead file links
    if (byType.dead_link.length > 0) {
      console.log(`\n📄 Dead File Links (${byType.dead_link.length}):`)
      console.log('-'.repeat(80))
      byType.dead_link.forEach(issue => {
        console.log(`\n${issue.file}`)
        console.log(`  Link: [${issue.text}](${issue.link})`)
        console.log(`  Target: ${issue.target} - FILE NOT FOUND`)
      })
    }

    // Dead anchor links
    if (byType.dead_anchor.length > 0) {
      console.log(`\n🔗 Dead Anchor Links (${byType.dead_anchor.length}):`)
      console.log('-'.repeat(80))
      byType.dead_anchor.forEach(issue => {
        console.log(`\n${issue.file}`)
        console.log(`  Link: [${issue.text}](${issue.link})`)
        console.log(`  Target: ${issue.target}#${issue.anchor} - ANCHOR NOT FOUND`)
        if (issue.availableIds && issue.availableIds.length > 0) {
          console.log(`  Available anchors: ${issue.availableIds.join(', ')}...`)
        }
      })
    }

    // Anchor case mismatches
    if (byType.anchor_case_mismatch.length > 0) {
      console.log(`\n⚠️  Anchor Case Mismatches (${byType.anchor_case_mismatch.length}):`)
      console.log('-'.repeat(80))
      byType.anchor_case_mismatch.forEach(issue => {
        console.log(`\n${issue.file}`)
        console.log(`  Link: [${issue.text}](${issue.link})`)
        console.log(`  ${issue.note}`)
      })
    }

    // Unknown link formats
    if (byType.unknown_link_format.length > 0) {
      console.log(`\n❓ Unknown Link Formats (${byType.unknown_link_format.length}):`)
      console.log('-'.repeat(80))
      byType.unknown_link_format.forEach(issue => {
        console.log(`\n${issue.file}`)
        console.log(`  Link: [${issue.text}](${issue.link})`)
        console.log(`  Could not parse link format`)
      })
    }

    // Summary by file
    console.log('\n' + '='.repeat(80))
    console.log('SUMMARY BY FILE')
    console.log('='.repeat(80))

    const byFile = {}
    allIssues.forEach(issue => {
      byFile[issue.file] ||= []
      byFile[issue.file].push(issue)
    })

    Object.entries(byFile).forEach(([file, issues]) => {
      console.log(`\n${file} (${issues.length} issues):`)
      issues.forEach(issue => {
        const icon = issue.type === 'dead_link' ? '📄' :
          issue.type === 'dead_anchor' ? '🔗' :
            issue.type === 'anchor_case_mismatch' ? '⚠️' : '❓'
        console.log(`  ${icon} [${issue.text}](${issue.link})`)
      })
    })

    process.exit(1)
  } else {
    console.log('✅ No dead links found! All links are valid.')
    process.exit(0)
  }
}

main()

