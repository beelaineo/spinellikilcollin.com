import styled, { css } from '@xstyled/styled-components'

interface WithOpen {
  open: boolean
}

export const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  z-index: dialog;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
`

export const DiamondWrapper = styled.div`
  ${({ theme }) => css`
    position: fixed;
    width: 100vw;
    height: 100%;
    top: 0;
    left: 0;
    z-index: dialog;
    justify-content: center;
    align-items: flex-end;
    transition: 0.2s;
    display: grid;
    grid-template-columns: 1fr 330px;
    grid-column-gap: 24px;
    padding-right: 184px;

    ${theme.mediaQueries.tablet} {
      grid-template-columns: 1fr;
      padding: 0 0;
    }
  `}
`

export const Background = styled.button<WithOpen>`
  ${({ open }) => css`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(192, 192, 192, 0.5);
    padding: 0;
    margin: 0;
    transition: 0.2s;
    opacity: ${open ? 1 : 0};
    pointer-events: ${open ? 'initial' : 'none'};
  `}
`

export const ModalWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    padding: 4 5 5;
    max-width: calc(100% - (${theme.space[4]}px * 2));
    max-height: calc(100% - (${theme.space[4]}px * 2));
    overflow: scroll;
    z-index: 2;
    box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.2);
    background-color: body.0;

    cursor: initial;

    ${theme.mediaQueries.mobile} {
      width: calc(100vw - ${theme.space[4]}px);

      h2 {
        font-size: 4;
      }
    }
  `}
`

export const DiamondModalWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    padding: 4 5 5;
    width: 360px;
    max-height: calc(100% - (${theme.space[4]}px * 2));
    overflow: scroll;
    z-index: 2;
    box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.2);
    background-color: body.0;
    border-radius: 13 13 0 0;
    justify-self: center;
    color: ${theme.colors.grays[7]};

    button:before,
    button:after {
      background-color: ${theme.colors.grays[7]};
    }

    cursor: initial;

    ${theme.mediaQueries.tablet} {
      width: calc(100vw - ${theme.space[4]}px);
    }

    ${theme.mediaQueries.mobile} {
      h2 {
        font-size: 4;
      }
    }
  `}
`

export const CloseButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    z-index: 20;
    top: ${theme.space[5]}px;
    right: ${theme.space[5]}px;
    background-color: transparent;
    width: 12px;
    height: 12px;

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 55%;
      width: 115%;
      height: 1px;
      background-color: body.9;
    }

    &:before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    &:after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  `}
`
