import { createThemeConfig, getThemeClassName } from '@designgreat/design-token-support'
import type { Decorator, Preview } from '@storybook/react'
import { useEffect } from 'react'

// Import font-face definitions for Storybook
import '@designgreat/lib-web-ui-design-token/font'
import '../src/styles/tailwind.css'

const LIGHT_THEME = createThemeConfig('light', { selector: ':root' })
const DARK_THEME = createThemeConfig('dark', {
  selector: `.${getThemeClassName('dark')}`
})

const THEMES = {
  light: LIGHT_THEME,
  dark: DARK_THEME
} as const

const ThemeDecorator: Decorator = (Story, context) => {
  const themeName = (context.globals.theme as keyof typeof THEMES) ?? 'light'
  const theme = THEMES[themeName] ?? LIGHT_THEME

  useEffect(() => {
    const classNames = Object.values(THEMES).map(({ className }) => className)

    const html = document.documentElement
    const { body } = document
    const root = document.getElementById('storybook-root')
    const main = document.querySelector<HTMLElement>('.sb-show-main')

    for (const target of [html, body]) {
      target.classList.remove(...classNames)
      target.classList.add(theme.className)
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
  }, [theme])

  return (
    <div
      className={`${theme.className} min-h-screen bg-[var(--dg-color-background-default)] text-[var(--dg-color-text-default)] overflow-hidden`}
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
