import { themes, type ThemeName } from './generated/themes.js'

export type TokenValidationError = {
  code: string
  message: string
  path: string[]
}

// Required keys under the 'dg' namespace
const REQUIRED_DG_KEYS = ['color', 'spacing', 'typography', 'shadow']

export function runTokenIntegrityChecks(): TokenValidationError[] {
  const errors: TokenValidationError[] = []

  const themeEntries = Object.entries(themes) as Array<[ThemeName, Record<string, unknown>]>

  if (themeEntries.length === 0) {
    errors.push({
      code: 'missing_theme',
      message: 'At least one theme must be defined',
      path: ['themes']
    })
    return errors
  }

  for (const [themeName, theme] of themeEntries) {
    if (!theme || typeof theme !== 'object') {
      errors.push({
        code: 'invalid_theme_shape',
        message: `Theme "${themeName}" must be an object`,
        path: ['themes', themeName]
      })
      continue
    }

    // Check for 'dg' namespace
    const dgNamespace = theme.dg
    if (!dgNamespace || typeof dgNamespace !== 'object') {
      errors.push({
        code: 'missing_dg_namespace',
        message: `Theme "${themeName}" is missing required "dg" namespace`,
        path: ['themes', themeName, 'dg']
      })
      continue
    }

    // Check required keys under dg namespace
    for (const key of REQUIRED_DG_KEYS) {
      if (!(key in (dgNamespace as Record<string, unknown>))) {
        errors.push({
          code: 'missing_theme_section',
          message: `Theme "${themeName}" is missing required section "dg.${key}"`,
          path: ['themes', themeName, 'dg', key]
        })
      }
    }

    const colorSection = (dgNamespace as Record<string, unknown>).color
    if (colorSection && typeof colorSection === 'object') {
      const colorKeys = Object.keys(colorSection as Record<string, unknown>)
      if (colorKeys.length === 0) {
        errors.push({
          code: 'empty_color_palette',
          message: `Theme "${themeName}" has an empty color palette`,
          path: ['themes', themeName, 'dg', 'color']
        })
      }
    }
  }

  return errors
}

export function assertTokenIntegrity(): void {
  const errors = runTokenIntegrityChecks()

  if (errors.length > 0) {
    const details = errors
      .map((error) => `• [${error.code}] ${error.message} (${error.path.join('.')})`)
      .join('\n')

    throw new Error(`Design token integrity failed:\n${details}`)
  }
}
