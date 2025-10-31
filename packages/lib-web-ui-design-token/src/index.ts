import { dark, light, themes, type ThemeName } from './generated/themes.js'
import { assertTokenIntegrity, runTokenIntegrityChecks } from './validation.js'

export { light, dark, themes, assertTokenIntegrity, runTokenIntegrityChecks }
export type { ThemeName } from './generated/themes.js'
export type { TokenValidationError } from './validation.js'

export type ThemeToken<Name extends ThemeName = ThemeName> = typeof themes[Name]

export const DEFAULT_THEME: ThemeName = 'light'

export const designTokens = {
  themes
} as const

export type DesignTokens = typeof designTokens

export type ThemeOverrides<Name extends ThemeName = ThemeName> = DeepPartial<ThemeToken<Name>>

const THEME_NAMES = Object.freeze(
  (Object.keys(themes) as ThemeName[]).slice().sort()
)

export function listThemeNames(): readonly ThemeName[] {
  return THEME_NAMES
}

export function getThemeTokens<Name extends ThemeName>(name: Name): ThemeToken<Name> {
  return themes[name]
}

export function createTheme<Name extends ThemeName>(
  name: Name,
  overrides?: ThemeOverrides<Name>
): ThemeToken<Name> {
  const baseTheme = themes[name]

  if (!baseTheme) {
    throw new Error(`Theme "${name}" is not registered in design tokens`)
  }

  return deepMergeTokens(baseTheme, overrides)
}

type DeepPartial<T> = {
  [Key in keyof T]?:
    T[Key] extends Record<string, unknown>
      ? DeepPartial<T[Key]>
      : T[Key] | PrimitiveOverride<T[Key]>
}

type PrimitiveOverride<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T

function deepMergeTokens<T>(base: T, overrides?: DeepPartial<T>): T {
  const cloned = cloneValue(base)

  if (!overrides) {
    return cloned
  }

  for (const [key, value] of Object.entries(overrides) as Array<[keyof T, T[keyof T]]>) {
    if (value === undefined) {
      continue
    }

    const clonedValue = (cloned as Record<keyof T, unknown>)[key]

    if (isRecord(clonedValue) && isRecord(value)) {
      (cloned as Record<keyof T, unknown>)[key] = deepMergeTokens(
        clonedValue,
        value as DeepPartial<Record<string, unknown>>
      ) as unknown as T[keyof T]
    } else {
      (cloned as Record<keyof T, unknown>)[key] = value as unknown
    }
  }

  return cloned
}

function cloneValue<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cloneValue(item)) as unknown as T
  }

  if (isRecord(value)) {
    const result: Record<string, unknown> = {}

    for (const [nestedKey, nestedValue] of Object.entries(value)) {
      result[nestedKey] = cloneValue(nestedValue)
    }

    return result as T
  }

  return value
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
