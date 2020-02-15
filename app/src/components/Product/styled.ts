import styled, { css } from '@xstyled/styled-components'

interface BackgroundImageProps {
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

export const ProductInfo = styled.div`
  color: black;
  padding: 3 0;
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
    padding-right: 1;
  }
`

export const ProductContainer = styled.div`
  ${({ theme }) => css`
    text-align: center;
    margin: 5 0 3;
    span {
      margin: 2;
      padding: 2 3;
      font-size: ${theme.font.size.badge};
      text-transform: uppercase;
      color: ${theme.color.dark};
      border: 0.5px solid ${theme.color.semiDark};
      letter-spacing: 1px;
      border-radius: 25px;
    }
  `}
`
