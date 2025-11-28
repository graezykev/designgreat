import { THEME_CLASSES, light } from '@designgreat/lib-web-ui-design-token'
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

type TailwindPluginApi = {
  addVariant: (
    name: string,
    definition: string | string[] | (() => string) | Array<() => string>
  ) => void
}

// Access tokens via dg namespace
const colorUtilities = flattenColorVars(light.dg.color, ['color'])
const spacingScale = flattenTokenValues(light.dg.spacing, ['spacing'])
const fontSizeScale = flattenTokenValues(light.dg.size?.font ?? {}, ['size', 'font'])
const fontFamilyScale = flattenTokenValues(light.dg['font-family'] ?? {}, ['font-family'])
const fontWeightScale = flattenTokenValues(light.dg['font-weight'] ?? {}, ['font-weight'])
const lineHeightScale = flattenTokenValues(light.dg.number?.['line-height'] ?? {}, ['number', 'line-height'])
const letterSpacingScale = flattenTokenValues(light.dg['letter-spacing'] ?? {}, ['letter-spacing'])

const addThemeVariant = ({ addVariant }: TailwindPluginApi): void => {
  addVariant('theme-dark', `&:where(.${THEME_CLASSES.dark} &)` as const)
}

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx,mdx}',
    '../../docs/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: colorUtilities,
      spacing: spacingScale,
      fontSize: fontSizeScale,
      fontFamily: fontFamilyScale,
      fontWeight: fontWeightScale,
      lineHeight: lineHeightScale,
      letterSpacing: letterSpacingScale
    }
  },
  plugins: [plugin(addThemeVariant)]
}

export default config

type TokenNode = Record<string, unknown>

function flattenColorVars(node: TokenNode | undefined, path: string[] = []): Record<string, string> {
  if (!node) {
    return {}
  }

  const result: Record<string, string> = {}

  for (const [key, value] of Object.entries(node)) {
    const nextPath = [...path, key]
    const resolved = resolveColorValue(value, nextPath)

    if (resolved !== undefined) {
      const slug = toKebabCase(nextPath.join('-'))
      result[slug] = resolved
      continue
    }

    if (value && typeof value === 'object') {
      Object.assign(result, flattenColorVars(value as TokenNode, nextPath))
    }
  }

  return result
}

function flattenTokenValues(node: TokenNode | undefined, path: string[] = []): Record<string, string> {
  if (!node) {
    return {}
  }

  const result: Record<string, string> = {}

  for (const [key, value] of Object.entries(node)) {
    const nextPath = [...path, key]
    const resolved = resolveTokenValue(value)

    if (resolved !== undefined) {
      const slug = toKebabCase(nextPath.join('-'))
      result[slug] = resolved
      continue
    }

    if (value && typeof value === 'object') {
      Object.assign(result, flattenTokenValues(value as TokenNode, nextPath))
    }
  }

  return result
}

function resolveColorValue(value: unknown, path: string[]): string | undefined {
  if (typeof value === 'string') {
    return `var(--dg-${toKebabCase(path.join('-'))})`
  }

  if (value && typeof value === 'object' && 'value' in (value as Record<string, unknown>)) {
    const raw = (value as { value: unknown }).value
    if (typeof raw === 'string') {
      return `var(--dg-${toKebabCase(path.join('-'))})`
    }
  }

  return undefined
}

function resolveTokenValue(value: unknown): string | undefined {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value)
  }

  if (value && typeof value === 'object' && 'value' in (value as Record<string, unknown>)) {
    const raw = (value as { value: unknown }).value
    if (typeof raw === 'string' || typeof raw === 'number') {
      return String(raw)
    }
  }

  return undefined
}

function toKebabCase(input: string): string {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .replace(/\./g, '-')
    .toLowerCase()
}
