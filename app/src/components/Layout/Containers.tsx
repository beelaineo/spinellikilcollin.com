import styled, { css, DefaultTheme } from 'styled-components'
import { semiDark } from '../../theme/color'

export const Column = styled.div`
  ${({ theme }) => css`
    margin: 0 auto;
    max-width: calc(
      ${theme.layout.columns.xWide} - ${theme.layout.spacing.quadruple}
    );
  `}
`
interface HeroBackground {
  theme: DefaultTheme
  background: string
}

export const HeroBackground = styled.div`
  background-color: pink;
  ${({ theme, background }: HeroBackground) => `
      background-image: ${`url(${background})`};
      background-size: cover;
      background-position: 10%;
      padding: ${theme.layout.spacing.triple};
      height: 90vh;
      position: relative;
      z-index:0;
      top: -86px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-areas: "a b";
      div {
        padding: ${theme.layout.spacing.triple};
        align-self: center;
        grid-area: b;
      }
      ${theme.mediaQueries.tablet} {
        grid-template-columns: 1fr;
        div {
          grid-area: a;
          align-self: flex-start;
        }
      }
    `}
`

interface HeroText {
  theme: DefaultTheme
  textAlign: string
}

export const HeroText = styled.div`
  ${({ theme, textAlign }: HeroText) => `
      text-align: ${textAlign === 'middle-right' ? 'center' : 'left'};
      max-width: 400px;
      margin: 0 auto;
      color: ${theme.color.dark};
  `}
`

interface ImageText {
  theme: DefaultTheme
  textAlign: string
  background?: string
}

export const ImageText = styled.div`
  ${({ theme, textAlign, background }: ImageText) => `
      width: 50%;
      display: inline-block;
      box-sizing: border-box;
      margin: 0 auto;
      color: ${theme.color.dark};
      padding: ${theme.layout.spacing.triple};
      background-image: ${`url(${background})`};
      height: 80vh;
      background-size: cover;
      background-position: center;
      vertical-align: top;
      > div {
        display: flex;
        height: 100%;
        text-align: ${
          textAlign === 'middle-center'
            ? 'center'
            : textAlign === 'bottom-right'
            ? 'right'
            : 'left'
        };
        flex-direction: column;
        justify-content: ${
          textAlign === 'middle-center'
            ? 'center'
            : textAlign === 'bottom-right'
            ? 'flex-end'
            : 'left'
        };
      
      }
      a {
        text-transform: capitalize;
        color: ${theme.color.semiDark};
        margin: ${theme.layout.spacing.small} 0;
        font-style: italic;
      }
  `}
`
