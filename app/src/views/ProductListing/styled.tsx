import styled, { css, DefaultTheme } from '@xstyled/styled-components'

export const Wrapper = styled.div`
  position: relative;
  margin: 0 auto 6;
  font-family: serif;
  padding: 0;
  background-color: body.2;
`

export const OverLay = styled.div`
  padding: 7;
  > div {
    height: 10vh;
    width: auto;
    padding: 12vw 2rem 16vw;
    margin: 0 auto;
    text-align: center;
    ${(props) => css`
      transition: all slow linear;
      a {
        color: transparent;
        transition: all slow linear;
        text-decoration: none;
      }
      hr {
        width: 120px;
        margin: 24px auto;
        border: 1px solid transparent;
        transition: all slow linear;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        a {
          color: white;
        }
        hr {
          border: 1px solid white;
        }
      }
      ${props.theme.mediaQueries.tablet} {
        padding: 10vw 2rem 25vw;
        &:hover {
          background-color: transparent;
          color: white;
          a {
            color: white;
          }
          hr {
            border: 1px solid white;
          }
        }
      }
    `}
  }
`
export const ProductGrid = styled.div`
  ${({ theme }) => css`
    margin: 0 auto;
    max-width: xWide;
    display: grid;
    grid-template-columns: 32% 32% 32%;
    justify-content: space-evenly;
    grid-gap: 4;
    padding: 6 0;
    grid-auto-rows: min-content;
    grid-auto-flow: row dense;
    > a {
      text-decoration: none;
    }
    ${theme.mediaQueries.tablet} {
      grid-template-columns: 1fr 1fr;
      padding: 5;
    }
    ${theme.mediaQueries.mobile} {
      grid-template-columns: 1fr 1fr;
      padding: 3;
    }
    @media screen and (max-width: 420px) {
      grid-template-columns: 1fr;
    }
  `}
`

interface WithFormat {
  format?: string | null
}

export const ProductGridItem = styled.div<WithFormat>`
  ${({ theme, format }) => css`
    grid-column: ${format === 'wide' ? 'span 2' : 'auto'};
    grid-row: ${format === 'tall' ? 'span 2' : 'auto'};
    position: relative;

    & > * {
      position: ${format === 'tall' || format === 'wide'
        ? 'absolute'
        : 'relative'};
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    ${theme.mediaQueries.tablet} {
      grid-column: ${format === 'wide' ? 'span 2' : 'auto'};
      grid-row: ${format === 'tall' ? 'span 2' : 'auto'};
    }
    ${theme.mediaQueries.mobile} {
      grid-column: ${format === 'wide' ? 'span 1' : 'auto'};
      grid-row: ${format === 'tall' ? 'span 2' : 'auto'};
    }
  `}
`

interface BackgroundImageProps {
  theme: DefaultTheme
  imageSrc: string
}

export const BackgroundImage = styled.div`
  ${({ imageSrc }: BackgroundImageProps) => css`
    background-image: url(${imageSrc});
    background-size: cover;
    background-position: center;
    padding: 45%;
    a {
      color: transparent;
    }
  `}
`
