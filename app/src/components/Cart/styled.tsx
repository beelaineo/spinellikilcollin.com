import styled, { css, DefaultTheme } from '@xstyled/styled-components'
import { Input } from '../../components/Forms/Fields/styled'

interface CartSidebarProps {
  theme: DefaultTheme
  open: boolean
}

export const CartSidebar = styled.div`
  ${(props: CartSidebarProps) => css`
    position: fixed;
    z-index: cart;
    right: ${props.open ? '0px' : '-510px'};
    top: 0;
    width: 100vw;
    max-width: 500px;
    height: 100vh;
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
    height: ${theme.navHeight};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 1px solid;
    border-bottom-color: body.7;
  `}
`

export const CloseButtonWrapper = styled.div`
  position: absolute;
  top: calc(50% - 12px);
  right: 18px;
  height: 24px;
  width: 36px;
`

interface ModalBackgroundProps {
  open: boolean
}

export const CartBottom = styled.div`
  padding: 4;
  border-top: 1px solid black;
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
  loading?: boolean
}

export const CartInner = styled.div<CartInnerProps>`
  ${({ center, loading }) => css`
    flex-grow: 1;
    max-width: calc(100vw + 1px);
    overflow: scroll;
    padding-bottom: 90px;
    padding: 0 4;
    transition: 0.2s;
    ${loading
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
  `}
`

export const SubtotalWrapper = styled.div`
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

  &:last-of-type {
    border-bottom: 1px solid;
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
