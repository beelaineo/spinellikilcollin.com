import styled, { css, DefaultTheme } from '@xstyled/styled-components'
import { semiDark } from '../../theme/color'

export const OverLay = styled.div`
  padding: 7;
  > div {
    height: 10vh;
    width: auto;
    padding: 12vw 2rem 16vw;
    margin: 0 auto;
    text-align: center;
    ${(props) => css`
      transition: all ${props.theme.transition.slow} linear;
      a {
        color: transparent;
        transition: all ${props.theme.transition.slow} linear;
        text-decoration: none;
      }
      hr {
        width: 120px;
        margin: 24px auto;
        border: 1px solid transparent;
        transition: all ${props.theme.transition.slow} linear;
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
    max-width: ${theme.layout.columns.Xwide};
    display: grid;
    grid-template-columns: 32% 32% 32%;
    justify-content: space-evenly;
    grid-column-gap: 6;
    grid-row-gap: 6;
    padding: 6;
    background-color: ${theme.color.lightGraybackground};
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
  background-image: url(${(props: BackgroundImageProps) =>
    props.imageSrc || ''});
  background-size: cover;
  background-position: center;
  padding: 45%;
  a {
    color: transparent;
  }
`

// Adding the Filter Styles
export const FilterInner = styled.div`
  padding: 3 6;
  width: 100%;
  input[type='range'] {
    -webkit-appearance: none;
    width: 100%;
  }

  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    background: #ddd;
    border: none;
    border-radius: 3px;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: black;
    margin-top: -6px;
  }

  input[type='range']:focus {
    outline: none;
  }

  input[type='range']:focus::-webkit-slider-runnable-track {
    background: black;
  }
`

interface FilterBodyProps {
  theme: DefaultTheme
  open: boolean
}

export const FilterBody = styled.div`
  ${({ theme, open }: FilterBodyProps) => css`
    transition: 250ms ease-in-out;
    padding: 0 3;
    width: 100%;
    visibility: ${open === true ? 'visible' : 'hidden'};
    overflow: hidden;
    max-height: ${open === true ? '360px' : '0'};
    border-top: 1px solid ${theme.color.lightGrayBody};
    margin-top: 6;
    > div {
      padding: 6 0;
    }
  `}
`

export const FilterList = styled.ul`
  ${({ theme }) => css`
    list-style: none;
    padding: 0;
    li {
      margin-bottom: 3;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
      input,
      label {
        cursor: pointer;
      }
    }
  `}
`

export const Checkbox = styled.input`
  ${({ theme }) => css`
    display: inline-block;
    position: absolute;
    opacity: 0;
    z-index: 2;
    &:checked {
      ~ span {
        background-color: black;
      }
    }
    ~ span {
      width: 14px;
      z-index: 1;
      height: 14px;
      position: relative;
      border: 1px solid ${theme.color.semiDark};
      border-radius: 2px;
      margin-right: 3;
      display: inline-block;
    }
  `}
`
