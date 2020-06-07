import styled, { css, DefaultTheme } from '@xstyled/styled-components'
import { Input } from '../../components/Forms/Fields/styled'

interface CartSidebarProps {
  theme: DefaultTheme
  open: boolean
}

export const CartSidebar = styled.div`
  ${(props: CartSidebarProps) => css`
    position: fixed;
    right: ${props.open ? '5px' : '-500px'};
    top: 0;
    max-width: 100%;
    width: 500px;
    height: 100vh;
    background-color: body.0;
    box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);
    transition: 350ms ease-in-out;
    overflow: scroll;
  `}
`

export const CloseButton = styled.button`
  color: white;
  position: absolute;
  right: 10px;
  bottom: 0;
  background-color: black;
  padding: 2rem;
  padding: 3;
`

interface ModalBackgroundProps {
  open: boolean
}

export const ModalBackground = styled.div`
  ${({ open }: ModalBackgroundProps) => css`
    height: 100vh;
    position: fixed;
    background: rgba(0, 0, 0, 0.2);
    width: 100vw;
    top: 0;
    display: ${open ? 'block' : 'none'};
    cursor: pointer;
  `}
`

export const CartBottom = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
    font-size: 3;
  }
`

export const CartInner = styled.div`
  height: calc(100vh - 150px);
  max-width: calc(100vw + 1px);
  overflow: scroll;
  padding-bottom: 90px;
  padding: 0 4;
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
  border-top: 1px solid;
  border-color: body.7;
  padding: 4 0;

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
