import styled, { css } from '@xstyled/styled-components'

interface BackgroundImageProps {
  imageSrc: string
}

export const ProductThumb = styled.div`
  text-align: left;
  width: 100%;
  a {
    text-decoration: none;

    &:hover {
      color: body.8;
    }
  }
`

interface WithDisplayGrid {
  displayGrid?: boolean
}

export const ProductInfo = styled.div<WithDisplayGrid>`
  ${({ theme, displayGrid }) => css`
    padding: 3 0 5;
    text-align: center;
    text-transform: capitalize;
    color: body.7;
    ${displayGrid
      ? css`
          display: grid;
          grid-template-columns: 1fr;
          grid-row-gap: 2;
          grid-template-rows: 1fr 1fr 25px;
          align-items: center;
        `
      : ''}
    @media screen and (min-width: 1000px) {
    }
    h3 {
      font-size: 16px;
    }

    ${theme.mediaQueries.mobile} {
      margin-top: 3;
      padding: 0 0 4;
      h3 {
        font-size: ${theme.mobileFontSizes[5]};
      }
      h5 {
        font-size: ${theme.mobileFontSizes[6]};
      }
    }
  `}
`

export const ImageWrapper = styled.div`
  position: relative;
`

export const TagBadgeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1;
`

export const TagBadge = styled.div`
  ${({ theme }) => css`
    border: 1px solid;
    border-color: body.6;
    border-radius: 20px;
    margin: 0 1;
    height: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1px 3 0;

    ${theme.mediaQueries.mobile} {
      height: unset;
    }
  `}
`

export const SwatchesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2;
`

export const SwatchLabel = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 50%;
  text-align: center;
  white-space: nowrap;
  transform: translate(-50%);
  transition: 0.2s;
  opacity: 0;
`

interface WithClickable {
  clickable: boolean
  active: boolean
}

export const SwatchWrapper = styled.div<WithClickable>`
  ${({ clickable, active }) => css`
    position: relative;
    width: 23px;
    margin: 0;
    margin-right: 2;
    padding-bottom: 2;
    cursor: ${clickable ? 'pointer' : 'inherit'};
    border-bottom: ${active ? '1px solid' : 'none'};
    border-color: body.5;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      ${SwatchLabel} {
        opacity: 1;
      }
    }
  `}
`
