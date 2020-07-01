import styled, { css } from '@xstyled/styled-components'
import { SlidesContainer } from '../../components/Carousel/styled'

export const Wrapper = styled.div`
  position: relative;
  margin: 0 auto 6;
  font-family: serif;
  padding: 0 0 0;
  background-color: body.2;
`

export const ProductPageWrapper = styled.div`
  ${({ theme }) => css`
    padding: 0 11 8 7;

    ${theme.mediaQueries.tablet} {
      padding: 7 8;
    }

    ${theme.mediaQueries.mobile} {
      padding: 7 5;
    }
  `}
`

export const ProductDetails = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 330px;
    grid-column-gap: 5;
    min-height: 75vh;
    ${theme.mediaQueries.tablet} {
      grid-template-columns: 1fr;
      padding: 0 0 7;
    }
  `}
`

export const InfoWrapper = styled.div`
  ${({ theme }) => css`
    height: 100%;
    display: flex;
    padding-top: 190px;
    flex-direction: column;
    justify-content: flex-start;

    ${theme.mediaQueries.tablet} {
      padding-top: 7;
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
    }
  `}
`

export const TitleWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.tablet} {
      text-align: center;
      grid-row: 1;
      margin-top: -2;
      margin-bottom: 2;
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
      max-width: small;
    }
  `}
`

export const ProductImagesWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding-right: 9;
    padding-top: 3;
    ${theme.mediaQueries.tablet} {
      margin: 0 -${theme.space[3]}px;
      grid-row: 2;
    }
  `}
`

export const ProductAccordionsWrapper = styled.div`
  ${({ theme }) => css`
    margin-top: 5;
    ${theme.mediaQueries.tablet} {
      margin-top: 4;
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

export const ProductGalleryWrapper = styled.div`
  ${({ theme }) => css`
    position: sticky;
    top: 0;

    ${theme.mediaQueries.tablet} {
      position: relative;
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
      margin-left: -${theme.space[8]}px;
      width: calc(100% + ${theme.space[8]}px * 2);
    }

    ${theme.mediaQueries.mobile} {
      margin-left: -${theme.space[5]}px;
      width: calc(100% + ${theme.space[5]}px * 2);

      ${theme.mediaQueries.mobile} {
        & ${SlidesContainer} > *:first-child {
          transform: scale(1.3);
        }
      }
    }
  `}
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
    padding: 7;
    ${theme.mediaQueries.mobile} {
      padding: 7 0;
    }
  `}
`

export const ProductRelatedInner = styled.div`
  padding: 7 0;
`
