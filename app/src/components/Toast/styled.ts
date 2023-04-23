import styled, { css } from '@xstyled/styled-components'
import { ToastType, ToastDivState } from './types'
import { CloseButton } from '../Modal/styled'

interface ToastWrapperProps {
  toastType: ToastType
  colorTheme?: 'light' | 'dark'
}

export const ToastWrapper = styled.div<ToastWrapperProps>`
  ${({ toastType, theme, colorTheme }) => css`
    pointer-events: initial;
    border: none;
    background-color: ${colorTheme === 'light' ? 'body.9' : 'body.0'};
    color: ${colorTheme === 'light' ? 'body.0' : 'body.9'};
    box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: calc(100vw - 20px);
    text-align: center;

    position: relative;
    margin-bottom: 3;
    transition: 0.5s;
    border-radius: 50px;
    text-align: left;
    padding: 3 8 3 5;

    h5 {
      font-size: 4;
    }
    h6 {
      font-size: 13px;

      button {
        text-decoration: underline;
        z-index: 1;
        position: relative;
      }
    }

    ${theme.mediaQueries.tablet} {
      max-width: 21rem;

      h5,
      h6 {
        font-size: 12px;
      }
    }

    & ${CloseButton} {
      color: ${colorTheme === 'light' ? 'body.0' : 'body.9'};

      :after,
      :before {
        background-color: ${colorTheme === 'light' ? 'body.0' : 'body.9'};
      }

      top: 50%;
      transform: translateY(-50%);
      right: 6%;
      width: 20px;
    }

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 50px;
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
    ${theme.mediaQueries.tablet} {
      top: 7rem;
      bottom: auto;
    }

    position: fixed;
    z-index: 9;
    pointer-events: none;
    top: 'auto';
    bottom: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`
