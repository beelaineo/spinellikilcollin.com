import { DefaultTheme } from '@xstyled/styled-components'

export const pinkTheme = (theme: DefaultTheme): DefaultTheme => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      body: [...theme.colors.body].reverse(),
    },
  }
}
