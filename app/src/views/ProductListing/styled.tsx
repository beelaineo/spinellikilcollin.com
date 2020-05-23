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
    grid-column-gap: 6;
    grid-row-gap: 6;
    padding: 6;
    > a {
      text-decoration: none;
    }
    ${theme.mediaQueries.tablet} {
      grid-template-columns: 1fr 1fr;
      padding: 5;
    }
    ${theme.mediaQueries.mobile} {
      grid-template-columns: 1fr;
      padding: 3;
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

