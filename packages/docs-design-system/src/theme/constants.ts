/**
 * Theme synchronization constants and utilities
 * Used by both pre-initialization script and React components
 *
 * Re-exports theme utilities from the design token package for consistency.
 */

import {
  getThemeClassName as getTokenThemeClassName,
  getOppositeTheme,
  type ThemeName
} from '@designgreat/lib-web-ui-design-token'

export const DOCUSAURUS_THEME_ATTR = 'data-theme'

export type ThemeMode = ThemeName

/**
 * Get the CSS class name for a theme.
 * Wraps the design token utility with Docusaurus-specific handling for undefined.
 */
export function getThemeClassName(theme: ThemeMode | undefined): string {
  const safeTheme: ThemeName = theme ?? 'light'
  return getTokenThemeClassName(safeTheme)
}

/**
 * Get the CSS class name for the opposite theme.
 */
export function getOppositeThemeClassName(theme: ThemeMode | undefined): string {
  const safeTheme: ThemeName = theme ?? 'light'
  const oppositeTheme = getOppositeTheme(safeTheme)
  return getTokenThemeClassName(oppositeTheme)
}

