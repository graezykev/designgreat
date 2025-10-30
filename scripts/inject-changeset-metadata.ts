import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const changesetDir = path.resolve(__dirname, '..', '.changeset')

function getChangesetFiles(): string[] {
  if (!fs.existsSync(changesetDir)) return []
  return fs.readdirSync(changesetDir).filter(file => file.endsWith('.md'))
}

function getLatestMergeMetadata(): { prNumber: string; author: string } | undefined {
  try {
    // Use single quotes to avoid shell interpretation issues (especially in fish)
    const output = execSync("git log -n 20 --pretty='%s|%an'").toString().trim()

    // Example: "Merge pull request #123 from feature/login|github-actions[bot]"
    const match = /Merge pull request #(\d+) from .+\|(.+)/m.exec(output)
    if (!match) {
      console.log(output)
      console.log(match)
      console.warn('⚠️ No merge commit found in latest entry.')
      return
    }

    const prNumber = match[1]
    const author = match[2]

    return { prNumber, author }
  } catch (error) {
    console.error('❌ Failed to extract merge metadata:', error)
  }
}

function injectMetadata(filePath: string, prUrl: string, authorTag: string): void {
  const content = fs.readFileSync(filePath, 'utf-8')
  if (content.includes(prUrl) && content.includes(authorTag)) {
    console.log(`✅ ${path.basename(filePath)} already contains metadata.`)
    return
  }

  const updated = `${content.trim()}\n\nRelated PR: [#${prUrl.split('/').pop()}](${prUrl})\nAuthor: ${authorTag}`
  fs.writeFileSync(filePath, updated)
  console.log(`📝 Injected metadata into ${path.basename(filePath)}`)
}

function main(): void {
  const files = getChangesetFiles()
  if (files.length === 0) {
    console.warn('⚠️ No changeset files found.')
    return
  }

  const repo = process.env.GITHUB_REPOSITORY ?? 'your-org/your-repo'
  const commitInfo = getLatestMergeMetadata()
  if (!commitInfo) {
    throw new Error('❌ Could not extract PR number and author.')
  }

  const prUrl = `https://github.com/${repo}/pull/${commitInfo.prNumber}`
  const authorTag = `@${commitInfo.author.replace(/\s+/g, '-').toLowerCase()}`

  for (const file of files) {
    const filePath = path.join(changesetDir, file)
    injectMetadata(filePath, prUrl, authorTag)
  }
}

main()
