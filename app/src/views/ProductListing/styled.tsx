import styled, { css, DefaultTheme } from 'styled-components'
import { semiDark } from '../../theme/color'

export const OverLay = styled.div`
  ${(props) => `
   		padding: ${props.theme.layout.spacing.quadruple};
	`}
  > div {
    height: 10vh;
    width: auto;
    padding: 12vw 2rem 16vw;
    margin: 0 auto;
    text-align: center;
    ${(props) => `
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
export const ProductInfo = styled.div`
  ${({ theme }) => css`
    color: black;
    padding: ${theme.layout.spacing.single} 0;
    text-align: center;
    text-transform: capitalize;
    h3 {
      text-align: left;
      margin: 0;
      text-transform: capitalize;
      display: inline-block;
    }
    h3:nth-child(1) {
      text-align: right;
      padding-right: ${theme.layout.spacing.quarter};
    }
  `}
`

export const ProductThumb = styled.div`
  ${({ theme }) => css`
    text-align: left;
    width: 100%;
    a {
      text-decoration: none;
      &:hover {
        /* text-decoration: underline; */
        color: ${theme.color.dark};
      }
    }
  `}
`

export const ProductContainer = styled.div`
  ${({ theme }) => css`
    text-align: center;
    margin: ${theme.layout.spacing.double} 0 ${theme.layout.spacing.single};
    span {
      margin: ${theme.layout.spacing.half};
      padding: ${theme.layout.spacing.half} ${theme.layout.spacing.single};
      font-size: ${theme.font.size.badge};
      text-transform: uppercase;
      color: ${theme.color.dark};
      border: 0.5px solid ${theme.color.semiDark};
      letter-spacing: 1px;
      border-radius: 25px;
    }
  `}
`

export const ProductGrid = styled.div`
  ${({ theme }) => css`
    margin: 0 auto;
    max-width: ${theme.layout.columns.Xwide};
    display: grid;
    grid-template-columns: 32% 32% 32%;
    justify-content: space-evenly;
    grid-column-gap: ${theme.layout.spacing.triple};
    grid-row-gap: ${theme.layout.spacing.triple};
    padding: ${theme.layout.spacing.triple};
    background-color: ${theme.color.lightGraybackground};
    > a {
      text-decoration: none;
    }
    ${theme.mediaQueries.tablet} {
      grid-template-columns: 1fr 1fr;
      padding: ${theme.layout.spacing.double};
    }
    ${theme.mediaQueries.mobile} {
      grid-template-columns: 1fr;
      padding: ${theme.layout.spacing.single};
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
  ${({ theme }) => css`
    padding: ${theme.layout.spacing.single} ${theme.layout.spacing.triple};
    width: 100%;
  `}
`

interface FilterBodyProps {
  theme: DefaultTheme
  open: boolean
}

export const FilterBody = styled.div`
  ${({ theme, open }: FilterBodyProps) => css`
    transition: 250ms ease-in-out;
    padding: 0 ${theme.layout.spacing.single};
    width: 100%;
    visibility: ${open === true ? 'visible' : 'hidden'};
    overflow: hidden;
    max-height: ${open === true ? '360px' : '0'};
    border-top: 1px solid ${theme.color.lightGrayBody};
    margin-top: ${theme.layout.spacing.triple};
    > div {
      padding: ${theme.layout.spacing.triple} 0;
    }
  `}
`

export const FilterList = styled.ul`
  ${({ theme }) => css`
    list-style: none;
    padding: 0;
    li {
      margin-bottom: ${theme.layout.spacing.single};
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
    visibility: hidden;
    z-index: 2;
    &:checked {
      ~ span {
        background-color: black;
      }
    }
    ~ span {
      width: 16px;
      z-index: 1;
      height: 16px;
      position: relative;
      border: 1px solid black;
      border-radius: 0px;
      margin-right: ${theme.layout.spacing.single};
      display: inline-block;
    }
  `}
`
