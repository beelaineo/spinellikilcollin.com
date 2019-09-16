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
      top: 0px;
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
      padding-top: 21%;
      padding-bottom: 21%;
      background-size: cover;
      background-position: center;
      vertical-align: top;
      position: relative;
      ${theme.mediaQueries.tablet} {
        width: 100%;
        padding-top: 50%;
        padding-bottom: 50%;
      }
      > div {
        display: flex;
        height: 100%;
        position: ${
          textAlign === 'middle-center'
            ? 'initial'
            : textAlign === 'bottom-right'
            ? 'absolute'
            : 'absolute'
        };
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
        top: ${
          textAlign === 'middle-center'
            ? 0
            : textAlign === 'bottom-right'
            ? `-${theme.layout.spacing.triple}`
            : theme.layout.spacing.triple
        };
        right: ${
          textAlign === 'middle-center'
            ? 'initial'
            : textAlign === 'bottom-right'
            ? theme.layout.spacing.triple
            : 'initial'
        };
        bottom: ${
          textAlign === 'middle-center'
            ? 'initial'
            : textAlign === 'bottom-right'
            ? theme.layout.spacing.triple
            : 'initial'
        };
      
      }
      a {
        text-transform: capitalize;
        color: ${theme.color.semiDark};
        margin: ${theme.layout.spacing.small} 0;
        display: inline-block;
        font-style: italic;
        text-decoration: none;
        padding-bottom: ${theme.layout.spacing.quarter};
        border-bottom: 1px solid  ${theme.color.semiDark};;
      }
  `}
`

interface CarouselBlockStyled {
  theme: DefaultTheme
}

export const CarouselBlockStyled = styled.div`
  ${({ theme }: ImageText) => `
        padding: ${theme.layout.spacing.triple};
        text-align: center;
    `};
`

export const Square = styled.div`
  padding: 50% 0 50%;
  background-color: lightgray;
  text-align: center;
`
