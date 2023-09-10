import styled, { css, DefaultTheme } from '@xstyled/styled-components'
import { Wrapper as ImageWrapper } from '../Image/styled'

interface WithSingle {
  single?: boolean
  autocomplete?: boolean
}

export const CarouselContainer = styled.div<WithSingle>`
  ${({ theme, single, autocomplete }) => css`
    position: relative;
    height: 100%;
    width: 100%;
    flex-grow: 1;
    img,
    picture {
      pointer-events: none;
    }

    ${autocomplete && 'width: 70vw;'}

    padding: 0 11;

    ${theme.mediaQueries.tablet} {
      ${autocomplete && 'width: 100%;'}
    }
    ${theme.mediaQueries.mobile} {
      overflow: hidden;
      padding: ${single ? '0' : '0 32vw'};
      ${autocomplete && 'width: 100%; padding: 0 10vw;'}
    }
  `}
`

export const CarouselMask = styled.div<WithSingle>`
  ${({ theme, single }) => css`
    overflow: hidden;
    padding-bottom: 3;

    ${theme.mediaQueries.mobile} {
      max-width: 100%;
      overflow: visible;

      ${single ? css`` : ''}
    }
  `}
`

interface SlidesContainerProps {
  left: number
  isSwiping: boolean
  theme: DefaultTheme
  autocomplete?: boolean
  isDragging?: boolean
}

export const SlidesContainer = styled.div.attrs<SlidesContainerProps>(
  (props) => ({
    style: {
      transform: `translateX(${props.left}px)`,
    },
  }),
)`
  ${({ theme, isSwiping, isDragging }: SlidesContainerProps) => css`
    position: relative;
    height: 100%;
    width: 100%;
    top: 0;
    white-space: nowrap;
    transition: ${isSwiping ? 0 : '0.4s cubic-bezier(0.57, 0.06, 0.05, 0.95)'};

    > div {
      ${isDragging && 'pointer-events: none;'}
    }

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
  autocomplete?: boolean
}

export const SlideContainer = styled.div`
  ${({ theme, columnCount, single, autocomplete }: WithColumnCount) => css`
    height: 100%;
    text-align: center;
    padding-right: 5;
    display: inline-flex;
    position: relative;
    vertical-align: top;
    &:last-of-type {
      margin-right: 0;
    }

    ${single
      ? css`
          width: 100%;
          padding-right: 0;
        `
      : columnCount
      ? css`
          width: calc(
            (100% - (${theme.space[5]}px * ${columnCount - 1})) / ${columnCount}
          );
        `
      : css`
          width: calc((100% + (37px * 1)) / 5);
          padding-right: 37px;

          ${ImageWrapper} {
            overflow: hidden;
            picture {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              transform: scale(1.3);
            }
          }

          ${theme.mediaQueries.desktop} {
            padding-right: 35px;
            width: calc((100% + (35px * 1)) / 4);
          }

          ${theme.mediaQueries.tablet} {
            width: calc((100% + (35px * 1)) / 3);
          }
          ${theme.mediaQueries.mobile} {
            width: calc(((100%) / 1) + 35px);
          }
        `}

    ${autocomplete &&
    css`
      width: fit-content;
      padding: 0 4;

      &::after {
        content: '·';
        position: absolute;
        width: 6px;
        height: 100%;
        right: -3px;
        pointer-events: none;
        opacity: 1;
      }

      &:last-of-type {
        &::after {
          display: none;
        }
      }

      ${theme.mediaQueries.desktop} {
        width: fit-content;

        padding: 0 4;
      }

      ${theme.mediaQueries.tablet} {
        width: fit-content;

        padding: 0 4;
      }
      ${theme.mediaQueries.mobile} {
        width: fit-content;

        padding: 0 4;
      }
    `}
  `}
`

const WIDTH = 20
const HEIGHT = WIDTH * 2

interface ButtonWrapperProps {
  visible: boolean
  direction: 'previous' | 'next'
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  ${({ direction, visible, theme }) => css`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 77%;
    z-index: 15;
    width: ${theme.space[11]}px;
    top: 0;
    ${direction === 'next'
      ? css`
          right: 0;
        `
      : css`
          left: 0;
        `}

    opacity: ${visible ? '1' : '0'};
    pointer-events: ${visible ? 'auto' : 'none'};

    ${theme.mediaQueries.desktop} {
      width: ${theme.space[11]}px;
    }
    ${theme.mediaQueries.mobile} {
      display: none;
    }
  `}
`

interface CarouselButtonProps {
  direction: 'previous' | 'next'
}
export const CarouselButton = styled.button<CarouselButtonProps>`
  ${({ theme, direction }) => css`
    width: ${WIDTH}px;
    z-index: 15;
    height: ${HEIGHT}px;
    top: calc(50% - 30px);
    transition: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;

    ${direction === 'next'
      ? css`
          right: -25px;

          &:focus-visible {
            ${theme.focus.bottom(-80, -70)}
          }
        `
      : css`
          left: -25px;
          transform: rotate(180deg);
          &:focus-visible {
            ${theme.focus.bottom(0, -70)}
          }
        `}
    background: transparent;

    ${theme.mediaQueries.mobile} {
      display: none;
    }
  `}
`
export const DotsWrapper = styled.div`
  ${({ theme }) => css`
    margin: 7 auto 3;
    padding: 0;
    position: relative;
    z-index: 10;

    ${theme.mediaQueries.mobile} {
      padding: 0 0;
    }
  `}
`

export const DotsInner = styled.div`
  max-width: small;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
`

interface WithActive {
  active: boolean
}

export const Dot = styled.div<WithActive>`
  ${({ active }) => css`
    margin-right: 2;
    width: 6px;
    height: 6px;
    border-radius: 10px;
    background-color: ${active ? 'body.7' : 'body.4'};
  `}
`
