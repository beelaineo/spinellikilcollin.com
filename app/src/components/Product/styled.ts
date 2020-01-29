import styled, { css } from 'styled-components'

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
