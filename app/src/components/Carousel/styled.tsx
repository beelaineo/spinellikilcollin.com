import styled, { css, DefaultTheme } from '@xstyled/styled-components'

interface WithSingle {
  single?: boolean
}

export const CarouselContainer = styled.div<WithSingle>`
  ${({ theme, single }) => css`
    position: relative;
    height: 100%;
    width: 100%;
    flex-grow: 1;
    img,
    picture {
      pointer-events: none;
    }
    ${theme.mediaQueries.mobile} {
      overflow: hidden;
      padding: ${single ? 0 : '0 32vw'};
    }
  `}
`

export const CarouselMask = styled.div`
  ${({ theme }) => css`
    overflow: hidden;

    ${theme.mediaQueries.mobile} {
      max-width: 100%;
      overflow: visible;
    }
  `}
`

interface SlidesContainerProps {
  left: number
  isSwiping: boolean
  theme: DefaultTheme
}

export const SlidesContainer = styled.div.attrs<SlidesContainerProps>(
  (props) => ({
    style: {
      transform: `translateX(${props.left}px)`,
    },
  }),
)`
  ${({ theme, isSwiping }: SlidesContainerProps) => css`
    position: relative;
    height: 100%;
    width: 100%;
    top: 0;
    white-space: nowrap;
    transition: ${isSwiping ? 0 : '0.4s cubic-bezier(0.57, 0.06, 0.05, 0.95)'};

    & > * {
      white-space: initial;
    }

    ${theme.mediaQueries.mobile} {
      padding: 0;
    }
  `}
`

interface WithColumnCount {
  theme: DefaultTheme
  columnCount?: number
  single?: boolean
}

export const SlideContainer = styled.div`
  ${({ theme, columnCount, single }: WithColumnCount) => css`
    height: 100%;
    text-align: center;
    margin-right: 5;
    display: inline-flex;
    vertical-align: top;

    &:last-of-type {
      margin-right: 0;
    }

    ${single
      ? css`
          width: 100%;
          margin-right: 0;
        `
      : columnCount
      ? css`
          width: calc(
            (100% - (${theme.space[5]}px * ${columnCount - 1})) / ${columnCount}
          );
        `
      : css`
          width: calc((100% - (${theme.space[5]}px * 4)) / 5);
          margin-right: 5;

          ${theme.mediaQueries.desktop} {
            width: calc((100% - (${theme.space[4]}px * 3)) / 4);
            margin-right: 4;
          }

          ${theme.mediaQueries.tablet} {
            width: calc((100% - (${theme.space[4]}px * 2)) / 3);
          }
          ${theme.mediaQueries.mobile} {
            width: calc((100%) / 1);
          }
        `}
  `}
`

interface CarouselButtonProps {
  theme: DefaultTheme
  visible: boolean
  direction: 'previous' | 'next'
}

const WIDTH = 20
const HEIGHT = WIDTH * 2

export const CarouselButton = styled.button`
  ${({ theme, visible, direction }: CarouselButtonProps) => css`
    opacity: ${visible ? '1' : '0'};
    pointer-events: ${visible ? 'auto' : 'none'};
    position: absolute;
    width: ${WIDTH}px;
    z-index: 15;
    height: ${HEIGHT}px;
    top: calc(50% - 30px);
    transition: 0.2s;

    ${direction === 'next'
      ? css`
          right: -25px;
        `
      : css`
          left: -25px;
          transform: rotate(180deg);
        `}
    background: transparent;

    ${theme.mediaQueries.mobile} {
      display: none;
    }
  `}
`
