import styled, { css } from '@xstyled/styled-components'

interface LoopButtonContainerProps {
  direction: 'previous' | 'next'
}

export const LoopButtonContainer = styled.button<LoopButtonContainerProps>`
  ${({ theme, direction }) => css`
    position: absolute;
    cursor: pointer;
    padding: 2;
    background-color: body.0;
    border: 1px solid;
    border-color: body.5;
    height: 42px;
    width: 42px;
    z-index: 20;
    top: calc(50% - 21px);
    ${direction === 'previous'
      ? css`
          left: calc(-${theme.space[10]}px - 1px);
          ${theme.mediaQueries.tablet} {
            left: calc(-${theme.space[8]}px - 1px);
          }
          ${theme.mediaQueries.mobile} {
            left: -31px;
          }
        `
      : css`
          right: calc(-${theme.space[10]}px - 1px);
          ${theme.mediaQueries.tablet} {
            right: calc(-${theme.space[8]}px - 1px);
          }

          ${theme.mediaQueries.mobile} {
            right: -31px;
          }
        `}
  `}
`

export const LoopContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0 4;
`

export const LoopInner = styled.div`
  display: flex;
  overflow: visible;
`

interface LoopChildContainerProps {
  active: boolean
  clone?: boolean
}

export const LoopChildContainer = styled.div<LoopChildContainerProps>`
  ${({ active, clone }) => css`
    display: inline-block;
    transition: 0.3s ease-out;
    opacity: ${active ? 1 : 0.4};
    // outline: ${clone ? '1px solid blue' : 'none'};
  `}
`
