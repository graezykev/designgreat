import {
  DEFAULT_THEME,
  createTheme,
  designTokens,
  getThemeTokens,
  listThemeNames,
  type DesignTokens,
  type ThemeName,
  type ThemeOverrides,
  type ThemeToken
} from '@designgreat/lib-web-ui-design-token'

const DEFAULT_PREFIX = 'dg'

export type { DesignTokens, ThemeName, ThemeOverrides, ThemeToken }
export { DEFAULT_THEME, createTheme, designTokens, getThemeTokens, listThemeNames }

export type CssVariableOptions = {
  prefix?: string
}

export type ThemeConfigOptions<Name extends ThemeName = ThemeName> = CssVariableOptions & {
  selector?: string
  overrides?: ThemeOverrides<Name>
}

export type ThemeConfig<Name extends ThemeName = ThemeName> = {
  name: Name
  className: string
  selector: string
  tokens: ThemeToken<Name>
  cssVariables: Record<string, string>
}

export type ThemeStylesOptions<Name extends ThemeName = ThemeName> = ThemeConfigOptions<Name> & {
  indent?: number
}

export function getThemeClassName(themeName: ThemeName, options?: CssVariableOptions): string {
  const prefix = options?.prefix ?? DEFAULT_PREFIX
  return `${prefix}-theme-${normalizeSegment(String(themeName))}`
}

export function createCssVariableMap(
  theme: ThemeToken,
  options?: CssVariableOptions
): Record<string, string> {
  const prefix = options?.prefix ?? DEFAULT_PREFIX
  const variables: Record<string, string> = {}

  walkTheme(theme, [], (path, value) => {
    if (!isCssPrimitive(value)) {
      return
    }

    const segments = path.map(normalizeSegment)
    const name = `--${prefix}-${segments.join('-')}`
    variables[name] = String(value)
  })

  return variables
}

export function createThemeConfig<Name extends ThemeName>(
  themeName: Name,
  options?: ThemeConfigOptions<Name>
): ThemeConfig<Name> {
  const prefix = options?.prefix ?? DEFAULT_PREFIX
  const className = getThemeClassName(themeName, { prefix })
  const tokens = createTheme(themeName, options?.overrides)
  const cssVariables = createCssVariableMap(tokens, { prefix })
  const selector = options?.selector ?? `.${className}`

  return {
    name: themeName,
    className,
    selector,
    tokens,
    cssVariables
  }
}

export function createThemeStyles<Name extends ThemeName>(
  themeName: Name,
  options?: ThemeStylesOptions<Name>
): string {
  const { indent = 2, ...configOptions } = options ?? {}
  const config = createThemeConfig(themeName, configOptions)
  const padding = ' '.repeat(indent)

  const declarations = Object.entries(config.cssVariables)
    .map(([name, value]) => `${padding}${name}: ${value};`)
    .join('\n')

  return `${config.selector} {\n${declarations}\n}`
}

export type ThemeStylesheetOptions = ThemeStylesOptions & {
  joiner?: string
}

export function createAllThemeStyles(
  options?: ThemeStylesheetOptions
): string {
  const { joiner = '\n\n', ...rest } = options ?? {}

  return listThemeNames()
    .map((themeName: ThemeName) => createThemeStyles(themeName, rest))
    .join(joiner)
}

type ThemeVisitor = (path: string[], value: unknown) => void

function walkTheme(node: unknown, path: string[], visit: ThemeVisitor): void {
  if (node === null || node === undefined) {
    return
  }

  if (typeof node !== 'object' || Array.isArray(node)) {
    visit(path, node)
    return
  }

  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    walkTheme(value, [...path, key], visit)
  }
}

function normalizeSegment(segment: string): string {
  return segment
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase()
}

function isCssPrimitive(value: unknown): value is string | number | boolean {
  return ['string', 'number', 'boolean'].includes(typeof value)
}
