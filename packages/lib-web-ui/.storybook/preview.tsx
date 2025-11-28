import {
  applyTheme,
  getThemeClassName,
  type ThemeName
} from '@designgreat/lib-web-ui-design-token'
import '@designgreat/lib-web-ui-design-token/font'
import type { Decorator, Preview } from '@storybook/react'
import { useEffect } from 'react'

import '../src/styles/index.css'

/**
 * Storybook Preview Configuration
 *
 * Import chain:
 * 1. Fonts (optional for Storybook preview, not bundled in lib)
 * 2. Library styles (tokens + Tailwind + components)
 */

const THEMES = {
  light: { className: getThemeClassName('light') },
  dark: { className: getThemeClassName('dark') }
} as const

const ThemeDecorator: Decorator = (Story, context) => {
  const themeName = (context.globals.theme as ThemeName) ?? 'light'
  const theme = THEMES[themeName] ?? THEMES.light
  const themeClassName: string = theme.className

  useEffect(() => {
    const html = document.documentElement
    const { body } = document
    const root = document.getElementById('storybook-root')
    const main = document.querySelector<HTMLElement>('.sb-show-main')

    // Apply theme using the centralized utility
    applyTheme(html, themeName)
    applyTheme(body, themeName)

    for (const target of [html, body]) {
      target.style.height = '100%'
      target.style.overflow = 'hidden'
      target.style.margin = '0'
      target.style.padding = '0'
      target.style.fontFamily = 'var(--dg-font-family-primary, Roboto), -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif'
    }

    if (root) {
      root.style.height = '100%'
      root.style.overflow = 'hidden'
      root.style.margin = '0'
      root.style.padding = '0'
    }

    if (main) {
      main.style.padding = '0'
      main.style.margin = '0'
    }

    return () => {
      for (const target of [html, body]) {
        target.style.height = ''
        target.style.overflow = ''
        target.style.margin = ''
        target.style.padding = ''
        target.style.fontFamily = ''
      }

      if (root) {
        root.style.height = ''
        root.style.overflow = ''
        root.style.margin = ''
        root.style.padding = ''
      }

      if (main) {
        main.style.padding = ''
        main.style.margin = ''
      }
    }
  }, [themeName, themeClassName])

  return (
    <div
      className={`${themeClassName} min-h-screen bg-[var(--dg-color-background-default)] text-[var(--dg-color-text-default)] overflow-hidden`}
    >
      <Story />
    </div>
  )
}

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true
    },
    a11y: {
      element: '#storybook-root'
    },
    backgrounds: {
      default: 'transparent'
    }
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Active design system theme',
      defaultValue: 'light',
      toolbar: {
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' }
        ]
      }
    }
  },
  decorators: [ThemeDecorator]
}

export default preview
