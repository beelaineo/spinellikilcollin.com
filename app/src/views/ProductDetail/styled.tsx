import styled, { css, DefaultTheme } from 'styled-components'
import { lightGraybackground } from '../../theme/color'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    min-height: 100vh;
    margin: 0 auto ${theme.layout.spacing.triple};
    font-family: ${theme.font.family.sans};
    padding: ${theme.layout.spacing.triple} 0 0;
    background-color: ${theme.color.lightGraybackground};
  `}
`

export const ProductDetails = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${theme.layout.spacing.double};
    margin: 0 ${theme.layout.spacing.double};
    min-height: 800px;
    /* background-color: #F5F3F4; */
    ${theme.mediaQueries.tablet} {
      grid-template-columns: 1fr;
    }
  `}
`

export const ProductImagesWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
  `}
`

export const MobileProductHeaderWrapper = styled.div`
  ${({ theme }) => css`
    text-align: center;
    padding-top: ${theme.layout.spacing.quadruple};
  `}
`

export const ProductInfoWrapper = styled.div`
  ${({ theme }) => css`
    padding-top: ${theme.layout.spacing.quadruple};
    max-width: ${theme.layout.columns.small};
    min-width: ${theme.layout.columns.small};
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: auto;
    ${theme.mediaQueries.tablet} {
      margin: ${theme.layout.spacing.double} auto;
      padding-top: ${theme.layout.spacing.double} 0;
    }
  `}
`

export const Nav = styled.div`
  ${({ theme }) => css`
    width: calc(100% - 4rem);
    max-width: 1200px;
    margin: 0 auto;
    font-family: ${theme.font.family.sans};
  `}
`

export const ProductGalleryWrapper = styled.div``

export const ProductGalleryImage = styled.div``

export const ProductGalleryThumbnails = styled.div`
  ${(props) => css`
    flex: 1;
    padding-right: ${props.theme.layout.spacing.small};
    > button {
      padding: ${props.theme.layout.spacing.small};
    }
  `}
`

export const ProductRelatedWrapper = styled.div`
  ${(props) => css`
    background-color: ${props.theme.color.white};
    padding: ${props.theme.layout.spacing.quadruple};
    ${props.theme.mediaQueries.tablet} {
      > h2 {
        font-size: ${props.theme.font.size.h2};
      }
    }
  `}
`

export const ProductRelatedInner = styled.div`
  ${({ theme }) => css`
    height: 500px;
  `}
`

/*
  NOTE: consider turning this into a "WithMargin" or "Spaced"
  component that we could use like this:

  <Spaced margin="small">...</Spaced>
  <Spaced margin="small" top="double">...</Spaced>

  would be nice to have a prop for padding too
*/

interface NormalizeDivProps {
  theme: DefaultTheme
  width?: string
  top?: string
  align?: string
  marginBottom?: string
  margin: string
  mobile: string
}

export const NormalizeDiv = styled.div`
  max-width: ${(props: NormalizeDivProps) =>
    props.width === 'half' ? '50%' : '100%'};

  ${({ margin, mobile, align, theme, marginBottom }: NormalizeDivProps) => `
       margin: ${margin || 0};  
       text-align: ${align || 'inherit'};
       margin-top: ${
         mobile === 'block' ? theme.layout.spacing.triple : 'inherit'
       };
      
       margin-bottom: ${
         mobile === 'block' ? 0 : theme.layout.spacing[marginBottom]
       };
  `}
`

interface BackgroundImageProps {
  imageSrc: string
}

export const BackgroundImage = styled.div`
  ${({ imageSrc }: BackgroundImageProps) => css`
    background-image: url(${imageSrc});
    background-size: cover;
    background-position: center;
    a {
      color: transparent;
    }
  `}
`

interface ButtonProps {
  theme: DefaultTheme
  disabled?: boolean
  weight?: 'xlight' | 'light' | 'book' | 'normal' | 'semi' | 'strong'
  background?: string
  color?: string
  family?: string
  transform?: string
  href?: string
  width?: string
  marginTop: string
}

