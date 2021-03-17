import { DefaultTheme } from '@xstyled/styled-components'
import { defaultTheme } from './defaultTheme'
import { journalTheme } from './journalTheme'
import { magazineTheme } from './magazineTheme'
import { pageTheme } from './pageTheme'

interface ThemeRoute {
  pattern: RegExp
  theme: ((t: DefaultTheme) => DefaultTheme) | DefaultTheme
}

const routes: ThemeRoute[] = [
  {
    pattern: /^\/journal/,
    theme: journalTheme,
  },
  {
    pattern: /^\/925/,
    theme: magazineTheme,
  },
  {
    pattern: /^\/about/,
    theme: pageTheme,
  },

  {
    pattern: /^\/customize/,
    theme: pageTheme,
  },
]

export const getThemeByRoute = (path: string): DefaultTheme => {
  const route = routes.find((r) => r.pattern.test(path))
  if (!route) return defaultTheme
  const { theme } = route
  if (typeof theme === 'function') {
    return theme(defaultTheme)
  }
  return theme
}
