/**
 * Copy all assets (brand + fonts) from lib-design-token to a destination directory
 */
import { copyBrandAssets } from './copy-brand-assets.js'
import { copyFonts } from './copy-fonts.js'

/**
 * Copy all assets to a destination directory
 * @param dest - Destination directory path (relative to cwd or absolute)
 */
export function copyAll(dest: string): void {
  console.log('📦 Copying all design token assets...\n')

  copyBrandAssets(dest)
  console.log('')
  copyFonts(dest)

  console.log('\n✓ All assets copied successfully')
}

