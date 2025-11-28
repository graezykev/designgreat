/**
 * Pre-initialization theme synchronization
 *
 * Runs immediately when the script loads, before React hydrates.
 * Ensures design token theme classes are applied on page load and
 * prevents flash of unstyled content.
 *
 * This is a Docusaurus client module.
 */

import {
  DOCUSAURUS_THEME_ATTR,
  getOppositeThemeClassName,
  getThemeClassName,
  type ThemeMode
} from './constants'

function initializeThemeSync(): void {
  if (typeof window === 'undefined') return

  const html = document.documentElement

  function syncThemeClass(): void {
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
        console.debug('[Theme Pre-init]', { action: 'added', class: targetClass })
      }
    }
  }

  // Initial sync
  syncThemeClass()

  // Sync after DOM ready (in case data-theme isn't set initially)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncThemeClass)
  }

  // Watch for both data-theme and class attribute changes
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
            console.debug('[Theme Pre-init]', { action: 'restored', class: targetClass })
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

  if (process.env.NODE_ENV === 'development') {
    console.debug('[Theme Pre-init] Initialized')
  }
}

// Execute immediately
initializeThemeSync()

