/**
 * Copy brand assets from lib-design-token to a destination directory
 */
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Find package root - works both in source (src/cli/lib/) and compiled (dist/cli/lib/)
const isInDist = __dirname.includes('/dist/')
const packageRoot = isInDist
  ? resolve(__dirname, '../../..') // dist/cli/lib/ → package root
  : resolve(__dirname, '../../..') // src/cli/lib/ → package root

const brandAssetsDir = resolve(packageRoot, 'dist/brand')

const assets = [{ src: 'logo.svg', dest: 'logo.svg' }]

/**
 * Copy brand assets to a destination directory
 * @param dest - Destination directory path (relative to cwd or absolute)
 */
export function copyBrandAssets(dest: string): void {
  const destDir = resolve(process.cwd(), dest)

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
}
