import { DefaultTheme } from '@xstyled/styled-components'

export const highValueTheme = (theme: DefaultTheme): DefaultTheme => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      background: theme.colors.grays[0],
    },
  }
}
