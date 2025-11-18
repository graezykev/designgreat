/**
 * Theme synchronization constants and utilities
 * Used by both pre-initialization script and React components
 */

import {
  getThemeClassName as getTokenThemeClassName,
  type ThemeName
} from '@designgreat/design-token-support'

export const DOCUSAURUS_THEME_ATTR = 'data-theme'

export type ThemeMode = ThemeName

export function getThemeClassName(theme: ThemeMode | undefined): string {
  return getTokenThemeClassName(theme ?? 'light')
}

export function getOppositeThemeClassName(theme: ThemeMode | undefined): string {
  const oppositeTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark'
  return getTokenThemeClassName(oppositeTheme)
}

