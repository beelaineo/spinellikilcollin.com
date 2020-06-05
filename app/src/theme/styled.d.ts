import 'styled-components'
import '@xstyled/styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    space: number[]
    sizes: {
      small: number
      medium: number
      mediumWide: number
      wide: number
      xWide: number
    }
    fontSizes: Array<number | number[]>
    mobileFontSizes: number[]
    fontWeights: number[]

    radii: {
      round: string
    }
    navHeight: string

    fonts: {
      serif: string
      sans: string
      display: string
      body: string
    }

    zIndices: {
      main: number
      nav: number
      cart: number
      dialog: number
      alert: number
    }

    colors: {
      grays: string[]
      body: string[]
      bodyMain: string
      background: string
      error: string[]
      highlightLow: string
    }

    mediaQueries: {
      mobile: string
      aboveMobile: string
      tablet: string
      aboveTablet: string
    }

    transition: {
      fast: string
      slow: string
    }

    breakpoints?: {
      xs: number
      sm: number
      md: number
      lg: number
      xl: number
    }
  }
}
