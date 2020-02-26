import styled, { css, DefaultTheme } from '@xstyled/styled-components'

export const Wrapper = styled.div`
  position: relative;
  margin: 0 auto 6;
  font-family: serif;
  padding: 6 0 0;
  background-color: body.2;
`

export const ProductDetails = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 65% 1fr;
    grid-template-rows: auto auto 1fr;
    grid-column-gap: 5;
    margin: 0 5;
    padding: 7 6;
    ${theme.mediaQueries.tablet} {
      grid-template-columns: 1fr;
      padding: 0 0 7;
    }
  `}
`

export const TitleWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.tablet} {
      text-align: center;
      grid-row: 1;
    }
  `}
`

export const AffirmWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.tablet} {
      grid-row: 3;
      margin: 0 auto;
      width: 100%;
      max-width: 380px;
    }
  `}
`

export const ProductInfoWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    ${theme.mediaQueries.tablet} {
      margin: 0 auto;
      width: 100%;
      max-width: 380px;
    }
  `}
`

export const ProductImagesWrapper = styled.div`
  ${({ theme }) => css`
    grid-row: span 3;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    ${theme.mediaQueries.tablet} {
      grid-row: 2;
    }
  `}
`

export const ProductAccordionsWrapper = styled.div`
  margin-top: 7;
`

export const MobileProductHeaderWrapper = styled.div`
  text-align: center;
  padding-top: 7;
`

export const Nav = styled.div`
  width: calc(100% - 4rem);
  max-width: 1200px;
  margin: 0 auto;
  font-family: sans;
`

export const ProductGalleryWrapper = styled.div`
  position: sticky;
  top: 0;
`

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
  ${({ disabled, width }: ButtonProps) => css`
    background-color: body.8;
    color: body.1;
    cursor: ${disabled ? 'auto' : 'pointer'};
    display: inline-block;
    font-weight: 5;
    font-size: 5;
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

interface QuantitySelectorProps {
  theme: DefaultTheme
  width?: string
}

export const QuantitySelector = styled.div`
  ${(props: QuantitySelectorProps) => css`
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
  font-size: 2;
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
