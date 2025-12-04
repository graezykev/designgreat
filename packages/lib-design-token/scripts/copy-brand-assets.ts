/**
 * Copy brand assets from lib-design-token to a destination directory
 *
 * Usage:
 *   tsx copy-brand-assets.ts <destination-dir>
 *
 * Example:
 *   tsx copy-brand-assets.ts ../lib-web-component/public
 *   tsx copy-brand-assets.ts ../docs-design-system/static/img
 *
 * Future: This could become a CLI tool exported from @designgreat/lib-design-token
 */
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageRoot = resolve(__dirname, '..')
const brandAssetsDir = resolve(packageRoot, 'dist/brand')

// Get destination from CLI argument
const destArg = process.argv[2]

if (!destArg) {
  console.error('Usage: tsx copy-brand-assets.ts <destination-dir>')
  console.error('Example: tsx copy-brand-assets.ts ../lib-web-component/public')
  process.exit(1)
}

const destDir = resolve(process.cwd(), destArg)

const assets = [{ src: 'logo.svg', dest: 'logo.svg' }]

// Ensure destination directory exists
mkdirSync(destDir, { recursive: true })

// Copy assets
for (const asset of assets) {
  const srcPath = resolve(brandAssetsDir, asset.src)
  const destPath = resolve(destDir, asset.dest)

  try {
    copyFileSync(srcPath, destPath)
    console.log(`✓ Copied ${asset.src} → ${destPath}`)
  } catch (error) {
    console.error(`✗ Failed to copy ${asset.src}:`, error)
    process.exit(1)
  }
}

console.log(`✓ Brand assets copied to ${destDir}`)
