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
  text-align: left;
  width: 100%;
  a {
    text-decoration: none;
    &:hover {
      /* text-decoration: underline; */
      color: body.8;
    }
  }
`

export const ProductInfo = styled.div`
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
  text-align: center;
  margin: 5 0 3;

  span {
    margin: 2;
    padding: 2 3;
    font-size: 6;
    text-transform: uppercase;
    color: body.8;
    border: 0.5px solid body.7;
    letter-spacing: 1px;
    border-radius: 25px;
  }
`
