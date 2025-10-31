import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import getStyleDictionaryConfig from './config.js'
import { loadStyleDictionary } from './load-style-dictionary.js'

const themes = ['light', 'dark']

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageRoot = resolve(__dirname, '..', '..')
const distRoot = resolve(packageRoot, 'dist')

await mkdir(distRoot, { recursive: true })

const StyleDictionary = await loadStyleDictionary()

for (const theme of themes) {
  const config = getStyleDictionaryConfig(theme, StyleDictionary)
  const sd = new StyleDictionary(config)
  // Sequential builds ensure deterministic output ordering and avoid race conditions.
  // eslint-disable-next-line no-await-in-loop
  await sd.buildAllPlatforms()
}
