import styled, { css } from '@xstyled/styled-components'
import { Product } from '../../types'
import {
  CarouselContainer,
  SlidesContainer,
  DotsInner,
} from '../../components/Carousel/styled'

interface WithProduct {
  product?: Product
}

export const Wrapper = styled.div`
  position: relative;
  margin: 0 auto 6;
  font-family: serif;
  padding: 0 0 0;
  background-color: body.2;
`

export const ProductPageWrapper = styled.main`
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
      padding: ${product?.store?.productType === 'Gift Card'
        ? '0 81px 7'
        : '9 81px 7'};
    }

    ${theme.mediaQueries.mobile} {
      height: 100%;
      display: block;
      padding: ${product?.store?.productType === 'Gift Card'
        ? '0 0 7'
        : '96px 0 7'};
    }
  `}
`

export const AffirmWrapper = styled.div`
  ${({ theme }) => css`
    margin-top: 5;
    font-family: 'Inferi', 'Georgia', serif !important;

    display: flex;
    flex-direction: column;
    gap: 2;
    width: max-content;
    h5,
    span {
      height: 100%;
      text-align: left;
    }

    ${theme.mediaQueries.tablet} {
      grid-row: 3;
      margin: 4 auto 0;
      width: 100%;
      max-width: small;
      align-items: center;
    }
    ${theme.mediaQueries.mobile} {
      align-items: flex-start;
    }
    a {
      position: relative;
      &:focus-visible {
        ${theme.focus.bottom(0, 6)}
      }
    }
  `}
`

export const KlarnaWrapper = styled.div`
  ${({ theme }) => css`
    margin-top: 5;

    ${theme.mediaQueries.tablet} {
      grid-row: 3;
      margin: 4 auto 0;
      width: 100%;
      max-width: small;
      text-align: center;
    }
    a {
      position: relative;
      &:focus-visible {
        ${theme.focus.bottom(0, 6)}
      }
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
      margin-top: ${product?.store?.productType === 'Gift Card' ? '0' : '-2'};
      margin-bottom: ${product?.store?.productType === 'Gift Card' ? '4' : '0'};
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
    padding-top: ${theme.navHeight};

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
    flex-direction: column;
    display: flex;
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
    flex-wrap: wrap;
    margin: 0 0 4 0;

    gap: 4;

    svg {
      flex-shrink: 0;
    }

    button {
      min-width: 116px;
      justify-content: flex-start;

      &:focus-visible {
        ${theme.focus.left()}
      }
    }

    ${theme.mediaQueries.tablet} {
      order: -1;
    }

    ${theme.mediaQueries.mobile} {
      row-gap: 0;
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

interface WithProductHide {
  product?: Product
  hide?: boolean
}

export const ProductGalleryWrapper = styled.div<WithProductHide>`
  ${({ product, hide, theme }) => css`
    display: ${hide ? 'none' : 'block'};
    position: sticky;
    top: 0;

    ${theme.mediaQueries.tablet} {
      position: relative;
      order: ${product?.store?.productType === 'Gift Card' ? '-1' : '0'};
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

    a {
      position: relative;
      &:focus-visible {
        ${theme.focus.bottom()}
      }
    }

    ${theme.mediaQueries.mobile} {
      padding: 7 0;
    }
  `}
`

export const ProductRelatedInner = styled.div`
  padding: 7 0;
`

export const ProductRecentWrapper = styled.div`
  ${({ theme }) => css`
    background-color: body.0;
    padding: 7 0 0 0;

    a {
      position: relative;
      &:focus-visible {
        ${theme.focus.bottom()}
      }
    }

    ${theme.mediaQueries.mobile} {
      padding: 7 0 0 0;
    }
  `}
`

export const ProductRecentInner = styled.div`
  padding: 7 0 0 0;
`
