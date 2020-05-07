import { DefaultTheme } from '@xstyled/styled-components'

export const magazineTheme = (theme: DefaultTheme): DefaultTheme => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      background: theme.colors.body[0],
    },
  }
}
