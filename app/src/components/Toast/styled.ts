import styled, { css } from '@xstyled/styled-components'
import { ToastType, ToastDivState } from './types'
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

    ${toastType === ToastType.Currency && 'border-radius: 50px'};
    ${toastType === ToastType.Currency && 'text-align: left'};
    ${toastType === ToastType.Currency && 'padding: 3  5'};
    ${toastType === ToastType.Currency && 'border: none'};

    h5 {
      :nth-child(1) {
        font-size: ${toastType === ToastType.Currency ? 4 : 5};
      }
      :nth-child(2) {
        font-size: ${toastType === ToastType.Currency ? '13px' : 5};
      }
    }

    ${theme.mediaQueries.tablet} {
      h5 {
        :nth-child(1),
        :nth-child(2) {
          font-size: ${toastType === ToastType.Currency ? '12px' : 5};
        }
      }
    }

    & ${CloseButton} {
      top: 7px;
      right: 8px;

      color: ${colorTheme === 'light' ? 'body.0' : 'body.9'};

      :after,
      :before {
        background-color: ${colorTheme === 'light' ? 'body.0' : 'body.9'};
      }

      ${toastType === ToastType.Currency && 'top: 50%'};
      ${toastType === ToastType.Currency && 'transform: translateY(-50%)'};
      ${toastType === ToastType.Currency && 'right: 6%'};
      width: 20px;
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
    z-index: 1;
    pointer-events: none;
    top: 120px;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`
