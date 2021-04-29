import styled, { css } from '@xstyled/styled-components'
import { ToastType, ToastDivState } from './Toast'
import { CloseButton } from '../Modal/styled'

interface ToastWrapperProps {
  toastType: ToastType
}

export const ToastWrapper = styled.div<ToastWrapperProps>`
  ${({ toastType }) => css`
    pointer-events: initial;
    border: 1px solid currentColor;
    background-color: body.0;
    box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.2);
    padding: 3 18px;
    max-width: 400px;
    width: calc(100vw - 20px);
    text-align: center;
    position: relative;
    margin-bottom: 3;
    transition: 0.5s;

    & ${CloseButton} {
      top: 7px;
      right: 8px;
    }

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      box-shadow: ${toastType === ToastType.Warning
        ? 'inset 0 -3px 15px -7px orange'
        : toastType === ToastType.Error
        ? 'inset 0 -3px 15px -7px red'
        : 'none'};
    }
  `}
`

export const ToastRootWrapper = styled.div`
  ${({ theme }) => css`
    position: fixed;
    z-index: ${theme.zIndices.alert};
    pointer-events: none;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`
