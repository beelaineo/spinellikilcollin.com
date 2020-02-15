import styled, { css, DefaultTheme } from '@xstyled/styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    min-height: 100vh;
    margin: 0 auto 6;
    font-family: ${theme.font.family.sans};
    padding: 6 0 0;
    background-color: body.2;
  `}
`

export const ProductDetails = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5;
    margin: 0 5;
    min-height: 800px;
    /* background-color: #F5F3F4; */
    ${theme.mediaQueries.tablet} {
      grid-template-columns: 1fr;
    }
  `}
`

export const ProductImagesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const MobileProductHeaderWrapper = styled.div`
  text-align: center;
  padding-top: 7;
`

export const ProductInfoWrapper = styled.div`
  ${({ theme }) => css`
    padding-top: 7;
    max-width: ${theme.layout.columns.small};
    min-width: ${theme.layout.columns.small};
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: auto;
    ${theme.mediaQueries.tablet} {
      margin: 5 auto;
      padding-top: 5 0;
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
  flex: 1;
  padding-right: 3;
  > button {
    padding: 3;
  }
`

export const ProductRelatedWrapper = styled.div`
  background-color: body.0;
  padding: 7;
`

export const ProductRelatedInner = styled.div`
  height: 500px;
`

interface NormalizeDivProps {
  theme: DefaultTheme
  width?: string
  top?: string
  align?: string
  marginBottom?: string
  marginTop?: string
  margin?: string
  mobile?: string
}

export const NormalizeDiv = styled.div`
  max-width: ${(props: NormalizeDivProps) =>
    props.width === 'half' ? '50%' : '100%'};

  ${({ margin, mobile, align, theme, marginBottom }: NormalizeDivProps) => `
       margin: ${margin || 0};  
       text-align: ${align || 'inherit'};
       margin-top: ${mobile === 'block' ? 6 : 'inherit'};
      
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
  marginTop?: string
}

export const Button = styled.button`
  ${({ theme, disabled, width }: ButtonProps) => css`
    background-color: body.8;
    color: body.1;
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
    padding: 4;
    margin: 5 0 3;
    opacity: ${disabled ? 0.3 : 1};
    pointer-events: ${disabled ? 'none' : 'auto'};
    border-color: body.8;
    border: 1px solid;
    /* max-width: 200px; */
    width: ${width || 'initial'};
  `}
`

export const ButtonPrimary = styled(Button)``

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
    border: 1px solid body.1;
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
    border: 1px solid body.1;
    padding: 0.5rem 1.2rem;
    font-family: sans-serif;
  }
  input {
    text-align: center;
    width: 109px;
  }
`

export const QuantitySelectorCart = styled(QuantitySelector)`
  button {
    text-align-last: center;
    height: 2rem;
    border: 1px solid body.1;
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
    border: 1px solid body.1;
    padding: 0.5rem 0.5rem;
    font-family: sans-serif;
  }
  input {
    text-align: center;
    width: 2px;
  }
`

export const Label = styled.label`
  color: body.6;
  display: block;
  margin-bottom: 3;
  -moz-appearance: none;
  appearance: none;
  -webkit-appearance: none;
  border: none;
  background: none;
  border-radius: 0;
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
  color: body.8;
  ${(props) => props.theme.mediaQueries.tablet} {
    display: none;
  }
`

export const ImageNav = styled.div`
  display: block;
  background-color: body.8;
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
  mobile?: string
}

export const ProductDetailHeaderStyles = styled.div`
  ${({ mobile, theme }: ProductDetailHeaderStyles) => css`
    display: ${mobile === 'visible' ? 'none' : 'block'};
    ${theme.mediaQueries.tablet} {
      display: ${mobile === 'hidden' ? 'none' : 'block'};
      text-align: center;
    }
  `}
`
