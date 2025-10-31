import { cp, mkdir, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageRoot = resolve(__dirname, '..')
const sourceDir = resolve(packageRoot, 'src/tokens')
const destinationDir = resolve(packageRoot, 'dist/tokens')

async function copyTokens() {
  await rm(destinationDir, { recursive: true, force: true })
  await mkdir(destinationDir, { recursive: true })
  await cp(sourceDir, destinationDir, { recursive: true })
}

copyTokens().catch((error) => {
  console.error('[copy:tokens] Failed to copy token sources:', error)
  process.exitCode = 1
})
