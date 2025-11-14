import { createThemeStyles, getThemeClassName, listThemeNames } from '@designgreat/design-token-support'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { format, resolveConfig } from 'prettier'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

async function ensureThemeStyles(): Promise<void> {
  const stylesDir = path.resolve(dirname, '../src/styles')
  await mkdir(stylesDir, { recursive: true })

  const layers = listThemeNames().map((theme) => {
    const selector = theme === 'light' ? ':root' : `.${getThemeClassName(theme)}`
    const raw = createThemeStyles(theme, { selector, indent: 2 })
    return raw.replace(/url\((['"])\/assets\/logo\.png\1\)/g, 'none')
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

  const outputPath = path.join(stylesDir, 'designgreat-theme.css')
  // const fileContents = `@layer base {\n${indentedLayers}\n}\n`
  const fileContents = `${indentedLayers}\n`
  const prettierConfig = await resolveConfig(outputPath)
  const formattedContents = await format(fileContents, {
    ...(prettierConfig ?? {}),
    filepath: outputPath
  })

  await writeFile(outputPath, formattedContents, 'utf8')
}

void ensureThemeStyles()
