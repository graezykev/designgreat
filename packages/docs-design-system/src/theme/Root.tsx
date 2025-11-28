import { useEffect } from 'react'
import type { ReactNode } from 'react'

import {
  DOCUSAURUS_THEME_ATTR,
  getOppositeThemeClassName,
  getThemeClassName,
  type ThemeMode
} from './constants'

type RootProps = {
  readonly children: ReactNode
}

/**
 * Root component to sync Docusaurus theme with design token theme classes.
 * Docusaurus uses [data-theme='dark'] attribute, lib-web-ui uses .dg-theme-dark class.
 */
export default function Root({ children }: RootProps): ReactNode {
  useEffect(() => {
    const html = document.documentElement

    const syncThemeClass = (): void => {
      const theme = html.getAttribute(DOCUSAURUS_THEME_ATTR) as ThemeMode | undefined
      const targetClass = getThemeClassName(theme)
      const oppositeClass = getOppositeThemeClassName(theme)

      // Remove opposite theme class (if not empty)
      if (oppositeClass) {
        html.classList.remove(oppositeClass)
      }

      // Add target class if not present (and not empty - light theme uses :root)
      if (targetClass && !html.classList.contains(targetClass)) {
        html.classList.add(targetClass)

        if (process.env.NODE_ENV === 'development') {
          console.debug('[Theme Root]', { action: 'added', class: targetClass })
        }
      }
    }

    // Initial sync on mount
    syncThemeClass()

    // Watch for attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type !== 'attributes') return

        const { attributeName } = mutation

        if (attributeName === DOCUSAURUS_THEME_ATTR) {
          syncThemeClass()
        } else if (attributeName === 'class') {
          const theme = html.getAttribute(DOCUSAURUS_THEME_ATTR) as ThemeMode | undefined
          const targetClass = getThemeClassName(theme)

          // Only restore if targetClass is not empty (light theme uses :root, no class needed)
          if (targetClass && !html.classList.contains(targetClass)) {
            if (process.env.NODE_ENV === 'development') {
              console.debug('[Theme Root]', { action: 'restored', class: targetClass })
            }

            syncThemeClass()
          }
        }
      })
    })

    observer.observe(html, {
      attributes: true,
      attributeFilter: [DOCUSAURUS_THEME_ATTR, 'class']
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return children
}

