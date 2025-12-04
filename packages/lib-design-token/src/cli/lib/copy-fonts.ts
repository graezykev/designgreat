/**
 * Copy font assets from lib-design-token to a destination directory
 */
import { cpSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Find package root - works both in source (src/cli/lib/) and compiled (dist/cli/lib/)
const isInDist = __dirname.includes('/dist/')
const packageRoot = isInDist
  ? resolve(__dirname, '../../..') // dist/cli/lib/ → package root
  : resolve(__dirname, '../../..') // src/cli/lib/ → package root

const fontAssetsDir = resolve(packageRoot, 'dist/font')

/**
 * Copy font assets to a destination directory
 * @param dest - Destination directory path (relative to cwd or absolute)
 */
export function copyFonts(dest: string): void {
  const destDir = resolve(process.cwd(), dest)

  // Ensure destination directory exists
  mkdirSync(destDir, { recursive: true })

  // Copy entire font directory (includes font-face.css and all font files)
  try {
    cpSync(fontAssetsDir, destDir, { recursive: true })
    console.log(`✓ Font assets copied to ${destDir}`)
  } catch (error) {
    console.error('✗ Failed to copy fonts:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}
