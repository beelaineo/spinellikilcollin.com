import styled, { css, DefaultTheme } from '@xstyled/styled-components'
import { Input } from '../../components/Forms/Fields/styled'

interface CartSidebarProps {
  theme: DefaultTheme
  open: boolean
}

export const CartSidebar = styled.aside`
  ${({ open }: CartSidebarProps) => css`
    position: fixed;
    z-index: cart;
    right: ${open ? '0px' : '-510px'};
    top: 0;
    width: 100vw;
    max-width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: body.0;
    box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);
    transition: 350ms ease-in-out;
    overflow: scroll;
  `}
`

export const FreeShippingIndicator = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    button {
      text-underline-offset: 5px;
      text-align: center;
    }

    &.free-shipping-enter {
      > span,
      > button {
        max-height: 100px;
        opacity: 1;
        transition: opacity 0.5s ease-in-out 0.5s, max-height 1s ease-in-out;
      }
    }

    &.free-shipping-enter-active {
      > span,
      > button {
        max-height: 100px;
        opacity: 1;
        transition: opacity 0.5s ease-in-out 0.5s, max-height 1s ease-in-out;
      }

      h4 {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
      }
    }

    &.free-shipping-enter-done {
      > span,
      > button {
        max-height: 100px;
        opacity: 1;
        transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out 0.25s;
      }
      h4 {
        opacity: 1;
        transition: opacity 0.5s ease-in-out 0.25s;
      }
    }

    &.free-shipping-exit {
      > span,
      > button {
        max-height: 100px;
        opacity: 1;
        transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out 0.25s;
      }
      h4 {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
      }
    }

    &.free-shipping-exit-active {
      > span,
      > button {
        max-height: 100px;
        opacity: 1;
        transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out 0.25s;
      }
      h4 {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
      }
    }

    &.free-shipping-exit-done {
      > span,
      > button {
        max-height: 0;
        opacity: 0;
        transition: opacity 1s ease-in-out 1.25s,
          max-height 1s ease-in-out 1.25s;
      }
      h4 {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
      }
    }
  `}
`

export const ProgressBarWrapper = styled.span`
width: 100%;
height: 100%;
position: relative;
display: flex;

border: 1px solid black;
border-radius: 20px;
}
`

export const ProgressBar = styled.span`
    background-color: grays.4;
    border-radius: 10px;
    transition: width 2.5s ease-in-out;
    position: relative;
    display: flex;
    height: 20px;
    margin: 5px;
}
`

export const CartHeading = styled.div`
  ${({ theme }) => css`
    min-height: ${theme.navHeight};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 1px solid;
    border-bottom-color: body.7;

    ${theme.mediaQueries.tablet} {
      min-height: 74px;
    }

    ${theme.mediaQueries.mobile} {
      min-height: ${theme.mobileNavHeight};
    }
  `}
`

export const CloseButtonWrapper = styled.div`
  position: absolute;
  top: calc(50% - 12px);
  right: 18px;
  height: 24px;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface ModalBackgroundProps {
  open: boolean
}

export const CartBottom = styled.div`
  ${({ theme }) => css`
    padding: 0 7;

    ${theme.mediaQueries.mobile} {
      padding: 3;
    }
  `}
`

export const CartNav = styled.div`
  position: fixed;
  top: 45vh;
  right: 0;
  > button {
    min-width: 30px;
    border-radius: 3px;
    font-size: 4;
  }
`

interface CartInnerProps {
  center?: boolean
  isLoading?: boolean
}

export const CartInner = styled.div<CartInnerProps>`
  ${({ theme, center, isLoading }) => css`
    flex-grow: 1;
    max-width: calc(100vw + 1px);
    overflow: scroll;
    padding: 4 7;
    padding-bottom: 0;
    transition: 0.2s;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${
      isLoading
        ? css`
            opacity: 0.7;
            pointer-events: none;
          `
        : ''
    }
    ${
      center
        ? css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `
        : ''
    }

     
    }

    ${theme.mediaQueries.mobile} {
      padding: 4;
      padding-bottom: 0;
      overflow: initial;
    }

    > button {
      position: relative;

      &:focus-visible {
        ${theme.focus.left()}
      }
    }
  `}
`

export const SubtotalWrapper = styled.div`
  padding-top: 4;
  border-top: 1px solid black;
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-gap: 12px;
  margin-bottom: 3;
`

export const OptionsWrapper = styled.div`
  padding-top: 0;
  display: grid;
  grid-template-columns: 150px 1fr;
  column-gap: 12px;
  margin-bottom: 4;
  & > div > div {
    margin: 0;
    label {
      margin-bottom: 0;
    }
  }
`

interface CartModalProps {
  open: boolean
}

export const CartModal = styled.div`
  ${({ open }: CartModalProps) => css`
    opacity: ${open ? '1' : '0'};
    pointer-events; ${open ? 'initial' : 'none'};
  `}
`

export const CheckoutProductWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 150px 1fr;
    grid-gap: 3;
    border-color: body.7;
    padding: 4 0;
    position: relative;

    border-bottom: 1px solid;

    &:first-of-type {
      padding-top: 0;
    }
    &:last-of-type {
      border-bottom: none;
    }

    > a {
      position: relative;
      &:focus-visible {
        ${theme.focus.bottom()}
      }
    }
  `}
`
export const CheckoutProductCloseButtonWrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    right: 0;
    padding: 8px 4;
    z-index: 2;
    button {
      width: 20px;
      height: 20px;
    }
    ${theme.mediaQueries.tablet} {
      margin-right: 8px;
    }
  `}
`

export const CheckoutProductCloseButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    z-index: 20;
    background-color: transparent;
    cursor: pointer;

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 10px;
      left: 50%;
      width: 100%;
      height: 1px;
      background-color: grays.5;
    }

    &:before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    &:after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  `}
`

export const CheckoutItemDetails = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
    > div {
      width: fit-content;
    }
    a {
      position: relative;
    }
  `}
`

export const RemoveCart = styled.button`
  &:hover {
    cursor: pointer;
  }
`

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

export const QuantityInputWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    &:has(input:focus-visible) {
      ${theme.focus.bottom()}
    }
  `}
`

export const QuantityInput = styled(Input)`
  ${({ theme }) => css`
    position: relative;
    width: 24px;
    height: 24px;
    text-align: center;
    -moz-appearance: textfield;
    border: 1px solid ${theme.colors.grays[4]};

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
    }
  `}
`

export const QuantityAdjustButton = styled.button`
  ${({ theme }) => css`
    display: inline-block;
    width: 24px;
    position: relative;

    &:focus-visible {
      ${theme.focus.bottom(-30)}
    }
  `}
`
