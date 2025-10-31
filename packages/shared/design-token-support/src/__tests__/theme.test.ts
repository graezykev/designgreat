import { describe, expect, it } from 'vitest'

import {
  DEFAULT_THEME,
  createAllThemeStyles,
  createCssVariableMap,
  createThemeConfig,
  createThemeStyles,
  getThemeClassName,
  listThemeNames
} from '../theme.js'

describe('theme helpers', () => {
  it('creates predictable theme class names', () => {
    expect(getThemeClassName('light')).toBe('dg-theme-light')
    expect(getThemeClassName('dark', { prefix: 'acme' })).toBe('acme-theme-dark')
  })

  it('flattens theme tokens into CSS variable map', () => {
    const variables = createCssVariableMap(createThemeConfig(DEFAULT_THEME).tokens)

    expect(variables['--dg-color-accent-blue-default']).toBe('#0055cc')
    expect(variables['--dg-spacing-4']).toBe('0.25rem')
  })

  it('creates theme configuration with selector and overrides', () => {
    const config = createThemeConfig('light', {
      prefix: 'acme',
      selector: '[data-theme="light"]',
      overrides: {
        color: {
          background: {
            DEFAULT: '#FCFCFC'
          }
        }
      }
    })

    expect(config.className).toBe('acme-theme-light')
    expect(config.selector).toBe('[data-theme="light"]')
    expect(config.tokens.color.background.DEFAULT).toBe('#FCFCFC')
    expect(config.cssVariables['--acme-color-background-default']).toBe('#FCFCFC')
  })

  it('serializes theme styles with indentation', () => {
    const styles = createThemeStyles(DEFAULT_THEME, { indent: 4 })

    expect(styles).toContain('.dg-theme-light {')
    expect(styles).toContain('    --dg-color-accent-blue-default: #0055cc;')
    expect(styles.trim().endsWith('}')).toBe(true)
  })

  it('serializes all themes into a stylesheet fragment', () => {
    const styles = createAllThemeStyles()

    for (const themeName of listThemeNames()) {
      expect(styles).toContain(`dg-theme-${themeName}`)
    }
  })
})
