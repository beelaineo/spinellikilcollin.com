import styled, { css } from '@xstyled/styled-components'

interface BackgroundImageProps {
  imageSrc: string
}

export const ProductThumb = styled.div`
  ${({ theme }) => css`
    position: relative;
    text-align: left;
    width: 100%;
    a {
      text-decoration: none;

      &:focus-visible {
        ${theme.focus.bottom(-50, -2)}
      }
      &:hover {
        color: body.8;
      }
    }

    ${theme.mediaQueries.mobile} {
      a:focus-visible {
        ${theme.focus.bottom(-50, 12)}
      }
    }
  `}
`

interface WithDisplayGrid {
  displayGrid?: boolean
  hover?: boolean
}

export const ProductInfo = styled.div<WithDisplayGrid>`
  ${({ theme, displayGrid, hover }) => css`
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

    & > *:first-child,
    & > *:nth-child(2) {
      opacity: ${hover ? 0 : 1};
    }

    ${theme.mediaQueries.mobile} {
      margin-top: 3;
      padding: 0px;
      grid-row-gap: 1;
      h3 {
        font-size: ${theme.mobileFontSizes[5]};
      }
      h5 {
        font-size: ${theme.mobileFontSizes[6]};
      }
    }
  `}
`

interface WithHide {
  hide?: boolean
  hover?: boolean
}

export const ImageWrapper = styled.div<WithHide>`
  ${({ theme, hide, hover }) => css`
    position: relative;
    display: ${hide ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    > div {
      opacity: ${hover ? 0 : 1};
    }
  `}
`

export const HoverArea = styled.span`
  position: absolute;
  width: 87%;
  height: 69%;
  top: 6.5%;
  left: 6.5%;
`

export const HoverThumb = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`

interface WithHideCarousel {
  hide?: boolean
  carousel?: boolean
  hover?: boolean
}

export const VideoWrapper = styled.div<WithHideCarousel>`
  ${({ theme, hide, carousel, hover }) => css`
    position: relative;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    video {
      transform: translate(0, 0);
    }

    > div {
      opacity: ${hover ? 0 : 1};
    }
  `}
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
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 2;

    ${theme.mediaQueries.mobile} {
      padding-bottom: 8px;
    }
  `}
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
  ${({ theme, clickable, active }) => css`
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

    &:focus-visible {
      ${theme.focus.bottom()}
    }

    ${theme.mediaQueries.mobile} {
      padding-bottom: 0px;
    }
  `}
`
