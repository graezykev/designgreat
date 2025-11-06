import { createThemeConfig, getThemeClassName } from '@designgreat/design-token-support'
import type { Decorator, Preview } from '@storybook/react'
import { useEffect } from 'react'

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
    const targets = [document.documentElement, document.body]

    for (const target of targets) {
      target.classList.remove(...classNames)
      target.classList.add(theme.className)
    }
  }, [theme])

  return (
    <div
      className={`${theme.className} min-h-screen bg-[var(--dg-color-background-default)] text-[var(--dg-color-text-default)]`}
    >
      <Story />
    </div>
  )
}

const preview: Preview = {
  parameters: {
    layout: 'centered',
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
