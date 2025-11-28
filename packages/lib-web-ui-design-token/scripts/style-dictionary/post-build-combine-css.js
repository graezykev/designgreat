import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageRoot = resolve(__dirname, '..', '..')
const distRoot = resolve(packageRoot, 'dist')

const fileHeader = '/**\n * Do not edit directly, this file was auto-generated.\n * Combined light and dark themes.\n */\n\n'

// Read light and dark CSS files
const lightCss = await readFile(resolve(distRoot, 'css/light/variables.css'), 'utf8')
const darkCss = await readFile(resolve(distRoot, 'css/dark/variables.css'), 'utf8')

// Remove duplicate headers
const lightClean = lightCss.replace(/^\/\*\*[\s\S]*?\*\/\n\n/, '')
const darkClean = darkCss.replace(/^\/\*\*[\s\S]*?\*\/\n\n/, '')

// Combine with single header
const combined = `${fileHeader}${lightClean}\n${darkClean}`

// Write combined file
await writeFile(resolve(distRoot, 'css/combined.css'), combined, 'utf8')

console.log('✓ Combined CSS generated at dist/css/combined.css')

