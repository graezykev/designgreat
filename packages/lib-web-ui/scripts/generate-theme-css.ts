import { createThemeStyles, getThemeClassName, listThemeNames } from '@designgreat/design-token-support'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

async function ensureThemeStyles(): Promise<void> {
  const stylesDir = path.resolve(dirname, '../src/styles')
  await mkdir(stylesDir, { recursive: true })

  const layers = listThemeNames().map((theme) => {
    const selector = theme === 'light' ? ':root' : `.${getThemeClassName(theme)}`
    return createThemeStyles(theme, { selector, indent: 2 })
  })

  const indentation = '  '
  const indentedLayers = layers
    .map((layer) =>
      layer
        .split('\n')
        .map((line) => (line.length > 0 ? `${indentation}${line}` : line))
        .join('\n')
    )
    .join('\n\n')

  const fileContents = `@layer base {\n${indentedLayers}\n}\n`
  const outputPath = path.join(stylesDir, 'designgreat-theme.css')

  await writeFile(outputPath, fileContents, 'utf8')
}

void ensureThemeStyles()
