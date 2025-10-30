import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const changesetDir = path.resolve(__dirname, '..', '.changeset')

function getChangesetFiles(): string[] {
  if (!fs.existsSync(changesetDir)) return []
  return fs.readdirSync(changesetDir).filter(file => file.endsWith('.md'))
}

function getLastMergeCommit(): { prNumber: string; author: string } | undefined {
  try {
    const log = execSync('git log -2 --pretty=format:%s|%an').toString()
    const match = /Merge pull request #(\d+) from .+\|(.+)/m.exec(log)
    if (!match) return
    return {
      prNumber: match[1],
      author: match[2]
    }
  } catch (error) {
    console.warn('⚠️ Failed to parse last merge commit.')
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
    console.log('✅ No changeset files found.')
    return
  }

  const repo = process.env.GITHUB_REPOSITORY ?? 'your-org/your-repo'
  const commitInfo = getLastMergeCommit()
  if (!commitInfo) {
    console.warn('⚠️ Could not extract PR number and author.')
    return
  }

  const prUrl = `https://github.com/${repo}/pull/${commitInfo.prNumber}`
  const authorTag = `@${commitInfo.author.replace(/\s+/g, '-').toLowerCase()}`

  for (const file of files) {
    const filePath = path.join(changesetDir, file)
    injectMetadata(filePath, prUrl, authorTag)
  }
}

main()
