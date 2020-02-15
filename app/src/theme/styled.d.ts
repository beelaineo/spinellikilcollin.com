import 'styled-components'
import '@xstyled/styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    space: number[]
    sizes: number[]
    fontSizes: number[]
    fontWeights: number[]

    radii: {
      round: string
    }
    fonts: {
      serif: string
      sans: string
      display: string
      body: string
    }

    zIndices: {
      base: number
      nav: number
      alert: number
    }

    colors: {
      primary: string[]
      primaryMain: string
      body: string[]
      bodyMain: string
      background: string
      highlight: string[]
      error: string[]
      red: string
      beige: string
      bronze: string
    }

    mediaQueries: {
      mobile: string
      aboveMobile: string
      tablet: string
      aboveTablet: string
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
