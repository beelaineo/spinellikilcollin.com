import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    utils: {
      getTextAlignment: (position: string | void | null) => string | void
      getFlexAlignment: (position: string | void | null) => string | void
      getFlexJustification: (position: string | void | null) => string | void
      getColor: (
        color: string | void | null,
        theme: DefaultTheme,
      ) => string | void
    }
    layout: {
      z: { [key: string]: number }
      spacing: { [key: string]: string }
      columns: { [key: string]: string }
      navHeight: string
    }
    font: {
      size: { [key: string]: string }
      weight: { [key: string]: number }
      family: { [key: string]: string }
    }
    color: { [key: string]: string }
    mediaQueries: { [key: string]: string }
    transition: { [key: string]: string }
  }
}