export const Button = styled.button`
  ${({
    theme,
    disabled,
    background,
    color,
    width,
    marginTop,
  }: ButtonProps) => css`
    background-color: ${
      background ? theme.color[background] : theme.color.dark
    };
    color: ${color ? theme.color.color : theme.color.light};
    cursor: ${disabled ? 'auto' : 'pointer'};
    display: inline-block;
    font-family: ${theme.font.family.serif};
    font-weight: ${theme.font.weight.strong};
    font-size: ${theme.font.size.h5};
    letter-spacing: 0.095em;
    padding: 0.25rem 0.5rem;
    text-align: center;
    text-transform: uppercase;
    transition: 0.2s;
    padding: ${theme.layout.spacing.singleHalf};
    margin: ${theme.layout.spacing.double} 0
      ${theme.layout.spacing.single};
    margin-top: ${marginTop ? theme.layout.spacing[marginTop] : 'inherit'}
    opacity: ${disabled ? 0.3 : 1};
    pointer-events: ${disabled ? 'none' : 'auto'};
    border: 1px solid ${theme.color.dark};
    /* max-width: 200px; */
    width: ${width || 'initial'}; 
  `}
`

export const ButtonPrimary = styled(Button)``

export const Select = styled.select`
  text-align-last: center;
  height: 50px;
  border: 1px solid #f1f1f1;
  border-radius: 0;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  font-size: 1rem;
  cursor: pointer;
  -moz-appearance: none;
  appearance: none;
  -webkit-appearance: none;
  border: none;
  background: none;
  border-radius: 0;
  border: 1px solid #f1f1f1;
  padding: 1rem 2rem;
  font-family: sans-serif;
  option {
    font-family: sans-serif;
  }
`
interface QuantitySelector {
  theme: DefaultTheme
  width?: string
}

export const QuantitySelector = styled.div`
  ${(props: QuantitySelector) => css`
    input[type='text'] {
      min-width: ${props.width ? props.width : 'initial'};
      max-width: ${props.width ? props.width : 'initial'};
    }
  `}
  button {
    text-align-last: center;
    height: 50px;
    border: 1px solid #f1f1f1;
    border-radius: 0;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    font-size: 0.85rem;
    cursor: pointer;
    -moz-appearance: none;
    appearance: none;
    -webkit-appearance: none;
    border: none;
    background: none;
    border-radius: 0;
    border: 1px solid #f1f1f1;
    padding: 0.5rem 1.2rem;
    font-family: sans-serif;
  }
  input {
    text-align: center;
    width: 109px;
  }
`

export const QuantitySelectorCart = styled(QuantitySelector)`
  ${() => `
		button {
			text-align-last: center;
			height: 2rem;
			border: 1px solid #f1f1f1;
			border-radius: 0;
			-webkit-transition: .2s;
			transition: .2s;
			font-size: .85rem;
			cursor: pointer;
			-moz-appearance: none;
			appearance: none;
			-webkit-appearance: none;
			border: none;
			background: none;
			border-radius: 0;
			border: 1px solid #f1f1f1;
			padding: .5rem .5rem;
			font-family: sans-serif;
		}
		input {
			text-align: center;
			width: 2px;
		}
	`}
`

export const Label = styled.label`
  ${(props) => `
		color: #777;
		color:${props.theme.color.lightGrayBody};
		display: block;
		margin-bottom: ${props.theme.layout.spacing.small};
		-moz-appearance: none;
		appearance: none;
		-webkit-appearance: none;
		border: none;
		background: none;
		border-radius: 0;
	`}
`

export const ArrowDown = styled.div`
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  position: relative;
  top: 17vh;
  font-size: ${(props) => props.theme.font.size.h2};
  color: ${(props) => props.theme.color.dark};
  ${(props) => props.theme.mediaQueries.tablet} {
    display: none;
  }
`

export const ImageNav = styled.div`
  display: block;
  background-color: ${(props) => props.theme.color.dark};
  border-radius: 50%;
  height: 16px;
  width: 16px;
`

export const MobileImageNav = styled.div`
  max-width: 80px;
  display: none;
  ${(props) => props.theme.mediaQueries.tablet} {
    display: block !important;
  }
`

interface ProductDetailHeaderStyles {
  theme: DefaultTheme
  mobile: string
}

export const ProductDetailHeaderStyles = styled.div`
  ${(props: ProductDetailHeaderStyles) => css`
    display: ${props.mobile === 'visible' ? 'none' : 'block'};
    ${props.theme.mediaQueries.tablet} {
      display: ${props.mobile === 'hidden' ? 'none' : 'block'};
      text-align: center;
    }
  `}
`
