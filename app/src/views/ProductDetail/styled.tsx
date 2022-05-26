import styled, { css } from '@xstyled/styled-components'
import { ShopifyProduct } from '../../types'
import {
  CarouselContainer,
  SlidesContainer,
  DotsInner,
} from '../../components/Carousel/styled'

interface WithProduct {
  product?: ShopifyProduct
}

export const Wrapper = styled.div`
  position: relative;
  margin: 0 auto 6;
  font-family: serif;
  padding: 0 0 0;
  background-color: body.2;
`

export const ProductPageWrapper = styled.div`
  ${({ theme }) => css`
    padding: 0;

    ${theme.mediaQueries.tablet} {
      padding: 9 7 0;
    }

    ${theme.mediaQueries.mobile} {
      padding: 9 7 0;
    }
  `}
`

export const ProductDetails = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 330px;
    grid-column-gap: 5;
    padding-right: 11;

    ${theme.mediaQueries.desktop} {
      padding-right: 5vw;
    }

    ${theme.mediaQueries.tablet} {
      grid-template-columns: 1fr;
      padding: 0 0;
    }
  `}
`

export const InfoWrapper = styled.div<WithProduct>`
  ${({ product, theme }) => css`
    height: 100%;
    display: flex;
    padding: 190px 0 9 0;
    flex-direction: column;
    justify-content: flex-start;

    ${theme.mediaQueries.tablet} {
      padding: ${product?.sourceData?.productType === 'Gift Card'
        ? '0 81px 7'
        : '9 81px 7'};
    }

    ${theme.mediaQueries.mobile} {
      padding: ${product?.sourceData?.productType === 'Gift Card'
        ? '0 0 7'
        : '6 0 7'};
    }
  `}
`

export const AffirmWrapper = styled.div`
  ${({ theme }) => css`
    margin-top: 5;
    ${theme.mediaQueries.tablet} {
      grid-row: 3;
      margin: 4 auto 0;
      width: 100%;
      max-width: small;
      text-align: center;
    }
  `}
`

export const TitleWrapper = styled.div<WithProduct>`
  ${({ product, theme }) => css`
    & > em {
      display: block;
      margin-bottom: 3;
    }
    ${theme.mediaQueries.tablet} {
      text-align: center;
      grid-row: 1;
      margin-top: ${product?.sourceData?.productType === 'Gift Card'
        ? '0'
        : '-2'};
      margin-bottom: ${product?.sourceData?.productType === 'Gift Card'
        ? '4'
        : '0'};
      & > em {
        margin-bottom: 2;
      }
    }
  `}
`

export const ProductInfoWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-top: 6;

    ${theme.mediaQueries.tablet} {
      margin: 0 auto;
      width: 100%;
      padding: 0;
    }

    ${theme.mediaQueries.mobile} {
      padding: 0;
    }
  `}
`

export const ProductImagesWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding-right: 9;

    ${theme.mediaQueries.desktop} {
      padding-right: 0;
    }

    ${theme.mediaQueries.tablet} {
      display: none;
    }
  `}
`

export const ProductAccordionsWrapper = styled.div`
  ${({ theme }) => css`
    margin-top: 5;
    ul,
    ol,
    li {
      white-space: normal;
    }
    p {
      font-weight: 300;
    }
    ${theme.mediaQueries.tablet} {
      margin-top: 4;
    }
  `}
`

export const RingToolsWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    column-gap: 4;

    ${theme.mediaQueries.tablet} {
    }

    ${theme.mediaQueries.mobile} {
    }
  `}
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

export const ProductGalleryWrapper = styled.div<WithProduct>`
  ${({ product, theme }) => css`
    position: sticky;
    top: 0;

    ${theme.mediaQueries.tablet} {
      position: relative;
      order: ${product?.sourceData?.productType === 'Gift Card' ? '-1' : '0'};
    }
  `}
`

export const Thumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2;
  margin-top: 3;
`

export const DesktopWrapper = styled.div`
  ${({ theme }) => css`
    padding-top: ${theme.navHeight};
    ${theme.mediaQueries.tablet} {
      display: none;
    }
  `}
`
export const MobileWrapper = styled.div`
  ${({ theme }) => css`
    display: none;
    ${theme.mediaQueries.tablet} {
      display: block;
      margin: 5 0 2;

      & ${SlidesContainer} > *:first-child {
        transform: scale(1.3);
      }

      ${CarouselContainer} {
        padding: 0;
      }
      ${DotsInner} {
        max-width: initial;
        margin: auto;
      }
    }

    ${theme.mediaQueries.mobile} {
      margin: 5 -7 2;
      ${DotsInner} {
        margin: auto;
      }
    }
  `}
`
export const MainImage = styled.div`
  ${({ theme }) => css``}
`

export const ThumbnailButton = styled.div`
  cursor: pointer;
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
  ${({ theme }) => css`
    background-color: body.0;
    padding: 7 0;
    ${theme.mediaQueries.mobile} {
      padding: 7 0;
    }
  `}
`

export const ProductRelatedInner = styled.div`
  padding: 7 0;
`
