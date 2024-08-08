import { DefaultTheme } from 'styled-components'

export const pageTheme = (theme: DefaultTheme): DefaultTheme => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      background: theme.colors.body[0],
    },
  }
}
