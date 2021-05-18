import styled, { css, DefaultTheme } from '@xstyled/styled-components'
import { Input } from '../../components/Forms/Fields/styled'

interface CartSidebarProps {
  theme: DefaultTheme
  open: boolean
}

export const CartSidebar = styled.div`
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
    padding-bottom: 90px;
    padding: 7;
    transition: 0.2s;
    ${isLoading
      ? css`
          opacity: 0.7;
          pointer-events: none;
        `
      : ''}
    ${center
      ? css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `
      : ''}

  ${theme.mediaQueries.mobile} {
      padding: 3;
      overflow: initial;
    }
  `}
`

export const SubtotalWrapper = styled.div`
  padding-top: 4;
  border-top: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 3;
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
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-gap: 3;
  border-color: body.7;
  padding: 4 0;

  border-bottom: 1px solid;

  &:first-of-type {
    padding-top: 0;
  }
  &:last-of-type {
    border-bottom: none;
  }
`

export const CheckoutItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`

export const RemoveCart = styled.button`
  &:hover {
    cursor: pointer;
  }
`

export const QuantityWrapper = styled.div`
  display: flex;
  margin-bottom: 2;
  align-items: center;
`

export const QuantityInput = styled(Input)`
  margin-left: 2;
  width: 32px;
  height: 32px;
  text-align: center;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
  }
`
