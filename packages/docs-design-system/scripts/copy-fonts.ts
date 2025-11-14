import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fontSource = resolve(
  __dirname,
  '../node_modules/@designgreat/lib-web-ui-design-token/dist/font'
)
const staticDir = resolve(__dirname, '../static')
const fontTarget = resolve(staticDir, 'font')

async function copyFonts(): Promise<void> {
  if (!existsSync(staticDir)) {
    mkdirSync(staticDir, { recursive: true })
  }

  // Copy entire font directory (includes font-face.css and all font files)
  try {
    cpSync(fontSource, fontTarget, { recursive: true })
    console.log('✓ Font directory copied to static/font/')
  } catch (error) {
    console.warn('⚠ Could not copy fonts:', error instanceof Error ? error.message : String(error))
    console.warn('  Fonts may not be available at runtime')
  }
}

void copyFonts()

