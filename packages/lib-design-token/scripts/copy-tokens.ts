import { cp, mkdir, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageRoot = resolve(__dirname, '..')

// Token sources
const tokenSourceDir = resolve(packageRoot, 'src/tokens')
const tokenDestDir = resolve(packageRoot, 'dist/tokens')

// Brand assets
const brandSourceDir = resolve(packageRoot, 'assets/brand')
const brandDestDir = resolve(packageRoot, 'dist/brand')

async function copyTokens(): Promise<void> {
  // Copy token sources
  await rm(tokenDestDir, { recursive: true, force: true })
  await mkdir(tokenDestDir, { recursive: true })
  await cp(tokenSourceDir, tokenDestDir, { recursive: true })

  // Copy brand assets
  await rm(brandDestDir, { recursive: true, force: true })
  await mkdir(brandDestDir, { recursive: true })
  await cp(brandSourceDir, brandDestDir, { recursive: true })
  console.log('✓ Brand assets copied to dist/brand/')
}

copyTokens().catch((error: unknown) => {
  console.error('[copy:tokens] Failed to copy assets:', error)
  process.exitCode = 1
})

