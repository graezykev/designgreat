import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageRoot = resolve(__dirname, '..', '..')
const packageJsonPath = resolve(packageRoot, 'package.json')
const requireFromPackage = createRequire(packageJsonPath)

export async function loadStyleDictionary() {
  const modulePath = resolveStyleDictionaryModule('style-dictionary')
  const moduleUrl = pathToFileURL(modulePath).href
  const imported = await import(moduleUrl)
  return imported.default ?? imported
}

/**
 * @param {string} specifier
 * @returns {string}
 */
export function resolveStyleDictionaryModule(specifier) {
  try {
    return String(requireFromPackage.resolve(specifier))
  } catch (error) {
    throw new Error(
      `Failed to resolve "${specifier}". Ensure it is declared in @designgreat/lib-design-token/package.json.\nOriginal error: ${
        error instanceof Error ? error.message : String(error)
      }`
    )
  }
}
