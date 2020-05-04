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

export const TagBadgeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const TagBadge = styled.div`
  border: 1px solid;
  border-radius: 20px;
  margin: 0 1;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3;
  margin-bottom: 2;
`
