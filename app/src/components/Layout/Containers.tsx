import styled, { css, DefaultTheme } from '@xstyled/styled-components'

interface ColumnProps {
  width?: string
}
export const Column = styled.div`
  ${({ width }: ColumnProps) => css`
    margin: 0 auto;
    max-width: ${width ? width : 'xWide'};
  `}
`

interface HeroBackground {
  theme: DefaultTheme
  background: string
  backgroundMobile: string
}

export const HeroBackground = styled.div`
  ${({ theme, background, backgroundMobile }: HeroBackground) => css`
    background-image: ${`url(${background})`};
    background-size: cover;
    background-position: 10%;
    padding: 6;
    height: 90vh;
    position: relative;
    z-index: 0;
    top: 0px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'a b';
    div {
      padding: 6;
      align-self: center;
      grid-area: b;
    }
    ${theme.mediaQueries.tablet} {
      background-image: ${`url(${backgroundMobile})`};
      grid-template-columns: 1fr;
      div {
        align-self: flex-start;
        grid-area: a;
      }
    }
  `}
`

interface HeroText {
  theme: DefaultTheme
  textAlign: string
}

export const HeroText = styled.div`
  ${({ textAlign }: HeroText) => css`
    text-align: ${textAlign === 'middle-right' ? 'center' : 'left'};
    max-width: 400px;
    margin: 0 auto;
    color: body.8;
  `}
`

interface CarouselBlockStyledProps {
  theme: DefaultTheme
}

export const CarouselBlockStyled = styled.div`
  padding: 6;
  text-align: center;
`

export const Square = styled.div`
  padding: 50% 0 50%;
  background-color: lightgray;
  text-align: center;
`
