/**
 * Theme utility functions and constants for design tokens.
 * Provides a single source of truth for theme class names and selectors.
 */

import type { ThemeName } from './generated/themes.js'

/**
 * Prefix used for theme class names.
 * @example 'dg-theme' results in classes like 'dg-theme-dark'
 */
export const THEME_CLASS_PREFIX = 'dg-theme'

/**
 * CSS selector used for light theme (default theme).
 * Light theme variables are applied at the :root level.
 */
export const LIGHT_THEME_SELECTOR = ':root'

/**
 * Theme class names for each theme.
 * Light theme uses :root (no class needed), dark theme uses .dg-theme-dark
 */
export const THEME_CLASSES = {
  light: '',
  dark: `${THEME_CLASS_PREFIX}-dark`
} as const satisfies Record<ThemeName, string>

/**
 * CSS selectors for each theme.
 * Used when generating CSS or applying theme styles.
 */
export const THEME_SELECTORS = {
  light: LIGHT_THEME_SELECTOR,
  dark: `.${THEME_CLASSES.dark}`
} as const satisfies Record<ThemeName, string>

/**
 * Get the CSS class name for a theme.
 * Light theme returns empty string (uses :root), dark theme returns 'dg-theme-dark'.
 *
 * @param theme - The theme name ('light' or 'dark')
 * @returns The CSS class name for the theme (empty string for light)
 *
 * @example
 * ```ts
 * getThemeClassName('dark') // 'dg-theme-dark'
 * getThemeClassName('light') // ''
 *
 * // Apply theme to document
 * const className = getThemeClassName('dark')
 * if (className) {
 *   document.documentElement.classList.add(className)
 * }
 * ```
 */
export function getThemeClassName(theme: ThemeName): string {
  return THEME_CLASSES[theme]
}

/**
 * Get the CSS selector for a theme.
 * Light theme returns ':root', dark theme returns '.dg-theme-dark'.
 *
 * @param theme - The theme name ('light' or 'dark')
 * @returns The CSS selector for the theme
 *
 * @example
 * ```ts
 * getThemeSelector('light') // ':root'
 * getThemeSelector('dark') // '.dg-theme-dark'
 * ```
 */
export function getThemeSelector(theme: ThemeName): string {
  return THEME_SELECTORS[theme]
}

/**
 * Get the opposite theme name.
 *
 * @param theme - The current theme name
 * @returns The opposite theme name
 *
 * @example
 * ```ts
 * getOppositeTheme('light') // 'dark'
 * getOppositeTheme('dark') // 'light'
 * ```
 */
export function getOppositeTheme(theme: ThemeName): ThemeName {
  return theme === 'dark' ? 'light' : 'dark'
}

/**
 * Check if a theme class name is applied to an element.
 *
 * @param element - The element to check
 * @param theme - The theme to check for
 * @returns True if the theme class is applied (or if checking light theme and no dark class)
 *
 * @example
 * ```ts
 * isThemeApplied(document.documentElement, 'dark') // true if .dg-theme-dark is present
 * isThemeApplied(document.documentElement, 'light') // true if .dg-theme-dark is NOT present
 * ```
 */
export function isThemeApplied(element: Element, theme: ThemeName): boolean {
  const darkClass = THEME_CLASSES.dark
  const hasDarkClass = element.classList.contains(darkClass)

  return theme === 'dark' ? hasDarkClass : !hasDarkClass
}

/**
 * Apply a theme to an element by adding/removing theme classes.
 *
 * @param element - The element to apply the theme to (usually document.documentElement)
 * @param theme - The theme to apply
 *
 * @example
 * ```ts
 * applyTheme(document.documentElement, 'dark')
 * applyTheme(document.documentElement, 'light')
 * ```
 */
export function applyTheme(element: Element, theme: ThemeName): void {
  const darkClass = THEME_CLASSES.dark

  if (theme === 'dark') {
    element.classList.add(darkClass)
  } else {
    element.classList.remove(darkClass)
  }
}

