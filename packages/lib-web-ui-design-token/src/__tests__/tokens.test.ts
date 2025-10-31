import { describe, expect, it } from 'vitest'

import {
  DEFAULT_THEME,
  createTheme,
  designTokens,
  getThemeTokens,
  listThemeNames
} from '../index.js'
import { assertTokenIntegrity, runTokenIntegrityChecks } from '../validation.js'

describe('design tokens public api', () => {
  it('exposes light and dark theme dictionaries', () => {
    expect(designTokens.themes.light.color.accent.blue.DEFAULT).toBe('#0055cc')
    expect(designTokens.themes.dark.color.accent.blue.DEFAULT).toBe('#599eff')
  })

  it('lists available themes in a frozen array', () => {
    const themeNames = listThemeNames()

    expect([...themeNames].sort()).toEqual(['dark', 'light'])
    expect(Object.isFrozen(themeNames)).toBe(true)
  })

  it('returns a defensive copy when creating a theme', () => {
    const theme = createTheme(DEFAULT_THEME)

    expect(theme).not.toBe(getThemeTokens(DEFAULT_THEME))
    expect(theme).not.toBe(getThemeTokens(DEFAULT_THEME))
    expect(theme.color).not.toBe(getThemeTokens(DEFAULT_THEME).color)
    expect(theme.color.accent.blue.DEFAULT).toBe('#0055cc')
  })

  it('allows overriding nested properties when creating a theme', () => {
    const theme = createTheme(DEFAULT_THEME, {
      color: {
        background: {
          DEFAULT: '#f0f0f0'
        }
      }
    })

    expect(theme.color.background.DEFAULT).toBe('#f0f0f0')
    expect(getThemeTokens(DEFAULT_THEME).color.background.DEFAULT).toBe('#1d1d1f')
  })

  it('throws when requesting an unknown theme', () => {
    expect(() => createTheme('unknown' as never)).toThrowError(
      'Theme "unknown" is not registered in design tokens'
    )
  })
})

describe('token validation', () => {
  it('returns no validation errors for the current token set', () => {
    expect(runTokenIntegrityChecks()).toHaveLength(0)
  })

  it('assertion helper passes for a valid token set', () => {
    expect(() => { assertTokenIntegrity() }).not.toThrow()
  })
})
